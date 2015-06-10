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
      for fileName in fs.readdirSync srcPath
        ext = path.extname fileName
        if ext[1...] is 'shem'
          name = path.basename fileName, ext
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
      @_writeFile filePath, fileContent
      $.totalStorage "GolemFile_" + filePath, value
    else
      info = $.totalStorage "GolemFile_" + filePath
      if info
        try
          info.value = @_readFile filePath
      info

  _writeFile: (path, content) ->
    fs.writeFileSync "#{path}.shem", content

  _readFile: (path) ->
    fs.readFileSync "#{path}.shem", encoding: 'utf8'

  writeBuilt: (js) ->
    srcPath = @_directory()
    fs.writeFileSync (path.join srcPath, '..', 'index.js'), js
