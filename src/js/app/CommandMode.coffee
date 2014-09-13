WorkerClient = require("ace/worker/worker_client").WorkerClient

module.exports =
  inherit: (Mode) ->

    class CommandMode extends Mode

      constructor: (@sourceModePath) ->
        super yes

      createWorker: (session) ->
        @worker = new WorkerClient ["ace", "compilers", "app", "vendor", "coffee-script"],
          "app/CommandWorker",
          "Worker",
          null,
          "#{@sourceModePath}/worker"

        @doc = session.getDocument()

        @worker

      updateWorker: ->
        @worker.call 'setValue', [@doc.getValue()]
        @worker.call 'onUpdate', []
