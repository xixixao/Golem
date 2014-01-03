React = require 'React'
{_div} = require 'hyper'
$ = require 'ejquery'
ace = require 'ace/ace'

module.exports = React.createClass

  propTypes:
    onCompilerLoad: React.PropTypes.func.isRequired
    onSourceCompiled: React.PropTypes.func.isRequired
    onSourceFailed: React.PropTypes.func.isRequired

  getInitialState: ->
    backgroundColor: '#222'

  handleMouseEnter: ->
    @state.editor.focus()

  _getEditorNode: ->
    @refs.ace.getDOMNode()

  componentWillReceiveProps: (nextProps) ->
    if nextProps.focus
      @state.editor.focus()

  componentDidMount: ->
    editor = ace.edit @_getEditorNode()
    editor.setTheme "ace/theme/cobalt"
    editor.session.setMode 'ace/mode/coffee'
    editor.setHighlightActiveLine true
    editor.session.setTabSize 2
    editor.setShowPrintMargin false

    # editor.session.on 'change', @onSourceChanged

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

  render: ->
    _div
      className: 'areaBorder'
      style:
        backgroundColor: @state.backgroundColor
      onMouseEnter: @handleMouseEnter
      _div ref: 'ace', style: width: '100%', height: '300px'




