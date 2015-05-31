ace          = require("ace/ace")
# Outdent      = require("ace/mode/matching_brace_outdent").MatchingBraceOutdent
# FoldMode     = require("ace/mode/folding/coffee").FoldMode
Range        = require("ace/range").Range
TextMode     = require("ace/mode/text").Mode
Behaviour    = require("ace/mode/behaviour").Behaviour
Selection    = require("ace/selection").Selection
oop          = require("ace/lib/oop")
EventEmitter = require("ace/lib/event_emitter").EventEmitter
HashHandler  = require("ace/keyboard/hash_handler").HashHandler

CustomAutocomplete = require "./CustomAutocomplete"
CustomSearchBox = require "./CustomSearchBox"
CombinedTooltip = require "./CombinedTooltip"

DistributingWorkerClient = require("app/DistributingWorkerClient")


log = (arg) ->
  console.log arg
  arg

{
  isForm
  isCall
  concat
  map
  concatMap
  zipWith
  unzip
  filter
  join
  all
  __
  sortedArgs
  originOf
  _is
  _notEmpty
  _empty
  _operator
  _arguments
  _terms
  _validTerms
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
  constructor: (@isSingleLineInput) ->
    @$tokenizer =
      # TODO: passing of doc would require change in ACE, this MIGHT BREAK SOMETHING, check and remove todo
      getLineTokens: (line, state, row, doc = @editor.session.getDocument()) =>
        if tokens = @tokensOnLine row, doc
          tokens: convertToAceLineTokens tokens
        else
          tokens: [value: line, type: 'text']
    oop.implement @$tokenizer, EventEmitter

    # @$outdent = new Outdent
    # @foldingRules = new FoldMode
    @$behaviour = undefined
    @completers = [@completer = @createCompleter()]

  tokensOnLine: (row, doc) =>

    # Gets called before @editor is set
    start = doc.positionToIndex row: row, column: 0
    end = doc.positionToIndex row: row + 1, column: 0

    # if not @ast
    #   @onDocumentChange doc
    if not @ast
      return undefined
    findNodesBetween (topList @ast), start, end

  getTokenAt: (pos) ->
    @tokenFollowingPos pos

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

  # checkOutdent: (state, line, input) ->
  #   @$outdent.checkOutdent line, input

  # autoOutdent: (state, doc, row) ->
  #   @$outdent.autoOutdent doc, row

  detachFromSession: (session) ->
    # session.removeListener 'change', @onDocumentChange
    # @editor.removeListener 'click', @handleClick
    @editor.removeListener 'mousedown', @handleMouseDown
    @editor.removeListener 'mouseup', @handleMouseUp
    @editor.tokenTooltip.destroy()
    @editor.onPaste = @__editorOnPaste
    @editor.getCopyText = @__editorCopyText
    @editor.setOption 'dragEnabled', yes
    @editor.setOption 'enableBlockSelect', yes
    # session.getDocument().removeListener 'change', @selectInserted

  attachToEditor: (editor) ->
    session = editor.session
    @editor = editor

    @editor.completers = @completers

    session.setUndoManager @undoManager()

    editor.setOption 'dragEnabled', no
    editor.setOption 'enableBlockSelect', no

    # session.on 'change', @onDocumentChange
    # @editor.on 'click', @handleClick
    @editor.on 'mousedown', @handleMouseDown
    @editor.on 'mouseup', @handleMouseUp
    @editor.tokenTooltip = new CombinedTooltip @editor
    @editor.tokenTooltip.setTooltipContentForToken = @docsTooltip
    @__editorOnPaste = @editor.onPaste
    @editor.onPaste = @handlePaste
    @__editorCopyText = @editor.getCopyText
    @editor.getCopyText = @handleCopy
    @editor.selection.on 'removeRange', @handleRangeDeselect
    @editor.commands.on 'afterExec', @handleCommandExecution

    @createMultiSelectKeyboardHandler()
    session.multiSelect.on 'multiSelect', @addMultiSelectKeyboardHandler
    session.multiSelect.on 'singleSelect', @removeMultiSelectKeyboardHandler

    @editor.on 'blur', @detach

    # attaching as last listener, so that everything is updated already
    # session.getDocument().on 'change', @selectInserted, no

    unless @isSingleLineInput
      @addVerticalCommands session
    @addCommands session

    # Initial parse
    @initAst ""

  # onDocumentChange: =>
  #   # console.log "setting DIRTY true"
  #   @dirty = true

  setContent: (string, selectedRange, moduleName) ->
    # console.log "setting content"
    try
      @reportModuleName moduleName if moduleName?
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
      @undoManager().clear()
    catch e
      # Make sure we don't error so data is never lost when loading files
      console.error e, e.stack
      console.error string
      @editor.insert string

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
  updateAst: (ast, errors = []) ->
    duplicateProperties ast, @ast
    @$tokenizer._signal 'update', data: rows: first: 1
    @updateAutocomplete()
    @addErrorMarkers errors

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

  addErrorMarkers: (errors) ->
    @removeErrorMarkers()
    @errorMarkers = []
    [firstError] = errors
    if firstError
      {message, conflicts} = firstError
      if message
        @errorMarkers = for type, i in conflicts when type and origin = originOf type
          trueOrigin = _transformed origin
          [node] = findNodeWithPosition @ast, trueOrigin.start, trueOrigin.end
          node: node
        @updateErrorMarkers()

  updateErrorMarkers: ->
    @removeErrorMarkers()
    for marker in @errorMarkers or [] when marker.node
      {node} = marker
      range = @nodeRange node
      marker.id = @editor.session.addMarker range, 'clazz', (@showError range, node.tea), yes

  removeErrorMarkers: ->
    @editor.session.removeMarker id for {id} in @errorMarkers or [] when id

  showError: (range, type) ->
    draw = (stringBuilder, r, l, t, config, layer) =>
      if range.isMultiLine()
        row = range.start.row
        lineRange = new Range row, range.start.column,
          row, @editor.session.getScreenLastRowColumn row
        subclass = ' golem_error-origin-open'
      else
        lineRange = range
        subclass = ''
      layer.drawSingleLineMarker stringBuilder, lineRange,
        'golem_error-origin' + subclass, config
    draw.type = type
    draw

  doAutocomplete: (e) ->
    editor = @editor

    # Make sure this is an actual command and not an action on the updater
    ignoredCommands = ['Up', 'Down', 'Ctrl-Up|Ctrl-Home', 'Ctrl-Down|Ctrl-End',
      'PageUp', 'PageDown']
    if e?.command.autocomplete and
        (
          (atom = @editedAtom()) and (not isHalfDelimitedAtom atom) and
          (not isNumerical atom) and
          (@offsetToCursor atom) is atom.symbol.length or
          @isInserting())
      @openAutocomplete()
    else if editor.completer and (e?.command.name not in ignoredCommands or
        atom and isNumerical atom)
      editor.completer.detach()

  openAutocomplete: ->
    editor = @editor
    if !@isAutocompleting() or @isInserting()
      if !editor.completer
        # Create new autocompleter
        editor.completer = new CustomAutocomplete()
      # Disable autoInsert
      #editor.completer.autoInsert = false;
      @closeTooltip()
      editor.completer.showPopup editor
    # else if @isInserting()
    #   @editor.completer.updateCompletions()

  updateAutocomplete: ->
    if @isAutocompleting()
      @editor.completer.updateCompletions()
    else if @editor.isFocused() and
        (@isInserting() or (selected = @onlySelectedExpression()) and not selected.tea)
      @openAutocomplete()

  isAutocompleting: ->
    @editor.completer and @editor.completer.activated

  createCompleter: =>
    completer =
      getCompletions: (editor, session, pos, prefix, callback) =>
        return if prefix and editor.completer.completions?.filtered.length > 0
        # TODO: type directed and other
        targetMode = session.getMode()
        if targetMode.isEditing()
          typed = targetMode.editedAtom()
          editedSymbol = typed.symbol
        else
          typed = toNode targetMode.selectedTangible()
        if typed.tea and not typed.tea.ForAll and not typed.assignable?.top
          reference =
            type: typed.tea
            scope: typed.scope
            pattern: typed.assignable
          # TODO: plain text for non-typed expressions
          @worker.call 'matchingDefinitions', [reference], (completions) =>
            callback null, (for symbol, {type, score, rawType, arity, docs} of completions# when symbol isnt editedSymbol
              name: symbol
              value: symbol
              completer: completer
              score: score
              meta: type
              rawType: rawType
              arity: arity
              docs: docs)
        else if typed.inferredType
          @worker.call 'availableTypes', [typed.inferredType], (completions) ->
            callback null, (for name, {type, docs} of completions
              name: type
              value: type
              completer: completer
              docs: docs)
        else
          callback "error", []
          return


      getDocTooltip: (selected) =>
        if selected.rawType and not selected.docHTML
          selected.docHTML = @createDocTooltipHtml selected
        return

      insertMatch: (editor, {value}) =>
        mode = editor.session.getMode()
        mode.startGroupMutation()
        mode.removeSelected()
        mode.insertStringForward value
        if isForm selected = mode.onlySelectedExpression()
          mode.mutate
            tangibleSelection: firstFakeInside FORWARD, selected
        mode.finishGroupMutation()

  docsTooltip: (token, tooltip) =>
    activate = (html) =>
      tooltip.setHtml html
      tooltip.open()
      @activeTooltip = tooltip
    tooltip.hideAndRemoveMarker();
    if token.scope?
      reference = name: token.symbol, scope: token.scope
      @worker.call 'docsFor', [reference], (info) =>
        if info?.rawType
          # TODO: until we insert the type directly into text
          activate if token.label is 'name'
            @prettyPrintTypeForDoc info
          else
            @createDocTooltipHtml info
    else if token.malformed
      activate token.malformed
    else if type = token.type?.type
      activate @prettyPrintTypeForDoc rawType: type

  closeTooltip: =>
    @detach()

  detach: =>
    @activeTooltip?.hideAndRemoveMarker()

  createDocTooltipHtml: (info) ->
    paramNames = info.arity or []
    params = paramNames.join ' '
    """
    <span style='color: #9EE062'>#{info.name}</span> \
    <span style='color: #9C49B6'>#{params}</span>
    #{@prettyPrintTypeForDoc info}
    """ +
    if info.docs
      docs = compiler.labelDocs info.docs, paramNames
      """

      #{docs}
      """
    else
      ''

  prettyPrintTypeForDoc: ({rawType}) ->
    compiler.prettyPrint rawType

  handleMouseDown: (event) =>
    @mouseDownTime = +new Date

  handleMouseUp: (event) =>
    event.duration = (new Date) - @mouseDownTime
    event.preventDefault()
    @handleClick event

  handleClick: (event) =>
    LONG_CLICK_DURATION = 200
    if event.duration > LONG_CLICK_DURATION #event.domEvent.altKey
      @editor.execCommand 'edit by click'
    else if event.domEvent.shiftKey
      @editor.execCommand 'expand selection by click'
    else
      # TODO: show what will be selected on mousemove
      # Select preceding expression
      #   or enclosing expression if whitespace preceeds and there is an enclosing expression
      #   or set insert position
      # select clicked word or its parent if whitespace selected
      if @ast
        @editor.execCommand 'select by click'

  # Strips indent from copied expression so it can be correctly pasted
  handleCopy: =>
    selectedText = @editor.getSelectedText()
    indentSize = depthOf toNode @selectedTangible()
    if indentSize > 0
      selectedText.replace (new RegExp "\\n#{Array(indentSize * 2 + 1).join ' '}", 'g'), '\n'
    else
      selectedText

  handlePaste: (string) =>
    expressions = string.split /(?:\r\n|\r|\n)(?!\s)/
    selections = @editor.selection.rangeList.ranges

    if expressions.length > selections.length || expressions.length < 2 || !expressions[1]
      return @editor.commands.exec "insertstring", @editor, string

    @startGroupMutation()
    @editor.forEachSelection exec: =>
      @insertStringForward expressions[@editor.selection.index]
    @finishGroupMutation()
    @handleCommandExecution command: name: 'paste'

  undoManager: =>
    @undoStack or= []
    @redoStack or= []
    @groupMutationRegister or= states: []
    execute: =>
      # ignore
    # Our custom execute which saves the reversal of the performed mutation
    registerMutation: (state, way) =>
      stack = if way.undo then @undoStack else @redoStack
      reversals = []
      if state.changeInTree
        replaced = state.changeInTree.at
        added = state.changeInTree.added or []
        reversals.push
          changeInTree:
            at:
              in: added
              out: replaced.out
            added: replaced.in
      if state.changeWithinAtom
        [from, to] = sortTuple state.changeWithinAtom.range
        added = state.changeWithinAtom.string
        atom = state.changeWithinAtom.atom or @editedAtom()
        reversals.push
          changeWithinAtom:
            range: [from, from + added.length]
            string: atom.symbol[from...to]
            atom: atom
      reversals.push(
        if @isEditing()
          atom = @editedAtom()
          withinAtom: atom
          withinAtomPos: @distance (@startPos atom), @editor.selection.getRange().end
        else
          tangibleSelection: @selectedTangible())

      @groupMutationRegister.stack = stack
      @groupMutationRegister.states.push merge reversals
    packGroupMutation: =>
      {stack, states} = @groupMutationRegister
      states.reverse()
      stack.push (
        if @sameKindMutation states, stack[stack.length - 1] or []
          res = states.concat stack.pop()
        else
          states)
      @groupMutationRegister = states: []
    undo: =>
      @replay @undoStack, redo: yes
      # console.log "should have undone"
    redo: =>
      @replay @redoStack, undo: yes
      # console.log "should have redone"
    clear: =>
      @undoStack = []
      @redoStack = []

  replay: (stack, way) =>
    states = stack.pop()
    if states
      @startGroupMutation()
      for state in states
        @mutate state, way
      @finishGroupMutation()

  sameKindMutation: (previousStates, nextStates) ->
    if previousStates.length > 0 and nextStates.length > 0
      [p] = previousStates
      [n] = nextStates
      # Renaming
      (atom = p.changeInTree?.added[0]) and atom is n.changeWithinAtom?.atom or
      # Inserting in atom
      (atom = p.changeWithinAtom?.atom) and p.changeWithinAtom.string.length > 0 and
        atom is n.changeWithinAtom?.atom and n.changeWithinAtom.string.length > 0 or
      # Removing atom
      (atom = p.changeWithinAtom?.atom) and p.changeWithinAtom.string.length is 0 and
        atom is n.changeInTree?.at.in[0] or
      # Deleting in atom
      (atom = p.changeWithinAtom?.atom) and p.changeWithinAtom.string.length is 0 and
        atom is n.changeWithinAtom?.atom and n.changeWithinAtom.string.length is 0
    else
      no

  addVerticalCommands: ->
    @editor.commands.addCommands
      'move up to atom or position':
        bindKey: win: 'Up', mac: 'Up'
        multiSelectAction: 'forEach'
        exec: =>
          @selectLineAdjecentAtomOrPosition PREVIOUS

      'move down to atom or position':
        bindKey: win: 'Down', mac: 'Down'
        multiSelectAction: 'forEach'
        exec: =>
          @selectLineAdjecentAtomOrPosition NEXT

      'add a new sibling expression on the next line':
        bindKey: win: 'Enter', mac: 'Enter'
        multiSelectAction: 'forEach'
        exec: =>
          @replaceSpace FORWARD, '\n'

      # TODO: this is very useful, should add on a new line inside of definition
      #       or something like that
      # 'add node on the next line':
      #   bindKey: win: 'Ctrl-Enter', mac: 'Ctrl-Enter'
      #   exec: =>
      #     @insertSpaceAt FORWARD, '\n',
      #       @tokenFollowingPos @endOfLine @cursorPosition()

          # if (token = @rightActiveToken()) and parent = token.parent
          #   @deselect()
          #   @unhighlightActive()
          #   @editor.moveCursorToPosition @tokenVisibleEnd parent
          #   @editor.insert '\n'

      'add a new sibling expression on the previous line':
        bindKey: win: 'Shift-Enter', mac: 'Shift-Enter'
        multiSelectAction: 'forEach'
        exec: =>
          @replaceSpace BACKWARD, '\n'

      'select the next reference of selection':
        bindKey: win: 'Tab', mac: 'Tab'
        scrollIntoView: 'center'
        multiSelectAction: 'forEach'
        exec: =>
          @selectReferenceInDirection FORWARD

      'select the previous reference of selection':
        bindKey: win: 'Shift-Tab', mac: 'Shift-Tab'
        scrollIntoView: 'center'
        multiSelectAction: 'forEach'
        exec: =>
          @selectReferenceInDirection BACKWARD

  createMultiSelectKeyboardHandler: =>
    @multiSelectKeyboardHandler = new HashHandler [
      name: 'escape multi select'
      bindKey: 'esc'
      scrollIntoView: 'cursor'
      readonly: true
      exec: =>
        selection = @editor.selection
        [..., firstSelected] = selection.ranges
        selection.toSingleRange firstSelected
      isAvailable: =>
        @isMultiSelecting()
    ]

  addMultiSelectKeyboardHandler: =>
    @editor.keyBinding.addKeyboardHandler @multiSelectKeyboardHandler

  removeMultiSelectKeyboardHandler: =>
    @editor.keyBinding.removeKeyboardHandler @multiSelectKeyboardHandler

  addCommands: ->
    # Never remove this command, it handles text insertion
    @editor.commands.addCommands
      'insertstring': # This is the default unhandled command name
        multiSelectAction: 'forEach'
        scrollIntoView: 'cursor'
        autocomplete: yes
        exec: (editor, string) =>
          @insertStringForward string

    @editor.commands.addCommands @commands =
      'select by click':
        autocomplete: yes
        exec: =>
          @mutate
            tangibleSelection: @tangibleAtPos @cursorPosition()

      'edit by click':
        multiSelectAction: 'forEach' #edits multiple
        autocomplete: yes
        exec: =>
          tangible = @tangibleAtPos @cursorPosition()
          node = onlyExpression tangible
          @mutate(
            if node and isAtom node
              withinAtom: node
              withinAtomPos: @offsetToCursor node
            else
              tangibleSelection: tangible)

      'expand selection by click':
        multiSelectAction: 'forEach' #selects multiple
        exec: =>
          # 1. find ancestors with a common parent
          #    of the current selections
          #    of the clicked tangible
          # 2. select between the ancestors
          [from, to] = siblingTangibleAncestors @selectedTangible(),
            (@tangibleAtPos @cursorPosition())
          @mutate
            tangibleSelection: tangibleBetween from, to

      'cut': # This is the default unhandled command name
        scrollIntoView: 'cursor'
        multiSelectAction: 'forEach'
        autocomplete: yes
        exec: =>
          range = @editor.getSelectionRange()
          @editor._emit('cut', range) # performs copy
          @remove FORWARD

      'find':
        bindKey: win: "Ctrl-Shift-F", mac: "Command-F"
        readOnly: true
        exec: =>
          if not @isSingleLineInput
            CustomSearchBox.Search @editor

      'selectall':
        bindKey: win: "Ctrl-A", mac: "Command-A"
        readOnly: true
        exec: =>
          @mutate
            tangibleSelection: insideTangible @ast

      'select enclosing expression':
        bindKey: win: 'Ctrl-Up', mac: 'Command-Up'
        multiSelectAction: 'forEach'
        exec: =>
          @mutate
            inSelection:
              if @isEditing()
                @editedAtom()
              else
                @realParentOfSelected()

      'select the first expression inside selection':
        bindKey: win: 'Ctrl-Down', mac: 'Command-Down'
        multiSelectAction: 'forEach'
        autocomplete: yes
        exec: =>
          @moveDown FIRST, LAST

      'select the last expression inside selection':
        bindKey: win: 'Ctrl-Shift-Down', mac: 'Command-Shift-Down'
        multiSelectAction: 'forEach'
        autocomplete: yes
        exec: =>
          @moveDown LAST, FIRST

      'move to next atom or position':
        bindKey: win: 'Right', mac: 'Right'
        multiSelectAction: 'forEach'
        autocomplete: yes
        exec: =>
          @selectFollowingAtomOrPosition NEXT

      'move to previous atom or position':
        bindKey: win: 'Left', mac: 'Left'
        multiSelectAction: 'forEach'
        autocomplete: yes
        exec: =>
          @selectFollowingAtomOrPosition PREVIOUS

      'select next sibling expression':
        bindKey: win: 'Ctrl-Right', mac: 'Command-Right'
        multiSelectAction: 'forEach'
        autocomplete: yes
        exec: =>
          @selectSibling NEXT

      'select previous sibling expression':
        bindKey: win: 'Ctrl-Left', mac: 'Command-Left'
        multiSelectAction: 'forEach'
        autocomplete: yes
        exec: =>
          @selectSibling PREVIOUS

      'include next expression in selection':
        bindKey: win: 'Shift-Right', mac: 'Shift-Right'
        multiSelectAction: 'forEach'
        exec: =>
          @expandSelection NEXT

      'include previous expression in selection':
        bindKey: win: 'Shift-Left', mac: 'Shift-Left'
        multiSelectAction: 'forEach'
        exec: =>
          @expandSelection PREVIOUS

      'add new sibling expression':
        bindKey: win: 'Space', mac: 'Space'
        multiSelectAction: 'forEach'
        autocomplete: yes
        exec: =>
          @insertSpace FORWARD, ' '

      'add new sibling expression before current':
        bindKey: win: 'Shift-Space', mac: 'Shift-Space'
        multiSelectAction: 'forEach'
        autocomplete: yes
        exec: =>
          @insertSpace BACKWARD, ' '

      'removeback':
        bindKey: win: 'Backspace', mac: 'Backspace'
        multiSelectAction: 'forEach'
        autocomplete: yes
        exec: =>
          @remove BACKWARD

      'remove-ala-delete':
        bindKey: win: 'Delete', mac: 'Delete'
        multiSelectAction: 'forEach'
        autocomplete: yes
        exec: =>
          @remove FORWARD

      'removeforward':
        bindKey: win: 'Ctrl-Backspace', mac: 'Ctrl-Backspace'
        multiSelectAction: 'forEach'
        autocomplete: yes
        exec: =>
          @remove FORWARD

      'flatten onto a single line':
        bindKey: win: 'Ctrl-Space', mac: 'Ctrl-Space'
        multiSelectAction: 'forEach'
        exec: =>
          @removeNewLines()

      'jump to next occurence of the selection':
        bindKey: win: 'Ctrl-Tab', mac: 'Alt-Tab'
        scrollIntoView: 'center'
        multiSelectAction: 'forEach'
        exec: =>
          @selectOccurenceInDirection FORWARD

      'jump to previous occurence of the selection':
        bindKey: win: 'Ctrl-Shift-Tab', mac: 'Alt-Shift-Tab'
        scrollIntoView: 'center'
        multiSelectAction: 'forEach'
        exec: =>
          @selectOccurenceInDirection BACKWARD

      'multiselect next reference':
        bindKey: win: 'Ctrl-S', mac: 'Ctrl-S'
        scrollIntoView: 'center'
        exec: =>
          @multiSelectReferenceInDirection FORWARD

      'multiselect previous reference':
        bindKey: win: 'Ctrl-Shift-S', mac: 'Ctrl-Shift-S'
        scrollIntoView: 'center'
        exec: =>
          @multiSelectReferenceInDirection BACKWARD

      'shift expression backward':
        bindKey: win: 'Alt-Left', mac: 'Alt-Left'
        multiSelectAction: 'forEach'
        autocomplete: yes
        exec: =>
          @moveSelection BACKWARD

      'shift expression forward':
        bindKey: win: 'Alt-Right', mac: 'Alt-Right'
        multiSelectAction: 'forEach'
        autocomplete: yes
        exec: =>
          @moveSelection FORWARD

      'shift all expressions on a line up':
        bindKey: win: 'Alt-Up', mac: 'Alt-Up'
        multiSelectAction: 'forEach'
        autocomplete: yes
        exec: =>
          @moveSelectionByLine BACKWARD

      'shift all expressions on a line down':
        bindKey: win: 'Alt-Down', mac: 'Alt-Down'
        multiSelectAction: 'forEach'
        autocomplete: yes
        exec: =>
          @moveSelectionByLine FORWARD

      'insert a character':
        bindKey: win: '\\', mac: '\\'
        multiSelectAction: 'forEach'
        #autocomplete: yes # TODO: add char autocompletion for special chars
        exec: =>
          @insertStringForward(
            if @isEditingHalfDelimited()
              '\\'
            else
              '\\_')

      'wrap in a call':
        bindKey: win: 'Ctrl-Shift-9', mac: 'Command-Shift-9'
        logicalKey: win: 'Ctrl-(', mac: 'Command-('
        multiSelectAction: 'forEach'
        autocomplete: yes
        exec: =>
          @wrap '(', {insert: yes}, ' ', {selected: yes}, ')'

      'wrap in parentheses':
        bindKey: win: '(', mac: '('
        multiSelectAction: 'forEach'
        autocomplete: yes
        exec: =>
          @insertOpeningDelim '(', ')'

      'wrap in brackets':
        bindKey: win: '[', mac: '['
        multiSelectAction: 'forEach'
        autocomplete: yes
        exec: =>
          @insertOpeningDelim '[', ']'

      'wrap in braces':
        bindKey: win: '{', mac: '{'
        multiSelectAction: 'forEach'
        autocomplete: yes
        exec: =>
          @insertOpeningDelim '{', '}'

      'insert or surround by quotes':
        bindKey: win: '"', mac: '"'
        multiSelectAction: 'forEach'
        exec: =>
          if @isEditingHalfDelimited()
            if (atom = @editedAtom()).label is 'string' and @isAtLimit FORWARD, atom
              @mutate
                inSelection: atom
            else
              @insertStringForward '"'
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

      'select enclosing form or insert )':
        bindKey: win: ')', mac: ')'
        multiSelectAction: 'forEach'
        exec: =>
          @closeParentOrInsert ')'

      'select enclosing form or insert }':
        bindKey: win: '}', mac: '}'
        multiSelectAction: 'forEach'
        exec: =>
          @closeParentOrInsert '}'

      'select enclosing form or insert ]':
        bindKey: win: ']', mac: ']'
        multiSelectAction: 'forEach'
        exec: =>
          @closeParentOrInsert ']'

      'increment a number':
        bindKey: win: 'Ctrl-Shift-Up', mac: 'Alt-Shift-Up'
        multiSelectAction: 'forEach'
        exec: =>
          @changeNumerical 1

      'decrement a number':
        bindKey: win: 'Ctrl-Shift-Down', mac: 'Alt-Shift-Down'
        multiSelectAction: 'forEach'
        exec: =>
          @changeNumerical -1

      'select enclosing definition':
        bindKey: win: 'Ctrl-Shift-0', mac: 'Command-Shift-0'
        logicalKey: win: 'Ctrl-)', mac: 'Command-)'
        multiSelectAction: 'forEach'
        exec: =>
          @mutate
            inSelection:
              definitionAncestorOf nodeEdgeOfTangible FIRST, @selectedTangible()

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

      'addlabel':
        bindKey: win: ':', mac: ':'
        multiSelectAction: 'forEach'
        autocomplete: yes
        exec: =>
          if @isSingleLineInput and @editor.getValue() is ''
            return no

          if @isEditingHalfDelimited()
            @insertStringForward ':'
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

      'insert a comment':
        bindKey: win: '#', mac: '#'
        multiSelectAction: 'forEach'
        exec: =>
          @wrap '(', '#', ' ', {selected: yes, select: yes}, ')'

      # Temporary
      'insert call-site type':
        bindKey: win: 'Ctrl-T', mac: 'Ctrl-T'
        indirect: yes
        autocomplete: yes
        exec: (editor, {targetEditor} = {}) =>
          # TODO: for same editor, this should add explicit type to function
          # based on its definition or call site
          if targetEditor
            targetMode = targetEditor.session.getMode()
            selected = targetMode.onlySelectedExpression()
            if selected and selected.tea
              type = compiler.plainPrettyPrint selected.tea
              withoutConcretes = type.replace /_\d+/, ''
              @startGroupMutation()
              @insertStringForward "(: #{withoutConcretes})"
              @mutate
                tangibleSelection: firstFakeInside FORWARD, @onlySelectedExpression()
              @finishGroupMutation()

      # Temporary
      'show type of an expression':
        bindKey: win: 'Ctrl-Shift-T', mac: 'Ctrl-Shift-T'
        multiSelectAction: 'forEach'
        exec: =>
          selected = @selectedTangible()
          if expression = (onlyExpression selected) or (fakeAtInsertion selected)
            if expression.malformed
              window.log expression.malformed
            else if expression.tea
              window.log compiler.prettyPrint expression.tea

      # For debugging
      'remove all source':
        bindKey: win: 'Ctrl-Shift-Backspace', mac: 'Ctrl-Shift-Backspace'
        document: no
        exec: =>
          @editor.setValue ''
          @initAst ''

      'replace enclosing Parent expression with current selection':
        bindKey: win: 'Ctrl-P', mac: 'Ctrl-P'
        multiSelectAction: 'forEach'
        exec: =>
          parent = @realParentOfSelected()
          if parent
            added = @selectedTangible()
            lifted = reindentTangible added, parent.parent
            @mutate
              changeInTree:
                added: lifted
                at: insToTangible [parent]
              inSelections: lifted

      'wrap current selection in a Function':
        bindKey: win: 'Ctrl-F', mac: 'Ctrl-F'
        multiSelectAction: 'forEach'
        autocomplete: yes
        exec: =>
          # if @isInserting()
          #   @wrap '(', 'fn', ' ', '[', {insert: yes}, ']', ' ', {selected: yes, select: yes}, ')'
          # else
          separator = if (parentOf (toNode @selectedTangible())) or @isSingleLineInput then [' '] else ['\n', '  ']
          @wrap (concat [['(', 'fn', ' ', '[]'], separator, [{selected: yes, select: yes}, ')']])...

      'Match on current selection':
        bindKey: win: 'Ctrl-M', mac: 'Ctrl-M'
        multiSelectAction: 'forEach'
        autocomplete: yes
        exec: =>
          if @isInserting()
            @wrap '(', 'match', ' ', {selected: yes, insert: yes}, '\n',
              '  ', ' ', ')'
          else
            @wrap '(', 'match', ' ', {selected: yes}, '\n',
              '  ', {insert: yes}, ' ', ')'

      'wrap in a Match to return current selection':
        bindKey: win: 'Ctrl-Shift-M', mac: 'Ctrl-Shift-M'
        multiSelectAction: 'forEach'
        autocomplete: yes
        exec: =>
          @wrap '(', 'match', ' ', {insert: yes}, '\n',
            '  ', ' ', {selected: yes}, ')'

      'replace selection with an Added function parameter':
        bindKey: win: 'Ctrl-Shift-A', mac: 'Ctrl-A'
        multiSelectAction: 'forEach'
        exec: =>
          parent = @realParentOfSelected()
          fun = findParentFunction parent if parent
          params = findParamList fun if fun
          if params
            @startGroupMutation()
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
              tangibleSelection: outsToTangible hole.out
              newSelections: [
                @selectedTangible()
              ]
            @finishGroupMutation()

      'select all occurences of selection to Rename':
        bindKey: win: 'Ctrl-R', mac: 'Ctrl-R'
        multiSelectAction: 'forEach'
        exec: =>
          selected = @onlySelectedExpression()
          if selected and isAtom atom = selected
            others = (findOtherReferences atom) @ast
            tangibles = map toTangible, others

            @mutate
              inSelection: atom
              newSelections: tangibles

      'Define selected token':
        bindKey: win: 'Ctrl-D', mac: 'Ctrl-D'
        indirect: yes
        exec: (editor, {targetEditor} = {}) =>
          targetEditor ?= @editor
          targetMode = targetEditor.session.getMode()
          selected = targetMode.onlySelectedExpression()
          if selected and (isAtom atom = selected) and atom.malformed
            @startGroupMutation()
            if targetEditor isnt @editor
              # TODO: better location than just current insert position
              @insertStringForward if isOperator atom
                args = argumentNamesFromCall atom.parent
                """
                #{atom.symbol} (fn [#{args.join ' '}]
                  )"""
              else
                """
                #{atom.symbol} """
            else
              top = ancestorAtDefinitonList selected
              # Position after top
              movedTo = nodeEdgeOfTangible LAST, toTangible top
              separator = if parentOf top then '\n' else '\n\n'
              @insertSpaceAt FORWARD, separator, movedTo
              @insertStringForward if isOperator atom
                args = argumentNamesFromCall atom.parent
                """
                #{atom.symbol} (fn [#{args.join ' '}]
                  )"""
              else
                """
                #{atom.symbol} """
            hole = definition = @selectableEdge LAST
            if isOperator atom
              hole = tangibleInside LAST, toNode definition
            @mutate
              tangibleSelection: hole
            @finishGroupMutation()
          else if selected
            if targetEditor isnt @editor
              moved = reindentTangible (toTangible selected), @parentOfSelected()
              @startGroupMutation()
              originalHole = bookmarkBefore @selectedTangible()
              @insertSpace FORWARD, " "
              @mutate
                changeInTree:
                  added: moved
                  at: @selectedTangible()
                tangibleSelection: originalHole()
              @finishGroupMutation()
            else
              # Find parent scope
              # Add empty space and selected form
              # put cursor to original place and the new space
              # --- actually it's like adding an argument
              top = ancestorAtDefinitonList selected
              # Position after top
              movedTo = nodeEdgeOfTangible LAST, toTangible top
              moved = reindentTangible @selectedTangible(), top.parent
              separator = if parentOf top then '\n' else '\n\n'

              @startGroupMutation()
              selections = @selectedTangiblesList()
              originalHoles = for selection in selections
                @mutate @removeSelectable selection
                bookmarkBefore @selectedTangible()

              @insertSpaceAt FORWARD, separator, movedTo
              newHole = bookmarkBefore @selectedTangible()
              @insertSpaceAt FORWARD, " ", movedTo

              rememberedHoles = pickupBookmarks originalHoles
              @mutate
                changeInTree:
                  added: moved
                  at:
                    in: []
                    out: [movedTo]
                tangibleSelection: rememberedHoles[0]
                newSelections: join rememberedHoles[1...], [newHole()]
              @finishGroupMutation()

      'Inline selected expression or replace a name by its definition':
        bindKey: win: 'Ctrl-I', mac: 'Ctrl-I'
        multiSelectAction: 'forEach'
        exec: =>
          # For now assume name is selected
          selected = @onlySelectedExpression()
          if selected and (isAtom atom = selected)
            others = (findOtherReferences atom) @ast
            if isName atom
              # Replace all occurences
              @startGroupMutation()

              # Paramater in lambda call
              if (paramList = parentOf atom) and (fun = parentOf paramList) and
                  (isOperator fun) and (isFunction fun) and ((findParamList fun) is paramList)
                args = sortedArgs (map _symbol, (_validTerms paramList)), fun.parent
                paramIndex = ((_terms paramList).indexOf atom)
                if paramIndex < args.length and args[paramIndex]
                  inlined = toTangible args[paramIndex]
                  # Remove the argument
                  @mutate
                    changeInTree:
                      at: tangibleWithSomeMargin inlined
                  # Remove the paramater
                  @mutate
                    changeInTree:
                      at: tangibleWithSomeMargin toTangible atom
              else if (definition = siblingTerm FORWARD, atom) and isExpression definition
                # Definition name
                inlined = (toTangible definition)
                @mutate @removeSelectable tangibleBetween (toTangible atom), inlined
                @mutate @remove BACKWARD
                @mutate @remove BACKWARD if @isInserting()
              if inlined
                for other, i in others
                  indented = (reindentTangible inlined, other.parent)
                  @mutate
                    changeInTree:
                      added: indented
                      at: toTangible other
                  @mutate(
                    if i is 0
                      inSelections: indented
                    else
                      newSelections: [(insToTangible indented)]) # this must be after insertion
                @finishGroupMutation()
            else
              # Replace selection with definition
              name = _fst (other for other in others when isName other)
              if isExpression definition = siblingTerm FORWARD, name
                inlined = (toTangible definition)
                @mutate
                  changeInTree:
                    added: (reindentTangible inlined, atom.parent)
                    at: @selectedTangible()
          else if selected and (isBetaReducible reducible = selected) or
              (parentOf selected) and (isBetaReducible reducible = parentOf selected)

            fn = _operator reducible
            params = _validTerms findParamList fn
            args = _arguments reducible
            @startGroupMutation()
            for arg, i in args when i < params.length
              uses = (findOtherReferences params[i]) reducible
              for use in uses
                indented = (reindentTangible (toTangible arg), use.parent)
                @mutate
                  changeInTree:
                    added: indented
                    at: toTangible use
            if args.length is params.length
              body = (_terms fn)[2] # TODO: improve the selection to be more robust
              reindentedBody = reindentTangible (toTangible body), reducible.parent
              @mutate
                changeInTree:
                  added: reindentedBody
                  at: toTangible reducible
                inSelections: reindentedBody
            else
              numInlined = Math.min args.length, params.length
              @mutate
                changeInTree:
                  at: tangibleWithMargin tangibleBetween (toTangible params[0]),
                    (toTangible params[numInlined - 1])
              @mutate
                changeInTree:
                  at: tangibleWithMargin tangibleBetween (toTangible args[0]),
                    (toTangible args[numInlined - 1])
              if args.length < params.length
                reindentedFn = reindentTangible (toTangible fn), reducible.parent
                @mutate
                  changeInTree:
                    added: reindentedFn
                    at: toTangible reducible
                  inSelections: reindentedFn
            @finishGroupMutation()

      'abstract an operator with a Lambda':
        bindKey: win: 'Ctrl-L', mac: 'Ctrl-L'
        multiSelectAction: 'forEach'
        exec: =>
          # TODO: prevent variable capture inside the operator
          abstractToLambda = (op, args) =>
            argList = args.join ' '
            wrapper = astize "(fn [#{argList}] ( #{argList}))", op[0].parent
            @startGroupMutation()
            @mutate
              changeInTree:
                added: wrapper
                at: insToTangible op
              inSelections: wrapper
            [fn, params, call] = _terms wrapper[0]
            @mutate
              changeInTree:
                added: reindentNodes op, call
                at: outsToTangible [call[1]]
            @finishGroupMutation()
          if isCall parent = @parentOfSelected()
            if isOperator toNode selected = @selectedTangible()
              op = selected.in
              args = (argumentNamesFromCall parent)[(_validTerms op).length - 1...]
              abstractToLambda op, args
            else if (op = @onlySelectedExpression()) and isAtom op
              @worker.call 'docsFor', [atomReference op], (info) =>
                if info.arity
                  args = info.arity
                  abstractToLambda [op], args

      'push a lambda inside of a call to the Outer expression':
        bindKey: win: 'Ctrl-O', mac: 'Ctrl-O'
        multiSelectAction: 'forEach'
        exec: =>
          if (fun = @onlySelectedExpression()) and (isFunction fun) and
              (isOperator fun) and (form = parentOf fun.parent)
            # Replace grandparent form by fun
            # Replace body of fun with grandparent form with the body replacing fun
            @startGroupMutation()
            pushedUpBody = reindentNodes [findFunctionBody fun], form
            @mutate
              changeInTree:
                added: pushedUpBody
                at: toTangible fun.parent
            pushedUp = reindentNodes [fun.parent], form.parent
            [newCall] = pushedUp
            newFun = _operator newCall
            @mutate
              changeInTree:
                added: pushedUp
                at: toTangible form
            pushedIn = reindentNodes [form], newCall
            @mutate
              changeInTree:
                added: pushedIn
                at: toTangible findFunctionBody newFun
              inSelection: newFun
            @finishGroupMutation()

      'push definition Up':
        bindKey: win: 'Ctrl-U', mac: 'Ctrl-U'
        multiSelectAction: 'forEach'
        exec: =>
          # Copy definition in subscope
          # Remove it and trailing space if any
          # find parent definition
          # add the copied definition after it
          # put cursor where it was
          selection = @selectedTangible()
          pushUp = (at) =>
            top = ancestorAtDefinitonList at
            definitionPair =
              if isName top
                if isExpression definition = siblingTerm FORWARD, top
                  tangibleBetween (toTangible top), (toTangible definition)
              else
                if isName name = siblingTerm BACKWARD, top
                  tangibleBetween (toTangible name), (toTangible top)
            if definitionPair and parentOf top
              parent = ancestorAtDefinitonList top.parent
              movedTo = nodeEdgeOfTangible LAST, toTangible parent
              [selectionNodes, recover] = memorable selection
              [moved, newSelectionNodes] = reindentTangiblePreserving definitionPair,
                parent.parent, selectionNodes
              separator = if parentOf parent then '\n' else '\n\n'

              @startGroupMutation()
              @mutate @removeSelectable definitionPair
              @mutate @remove BACKWARD if @isInserting()

              @insertSpaceAt FORWARD, separator, movedTo

              @mutate
                changeInTree:
                  added: moved
                  at:
                    in: []
                    out: [movedTo]
                memorableSelection: [recover, newSelectionNodes]
              @finishGroupMutation()
            else
              pushUp parentOf at

          pushUp toNode @selectedTangible()

  multiSelectReferenceInDirection: (direction) ->
    selected = @onlySelectedExpression()
    if selected and (isAtom atom = selected) and atom.id?
      references = (findAllReferences atom) @ast
      @mutate
        newSelections: [toTangible findAdjecentInList direction, atom, references]
    else
      @multiSelectOccurenceInDirection direction

  multiSelectOccurenceInDirection: (direction) ->
    if not @isInserting()
      selected = @selectedTangible().in
      occurences = (findAllOccurences selected) @ast
      @mutate
        newSelections: [insToTangible findAdjecentInList direction, selected, occurences]

  selectReferenceInDirection: (direction) ->
    selected = @onlySelectedExpression()
    if selected and (isAtom atom = selected) and atom.id?
      references = (findAllReferences atom) @ast
      @mutate
        inSelection: findAdjecentInList direction, atom, references
    else
      @selectOccurenceInDirection direction

  selectOccurenceInDirection: (direction) ->
    if not @isInserting()
      selected = @selectedTangible().in
      occurences = (findAllOccurences selected) @ast
      @mutate
        inSelections: findAdjecentInList direction, selected, occurences

  moveDown: (inTree, inAtom) ->
    @mutate(
      if @isSelectingMultiple()
        tangibleSelection: @selectableEdge inTree
      else if expression = @onlySelectedExpression()
        if isForm expression
          tangibleSelection: tangibleInside inTree, expression
        else
          withinAtom: expression
          withinAtomPos: editableEdgeWithin inAtom, expression
      else
        {})

  changeNumerical: (difference) ->
    if (atom = @onlySelectedExpression()) and isNumerical atom
      offset = @offsetToCursor atom
      changedSymbol = changeNumericalAt atom.symbol, offset, difference
      [changed] = astize changedSymbol, atom.parent
      editing =  @isEditing()
      @mutate
        changeInTree:
          added: [changed]
          at: @selectedTangible()
        inSelection: changed if not editing
        withinAtom: changed if editing
        withinAtomPos: (changed.symbol.length - (atom.symbol.length - offset)) if editing

  closeParentOrInsert: (closingDelim) ->
    if @isEditingHalfDelimited()
      @insertStringForward closingDelim
    else
      @mutate
        inSelection:
          @realParentOfSelected()

  insertOpeningDelim: (open, close) ->
    if @isEditingHalfDelimited()
      @insertStringForward open,
    else
      @wrap open, {selected: yes, select: yes}, close

  wrap: (tokens...) ->
    isString = (s) -> typeof s is 'string'
    findTags = (tokens) ->
      tags = {}
      offset = 0
      for tagged, i in tokens when not isString tagged
        for key of tagged
          (tags[key] ?= []).push i - offset
        offset++
      tags

    tags = findTags tokens
    # i = tokens.indexOf yes
    # throw new Error "missing yes in wrap" if i is -1

    string = (filter isString, tokens).join ''
    @wrapIn string, @selectedTangible(), tags

  wrapIn: (wrapperString, tangible, {selected, select, insert}) ->
    throw new Error "missing selected in wrapIn" unless selected?
    [wrapper] = astize wrapperString, parentOfTangible tangible
    empty = tangible.in.length is 0

    # First replace, then reinsert
    @startGroupMutation()
    @mutate
      changeInTree:
        at: tangible
        added: [wrapper]
    wrapped = reindentTangible tangible, wrapper
    selections = join (select || []), (insert || [])
    @mutate
      changeInTree:
        added: wrapped
        at:
          in: []
          out: [wrapper[selected[0]]]
      inSelections: wrapped if select and not empty
      tangibleSelection:
        if not select or empty
          in: []
          out: [wrapper[selections[0]]]
      newSelections: map ((i) -> in: [], out: [wrapper[i]]), selections[1...]
    @finishGroupMutation()

  removeNewLines: ->
    selected = @selectedTangible()
    nodes = selected.in
    flattenNodes = (nodes) ->
      for node in nodes when not isIndent node
        if isNewLine node
          (astize ' ', node.parent)[0]
        else if isForm node
          listToForm flattenNodes node
        else
          cloneNode node
    replacing = flattenNodes nodes
    @mutate
      changeInTree:
        added: replacing
        at: selected
      inSelections: replacing

  moveSelectionByLine: (direction) ->
    # like moveSelection but swap all tokens on each line
    selected = @selectedTangible()
    selectedLine = insToTangible @allOnLine toNode selected
    if onSiblingLine = sibling direction, edgeOfList direction, padding direction, selectedLine
      replacedLine = insToTangible @allOnLine onSiblingLine
      @swap direction, selectedLine, replacedLine

  allOnLine: (node) ->
    isOnLine = (node) =>
      range = @rangeOfNodes [node]
      range.start.row is range.end.row
    isInline = (node) ->
      (isExpression node) or (isSpace node)
    towards = (dir) ->
      n = node
      while (prev = sibling dir, n) and isInline prev
        n = prev
    if (parent = parentOf node) and isOnLine parent
      return @allOnLine parent
    concat [
      (towards FIRST).reverse()
      (if isInline node then [node] else [])
      (towards LAST)]

  moveSelection: (direction) ->
    selected = @selectedTangible()
    replaced = @selectedSibling direction
    if replaced
      @swap direction, selected, replaced

  swap: (direction, selected, replaced) ->
    movingSelected = cloneNodes selected.in
    movingReplaced = cloneNodes replaced.in
    @startGroupMutation()
    @mutate
      changeInTree:
        added: []
        at: selected
    @mutate
      changeInTree:
        added: movingReplaced
        at:
          in: []
          out: selected.out
    @mutate
      changeInTree:
        added: []
        at: replaced
    targetHole =
      in: []
      out: replaced.out
    @mutate
      changeInTree:
        added: movingSelected
        at: targetHole
      inSelections: movingSelected if _notEmpty movingSelected
      tangibleSelection: targetHole if _empty movingSelected
    @finishGroupMutation()

  insertStringForward: (string) ->
    @insertString FORWARD, string

  # direction ignored for now
  insertString: (direction, string) ->
    throw "Missing string in insertString" unless string?
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
          range:
            if atom.label is 'char' and atom.symbol is '\\_'
              [1, 2]
            else
              [offset, offset]
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

  replaceSpace: (direction, newLine) ->
    {margin, siblingTangible} = @toSelectionSibling direction
    if margin and isSpace (edgeOfList (opposite direction), margin.in)
      @mutate
        changeInTree:
          added: astize newLine, parentOfTangible margin
          at: margin
        tangibleSelection: siblingTangible
    else
      @insertSpace direction, newLine

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

  selectLineAdjecentAtomOrPosition: (direction) ->
    pos = @startPos selected = toNode @selectedTangible()
    column = @editor.selection.$desiredColumn ? pos.column
    row = pos.row + direction
    adjecent = @tangibleAtPos row: row, column: column + 1
    toSelect =
      if isForm form = toNode adjecent
        formStart = @startPos form
        formEdge = @edgeOfNode direction, form
        insideDirection =
          if formEdge.row is row and formStart.column > column
            FIRST
          else if isNodeInside selected, form
            direction
          else
            (opposite direction)
        termToTangible limitTerm insideDirection, toNode adjecent
      else
        adjecent
    @mutate
      tangibleSelection: toSelect
      desiredColumn: column

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
    {margin, siblingTangible} = @toSelectionSibling direction
    @mutate(
      if siblingTangible
        toSibling = append direction, margin, siblingTangible
        tangibleSelection: append direction, @selectedTangible(), toSibling
      else
        inSelection: @realParentOfSelected())

  # Tangible at pos, can be an atom or a form
  tangibleAtPos: (pos) ->
    # TODO: return selections object
    # console.log @posToIdx pos
    [before, after] = @tokensSurroundingPos pos
    res = tangibleSurroundedBy FORWARD, before, after or before
    # console.log "at pos", res
    res

  tokenFollowingPos: (pos) ->
    [before, after] = @tokensSurroundingPos pos
    after or before

  tokensSurroundingPos: (pos) ->
    idx = @trimmedPosToIdx pos
    findNodesBetween @ast, idx - 1, idx + 1

  tangibleRange: (tangible) ->
    [start, end] = nodeEdgesOfTangible tangible
    positionsToRange (@startPos start), (@startPos end)

  remove: (direction) ->
    @mutate(
      if atom = @editedAtom()
        # TODO: check if we are removing an escaped character and in that case
        #       remove the backslash
        atLimit =
        if (editableLength atom) is (if isDelimitedAtom atom then 0 else 1)
          @removeSelectable @selectedTangible()
        else
          offset = @offsetToCursor atom
          removeDirection =
            if (@isAtLimit direction, atom)
              opposite direction
            else
              direction
          changeWithinAtom:
            string: ''
            range: [offset, offset + removeDirection]
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

  removeSelected: ->
    if not @isInserting()
      @mutate @removeSelectable @selectedTangible()

  removeSelectable: (tangible) ->
    changeInTree:
      at: tangible
    tangibleSelection:
      in: []
      out: tangible.out

  isAtLimit: (direction, atom) ->
    toLimit = @distance @cursorPosition(), @editableEdge direction, atom
    toLimit is 0

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
      @edgeOfNode direction, atom

  realParentOfSelected: ->
    if isReal parent = @parentOfSelected()
      parent

  parentOfSelected: ->
    parentOfTangible @selectedTangible()

  # Gives a sibling tangible of the current selections
  selectedSibling: (direction) ->
    (@toSelectionSibling direction).siblingTangible

  toSelectionSibling: (direction) ->
    margin = @selectionMargin direction
    if margin
      siblingTangible = padding direction, margin
      margin: margin
      siblingTangible: tangibleSurroundedBy direction,
        (edgeOfList direction, margin.in),
        (edgeOfList (opposite direction), siblingTangible)
    else
      {}

  # This returns tangible-like corresponding to the whitespace in given
  # direction surrounding current selections,
  # or nothing if there is no space in that direction.
  selectionMargin: (direction) ->
    tangibleMargin direction, @selectedTangible()

  selectedNodeEdge: (direction) ->
    nodeEdgeOfTangible direction, @selectedTangible()

  editedAtom: ->
    if @isEditing()
      @onlySelectedExpression()

  onlySelectedExpression: ->
    onlyExpression @selectedTangible()

  startGroupMutation: ->
    @groupMutating = yes

  finishGroupMutation: ->
    @groupMutating = no
    @undoManager().packGroupMutation()

  # This render-like function, taking in a the desired output and
  # doing the imperative work to achieve it
  #
  # possible fields:
  #
  #     changeWithinAtom:
  #       string: String
  #       range: [Int, Int]
  #     changeInTree:
  #       added: (Maybe (List Node))
  #       at: Tangibles
  #     withinAtom: Atom
  #     withinAtomPos: Int
  #     tangibleSelection: Selections
  #     inSelection: Node
  #     inSelections: (List Node)
  #     selectionRange: Range
  #     newSelections:
  #       (List Tangible)
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
  mutate: (state, way = undo: yes) ->
    # 0. Notify UndoManager
    @undoManager().registerMutation state, way
    @undoManager().packGroupMutation() unless @groupMutating
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
      @docReplace removedRange, addedString
    # 4.1. selections
    if state.inSelection or state.inSelections or state.tangibleSelection or state.selectionRange or state.memorableSelection
      selections = state.tangibleSelection or
        state.selectionRange and (@tangibleSelectionFromRange state.selectionRange) or
        state.memorableSelection and ([recover, selectionNodes] = state.memorableSelection) and (recover selectionNodes) or
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
      @setSelectionRange selectionRange, state.desiredColumn
    # 7. Add new multi-select ranges
    if state.newSelections
      for tangible in state.newSelections
        range = @tangibleRange tangible
        @selectFor tangible, no, range
        @editor.selection.addRange range
    return yes # command handled response

  handleCommandExecution: (e) =>
    # 8. Highlight edited in editor
    @updateEditingMarkers()
    # 9. Update error highlights
    @updateErrorMarkers() #TODO: better to remove if we changed source
    # 10. Hide tooltips
    @closeTooltip()
    # 11. Trigger autocompletion
    @doAutocomplete e

  select: (selections, shouldEdit) ->
    @editor.selection.$nodes = selections
    @editor.selection.$editing = shouldEdit

  selectFor: (selections, shouldEdit, editorSelection) ->
    editorSelection.$nodes = selections
    editorSelection.$editing = shouldEdit

  setSelectionRange: (range, desiredColumn) ->
    @editor.selection.setSelectionRange range
    @editor.selection.$desiredColumn = desiredColumn

  updateEditingMarkers: ->
    editorSelections =
      if @isMultiSelecting()
        @editor.multiSelect.ranges
      else
        [@editor.selection]
    for range, i in editorSelections
      @updateEditingMarkerFor (@isEditingFor range), range
    return

  updateEditingMarkerFor: (shouldEdit, editorSelection) ->
    if id = editorSelection.$editMarker
      @editor.session.removeMarker id
      editorSelection.$editMarker = undefined
    if shouldEdit
      atom = onlyExpression editorSelection.$nodes
      range = @editableRange atom
      id = @editor.session.addMarker range, 'ace_active-token'
      editorSelection.$editMarker = id

  isMultiSelecting: ->
    @editor.multiSelect.inMultiSelectMode

  selectedTangiblesList: ->
    if @isMultiSelecting()
      for selection in @editor.multiSelect.ranges by -1
        selection.$nodes
    else
      [@selectedTangible()]

  selectedTangible: ->
    @editor.selection.$nodes

  isEditing: ->
    @editor.selection.$editing

  isEditingFor: (editorSelection) ->
    editorSelection.$editing

  isEditingDelimited: ->
    @isEditing() and isDelimitedAtom @editedAtom()

  isEditingHalfDelimited: ->
    @isEditing() and isHalfDelimitedAtom @editedAtom()

  isSelecting: ->
    not @isEditing() and @selectedTangible().in.length > 0

  isSelectingMultiple: ->
    @isSelecting() and @selectedTangible().in.length > 1

  isInserting: ->
    @selectedTangible().in.length is 0

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

  endOfLine: (pos) ->
    @idxToPos (@posToIdx row: pos.row + 1, column: 0) - 1

  edgeOfNode: (direction, node) ->
    @idxToPos edgeIdxOfNode direction, node

  nodeRange: (node) ->
    positionsToRange (@startPos node), (@endPos node)

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

  trimmedPosToIdx: (pos) ->
    @posToIdx @editor.session.$clipPositionToDocument pos.row, pos.column

  # Proc Pos Pos
  shiftPosBy: (pos, offset) ->
    @idxToPos (@posToIdx pos) + offset

  # Ace's document#replace shortcuts changes, but we have to recompile
  docReplace: (range, text) ->
    # Like: @editor.session.doc.replace range, text
    doc = @editor.session.doc
    doc.remove range
    doc.insert range.start, text

  prepareWorker: ->
    worker = new DistributingWorkerClient ["ace", "compilers"],
      "compilers/teascript/worker",
      "Worker",
      null
    @worker = worker

  createWorker: (session) ->
    throw new Error "Missing worker in mode" unless @worker

    @worker.attachToDocument session.getDocument()

    @worker.on "error", (e) ->
      session.setAnnotations [e.data]

    @worker.on "ok", (e) =>
      session.clearAnnotations()

    @worker

  reportModuleName: (moduleName) ->
    if moduleName isnt @moduleName
      @moduleName = moduleName
      @worker.call 'setModuleName', [moduleName]

argumentNamesFromCall = (call) ->
  defaultNames = "xyzwtuvmnopqrs"
  labeled = false
  i = 0
  argNames = {}
  args = []
  addArgName = (symbol) ->
    args.push (if count = argNames[symbol]
      argNames[symbol]++
      symbol + count
    else
      argNames[symbol] = 2
      symbol)

  for term in _arguments call
    if labeled
      labeled = false
      continue
    addArgName(
      if isLabel term
        labeled = true
        _labelName term
      else if (isAtom term) and (not isHalfDelimitedAtom term) and not isNumerical term
        term.symbol
      else
        defaultNames[i++])
  args

ancestorAtDefinitonList = (node) ->
  if (parent = parentOf node)
    if (isParentOfDefinitionList parent) and isExpression node
      node
    else
      ancestorAtDefinitonList parent
  else
    node

findParentScope = (top, expression) ->
  (findParentFunction expression) or top

findParentFunction = (expression) ->
  if isFunction expression
    expression
  else if isReal expression.parent
    findParentFunction expression.parent

findParamList = (form) ->
  [params] = _arguments form
  params

findFunctionBody = (form) ->
  [..., body] = _arguments form
  body

isBetaReducible = (expression) ->
  (isCall expression) and isFunction (_operator expression)

isParentOfDefinitionList = (expression) ->
  (isFunction expression) or (isForm expression) and (_operator expression)?.symbol is 'syntax'

isFunction = (expression) ->
  (isForm expression) and (_operator expression)?.symbol is 'fn'

definitionAncestorOf = (node) ->
  if (parent = parentOf node)
    if isName (siblingTerm PREVIOUS, parent)
      parent
    else
      definitionAncestorOf parent

isName = (expression) ->
  expression?.label is 'name'

findAllOccurences = (nodes) -> (node) ->
  numNodes = nodes.length

  current =
    if numNodes is 1
      if nodesEqual nodes[0], node
        [[node]]
    else if (isForm node) and node.length >= numNodes
      for i in [0..node.length - numNodes] when nodesEqual (terms = node[i...(i + numNodes)]), nodes
        terms
  child =
    if isForm node
      concatMap (findAllOccurences nodes), node
  join (current or []), (child or [])

nodesEqual = (a, b) ->
  if isForm a
    (isForm b) and a.length is b.length and all zipWith nodesEqual, a, b
  else
    a.symbol is b.symbol

atomReference = (atom) ->
  name: atom.symbol, scope: atom.scope

findAllReferences = (atom) -> (node) ->
  if isForm node
    concatMap (findAllReferences atom), node
  else
    if node.id is atom.id then [node] else []

findOtherReferences = (atom) -> (node) ->
  if isForm node
    concatMap (findOtherReferences atom), node
  else
    if node.id is atom.id and node isnt atom then [node] else []

siblingTerm = (direction, node) ->
  terms = _terms node.parent
  for t, i in terms when t is node
    return if direction is FORWARD then terms[i + 1] else terms[i - 1]

findAdjecentInList = (direction, what, list) ->
  for element in list by direction
    if returnNext
      return element
    if element is what or element[0] and element[0] is what[0]
      returnNext = yes
  return edgeOfList (opposite direction), list

onlyExpression = (tangible) ->
  [node] = tangible.in
  if tangible.in.length is 1 and isExpression node
    node

fakeAtInsertion = (tangible) ->
  [fake] = tangible.out
  if fake.fake
    fake

siblingTangibleAncestors = (tangible1, tangible2) ->
  d1 = depthOf (parentOfTangible tangible1)
  d2 = depthOf (parentOfTangible tangible2)
  p1 = tangibleAncestor tangible1, Math.max 0, d1 - d2
  p2 = tangibleAncestor tangible2, Math.max 0, d2 - d1
  siblingAncestorsFrom p1, p2

siblingAncestorsFrom = (tangible1, tangible2) ->
  if (parentOfTangible tangible1) is (parentOfTangible tangible2)
    [tangible1, tangible2]
  else
    siblingAncestorsFrom (tangibleParent tangible1), (tangibleParent tangible2)

tangibleAncestor = (tangible, levels) ->
  if levels is 0
    tangible
  else
    tangibleAncestor (tangibleParent tangible), levels - 1

# precondtion: these have the same parent
tangibleBetween = (tangible1, tangible2) ->
  [from, to] = sortSiblingTangibles tangible1, tangible2
  parent = parentOfTangible from
  fromNode = nodeEdgeOfTangible FIRST, from
  in: parent[(childIndex fromNode)...(childIndexOfTangible to)]
  out: to.out

tangibleWithSomeMargin = (tangible) ->
  concatTangibles filter _is, [
    (before = tangibleMargin PREVIOUS, tangible)
    tangible
    tangibleMargin NEXT, tangible if not before
  ]

tangibleWithMargin = (tangible) ->
  concatTangibles filter _is, [
    tangibleMargin PREVIOUS, tangible
    tangible
    tangibleMargin NEXT, tangible
  ]

tangibleMargin = (direction, tangible) ->
  paddingNodes = padding direction, tangible
  paddingEdge = edgeOfList direction, paddingNodes
  if isWhitespace paddingEdge
    insToTangible paddingNodes
  else
    null

sortSiblingTangibles = (tangible1, tangible2) ->
  if (childIndexOfTangible tangible1) > (childIndexOfTangible tangible2)
    [tangible2, tangible1]
  else
    [tangible1, tangible2]

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

childIndexOfTangible = (tangible) ->
  childIndex tangible.out[0]

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

outsToTangible = (outs) ->
  in: []
  out: validOut outs[0]

# Precondition: the tangibles are contiguous and they explicitly include
# whitespace
concatTangibles = (tangibles) ->
  [allIn..., last] = tangibles
  in: join (concatMap tangibleToIns, allIn), last.in
  out: last.out

tangibleToIns = (tangible) ->
  tangible.in

firstFakeInside = (direction, form) ->
  inside = tangibleInside (opposite direction), form
  while (notFake = (isExpression child = toNode inside)) and isNodeInside child, form
    inside = followingTangibleAtomOrPosition direction, inside
  if notFake
    form
  else
    inside

isNodeInside = (child, ancestor) ->
  child and (child is ancestor or isNodeInside child.parent, ancestor)

# Used by navigation over atoms and insert positions
followingTangibleAtomOrPosition = (direction, tangible) ->
  atomOrPositionFrom direction,
    (siblingLeaf direction,
      (nodeEdgeOfTangible direction, tangible))
  # candidate = tangibleSibling direction, tangible
  # toTangibleAtomOrPosition (opposite direction), candidate

atomOrPositionFrom = (direction, token) ->
  if token
    if tangible = isAtomOrPositionAt token
      tangible
    else
      atomOrPositionFrom direction, (siblingLeaf direction, token)

isAtomOrPositionAt = (after) ->
  before = preceding after
  if (((isWhitespace after) and not isIndent after) or (isClosingDelim after)) and
      (not isClosingDelim before)
    in: if isExpression before then [before] else []
    out: validOut after



tangibleParent = (tangible) ->
  parent = parentOfTangible tangible
  if isReal parent
    insToTangible [parent]

tangibleSurroundedBy = (direction, first, second) ->
  [before, after] = inOrder direction, first, second
  if before is after and isExpression before
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
    out: validOut after
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

pickupBookmarks = (bookmarks) ->
  map ((bookmark) -> bookmark()), bookmarks

# Remembers the preceding token to given insert position, returns a function
# which called will return a tangible at that same position, regardless
# of changes following the insert position
bookmarkBefore = (tangible) ->
  at = preceding toNode tangible
  ->
    in: []
    out: validOut following at

# Used before cloning, returns those nodes needed to clone a tangible
# And a function which reconstructs the tangible
memorable = (tangible) ->
  if tangible.in.length is 0
    [[tangible.out[0]], outsToTangible]
  else
    [tangible.in, insToTangible]

termToTangible = (term) ->
  if isExpression term
    toTangible term
  else
    in: []
    out: validOut term

toTangible = (node) ->
  insToTangible [node]

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

limitTerm = (direction, node) ->
  if isForm node
    limitTerm direction, edgeOfList direction, _terms node
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
  atom.symbol.length -
    if isDelimitedAtom atom
      2
    else if isHalfDelimitedAtom atom
      1
    else
      0

# Inspired by Ace
changeNumericalAt = (symbol, offset, amount) ->
  n = symbol.length

  fp = if (at = symbol.indexOf(".")) >= 0 then at + 1 else n
  decimals = n - fp

  t = parseFloat symbol.replace /^~/, '-'
  t *= Math.pow 10, decimals

  amount *= Math.pow 10, n - offset - (if fp isnt n and offset < fp then 1 else 0)
  t += amount
  t /= Math.pow 10, decimals
  (t.toFixed decimals).replace /^-/, '~'

# Fn Node Bool
isExpression = (node) ->
  not (isWhitespace node) and not (isDelim node)

# Fn Node Bool
isAtom = (node) ->
  (isExpression node) and not isForm node

isNumerical = (atom) ->
  atom.symbol and /^~?\d/.test atom.symbol

# Fn Node Bool
isDelimitedAtom = (atom) ->
  atom.label in ['string', 'regex']

# Delimited or character, affects insertion behaviour
isHalfDelimitedAtom = (atom) ->
  atom.label is 'char' or isDelimitedAtom atom

# Fn Atom String
atomDelimiter = (atom) ->
  atom.symbol[0]

# Fn Atom Bool
isDelim = (node) ->
  /^[\(\)\[\]\{\}]$/.test node.symbol

# Fn Atom Bool
isClosingDelim = (node) ->
  /^[\)\]\}]$/.test node.symbol

# Fn Atom Bool
isOpeningDelim = (node) ->
  /^[\(\[\{]$/.test node.symbol

isOperator = (node) ->
  parent = parentOf node
  parent and (isCall parent) and (_fst _terms parent) is node

isLabel = (expression) ->
  expression.label is 'label'

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

merge = (objects) ->
  c = {}
  for a in objects
    for key, value of a
      c[key] = value
  c

extend = (a, b) ->
  merge [a, b]

_transformed = (origin) ->
  if origin.transformed
    _transformed origin.transformed
  else
    origin

findNodeWithPosition = (node, start, end) ->
  if start < node.end and node.start < end
    if start is node.start and end is node.end
      [node]
    else
      concat (for expr in node
        findNodeWithPosition expr, start, end)
  else
    []

findNodesBetween = (node, start, end) ->
  if start < node.end and node.start < end
    if isForm node
      concat (for expr in node
        findNodesBetween expr, start, end)
    else
      [node]
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

# Ace converts type: "a.b" to "ace_a ace_b" and rendered 'text' as plaintext
convertToAceToken = (token) ->
  value:
    if token.label is 'string'
      "“#{token.symbol[1...-1]}”"
    else
       token.symbol
  type:
    (if (isDelim token) and token.parent.malformed or token.malformed
      'token_malformed'
    else
      switch token.label
        when 'whitespace' then 'text'
        else
          if token.label
            'token_' + token.label
          else
            'text') + (if token.fake then '.token_fake' else '')

topList = (ast) ->
  inside = ast[1...-1]
  inside.start = ast.start + 1
  inside.end = ast.end - 1
  inside

edgeIdxOfNode = (direction, node) ->
  if direction is FORWARD then node.end else node.start

editableEdgeWithin = (direction, atom) ->
  (edgeWithinAtom direction, atom) +
    if isDelimitedAtom atom
      (opposite direction)
    else
      0

edgeWithinAtom = (direction, atom) ->
  if direction is FORWARD then atom.symbol.length else 0

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

preceding = (node) ->
  siblingLeaf BACKWARD, node

following = (node) ->
  siblingLeaf FORWARD, node

siblingLeaf = (direction, node) ->
  candidate = (sibling direction, node) or
    (isReal node.parent) and (siblingLeaf direction, node.parent)
  if candidate
    if isForm candidate
      edgeOfList (opposite direction), candidate
    else
      candidate

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
  # if not newAst or not oldAst
  #   console.log "Asts out of sync"
  #   return
  # for now let's duplicate labels
  #   WARNING the position of newAst might be off if it comes from a larger prefixed expression
  #     like compiling a command line together with source
  oldAst.malformed = newAst.malformed
  oldAst.tea = newAst.tea
  oldAst.id = newAst.id
  oldAst.fake = newAst.fake
  oldAst.assignable = newAst.assignable
  oldAst.scope = newAst.scope
  oldAst.inferredType = newAst.inferredType
  if isForm newAst
    for node, i in newAst
      duplicateProperties node, oldAst[i]
  else
    oldAst.label = newAst.label

# Fn Tangible Node Nodes [Nodes Nodes]
# The second returned value is a list of nodes which are reindented versions
# of those in the preservedList (which is in order of nodes in the AST
# and not overlapping for now).
reindentTangiblePreserving = (tangible, to, preservedList) ->
  reindentNodesPreserving tangible.in, to, preservedList

# Fn Tangible Node Nodes
reindentTangible = (tangible, to) ->
  reindentNodes tangible.in, to

reindentNodes = (nodes, to) ->
  [reindented] = reindentNodesPreserving nodes, to, []
  reindented

reindentNodesPreserving = (nodes, to, preservedList) ->
  [cloned, preserved] = cloneNodesPreserving nodes, preservedList
  for node in cloned
    node.parent = to
  [(reindentMutateNodes cloned, to), preserved]

# Astizes string and reindents it properly
astize = (string, parent) ->
  wrapped = compiler.astizeList string
  reindent (depthOf parent), wrapped
  [open, expressions..., close] = wrapped
  expressions

cloneNodes = (nodes) ->
  [clones] = cloneNodesPreserving nodes, []
  clones

cloneNodesPreserving = (nodes, preserving) ->
  [clones, preservedLists] = unzip map (cloneNodePreserving preserving), nodes
  [clones, concat preservedLists]

cloneNode = (node) ->
  [clone] = (cloneNodePreserving []) node
  clone

cloneNodePreserving = (preserving) -> (node) ->
  if isForm node
    [clone, preserved] = cloneNodesPreserving node, preserving
    listToForm clone
  else
    preserved = []
    clone = symbol: node.symbol, label: node.label
  clone.start = node.start
  clone.end = node.end
  clone.malformed = node.malformed
  clone.tea = node.tea
  clone.id = node.id
  if node in preserving
    # preserved = join [clone], preserved
    preserved = [clone] # not overlapping for now
  [clone, preserved]

reindentMutateNodes = (nodes, parent) ->
  reindent (depthOf parent), nodes
  nodes

reindent = (depth, ast, next, nextIndex) ->
  if isForm ast
    i = 0
    while i < ast.length # explicit for loop because we change the array while iterating
      reindent depth + 1, ast[i], ast[i + 1], i + 1
      ++i
  else if next and isNewLine ast
    indent = repeat depth, '  '
    shouldIndent = depth > 0
    if isIndent next
      if shouldIndent
        setIndentTo next, indent
      else
        next.parent.splice nextIndex, 1
    else if shouldIndent
      # Insert new indent token
      [newLine, indentToken] = astizeExpressions "\n  "
      setIndentTo indentToken, indent
      insertChildNodeAt indentToken, next.parent, childIndex next
  return

listToForm = (nodes) ->
  for node in nodes
    node.parent = nodes
  nodes

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