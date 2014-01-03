React = require 'React'
{_div} = require 'hyper'
$ = require 'ejquery'
ace = require 'ace/ace'

module.exports = React.createClass

  # propTypes:
  #   leftColumnWidth: React.PropTypes.number.isRequired
  #   dividerWidth: React.PropTypes.number.isRequired

  getInitialState: ->
    backgroundColor: '#222'

  # componentWillReceiveProps: (nextProps) ->
  #   leftColumnWidth: nextProps.leftColumnWidth

  # _getRighColumnWidth: (leftWidth) ->
  #   @state.width - (leftWidth + @props.dividerWidth)

  # handleDividerDrag: (newWidth) ->
  #   if newWidth > 20 and (@_getRighColumnWidth newWidth) > 20
  #     @setState
  #       leftColumnWidth: newWidth

  # windowResized: ->
  #   @setState
  #     height: window.innerHeight
  #     width: window.innerWidth

  # componentDidMount: ->
  #   window.addEventListener 'resize', @windowResized
  #   @windowResized()

  #   $(@refs.divider.getDOMNode()).draggable
  #     axis: 'x'
  #     drag: (e, ui) =>
  #       @handleDividerDrag ui.offset.left
  #       ui.position = ui.originalPosition

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
    editor.setHighlightActiveLine false
    editor.setShowPrintMargin false
    editor.renderer.setShowGutter false

    editor.renderer.on 'themeLoaded', =>
      @setState backgroundColor: $(@_getEditorNode()).css 'background-color'

    editor.commands.addCommand
      name: 'leave'
      bindKey: win: 'Esc', mac: 'Esc'
      exec: @props.onLeave

    @setState
      editor: editor

  render: ->
    # This wrapper is required for mouseEnter triggering
    _div onMouseEnter: @handleMouseEnter,
      _div
        className: 'areaBorder'
        style: backgroundColor: @state.backgroundColor,
        _div ref: 'ace', style: width: '100%', height: 17