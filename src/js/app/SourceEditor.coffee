React = require 'React'
{_div} = hyper = require 'hyper'

$ = require 'ejquery'
ace = require 'ace/ace'

Memory = require './Memory'
SetIntervalMixin = require './SetIntervalMixin'
_require = require

module.exports = hyper class SourceEditor

  # save current file or save as fileName
  save: (fileName) ->
    if fileName
      @fileName = fileName
      @saved = no
    if not @saved
      @saved = yes
      {editor} = this
      @props.memory.saveSource @fileName,
        value: editor.getValue()
        mode: @mode
        selection: editor.getSelectionRange()
        cursor: editor.getCursorPosition()
        scroll:
          top: editor.session.getScrollTop()
          left: editor.session.getScrollLeft()

  # load existing or unnamed
  load: (fileName, mustExist) ->
    if fileName isnt @fileName
      @save()
    serialized = @props.memory.loadSource fileName
    if serialized
      {value, mode, selection, cursor, scroll} = serialized

      {editor} = this
      editor.setValue value
      editor.session.selection.setSelectionRange selection
      editor.moveCursorToPosition cursor
      editor.session.setScrollTop scroll.top
      editor.session.setScrollLeft scroll.left
      @setMode mode
    @save fileName if serialized or not mustExist
    serialized?

  empty: ->
    {editor} = this
    editor.setValue ''

  propTypes:
    onCompilerLoad: React.PropTypes.func.isRequired
    onSourceCompiled: React.PropTypes.func.isRequired
    onSourceFailed: React.PropTypes.func.isRequired

  forceResize: ->
    @editor.resize()

  mixins: [
    SetIntervalMixin
  ]

  getDefaultProps: ->
    autosaveDelay: 6000

  getInitialState: ->
    @saved = no

    backgroundColor: '#222'

  handleMouseEnter: ->
    @editor.focus()

  _getEditorNode: ->
    @refs.ace.getDOMNode()

  setMode: (modeId) ->
    if @mode and @mode is modeId
      return
    modeId ||= 'teascript'
    @mode ?= modeId # save immediately if no mode set yet
    @props.onModeChange modeId

    _require ["compilers/#{modeId}/mode"], ({Mode}) =>
      @editor.session.setMode new Mode
      @props.onCompilerLoad @editor.session.getMode(), modeId

      @editor.session.$worker.on 'ok', ({data: {result}}) =>
        @props.onSourceCompiled result

      @editor.session.$worker.on 'error', ({data: {text}}) =>
        console.log "from source worker", text
        @props.onSourceFailed text
      @mode = modeId # save mode

  componentWillReceiveProps: ({focus, fileName}) ->
    if focus and not @props.focus
      @editor.focus()

  componentDidMount: ->
    @editor = editor = ace.edit @_getEditorNode(), null, "ace/theme/tea"
    editor.setFontSize 13
    editor.renderer.setScrollMargin 2, 2
    editor.setHighlightActiveLine true
    editor.session.setTabSize 2
    editor.setShowPrintMargin false

    editor.session.on 'change', =>
      @saved = no

    editor.renderer.on 'themeLoaded', =>
      @setState backgroundColor: $(@_getEditorNode()).css 'background-color'

    editor.commands.addCommand
      name: 'leave'
      bindKey: win: 'Esc', mac: 'Esc'
      exec: @props.onLeave

    @fileName = @props.memory.getLastOpenFileName()
    @load @fileName
    @setInterval @save, @props.autosaveDelay

    window.addEventListener 'unload', =>
      @save()

  render: ->
    _div
      className: 'areaBorder'
      style:
        backgroundColor: @state.backgroundColor
      onMouseEnter: @handleMouseEnter
      _div ref: 'ace', style: width: '100%', height: @props.height




