define(function (require, exports, module) {
  var __filename = module.uri || "", __dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1);
  var EventEmitter, ExpressionWorker, Mirror, Sender, cache, cacheModule, compiler, delay, inheritedOnMessage, oop, workers,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Mirror = require("ace/worker/mirror").Mirror;

oop = window.require("ace/lib/oop");

EventEmitter = require("ace/lib/event_emitter").EventEmitter;

compiler = require("./compiler");

window.addEventListener = function() {};

exports.Worker = (function(_super) {
  __extends(_Class, _super);

  function _Class(sender) {
    this.compile = __bind(this.compile, this);
    _Class.__super__.constructor.call(this, sender);
    this.setTimeout(20);
    this.compiler = compiler;
  }

  _Class.prototype.setModuleName = function(moduleName) {
    this.moduleName = moduleName;
  };

  _Class.prototype.compileModule = function(value, moduleName) {
    return this._compile(value, moduleName, false);
  };

  _Class.prototype.onUpdate = function() {
    return this.compile();
  };

  _Class.prototype.compile = function() {
    var value;
    value = this.doc.getValue();
    return this._compile(value, this.moduleName, true);
  };

  _Class.prototype._compile = function(value, moduleName, current) {
    var e, listening, result;
    console.log("worker: compiling " + moduleName + ", current: " + current);
    try {
      result = cacheModule(compiler.compileTopLevel, value, moduleName);
      if (result.request) {
        listening = this.sender.on('ok', (function(_this) {
          return function(requested) {
            if (requested.moduleName === result.request) {
              _this.sender.off('ok', listening);
              return _this._compile(value, moduleName, current);
            }
          };
        })(this));
        return this.sender.emit("request", {
          moduleName: result.request
        });
      } else {
        this.sender.emit("ok", {
          result: result,
          source: value
        });
        return this.sender._emit("ok", {
          moduleName: moduleName
        });
      }
    } catch (_error) {
      e = _error;
      console.log(e.stack);
      return this.sender.emit("error", {
        text: e.message,
        type: 'error',
        source: value,
        inDependency: !current
      });
    }
  };

  _Class.prototype.matchingDefinitions = function(reference, id) {
    var defs;
    defs = compiler.findMatchingDefinitions(this.moduleName, reference);
    return this.sender.callback(defs, id);
  };

  _Class.prototype.availableTypes = function(inferredType, id) {
    var types;
    types = compiler.findAvailableTypes(this.moduleName, inferredType);
    return this.sender.callback(types, id);
  };

  _Class.prototype.docsFor = function(reference, id) {
    var info;
    info = compiler.findDocsFor(this.moduleName, reference);
    return this.sender.callback(info, id);
  };

  _Class.prototype.compileBuild = function(moduleName, id) {
    var compiled;
    compiled = compiler.compileModule(moduleName);
    return this.sender.callback(compiled, id);
  };

  return _Class;

})(Mirror);

delay = function(duration) {
  var ready, reset, timeout;
  timeout = void 0;
  ready = true;
  reset = function(executed, fn) {
    return function() {
      ready = true;
      if (!executed) {
        return fn();
      }
    };
  };
  return function(fn, force) {
    var run;
    if (force == null) {
      force = false;
    }
    if (timeout != null) {
      clearTimeout(timeout);
    }
    run = ready || force;
    if (run) {
      fn();
    }
    timeout = setTimeout(reset(run, fn), duration);
    return ready = false;
  };
};

ExpressionWorker = (function(_super) {
  __extends(ExpressionWorker, _super);

  function ExpressionWorker(sender) {
    ExpressionWorker.__super__.constructor.call(this, sender);
  }

  ExpressionWorker.prototype.onUpdate = function(execute) {
    var e, value;
    value = this.doc.getValue();
    if (value[0] === ':') {
      if (execute) {
        return this.sender.emit("ok", {
          result: value.slice(1),
          commandSource: value,
          type: 'command'
        });
      }
    } else {
      try {
        console.log("expression worker compiling", this.moduleName);
        return this.sender.emit("ok", {
          type: (execute ? 'execute' : 'normal'),
          commandSource: value,
          result: this.compiler.compileExpression(value, this.moduleName)
        });
      } catch (_error) {
        e = _error;
        console.log(e.stack);
        this.sender.emit("error", {
          text: e.message,
          type: 'error',
          commandSource: value
        });
      }
    }
  };

  return ExpressionWorker;

})(exports.Worker);

cache = {};

cacheModule = function(fn, source, moduleName) {
  var old, result, _ref;
  if (((_ref = (old = cache[moduleName])) != null ? _ref.source : void 0) === source && old) {
    console.log("" + moduleName + " was cached.");
    return old.result;
  } else {
    result = fn(source, moduleName);
    if (!result.request) {
      cache[moduleName] = {
        source: source,
        result: result
      };
    }
    return result;
  }
};

Sender = (function() {
  function Sender(id) {
    this.id = id;
    oop.implement(this, EventEmitter);
  }

  Sender.prototype.callback = function(data, callbackId) {
    return postMessage({
      type: "call",
      identifier: this.id,
      id: callbackId,
      data: data
    });
  };

  Sender.prototype.emit = function(name, data) {
    return postMessage({
      type: "event",
      identifier: this.id,
      name: name,
      data: data
    });
  };

  return Sender;

})();

workers = {};

inheritedOnMessage = window.onmessage;

window.onmessage = function(e) {
  var id, main, msg, sender, worker;
  msg = e.data;
  main = window.main;
  sender = window.sender;
  id = msg.identifier;
  if (sender && id) {
    if (!(worker = workers[id])) {
      worker = workers[id] = new ExpressionWorker(new Sender(id));
    }
    if (msg.command) {
      if (worker[msg.command]) {
        return worker[msg.command].apply(worker, msg.args);
      } else {
        throw new Error("Unknown command:" + msg.command);
      }
    } else if (msg.event) {
      return worker.sender._signal(msg.event, msg.data);
    }
  } else {
    return inheritedOnMessage(e);
  }
};

});
