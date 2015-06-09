Emitter = require 'tinyemitter'
Memory = require './Memory'
if requireNode
  fs = requireNode 'fs'
  path = requireNode 'path'
  mkdirp = requireNode 'mkdirp'

findAll = (object, filter) ->
  found = {}
  for k, v of object when filter k, v
    found[k] = v
  found

module.exports = class FileSystemMemory extends Memory
  _directory: ->
    # TODO: error if the arg does not exist
    srcPath = path.join process.env.PWD, window.GolemOpenFilePath, 'src'
    mkdirp.sync srcPath
    srcPath
    # if fs.existsSync path.join window.GolemOpenFilePath

  _countLines: (srcPath, name) ->
    (@_readFile path.join srcPath, name).split('\n').length

  fileTable: (fileName, fileData) ->
    # ignore for now

  _fileTableStorage: (table) ->
    @emitter.emit 'fileTable' if table isnt undefined
    if not table
      stats = {}
      srcPath = @_directory()
      for name in fs.readdirSync srcPath
        stats[name] = name: name, numLines: @_countLines srcPath, name
      stats
    else
      # dont delete files for now

  _fileStorage: (name, value) ->
    srcPath = @_directory()
    filePath = (path.join srcPath, name)
    @emitter.emit 'file' if value isnt undefined
    if value
      fileContent = value.value
      delete value.value
      fs.writeFileSync filePath, fileContent
      $.totalStorage "GolemFile_" + filePath, value
    else
      info = $.totalStorage "GolemFile_" + filePath
      if info
        try
          info.value = @_readFile filePath
      info

  _readFile: (path) ->
    fs.readFileSync path, encoding: 'utf8'