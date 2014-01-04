React = require 'React'
{_div} = hyper = require 'hyper'

$ = require 'ejquery'
ace = require 'ace/ace'

Memory = require './Memory'
SetIntervalMixin = require './SetIntervalMixin'

module.exports = hyper class SourceEditor

  save: ->
    if not @state.saved
      {editor} = @state
      @props.memory.saveSource @props.fileName,
        value: editor.getValue()
        mode: @state.mode
        selection: editor.getSelectionRange()
        cursor: editor.getCursorPosition()
        scroll:
          top: editor.session.getScrollTop()
          left: editor.session.getScrollLeft()
      @setState
        saved: yes

  _load: ->
    serialized = @props.memory.loadSource @props.fileName
    {value, mode, selection, cursor, scroll} = serialized

    {editor} = @state
    editor.setValue value
    editor.session.selection.setSelectionRange selection
    editor.moveCursorToPosition cursor
    editor.session.setScrollTop scroll.top
    editor.session.setScrollLeft scroll.left
    @setState
      mode: mode

  propTypes:
    onCompilerLoad: React.PropTypes.func.isRequired
    onSourceCompiled: React.PropTypes.func.isRequired
    onSourceFailed: React.PropTypes.func.isRequired

  forceResize: ->
    @state.editor.resize()

  mixins: [
    SetIntervalMixin
  ]

  getDefaultProps: ->
    memory = new Memory

    autosaveDelay: 6000
    memory: memory
    fileName: memory.getLastOpenFileName()

  getInitialState: ->
    backgroundColor: '#222'
    saved: no

  handleMouseEnter: ->
    @state.editor.focus()

  _getEditorNode: ->
    @refs.ace.getDOMNode()

  _setMode: (mode) ->
    @state.editor.session.setMode "compilers/#{mode}/mode"

  componentWillReceiveProps: ({focus, mode}) ->
    if focus
      @state.editor.focus()

    if mode and mode isnt @props.mode
      @setState
        mode: mode
      @_setMode()

  componentDidMount: ->
    editor = ace.edit @_getEditorNode()
    editor.setTheme "ace/theme/cobalt"
    editor.setHighlightActiveLine true
    editor.session.setTabSize 2
    editor.setShowPrintMargin false

    editor.session.on 'change', =>
      @setState saved: no

    editor.renderer.on 'themeLoaded', =>
      @setState backgroundColor: $(@_getEditorNode()).css 'background-color'

    editor.session.on 'changeMode', =>
      @props.onCompilerLoad editor.session.getMode()

      editor.session.$worker.on 'ok', ({data: {result}}) =>
        @props.onSourceCompiled result

      editor.session.$worker.on 'error', ({data: {text}}) =>
        @props.onSourceFailed text

    editor.commands.addCommand
      name: 'leave'
      bindKey: win: 'Esc', mac: 'Esc'
      exec: @props.onLeave

    @setState
      editor: editor

    @setInterval @save, @props.autosaveDelay
    @_load()
    @_setMode @props.mode

    window.addEventListener 'unload', =>
      @save()

  render: ->
    _div
      className: 'areaBorder'
      style:
        backgroundColor: @state.backgroundColor
      onMouseEnter: @handleMouseEnter
      _div ref: 'ace', style: width: '100%', height: @props.height




