{_div} = hyper = require 'hyper'

jsDump = require 'vendor/jsDump'

_AdjustableColumns = require './AdjustableColumns'
_SourceEditor = require './SourceEditor'
_CommandLine = require './CommandLine'
_FillHeight = require './FillHeight'
_MessageDisplay = require './MessageDisplay'
_OutputDisplay = require './OutputDisplay'

TimeLine = require './UniqueTimeLine'
CommandParser = require './CommandParser'
Modes = require './Modes'
History = require './History'
Memory = require './Memory'

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

    sourceEditorFocus: yes
    timeline: new TimeLine
    logs: []
    message: {}
    sourceEditorHeight: 300
    modes: Modes
    commands: [
      require './commands/builtin/Help'
      require './commands/builtin/Output'
      require './commands/builtin/Runtime'
      require './commands/builtin/Modes'
      require './commands/builtin/Files'
    ].flatten()

  displayMessage: (type, message) ->
    @setState
      message:
        type: type
        value: message

  _hideMessage: (types...) ->
    if @state.message.type in types
      @setState
        message: {}

  handleModeChange: (mode) ->
    @refs.commandLine.setMode mode

  handleCompilerLoad: (compiler, modeId) ->
    # if isCurrentMessage "modesList"
    #   @_logCurrent modesList(), "modesList" # update current message
    # else
    @displayMessage 'info', "#{@state.modes.getName modeId} compiler loaded"
    @setState
      compiler: compiler

  handleSourceCompiled: (js) ->
    @_hideMessage 'compiler', 'runtime'

    @setState
      compiledJs: js
      sourceCompiled: yes

  handleSourceFailed: (text) ->
    @displayMessage 'compiler', "Compiler: #{text}"

  execute: (code) ->
    try
      @state.compiler.preExecute? @memory
      eval code
    catch error
      @displayMessage 'runtime', "Runtime: #{error}"
      error

  _executeCommand: (command, args) ->
    @setState command.execute args, @state, this

  _bindCommands: ->
    commandMap = {}
    for command in @state.commands
      for symbol in command.symbols
        # TODO: if commandMap[symbol] handle clash
        commandMap[symbol] = command

    @setState
      commandMap: commandMap

  handleCommandExecution: (source, result, type) ->
    @_hideMessage 'command', 'runtime'
    if type is 'command'
      [symbol, args] = CommandParser result
      command = @state.commandMap[symbol]
      if !command
        @displayMessage 'command',
          "Command Line: #{symbol} is not a command"
      else
        @_executeCommand command, args
    else
      # result = @execute @state.compiledJs + result
      @state.compiler.preExecute? @memory
      @log source: source, compiled: result
      # @log _div {},
      #   _div source
      #   if result not instanceof Error
      #     _div @formatResult @execute @state.compiledJs + result
      #   else
      #     null
      # outputScrollTop()

  handleCommandFailed: (text) ->
    @displayMessage 'command', "Command Line: #{text}"

  handleCommandLineLeave: ->
    @setState
      sourceEditorFocus: yes

  handleSourceEditorLeave: ->
    @setState
      sourceEditorFocus: no

  componentWillMount: ->

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
      @_executeCommand @state.commandMap.help
    window.log = @logResult

  logResult: (input) ->
    @log input

  log: (input) ->
    @setState
      logs: [["log#{@logId++}", input]].concat @state.logs

  handleExpressionCommand: (name, editor) ->
    @refs.sourceEditor.editor.execCommand name, targetEditor: editor

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
          onCommandExecution: @handleCommandExecution
          onCommandFailed: @handleCommandFailed
          onLeave: @handleCommandLineLeave
          focus: !@state.sourceEditorFocus
          timeline: @state.timeline
          memory: @memory
        # _compilationIndicator to: 0,
        #   '&middot;'
        _MessageDisplay
          ref: 'message'
          message: @state.message
        _SourceEditor
          ref: 'sourceEditor'
          onModeChange: @handleModeChange
          onCompilerLoad: @handleCompilerLoad
          onSourceCompiled: @handleSourceCompiled
          onSourceFailed: @handleSourceFailed
          onLeave: @handleSourceEditorLeave
          memory: @memory
          focus: @state.sourceEditorFocus
          height: @state.sourceEditorHeight
      ''
      _OutputDisplay
        logs: @state.logs
        compiledSource: @state.compiledJs
        onCommand: @handleExpressionCommand

hyper.render document.getElementById('editor'), module.exports()
