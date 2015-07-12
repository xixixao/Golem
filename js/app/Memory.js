define(function (require, exports, module) {
  var __filename = module.uri || "", __dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1);
  var Emitter, Memory, findAll;

Emitter = require('tinyemitter');

findAll = function(object, filter) {
  var found, k, v;
  found = {};
  for (k in object) {
    v = object[k];
    if (filter(k, v)) {
      found[k] = v;
    }
  }
  return found;
};

module.exports = Memory = (function() {
  function Memory() {
    this.unnamed = "@unnamed";
    this.emitter = new Emitter;
    this.on = this.emitter.on.bind(this.emitter);
    this.off = this.emitter.off.bind(this.emitter);
  }

  Memory.prototype.saveSource = function(fileName, serialized) {
    var numLines;
    numLines = (serialized.value.split("\n")).length;
    this.fileTable(fileName, {
      name: fileName,
      numLines: numLines
    });
    this._fileStorage(fileName, serialized);
    this._lastOpenFileStorage(fileName);
  };

  Memory.prototype.loadSource = function(fileName) {
    return this._fileStorage(fileName);
  };

  Memory.prototype.removeFromClient = function(fileName) {
    this._fileStorage(fileName, null);
    return this.fileTable(fileName);
  };

  Memory.prototype.fileTable = function(fileName, fileData) {
    var oldTable, table;
    oldTable = (this._fileTableStorage()) || {};
    table = findAll(oldTable, function(oldFileName) {
      return oldFileName !== fileName;
    });
    if (fileData) {
      table[fileName] = fileData;
    }
    return this._fileTableStorage(table);
  };

  Memory.prototype._fileTableStorage = function(table) {
    if (table !== void 0) {
      this.emitter.emit('fileTable');
    }
    return $.totalStorage("fileTableCOOKIEv4", table);
  };

  Memory.prototype.getFileTable = function() {
    return findAll(this._fileTableStorage(), (function(_this) {
      return function(name) {
        return name !== _this.unnamed;
      };
    })(this));
  };

  Memory.prototype._fileStorage = function(name, value) {
    if (value !== void 0) {
      this.emitter.emit('file');
    }
    return $.totalStorage("GolemFile_" + name, value);
  };

  Memory.prototype.getLastOpenFileName = function() {
    var lastOpen;
    lastOpen = this._lastOpenFileStorage();
    return (this.loadSource(lastOpen)) && lastOpen || this.unnamed;
  };

  Memory.prototype.setLastOpenFileName = function(fileName) {
    return this._lastOpenFileStorage(fileName);
  };

  Memory.prototype._lastOpenFileStorage = function(fileName) {
    if (fileName !== void 0) {
      this.emitter.emit('lastOpen');
    }
    return $.totalStorage("lastOpenFileCOOKIE", fileName);
  };

  Memory.prototype.saveCommands = function(timeline) {
    return this._timelineStorage(timeline.newest(200));
  };

  Memory.prototype.loadCommands = function(timeline) {
    var _ref;
    return timeline.from((_ref = this._timelineStorage()) != null ? _ref : []);
  };

  Memory.prototype._timelineStorage = function(value) {
    if (value === void 0) {
      this.emitter.emit('timeline');
    }
    return $.totalStorage("timelineCOOKIE", value);
  };

  return Memory;

})();

});
