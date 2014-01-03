{_div} = hyper = require 'hyper'

_AdjustableColumns = require './AdjustableColumns'
_SourceEditor = require './SourceEditor'
_CommandLine = require './CommandLine'
_FillHeight = require './FillHeight'
_MessageDisplay = require './MessageDisplay'
_OutputDisplay = require './OutputDisplay'

TimeLine = require './UniqueTimeLine'
Commands = require './Commands'
Modes = require './Modes'
History = require './History'

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

# BROWSE_COOKIE = "table"
# autosave = ->
#   setTimeout ->
#     if sourceChanged
#       saveCurrent()
#       sourceChanged = false
#     autosave()
#   , AUTOSAVE_DELAY

# fileCookie = (name, value) ->
#   $.totalStorage cookieFilePrefix + name, value

# TODO: for each file, save its non-command executed commands
# saveCurrent = ->
#   source = sourceArea.getValue()
#   value = serializeSource()

#   valueLines = (source.split "\n").length
#   exists = false

#   ammendClientTable saveName, "#{saveName},#{valueLines}"
#   fileCookie saveName, value
#   $.totalStorage LAST_CODE, saveName

# serializeSource = ->
#   source: sourceArea.getValue()
#   mode: currentMode
#   selection: sourceArea.getSelectionRange()
#   cursor: sourceArea.getCursorPosition()
#   scroll:
#     top: sourceArea.session.getScrollTop()
#     left: sourceArea.session.getScrollLeft()

# deseriazeSource = (serialized, callback) ->
#   {source, mode, selection, cursor, scroll} = serialized
#   sourceArea.setValue source
#   sourceArea.session.selection.setSelectionRange selection
#   sourceArea.moveCursorToPosition cursor
#   sourceArea.session.setScrollTop scroll.top
#   sourceArea.session.setScrollLeft scroll.left
#   setNewMode mode, callback

# saveTimeline = ->
#   $.totalStorage TIMELINE_COOKIE, timeline.newest(200)

# loadTimeline = ->
#   timeline.from ($.totalStorage TIMELINE_COOKIE) ? []

# removeFromClient = (name) ->
#   return unless name?
#   fileCookie saveName, null
#   ammendClientTable name
#   showFileMessage "#{name} deleted"

# ammendClientTable = (exclude, addition) ->
#   addition = null unless addition?
#   table = []
#   oldTable = $.totalStorage BROWSE_COOKIE
#   if oldTable?
#     for pair in oldTable.split ";"
#       [name, lines] = pair.split ","
#       table.push pair if name isnt exclude

#   table.push addition if addition
#   table = table.join ";"
#   table = null if table.length is 0
#   $.totalStorage BROWSE_COOKIE, table

# loadFromClient = (name) ->
#   name = $.totalStorage(LAST_CODE) unless name?
#   unless name?
#     setMode "CoffeeScript" unless compiler?
#     return
#   stored = fileCookie(name)
#   if stored?
#     saveName = name

#     deseriazeSource stored, ->
#       showFileMessage "" + saveName + " loaded"  if saveName isnt UNNAMED_CODE

#   else
#     showFileMessage "There is no " + name  if name isnt UNNAMED_CODE

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




module.exports = hyper class EditorMain

  getInitialState: ->
    sourceEditorFocus: yes
    timeline: new TimeLine
    sourceEditorHeight: 300

  _setMode: (name) ->
    config = Modes[name]
    if config?
      @setState
        sourceMode: config
    else
      @_log "Wrong mode name, choose from:\n\n#{modesList()}"

  _displayMessage: (type, message) ->
    @setState
      messageType: type
      message: message

  _hideMessage: (types...) ->
    @setState
      hideTypes: types

  handleCompilerLoad: (compiler) ->
    # if isCurrentMessage "modesList"
    #   @_logCurrent modesList(), "modesList" # update current message
    # else
    @_displayMessage 'info', "#{@state.sourceMode.name} compiler loaded"
    @setState
      compiler: compiler

  handleSourceCompiled: (js) ->
    # saveCurrent()
    @_hideMessage 'compiler', 'runtime'

    @setState
      compiledJS: js
      sourceCompiled: yes

  handleSourceFailed: (text) ->
    @_displayMessage 'compiler', "Compiler: #{text}"

  _execute: (code) ->
    @state.compiler.preExecute?()
    eval code

  handleCommandExecution: (result, type) ->
    @_hideMessage 'command', 'runtime'
    if type is 'command'
      for command in commands
        match = command.match result
        break if match?
      # saveTimeline()
      # outputScrollTop()
    else
      try
        @_log @_execute @state.compiledJS + result
        # saveTimeline()
        # outputScrollTop()
      catch error
        @_displayMessage 'runtime', "Runtime: #{error}"

  handleCommandFailed: (text) ->
    @_displayMessage 'command', "Command Line: #{text}"

  handleCommandLineLeave: ->
    @setState
      sourceEditorFocus: yes

  handleSourceEditorLeave: ->
    @setState
      sourceEditorFocus: no

  componentWillMount: ->
    # $(window).unload ->
    #   memory.save()

    # hash = decodeURIComponent window.location.hash.replace /^#/, ""
    # if hash.indexOf(sourceFragment) is 0
    #   src = hash.substr(sourceFragment.length)
    #   loadWith src
    #   window.location.hash = ""
    #   @_log "File loaded from URI, use the link command to generate new link."
    # else
    #   loadFromClient()
    # loadTimeline()

    @_setMode 'CoffeeScript'

  componentDidMount: ->
    console.log @refs
    if @state.timeline.size() < 10
      @_log helpDescription

  _log: (input...) ->
    @refs.output.log input

  handleHeightResize: (height) ->
    @setState
      sourceEditorHeight: height

  render: ->
    windowWidth = Math.floor window.innerWidth
    dividerWidth = 20
    leftColumnWidth = (windowWidth - dividerWidth) / 2

    _AdjustableColumns leftColumnWidth: leftColumnWidth, dividerWidth: dividerWidth,
      _FillHeight onResize: @handleHeightResize,
        _CommandLine
          onCommandExecution: @handleCommandExecution
          onCommandFailed: @handleCommandFailed
          onLeave: @handleCommandLineLeave
          focus: !@state.sourceEditorFocus
          timeline: @state.timeline
          sourceMode: @state.sourceMode.id
        # _compilationIndicator to: 0,
        #   '&middot;'
        _MessageDisplay
          type: @state.messageType
          value: @state.message
          hideTypes: @state.hideTypes
        _SourceEditor
          onCompilerLoad: @handleCompilerLoad
          onSourceCompiled: @handleSourceCompiled
          onSourceFailed: @handleSourceFailed
          onLeave: @handleSourceEditorLeave
          focus: @state.sourceEditorFocus
          height: @state.sourceEditorHeight
          mode: @state.sourceMode.id
      ''
      _OutputDisplay ref: 'output'

hyper.render document.getElementById('test'), module.exports()
