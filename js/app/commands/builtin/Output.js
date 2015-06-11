define(function (require, exports, module) {
  var __filename = module.uri || "", __dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1);
  var EraseCommand;

EraseCommand = (function() {
  function EraseCommand() {}

  EraseCommand.defaultSymbols = ['erase', 'e'];

  EraseCommand.description = 'Clear all results';

  EraseCommand.symbols = EraseCommand.defaultSymbols;

  EraseCommand.execute = function(args, state, editor) {
    return editor.setState({
      logs: []
    });
  };

  return EraseCommand;

})();

module.exports = [EraseCommand];

});
