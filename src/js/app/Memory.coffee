module.exports = class Memory
  # TODO: for each file, save its non-command executed commands
  saveSource: (fileName, serialized) ->
    numLines = (serialized.value.split "\n").length

    console.log "saving #{fileName}"

    @fileTable fileName, numLines: numLines
    @_fileStorage fileName, serialized
    @_lastOpenFileStorage fileName
    return

  loadSource: (fileName) ->
    console.log "loading #{fileName}"

    out = @_fileStorage fileName
    console.log out
    out

  saveCommands: (timeline) ->
    @_timelineStorage timeline.newest(200)

  loadCommands: (timeline) ->
    timeline.from (@_timelineStorage()) ? []

  _timelineStorage: (value) ->
    $.totalStorage "timelineCOOKIE", value

  removeFromClient: (fileName) ->
    @_fileStorage fileName, null
    @fileTable fileName

  # fileTable holds a list of all saved files with associated data
  fileTable: (fileName, fileData) ->
    oldTable = (@_fileTableStorage()) or {}

    table = {}
    for oldfileName, oldfileData of oldTable when oldfileName isnt fileName
      table[oldfileName] = oldfileData
    # table = _.filter oldTable, (oldFileName) -> oldFileName isnt fileName

    table[fileName] = fileData if fileData
    @_fileTableStorage table

  _fileTableStorage: (table) ->
    $.totalStorage "fileTableCOOKIE", table

  _fileStorage: (name, value) ->
    $.totalStorage "TeaTableFile_" + name, value

  _lastOpenFileStorage: (fileName) ->
    $.totalStorage "lastOpenFileCOOKIE", fileName

  getLastOpenFileName: ->
    @_lastOpenFileStorage() || UNNAMED_CODE

UNNAMED_CODE = "@unnamed"
