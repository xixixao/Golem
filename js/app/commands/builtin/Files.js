define(function (require, exports, module) {
  var __filename = module.uri || "", __dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1);
  var BrowseCommand, CloseCommand, DeleteCommand, FileBrowser, LoadCommand, RenameCommand, SaveCommand, fileAutocomplete, sortBy, _FileBrowser, _code, _div, _p, _ref, _table, _tbody, _td, _th, _tr;

_ref = require('hyper'), _div = _ref._div, _p = _ref._p, _table = _ref._table, _tbody = _ref._tbody, _tr = _ref._tr, _th = _ref._th, _td = _ref._td, _code = _ref._code;

sortBy = function(array, property) {
  return array.slice().sort(function(a, b) {
    if (a[property] > b[property]) {
      return 1;
    } else if (a[property] < b[property]) {
      return -1;
    } else {
      return 0;
    }
  });
};

fileAutocomplete = function(includeCurrent) {
  return function(args, state, editor, callback) {
    var current, files, key, name, numLines;
    return callback(null, args.length <= 1 ? (current = editor.memory.getLastOpenFileName(), files = editor.memory.getFileTable(), ((function() {
      var _ref1, _results;
      _results = [];
      for (key in files) {
        _ref1 = files[key], name = _ref1.name, numLines = _ref1.numLines;
        if (includeCurrent || name !== current) {
          _results.push({
            name: name,
            value: name,
            meta: "" + numLines
          });
        }
      }
      return _results;
    })()).reverse()) : []);
  };
};

SaveCommand = (function() {
  function SaveCommand() {}

  SaveCommand.defaultSymbols = ['save'];

  SaveCommand.description = 'Save current code locally under name.';

  SaveCommand.symbols = SaveCommand.defaultSymbols;

  SaveCommand.execute = function(_arg, state, editor) {
    var name;
    name = _arg[0];
    editor.displayMessage('file', "" + name + " saved.");
    return editor.save(name);
  };

  return SaveCommand;

})();

LoadCommand = (function() {
  function LoadCommand() {}

  LoadCommand.defaultSymbols = ['load', 'l'];

  LoadCommand.description = 'Load code from local storage under name.';

  LoadCommand.symbols = LoadCommand.defaultSymbols;

  LoadCommand.autocomplete = fileAutocomplete(false);

  LoadCommand.execute = function(_arg, state, editor) {
    var loaded, name;
    name = _arg[0];
    loaded = editor.load(name, true);
    if (loaded) {
      return editor.displayMessage('file', "" + name + " loaded.");
    } else {
      return editor.displayMessage('file', "There is no " + name + ".");
    }
  };

  return LoadCommand;

})();

RenameCommand = (function() {
  function RenameCommand() {}

  RenameCommand.defaultSymbols = ['rename'];

  RenameCommand.description = 'Rename code under some name to a different name.';

  RenameCommand.symbols = RenameCommand.defaultSymbols;

  RenameCommand.autocomplete = fileAutocomplete(true);

  RenameCommand.execute = function(_arg, state, editor) {
    var fromName, loaded, toName;
    fromName = _arg[0], toName = _arg[1];
    loaded = editor.load(fromName, true);
    if (!loaded) {
      editor.displayMessage('file', "There is no " + name + ".");
      return;
    }
    editor.save(toName);
    editor.memory.removeFromClient(fromName);
    editor.displayMessage('file', "" + fromName + " renamed to " + toName + ".");
    return editor.save(name);
  };

  return RenameCommand;

})();

DeleteCommand = (function() {
  function DeleteCommand() {}

  DeleteCommand.defaultSymbols = ['delete'];

  DeleteCommand.description = 'Remove code from local storage';

  DeleteCommand.symbols = DeleteCommand.defaultSymbols;

  DeleteCommand.autocomplete = fileAutocomplete(true);

  DeleteCommand.execute = function(_arg, state, editor) {
    var name;
    name = _arg[0];
    editor.displayMessage('file', "" + name + " deleted.");
    editor.memory.removeFromClient(name);
    return {};
  };

  return DeleteCommand;

})();

CloseCommand = (function() {
  function CloseCommand() {}

  CloseCommand.defaultSymbols = ['close'];

  CloseCommand.description = 'Stops saving under current name.';

  CloseCommand.symbols = CloseCommand.defaultSymbols;

  CloseCommand.execute = function(_arg, state, editor) {
    var name;
    name = _arg[0];
    editor.displayMessage('file', "File closed.");
    editor.load("@unnamed");
    return {};
  };

  return CloseCommand;

})();

_FileBrowser = hyper(FileBrowser = (function() {
  function FileBrowser() {}

  FileBrowser.prototype.handleClick = function(name) {
    return (function(_this) {
      return function(event) {
        return _this.props.editor.executeCommand('load', name);
      };
    })(this);
  };

  FileBrowser.prototype.handleChange = function() {
    return this.setState({
      data: this.props.memory.getFileTable(),
      fileName: this.props.memory.getLastOpenFileName()
    });
  };

  FileBrowser.prototype.componentWillMount = function() {
    return this.handleChange();
  };

  FileBrowser.prototype.componentDidMount = function() {
    this.props.memory.on('fileTable', this.handleChange);
    return this.props.memory.on('lastOpen', this.handleChange);
  };

  FileBrowser.prototype.componentWillUnmount = function() {
    this.props.memory.off('fileTable', this.handleChange);
    return this.props.memory.off('lastOpen', this.handleChange);
  };

  FileBrowser.prototype.render = function() {
    var data, file, name, numLines, _;
    data = sortBy((function() {
      var _ref1, _results;
      _ref1 = this.state.data;
      _results = [];
      for (_ in _ref1) {
        file = _ref1[_];
        _results.push(file);
      }
      return _results;
    }).call(this), 'name');
    if (data.length === 0) {
      return _div("No files found");
    } else {
      return _table(_tbody({}, _tr(_th(), _th('Name'), _th('Lines')), (function() {
        var _i, _len, _ref1, _results;
        _results = [];
        for (_i = 0, _len = data.length; _i < _len; _i++) {
          _ref1 = data[_i], name = _ref1.name, numLines = _ref1.numLines;
          _results.push(_tr({
            key: name,
            className: 'colorHighlightHover',
            onClick: this.handleClick(name),
            style: {
              cursor: 'pointer'
            }
          }, _td(name === this.state.fileName ? '>' : void 0), _td("" + name + " "), _td(numLines)));
        }
        return _results;
      }).call(this)));
    }
  };

  return FileBrowser;

})());

BrowseCommand = (function() {
  function BrowseCommand() {}

  BrowseCommand.defaultSymbols = ['browse', 'b'];

  BrowseCommand.description = 'Show content of local storage';

  BrowseCommand.symbols = BrowseCommand.defaultSymbols;

  BrowseCommand.execute = function(args, state, editor) {
    return editor.log(_FileBrowser({
      editor: editor,
      memory: editor.memory
    }));
  };

  return BrowseCommand;

})();

module.exports = [SaveCommand, LoadCommand, RenameCommand, DeleteCommand, BrowseCommand, CloseCommand];

});
