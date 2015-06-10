Emitter = require 'tinyemitter'

findAll = (object, filter) ->
  found = {}
  for k, v of object when filter k, v
    found[k] = v
  found

module.exports = class Memory
  constructor: ->
    @unnamed = "@unnamed"
    @emitter = new Emitter
    @on = @emitter.on.bind(@emitter)
    @off = @emitter.off.bind(@emitter)

  # TODO: for each file, save its non-command executed commands
  saveSource: (fileName, serialized) ->
    numLines = (serialized.value.split "\n").length

    @fileTable fileName, name: fileName, numLines: numLines
    @_fileStorage fileName, serialized
    @_lastOpenFileStorage fileName
    return

  loadSource: (fileName) ->
    @_fileStorage fileName

  removeFromClient: (fileName) ->
    @_fileStorage fileName, null
    @fileTable fileName

  # fileTable holds a list of all saved files with associated data
  fileTable: (fileName, fileData) ->
    oldTable = (@_fileTableStorage()) or {}

    table = findAll oldTable, (oldFileName) -> oldFileName isnt fileName
    if fileData
      table[fileName] = fileData

    @_fileTableStorage table

  _fileTableStorage: (table) ->
    @emitter.emit 'fileTable' if table isnt undefined
    $.totalStorage "fileTableCOOKIEv4", table

  getFileTable: ->
    findAll @_fileTableStorage(), (name) =>
      name isnt @unnamed

  _fileStorage: (name, value) ->
    @emitter.emit 'file' if value isnt undefined
    $.totalStorage "GolemFile_" + name, value

  getLastOpenFileName: ->
    lastOpen = @_lastOpenFileStorage()
    (@loadSource lastOpen) and lastOpen or @unnamed

  setLastOpenFileName: (fileName) ->
    @_lastOpenFileStorage fileName

  _lastOpenFileStorage: (fileName) ->
    @emitter.emit 'lastOpen' if fileName isnt undefined
    $.totalStorage "lastOpenFileCOOKIE", fileName

  saveCommands: (timeline) ->
    @_timelineStorage timeline.newest(200)

  loadCommands: (timeline) ->
    timeline.from (@_timelineStorage()) ? []

  _timelineStorage: (value) ->
    @emitter.emit 'timeline' if value is undefined
    $.totalStorage "timelineCOOKIE", value
