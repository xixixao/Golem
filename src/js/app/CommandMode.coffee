WorkerClient = require("ace/worker/worker_client").WorkerClient

module.exports =
  inherit: (Mode) ->

    class CommandMode extends Mode

      constructor: (@sourceModePath) ->
        super yes

        superTokenizer = @$tokenizer

        @$tokenizer = getLineTokens: (line, state, row, doc) =>
          if line[0] isnt ':'
            superTokenizer.getLineTokens line, state, row, doc
          else
            tokens: [value: line, type: 'text']

      createWorker: (session) ->
        @worker = new WorkerClient ["ace", "compilers", "app", "vendor"],
          "app/CommandWorker",
          "Worker",
          null,
          "#{@sourceModePath}/worker"

        @doc = session.getDocument()

        @worker

      updateWorker: ->
        @worker.call 'setValue', [@doc.getValue()]
        @worker.call 'onUpdate', []
