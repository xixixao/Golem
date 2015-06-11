define(function (require, exports, module) {
  var __filename = module.uri || "", __dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1);
  var DistributingWorkerClient, WorkerClient,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

WorkerClient = require("ace/worker/worker_client").WorkerClient;

DistributingWorkerClient = (function(_super) {
  __extends(DistributingWorkerClient, _super);

  function DistributingWorkerClient() {
    this.onMessage = __bind(this.onMessage, this);
    return DistributingWorkerClient.__super__.constructor.apply(this, arguments);
  }

  DistributingWorkerClient.prototype.onMessage = function(e) {
    var msg;
    msg = e.data;
    if (msg.identifier) {
      return this._signal("message", {
        data: msg
      });
    } else {
      return DistributingWorkerClient.__super__.onMessage.call(this, e);
    }
  };

  return DistributingWorkerClient;

})(WorkerClient);

module.exports = DistributingWorkerClient;

});
