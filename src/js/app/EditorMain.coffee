React = require 'React'
{_div} = require 'hyper'

_AdjustableColumns = require './AdjustableColumns'
_SourceEditor = require './SourceEditor'
_CommandLine = require './CommandLine'
_FillHeight = require './FillHeight'
_MessageDisplay = require './MessageDisplay'
_OutputDisplay = require './OutputDisplay'

TimeLine = require './UniqueTimeLine'
Commands = require './Commands'
History = require './History'
CommandMode = require './CommandMode'
jsDump = require 'vendor/jsDump'

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

modes =
  CoffeeScript:
    id: "coffeescript"

  IcedCoffeeScript:
    id: "icedcoffeescript"

  Ometa:
    id: "ometa"

  MetaCoffee:
    id: "metacoffee"

# modesList = ->
#   join "\n", map keys(modes), (mode) ->
#     "#{if mode is currentMode then "> " else "  "}#{mode}"

# displayModes = ->
#   addMessage modesList(), "modesList"

setNewMode = (name, callback) ->
  name = 'CoffeeScript' unless name?.length
  if name isnt currentMode
    setMode name, callback
  else
    callback?()

setMode = (name, callback) ->
  config = modes[name]
  if config?
    modePath = "compilers/#{config.id}/mode"
    sourceArea.session.setMode modePath
    commandArea.session.setMode new CommandMode "compilers/#{config.id}"
    currentMode = name
    if isCurrentMessage "modesList"
      setCurrentMessage modesList(), "modesList"
    else
      showFileMessage "#{name} compiler loaded"
    callback?()
  # , (error) ->
  #   log "#{name} loading failed"
  else
    @_log "Wrong mode name, choose from:\n\n#{modesList()}"

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


# history = new History
# sourceChange = (e) ->
#   sourceCompiled = false
#   sourceChanged = true
#   history.add e
#   return

# TODO: this is not used, it is connected to History
# printHistory = ->
#   insert = undefined
#   point = undefined
#   text = undefined
#   _i = undefined
#   _len = undefined
#   _results = undefined
#   text = [""]
#   insert = (from, to, what) ->
#     appended = undefined
#     curr = undefined
#     newLines = undefined
#     oldLines = undefined
#     singleLine = undefined
#     singleLine = from.line is to.line
#     if singleLine
#       curr = text[from.line]
#       text[from.line] = curr.slice(0, from.ch) + what[0] + curr.slice(to.ch)
#     else
#       text[from.line] = text[from.line].slice(0, from.ch) + what[0]
#       text[to.line] = what[what.length - 1] + text[to.line].slice(to.ch)
#     newLines = what.length
#     oldLines = 1 + to.line - from.line
#     if newLines > 2 or oldLines > 2
#       appended = (if singleLine then what.slice(1) else what.slice(1, -1))
#       text.splice.apply text, [
#         from.line + 1
#         Math.max(0, oldLines - newLines)
#       ].concat(__slice_.call(appended))

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








module.exports = React.createClass

  getInitialState: ->
    sourceEditorFocus: yes
    timeline: new TimeLine
    logs: []
    sourceEditorHeight: 300

  _displayMessage: (type, message) ->
    @setState
      messageType: type
      message: message

  _hideMessage: (types...) ->
    @setState
      hideTypes: types

  handleCompilerLoad: (compiler) ->
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

  componentDidMount: ->
    $(window).unload ->
      memory.save()

    # hash = decodeURIComponent window.location.hash.replace /^#/, ""
    # if hash.indexOf(sourceFragment) is 0
    #   src = hash.substr(sourceFragment.length)
    #   loadWith src
    #   window.location.hash = ""
    #   @_log "File loaded from URI, use the link command to generate new link."
    # else
    #   loadFromClient()
    # loadTimeline()
    if @state.timeline.size() < 10
      @_log helpDescription

  _log: (input...) ->
    input = for i in input
      jsDump.parse i ? "Nothing"
    message = input.join ", "
    if message.length > 0
      @setState
        logs: [message].concat @state.logs

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
        # _compilationIndicator to: 0,
        #   '&middot;'
        _MessageDisplay
          type: @state.messageType
          value: @state.message
          hideTypes: @state.hideTypes
        #   @state.message
        _SourceEditor
          onCompilerLoad: @handleCompilerLoad
          onSourceCompiled: @handleSourceCompiled
          onSourceFailed: @handleSourceFailed
          onLeave: @handleSourceEditorLeave
          focus: @state.sourceEditorFocus
          height: @state.sourceEditorHeight
      ''
      _OutputDisplay values: @state.logs

React.renderComponent (
  module.exports()
), document.getElementById 'test'
