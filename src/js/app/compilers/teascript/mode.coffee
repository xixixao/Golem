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
        # Create pair
        currentActiveToken = session.manipulatedTokens.active.main
        if currentActiveToken and currentActiveToken.label in ['string', 'regex']
          return
        if currentActiveToken
          session.getMode().selectToken currentActiveToken
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
      if text in ['"', "'"]
        quote = text
        selection = editor.getSelectionRange()
        selected = session.doc.getTextRange(selection)
        if selected isnt "" and selected isnt "'" and selected isnt "\"" and editor.getWrapBehavioursEnabled()
          text: quote + selected + quote
          selection: false
        else
          mode = session.getMode()
          currentActiveToken = mode.mainManipulatedToken()
          if currentActiveToken
            text: " " + quote + quote
            selection: [2, 2]
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
  constructor: (@isSingleLineInput, @memory) ->
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
    if @isSingleLineInput
      tokenizingFunction = compiler.tokenizeExp
    else
      tokenizingFunction = compiler.tokenize
    value = if doc?.getValue then doc.getValue() else @editor.getValue()
    if value isnt ''
      try
        ast = tokenizingFunction value
        @ast = (@labelTokens ast)[0]
      catch e
        console.log "Error while tokenizing", e
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
      token.tokenType = token.type
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
      #pos = @editor.getCursorPosition()
      {row, column} = data.range.end
      @highlightTokenAt row, column

  highlightTokenAt: (row, column) ->
    token = @getTokenBefore @editor, row, column
    if token
      # whitespace is handled by command
      if token.isWs
        return
      wasActive = @mainManipulatedToken()?
      @deselect()
      @unhighlightActive()
      if @isDelim token
        parenOrChild = @lastChild token.parent
        if @isEmpty(token.parent) or parenOrChild.isWs
          # added empty parens, put cursor inside
          @editor.moveCursorToPosition @tokenVisibleEnd parenOrChild
        else
          # wrapped token in parens
          @selectToken parenOrChild
      # normal insert
      else
        @editToken token

  isEmpty: (expression) ->
    parenOrChild = @lastChild expression
    parenOrChild.token in ['(', '[', '{']

  rangeOfEnd: (token) ->
    end = @tokenVisibleEnd token
    @rangeOfPos end

  rangeOfPos: (pos) ->
    Range.fromPoints pos, pos

  lastChild: (expression) ->
    expression[expression.length - 2]

  editToken: (token) ->
    @highlightToken token
    if token.label is 'string'
      range = @tokenToEditableRange token
      cursor = @editor.getCursorPosition()
      if cursor.column == range.end.column + 1
        @editor.selection.setSelectionRange Range.fromPoints range.end, range.end

  highlightToken: (token) ->
    # 1-based for multiselect, 0 is the single-select
    index = (@editor.selection.index ? -1)
    if @isMultiEditing()
      @manipulatedTokens().active[@editor.selection.index] = token
      # update all active
      for token, i in @manipulatedTokens().active when token
        @highlightTokenAtIndex token, i
    else
      @manipulatedTokens().active.main = token
      markerId = @highlightTokenReturnId token
      @manipulatedTokens().activeMarkers.main = markerId

  highlightTokenAtIndex: (token, index) ->
    markerId = @highlightTokenReturnId token
    @manipulatedTokens().activeMarkers[index] = markerId

  highlightTokenReturnId: (token) ->
    range = @tokenToEditableRange token
    @editor.session.addMarker range, 'ace_active-token'

  tokenToEditableRange: (token) ->
    if token.label is 'string'
      @tokenStringToEditableRange token
    else
      @tokenToVisibleRange token

  unhighlightActive: ->
    # remove all markers
    for id in @activeMarkers()
      @editor.session.removeMarker id
    @manipulatedTokens().activeMarkers = []
    if @isMultiEditing()
      @manipulatedTokens().active.main = undefined
    else
      # forget tokens including main
      @manipulatedTokens().active = []
    return

  isMultiEditing: ->
    @editor.multiSelect.ranges.length > 1

  manipulatedTokens: ->
    @editor.session.manipulatedTokens

  activeOrSelectedTokens: ->
    if @manipulatedTokens().active.length > 1
      [@mainManipulatedToken()]
    else
      @editor.selection.tokens

  activeTokens: ->
    if @manipulatedTokens().active.main
      [@manipulatedTokens().active.main]
    else
      @manipulatedTokens().active

  activeMarkers: ->
    if @manipulatedTokens().activeMarkers.main
      [@manipulatedTokens().activeMarkers.main]
    else
      @manipulatedTokens().activeMarkers

  mainManipulatedToken: ->
    @manipulatedTokens().active.main

  leftActiveToken: ->
    @mainManipulatedToken() or
      @editor.selection.tokens and @editor.selection.tokens[0]

  rightActiveToken: ->
    @mainManipulatedToken() or
      @editor.selection.tokens and @editor.selection.tokens[@editor.selection.tokens.length - 1]

  detachFromSession: (session) ->
    session.removeListener 'change', @onDocumentChange
    @editor.removeListener 'click', @handleClick
    session.getDocument().removeListener 'change', @selectInserted

  attachToSession: (session) ->
    return unless session.getEditor()

    @ast = undefined
    @editor = session.getEditor()
    session.manipulatedTokens =
      active: []
      activeMarkers: []
    session.on 'change', @onDocumentChange
    @editor.on 'click', @handleClick
    # attaching as last listener, so that everything is updated already
    session.getDocument().on 'change', @selectInserted, no

    unless @isSingleLineInput
      @addVerticalCommands session
    @addCommands session


  addVerticalCommands: (session) ->
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

  addCommands: (session) ->
    @editor.commands.addCommands @commands =
      'up the tree':
        bindKey: win: 'Up', mac: 'Up'
        exec: =>
          # todo: select lowest common ancenstor when using multiple selections
          if @editor.selection.tokens and [token] = @editor.selection.tokens
            if token.parent?.pos? # check for real token by checking pos
              # select parent node
              @selectToken token.parent
          else if token = @mainManipulatedToken()
            # select whole token
            @selectToken token
          else
            # select brackets
            token = @tokenBeforeCursor @editor
            @selectToken token.parent

      'down the tree':
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
            @editor.moveCursorToPosition inside
          else
            # start editing
            @deselect()
            @unhighlightActive()
            @editToken token

      'next in expression':
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

      'previous in expression':
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


      'include next expression':
        bindKey: win: 'Shift-Right', mac: 'Shift-Right'
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
        exec: =>
          if (token = @rightActiveToken()) and token.parent
            unless token.label is 'string' and token is @mainManipulatedToken()
              @deselect()
              @unhighlightActive()
              @editor.moveCursorToPosition @tokenVisibleEnd token
            @editor.insert ' '

      'add new sibling expression before current':
        bindKey: win: 'Shift-Space', mac: 'Shift-Space'
        exec: =>
          if (token = @leftActiveToken()) and token.parent
            @deselect()
            @unhighlightActive()

            start = @tokenVisibleStart token
            @editor.moveCursorToPosition start
            @editor.session.insert start, ' '
            @editor.moveCursorToPosition start

      'remove token and preceding whitespace or delete a character':
        bindKey: win: 'Backspace', mac: 'Backspace'
        exec: =>
          if @mainManipulatedToken()
            # remove single character
            end = @editor.getCursorPosition()
            butOne = row: end.row, column: end.column - 1
            @editor.session.doc.remove Range.fromPoints butOne, end
            @unhighlightActive()
            # TODO: this doesn't work if the trailing space is last in the file
            # e.g. when the user just deleted the last token in the file
            # because the compiler trims it
            # fix: have the compiler output whitespace tokens instead of coalescing them
            maybeActiveToken = @tokenBeforeCursor @editor
            if @isSelectable maybeActiveToken
              @highlightToken maybeActiveToken
          else
            if tokens = @editor.selection.tokens
              @deselect()
            else
              token = @tokenBeforeCursor @editor
              tokens = if token.label in ['paren', 'bracket']
                [token.parent]
              else
                [token]
            {tokens, isFirst, nextToken} = @surroundingWhitespace tokens
            @editor.session.doc.remove @tokensToActualRange tokens
            if isFirst
              @selectToken @expressionAfterCursor @editor if nextToken?
            else
              @selectToken @expressionBeforeCursor @editor

      'add new sibling to parent':
        bindKey: win: ')', mac: ')'
        exec: =>
          activeToken = @rightActiveToken()
          if activeToken and activeToken.parent?.parent
            parent = activeToken.parent
          else
            parent = (@tokenBeforeCursor @editor).parent
          @deselect()
          @unhighlightActive()
          @editor.moveCursorToPosition @tokenVisibleEnd parent
          @editor.insert ' '

      'add label':
        bindKey: win: ':', mac: ':'
        exec: =>
          if (token = @rightActiveToken())
            @deselect()
            @unhighlightActive()
            @editor.insert ':'
          else
            @editor.insert ':'
            {row, column} = @editor.getCursorPosition()
            @editor.moveCursorToPosition row: row, column: column - 1

      'add comment':
        bindKey: win: '#', mac: '#'
        exec: =>
          @editor.insert '(# )'
          {row, column} = @editor.getCursorPosition()
          @editor.moveCursorToPosition row: row, column: column

      # Temporary
      'show type of expression':
        bindKey: win: 'Ctrl-T', mac: 'Ctrl-T'
        exec: =>
          expression = @leftActiveToken()
          prettyPrintType = (type) ->
            if Array.isArray type
              "(Fn #{type.map(prettyPrintType).join ' '})"
            else
              type
          if expression
            window.log compiler.syntaxedExpHtml prettyPrintType expression.tea

      'replace parent with current selection':
        bindKey: win: 'Ctrl-P', mac: 'Ctrl-P'
        exec: =>
          range = @activeRange()
          # todo: select lowest common ancenstor when using multiple selections
          # TODO: actually, we should replace parent of two adjecent nodes or
          # if the nodes span more expressions replace each, like normal multi-cursor
          token = @leftActiveToken()
          if range and token and token.parent
            @editor.session.doc.replace @tokenToVisibleRange(token.parent),
              @editor.session.doc.getTextRange range

      'wrap current in a function':
        bindKey: win: 'Ctrl-F', mac: 'Ctrl-F'
        exec: =>
          range = @activeRange()
          if range
            expression = @editor.session.doc.getTextRange range
            @editor.session.doc.replace range,
              "(fn [] #{expression})"

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
              if t is token or t.isWs or @isDelim t
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
      if token[0].isWs
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
    /[\(\)\[\]\{\}]/.test token.token

  deselect: =>
    @editor.selection.clearSelection()
    @editor.selection.tokens = undefined

  expressionAfterCursor: (editor) ->
    @getExpression @tokenAfterCursor editor

  expressionBeforeCursor: (editor) ->
    @getExpression @tokenBeforeCursor editor

  tokenAfterCursor: (editor) ->
    pos = editor.getCursorPosition()
    @getTokenAfter editor, pos.row, pos.column

  tokenBeforeCursor: (editor) ->
    pos = editor.getCursorPosition()
    @getTokenBefore editor, pos.row, pos.column

  tokenNextToCursor: (editor) ->
    pos = editor.getCursorPosition()
    @getTokenNextTo editor, pos.row, pos.column

  getExpression: (token) ->
    if @isSelectable token
      token
    else
      token.parent

  getTokenAfter: (editor, row, col) ->
    {tokens} = @lineTokens editor, row
    c = 0
    for token, i in tokens
      if c >= col
        return token
      c += token.value.length

  getTokenBefore: (editor, row, col) ->
    {tokens} = @lineTokens editor, row
    c = 0
    for token, i in tokens
      c += token.value.length
      if c >= col
        return token
    # Must be a whitespace not produced by the compiler
    return

  getTokenNextTo: (editor, row, col) ->
    {tokens} = @lineTokens editor, row
    c = 0
    for token, i in tokens
      c += token.value.length
      if c == col and !token.isWs
        return token
      if c > col
        return token

  lineTokens: (editor, row) ->
    editor.session.$mode.$tokenizer.getLineTokens "", "", row, editor.session.doc

  handleClick: (event) =>
    @deselect()
    @unhighlightActive()
    if event.getShiftKey()
      token = @tokenNextToCursor @editor
      unless @isDelim token
        @highlightToken token
    else
      # select clicked word or its parent if whitespace selected
      token = @expressionBeforeCursor @editor
      @selectToken token

  selectToken: (token) ->
    @unhighlightActive()
    @editor.selection.setSelectionRange @tokenToVisibleRange token
    @editor.selection.tokens = [token]

  selectTokens: (tokens) ->
    @editor.selection.setSelectionRange @tokensToVisibleRange tokens
    @editor.selection.tokens = tokens

  tokenToVisibleRange: (token) ->
    start = @tokenVisibleStart token
    end = @tokenVisibleEnd token
    Range.fromPoints start, end

  tokenStringToEditableRange: (token) ->
    start = @editor.session.doc.indexToPosition token.pos + 1
    end = @editor.session.doc.indexToPosition token.pos + token.size - 1
    Range.fromPoints start, end

  # S-Exp -> Range
  tokenToActualRange: (token) ->
    start = @editor.session.doc.indexToPosition token.wsPos
    end = @editor.session.doc.indexToPosition token.wsPos + token.totalSize
    Range.fromPoints start, end

  # S-Exp -> Position
  tokenVisibleEnd: (token) ->
    @editor.session.doc.indexToPosition token.pos + token.size

  # S-Exp -> Position
  tokenVisibleStart: (token) ->
    @editor.session.doc.indexToPosition token.pos

  createWorker: (session) ->
    worker = new WorkerClient ["ace", "compilers"],
      "compilers/teascript/worker",
      "Worker",
      null,
      yes
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

  prefixWorker: (input) ->
    @worker.emit 'prefix', data: data: input

  # HUGE HACK to load prelude by default
  # window.requireModule 'Tea.Prelude'
  loadPreludeNames: ->
    try
      names = compiler.exportList (@memory.loadSource 'Tea.Prelude').value
    catch e
      throw new Error e.message + " in module Tea.Prelude"
    joinedNames = "[#{names.join ' '}]"
    "#{joinedNames} (require Tea.Prelude #{joinedNames}) "

  preExecute: (memory) ->
    window.requireModule = (fileName, names) ->
      try
        module = eval compiler.compileModule (memory.loadSource fileName).value
      catch e
        throw new Error e.message + " in module #{fileName}"
      for name in names
        module[name]
