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

# Extend selection to preserve $teaExpression when multiselecting
(->
  fromOrientedRange = @fromOrientedRange
  @fromOrientedRange = (range) ->
    fromOrientedRange.call this, range
    @$teaExpression = range.$teaExpression
    @$teaInside = range.$teaInside
    @$editMarker = range.$editMarker

  toOrientedRange = @toOrientedRange
  @toOrientedRange = (range) ->
    range = toOrientedRange.call this, range
    range.$teaExpression = @$teaExpression
    range.$teaInside = @$teaInside
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

  # selectInserted: ({data}) =>
  #   if data.action is 'insertText'
  #     #pos = @editor.getCursorPosition()
  #     {row, column} = data.range.end
  #     @highlightTokenAt row, column

  # highlightTokenAt: (row, column) ->
  #   token = @getTokenBefore @editor, row, column
  #   if token
  #     # whitespace is handled by command
  #     if isWhitespace token
  #       return
  #     wasActive = @mainManipulatedToken()?
  #     @deselect()
  #     @unhighlightActive()
  #     if @isDelim token
  #       parenOrChild = @lastChild token.parent
  #       if @isEmpty(token.parent) or isWhitespace parenOrChild
  #         # added empty parens, put cursor inside
  #         @editor.moveCursorToPosition @tokenVisibleEnd parenOrChild
  #       else
  #         # wrapped token in parens
  #         @selectToken parenOrChild
  #     # normal insert
  #     else
  #       @editToken token

  # isEmpty: (expression) ->
  #   parenOrChild = @lastChild expression
  #   parenOrChild.token in ['(', '[', '{']

  # rangeOfEnd: (token) ->
  #   end = @tokenVisibleEnd token
  #   @posToRange end

  # posToRange: (pos) ->
  #   Range.fromPoints pos, pos

  # lastChild: (expression) ->
  #   expression[expression.length - 2]

  # editToken: (token) ->
    # @highlightToken token
    # if token.label is 'string'
    #   range = @tokenToEditableRange token
    #   cursor = @editor.getCursorPosition()
    #   if cursor.column == range.end.column + 1
    #     @editor.selection.setSelectionRange Range.fromPoints range.end, range.end

  # highlightToken: (token) ->
  #   # 1-based for multiselect, 0 is the single-select
  #   index = (@editor.selection.index ? -1)
  #   if @isMultiEditing()
  #     @manipulatedTokens().active[@editor.selection.index] = token
  #     # update all active
  #     for token, i in @manipulatedTokens().active when token
  #       @highlightTokenAtIndex token, i
  #   else
  #     @manipulatedTokens().active.main = token
  #     markerId = @highlightTokenReturnId token
  #     @manipulatedTokens().activeMarkers.main = markerId

  # highlightTokenAtIndex: (token, index) ->
  #   markerId = @highlightTokenReturnId token
  #   @manipulatedTokens().activeMarkers[index] = markerId

  # highlightTokenReturnId: (token) ->
  #   range = @tokenToEditableRange token
  #   @editor.session.addMarker range, 'ace_active-token'

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

    # attaching as last listener, so that everything is updated already
    # session.getDocument().on 'change', @selectInserted, no

    unless @isSingleLineInput
      @addVerticalCommands session
    @addCommands session

    # Initial parse
    @initAst session.getDocument().getValue()

  initAst: (value) ->
    # console.log "initing ast with", value
    @editor.session.getDocument().setValue value
    @ast =
      if @isSingleLineInput
        compiler.astizeExpressionWithWrapper value
      else
        compiler.astizeList value

    # Set up selection
    if @ast
      @handleClick {}

  # Called after worker compiles
  updateAst: (ast) ->
    # console.log ast, @ast
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

  addVerticalCommands: (session) ->
    @editor.commands.addCommand
      name: 'add new sibling expression on new line'
      bindKey: win: 'Enter', mac: 'Enter'
      multiSelectAction: 'forEach'
      exec: =>
        @insertSpace FORWARD, '\n'
        # @addWhitespaceAtCursor '\n'
        # indent = (repeat (depthOf @tokenAfterCursor @editor), '  ')
        # if indent.length > 0
        #   @addWhitespaceAtCursor indent

    # @editor.commands.addCommand
    #   name: 'add new sibling to parent expression on new line'
    #   bindKey: win: 'Ctrl-Enter', mac: 'Ctrl-Enter'
    #   exec: =>
        # if (token = @rightActiveToken()) and parent = token.parent
        #   @deselect()
        #   @unhighlightActive()
        #   @editor.moveCursorToPosition @tokenVisibleEnd parent
        #   @editor.insert '\n'

    @editor.commands.addCommand
      name: 'add new sibling expression on previous line'
      bindKey: win: 'Shift-Enter', mac: 'Shift-Enter'
      multiSelectAction: 'forEach'
      exec: =>
        @insertSpace BACKWARD, '\n'
        # if (expression = @activeExpression())
        #   start = @startPos expression
        #   @addBefore '\n', expression
        # else
        #   start = @cursorPosition()
        #   @addAtInsertPosition '\n'
        # @setInsertPositionAt start, expression.parent

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

          @mutate(
            if @isWithinAtom()
              atom = @editedAtom()
              validString =
                if isDelimitedAtom atom
                  delimiter = atomDelimiter atom
                  escape delimiter, string
                else
                  string
              offset = @distance @cursorPosition(), @startPos atom
              changeWithinAtom:
                string: validString
                range: [offset, offset]
            else
              added = astizeExpressions string, @parentOfSelected()

              extend
                changeInTree:
                  added: added
                  at: @selectedNodes()
              , if added.length is 1 and isAtom (atom = added[0])
                  withinAtom: atom
                  withinAtomPos: atom.symbol.length
                else
                  selections: added)

          # @insertString string
          # if not /\s/.test string
          #   if @isEditing()
          #     @addToEditedAtomAtCursor string
          #   else if @selectedExpression()
          #     @replaceSelected string
          #   else
          #     # todo need to create a new token
          #     @editAtCursor @addAtInsertPosition string
          # else
          #   # TODO: see above
          #   editor.insert string
          # return

    @editor.commands.addCommands @commands =
      'select by click':
        multiSelectAction: 'forEach' #selects multiple
        exec: =>
          @mutate
            selection: @tangibleAtPos @cursorPosition()

          # @moveTo @tangibleAtPos @cursorPosition()
          # return
          # if isAtom node
          #   @selectExpression atom
          # else
          #   delimiter = firstThat isDelim, surroundingTokens
          #   if delimiter
          #     @selectExpression parentOf delimiter
          #   else
          #     @setInsertAt lastOf surroundingTokens

          # if (token = @tokenBeforeCursor())
          #   if (isWhitespace token) and (isReal token.parent) or (isClosingDelim token)
          #     @selectExpression token.parent
          #   else if isAtom token
          #     @selectExpression token
          #   else
          #     @setInsertPositionAtCursorTo token.parent
          #   # console.log "after click", @selectionExpression()

      'edit by click':
        multiSelectAction: 'forEach' #edits multiple
        exec: =>
          expression = @tangibleAtPos @cursorPosition()
          if isAtom expression
            @mutate
              withinAtom: expression
              withinAtomPos: @distance @cursorPosition(), @startPos expression
          else
            @editor.execCommand 'select by click'

          @editAtCursor()
          return

      'up the tree':
        bindKey: win: 'Ctrl-Up', mac: 'Command-Up'
        multiSelectAction: 'forEach'
        exec: =>
          @mutate
            selection:
              if @isWithinAtom()
                @editedAtom()
              else
                parentOf @selectedEdge FIRST

          # if @isWithinAtom()
          #   @moveTo @nodeAtCursor()
          # else
          #   @moveTo parentOf @nodeAtCursor()
          # return

      'down the tree':
        bindKey: win: 'Ctrl-Down', mac: 'Command-Down'
        multiSelectAction: 'forEach'
        exec: =>
          @mutate(
            if expression = @onlySelectedExpression()
              if isForm expression
                selection: tangibleInside FORWARD, expression
              else
                withinAtom: expression
                withinAtomPos: expression.symbol.length
            else
              {})

          # # Traverse down
          # if expression = @selectedExpression()
          #   if isForm expression
          #     @moveTo tangible NEXT, expression[0]
          #     # # select first child node
          #     # terms = _terms expression
          #     # if _notEmpty terms
          #     #   @selectExpression terms[0]
          #     # else
          #     #   # or go inside delimiters
          #     #   @setInsertInside expression
          #   else
          #     @editSelectedAtom()
          # return

      'next atom or position':
        bindKey: win: 'Right', mac: 'Right'
        multiSelectAction: 'forEach'
        exec: =>
          @mutate
            selection:
              if @isSelectingMultiple()
                @selectedEdge LAST
              else
                followingTangibleToken NEXT, @nodeAtCursor()


          # @moveTo followingTangibleToken NEXT, @nodeAtCursor()
          # return

      'previous atom or position':
        bindKey: win: 'Left', mac: 'Left'
        multiSelectAction: 'forEach'
        exec: =>
          @mutate
            selection:
              if @isSelectingMultiple()
                @selectedEdge FIRST
              else
                followingTangibleToken PREVIOUS, @nodeAtCursor()

          # @moveTo followingTangibleToken PREVIOUS, @nodeAtCursor()
          # node = @nodeAtCursor()
          # if @isSelectingOrInAtom()
          #   @selectExpression previousExpression @activeExpression()
          # return

      'next sibling':
        bindKey: win: 'Ctrl-Right', mac: 'Command-Right'
        multiSelectAction: 'forEach'
        exec: =>
          @mutate
            selection:
              if @isSelectingMultiple()
                @selectedEdge LAST
              else
                siblingTangible NEXT, @nodeAtCursor()

          # @moveTo siblingTangible NEXT, @nodeAtCursor()
          # return

      'previous sibling':
        bindKey: win: 'Ctrl-Left', mac: 'Command-Left'
        multiSelectAction: 'forEach'
        exec: =>
          @mutate
            selection:
              if @isSelectingMultiple()
                @selectedEdge FIRST
              else
                siblingTangible PREVIOUS, @nodeAtCursor()

          # @moveTo siblingTangible PREVIOUS, @nodeAtCursor()
          # return

      'include next expression':
        bindKey: win: 'Shift-Right', mac: 'Shift-Right'
        multiSelectAction: 'forEach'
        exec: =>
          @mutate
            selections: join @selectedNodes(), [siblingTangible NEXT, @selectedEdge LAST]

          # if tokens = @selectedRange()
          #   @expandSelectedRange FORWARD
          # return

          # if (tokens = @activeOrSelectedTokens()) and tokens[0].parent
          #   [..., last] = tokens
          #   found = false
          #   for t in last.parent
          #     if found and @isSelectable t
          #       @selectTokens tokens.concat [t]
          #       return
          #     if t is last
          #       found = true

      'include previous expression':
        bindKey: win: 'Shift-Left', mac: 'Shift-Left'
        multiSelectAction: 'forEach'
        exec: =>
          @mutate
            selections: join [siblingTangible PREVIOUS, @selectedEdge FIRST], @selectedNodes()

          # if tokens = @selectedRange()
          #   @expandSelectedRange BACKWARD
          # return
          # if (tokens = @activeOrSelectedTokens()) and tokens[0].parent
          #   [first] = tokens
          #   found = false
          #   for t in first.parent by -1
          #     if found and @isSelectable t
          #       @selectTokens [t].concat tokens
          #       return
          #     if t is first
          #       found = true

      'add new sibling expression':
        bindKey: win: 'Space', mac: 'Space'
        multiSelectAction: 'forEach'
        exec: =>
          @insertSpace FORWARD, ' '
          # return
          # @addWhitespaceAtCursor ' '

      'add new sibling expression before current':
        bindKey: win: 'Shift-Space', mac: 'Shift-Space'
        multiSelectAction: 'forEach'
        exec: =>
          @insertSpace BACKWARD ' '
          # return
          # if (expression = @activeExpression())
          #   start = @startPos expression
          #   @addBefore ' ', expression
          #   @setInsertPositionAt start, expression.parent

      'remove token and preceding whitespace or delete a character':
        bindKey: win: 'Backspace', mac: 'Backspace'
        multiSelectAction: 'forEach'
        exec: =>
          @remove BACKWARD
          # return

      'remove backwards':
        bindKey: win: 'Delete', mac: 'Delete'
        multiSelectAction: 'forEach'
        exec: =>
          @remove FORWARD
          # return

          # if atom = @editedAtom()
          #   if @cursorPosition() is atom.start
          #     prevToken = previous atom # WARNING: relies on space separation
          #     if isSpace prevToken
          #       leftNeighbor = previous prevToken
          #       # TODO: join atoms if possible
          #     else if isNewLine prevToken
          #       @editor.remove("left")
          #       @removeNode prevToken
          #   else
          #     @editor.remove("left")
          #     @removeCharacterFromEditedAtomAtCursor()
          # else if expression = @selectedExpression()
          #   prevToken = previous expression
          #   nextToken = next expression
          #   leftNeighbor = previous prevToken
          #   rightNeigbor = next nextToken
          #   @editor.remove()
          #   @removeNode expression
          #   if isSpace prevToken
          #     @editor.remove("left")
          #     @removeNode prevToken
          #   else if isSpace nextToken
          #     @editor.remove("right")
          #     @removeNode nextToken
          #   else if (isNewLine prevToken) and (isNewLine nextToken)
          #     # TODO: remove all preceding whitespace
          #     @editor.remove("left")
          #     @removeNode prevToken
          #   if leftNeighbor and isExpression leftNeighbor
          #     @selectExpression leftNeighbor
          #   else if rightNeigbor and isExpression rightNeigbor
          #     @selectExpression rightNeigbor
          #   else
          #     @setInsertPositionAtCursorTo expression.parent
          # else
          #   # TODO: fix this, for now its useful to be able to erase spaces
          #   @editor.remove("left")
          # return

      'wrap in parens':
        bindKey: win: '(', mac: '('
        multiSelectAction: 'forEach'
        exec: =>
          @wrapIn '(', ')', 1
          # if (expression = @activeExpression())
          #   @wrap '(', ')', expression
          # else
          #   @addAtInsertPositionAndSetCursorAtOffset '()', -1
          # return
          return

      'wrap in brackets':
        bindKey: win: '[', mac: '['
        multiSelectAction: 'forEach'
        exec: =>
          @wrapIn '[', ']', 1
          return
          # if (expression = @activeExpression())
          #   @wrap '[', ']', expression
          # else
          #   @addAtInsertPositionAndSetCursorAtOffset '[]', -1
          # return

      'wrap in braces':
        bindKey: win: '{', mac: '{'
        multiSelectAction: 'forEach'
        exec: =>
          @wrapIn '{', '}', 1
          return
          # if (expression = @activeExpression())
          #   @wrap '{', '}', expression
          # else
          #   @addAtInsertPositionAndSetCursorAtOffset '{}', -1
          # return

      'add quotes':
        bindKey: win: '"', mac: '"'
        multiSelectAction: 'forEach'
        exec: =>
          if atom = @editedAtom()
            if atom.label is 'string'
              @insertString '\\"'
          else
            selected = escape '"', '\\"', @selectedText()
            @removeSelected()
            @insertString '"' + selected + '"'
          return
      'close parent, same as up':
        bindKey: win: ')', mac: ')'
        exec: =>
          @editor.execCommand 'up the tree', @editor

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
          if atom = selectedAtom()
            if isDelimitedAtom atom
              yes
            else
              @editSelectedAtom()
              @insertString ':'
              @selectExpression @editedAtom()
          else if @isSelecting()
            yes
          else
            @insertString ':'
            @shiftCursor -1
            # {row, column} = @cursorPosition()
            # @editAt (row: row, column: column - 1), added
            yes

      'add comment':
        bindKey: win: '#', mac: '#'
        exec: =>
          @wrapIn '(#', ')', 2
          # @addAtInsertPositionAndSetCursorAtOffset '(# )', -1

      # Temporary
      # 'show type of expression':
      #   bindKey: win: 'Ctrl-T', mac: 'Ctrl-T'
      #   exec: =>
      #     expression = @leftActiveToken()
      #     prettyPrintType = (type) ->
      #       if Array.isArray type
      #         "(Fn #{type.map(prettyPrintType).join ' '})"
      #       else
      #         type
      #     if expression
      #       window.log compiler.syntaxedExpHtml prettyPrintType expression.tea

      # For debugging
      'remove all source':
        bindKey: win: 'Ctrl-Shift-D', mac: 'Ctrl-Shift-D'
        exec: =>
          @editor.setValue ''
          @initAst ''

      'replace parent with current selection':
        bindKey: win: 'Ctrl-P', mac: 'Ctrl-P'
        exec: =>
          if tokens = @selectedRange()
            if parent = parentOf tokens[0]
              @pasteOver parent, expression
              @selectExpression expression
          # range = @activeRange()
          # # todo: select lowest common ancenstor when using multiple selections
          # # TODO: actually, we should replace parent of two adjecent nodes or
          # # if the nodes span more expressions replace each, like normal multi-cursor
          # token = @leftActiveToken()
          # if range and token and token.parent
          #   @editor.session.doc.replace @tokenToVisibleRange(token.parent),
          #     @editor.session.doc.getTextRange range

      'wrap current in a function':
        bindKey: win: 'Ctrl-F', mac: 'Ctrl-F'
        exec: =>
          if (expression = @activeExpression())
            @wrapIn "(fn [] ", ")", 5, expression

          # range = @activeRange()
          # if range
          #   expression = @editor.session.doc.getTextRange range
          #   @editor.session.doc.replace range,
          #     "(fn [] #{expression})"

      'replace expression by new function param':
        bindKey: win: 'Ctrl-A', mac: 'Ctrl-A'
        exec: =>
          range = @activeRange()
          token = @leftActiveToken()
          fun = @findParentFunction token
          params = @findParamList fun if fun
          if range and params
            # insert new param and put cursors at both places
            @editor.session.doc.replace range, ""
            parenOrChild = @lastChild params
            addedCursor = @rangeOfEnd parenOrChild
            @editor.selection.addRange addedCursor
            if !@isEmpty params
              @editor.session.insert addedCursor.end, ' '

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

  insertSpace: (direction, space) ->
    insertPos = @selectedEdge direction
    parent = insertPos.parent
    added = astizeExpressions space, parent
    @mutate
      changeInTree:
        added: added
        at: validSelections [insertPos]
      selection: if direction is FORWARD then insertPos else added[0]

  # Moves to a tangible position/expression
  # moveTo: (tangibleNodes...) ->
  #   if tangibleNodes[0]
  #     @editor.selection.$nodes = tangibleNodes
  #     @updateSelectedTextRange()
  #     @clearEditingMarker()

  # expandSelectedRange: (direction) ->
  #   from = @limitNodeAtCursor direction
  #   access = if direction is FORWARD then 'push' else 'unshift'
  #   sibling = siblingTangible direction, from
  #   if sibling.parent isnt from.parent
  #     @editor.selection.$nodes = [sibling]

  #   @editor.selection.$nodes[access] sibling
  #   @updateSelectedTextRange()

  # updateSelectedTextRange: ->
  #   [first, ..., last] = @selectedRange()
  #   {start} = @tangibleRange first
  #   {end} = @tangibleRange last
  #   @selectTextRange positionsToRange start, end

  # selectTextRange: (range) ->
  #   @editor.selection.setSelectionRange range

  # tangibleRange: (node) ->
  #   start = @startPos node
  #   if isExpression node
  #     end = @endPos node
  #   else
  #     end = start
  #   positionsToRange start, end

  # nodeAtCursor: ->
  #   @selectedRange()[0]

  # limitNodeAtCursor: (direction) ->
  #   edgeOfList direction, @selectedRange()

  # selectedRange: ->
  #   @editor.selection.$nodes

  # Returns node at cursor (only atoms, not forms)
  tangibleAtPos: (pos) ->
    [before, after] = @tokensSurroundingPos pos
    tangibleSurroundedBy FORWARD, before, after or before

  tokensSurroundingPos: (pos) ->
    idx = @posToIdx pos
    findTokensBetween @ast, idx - 1, idx + 1

  # insertString: (string) ->
  #   nodeLike = not /[\s\\]/.test string
  #   if @isWithinAtom()
  #     node = @nodeAtCursor()
  #     if isDelimitedAtom node
  #       @insertInAtom node, (string = escape node[0], "\\#{node[0]}", string)
  #     else if nodeLike
  #       # simple string can be inserted into token
  #       @insertInAtom node, string
  #     @repositionAst()
  #   else
  #     @removeSelected()
  #     insertPos = @nodeAtCursor()
  #     added = astizeExpressions string, insertPos.parent
  #     insertChildNodesAt added, insertPos.parent, childIndex insertPos
  #     @repositionAst()
  #     @moveTo added...
  #   @finishInsert string
  #   if nodeLike and string.length is 1
  #     @editSelectedAtom()

  # insertSpace: (direction, space) ->
  #   insertPos = @limitNodeAtCursor direction
  #   offset = if direction is FORWARD then 1 else 0
  #   added = astizeExpressions space, insertPos.parent
  #   insertChildNodesAt added, insertPos.parent, (childIndex insertPos) + offset
  #   @setCursor (@edgeOfToken direction, insertPos)
  #   @repositionAst()
  #   @finishInsert space
  #   @moveTo [tangible direction, added[0]]

  # insertInAtom: (atom, string) ->
  #   at = @posToIdx @cursorPosition()
  #   atom.symbol = spliceString atom.symbol, at - atom.start, 0, string
  #   atom.end += string.length

  # finishInsert: (string) ->
  #   @editor.insert string
  #   @updateEditingMarker()

  remove: (direction) ->
    @mutate(
      if atom = @editedAtom()
        if (isDelimitedAtom atom) and @isAtLimit direction, atom
          @removeSelectable @selectedNodes()
        else
          offset = @distance @cursorPosition(), @startPos atom
          changeWithinAtom:
            string: ''
            range: [offset, offset + direction]
      else if @isSelecting()
        @removeSelectable @selectedNodes()
      else
        defaultMargin = @selectedMargin direction
        removeDirection =
          if defaultMargin.length is 0
            opposite direction
          else
            direction
        removeMargin = @selectedMargin removeDirection

        if removeMargin.length is 0
          @removeSelectable [parentOf @selectedEdge FIRST]
        else
          changeInTree:
            at: removeMargin)

      # # TODO: tangible?
      # removeTo = siblingTangible direction, node
      # if isExpression removeTo
      #   # Check if we are surrounded by the same expression and if remove it
      #   otherSibling = siblingTangible (opposite direction), node
      #   if otherSibling is removeTo
      #     @moveTo removeTo
      #     @removeSelected()
      # else
      #   @removeNode if direction is FORWARD then node else sibling direction, node

  removeSelectable: (nodes) ->
    changeInTree:
      at: nodes
    selection: sibling NEXT, (edgeOfList LAST, nodes)

  # removeSelected: ->
  #   nodes = @selectedRange()
  #   if @isSelecting()
  #     newAtCursor = sibling NEXT, @limitNodeAtCursor FORWARD
  #     @removeNodes nodes
  #     @editor.selection.$nodes = [newAtCursor]
  #     @editor.remove()

  # removeString: (direction) ->
  #   @editor.remove(if direction is FORWARD then "right" else "left")
  #   atom = @nodeAtCursor()
  #   at = @posToIdx @cursorPosition()
  #   atom.symbol = spliceString atom.symbol, at - atom.start, 1, ''
  #   atom.end--
  #   @repositionAst()
  #   @updateEditingMarker()

  isAtLimit: (direction, atom) ->
    idx = @posToIdx @cursorPosition
    offset = if isDelimitedAtom atom then 1 else 0

    limit = @edgeOfToken direction, atom
    idx is limit + direction * offset

  editableEdge: (direction, atom) ->
    if isDelimitedAtom atom
      @idxToPos (edgeIdxOfNode direction, atom) + (opposite direction)
    else
      @edgeOfToken direction, atom

  parentOfSelected: ->
    @selectedNodes().out[0].parent

  selectedEdge: (direction) ->
    edgeOfList direction, selectionEdges @selectedNodes()

  editedAtom: ->
    if @isEditing()
      @onlySelectedExpression()

  onlySelectedExpression: ->
    selections = @selectedNodes()
    [node] = selections.in
    if selections.in.length is 1 and isExpression node
      node


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
  #       nodes: (List Node)
  #       at: Selections
  #     withinAtom: Atom
  #     withinAtomPos: Int
  #     selection: Node
  #     selections: Selections
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
      removedRange = @rangeOfSelections replaced
      addedString = nodesToString added
      ammendAst replaced, added
    # 1.2. changeWithinAtom
    if state.changeWithinAtom
      throw "atom edit during tree edit not supported" if removedRange
      replaced = state.changeWithinAtom.range
      added = state.changeWithinAtom.string
      atom = @editedAtom()
      removedRange = @rangeWithingToken atom, replaced
      addedString = added
      ammendToken atom, replaced, added
    if addedString?
      # 2. Now reposition AST to get correct locations
      @repositionAst()
      # 3. Perform editor actions to reconcile AST with contents
      @editor.session.replace removedRange, addedString
    # 4.1. selections
    if state.selection or state.selections
      selections = validSelections if state.selection then [state.selection] else state.selections
      selectionRange = @rangeOfSelections selections
      editing = no
    # 4.2. withinAtom
    if state.withinAtom
      throw "shouldn't set both withinAtom and selection" if selections
      selections = validSelections [state.withinAtom]
      selectionRange = @rangeWithingToken state.withinAtom, [state.withinAtomPos, state.withinAtomPos]
      editing = yes
    if selections
      # 5. set selection state
      @select selections, editing
      # 6. Perform selection in editor
      @setSelectionRange selectionRange
    # 7. Highlight edited in editor
    @updateEditingMarker()
    return yes # command handled response

  select: (selections, shouldEdit) ->
    @editor.selection.$nodes = selections
    @editor.selection.$editing = shouldEdit
    console.log "selected:", selections

  setSelectionRange: (range) ->
    @editor.selection.setSelectionRange range
    console.log "setting range:", range

  updateEditingMarker: ->
    if id = @editor.selection.$editMarker
      @editor.session.removeMarker id
      @editor.selection.$editMarker = undefined
    if @isEditing()
      console.log  "edited", @editedAtom()
      range = @editableRange @editedAtom()
      id = @editor.session.addMarker range, 'ace_active-token'
      @editor.selection.$editMarker = id

  selectedNodes: ->
    @editor.selection.$nodes

  isEditing: ->
    @editor.selection.$editing

  findParentFunction: (token) ->
    if token.parent
      if token.parent.type is 'function'
        token.parent
      else
        @findParentFunction token.parent

  findParamList: (token) ->
    if Array.isArray(token)
      if isWhitespace token[0]
        [_, paren, kw, params] = token
      else
        [paren, kw, params]
      if Array.isArray params
        params

  activeRange: ->
    if @editor.selection.tokens
      @editor.selection.getRange()
    else if token = @mainManipulatedToken()
      @tokenToVisibleRange token
    else
      undefined

  tokensToVisibleRange: (tokens) ->
    [first, ..., last] = tokens
    Range.fromPoints (@tokenToVisibleRange first).start, (@tokenToVisibleRange last).end

  surroundingWhitespace: (surroundedTokens) ->
    tokens = [].concat surroundedTokens
    [first, ..., last] = surroundedTokens
    if first.parent
      found = false
      isFirst = true
      nextToken = undefined
      # find the first token and erase all preceding whitespace tokens
      for t in first.parent by -1
        if found
          if isWhitespace t
            tokens.unshift t
          else
            if @isSelectable t
              isFirst = false
            break
        if t is first
          found = true
      found = false
      # if there are no preceding tokens remove all succeding whitespace tokens
      if isFirst
        for t in first.parent
          if found
            if isWhitespace t
              tokens.push t
            else
              if @isSelectable t
                nextToken = t
              break
          if t is last
            found = true
    {tokens, isFirst, nextToken}

  wrap: (open, close, expression) ->
    @wrapIn open, close, 1, expression

  wrapIn: (before, after, index, expression) ->
    wrapper = compiler.astizeExpression before + after
    # First replace, then reinsert
    replaceChildNodeWith expression, wrapper
    insertChildNodeAt expression, wrapper, index

    @editor.session.insert (@endPos expression), after
    @editor.session.insert (@startPos expression), before
    @repositionAst()
    @selectExpression wrapper

  toText: (node) ->
    @editor.session.doc.getTextRange @range node

  addWhitespaceAtCursor: (string) ->
    if (expression = @selectionExpression())
      if @isEditing() and isDelimitedAtom expression
        @addToEditedAtomAtCursor string
      else if @isSelectingOrInAtom()
        @addAfter string, expression
        @setCursor @idxToPos expression.end + string.length
        @setInsertPositionAtCursorTo expression.parent
      else
        @addAtInsertPosition string

  addAtInsertPositionAndSetCursorAtOffset: (string, offset) ->
    added = @addAtInsertPosition string
    pos = (@shiftPosBy @cursorPosition(), offset)
    if isAtom added
      @editAt pos, added
    else
      @setInsertPositionAt pos, added

  addAtInsertPosition: (string) ->
    # console.log "adding at insert position", string, @selectionExpression(), @posToIdx @cursorPosition()
    # TODO: this should handle all possible strings, including AST from elsewhere??
    prevNode = nodeBeforeIn @selectionExpression(), @posToIdx @cursorPosition()
    if string is ' ' and isWhitespace prevNode
      prevNode.symbol += string
    else
      @addAfter string, prevNode

  # TODO should decide whether to edit or select
  replaceSelected: (string) ->
    expression = @selectedExpression()
    added = (compiler.astizeExpression string)
    @replace expression, added
    @editor.session.replace (@range expression), string
    @editAtCursor added

  pasteOver: (replaced, moved) ->
    movedString = @editor.session.doc.getTextRange @range moved
    @replace replaced, moved
    @editor.session.replace (@range replaced), movedString

  replace: (replaced, added) ->
    replaceChildNodeWith replaced, added
    @repositionAst()

  addAfter: (string, node) ->
    @addAt string, node.parent, (childIndex node) + 1

  addBefore: (string, node) ->
    @addAt string, node.parent, (childIndex node)

  addAt: (string, parent, idx) ->
    added = compiler.astizeExpression string
    @addNodeAt added, parent, idx
    @editor.session.insert (@startPos parent[idx]), string
    added

  addNodeAt: (node, parent, idx) ->
    insertChildNodeAt node, parent, idx
    @repositionAst()

  removeNode: (node) ->
    node.parent.splice (childIndex node), 1
    @repositionAst()

  # Proc String ()
  # addToEditedAtomAtCursor: (string) ->
  #   atom = @selectionExpression()
  #   at = @posToIdx @cursorPosition()
  #   atom.symbol = spliceString atom.symbol, at - atom.start, 0, string
  #   # Here we update the ast with new position data
  #   #  this is cheaper than reparsing the tree, but still could take a while
  #   #  even better would be to use an offset table
  #   #    every token would map to an index in the table, to get actual positions
  #   #    we would add up offsets from previous tokens
  #   atom.end += string.length
  #   @repositionAst()
  #   @editor.insert string
  #   @updateEditingMarker()

  # removeCharacterFromEditedAtomAtCursor: ->
  #   atom = @selectionExpression()
  #   at = @posToIdx @cursorPosition()
  #   atom.symbol = spliceString atom.symbol, at - atom.start, 1, ''
  #   atom.end--
  #   @repositionAst()
  #   @updateEditingMarker()

  # Start editing currently selected atom
  editSelectedAtom: ->
    if not @isWithinAtom()
      if isDelimitedAtom @selectedExpression()
        @setCursor @shiftPosBy @selectionRange().end, -1
      else
        @setCursor @selectionRange().end
      @setEditingMarker()

  editAtCursor: (atom) ->
    @editAt @cursorPosition(), atom

  editAt: (position, atom) ->
    @setSelectionExpression atom, no
    @setCursor position
    @updateEditingMarker()

  # updateEditingMarker: ->
  #   isWithin = @isWithinAtom()
  #   @clearEditingMarker()
  #   if isWithin
  #     @setEditingMarker()

  # setEditingMarker: ->
  #   range = @editableRange @selectedExpression()
  #   id = @editor.session.addMarker range, 'ace_active-token'
  #   @editor.selection.$editMarker = id

  # clearEditingMarker: (selection = @editor.selection) ->
  #   if id = selection.$editMarker
  #     @editor.session.removeMarker id
  #     @editor.selection.$editMarker = undefined

  editableRange: (atom) ->
    if isDelimitedAtom atom
      @delimitedAtomRange atom
    else
      @range atom

  # Proc (Maybe Expression) ()
  selectExpression: (expression) ->
    @setSelectionRange @range expression
    @setSelectionExpression expression, no

  # Expects an empty form
  # Proc Form ()
  setInsertInside: (form) ->
    inside = @idxToPos form[0].end
    @setCursor inside
    @setSelectionExpression form, yes

  setInsertPositionAtCursorTo: (enclosingExpression) ->
    @setInsertPositionAt @cursorPosition(), enclosingExpression

  setInsertPositionAt: (position, enclosingExpression) ->
    @setCursor position
    @setSelectionExpression enclosingExpression, yes

  # Sets the expression on the current selection
  #   inside - no when the expression is selected
  #            yes when the insert position is inside the expression
  # setSelectionExpression: (expression, inside) ->
  #   @editor.selection.$teaExpression = expression
  #   @editor.selection.$teaInside = inside

  # Proc (Maybe Expression)
  selectedExpression: ->
    if @isSelecting()
      @nodeAtCursor()

  isSelecting: ->
    not @isWithinAtom() and isExpression @nodeAtCursor()
    # @isSelectingOrInAtom() and not @isEditing()

  isWithinAtom: ->
    @editor.selection.$editMarker?

  # Proc Bool
  isSelectingOrInAtom: ->
    not @editor.selection.$teaInside

  # Proc (Maybe Expression)
  # activeExpression: ->
  #   if @isSelectingOrInAtom()
  #     @selectionExpression()

  # Proc (Maybe Expression)
  # selectionExpression: ->
  #   @editor.selection.$teaExpression # TODO: what if multi?

  # Proc Range
  selectionRange: ->
    @editor.getSelectionRange()

  # Proc Pos ()
  setCursor: (position) ->
    @setSelectionRange Range.fromPoints position, position

  # Proc Range ()
  # setSelectionRange: (range) ->
  #   # console.log "set range", @editor.selection, range
  #   @editor.selection.setSelectionRange range
  #   # @clearEditingMarker()

  # Proc Pos
  cursorPosition: ->
    @editor.getCursorPosition()

  isMultiEditing: ->
    @editor.multiSelect.ranges.length > 1

  deselect: =>
    @editor.selection.clearSelection()
    @editor.selection.tokens = undefined

  expressionAfterCursor: (editor) ->
    @getSelectable @tokenAfterCursor editor

  expressionBeforeCursor: (editor) ->
    @getSelectable @tokenBeforeCursor editor

  tokenAfterCursor: (editor = @editor) ->
    pos = editor.getCursorPosition()
    @getTokenAfter editor, pos.row, pos.column

  tokenBeforeCursor: (editor = @editor) ->
    pos = editor.getCursorPosition()
    @getTokenBefore editor, pos.row, pos.column

  tokenNextToCursor: (editor = @editor) ->
    pos = editor.getCursorPosition()
    @getTokenNextTo editor, pos.row, pos.column

  getSelectable: (token) ->
    if token
      if @isSelectable token
        token
      else
        token.parent

  getTokenAfter: (editor, row, col) ->
    tokens = @lineTokens editor, row
    c = 0
    for token, i in tokens
      if c >= col
        return token
      c += token.end - token.start

  getTokenBefore: (editor, row, col) ->
    tokens = @lineTokens editor, row
    c = 0
    for token, i in tokens
      c += token.end - token.start
      if c >= col
        return token
    # Must be a whitespace not produced by the compiler or empty editor
    return @ast[0]

  # Returns a preceding token unless it is whitespace, or surrounding token
  getTokenNextTo: (editor, row, col) ->
    tokens = @lineTokens editor, row
    c = 0
    for token, i in tokens
      c += token.end - token.start
      if c == col and not isWhitespace token
        return token
      if c > col
        return token

  lineTokens: (editor, row) ->
    editor.session.$mode.tokensOnLine row, editor.session.doc

  handleClick: (event) =>
    if event.getShiftKey?()
      @editor.execCommand 'edit by click', @editor
      # token = @tokenBeforeCursor @editor
      # if isAtom token
      #   @editAtCursor token
      # else
      #   @setInsertPositionAtCursorTo token.parent
    else
      # TODO: show what will be selected on mousemove
      # Select preceding expression
      #   or enclosing expression if whitespace preceeds and there is an enclosing expression
      #   or set insert position
      # select clicked word or its parent if whitespace selected
      if @ast
        @editor.execCommand 'select by click', @editor

  handleRangeDeselect: ({ranges}) =>
    console.log "deselect", ranges
    for range in ranges
      @clearEditingMarker range

  # selectToken: (token) ->
  #   @unhighlightActive()
  #   @editor.selection.setSelectionRange @tokenToVisibleRange token
  #   @editor.selection.tokens = [token]

  selectTokens: (tokens) ->
    @editor.selection.setSelectionRange @tokensToVisibleRange tokens
    @editor.selection.tokens = tokens

  # For strings, regexes etc.
  # delimitedAtomRange: (atom) ->
  #   {start, end} = @range atom
  #   Range.fromPoints (@shiftPosBy start, 1), (@shiftPosBy end, -1)

  rangeWithingToken: (token, range) ->
    [start, end] = sortTuple range
    Range.fromPoints (@idxToPos token.start + start),
      (@idxToPos token.start + end)

  rangeOfNodes: (nodes) ->
    [first, ..., last] = nodes
    positionsToRange (@startPos first), (@endPos last)

  rangeOfSelections: (selections) ->
    [from, to] = selectionEdges selections
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

selectionEdges = (selections) ->
  [from] = join selections.in, selections.out
  [to] = selections.out
  [from, to]

# Takes in a list of nodes, possibly ending in an expression, and returs
# a valid selections object for the state, see examples in @mutate
validSelections = (nodes) ->
  # padded to destructure
  [notLast..., last] = nodes
  if nodes.length >= 2
    [definitelyIn..., lastButOne, some] = nodes
  if isExpression last
    out = sibling NEXT, last
    if isNewLine out
      afterOut = sibling NEXT, out
      if isIndent afterOut
        outs = [out, afterOut]
    ins = nodes
    outs or= [out]
  else
    if isIndent last
      ins = definitelyIn
      outs = [lastButOne, last]
    else
      ins = notLast
      outs = [last]
  in: ins
  out: outs

followingTangibleToken = (direction, node) ->
  siblingNode = siblingTangible direction, node
  if not siblingNode and parentOf node
    followingTangibleToken direction, node.parent
  else if isForm siblingNode
    tangible direction, limitToken (opposite direction), siblingNode
  else
    siblingNode

# Takes in nodes
tangibleSurroundedBy = (direction, first, second) ->
  [before, after] = inOrder direction, first, second
  if (isClosingDelim before)
    before.parent
  else if (isOpeningDelim after)
    after.parent
  else if (isExpression before)
    before
  else if (isExpression after) or (isOpeningDelim before) or (not isIndent after)
    after
  else
    tangible direction, if direction is FORWARD then after else before

inOrder = (direction, a, b) ->
  if direction is FORWARD then [a, b] else [b, a]

siblingTangible = (direction, node) ->
  (other = sibling direction, node) and tangible direction, other

tangible = (direction, node) ->
  (other = sibling direction, node) and tangibleSurroundedBy direction, node, other

# followingToken = (direction, node) ->
#   limitToken (opposite direction), (sibling direction, node)

limitToken = (direction, node) ->
  if isForm node
    limitToken direction, (edgeOfList direction, node)
  else
    node

depthOf = (node) ->
  if not isReal node
    -1
  else
    1 + depthOf node.parent

replaceChildNodeWith = (replaced, added) ->
  added.parent = replaced.parent
  replaced.parent.splice (childIndex replaced), 1, added

# Proc Node Form ()
insertChildNodeAt = (child, parent, index) ->
  child.parent = parent
  parent.splice index, 0, child

# Proc (Seq Node) Form ()
insertChildNodesAt = (children, parent, index) ->
  for child in children
    child.parent = parent
  parent.splice index, 0, children...

ammendAst = (replaced, added) ->
  parent = replaced.out[0].parent
  for node in added
    node.parent = parent
  index = childIndex (replaced.in[0] or replaced.out[0])
  parent.splice index, replaced.length, added...

ammendToken = (token, at, added) ->
  [start, end] = sortTuple at
  removed = end - start
  token.symbol = spliceString token.symbol, start, removed, added
  token.end += added.length - removed

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

escape = (what, replacement, string) ->
  string.replace ///#{what}///g, replacement

repeat = (n, string) ->
  (new Array n + 1).join string

extend = (a, b) ->
  c = {}
  for key, value of a
    c[key] = value
  for key, value of b
    c[key] = value
  c

firstThat = (predicate, [x, xs...]) ->
  if not x
    null
  else if predicate x
    x
  else
    firstThat predicate, xs

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

# Returns node preceding or containing idx, inside given form
# Fn Form Idx Node
nodeBeforeIn = (form, idx) ->
  for node in form
    if node.end >= idx
      return node
  throw new Error "idx out of form supplied in nodeBeforeIn"

duplicateProperties = (newAst, oldAst) ->
  # for now let's duplicate labels
  #   WARNING the position of newAst might be off if it comes from a larger prefixed expression
  #     like compiling a command line together with source
  if isForm newAst
    for node, i in newAst
      duplicateProperties node, oldAst[i]
  else
    oldAst.label = newAst.label

astizeExpressions = (string, parent) ->
  wrapped = compiler.astizeExpression "(#{string})"
  additionalIndent = repeat ((depthOf parent) + 1), '  '
  addToIndents additionalIndent, wrapped
  [open, expressions..., close] = wrapped
  expressions

addToIndents = (added, ast, next) ->
  if isForm ast
    addToIndents added, node, node[i + 1] for node, i in ast
  else if isNewLine ast
    if isIndent next
      next.symbol += added
      next.end += added.length
    else
      # Insert new indent token
      [newLine, newIndent] = astizeExpression "\n#{added}", start: -1
      insertChildNodeAt newIndent, next.parent, childIndex next
  return

  # labelTokens: (ast) =>
  #   if Array.isArray ast
  #     newNodes = for node in ast
  #       @labelTokens node
  #     ast.length = 0 # remove all nodes
  #     for nodeList in [].concat newNodes...
  #       ast.push nodeList
  #     totalLength = 0
  #     nonWsLength = 0
  #     nonWsPos = undefined
  #     for node in ast
  #       if !node.isWhitespace and !nonWsPos?
  #         nonWsPos = node.pos
  #       if nonWsPos?
  #         nonWsLength += node.totalSize
  #       totalLength += node.totalSize
  #     ast.pos = nonWsPos
  #     ast.wsPos = ast[0].pos
  #     ast.size = nonWsLength
  #     ast.totalSize = totalLength
  #     [ast]
  #   else
  #     token = ast
  #     {ws, pos, parent} = token
  #     createdTokens = []
  #     wsTokens = ws.split '\n'
  #     if wsTokens.length > 1 or wsTokens[0].length > 0
  #       for wsToken, i in wsTokens
  #         if i isnt 0
  #           pos += 1 # for the new line character
  #         size = wsToken.length + (if i isnt wsTokens.length - 1 then 1 else 0)
  #         createdTokens.push {
  #           value: wsToken,
  #           type: 'text',
  #           isWhitespace: yes
  #           totalSize: size,
  #           size: size,
  #           parent: parent,
  #           wsPos: pos
  #           pos}
  #         pos += wsToken.length
  #     token.pos = pos
  #     token.wsPos = pos
  #     token.value = token.token
  #     token.tokenType = token.type
  #     token.type = if token.label then 'token_' + token.label else 'text'
  #     token.size = token.token.length
  #     token.totalSize = token.size
  #     createdTokens.push token
  #     createdTokens

FIRST = FORWARD = NEXT = 1
LAST = BACKWARD = PREVIOUS = -1

opposite = (direction) ->
  direction * -1