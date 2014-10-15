Outdent      = require("ace/mode/matching_brace_outdent").MatchingBraceOutdent
FoldMode     = require("ace/mode/folding/coffee").FoldMode
Range        = require("ace/range").Range
TextMode     = require("ace/mode/text").Mode
Behaviour    = require("ace/mode/behaviour").Behaviour
WorkerClient = require("ace/worker/worker_client").WorkerClient

compiler = require './compiler'

class TeaScriptBehaviour extends Behaviour

  bracketHelper = (open, close) ->
    (state, action, editor, session, text) ->
      if text is open
        activeToken = editor.selection.activeToken
        if activeToken and activeToken.label in ['string', 'regex']
          return
        if activeToken
          session.getMode().selectToken activeToken
        selection = editor.getSelectionRange()
        selected = session.doc.getTextRange(selection)
        if selected isnt ""
          text: open + selected + close
          # selection: [0, 2 + selected.length]
        else
          text: open + close
          # selection: [1, 1]

  constructor: ->

    @add "parens", "insertion", bracketHelper "(", ")"
    @add "brackets", "insertion", bracketHelper "[", "]"
    @add "braces", "insertion", bracketHelper "{", "}"

    @add "quotes", "insertion", (state, action, editor, session, text) ->
      if text is "\""
        quote = text
        selection = editor.getSelectionRange()
        selected = session.doc.getTextRange(selection)
        if selected isnt "" and selected isnt "'" and selected isnt "\"" and editor.getWrapBehavioursEnabled()
          text: quote + selected + quote
          selection: false
        else
          text: quote + quote
          selection: [1, 1]

    @add "quotes", "deletion", (state, action, editor, session, range) ->
      selected = session.doc.getTextRange(range)
      if not range.isMultiLine() and (selected is "\"" or selected is "'")
        line = session.doc.getLine(range.start.row)
        rightChar = line.substring(range.start.column + 1, range.start.column + 2)
        if rightChar is selected
          range.end.column++
          range

    return

exports.Mode = class extends TextMode
  constructor: (@isNotSource) ->
    @$tokenizer = getLineTokens: (line, state, row, doc) =>
      start = doc.positionToIndex {row, column: 0}
      end = doc.positionToIndex {row: row + 1, column: 0}

      tokensOnLine = []
      addOnLine = (ast) ->
        if Array.isArray ast
          if start < ast.pos + ast.size and ast.pos < end
            addOnLine node for node in ast
        else
          if start <= ast.pos < end
            tokensOnLine.push ast
        return

      if !@ast
        @onDocumentChange doc
      if !@ast
        return tokens: [value: line, type: 'text']
      addOnLine @ast
      tokens: tokensOnLine


    @$outdent = new Outdent
    @foldingRules = new FoldMode
    @$behaviour = new TeaScriptBehaviour

  onDocumentChange: (doc) =>
    # console.log "tokenizing document", @editor.getValue()
    if @isNotSource
      tokenizingFunction = compiler.tokenizeExp
    else
      tokenizingFunction = compiler.tokenize
    value = if doc?.getValue then doc.getValue() else @editor.getValue()
    try
      ast = tokenizingFunction value
      @ast = (@labelTokens ast)[0]
    catch
      @ast = undefined

  labelTokens: (ast) =>
    if Array.isArray ast
      newNodes = for node in ast
        @labelTokens node
      ast.length = 0 # remove all nodes
      for nodeList in [].concat newNodes...
        ast.push nodeList
      totalLength = 0
      nonWsLength = 0
      nonWsPos = undefined
      for node in ast
        if !node.isWs and !nonWsPos?
          nonWsPos = node.pos
        if nonWsPos?
          nonWsLength += node.totalSize
        totalLength += node.totalSize
      ast.pos = nonWsPos
      ast.wsPos = ast[0].pos
      ast.size = nonWsLength
      ast.totalSize = totalLength
      [ast]
    else
      token = ast
      {ws, pos, parent} = token
      createdTokens = []
      wsTokens = ws.split '\n'
      if wsTokens.length > 1 or wsTokens[0].length > 0
        for wsToken, i in wsTokens
          if i isnt 0
            pos += 1 # for the new line character
          size = wsToken.length + (if i isnt wsTokens.length - 1 then 1 else 0)
          createdTokens.push {
            value: wsToken,
            type: 'text',
            isWs: yes
            totalSize: size,
            size: size,
            parent: parent,
            wsPos: pos
            pos}
          pos += wsToken.length
      token.pos = pos
      token.wsPos = pos
      token.value = token.token
      token.type = if token.label then 'token_' + token.label else 'text'
      token.size = token.token.length
      token.totalSize = token.size
      createdTokens.push token
      createdTokens

  getNextLineIndent: (state, line, tab) ->
    indent = @$getIndent line
    # TODO: this doesn't work properly for strings, use tokens instead
    numOpen = (line.match(/[\(\[\{]/g) or []).length
    numClosed = (line.match(/[\)\]\}]/g) or []).length
    new Array(numOpen - numClosed + indent.length / tab.length + 1).join tab

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

  selectInserted: ({data}) =>
    if data.action is 'insertText'
      pos = @editor.getCursorPosition()
      @highLightTokenAt pos.row, pos.column

  highLightTokenAt: (row, column) ->
    token = @getTokenBefore row, column
    if token
      # whitespace is handled by command
      if token.isWs
        return
      wasActive = @editor.selection.activeToken?
      @unhighlightActive()
      @deselect()
      if @isDelim token
        # added empty parens, put cursor inside
        if @lastChild(token.parent).token in ['(', '[', '{']
          @putCursorBeforeToken token
        # wrapped token in parens
        else
          @selectToken @lastChild token.parent
      # normal insert
      else
        @highLightToken token

  putCursorBeforeToken: (token) ->
    {start} = @tokenToVisibleRange token
    @editor.selection.setSelectionRange Range.fromPoints start, start

  lastChild: (expression) ->
    expression[expression.length - 2]

  highLightToken: (token) ->
    @editor.selection.activeToken = token
    range = @tokenToVisibleRange token
    @editor.selection.activeTokenMarkerId = @editor.session.addMarker range, 'ace_active-token'

  unhighlightActive: ->
    @editor.session.removeMarker @editor.selection.activeTokenMarkerId
    @editor.selection.activeToken = undefined

  activeTokens: ->
    if @editor.selection.activeToken
      [@editor.selection.activeToken]
    else
      @editor.selection.tokens

  leftActiveToken: ->
    @editor.selection.activeToken or
      @editor.selection.tokens and @editor.selection.tokens[0]

  rightActiveToken: =>
    @editor.selection.activeToken or
      @editor.selection.tokens and @editor.selection.tokens[@editor.selection.tokens.length - 1]

  detachFromSession: (session) ->
    session.removeListener 'change', @onDocumentChange
    @editor.removeListener 'click', @handleClick
    session.getDocument().removeListener 'change', @selectInserted

  attachToSession: (session) ->
    @ast = undefined
    @editor = session.getEditor()
    session.on 'change', @onDocumentChange
    @editor.on 'click', @handleClick

    if not @isNotSource
      # attaching as last listener, so that everything is updated already
      session.getDocument().on 'change', @selectInserted, no
      @editor.commands.addCommand
        name: 'up the tree'
        bindKey: win: 'Up', mac: 'Up'
        exec: =>
          # todo: select lowest common ancenstor when using multiple selections
          if @editor.selection.tokens and [token] = @editor.selection.tokens
            if token.parent?.pos?
              # select parent node
              @selectToken token.parent
          else if token = @editor.selection.activeToken
            # select whole token
            @selectToken token
          else
            # select brackets
            token = @tokenBeforeCursor()
            @selectToken token.parent

      @editor.commands.addCommand
        name: 'down the tree'
        bindKey: win: 'Down', mac: 'Down'
        exec: =>
          if (token = @editor.selection.tokens[0]) and Array.isArray token
            # select first child node
            for t in token
              if @isSelectable t
                @selectToken t
                return
            # or go inside brackets
            @deselect()
            inside = @editor.session.doc.indexToPosition token.pos + 1
            @editor.selection.setSelectionRange Range.fromPoints inside, inside
          else
            # start editing
            @selectToken token
            @deselect()
            @highLightToken token


      @editor.commands.addCommand
        name: 'next in expression'
        bindKey: win: 'Right', mac: 'Right'
        exec: =>
          if (token = @rightActiveToken()) and token.parent
            # select first sibling node
            found = false
            for t in token.parent
              if found and @isSelectable t
                @selectToken t
                return
              if t is token
                found = true

      @editor.commands.addCommand
        name: 'previous in expression'
        bindKey: win: 'Left', mac: 'Left'
        exec: =>
          if (token = @leftActiveToken()) and token.parent
            # select first sibling node
            found = false
            for t in token.parent by -1
              if found and @isSelectable t
                @selectToken t
                return
              if t is token
                found = true

      @editor.commands.addCommand
        name: 'include next expression'
        bindKey: win: 'Shift-Right', mac: 'Shift-Right'
        exec: =>
          if (tokens = @activeTokens()) and tokens[0].parent
            [..., last] = tokens
            found = false
            for t in last.parent
              if found and @isSelectable t
                @selectTokens tokens.concat [t]
                return
              if t is last
                found = true

      @editor.commands.addCommand
        name: 'include previous expression'
        bindKey: win: 'Shift-Left', mac: 'Shift-Left'
        exec: =>
          if (tokens = @activeTokens()) and tokens[0].parent
            [first] = tokens
            found = false
            for t in first.parent by -1
              if found and @isSelectable t
                @selectTokens [t].concat tokens
                return
              if t is first
                found = true

      @editor.commands.addCommand
        name: 'add new sibling expression'
        bindKey: win: 'Space', mac: 'Space'
        exec: =>
          if (token = @rightActiveToken()) and token.parent
            @deselect()
            @unhighlightActive()
            @editor.insert ' '

      @editor.commands.addCommand
        name: 'add new sibling expression before current'
        bindKey: win: 'Shift-Space', mac: 'Shift-Space'
        exec: =>
          if (token = @leftActiveToken()) and token.parent
            @deselect()
            @unhighlightActive()

            {start} = @tokenToVisibleRange token
            @editor.moveCursorToPosition start
            @editor.session.insert start, ' '
            @editor.moveCursorToPosition start

      @editor.commands.addCommand
        name: 'add new sibling expression on new line'
        bindKey: win: 'Enter', mac: 'Enter'
        exec: =>
          if (token = @rightActiveToken()) and token.parent
            @deselect()
            @unhighlightActive()

          @editor.insert '\n'

      @editor.commands.addCommand
        name: 'add new sibling expression on previous line'
        bindKey: win: 'Shift-Enter', mac: 'Shift-Enter'
        exec: =>
          if (token = @leftActiveToken()) and token.parent
            @deselect()
            @unhighlightActive()

            {start} = @tokenToVisibleRange token
            @editor.moveCursorToPosition start
          else
            start = @editor.getCursorPosition()
          @editor.session.insert start, '\n'
          @editor.moveCursorToPosition start

      @editor.commands.addCommand
        name: 'remove token and preceding whitespace or delete a character'
        bindKey: win: 'Backspace', mac: 'Backspace'
        exec: =>
          if @editor.selection.activeToken
            # remove single character
            end = @editor.getCursorPosition()
            butOne = row: end.row, column: end.column - 1
            @editor.session.doc.remove Range.fromPoints butOne, end
            @unhighlightActive()
            # TODO: this doesn't work if the trailing space is last in the file
            # because the compiler trims it
            # fix: have the compiler output whitespace tokens instead of coalescing them
            maybeActiveToken = @tokenBeforeCursor()
            if @isSelectable maybeActiveToken
              @highLightToken maybeActiveToken
          else
            # TODO: support multiple selected tokens by deleting whole selected range
            if tokens = @editor.selection.tokens
              @deselect()
            else
              token = @tokenBeforeCursor()
              tokens = if token.label in ['paren', 'bracket']
                [token.parent]
              else
                [token]
            {tokens, isFirst, nextToken} = @surroundingWhitespace tokens
            @editor.session.doc.remove @tokensToActualRange tokens
            if isFirst
              @selectToken @expressionAfterCursor() if nextToken?
            else
              @selectToken @expressionBeforeCursor()

      @editor.commands.addCommand
        name: 'replace parent with current selection'
        bindKey: win: 'Ctrl-P', mac: 'Ctrl-P'
        exec: =>
          range = @activeRange()
          # todo: select lowest common ancenstor when using multiple selections
          token = @leftActiveToken()
          if range and token and token.parent
            @editor.session.doc.replace @tokenToVisibleRange(token.parent),
              @editor.session.doc.getTextRange range

  activeRange: ->
    if @editor.selection.tokens
      @editor.selection.getRange()
    else if token = @editor.selection.activeToken
      @tokenToVisibleRange token
    else
      undefined

  tokensToActualRange: (tokens) ->
    [first, ..., last] = tokens
    Range.fromPoints (@tokenToActualRange first).start, (@tokenToActualRange last).end

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
          if t.isWs
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
            if t.isWs
              tokens.push t
            else
              if @isSelectable t
                nextToken = t
              break
          if t is last
            found = true
    {tokens, isFirst, nextToken}


  isSelectable: (token) ->
    not token.isWs and not @isDelim token

  isDelim: (token) ->
    token.label in ['paren', 'bracket', 'brace']

  deselect: =>
    @editor.selection.clearSelection()
    @editor.selection.tokens = undefined
    @editor.selection.activeToken = undefined

  expressionAfterCursor: ->
    @getExpression @tokenAfterCursor()

  expressionBeforeCursor: =>
    @getExpression @tokenBeforeCursor()

  expressionNextToCursor: ->
    @getExpression @tokenNextToCursor()

  tokenAfterCursor: =>
    pos = @editor.getCursorPosition()
    @getTokenAfter pos.row, pos.column

  tokenBeforeCursor: =>
    pos = @editor.getCursorPosition()
    @getTokenBefore pos.row, pos.column

  tokenNextToCursor: =>
    pos = @editor.getCursorPosition()
    @getTokenNextTo pos.row, pos.column

  expressionAt: (row, col) ->
    @getExpression @getTokenBefore row, col

  getExpression: (token) ->
    if @isSelectable token
      token
    else
      token.parent

  getTokenAfter: (row, col) ->
    {tokens} = @$tokenizer.getLineTokens "", "", row, @editor.session.doc
    c = 0
    for token, i in tokens
      if c >= col
        return token
      c += token.value.length

  getTokenBefore: (row, col) ->
    {tokens} = @$tokenizer.getLineTokens "", "", row, @editor.session.doc
    c = 0
    for token, i in tokens
      c += token.value.length
      if c >= col
        return token

  getTokenNextTo: (row, col) ->
    {tokens} = @$tokenizer.getLineTokens "", "", row, @editor.session.doc
    c = 0
    for token, i in tokens
      c += token.value.length
      if c == col and !token.isWs
        return token
      if c > col
        return token

  handleClick: (event) =>
    @deselect()
    @unhighlightActive()
    if event.getShiftKey()
      token = @expressionNextToCursor()
      @highLightToken token
    else
      # select clicked word or its parent if whitespace selected
      token = @expressionBeforeCursor()
      @selectToken token

  selectToken: (token) ->
    @unhighlightActive()
    @editor.selection.setSelectionRange @tokenToVisibleRange token
    @editor.selection.tokens = [token]

  selectTokens: (tokens) ->
    @editor.selection.setSelectionRange @tokensToVisibleRange tokens
    @editor.selection.tokens = tokens

  tokenToVisibleRange: (token) ->
    start = @editor.session.doc.indexToPosition token.pos
    end = @editor.session.doc.indexToPosition token.pos + token.size
    Range.fromPoints start, end

  tokenToActualRange: (token) ->
    start = @editor.session.doc.indexToPosition token.wsPos
    end = @editor.session.doc.indexToPosition token.wsPos + token.totalSize
    Range.fromPoints start, end

  createWorker: (session) ->
    worker = new WorkerClient ["ace", "compilers"],
      "compilers/teascript/worker",
      "Worker",
      null,
      yes

    if session
      worker.attachToDocument session.getDocument()
      worker.on "error", (e) ->
        session.setAnnotations [e.data]

      worker.on "ok", (e) =>
        session.clearAnnotations()

    worker

  preExecute: (memory) ->
    window.requireModule = (fileName, names) ->
      module = eval compiler.compileModule (memory.loadSource fileName).value
      for name in names
        module[name]
