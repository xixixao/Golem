WorkerClient = require("ace/worker/worker_client").WorkerClient
CoffeeMode = require("compilers/coffeescript/mode").Mode

module.exports = class CommandMode extends CoffeeMode
  constructor: (@sourceModePath) ->
    super

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
