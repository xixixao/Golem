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
        console.log "asking for tokens", +new Date if row is 7
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
  #     if isWs token
  #       return
  #     wasActive = @mainManipulatedToken()?
  #     @deselect()
  #     @unhighlightActive()
  #     if @isDelim token
  #       parenOrChild = @lastChild token.parent
  #       if @isEmpty(token.parent) or isWs parenOrChild
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
    # console.log ast, @ast if @isSingleLineInput
    duplicateProperties ast, @ast
    console.log "updated ast", +new Date
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
      exec: =>
        @addWhitespaceAtCursor '\n'

    @editor.commands.addCommand
      name: 'add new sibling to parent expression on new line'
      bindKey: win: 'Ctrl-Enter', mac: 'Ctrl-Enter'
      exec: =>
        # if (token = @rightActiveToken()) and parent = token.parent
        #   @deselect()
        #   @unhighlightActive()
        #   @editor.moveCursorToPosition @tokenVisibleEnd parent
        #   @editor.insert '\n'

    @editor.commands.addCommand
      name: 'add new sibling expression on previous line'
      bindKey: win: 'Shift-Enter', mac: 'Shift-Enter'
      exec: =>
        if (expression = @activeExpression())
          start = @startPos expression
          @addBefore '\n', expression
        else
          start = @cursorPosition()
          @addAtInsertPosition '\n'
        @setInsertPositionAt start, expression.parent

  addCommands: (session) ->
    # Never remove this command, it text insertion
    @editor.commands.addCommands
      'insertstring': # This is the default unhandled command name
        multiSelectAction: 'forEach'
        scrollIntoView: 'cursor'
        exec: (editor, string) =>
          if @commandMode or @editor.getValue() is '' and string is ':'
            editor.insert string
            return
          # Will have to handle pasting of expressions by parsing them first
          if not /\s/.test string
            if @isEditing()
              @addToEditedAtomAtCursor string
            else if @selectedExpression()
              console.log "insert from editor", +new Date
              @replaceSelected string
            else
              # todo need to create a new token
              @editAtCursor @addAtInsertPosition string
          else
            # TODO: see above
            editor.insert string

    @editor.commands.addCommands @commands =
      'select by click':
        multiSelectAction: 'forEach'
        exec: =>
          if (token = @tokenBeforeCursor())
            if (isWs token) and (isReal token.parent) or (isClosingDelim token)
              @selectExpression token.parent
            else if isAtom token
              @selectExpression token
            else
              @setInsertPositionAtCursorTo token.parent
            # console.log "after click", @selectionExpression()

      'up the tree':
        bindKey: win: 'Up', mac: 'Up'
        multiSelectAction: 'forEach'
        exec: =>
          expression = @selectionExpression()
          if @isSelecting()
            if isReal expression.parent
              @selectExpression expression.parent
          else
            # If editing or inserting
            if isReal expression
              @selectExpression expression

      'down the tree':
        bindKey: win: 'Down', mac: 'Down'
        multiSelectAction: 'forEach'
        exec: =>
          # Traverse down
          # console.log "down", @selectedExpression()
          if expression = @selectedExpression()
            if isForm expression
              # select first child node
              terms = _terms expression
              if _notEmpty terms
                @selectExpression terms[0]
              else
                # or go inside delimiters
                @setInsertPositionInside expression
            # Start editing
            else
              @editAtom()
          return

      'next in expression':
        bindKey: win: 'Right', mac: 'Right'
        multiSelectAction: 'forEach'
        exec: =>
          if @isSelectingOrEditing()
            @selectExpression nextExpression @activeExpression()

      'previous in expression':
        bindKey: win: 'Left', mac: 'Left'
        multiSelectAction: 'forEach'
        exec: =>
          if @isSelectingOrEditing()
            @selectExpression previousExpression @activeExpression()


      'include next expression':
        bindKey: win: 'Shift-Right', mac: 'Shift-Right'
        multiSelectAction: 'forEach'
        exec: =>
          if (tokens = @activeOrSelectedTokens()) and tokens[0].parent
            [..., last] = tokens
            found = false
            for t in last.parent
              if found and @isSelectable t
                @selectTokens tokens.concat [t]
                return
              if t is last
                found = true

      'include previous expression':
        bindKey: win: 'Shift-Left', mac: 'Shift-Left'
        multiSelectAction: 'forEach'
        exec: =>
          if (tokens = @activeOrSelectedTokens()) and tokens[0].parent
            [first] = tokens
            found = false
            for t in first.parent by -1
              if found and @isSelectable t
                @selectTokens [t].concat tokens
                return
              if t is first
                found = true

      'add new sibling expression':
        bindKey: win: 'Space', mac: 'Space'
        multiSelectAction: 'forEach'
        exec: =>
          @addWhitespaceAtCursor ' '

      'add new sibling expression before current':
        bindKey: win: 'Shift-Space', mac: 'Shift-Space'
        multiSelectAction: 'forEach'
        exec: =>
          if (expression = @activeExpression())
            start = @startPos expression
            @addBefore ' ', expression
            @setInsertPositionAt start, expression.parent

      'remove token and preceding whitespace or delete a character':
        bindKey: win: 'Backspace', mac: 'Backspace'
        multiSelectAction: 'forEach'
        exec: =>
          console.log "backasdsapdsad"
          if atom = @editedAtom()
            if @cursorPosition() is atom.start
              prevToken = previous atom # WARNING: relies on space separation
              if isSpace prevToken
                leftNeighbor = previous prevToken
                # TODO: join atoms if possible
              else if isNewLine prevToken
                @editor.remove("left")
                @removeNode prevToken
            else
              @editor.remove("left")
              @removeCharacterFromEditedAtomAtCursor()
          else if expression = @selectedExpression()
            prevToken = previous expression
            nextToken = next expression
            leftNeighbor = previous prevToken
            rightNeigbor = next nextToken
            @editor.remove()
            @removeNode expression
            if isSpace prevToken
              @editor.remove("left")
              @removeNode prevToken
            else if isSpace nextToken
              @editor.remove("right")
              @removeNode nextToken
            else if (isNewLine prevToken) and (isNewLine nextToken)
              # TODO: remove all preceding whitespace
              @editor.remove("left")
              @removeNode prevToken
            if leftNeighbor and isExpression leftNeighbor
              @selectExpression leftNeighbor
            else if rightNeigbor and isExpression rightNeigbor
              @selectExpression rightNeigbor
            else
              @setInsertPositionAtCursorTo expression.parent
          else
            # TODO: fix this, for now its useful to be able to erase spaces
            @editor.remove("left")
          return

      'wrap in parens':
        bindKey: win: '(', mac: '('
        multiSelectAction: 'forEach'
        exec: =>
          if (expression = @activeExpression())
            @wrap '(', ')', expression
          else
            @addAtInsertPositionAndSetCursorAtOffset '()', -1
          return

      'wrap in brackets':
        bindKey: win: '[', mac: '['
        multiSelectAction: 'forEach'
        exec: =>
          if (expression = @activeExpression())
            @wrap '[', ']', expression
          else
            @addAtInsertPositionAndSetCursorAtOffset '[]', -1
          return

      'wrap in braces':
        bindKey: win: '{', mac: '{'
        multiSelectAction: 'forEach'
        exec: =>
          if (expression = @activeExpression())
            @wrap '{', '}', expression
          else
            @addAtInsertPositionAndSetCursorAtOffset '{}', -1
          return

      'add quotes':
        bindKey: win: '"', mac: '"'
        multiSelectAction: 'forEach'
        exec: =>
          if not (expression = @activeExpression())
            @addAtInsertPositionAndSetCursorAtOffset '""', -1
          return

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
            return false
          if @isEditing()
            false
          else if not @isSelecting()
            added = @addAtInsertPosition ':'
            {row, column} = @cursorPosition()
            @editAt (row: row, column: column - 1), added
            true

      'add comment':
        bindKey: win: '#', mac: '#'
        exec: =>
          @addAtInsertPositionAndSetCursorAtOffset '(# )', -1

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
          if (expression = @activeExpression())
            if isReal expression.parent
              @pasteOver expression.parent, expression
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
              if t is token or (isWs t) or @isDelim t
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


  findParentFunction: (token) ->
    if token.parent
      if token.parent.type is 'function'
        token.parent
      else
        @findParentFunction token.parent

  findParamList: (token) ->
    if Array.isArray(token)
      if isWs token[0]
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
          if isWs t
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
            if isWs t
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
      else if @isSelectingOrEditing()
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
    prevNode = nodeBeforeIn @selectionExpression(), @posToIdx @cursorPosition()
    @addAfter string, prevNode

  # TODO should decide whether to edit or select
  replaceSelected: (string) ->
    expression = @selectedExpression()
    added = (compiler.astizeExpression string)
    @replace expression, added
    @editor.session.replace (@range expression), string
    console.log "replaced in editor", +new Date
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
    @addAt string, node.parent, (childIndex node) - 1

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
  addToEditedAtomAtCursor: (string) ->
    atom = @selectionExpression()
    at = @posToIdx @cursorPosition()
    atom.symbol = spliceString atom.symbol, at - atom.start, 0, string
    # Here we update the ast with new position data
    #  this is cheaper than reparsing the tree, but still could take a while
    #  even better would be to use an offset table
    #    every token would map to an index in the table, to get actual positions
    #    we would add up offsets from previous tokens
    atom.end += string.length
    @repositionAst()
    @editor.insert string
    @updateEditingMarker()

  removeCharacterFromEditedAtomAtCursor: ->
    atom = @selectionExpression()
    at = @posToIdx @cursorPosition()
    atom.symbol = spliceString atom.symbol, at - atom.start, 1, ''
    atom.end--
    @repositionAst()
    @updateEditingMarker()

  # Proc Bool
  isEditing: ->
    !!@editor.selection.$editMarker

  editedAtom: ->
    if @isEditing()
      @selectionExpression()

  # Start editing currently selected atom
  editAtom: ->
    if isDelimitedAtom @selectedExpression()
      @setCursor @shiftPosBy @selectionRange().end, -1
    else
      @setCursor @selectionRange().end
    @updateEditingMarker()

  editAtCursor: (atom) ->
    @editAt @cursorPosition(), atom

  editAt: (position, atom) ->
    @setSelectionExpression atom, no
    @setCursor position
    @updateEditingMarker()

  updateEditingMarker: ->
    @clearEditingMarker()
    range = @editableRange @selectionExpression()
    id = @editor.session.addMarker range, 'ace_active-token'
    @editor.selection.$editMarker = id

  clearEditingMarker: (selection = @editor.selection) ->
    if id = selection.$editMarker
      @editor.session.removeMarker id
      @editor.selection.$editMarker = undefined

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
  setInsertPositionInside: (form) ->
    inside = @idxToPos form[0].end
    @setCursor inside
    @setSelectionExpression expression, yes

  setInsertPositionAtCursorTo: (enclosingExpression) ->
    @setInsertPositionAt @cursorPosition(), enclosingExpression

  setInsertPositionAt: (position, enclosingExpression) ->
    @setCursor position
    @setSelectionExpression enclosingExpression, yes

  # Sets the expression on the current selection
  #   inside - no when the expression is selected
  #            yes when the insert position is inside the expression
  setSelectionExpression: (expression, inside) ->
    @editor.selection.$teaExpression = expression
    @editor.selection.$teaInside = inside

  # Proc (Maybe Expression)
  selectedExpression: ->
    if @isSelecting()
      @selectionExpression()

  isSelecting: ->
    @isSelectingOrEditing() and not @isEditing()

  # Proc Bool
  isSelectingOrEditing: ->
    not @editor.selection.$teaInside

  # Proc (Maybe Expression)
  activeExpression: ->
    if @isSelectingOrEditing()
      @selectionExpression()

  # Proc (Maybe Expression)
  selectionExpression: ->
    @editor.selection.$teaExpression # TODO: what if multi?

  # Proc Range
  selectionRange: ->
    @editor.getSelectionRange()

  # Proc Pos ()
  setCursor: (position) ->
    @setSelectionRange Range.fromPoints position, position

  # Proc Range ()
  setSelectionRange: (range) ->
    # console.log "set range", @editor.selection, range
    @editor.selection.setSelectionRange range
    @clearEditingMarker()

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

  getTokenNextTo: (editor, row, col) ->
    tokens = @lineTokens editor, row
    c = 0
    for token, i in tokens
      c += token.end - token.start
      if c == col and not isWs token
        return token
      if c > col
        return token

  lineTokens: (editor, row) ->
    editor.session.$mode.tokensOnLine row, editor.session.doc

  handleClick: (event) =>
    if event.getShiftKey?()
      # TODO rename tokenNextToCursor
      token = @tokenNextToCursor @editor
      unless isDelim token
        @editAtCursor token
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
  delimitedAtomRange: (atom) ->
    {start, end} = @range atom
    Range.fromPoints (@shiftPosBy start, 1), (@shiftPosBy end, -1)

  range: (node) ->
    start = @startPos node
    end = @endPos node
    Range.fromPoints start, end

  # Proc Node Pos
  startPos: (node) ->
    @idxToPos node.start

  # Proc Node Pos
  endPos: (node) ->
    @idxToPos node.end

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


replaceChildNodeWith = (replaced, added) ->
  added.parent = replaced.parent
  replaced.parent.splice (childIndex replaced), 1, added

# Proc Node Form ()
insertChildNodeAt = (child, parent, index) ->
  child.parent = parent
  parent.splice index, 0, child

# Fn Node Bool
isExpression = (node) ->
  not (isWs node) and not (isDelim node)

isAtom = (node) ->
  (isExpression node) and not isForm node

isDelimitedAtom = (atom) ->
  atom.label in ['string', 'regex']

# Fn Atom Bool
isDelim = (atom) ->
  /[\(\)\[\]\{\}]/.test atom.symbol

# Fn Expression Bool
isClosingDelim = (atom) ->
  /[\)\]\}]/.test atom.symbol

# Fn Expression Bool
isWs = (expression) ->
  expression.label is 'whitespace'

# Fn Token Bool
isSpace = (token) ->
  token.symbol is ' '

isNewLine = (token) ->
  token.symbol is '\n'

# Whether the expression is actually inside current editor
# Fn Expression Bool
isReal = (expression) ->
  expression.start >= 0

findTokensBetween = (expression, start, end) ->
  # console.log "looking between #{start} and #{end} in", expression
  if isForm expression
    if start < expression.end and expression.start < end
      concat (for expr in expression
        findTokensBetween expr, start, end)
    else
      []
  else
    if start <= expression.start < end
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

# Proc Expression (Maybe Node)
previous = (expression) ->
  expression.parent[(childIndex expression) - 1]

# Proc Expression (Maybe Node)
next = (expression) ->
  expression.parent[(childIndex expression) + 1]

# Fn Expression Int
childIndex = (expression) ->
  indexWithin expression, expression.parent

indexWithin = (what, array) ->
  for element, i in array
    if element is what
      return i
  throw new Error "what is not inside of array in indexWithin"

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
  #       if !node.isWs and !nonWsPos?
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
  #           isWs: yes
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
