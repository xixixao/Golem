WorkerClient = require("ace/worker/worker_client").WorkerClient

# Wraps another WorkerClient to share the same worker
class AdaptingWorkerClient extends WorkerClient
  constructor: (@workerClient, @id) ->
    this.$sendDeltaQueue = this.$sendDeltaQueue.bind(this);
    this.changeListener = this.changeListener.bind(this);
    this.onMessage = this.onMessage.bind(this);

    # Funnels messages with our id to the standard WorkerClient handler
    @workerClient.on "message", (e) =>
      if e.data.identifier is @id
        console.log "propagating message", e
        @onMessage e

    this.callbackId = 1;
    this.callbacks = {};

  # Adds the identifier of the source to the message to the wrapped worker
  send: (cmd, args) ->
    console.log "sending tagged message", cmd, @id
    @workerClient.$worker.postMessage({command: cmd, identifier: @id,  args: args})

  emit: (event, data) ->
    @workerClient.$worker.postMessage({event: event, identifier: @id, data: {data: data.data}})

module.exports = AdaptingWorkerClient
