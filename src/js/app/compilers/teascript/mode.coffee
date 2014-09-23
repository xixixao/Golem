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
        if activeToken
          session.getMode().selectToken activeToken
        selection = editor.getSelectionRange()
        selected = session.doc.getTextRange(selection)
        if selected isnt ""
          text: open + selected + close
          # selection: [0, 2 + selected.length]
        else
          text: open + close
          selection: [1, 1]

  constructor: ->

    @add "parens", "insertion", bracketHelper "(", ")"

    @add "brackets", "insertion", bracketHelper "[", "]"

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
    # console.log "document changed", @editor.getValue()
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
            pos}
          pos += wsToken.length
      token.pos = pos
      token.value = token.token
      token.type = if token.label then 'token_' + token.label else 'text'
      token.size = token.token.length
      token.totalSize = token.size
      createdTokens.push token
      createdTokens

  getNextLineIndent: (state, line, tab) ->
    indent = @$getIndent line
    numOpen = (line.match(/[\(\[]/g) or []).length
    numClosed = (line.match(/[\)\]]/g) or []).length
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
    console.log "somehting changed", data
    switch data.action
      when 'insertText'
        pos = data.range.end
      when 'removeText'
        pos = data.range.start
    @highLightTokenAt pos.row, pos.column, data.action is 'insertText'

  highLightTokenAt: (row, column, isInsert) ->
    token = @getTokenAt row, column
    if token
      wasActive = @editor.selection.activeToken? or !@editor.selection.token?
      if token.isWs
        return
      @deselect()
      @unhighlightActive()
      if token.token in ['(', '[']
        return
      else if token.label in ['paren', 'bracket']
        @selectToken if isInsert
            @lastChild token.parent
          else
            token
      else if wasActive
        @highLightToken token
      else
        @selectToken token

  lastChild: (expression) ->
    expression[expression.length - 2]

  highLightToken: (token) ->
    @editor.selection.activeToken = token
    range = @tokenToRange token
    @editor.selection.activeTokenMarkerId = @editor.session.addMarker range, 'ace_active-token'

  unhighlightActive: ->
    @editor.session.removeMarker @editor.selection.activeTokenMarkerId
    @editor.selection.activeToken = undefined

  activeToken: =>
    @editor.selection.token or @editor.selection.activeToken

  attachToSession: (session) ->
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
          if token = @editor.selection.token
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
          if (token = @editor.selection.token) and Array.isArray token
            # select first child node
            for t in token
              if t.label not in ['paren', 'bracket'] and not t.isWs
                @selectToken t
                return
            # or go inside brackets
            @deselect()
            inside = @editor.session.doc.indexToPosition token.pos + 1
            @editor.selection.setSelectionRange Range.fromPoints inside, inside
          else
            @deselect()
            @highLightToken token


      @editor.commands.addCommand
        name: 'next in expression'
        bindKey: win: 'Right', mac: 'Right'
        exec: =>
          if (token = @activeToken()) and token.parent
            # select first sibling node
            found = false
            for t in token.parent
              if found and t.label not in ['paren', 'bracket'] and not t.isWs
                @selectToken t
                return
              if t is token
                found = true

      @editor.commands.addCommand
        name: 'previous in expression'
        bindKey: win: 'Left', mac: 'Left'
        exec: =>
          if (token = @activeToken()) and token.parent
            # select first sibling node
            found = false
            for t in token.parent by -1
              if found and t.label not in ['paren', 'bracket'] and not t.isWs
                @selectToken t
                return
              if t is token
                found = true

      @editor.commands.addCommand
        name: 'add new sibling expression'
        bindKey: win: 'Space', mac: 'Space'
        exec: =>
          if (token = @activeToken()) and token.parent
            @deselect()
            @unhighlightActive()

          @editor.insert ' '

      @editor.commands.addCommand
        name: 'add new sibling expression on new line'
        bindKey: win: 'Enter', mac: 'Enter'
        exec: =>
          if (token = @activeToken()) and token.parent
            @deselect()
            @unhighlightActive()

          @editor.insert '\n'

      @editor.commands.addCommand
        name: 'remove token and preceding whitespace or delete a character'
        bindKey: win: 'Backspace', mac: 'Backspace'
        exec: =>
          token = @expressionBeforeCursor()
          if @editor.selection.token
            @deselect()
            if token.parent
              found = false
              for t in token.parent by -1
                if found
                  if t.isWs
                    @editor.session.doc.remove @tokenToRange t
                  else
                    #@selectToken @expressionBeforeCursor()
                    break
                if t is token
                  found = true
                  @editor.session.doc.remove @tokenToRange t
          else if @editor.selection.activeToken
            {end} = @tokenToRange @editor.selection.activeToken
            butOne = row: end.row, column: end.column - 1
            @editor.session.doc.remove Range.fromPoints butOne, end

  deselect: =>
    @editor.selection.clearSelection()
    @editor.selection.token = undefined
    @editor.selection.activeToken = undefined

  expressionBeforeCursor: =>
    @getExpression @tokenBeforeCursor()

  tokenBeforeCursor: =>
    pos = @editor.getCursorPosition()
    @getTokenAt pos.row, pos.column

  expressionAt: (row, col) ->
    @getExpression @getTokenAt row, col

  getExpression: (token) ->
    if token.isWs or token.label in ['paren', 'bracket']
      token.parent
    else
      token

  getTokenAt: (row, col) ->
    {tokens} = @$tokenizer.getLineTokens "", "", row, @editor.session.doc
    c = 0
    for token, i in tokens
      c += token.value.length
      if c >= col
        return token

  handleClick: (event) =>
    if event.getShiftKey()
      @editor.session.selection.clearSelection()
      return
    token = @expressionBeforeCursor()

    # select clicked word or its parent
    @selectToken token

  selectToken: (token) ->
    @editor.selection.setSelectionRange @tokenToRange token
    @editor.selection.token = token
    @unhighlightActive()

  tokenToRange: (token) ->
    start = @editor.session.doc.indexToPosition token.pos
    end = @editor.session.doc.indexToPosition token.pos + token.size
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
