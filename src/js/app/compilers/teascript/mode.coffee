Outdent      = require("ace/mode/matching_brace_outdent").MatchingBraceOutdent
FoldMode     = require("ace/mode/folding/coffee").FoldMode
Range        = require("ace/range").Range
TextMode     = require("ace/mode/text").Mode
Behaviour    = require("ace/mode/behaviour").Behaviour
Selection    = require("ace/selection").Selection
WorkerClient = require("ace/worker/worker_client").WorkerClient

oop = require("ace/lib/oop")
EventEmitter = require("ace/lib/event_emitter").EventEmitter

{
  isForm
  concat
  map
  filter
  join
  _notEmpty
  _operator
  _arguments
  _terms
  _snd
  _fst
  _labelName
  _symbol
} = compiler = require './compiler'

# Extend selection to preserve state when multiselecting
(->
  fromOrientedRange = @fromOrientedRange
  @fromOrientedRange = (range) ->
    fromOrientedRange.call this, range
    @$nodes = range.$nodes
    @$editing = range.$editing
    @$editMarker = range.$editMarker

  toOrientedRange = @toOrientedRange
  @toOrientedRange = (range) ->
    range = toOrientedRange.call this, range
    range.$nodes = @$nodes
    range.$editing = @$editing
    range.$editMarker = @$editMarker
    range
).call Selection.prototype

exports.Mode = class extends TextMode
  constructor: (@isSingleLineInput, @memory) ->
    @$tokenizer =
      getLineTokens: (line, state, row, doc) =>
        if tokens = @tokensOnLine row, doc
          tokens: convertToAceLineTokens tokens
        else
          tokens: [value: line, type: 'text']
    oop.implement @$tokenizer, EventEmitter

    @$outdent = new Outdent
    @foldingRules = new FoldMode
    @$behaviour = undefined

  tokensOnLine: (row, doc) =>

    start = doc.positionToIndex row: row, column: 0
    end = doc.positionToIndex row: row + 1, column: 0

    # if not @ast
    #   @onDocumentChange doc
    if not @ast
      return undefined
    findTokensBetween (topList @ast), start, end

  # onDocumentChange: (doc) =>
  #   # console.log "tokenizing document", @editor.getValue()
  #   if not @ast
  #     @initAst if doc?.getValue then doc.getValue() else @editor.getValue()

  #   compileFunction =
  #     if @isSingleLineInput
  #       compiler.compileExpression
  #     else
  #       compiler.compileTopLevel
  #   # value = if doc?.getValue then doc.getValue() else @editor.getValue()
  #   # try
  #   if @ast
  #     compileFunction @ast
    # catch e
    #   throw e
    #   console.log "Error while compiling", e

  getNextLineIndent: (state, line, tab) ->
    indent = @$getIndent line
    # TODO: this doesn't work properly for strings, use tokens instead
    numOpen = (line.match(/[\(\[\{]/g) or []).length
    numClosed = (line.match(/[\)\]\}]/g) or []).length
    new Array(numOpen - numClosed + indent.length / tab.length + 1).join tab

  # TODO replace with TS comments or remove
  commentLine = /^(\s*)# ?/
  hereComment = /^\s*###(?!#)/
  indentation = /^\s*/
  toggleCommentLines: (state, doc, startRow, endRow) ->
    range = new Range 0, 0, 0, 0

    for i in [startRow..endRow]
      line = doc.getLine(i)
      if hereComment.test line
        continue

      if commentLine.test line
        line = line.replace commentLine, '$1'
      else
        line = line.replace indentation, '$&# '

      range.end.row = range.start.row = i
      range.end.column = line.length + 2
      doc.replace range, line
    return

  checkOutdent: (state, line, input) ->
    @$outdent.checkOutdent line, input

  autoOutdent: (state, doc, row) ->
    @$outdent.autoOutdent doc, row

  detachFromSession: (session) ->
    # session.removeListener 'change', @onDocumentChange
    @editor.removeListener 'click', @handleClick
    # session.getDocument().removeListener 'change', @selectInserted

  attachToSession: (session) ->
    return unless session.getEditor()

    @editor = session.getEditor()
    # session.on 'change', @onDocumentChange
    @editor.on 'click', @handleClick
    @editor.selection.on 'removeRange', @handleRangeDeselect
    @editor.commands.on 'afterExec', @handleCommandExecution

    # attaching as last listener, so that everything is updated already
    # session.getDocument().on 'change', @selectInserted, no

    unless @isSingleLineInput
      @addVerticalCommands session
    @addCommands session

    # Initial parse
    @initAst ""

  setContent: (string, selectedRange) ->
    added = astize string, @ast
    inside = insideTangible @ast
    @mutate(
      extend
        changeInTree:
          added: added
          at: inside
      , if selectedRange
        selectionRange: selectedRange
      else
        tangibleSelection:
          in: added
          out: inside.out)
    @handleCommandExecution()

  tangibleSelectionFromRange: (range) ->
    start = @tangibleAtPos range.start
    end = @tangibleAtPos range.end
    if _notEmpty start.in
      from = childIndex start.in[0]
      to = childIndex end.out[0]
      in: (parentOfTangible start)[from...to]
      out: end.out
    else
      end

  initAst: (value) ->
    # console.log "initing ast with", value
    # @editor.session.getDocument().setValue value
    @ast =
      if @isSingleLineInput
        compiler.astizeExpressionWithWrapper value
      else
        compiler.astizeList value

    # Set up selection
    # if @ast
    #   @handleClick {}

  # Called after worker compiles
  updateAst: (ast) ->
    # console.log ast, @ast
    if ast.end isnt @ast.end
      console.log "Ast out of sync"
      return
    duplicateProperties ast, @ast
    @$tokenizer._signal 'update', data: rows: first: 1

  # Traverses the AST in order, fixing positions
  repositionAst: ->
    currentPosition = @ast.start
    stack = [[@ast, yes]]
    while next = stack.pop()
      [node, push] = next
      if isForm node
        if push
          node.start = currentPosition
          stack.push [node, no]
          for n in node by -1
            stack.push [n, yes]
        else
          node.end = currentPosition
      else
        offset = currentPosition - node.start
        node.start = currentPosition
        node.end += offset
        currentPosition = node.end

  handleClick: (event) =>
    if event.getShiftKey?()
      @editor.execCommand 'edit by click', @editor
    else
      # TODO: show what will be selected on mousemove
      # Select preceding expression
      #   or enclosing expression if whitespace preceeds and there is an enclosing expression
      #   or set insert position
      # select clicked word or its parent if whitespace selected
      if @ast
        @editor.execCommand 'select by click', @editor

  addVerticalCommands: (session) ->
    @editor.commands.addCommands
      'add new sibling expression on new line':
        bindKey: win: 'Enter', mac: 'Enter'
        multiSelectAction: 'forEach'
        exec: =>
          @insertSpace FORWARD, '\n'


      'up to atom or position':
        bindKey: win: 'Up', mac: 'Up'
        multiSelectAction: 'forEach'
        exec: =>
          # noop

      'down to atom or position':
        bindKey: win: 'Down', mac: 'Down'
        multiSelectAction: 'forEach'
        exec: =>
          # noop

    # @editor.commands.addCommand
    #   name: 'add new sibling to parent expression on new line'
    #   bindKey: win: 'Ctrl-Enter', mac: 'Ctrl-Enter'
    #   exec: =>
        # if (token = @rightActiveToken()) and parent = token.parent
        #   @deselect()
        #   @unhighlightActive()
        #   @editor.moveCursorToPosition @tokenVisibleEnd parent
        #   @editor.insert '\n'

      'add new sibling expression on previous line':
        bindKey: win: 'Shift-Enter', mac: 'Shift-Enter'
        multiSelectAction: 'forEach'
        exec: =>
          @insertSpace BACKWARD, '\n'

  addCommands: (session) ->
    # Never remove this command, it handles text insertion
    @editor.commands.addCommands
      'insertstring': # This is the default unhandled command name
        multiSelectAction: 'forEach'
        scrollIntoView: 'cursor'
        exec: (editor, string) =>
          if @commandMode or (@editor.getValue() is '') and (string is ':')
            @editor.insert string
            return

          @insertString FORWARD, string

    @editor.commands.addCommands @commands =
      'select by click':
        multiSelectAction: 'forEach' #selects multiple
        exec: =>
          @mutate
            tangibleSelection: @tangibleAtPos @cursorPosition()

      'edit by click':
        multiSelectAction: 'forEach' #edits multiple
        exec: =>
          tangible = @tangibleAtPos @cursorPosition()
          node = onlyExpression tangible
          @mutate(
            if node and isAtom node
              withinAtom: node
              withinAtomPos: @offsetToCursor node
            else
              tangibleSelection: tangible)

      'up the tree':
        bindKey: win: 'Ctrl-Up', mac: 'Command-Up'
        multiSelectAction: 'forEach'
        exec: =>
          @mutate
            inSelection:
              if @isEditing()
                @editedAtom()
              else
                @realParentOfSelected()

      'down the tree':
        bindKey: win: 'Ctrl-Down', mac: 'Command-Down'
        multiSelectAction: 'forEach'
        exec: =>
          @mutate(
            if expression = @onlySelectedExpression()
              if isForm expression
                tangibleSelection: tangibleInside FIRST, expression
              else
                withinAtom: expression
                withinAtomPos:
                  if isDelimitedAtom expression
                    expression.symbol.length - 1
                  else
                    expression.symbol.length
            else
              {})

      'next atom or position':
        bindKey: win: 'Right', mac: 'Right'
        multiSelectAction: 'forEach'
        exec: =>
          @selectFollowingAtomOrPosition NEXT

      'previous atom or position':
        bindKey: win: 'Left', mac: 'Left'
        multiSelectAction: 'forEach'
        exec: =>
          @selectFollowingAtomOrPosition PREVIOUS

      'next sibling':
        bindKey: win: 'Ctrl-Right', mac: 'Command-Right'
        multiSelectAction: 'forEach'
        exec: =>
          @selectSibling NEXT

      'previous sibling':
        bindKey: win: 'Ctrl-Left', mac: 'Command-Left'
        multiSelectAction: 'forEach'
        exec: =>
          @selectSibling PREVIOUS

      'include next expression':
        bindKey: win: 'Shift-Right', mac: 'Shift-Right'
        multiSelectAction: 'forEach'
        exec: =>
          @expandSelection NEXT

      'include previous expression':
        bindKey: win: 'Shift-Left', mac: 'Shift-Left'
        multiSelectAction: 'forEach'
        exec: =>
          @expandSelection PREVIOUS

      'add new sibling expression':
        bindKey: win: 'Space', mac: 'Space'
        multiSelectAction: 'forEach'
        exec: =>
          @insertSpace FORWARD, ' '

      'add new sibling expression before current':
        bindKey: win: 'Shift-Space', mac: 'Shift-Space'
        multiSelectAction: 'forEach'
        exec: =>
          @insertSpace BACKWARD, ' '

      'remove token and preceding whitespace or delete a character':
        bindKey: win: 'Backspace', mac: 'Backspace'
        multiSelectAction: 'forEach'
        exec: =>
          @remove BACKWARD

      'remove backwards':
        bindKey: win: 'Delete', mac: 'Delete'
        multiSelectAction: 'forEach'
        exec: =>
          @remove FORWARD

      'wrap in parens':
        bindKey: win: '(', mac: '('
        multiSelectAction: 'forEach'
        exec: =>
          @wrap '(', yes, ')'

      'wrap in brackets':
        bindKey: win: '[', mac: '['
        multiSelectAction: 'forEach'
        exec: =>
          @wrap '[', yes, ']'

      'wrap in braces':
        bindKey: win: '{', mac: '{'
        multiSelectAction: 'forEach'
        exec: =>
          @wrap '{', yes, '}'

      'add quotes':
        bindKey: win: '"', mac: '"'
        multiSelectAction: 'forEach'
        exec: =>
          if @isEditingDelimited()
            @insertString FORWARD, '"'
          else
            selected = escape '"', @selectedText()
            [atom] = astize '"' + selected + '"', @parentOfSelected()
            @mutate(
              extend
                changeInTree:
                  added: [atom]
                  at: @selectedTangible()
              , if @isSelecting()
                inSelection: atom
              else
                withinAtom: atom
                withinAtomPos: selected.length + 1)

      'close parent, same as up':
        bindKey: win: ')', mac: ')'
        exec: =>
          @mutate
            inSelection:
              @realParentOfSelected()

      # 'add new sibling to parent':
      #   bindKey: win: ')', mac: ')'
      #   exec: =>
      #     activeToken = @rightActiveToken()
      #     if activeToken and activeToken.parent?.parent
      #       parent = activeToken.parent
      #     else
      #       parent = (@tokenBeforeCursor @editor).parent
      #     @deselect()
      #     @unhighlightActive()
      #     @editor.moveCursorToPosition @tokenVisibleEnd parent
      #     @editor.insert ' '

      'add label':
        bindKey: win: ':', mac: ':'
        exec: =>
          if @isSingleLineInput and @editor.getValue() is ''
            return no

          if @isEditingDelimited()
            @insertString FORWARD, ':'
          else
            atom = @onlySelectedExpression()
            @mutate(
              if @isEditing() or atom and isAtom atom
                endOffset = atom.symbol.length
                changeWithinAtom:
                  string: ':'
                  atom: atom
                  range: [endOffset, endOffset]
              else
                [label] = astize ':', @parentOfSelected()
                changeInTree:
                  added: [label]
                  at: @selectedTangible()
                withinAtom: label
                withinAtomPos: 0)

      'add comment':
        bindKey: win: '#', mac: '#'
        exec: =>
          @wrap '(', '#', ' ', yes, ')'

      # Temporary
      'show type of expression':
        bindKey: win: 'Ctrl-T', mac: 'Ctrl-T'
        exec: =>
          expression = @onlySelectedExpression()
          if expression
            window.log expression.tea

      # For debugging
      'remove all source':
        bindKey: win: 'Ctrl-Shift-D', mac: 'Ctrl-Shift-D'
        exec: =>
          @editor.setValue ''
          @initAst ''

      'replace parent with current selection':
        bindKey: win: 'Ctrl-P', mac: 'Ctrl-P'
        exec: =>
          parent = @realParentOfSelected()
          if parent
            added = @selectedTangible().in
            @mutate
              changeInTree:
                added: added
                at: insToTangible [parent]
              inSelections: added

      'wrap current in a function':
        bindKey: win: 'Ctrl-F', mac: 'Ctrl-F'
        exec: =>
          @wrap '(', 'fn', ' ', '[]', ' ', yes, ')'

      'replace expression by new function param':
        bindKey: win: 'Ctrl-A', mac: 'Ctrl-A'
        exec: =>
          parent = @realParentOfSelected()
          fun = @findParentFunction parent if parent
          params = @findParamList fun if fun
          if params
            # insert space for new param if necessary and put cursors at both places
            @mutate @removeSelectable @selectedTangible()
            hole = @selectedTangible()

            inParams = tangibleInside LAST, params
            if isExpression toNode inParams
              @insertSpaceAt FORWARD, ' ', nodeEdgeOfTangible LAST, inParams
            else
              @mutate
                tangibleSelection: inParams

            @mutate
              newSelection:
                in: []
                out: hole.out

      'define selected token':
        bindKey: win: 'Ctrl-D', mac: 'Ctrl-D'
        indirect: yes
        exec: (editor, {targetEditor} = {}) =>
          targetEditor ?= @editor
          token = @tokenNextToCursor targetEditor
          @editor.insert if token.tokenType is 'operator'
            labeled = false
            i = 0
            args = []
            for t in token.parent
              if t is token or (isWhitespace t) or @isDelim t
                continue
              if labeled
                labeled = false
                continue
              args.push if t.label is 'label'
                labeled = true
                t.value[...-1]
              else
                console.log "adding for", t
                String.fromCharCode 97 + i++
            """
            #{token.value} (fn [#{args.join ' '}]
              _)"""
          else
            """
            #{token.value} _"""

  # direction ignored for now
  insertString: (direction, string) ->
    @mutate(
      if @isEditing()
        atom = @editedAtom()
        validString =
          if isDelimitedAtom atom
            delimiter = atomDelimiter atom
            escape delimiter, string
          else
            string
        offset = @offsetToCursor atom
        changeWithinAtom:
          string: validString
          range: [offset, offset]
      else
        added = astize string, @parentOfSelected()

        extend
          changeInTree:
            added: added
            at: @selectedTangible()
        , if added.length is 1 and isAtom (atom = added[0])
            withinAtom: atom
            withinAtomPos: atom.symbol.length
          else
            inSelections: added)

  insertSpace: (direction, space) ->
    if @isEditing() and isDelimitedAtom @editedAtom()
      @insertString direction, space
    else
      @insertSpaceAt direction, space, @selectedNodeEdge direction

  insertSpaceAt: (direction, space, insertPos) ->
    parent = insertPos.parent
    added = astize space, parent
    @mutate
      changeInTree:
        added: added
        at:
          in: []
          out: [insertPos]
      tangibleSelection:
        in: []
        out: if direction is FORWARD then [insertPos] else added


  selectFollowingAtomOrPosition: (direction) ->
    if @isSelectingMultiple()
      @selectSibling direction
    else
      @mutate
        tangibleSelection:
          followingTangibleAtomOrPosition direction, @selectedTangible()

  selectSibling: (direction) ->
    @mutate(
      if @isSelectingMultiple()
        tangibleSelection: @selectableEdge direction
      else
        siblingSelection = @selectedSibling direction
        if not siblingSelection and isReal @parentOfSelected()
          inSelection: @parentOfSelected()
        else
          tangibleSelection: siblingSelection)

  expandSelection: (direction) ->
    {margin, siblingTangible} = (@toSelectionSibling direction) or {}
    @mutate(
      if siblingTangible
        toSibling = append direction, margin, siblingTangible
        tangibleSelection: append direction, @selectedTangible(), toSibling
      else
        inSelection:
          if isReal parent = @parentOfSelected()
            parent)

  # Returns node at cursor (only atoms, not forms)
  tangibleAtPos: (pos) ->
    # TODO: return selections object
    [before, after] = @tokensSurroundingPos pos
    tangibleSurroundedBy FORWARD, before, after or before

  tokensSurroundingPos: (pos) ->
    idx = @posToIdx pos
    findTokensBetween @ast, idx - 1, idx + 1

  tangibleRange: (tangible) ->
    [start, end] = nodeEdgesOfTangible tangible
    positionsToRange (@startPos start), (@startPos end)

  remove: (direction) ->
    @mutate(
      if atom = @editedAtom()
        if @isAtLimit direction, atom
          @removeSelectable @selectedTangible()
        else
          offset = @offsetToCursor atom
          changeWithinAtom:
            string: ''
            range: [offset, offset + direction]
      else if @isSelecting()
        @removeSelectable @selectedTangible()
      else
        tn = @selectedTangible()
        defaultMargin = @selectionMargin direction
        removeDirection =
          if defaultMargin
            direction
          else
            opposite direction
        removeMargin = @selectionMargin removeDirection

        if removeMargin
          previous = (sibling PREVIOUS, (nodeEdgeOfTangible FIRST, removeMargin))
          next = (nodeEdgeOfTangible LAST, removeMargin)
          changeInTree:
            at: removeMargin
          tangibleSelection: tangibleSurroundedBy FORWARD, previous, next
        else
          if isReal parent = @parentOfSelected()
            @removeSelectable insToTangible [parent]
          else
            {})

  removeSelectable: (nodes) ->
    changeInTree:
      at: nodes
    tangibleSelection:
      in: []
      out: nodes.out

  # Whether we are at the last character of the atom
  isAtLimit: (direction, atom) ->
    idx = @posToIdx @cursorPosition()
    limit = edgeIdxOfNode direction, atom
    direction is BACKWARD and idx is limit + 1

  offsetToCursor: (atom) ->
    @distance @cursorPosition(), @startPos atom

  selectedText: ->
    if @isEditing()
      @editedAtom().symbol
    else
      @editor.getSelectedText()

  selectableEdge: (direction) ->
    tangibleEdge direction, @selectedTangible()

  editableEdge: (direction, atom) ->
    if isDelimitedAtom atom
      @idxToPos (edgeIdxOfNode direction, atom) + (opposite direction)
    else
      @edgeOfToken direction, atom

  realParentOfSelected: ->
    if isReal parent = @parentOfSelected()
      parent

  parentOfSelected: ->
    parentOfTangible @selectedTangible()

  # Gives a sibling tangible of the current selections
  selectedSibling: (direction) ->
    (@toSelectionSibling direction)?.siblingTangible

  toSelectionSibling: (direction) ->
    margin = @selectionMargin direction
    if margin
      siblingTangible = padding direction, margin
      margin: margin
      siblingTangible: tangibleSurroundedBy direction,
        (edgeOfList direction, margin.in),
        (edgeOfList (opposite direction), siblingTangible)

  # This returns tangible-like corresponding to the whitespace in given
  # direction surrounding current selections,
  # or nothing if there is no space in that direction.
  selectionMargin: (direction) ->
    paddingNodes = padding direction, @selectedTangible()
    paddingEdge = edgeOfList direction, paddingNodes
    if isWhitespace paddingEdge
      insToTangible paddingNodes
    else
      null

  selectedNodeEdge: (direction) ->
    nodeEdgeOfTangible direction, @selectedTangible()

  editedAtom: ->
    if @isEditing()
      @onlySelectedExpression()

  onlySelectedExpression: ->
    onlyExpression @selectedTangible()

  # This render-like function, taking in a the desired output and
  # doing the imperative work to achieve it
  #
  # possible fields:
  #
  #     changeWithinAtom:
  #       string: String
  #       range: [Int, Int]
  #     removedNodes: (List Node)
  #     inserted:
  #       added: (List Node)
  #       at: Selections
  #     withinAtom: Atom
  #     withinAtomPos: Int
  #     selection: Selections
  #     inSelection: Node
  #     inSelections: (List Node)
  #
  # The state of the current selection is:
  # $nodes - these are selected nodes including following tokens until sibling
  #          next tangible; examples:
  #          1. (atom) apple   => in: [atom], out: [)]
  #          2. (atom apple)   => in: [atom], out: [_]
  #          3. (atom
  #               apple)       => in: [atom], out: [\n, __]
  #          4. (atom atom)    => in: [atom, _, atom], out: [)]
  #          5. (apple _ apl)  => in: [_], out: [_]
  #          6. (form) apl     => in: [(form)], out: [_]
  #          non-selection examples:
  #          1. (atom |)       => in: [], out: [)]
  #          2. (|
  #               )            => in: [], out: [\n, __]
  # $editing - Boolean
  mutate: (state) ->
    # 1.1. changeInTree
    if state.changeInTree
      replaced = state.changeInTree.at
      added = state.changeInTree.added or []
      # console.log "change in tree", replaced, state.selection
      removedRange = @rangeOfTangible replaced
      addedString = nodesToString added
      # console.log "removed", removedRange, addedString
      ammendAst replaced, added
    # 1.2. changeWithinAtom
    if state.changeWithinAtom
      throw "atom edit during tree edit not supported" if removedRange
      replaced = state.changeWithinAtom.range
      added = state.changeWithinAtom.string
      atom = state.changeWithinAtom.atom or @editedAtom()
      removedRange = @rangeWithingAtom atom, replaced
      addedString = added
      ammendToken atom, replaced, added
    if addedString?
      # 2. Now reposition AST to get correct locations
      @repositionAst()
      # 3. Perform editor actions to reconcile AST with contents
      @editor.session.replace removedRange, addedString
    # 4.1. selections
    if state.inSelection or state.inSelections or state.tangibleSelection or state.selectionRange
      selections = state.tangibleSelection or
        state.selectionRange and (@tangibleSelectionFromRange state.selectionRange) or
        insToTangible state.inSelections or [state.inSelection]
      selectionRange = @rangeOfTangible selections
      editing = no
    # 4.2. withinAtom
    if state.withinAtom
      throw "shouldn't set both withinAtom and selection" if selections
      selections = insToTangible [state.withinAtom]
      selectionRange = @rangeWithingAtom state.withinAtom, [state.withinAtomPos, state.withinAtomPos]
      editing = yes
    if selections
      # 5. set selection state
      @select selections, editing
      # 6. Perform selection in editor
      @setSelectionRange selectionRange
    # 7. Add new multi-select range
    if state.newSelection
      newSelections = state.newSelection
      range = @tangibleRange newSelections
      @selectFor newSelections, no, range
      @editor.selection.addRange range
    return yes # command handled response

  handleCommandExecution: =>
    # 8. Highlight edited in editor
    @updateEditingMarkers()

  select: (selections, shouldEdit) ->
    @editor.selection.$nodes = selections
    @editor.selection.$editing = shouldEdit

  selectFor: (selections, shouldEdit, editorSelection) ->
    editorSelection.$nodes = selections
    editorSelection.$editing = shouldEdit

  setSelectionRange: (range) ->
    @editor.selection.setSelectionRange range

  updateEditingMarkers: ->
    editorSelections =
      if @editor.multiSelect.inMultiSelectMode
        @editor.multiSelect.ranges
      else
        [@editor.selection]
    for range, i in editorSelections
      @updateEditingMarkerFor (@isEditingFor range), range

  updateEditingMarkerFor: (shouldEdit, editorSelection) ->
    if id = editorSelection.$editMarker
      @editor.session.removeMarker id
      editorSelection.$editMarker = undefined
    if shouldEdit
      atom = onlyExpression editorSelection.$nodes
      range = @editableRange atom
      id = @editor.session.addMarker range, 'ace_active-token'
      editorSelection.$editMarker = id

  selectedTangible: ->
    @editor.selection.$nodes

  isEditing: ->
    @editor.selection.$editing

  isEditingFor: (editorSelection) ->
    editorSelection.$editing

  isEditingDelimited: ->
    @isEditing() and isDelimitedAtom @editedAtom()

  isSelecting: ->
    not @isEditing() and @selectedTangible().in.length > 0

  isSelectingMultiple: ->
    @isSelecting() and @selectedTangible().in.length > 1

  findParentFunction: (form) ->
    operator = _operator form
    if operator.symbol is 'fn'
      form
    else if form.parent
      @findParentFunction form.parent

  findParamList: (form) ->
    [params] = _arguments form
    params

  wrap: (tokens...) ->
    i = tokens.indexOf yes
    throw new Error "missing yes in wrap" if i is -1
    string = (join tokens[0...i], tokens[i + 1...]).join ''
    @wrapIn string, i, @selectedTangible()

  wrapIn: (wrapperString, index, tangible) ->
    [wrapper] = astize wrapperString, parentOfTangible tangible
    empty = tangible.in.length is 0

    # First replace, then reinsert
    @mutate
      changeInTree:
        at: tangible
        added: [wrapper]
    @mutate
      changeInTree:
        at:
          in: []
          out: [wrapper[index]]
        added: tangible.in
      inSelections: tangible.in if not empty
      tangibleSelection:
        if empty
          in: []
          out: [wrapper[index]]

  toText: (node) ->
    @editor.session.doc.getTextRange @range node

  editableRange: (atom) ->
    if isDelimitedAtom atom
      @delimitedAtomRange atom
    else
      @range atom

  # Proc Pos
  cursorPosition: ->
    @editor.getCursorPosition()

  # When the user cancels multiple selection we need to clean up
  handleRangeDeselect: ({ranges}) =>
    for range in ranges
      @updateEditingMarkerFor no, range

  # For strings, regexes etc.
  delimitedAtomRange: (atom) ->
    {start, end} = @range atom
    Range.fromPoints (@shiftPosBy start, 1), (@shiftPosBy end, -1)

  rangeWithingAtom: (atom, range) ->
    [start, end] = sortTuple range
    Range.fromPoints (@idxToPos atom.start + start),
      (@idxToPos atom.start + end)

  rangeOfNodes: (nodes) ->
    [first, ..., last] = nodes
    positionsToRange (@startPos first), (@endPos last)

  rangeOfTangible: (tangible) ->
    [from, to] = nodeEdgesOfTangible tangible
    positionsToRange (@startPos from), (@startPos to)

  range: (node) ->
    start = @startPos node
    end = @endPos node
    Range.fromPoints start, end

  edgeOfToken: (direction, node) ->
    @idxToPos edgeIdxOfNode direction, node

  # Proc Node Pos
  startPos: (node) ->
    @idxToPos node.start

  # Proc Node Pos
  endPos: (node) ->
    @idxToPos node.end

  # Proc Pos Pos Int
  distance: (posA, posB) ->
    Math.abs (@posToIdx posB) - (@posToIdx posA)

  # Idx Int
  # Pos {row: Int col: Int}
  #
  # Proc Idx Pos
  idxToPos: (idx) ->
    @editor.session.doc.indexToPosition idx

  # Proc Pos Idx
  posToIdx: (pos) ->
    @editor.session.doc.positionToIndex pos

  # Proc Pos Pos
  shiftPosBy: (pos, offset) ->
    @idxToPos (@posToIdx pos) + offset

  createWorker: (session) ->
    worker = new WorkerClient ["ace", "compilers"],
      "compilers/teascript/worker",
      "Worker",
      null
    @worker = worker

    if session
      worker.attachToDocument session.getDocument()

      # HUGE HACK to load prelude by default
      # window.requireModule 'Tea.Prelude'
      # if @memory
      #   @prefixWorker @loadPreludeNames()

      worker.on "error", (e) ->
        session.setAnnotations [e.data]

      worker.on "ok", (e) =>
        session.clearAnnotations()

    worker

  # prefixWorker: (input) ->
  #   @worker.emit 'prefix', data: data: input

  # HUGE HACK to load prelude by default
  # window.requireModule 'Tea.Prelude'
  loadPreludeNames: ->
    # TODO: reenable
    # try
    #   names = compiler.exportList (@memory.loadSource 'Tea.Prelude').value
    # catch e
    #   throw new Error e.message + " in module Tea.Prelude"
    # joinedNames = "[#{names.join ' '}]"
    # "#{joinedNames} (require Tea.Prelude #{joinedNames}) "
    ""

  preExecute: (memory) ->
    window.requireModule = (fileName, names) ->
      # try
      #   module = eval compiler.compileModule (memory.loadSource fileName).value
      # catch e
      #   throw new Error e.message + " in module #{fileName}"
      # for name in names
      #   module[name]

onlyExpression = (tangible) ->
  [node] = tangible.in
  if tangible.in.length is 1 and isExpression node
    node

tangibleEdge = (direction, tangible) ->
  edge = edgeOfList direction, tangible.in
  if direction is FORWARD or tangible.in.length is 0
    in: if not edge or isWhitespace edge then [] else [edge]
    out: tangible.out
  else
    if isWhitespace edge
      in: []
      out: [edge]
    else
      insToTangible [edge]

parentOfTangible = (tangible) ->
  tangible.out[0].parent

nodeEdgeOfTangible = (direction, tangible) ->
  edgeOfList direction, nodeEdgesOfTangible tangible

nodeEdgesOfTangible = (tangible) ->
  [from] = join tangible.in, tangible.out
  [to] = tangible.out
  [from, to]

# Takes in a list of nodes, possibly ending in an expression, to be the in
# part of a selections object. Returs a valid selections object for the state.
insToTangible = (ins) ->
  [..., last] = ins
  next = sibling NEXT, last
  in: ins
  out: validOut next

followingTangibleAtomOrPosition = (direction, tangible) ->
  node = paddingEdge direction, tangible
  if isDelim node
    if parent = tangibleParent tangible
      followingTangibleAtomOrPosition direction, parent
  else
    siblingTangible = tangibleSurroundedBy direction, node, sibling direction, node
    if isForm siblingNode = toNode siblingTangible
      tangibleInAfter direction, limitToken (opposite direction), siblingNode
    else
      siblingTangible

# siblingTangible = (direction, node) ->
#   (other = sibling direction, node) and tangibleInAfter direction, other

tangibleParent = (tangible) ->
  parent = parentOfTangible tangible
  if isReal parent
    insToTangible [parent]

tangibleSurroundedBy = (direction, first, second) ->
  [before, after] = inOrder direction, first, second
  if before is after
    insToTangible [before]
  else if (isClosingDelim before)
    insToTangible [before.parent]
  else if (isOpeningDelim after)
    insToTangible [after.parent]
  else if (isExpression before)
    in: [before]
    out: validOut after
  else if (isExpression after)
    insToTangible [after]
  else if (isOpeningDelim before) or (not isIndent after)
    in: []
    out: [after]
  else
    tangibleInAfter direction, second

tangibleInAfter = (direction, node) ->
  (other = sibling direction, node) and tangibleSurroundedBy direction, node, other

tangibleInside = (direction, form) ->
  tangibleEdge direction, insideTangible form

inOrder = (direction, a, b) ->
  if direction is FORWARD then [a, b] else [b, a]

insideTangible = (form) ->
  in: form[1...-1]
  out: form[-1...]

# Returns the edge of the padding
paddingEdge = (direction, tangible) ->
  edgeOfList direction, padding direction, tangible

# This returns the surrounding whitespace or delimiter in given direction
padding = (direction, tangible) ->
  if direction is FORWARD
    tangible.out
  else
    precedingWhitespace sibling PREVIOUS, toNode tangible

# Returns the first in or first out node, for convenience
toNode = (tangible) ->
  nodeEdgeOfTangible FIRST, tangible

precedingWhitespace = (node) ->
  if isIndent node
    [(sibling PREVIOUS, node), node]
  else
    [node]

validOut = (node) ->
  siblingNode = sibling NEXT, node
  if (isWhitespace node) and siblingNode and isIndent siblingNode
    [node, siblingNode]
  else
    [node]

# followingToken = (direction, node) ->
#   limitToken (opposite direction), (sibling direction, node)

limitToken = (direction, node) ->
  if (isForm node)
    limitToken direction, (edgeOfList direction, node[1...-1])
  else
    node

depthOf = (node) ->
  if not isReal node
    -1
  else
    1 + depthOf node.parent

# Proc Node Form ()
insertChildNodeAt = (child, parent, index) ->
  child.parent = parent
  parent.splice index, 0, child

ammendAst = (replaced, added) ->
  parent = replaced.out[0].parent
  for node in added
    node.parent = parent
  index = childIndex (nodeEdgeOfTangible FIRST, replaced)
  parent.splice index, replaced.in.length, added...
  # console.log "ammended", replaced, added, parent

ammendToken = (token, at, added) ->
  [start, end] = sortTuple at
  removed = end - start
  token.symbol = spliceString token.symbol, start, removed, added
  token.end += added.length - removed

append = (direction, tangibleA, tangibleB) ->
  [before, after] = inOrder direction, tangibleA, tangibleB
  in: join before.in, after.in
  out: after.out

sortTuple = ([a, b]) ->
  [(Math.min a, b), (Math.max a, b)]

nodesToString = (nodes) ->
  string = ""
  for node in nodes
    string +=
      if isForm node
        nodesToString node
      else
        node.symbol
  string

editableLength = (atom) ->
  if isDelimitedAtom atom
    atom.symbol.length - 2
  else
    atom.symbol.length

# Fn Node Bool
isExpression = (node) ->
  not (isWhitespace node) and not (isDelim node)

# Fn Node Bool
isAtom = (node) ->
  (isExpression node) and not isForm node

# Fn Node Bool
isDelimitedAtom = (atom) ->
  atom.label in ['string', 'regex']

# Fn Atom String
atomDelimiter = (atom) ->
  atom.symbol[0]

# Fn Atom Bool
isDelim = (atom) ->
  /[\(\)\[\]\{\}]/.test atom.symbol

# Fn Atom Bool
isClosingDelim = (atom) ->
  /[\)\]\}]/.test atom.symbol

# Fn Atom Bool
isOpeningDelim = (atom) ->
  /[\(\[\{]/.test atom.symbol

# Fn Node Bool
isWhitespace = (node) ->
  node.label in ['whitespace', 'indent']

# Fn Node Bool
isIndent = (node) ->
  node.label is 'indent'

# Fn Token Bool
isSpace = (token) ->
  token.symbol is ' '

isNewLine = (token) ->
  token.symbol is '\n'

# Whether the node is actually inside current editor
# Fn Node Bool
isReal = (node) ->
  node.start >= 0

escape = (what, string) ->
  string.replace ///#{what}///g, "\\#{what}"

repeat = (n, string) ->
  (new Array n + 1).join string

extend = (a, b) ->
  c = {}
  for key, value of a
    c[key] = value
  for key, value of b
    c[key] = value
  c

findTokensBetween = (expression, start, end) ->
  # console.log "looking between #{start} and #{end} in", expression
  if start < expression.end and expression.start < end
    if isForm expression
      concat (for expr in expression
        findTokensBetween expr, start, end)
    else
      [expression]
  else
    []

# Converts TeaScript tokens to Ace tokens
convertToAceLineTokens = (tokens) ->
  # console.log  "tokens on line", tokens
  converted = map convertToAceToken, tokens
  # console.log "converted", converted
  # Strip newlines characters
  if (last = converted[converted.length - 1]) and last.value is '\n'
    converted.pop()
  converted

convertToAceToken = (token) ->
  value: token.symbol
  type:
    if (isDelim token) and token.parent.malformed or token.malformed
      'token_malformed'
    else
      switch token.label
        when 'whitespace' then 'text'
        else
          if token.label
            'token_' + token.label
          else
            'text'

topList = (ast) ->
  inside = ast[1...-1]
  inside.start = ast.start + 1
  inside.end = ast.end - 1
  inside

edgeIdxOfNode = (direction, node) ->
  if direction is FORWARD then node.end else node.start

edgeOfList = (direction, list) ->
  [first, ..., last] = list
  if direction is FORWARD then last else first

positionsToRange = (start, end) ->
  Range.fromPoints start, end

# Like Array::splice
spliceString = (string, index, count, add) ->
  string[0...index] + add + string[index + count...]

previousExpression = (expression) ->
  reached = no
  for node in expression.parent by -1
    if reached and isExpression node
      return node
    if node is expression
      reached = yes
  # Default for now to the same expression
  expression

nextExpression = (expression) ->
  reached = no
  for node in expression.parent
    if reached and isExpression node
      return node
    if node is expression
      reached = yes
  # Default for now to the same expression
  expression

# Proc Node (Maybe Node)
parentOf = (node) ->
  node.parent if isReal node.parent

# Proc Direction Node (Maybe Node)
sibling = (direction, node) ->
  node.parent[(childIndex node) + direction]

# Proc Node (Maybe Node)
previous = (node) ->
  node.parent[(childIndex node) - 1]

# Proc Node (Maybe Node)
next = (node) ->
  node.parent[(childIndex node) + 1]

# Fn Node Int
childIndex = (node) ->
  indexWithin node, node.parent

indexWithin = (what, array) ->
  for element, i in array
    if element is what
      return i
  throw new Error "what is not inside of array in indexWithin"

duplicateProperties = (newAst, oldAst) ->
  # for now let's duplicate labels
  #   WARNING the position of newAst might be off if it comes from a larger prefixed expression
  #     like compiling a command line together with source
  oldAst.malformed = newAst.malformed
  oldAst.tea = newAst.tea
  if isForm newAst
    for node, i in newAst
      duplicateProperties node, oldAst[i]
  else
    oldAst.label = newAst.label

# Astizes string and reindents it properly
astize = (string, parent) ->
  wrapped = compiler.astizeExpression "(#{string})"
  reindent (depthOf parent), wrapped
  [open, expressions..., close] = wrapped
  expressions

reindent = (depth, ast, next) ->
  if isForm ast
    reindent depth + 1, node, ast[i + 1] for node, i in ast
  else if next and depth > 0 and isNewLine ast
    indent = repeat depth, '  '
    if isIndent next
      setIndentTo next, indent
    else
      # Insert new indent token
      [newLine, indentToken] = astizeExpressions "\n  "
      setIndentTo indentToken, indent
      insertChildNodeAt indentToken, next.parent, childIndex next
  return

setIndentTo = (token, indent) ->
  token.symbol = indent
  token.end = token.start + indent.length

astizeExpressions = (string) ->
  [open, expressions..., close] = compiler.astizeExpression "(#{string})"
  expressions

LAST = FORWARD = NEXT = 1
FIRST = BACKWARD = PREVIOUS = -1

opposite = (direction) ->
  direction * -1