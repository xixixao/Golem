{_div, _input} = hyper = require 'hyper'

ace = require './AceEditor'
jsDump = require 'vendor/jsDump'

_AdjustableColumns = require './AdjustableColumns'
SetIntervalMixin = require './SetIntervalMixin'
_SourceEditor = require './SourceEditor'
_CommandLine = require './CommandLine'
_FillHeight = require './FillHeight'
_MessageDisplay = require './MessageDisplay'
_OutputDisplay = require './OutputDisplay'

CommandMode = require './CommandMode'
TimeLine = require './UniqueTimeLine'
CommandParser = require './CommandParser'
Modes = require './Modes'
History = require './History'
IS_DESKTOP = window.requireNode and window.GolemOpenFilePath
if IS_DESKTOP
  Memory = require './FileSystemMemory'
else
  Memory = require './Memory'

{Mode} = require 'compilers/teascript/mode'

# Prelude.installPrelude window
# sourceFragment = "try:"
# compiledJS = ""
# compiler = null
# compilerOptions = null
# sourceCompiled = false
# autoCompile = true
# lastHit = 0
# lastErrorType = ""
# currentMode = ""
# AUTOSAVE_DELAY = 6000
# LAST_CODE = "lastEditedSourceCodeCOOKIE"
# UNNAMED_CODE = "@unnamed"
# TIMELINE_COOKIE = "timelineCOOKIE"
# sourceChanged = false
# saveName = UNNAMED_CODE
# cookieFilePrefix = "TeaTableFile_"

# TODO: get rid of the duplication between dump and run
# dump = ->
#   compileCode() unless sourceCompiled
#   if compiledJS
#     log compiledJS
#   else
#     showErrorMessage "compiler", "Fix: '#{currentMessage()}' first"

# run = ->
#   compileCode() unless sourceCompiled
#   if compiledJS
#     execute compiledJS
#   else
#     showErrorMessage "compiler", "Fix: '#{currentMessage()}' first"

# TODO: create help out of the command definitions, make them pluggable instead of defined here
# commands = Commands.initialize [
#   "dump", "d", -> dump()
#   "run", "r", -> run()
#   "erase", "e", -> eraseMessages arguments...
#   "copy", "c", -> selectLastOutput()
#   "link", "l", -> saveToAdress()
#   "toggle", "t", -> toggleAutoCompilation()
#   "save", -> switchCurrentCode arguments...
#   "load", -> loadFromClient arguments...
#   "close", -> exitCurrentCode()
#   "delete", -> removeFromClient arguments...
#   "modes", "m", -> displayModes()
#   "mode", -> setMode arguments...
#   "canvas", -> createCanvas arguments...
#   "browse", "b", -> displayClient()
#   "help", "h", -> log(helpDescription)
#   "ph", -> history.print(log)
# ]


# modesList = ->
#   join "\n", map keys(modes), (mode) ->
#     "#{if mode is currentMode then "> " else "  "}#{mode}"

# displayModes = ->
#   addMessage modesList(), "modesList"


# createCanvas = (width, height) ->
#   log "#canvas\n<canvas id='canvas' width=#{width} height=#{height}></canvas>"

# toggleAutoCompilation = ->
#   autoCompile = not autoCompile
#   log "Autocompilation switched #{if autoCompile then 'on' else 'off'}"

# getCompilerOptions = ->
#   # TODO: use prelude
#   $.extend {}, compilerOptions

# compileCode = ->
#   startColor = "#151515"
#   endColor = "#ccc"
#   normalColor = "#050505"
#   indicator = $ "#compilationIndicator"
#   indicateBy = (color) ->
#     indicator.animate
#       color: color
#     ,
#       complete: ->
#         indicator.css color: color

#   compileSource ->
#     indicateBy startColor
#   , ->
#     indicateBy endColor
#     indicateBy normalColor


#   _results = []
#   _i = 0
#   _len = history.length

#   while _i < _len
#     point = history[_i]
#     insert point.from, point.to, point.text
#     _results.push log(text)
#     _i++
#   _results

# TODO: for each file, save its non-command executed commands

# exitCurrentCode = ->
#   saveCurrent()
#   saveName = UNNAMED_CODE
#   sourceArea.setValue ""
#   saveCurrent()

# switchCurrentCode = (name) ->
#   saveCurrent()
#   saveName = name
#   saveCurrent()
#   showFileMessage "Working on " + saveName

# displayClient = ->
#   table = $.totalStorage(BROWSE_COOKIE)
#   output = ""
#   if table?.length > 0
#     for snippet in table.split ";"
#       [name, lines] = snippet.split ","
#       output += "#{name}, lines: #{lines}\n" if name isnt UNNAMED_CODE
#   if output is ""
#     log "No files saved"
#   else
#     log output


# selectLastOutput = ->
#   (getMessage(0)).selectText()

# loadWith = (coffee) ->
#   sourceArea.setValue sourceArea.getValue() + coffee

# saveToAdress = ->
#   source = sourceArea.getValue()
#   window.location = "#" + sourceFragment + (encodeURIComponent(source))

# TODO: an easy way to distinguish code from other text in logs
helpDescription = """
  Issue commands by typing \"< \" or \":\"
  followed by space separated commands:

  erase / e      - Clear all results
  erase &lt;not...> - Don't clear results containing givens
  dump / d       - Dump generated javascript
  run / r        - Run just the source code
  copy / c       - Select last output (right-click to copy)
  toggle / t     - Toggle autocompilation
  link / l       - Create a link with current source code
  mode &lt;name>    - Switch to a different compiler
  modes / m      - Show all available modes
  canvas &lt;w> &lt;h> - Create a canvas given width and height
  save &lt;name>    - Save current code locally under name
  load &lt;name>    - Load code from local storage under name
  delete &lt;name>  - Remove code from local storage
  browse / b     - Show content of local storage
  help / h       - Show this help

  Name with arbitrary characters (spaces) must be closed by \\
  save Long file name.txt\\
"""

# sourceArea.session.on 'change', sourceChange


  # loadFromClient: (name) ->
  #   name = @_lastOpenFileStorage() unless name
  #   stored = fileStorage(name)
  #   if stored?
  #     saveName = name

  #     deseriazeSource stored, ->
  #       showFileMessage "" + saveName + " loaded"  if saveName isnt UNNAMED_CODE

  #   else
  #     showFileMessage "There is no " + name  if name isnt UNNAMED_CODE


# TODO: create help out of the command definitions, make them pluggable instead of defined here
# commands = Commands.initialize [
#   "dump", "d", -> dump()
#   "run", "r", -> run()
#   "erase", "e", -> eraseMessages arguments...
#   "copy", "c", -> selectLastOutput()
#   "link", "l", -> saveToAdress()
#   "toggle", "t", -> toggleAutoCompilation()
#   "save", -> switchCurrentCode arguments...
#   "load", -> loadFromClient arguments...
#   "close", -> exitCurrentCode()
#   "delete", -> removeFromClient arguments...
#   "modes", "m", -> displayModes()
#   "mode", -> setMode arguments...
#   "canvas", -> createCanvas arguments...
#   "browse", "b", -> displayClient()
#   "help", "h", -> log(helpDescription)
#   "ph", -> history.print(log)
# ]


module.exports = hyper class EditorMain

  getInitialState: ->
    @memory = new Memory
    @logId = 0
    @focus =
      sourceEditor: 'sourceEditor'
      commandLine: 'commandLine'
      output: 'output'
    @saved = no
    @unnamedModules = 0
    mode = new Mode no, this
    @registerMode mode
    @fileName = @memory.getLastOpenFileName()

    mode: mode
    module: @loadSource @fileName
    focused: @focus.sourceEditor
    timeline: new TimeLine
    logs: []
    message: {}
    sourceUpdateId: 0
    sourceEditorHeight: 300
    # modes: Modes
    autosaveDelay: 6000
    commands: [].concat [
      require './commands/builtin/Help'
      require './commands/builtin/Output'
      require './commands/builtin/Runtime'
      require './commands/builtin/Files'
      require './commands/builtin/Projects'
      require './commands/builtin/Modes'
      require './commands/builtin/Download'
      require './commands/builtin/Demos'
      require './commands/builtin/Intro'
    ]...

  mixins: [
    SetIntervalMixin
  ]

  registerMode: (mode) ->
    worker = mode.prepareWorker()
    worker.on 'ok', ({data: {result, source}}) =>
      console.log "source worker finished ok"#, result, result.ast, result.types
      if mode.editor.getValue() is source
        if result.errors
          console.log result.errors
          firstError = result.errors[0]
          @handleSourceFailed firstError.message or firstError
        else
          @handleSourceCompiled result#, @refs.sourceEditor.editor.getValue()
        mode.updateAst result.ast, result.errors or []

    worker.on 'error', ({data: {text, source, inDependency}}) =>
      if inDependency or mode.editor.getValue() is source
        @handleSourceFailed text
        mode.removeErrorMarkers()

    worker.on 'request', ({data: {moduleName}}) =>
      console.log "source worker requesting", moduleName
      # TODO: dont unrelativize the modulename here
      loaded = @memory.loadSource moduleName.replace /^\.\//, ''
      if loaded
        worker.call 'compileModule', [loaded.value, moduleName, loaded.exported]
      else
        @handleSourceFailed "Could not find module #{moduleName}"

  # save current file or save as fileName
  save: (fileName) ->
    if fileName
      @saved = no
    nameToSave = fileName or @state.module.moduleName
    if not @saved
      @saved = yes
      @memory.saveSource nameToSave,
        @refs.sourceEditor.serializedModule()
      @setState
        module: @loadSource nameToSave

  # load existing or unnamed
  load: (fileName, mustExist) ->
    if fileName isnt @state.module.name
      @save()
    @loadWithoutSaving fileName, mustExist

  loadWithoutSaving: (fileName, mustExist) ->
    loaded = @loadSource fileName, mustExist
    if loaded
      @memory.setLastOpenFileName fileName
      @setState
        module: loaded
    # @save fileName if loaded or not mustExist
    !!loaded

  loadSource: (fileName, mustExist) ->
    serialized = @memory.loadSource fileName
    if mustExist and not serialized
      return
    if not serialized # First time use of the editor
      serialized = value: ''
    serialized.moduleName = fileName
    serialized

  empty: ->
    @state.mode.setContent ''










  unnamedModuleName: ->
    newModuleName = "unnamed#{@unnamedModules++}"
    @state.mode.worker.call 'compileModule', ['', newModuleName, true]
    newModuleName

  createAceEditor: (value, displayId, moduleName, isTopLevel) ->
    mode = new CommandMode displayId, []
    container = document.getElementById displayId
    editor = ace.edit container, mode, "ace/theme/tea"
    editor.setFontSize 13
    editor.renderer.setScrollMargin 2, 2
    editor.$blockScrolling = Infinity
    editor.setHighlightActiveLine false
    editor.session.setTabSize 2
    editor.setShowPrintMargin false
    editor.renderer.setShowGutter false
    editor.setOptions maxLines: Infinity
    editor.setReadOnly true
    # editor.setValue @props.expression, 1
    # editor.moveCursorTo 0, 0
    notFocusedClass = 'not-focused'
    container.classList.add notFocusedClass
    editor.on 'blur', ->
      container.classList.add notFocusedClass

    editor.on 'focus', ->
      container.classList.remove notFocusedClass

    mode.registerWithWorker @state.mode.worker
    mode.parseOnlyWorker isTopLevel
    mode.setContent value, null, moduleName

    for name, command of mode.commands when command.indirect
      do (name, command) =>
        command.exec = => @handleExpressionCommand name, editor

    mode.worker.on 'ok', ({data: {result, type}}) =>
      source = editor.getValue()
      mode.updateAst result.ast, result.errors









  displayMessage: (type, message) ->
    @setState
      message:
        type: type
        value: message

  _hideMessage: (types...) ->
    if @state.message.type in types
      @setState
        message: {}

  # handleModeChange: (mode) ->
  #   @refs.commandLine.setMode mode

  # handleCompilerLoad: (compiler, modeId) ->
  #   # if isCurrentMessage "modesList"
  #   #   @_logCurrent modesList(), "modesList" # update current message
  #   # else
  #   @displayMessage 'info', "#{@state.modes.getName modeId} compiler loaded"
  #   @setState
  #     compiler: compiler

  commandCompleter: ->
    @_commandCompleter or @_commandCompleter = getCompletions: (editor, session, pos, prefix, callback) =>
      [name, args] = CommandParser editor.getValue()[1...]
      autocomplete = (@commandNamed name)?.autocomplete
      if autocomplete
        autocomplete args, @state, this, callback
      else
        callback null, []

  handleSourceCompiled: ({js}) ->
    @_hideMessage 'compiler', 'runtime'

    @setState
      compiledJs: js
      sourceUpdateId: @state.sourceUpdateId + 1

  handleSourceFailed: (text) ->
    @displayMessage 'compiler', "Compiler: #{text}"

  handleSourceChange: ->
    @saved = no

  execute: (code) ->
    try
      @state.compiler.preExecute? @memory
      eval code
    catch error
      @displayMessage 'runtime', "Runtime: #{error}"
      error

  _executeCommand: (command, args) ->
    command.execute args, @state, this

  _bindCommands: ->
    commandMap = {}
    for command in @state.commands
      for symbol in command.symbols
        # TODO: if commandMap[symbol] handle clash
        commandMap[symbol] = command

    @setState
      commandMap: commandMap

  executeCommand: (name, args...) ->
    command = @commandNamed name
    if !command
      @displayMessage 'command',
        "Command Line: #{name} is not a command"
    else
      @_executeCommand command, args

  commandNamed: (name) ->
    @state.commandMap[name]

  handleCommandExecution: (source, moduleName, result, type) ->
    @_hideMessage 'command', 'runtime'
    if type is 'command'
      [symbol, args] = CommandParser result
      @executeCommand symbol, args...
    else
      # result = @execute @state.compiledJs + result
      # @state.compiler.preExecute? @memory
      # [code, warnings] = result
      # @log source: source, compiled: code, warnings: warnings
      @log
        source: source
        moduleName: moduleName
        ast: result.ast
        compiled: result.js#, warnings: warnings

      # @log _div {},
      #   _div source
      #   if result not instanceof Error
      #     _div @formatResult @execute @state.compiledJs + result
      #   else
      #     null
      # outputScrollTop()

  handleCommandCompiled: ->
    @_hideMessage 'command', 'runtime'

  handleCommandFailed: (text) ->
    @displayMessage 'command', "Command Line: #{text}"

  handleRemoveAll: ->
    @executeCommand 'erase'

  handleFocus: (to) ->
    (index) =>
      # if to is @focus.output
      #   console.log "hey", @refs.fakeInput.getDOMNode()
      #   @refs.fakeInput.getDOMNode().focus()
      @setState
        focused: to
        focusedOutputIndex: index

  # Browser only for now
  switchProject: (projectName) ->
    @save()
    @memory.reload projectName
    @loadWithoutSaving @memory.getLastOpenFileName()

  componentWillMount: ->
    window.addEventListener 'unload', =>
      @save()

    window.addEventListener 'golem-native-open-file', ({filepath}) =>
      @save()
      fileName = @memory.reload filepath
      # TODO: check this logic:
      @loadWithoutSaving fileName or @memory.getLastOpenFileName()

    @setInterval @save, @state.autosaveDelay

    # hash = decodeURIComponent window.location.hash.replace /^#/, ""
    # if hash.indexOf(sourceFragment) is 0
    #   src = hash.substr(sourceFragment.length)
    #   loadWith src
    #   window.location.hash = ""
    #   @_log "File loaded from URI, use the link command to generate new link."
    # else
    #   loadFromClient()
    # loadTimeline()

    # @_setMode 'CoffeeScript'
    @_bindCommands()

  componentDidMount: ->
    if @state.timeline.size() < 10
      @_executeCommand @state.commandMap['intro']
    if IS_DESKTOP and not @memory.singleFile
      @_executeCommand @state.commandMap['modules']
    if not IS_DESKTOP
      @_executeCommand @state.commandMap['load-demos']
    window.log = @logResult

  logResult: (input) ->
    @log input

  log: (input) ->
    @setState (state) ->
      logs: [
        id: "log#{@logId++}"
        value: input].concat state.logs

  handleOutputDelete: (deletedId) ->
    if @state.logs.length is 1
      do @handleFocus @focus.commandLine
    @setState
      logs: @state.logs.filter ({id}) -> id isnt deletedId

  handleExpressionCommand: (name, editor) ->
    @state.mode.editor.execCommand name, targetEditor: editor

  handleColumnsResize: ->
    @refs.sourceEditor.forceResize()

  handleHeightResize: (height) ->
    @setState
      sourceEditorHeight: height

  render: ->
    windowWidth = Math.floor window.innerWidth
    dividerWidth = 20
    leftColumnWidth = (windowWidth - dividerWidth) / 2

    _AdjustableColumns
      leftColumnWidth: leftColumnWidth
      dividerWidth: dividerWidth
      onResize: @handleColumnsResize
      _FillHeight onResize: @handleHeightResize,
        _CommandLine
          ref: 'commandLine'
          worker: @state.mode.worker
          completers: [@state.mode.completer, @commandCompleter()]
          moduleName: @state.module.moduleName
          onCommandExecution: @handleCommandExecution
          onCommandCompiled: @handleCommandCompiled
          onCommandFailed: @handleCommandFailed
          onLeave: @handleFocus @focus.sourceEditor
          onFocus: @handleFocus @focus.commandLine
          onFocusOutput: @handleFocus @focus.output
          onRemoveAll: @handleRemoveAll
          focus: @state.focused is @focus.commandLine
          timeline: @state.timeline
          memory: @memory
          updatedSource: @state.sourceUpdateId
        # _compilationIndicator to: 0,
        #   '&middot;'
        _MessageDisplay
          ref: 'message'
          message: @state.message
        _SourceEditor
          ref: 'sourceEditor'
          mode: @state.mode
          module: @state.module
          onChange: @handleSourceChange
          onLeave: @handleFocus @focus.commandLine
          onFocus: @handleFocus @focus.sourceEditor
          focus: @state.focused is @focus.sourceEditor
          height: @state.sourceEditorHeight
      ''
      _OutputDisplay
        logs: @state.logs
        updatedSource: @state.sourceUpdateId
        worker: @state.mode.worker
        completers: [@state.mode.completer]
        onCommand: @handleExpressionCommand
        focus: @state.focused is @focus.output
        focusedOutputIndex: @state.focusedOutputIndex
        onDelete: @handleOutputDelete
        onFocusOutput: @handleFocus @focus.output
        onRemoveFocus: @handleFocus null

hyper.render document.getElementById('editor'), module.exports()
