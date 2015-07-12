define(function (require, exports, module) {
  var __filename = module.uri || "", __dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1);
  var HelpCommand, _code, _div, _p, _ref, _table, _td, _tr;

_ref = require('hyper'), _div = _ref._div, _p = _ref._p, _table = _ref._table, _tr = _ref._tr, _td = _ref._td, _code = _ref._code;

HelpCommand = (function() {
  function HelpCommand() {}

  HelpCommand.defaultSymbols = ['help', 'h'];

  HelpCommand.description = 'Show the list of available commands';

  HelpCommand.symbols = HelpCommand.defaultSymbols;

  HelpCommand.execute = function(args, state, editor) {
    var command, header, symbol, table;
    header = _div({}, "Issue commands by typing", _code(' : '), "followed by command name and space separated arguments");
    table = _table({}, (function() {
      var _i, _len, _ref1, _results;
      _ref1 = state.commands;
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        command = _ref1[_i];
        _results.push(_tr({}, _td([].concat((function() {
          var _j, _len1, _ref2, _results1;
          _ref2 = command.symbols;
          _results1 = [];
          for (_j = 0, _len1 = _ref2.length; _j < _len1; _j++) {
            symbol = _ref2[_j];
            _results1.push([_code(symbol), ' ']);
          }
          return _results1;
        })())), _td(command.description)));
      }
      return _results;
    })());
    return editor.log(_div(header, table));
  };

  return HelpCommand;

})();

module.exports = [HelpCommand];

});
