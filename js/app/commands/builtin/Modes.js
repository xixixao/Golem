define(function (require, exports, module) {
  var __filename = module.uri || "", __dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1);
  var KeyboardShortcutsList, ListKeyboardShortcutsCommand, ListModesCommand, ModeBrowser, SwitchModeCommand, _KeyboardShortcutsList, _ModeBrowser, _b, _code, _div, _p, _ref, _table, _tbody, _td, _tr;

_ref = require('hyper'), _div = _ref._div, _p = _ref._p, _table = _ref._table, _tbody = _ref._tbody, _tr = _ref._tr, _td = _ref._td, _code = _ref._code, _b = _ref._b;

_ModeBrowser = hyper(ModeBrowser = (function() {
  function ModeBrowser() {}

  ModeBrowser.prototype.render = function() {
    return _table(_tbody({}, this.props.modes.map((function(_this) {
      return function(_arg) {
        var id, name;
        id = _arg.id, name = _arg.name;
        return _tr({}, _td(id === _this.props.current ? '>' : void 0), _td(name));
      };
    })(this))));
  };

  return ModeBrowser;

})());

SwitchModeCommand = (function() {
  function SwitchModeCommand() {}

  SwitchModeCommand.defaultSymbols = ['mode'];

  SwitchModeCommand.description = 'Switch to a different compiler';

  SwitchModeCommand.symbols = SwitchModeCommand.defaultSymbols;

  SwitchModeCommand.execute = function(_arg, state, editor) {
    var modeId, name;
    name = _arg[0];
    modeId = state.modes.getId(name);
    if (modeId) {
      editor.refs.sourceEditor.setMode(modeId);
    } else {
      editor.log(_div({}, "Wrong mode name, choose from:", _ModeBrowser({
        modes: state.modes.getAll()
      })));
    }
    return {};
  };

  return SwitchModeCommand;

})();

ListModesCommand = (function() {
  function ListModesCommand() {}

  ListModesCommand.defaultSymbols = ['modes', 'm'];

  ListModesCommand.description = 'List all available modes';

  ListModesCommand.symbols = ListModesCommand.defaultSymbols;

  ListModesCommand.execute = function(args, state, editor) {
    return editor.log(_ModeBrowser({
      modes: state.modes.getAll(),
      current: editor.refs.sourceEditor.mode
    }));
  };

  return ListModesCommand;

})();

_KeyboardShortcutsList = hyper(KeyboardShortcutsList = (function() {
  function KeyboardShortcutsList() {}

  KeyboardShortcutsList.prototype.shouldList = function(command, name) {
    return command.bindKey && command.document !== false && /\s/.test(name);
  };

  KeyboardShortcutsList.prototype.highlight = function(name) {
    return name.replace(/([A-Z])/g, "<u>$1</u>");
  };

  KeyboardShortcutsList.prototype.shortcut = function(command) {
    var platform, _ref1;
    platform = this.props.platform;
    return ((_ref1 = command.logicalKey) != null ? _ref1[platform] : void 0) || command.bindKey[platform];
  };

  KeyboardShortcutsList.prototype.render = function() {
    var command, name;
    return _table(_tbody({}, (function() {
      var _ref1, _results;
      _ref1 = this.props.commands;
      _results = [];
      for (name in _ref1) {
        command = _ref1[name];
        if (this.shouldList(command, name)) {
          _results.push(_tr({
            key: name
          }, _td({
            style: {
              'vertical-align': 'top'
            }
          }, "" + (this.shortcut(command)) + " "), _td({
            style: {
              'vertical-align': 'top'
            },
            dangerouslySetInnerHTML: {
              __html: this.highlight(name)
            }
          })));
        }
      }
      return _results;
    }).call(this)));
  };

  return KeyboardShortcutsList;

})());

ListKeyboardShortcutsCommand = (function() {
  function ListKeyboardShortcutsCommand() {}

  ListKeyboardShortcutsCommand.defaultSymbols = ['keys'];

  ListKeyboardShortcutsCommand.description = 'List editing keyboard shortcuts';

  ListKeyboardShortcutsCommand.symbols = ListKeyboardShortcutsCommand.defaultSymbols;

  ListKeyboardShortcutsCommand.execute = function(args, state, editor) {
    return editor.log(_KeyboardShortcutsList({
      commands: state.mode.editor.commands.commands,
      platform: state.mode.editor.commands.platform
    }));
  };

  return ListKeyboardShortcutsCommand;

})();

module.exports = [ListKeyboardShortcutsCommand];

});
