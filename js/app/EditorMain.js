define(function (require, exports, module) {
  var __filename = module.uri || "", __dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1);
  var CommandParser, EditorMain, History, Memory, Mode, Modes, SetIntervalMixin, TimeLine, helpDescription, hyper, jsDump, _AdjustableColumns, _CommandLine, _FillHeight, _MessageDisplay, _OutputDisplay, _SourceEditor, _div, _input, _ref,
  __slice = [].slice,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

_ref = hyper = require('hyper'), _div = _ref._div, _input = _ref._input;

jsDump = require('vendor/jsDump');

_AdjustableColumns = require('./AdjustableColumns');

SetIntervalMixin = require('./SetIntervalMixin');

_SourceEditor = require('./SourceEditor');

_CommandLine = require('./CommandLine');

_FillHeight = require('./FillHeight');

_MessageDisplay = require('./MessageDisplay');

_OutputDisplay = require('./OutputDisplay');

TimeLine = require('./UniqueTimeLine');

CommandParser = require('./CommandParser');

Modes = require('./Modes');

History = require('./History');

if (window.requireNode && window.GolemOpenFilePath) {
  Memory = require('./FileSystemMemory');
} else {
  Memory = require('./Memory');
}

Mode = require('compilers/teascript/mode').Mode;

helpDescription = "Issue commands by typing \"< \" or \":\"\nfollowed by space separated commands:\n\nerase / e      - Clear all results\nerase &lt;not...> - Don't clear results containing givens\ndump / d       - Dump generated javascript\nrun / r        - Run just the source code\ncopy / c       - Select last output (right-click to copy)\ntoggle / t     - Toggle autocompilation\nlink / l       - Create a link with current source code\nmode &lt;name>    - Switch to a different compiler\nmodes / m      - Show all available modes\ncanvas &lt;w> &lt;h> - Create a canvas given width and height\nsave &lt;name>    - Save current code locally under name\nload &lt;name>    - Load code from local storage under name\ndelete &lt;name>  - Remove code from local storage\nbrowse / b     - Show content of local storage\nhelp / h       - Show this help\n\nName with arbitrary characters (spaces) must be closed by \\\nsave Long file name.txt\\";

module.exports = hyper(EditorMain = (function() {
  function EditorMain() {}

  EditorMain.prototype.getInitialState = function() {
    var mode, _ref1;
    this.memory = new Memory;
    this.logId = 0;
    this.focus = {
      sourceEditor: 'sourceEditor',
      commandLine: 'commandLine',
      output: 'output'
    };
    this.saved = false;
    mode = new Mode(false);
    this.registerMode(mode);
    this.fileName = this.memory.getLastOpenFileName();
    return {
      mode: mode,
      module: this.loadSource(this.fileName),
      focused: this.focus.sourceEditor,
      timeline: new TimeLine,
      logs: [],
      message: {},
      sourceUpdateId: 0,
      sourceEditorHeight: 300,
      autosaveDelay: 6000,
      commands: (_ref1 = []).concat.apply(_ref1, [require('./commands/builtin/Help'), require('./commands/builtin/Output'), require('./commands/builtin/Runtime'), require('./commands/builtin/Files'), require('./commands/builtin/Modes'), require('./commands/builtin/Download'), require('./commands/builtin/Demos'), require('./commands/builtin/Intro')])
    };
  };

  EditorMain.prototype.mixins = [SetIntervalMixin];

  EditorMain.prototype.registerMode = function(mode) {
    var worker;
    worker = mode.prepareWorker();
    worker.on('ok', (function(_this) {
      return function(_arg) {
        var firstError, result, source, _ref1;
        _ref1 = _arg.data, result = _ref1.result, source = _ref1.source;
        console.log("source worker finished ok");
        if (mode.editor.getValue() === source) {
          if (result.errors) {
            console.log(result.errors);
            firstError = result.errors[0];
            _this.handleSourceFailed(firstError.message || firstError);
          } else {
            _this.handleSourceCompiled(result);
          }
          return mode.updateAst(result.ast, result.errors || []);
        }
      };
    })(this));
    worker.on('error', (function(_this) {
      return function(_arg) {
        var inDependency, source, text, _ref1;
        _ref1 = _arg.data, text = _ref1.text, source = _ref1.source, inDependency = _ref1.inDependency;
        console.log("error in source worker", text);
        if (inDependency || mode.editor.getValue() === source) {
          _this.handleSourceFailed(text);
          return mode.removeErrorMarkers();
        }
      };
    })(this));
    return worker.on('request', (function(_this) {
      return function(_arg) {
        var loaded, moduleName;
        moduleName = _arg.data.moduleName;
        console.log("source worker requesting", moduleName);
        loaded = _this.memory.loadSource(moduleName);
        if (loaded) {
          return worker.call('compileModule', [loaded.value, moduleName]);
        } else {
          return _this.handleSourceFailed("Could not find module " + moduleName);
        }
      };
    })(this));
  };

  EditorMain.prototype.save = function(fileName) {
    var nameToSave;
    if (fileName) {
      this.saved = false;
    }
    nameToSave = fileName || this.state.module.moduleName;
    if (!this.saved) {
      this.saved = true;
      this.memory.saveSource(nameToSave, this.refs.sourceEditor.serializedModule());
      return this.setState({
        module: this.loadSource(nameToSave)
      });
    }
  };

  EditorMain.prototype.load = function(fileName, mustExist) {
    var loaded;
    if (fileName !== this.state.module.name) {
      this.save();
    }
    loaded = this.loadSource(fileName, mustExist);
    if (loaded) {
      this.memory.setLastOpenFileName(fileName);
      this.setState({
        module: loaded
      });
    }
    return !!loaded;
  };

  EditorMain.prototype.loadSource = function(fileName, mustExist) {
    var serialized;
    serialized = this.memory.loadSource(fileName);
    if (mustExist && !serialized) {
      return;
    }
    if (!serialized) {
      serialized = {
        value: ''
      };
    }
    serialized.moduleName = fileName;
    return serialized;
  };

  EditorMain.prototype.empty = function() {
    return this.state.mode.setContent('');
  };

  EditorMain.prototype.displayMessage = function(type, message) {
    return this.setState({
      message: {
        type: type,
        value: message
      }
    });
  };

  EditorMain.prototype._hideMessage = function() {
    var types, _ref1;
    types = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    if (_ref1 = this.state.message.type, __indexOf.call(types, _ref1) >= 0) {
      return this.setState({
        message: {}
      });
    }
  };

  EditorMain.prototype.commandCompleter = function() {
    return this._commandCompleter || (this._commandCompleter = {
      getCompletions: (function(_this) {
        return function(editor, session, pos, prefix, callback) {
          var args, autocomplete, name, _ref1, _ref2;
          _ref1 = CommandParser(editor.getValue().slice(1)), name = _ref1[0], args = _ref1[1];
          autocomplete = (_ref2 = _this.commandNamed(name)) != null ? _ref2.autocomplete : void 0;
          if (autocomplete) {
            return autocomplete(args, _this.state, _this, callback);
          } else {
            return callback(null, []);
          }
        };
      })(this)
    });
  };

  EditorMain.prototype.handleSourceCompiled = function(_arg) {
    var js;
    js = _arg.js;
    this._hideMessage('compiler', 'runtime');
    return this.setState({
      compiledJs: js,
      sourceUpdateId: this.state.sourceUpdateId + 1
    });
  };

  EditorMain.prototype.handleSourceFailed = function(text) {
    return this.displayMessage('compiler', "Compiler: " + text);
  };

  EditorMain.prototype.handleSourceChange = function() {
    return this.saved = false;
  };

  EditorMain.prototype.execute = function(code) {
    var error, _base;
    try {
      if (typeof (_base = this.state.compiler).preExecute === "function") {
        _base.preExecute(this.memory);
      }
      return eval(code);
    } catch (_error) {
      error = _error;
      this.displayMessage('runtime', "Runtime: " + error);
      return error;
    }
  };

  EditorMain.prototype._executeCommand = function(command, args) {
    return command.execute(args, this.state, this);
  };

  EditorMain.prototype._bindCommands = function() {
    var command, commandMap, symbol, _i, _j, _len, _len1, _ref1, _ref2;
    commandMap = {};
    _ref1 = this.state.commands;
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      command = _ref1[_i];
      _ref2 = command.symbols;
      for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
        symbol = _ref2[_j];
        commandMap[symbol] = command;
      }
    }
    return this.setState({
      commandMap: commandMap
    });
  };

  EditorMain.prototype.executeCommand = function() {
    var args, command, name;
    name = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
    command = this.commandNamed(name);
    if (!command) {
      return this.displayMessage('command', "Command Line: " + name + " is not a command");
    } else {
      return this._executeCommand(command, args);
    }
  };

  EditorMain.prototype.commandNamed = function(name) {
    return this.state.commandMap[name];
  };

  EditorMain.prototype.handleCommandExecution = function(source, moduleName, result, type) {
    var args, symbol, _ref1;
    this._hideMessage('command', 'runtime');
    if (type === 'command') {
      _ref1 = CommandParser(result), symbol = _ref1[0], args = _ref1[1];
      return this.executeCommand.apply(this, [symbol].concat(__slice.call(args)));
    } else {
      return this.log({
        source: source,
        moduleName: moduleName,
        ast: result.ast,
        compiled: result.js
      });
    }
  };

  EditorMain.prototype.handleCommandCompiled = function() {
    return this._hideMessage('command', 'runtime');
  };

  EditorMain.prototype.handleCommandFailed = function(text) {
    return this.displayMessage('command', "Command Line: " + text);
  };

  EditorMain.prototype.handleFocus = function(to) {
    return (function(_this) {
      return function(index) {
        return _this.setState({
          focused: to,
          focusedOutputIndex: index
        });
      };
    })(this);
  };

  EditorMain.prototype.componentWillMount = function() {
    window.addEventListener('unload', (function(_this) {
      return function() {
        return _this.save();
      };
    })(this));
    this.setInterval(this.save, this.state.autosaveDelay);
    return this._bindCommands();
  };

  EditorMain.prototype.componentDidMount = function() {
    if (this.state.timeline.size() < 10) {
      this._executeCommand(this.state.commandMap.help);
    }
    this._executeCommand(this.state.commandMap['load-demos']);
    return window.log = this.logResult;
  };

  EditorMain.prototype.logResult = function(input) {
    return this.log(input);
  };

  EditorMain.prototype.log = function(input) {
    return this.setState({
      logs: [["log" + (this.logId++), input]].concat(this.state.logs)
    });
  };

  EditorMain.prototype.handleOutputDelete = function(id) {
    if (this.state.logs.length === 1) {
      this.handleFocus(this.focus.commandLine)();
    }
    return this.setState({
      logs: this.state.logs.filter(function(_arg) {
        var someId;
        someId = _arg[0];
        return someId !== id;
      })
    });
  };

  EditorMain.prototype.handleExpressionCommand = function(name, editor) {
    return this.state.mode.editor.execCommand(name, {
      targetEditor: editor
    });
  };

  EditorMain.prototype.handleColumnsResize = function() {
    return this.refs.sourceEditor.forceResize();
  };

  EditorMain.prototype.handleHeightResize = function(height) {
    return this.setState({
      sourceEditorHeight: height
    });
  };

  EditorMain.prototype.render = function() {
    var dividerWidth, leftColumnWidth, windowWidth;
    windowWidth = Math.floor(window.innerWidth);
    dividerWidth = 20;
    leftColumnWidth = (windowWidth - dividerWidth) / 2;
    return _AdjustableColumns({
      leftColumnWidth: leftColumnWidth,
      dividerWidth: dividerWidth,
      onResize: this.handleColumnsResize
    }, _FillHeight({
      onResize: this.handleHeightResize
    }, _CommandLine({
      ref: 'commandLine',
      worker: this.state.mode.worker,
      completers: [this.state.mode.completer, this.commandCompleter()],
      moduleName: this.state.module.moduleName,
      onCommandExecution: this.handleCommandExecution,
      onCommandCompiled: this.handleCommandCompiled,
      onCommandFailed: this.handleCommandFailed,
      onLeave: this.handleFocus(this.focus.sourceEditor),
      onFocus: this.handleFocus(this.focus.commandLine),
      onFocusOutput: this.handleFocus(this.focus.output),
      focus: this.state.focused === this.focus.commandLine,
      timeline: this.state.timeline,
      memory: this.memory,
      updatedSource: this.state.sourceUpdateId
    }), _MessageDisplay({
      ref: 'message',
      message: this.state.message
    }), _SourceEditor({
      ref: 'sourceEditor',
      mode: this.state.mode,
      module: this.state.module,
      onChange: this.handleSourceChange,
      onLeave: this.handleFocus(this.focus.commandLine),
      onFocus: this.handleFocus(this.focus.sourceEditor),
      focus: this.state.focused === this.focus.sourceEditor,
      height: this.state.sourceEditorHeight
    })), '', _OutputDisplay({
      logs: this.state.logs,
      updatedSource: this.state.sourceUpdateId,
      worker: this.state.mode.worker,
      completers: [this.state.mode.completer],
      onCommand: this.handleExpressionCommand,
      focus: this.state.focused === this.focus.output,
      focusedOutputIndex: this.state.focusedOutputIndex,
      onDelete: this.handleOutputDelete,
      onFocusOutput: this.handleFocus(this.focus.output),
      onRemoveFocus: this.handleFocus(null)
    }));
  };

  return EditorMain;

})());

hyper.render(document.getElementById('editor'), module.exports());

});
