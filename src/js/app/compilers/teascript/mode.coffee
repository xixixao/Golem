Outdent      = require("ace/mode/matching_brace_outdent").MatchingBraceOutdent
FoldMode     = require("ace/mode/folding/coffee").FoldMode
Range        = require("ace/range").Range
TextMode     = require("ace/mode/text").Mode
Behaviour    = require("ace/mode/behaviour").Behaviour
WorkerClient = require("ace/worker/worker_client").WorkerClient

compiler = require './compiler'

class TeaScriptBehaviour extends Behaviour

  handleInsertion = (open, close) ->
    (state, action, editor, session, text) ->
      if text is open
        selection = editor.getSelectionRange()
        selected = session.doc.getTextRange(selection)
        if selected isnt "" and editor.getWrapBehavioursEnabled()
          text: open + selected + close
          selection: [1, 1 + selected.length]
        else
          text: open + close
          selection: [1, 1]

  constructor: ->

    @add "parens", "insertion", handleInsertion "(", ")"

    @add "brackets", "insertion", handleInsertion "[", "]"

    @add "quotes", "insertion", (state, action, editor, session, text) ->
      if text is "\""
        initContext editor
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
        initContext editor
        line = session.doc.getLine(range.start.row)
        rightChar = line.substring(range.start.column + 1, range.start.column + 2)
        if rightChar is selected
          range.end.column++
          range

    return

exports.Mode = class extends TextMode
  constructor: (isNotSource)->
    if isNotSource
      tokenizingFunction = compiler.tokenizeExp
    else
      tokenizingFunction = compiler.tokenize

    @$tokenizer = getLineTokens: (line, state, row, doc) ->
      try
        tokens = tokenizingFunction doc.getValue()
      catch
        return tokens: [value: line, type: 'text']
      start = doc.positionToIndex {row, column: 0}
      end = doc.positionToIndex {row: row + 1, column: 0}

      allTokens = [].concat.apply [], tokens.map (token) ->
        {ws, pos} = token
        createdTokens = []
        wsTokens = ws.split '\n'
        for wsToken, i in wsTokens
          if i isnt 0
            pos += 1 # for the new line character
          createdTokens.push {token: wsToken, pos}
          pos += wsToken.length
        token.pos = pos
        createdTokens.push token
        createdTokens

      res = tokens:
        allTokens.filter ({pos}) -> start <= pos < end
          .map ({token, label}) ->
            value: token
            type: if label then 'token_' + label else 'text'
      # console.log res
      res


    @$outdent = new Outdent
    @foldingRules = new FoldMode
    @$behaviour = new TeaScriptBehaviour

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

  attachToSession: (session) ->
    editor = session.editor
    editor.on 'click', (e) ->
      console.log e

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
