define(function (require, exports, module) {
  var __filename = module.uri || "", __dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1);
  var DownloadSourceCommand, saveAs;

saveAs = require('file-saver');

DownloadSourceCommand = (function() {
  function DownloadSourceCommand() {}

  DownloadSourceCommand.defaultSymbols = ['download'];

  DownloadSourceCommand.description = 'Download current code as a file.';

  DownloadSourceCommand.symbols = DownloadSourceCommand.defaultSymbols;

  DownloadSourceCommand.execute = function(_, state, editor) {
    var fileContent, fileName;
    fileContent = state.mode.editor.getValue();
    fileName = "" + state.module.moduleName + ".shem";
    return saveAs(new Blob([fileContent]), fileName);
  };

  return DownloadSourceCommand;

})();

module.exports = [DownloadSourceCommand];

});
