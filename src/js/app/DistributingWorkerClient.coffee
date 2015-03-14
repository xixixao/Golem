WorkerClient = require("ace/worker/worker_client").WorkerClient

# Distributes received messages from the worker
class DistributingWorkerClient extends WorkerClient
  onMessage: (e) =>
    msg = e.data
    if msg.identifier
      this._signal("message", {data: msg})
    else
      super e

module.exports = DistributingWorkerClient
