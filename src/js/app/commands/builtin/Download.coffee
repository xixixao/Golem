saveAs = require 'file-saver'

class DownloadSourceCommand
  @defaultSymbols = ['download']
  @description = 'Download current code as a file.'
  @symbols = @defaultSymbols

  @execute = (_, state, editor) ->
    fileContent = state.mode.editor.getValue()
    fileName = "#{state.module.moduleName}.shem"
    saveAs (new Blob [fileContent]), fileName

module.exports = [DownloadSourceCommand]
