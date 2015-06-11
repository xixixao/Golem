define(function (require, exports, module) {
  var __filename = module.uri || "", __dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1);
  var Emitter, FileSystemMemory, Memory, findAll, fs, mkdirp, path,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Emitter = require('tinyemitter');

Memory = require('./Memory');

if (requireNode) {
  fs = requireNode('fs');
  path = requireNode('path');
  mkdirp = requireNode('mkdirp');
}

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

module.exports = FileSystemMemory = (function(_super) {
  __extends(FileSystemMemory, _super);

  function FileSystemMemory() {
    return FileSystemMemory.__super__.constructor.apply(this, arguments);
  }

  FileSystemMemory.prototype._directory = function() {
    var srcPath;
    srcPath = path.join(process.env.PWD, window.GolemOpenFilePath, 'src');
    mkdirp.sync(srcPath);
    return srcPath;
  };

  FileSystemMemory.prototype._countLines = function(srcPath, name) {
    return (this._readFile(path.join(srcPath, name))).split('\n').length;
  };

  FileSystemMemory.prototype.fileTable = function(fileName, fileData) {};

  FileSystemMemory.prototype._fileTableStorage = function(table) {
    var ext, fileName, name, srcPath, stats, _i, _len, _ref;
    if (table !== void 0) {
      this.emitter.emit('fileTable');
    }
    if (!table) {
      stats = {};
      srcPath = this._directory();
      _ref = fs.readdirSync(srcPath);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        fileName = _ref[_i];
        ext = path.extname(fileName);
        if (ext.slice(1) === 'shem') {
          name = path.basename(fileName, ext);
          stats[name] = {
            name: name,
            numLines: this._countLines(srcPath, name)
          };
        }
      }
      return stats;
    } else {

    }
  };

  FileSystemMemory.prototype._fileStorage = function(name, value) {
    var fileContent, filePath, info, srcPath;
    srcPath = this._directory();
    filePath = path.join(srcPath, name);
    if (value !== void 0) {
      this.emitter.emit('file');
    }
    if (value) {
      fileContent = value.value;
      delete value.value;
      this._writeFile(filePath, fileContent);
      return $.totalStorage("GolemFile_" + filePath, value);
    } else {
      info = $.totalStorage("GolemFile_" + filePath);
      if (info) {
        try {
          info.value = this._readFile(filePath);
        } catch (_error) {}
      }
      return info;
    }
  };

  FileSystemMemory.prototype._writeFile = function(path, content) {
    return fs.writeFileSync("" + path + ".shem", content);
  };

  FileSystemMemory.prototype._readFile = function(path) {
    return fs.readFileSync("" + path + ".shem", {
      encoding: 'utf8'
    });
  };

  FileSystemMemory.prototype.writeBuilt = function(js) {
    var srcPath;
    srcPath = this._directory();
    return fs.writeFileSync(path.join(srcPath, '..', 'index.js'), js);
  };

  return FileSystemMemory;

})(Memory);

});
