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
  constructor: ->
    super
    # TODO: remove this and open last opened instead, by preserving IDE state in a file if there are no args
    # TODO: error if the arg does not exist
    @openPath = path.join process.env.PWD, window.GolemOpenFilePath
    @setSingleFile()

  _directory: ->
    if not fs.existsSync @openPath
      if not @singleFile
        mkdirp.sync srcPath
    if @singleFile
      path.dirname @openPath
    else
      @openPath

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
        if not @singleFile or (path.join srcPath, fileName) is @openPath
          ext = path.extname fileName
          # TODO: load all files in directories, recursively, but don't compile them
          if ext[1...] is 'shem'
            name = path.basename fileName, ext
            stats[name] = name: name, numLines: @_countLines srcPath, name
      stats
    else
      # dont delete files for now

  _fileStorage: (name, savedInfo) ->
    srcPath = @_directory()
    filePath = (path.join srcPath, name)
    @emitter.emit 'file' if savedInfo isnt undefined
    if savedInfo
      fileContent = savedInfo.value
      delete savedInfo.value
      @_writeFile filePath, fileContent if name isnt @unnamed
      $.totalStorage "GolemFile_" + filePath, savedInfo
    else
      info = $.totalStorage "GolemFile_" + filePath
      try
        value = @_readFile filePath
      catch
        return null
      if not info
        info =
          mode: 'teascript'
        $.totalStorage "GolemFile_" + filePath, info
      info.value = value
      info

  _writeFile: (path, content) ->
    fs.writeFileSync "#{path}.shem", content

  _readFile: (path) ->
    fs.readFileSync "#{path}.shem", encoding: 'utf8'

  # TODO: this is dangerous, replace with Save as... or similar
  writeBuilt: (js) ->
    srcPath = @_directory()
    fs.writeFileSync (path.join srcPath, '..', 'index.js'), js

  setSingleFile: ->
    stats = fs.statSync @openPath
    @singleFile = not stats.isDirectory()

  reload: (filepath) ->
    @openPath = filepath
    @setSingleFile()
    @emitter.emit 'fileTable'
    fileName =
      if @singleFile
        filepath
      else
        (fs.readdirSync filepath)[0]
    if fileName
      path.basename fileName, '.shem'
