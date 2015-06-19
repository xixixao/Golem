React = require 'React'
{_div} = hyper = require 'hyper'

$ = require 'ejquery'
UndoManager = require 'ace/undomanager'

ace = require './AceEditor'
Memory = require './Memory'
SetIntervalMixin = require './SetIntervalMixin'
_require = require

module.exports = hyper class SourceEditor

  load: ({value, selection, moduleName, scroll}) ->
    session = @editor.session
    @undoStore[@props.module.moduleName] = session.getUndoManager() if session.getUndoManager().execute
    session.setUndoManager session.$defaultUndoManager
    session.getMode().setContent value, selection, moduleName
    session.setUndoManager @undoStore[moduleName] or session.getMode().createUndoManager?() or new UndoManager
    if scroll
      session.setScrollTop scroll.top
      session.setScrollLeft scroll.left

  serializedModule: ->
    value: @editor.getValue()
    mode: 'teascript'
    selection: @editor.getSelectionRange()
    cursor: @editor.getCursorPosition()
    scroll:
      top: @editor.session.getScrollTop()
      left: @editor.session.getScrollLeft()

  mode: ->
    @editor.session.getMode()

  # propTypes:
  #   onCompilerLoad: React.PropTypes.func.isRequired
  #   onSourceCompiled: React.PropTypes.func.isRequired
  #   onSourceFailed: React.PropTypes.func.isRequired

  forceResize: ->
    @editor.resize()

  getInitialState: ->
    backgroundColor: '#222'

  handleMouseEnter: ->
    @editor.focus()
    @props.onFocus()

  _getEditorNode: ->
    @refs.ace.getDOMNode()

  componentWillReceiveProps: ({focus, module}) ->
    if focus and not @props.focus
      @editor.focus()
    if module and module.moduleName isnt @props.module.moduleName
      @load module

  componentDidMount: ->
    @editor = editor = ace.edit @_getEditorNode(), @props.mode, "ace/theme/tea"
    editor.setFontSize 13
    editor.renderer.setScrollMargin 2, 2
    editor.setHighlightActiveLine false
    editor.session.setTabSize 2
    editor.setShowPrintMargin false
    editor.setOption 'scrollPastEnd', true

    @undoStore = {}

    editor.session.on 'change', =>
      # @saved = no
      @props.onChange()

    editor.session.getSelection().on 'changeSelection', =>
      @props.onChange()

    editor.renderer.on 'themeLoaded', =>
      @setState backgroundColor: $(@_getEditorNode()).css 'background-color'

    editor.commands.addCommand
      name: 'leave'
      bindKey: win: 'Esc', mac: 'Esc'
      exec: @props.onLeave

    @load @props.module
    window.addEventListener 'resize', =>
      @editor.resize()

  render: ->
    _div
      className: 'areaBorder'
      style:
        backgroundColor: @state.backgroundColor
        'padding-left': 0
        'padding-right': 20
      onMouseEnter: @handleMouseEnter
      _div ref: 'ace', style: width: '100%', height: @props.height




