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

  _countLines: (filePath) ->
    (@_readFile filePath).split('\n').length

  fileTable: (fileName, fileData) ->
    # ignore for now

  _fileTableStorage: (table) ->
    @emitter.emit 'fileTable' if table isnt undefined
    if not table
      table = {}
      add = (dirPath, relativePath) =>
        for fileName in fs.readdirSync dirPath
          filePath = path.join dirPath, fileName
          if not @singleFile or filePath is @openPath
            stats = fs.statSync filePath
            if stats.isDirectory()
              add filePath, (path.join relativePath, fileName)
            else
              ext = path.extname fileName
              # TODO: load all files in directories, recursively, but don't compile them
              if ext in ['.xshem', '.shem']
                moduleName = path.basename fileName, ext
                fullModuleName = path.join relativePath, moduleName
                table[fullModuleName] =
                  name: fullModuleName
                  numLines: @_countLines filePath
                  exported: ext is '.xshem'
      add @_directory(), ''
      table
    else
      # dont delete files for now

  getModuleTree: ->
    tree = super
    checkIndex = (tree) ->
      if tree.children['index']
        tree.exists = yes
        tree.name = tree.children.index.name
        delete tree.children.index
      for name, child of tree.children
        checkIndex child
    top = children: tree
    checkIndex top
    enclosing = {}
    enclosing[path.basename @_directory()] = top
    enclosing

  _fileStorage: (name, savedInfo) ->
    @emitter.emit 'file' if savedInfo isnt undefined

    srcPath = @_directory()
    filePath = (path.join srcPath, name)
    if (fs.existsSync filePath) and (stats = fs.statSync filePath) and stats.isDirectory()
      filePath = path.join filePath, 'index'
    exported =
      if savedInfo
        savedInfo.exported
      else
        fs.existsSync "#{filePath}.xshem"
    fullPath = "#{filePath}.#{if exported then 'xshem' else 'shem'}"
    if savedInfo
      fileContent = savedInfo.value
      if name isnt @unnamed
        delete savedInfo.value
        @_writeFile fullPath, fileContent
      $.totalStorage "GolemFile_" + fullPath, savedInfo
    else
      info = $.totalStorage "GolemFile_" + fullPath
      try
        value = @_readFile fullPath
      catch
        return if info?.value then info else null
      if not info
        info =
          mode: 'teascript'
        $.totalStorage "GolemFile_" + fullPath, info
      info.value = value
      info.exported = exported
      info

  _writeFile: (path, content) ->
    fs.writeFileSync path, content

  _readFile: (path) ->
    fs.readFileSync path, encoding: 'utf8'

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

  _lastOpenFileStorage: (fileName) ->
    $.totalStorage "lastOpenFileCOOKIE", fileName
