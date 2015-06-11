define(function (require, exports, module) {
  var __filename = module.uri || "", __dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1);
  var AdaptingWorkerClient, WorkerClient,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

WorkerClient = require("ace/worker/worker_client").WorkerClient;

AdaptingWorkerClient = (function(_super) {
  __extends(AdaptingWorkerClient, _super);

  function AdaptingWorkerClient(workerClient, id) {
    this.workerClient = workerClient;
    this.id = id;
    this.$sendDeltaQueue = this.$sendDeltaQueue.bind(this);
    this.changeListener = this.changeListener.bind(this);
    this.onMessage = this.onMessage.bind(this);
    this.workerClient.on("message", (function(_this) {
      return function(e) {
        if (e.data.identifier === _this.id) {
          return _this.onMessage(e);
        }
      };
    })(this));
    this.callbackId = 1;
    this.callbacks = {};
  }

  AdaptingWorkerClient.prototype.send = function(cmd, args) {
    return this.workerClient.$worker.postMessage({
      command: cmd,
      identifier: this.id,
      args: args
    });
  };

  AdaptingWorkerClient.prototype.emit = function(event, data) {
    return this.workerClient.$worker.postMessage({
      event: event,
      identifier: this.id,
      data: {
        data: data.data
      }
    });
  };

  return AdaptingWorkerClient;

})(WorkerClient);

module.exports = AdaptingWorkerClient;

});
