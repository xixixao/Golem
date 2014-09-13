Outdent      = require("ace/mode/matching_brace_outdent").MatchingBraceOutdent
FoldMode     = require("ace/mode/folding/coffee").FoldMode
Range        = require("ace/range").Range
TextMode     = require("ace/mode/text").Mode
WorkerClient = require("ace/worker/worker_client").WorkerClient

compiler = require './compiler'

exports.Mode = class extends TextMode
  constructor: ->
    @$tokenizer = getLineTokens: (line, state, row, doc) ->
      console.log line
      try
        tokens = compiler.tokenize doc.getValue()
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
      console.log res
      res


    @$outdent = new Outdent
    @foldingRules = new FoldMode

  getNextLineIndent: (state, line, tab) ->
    indent = @$getIndent line
    lastClosed = Math.max line.lastIndexOf(')'), line.lastIndexOf(']')
    if lastClosed > -1
      open = Math.max line.indexOf('(', lastClosed), line.indexOf('[', lastClosed)
      if open isnt -1
        indent += tab
    indent

  commentLine = /^(\s*)# ?/
  hereComment = /^\s*###(?!#)/
  indentation = /^\s*/

  toggleCommentLines: (state, doc, startRow, endRow) ->
    console.log "toggle"
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
