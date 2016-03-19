Emitter = require 'tinyemitter'

findAll = (object, filter) ->
  found = {}
  for k, v of object when filter k, v
    found[k] = v
  found

# Memory is the current representation for the file system, whether it's
# in the browser or on the desktop
module.exports = class Memory
  constructor: ->
    @unnamed = "@unnamed"
    @defaultProject = "Default"
    @emitter = new Emitter
    @on = @emitter.on.bind(@emitter)
    @off = @emitter.off.bind(@emitter)
    @emit = @emitter.emit.bind(@emitter)
    @project = @projects()[@defaultProject]

  # On desktop, folders are used for projects, in the browser, they are explicitly supported
  reload: (projectName) ->
    @saveProject projectName
    @project = @projects()[projectName]
    @emitter.emit 'fileTable'

  projects: ->
    @_projectsStorage()

  saveProject: (projectName) ->
    @_projectsTable projectName, yes

  removeProject: (projectName) ->
    # Dont delete the actual data
    @_projectsTable projectName, no

  _projectsTable: (projectName, exists) ->
    @manipulateTable @_projectsStorage, projectName,
      if exists
        @_projectsStorage()[projectName] or
          name: projectName
          storageKey: "GolemProject_#{projectName}"
          fileStorageKey: "GolemFile_#{projectName}_"
          lastOpenFile: undefined

  _projectsStorage: (table) =>
    @emitter.emit 'projectTable' if table isnt undefined
    ($.totalStorage "projectTableCOOKIEv1", table) or
      Default:
        name: "Default"
        storageKey: "fileTableCOOKIEv4" # for backwards compatibility
        fileStorageKey: "GolemFile_" # for backwards compatibility
        lastOpenFile: undefined

  # TODO: for each file, save its non-command executed commands
  saveSource: (fileName, serialized) ->
    numLines = (serialized.value.split "\n").length

    @fileTable fileName,
      name: fileName
      numLines: numLines
      exported: serialized.exported
    @_fileStorage fileName, serialized
    @_lastOpenFileStorage fileName
    return

  loadSource: (fileName) ->
    @_fileStorage fileName

  removeFromClient: (fileName) ->
    @_fileStorage fileName, null
    @fileTable fileName

  fileTable: (fileName, fileData) ->
    @manipulateTable @_fileTableStorage, fileName, fileData

  manipulateTable: (tableStorage, key, value) ->
    oldTable = tableStorage() or {}

    newTable = findAll oldTable, (oldKey) -> oldKey isnt key
    if value
      newTable[key] = value

    tableStorage newTable

  # fileTable holds a map of all saved files with associated data
  _fileTableStorage: (table) =>
    @emitter.emit 'fileTable' if table isnt undefined
    $.totalStorage @project.storageKey, table

  getFileTable: ->
    findAll @_fileTableStorage(), (name) =>
      name isnt @unnamed

  getModuleTree: ->
    table = @_fileTableStorage()
    tree = {}
    files = (name for name of table).sort()

    add = (to, path, [name, rest...]) ->
      last = rest.length is 0
      to[name] or=
        name: moduleName = [path..., name].join '/'
        children: {}
        exists: last
        exported: (table[moduleName] or {}).exported
      if not last
        add to[name].children, [path..., name], rest
    for name in files when name isnt @unnamed
      path = name.split '/'
      add tree, [], path
    tree

  _fileStorage: (name, value) ->
    @emitter.emit 'file' if value isnt undefined
    $.totalStorage @project.fileStorageKey + name, value

  getLastOpenFileName: ->
    lastOpen = @_lastOpenFileStorage()
    (@loadSource lastOpen) and lastOpen or @unnamed

  setLastOpenFileName: (fileName) ->
    @_lastOpenFileStorage fileName

  _lastOpenFileStorage: (fileName) ->
    if fileName
      @project.lastOpenFile = fileName
      @_projectsTable @project.name, @project
      @emitter.emit 'lastOpen'
    else
      @project.lastOpenFile

  saveCommands: (timeline) ->
    @_timelineStorage timeline.newest(200)

  loadCommands: (timeline) ->
    timeline.from (@_timelineStorage()) ? []

  _timelineStorage: (value) ->
    @emitter.emit 'timeline' if value isnt undefined
    $.totalStorage "timelineCOOKIE", value
