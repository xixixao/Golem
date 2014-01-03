React = require 'React'
{_div} = require 'hyper'
$ = require 'ejquery'

module.exports = React.createClass

  propTypes:
    leftColumnWidth: React.PropTypes.number.isRequired
    dividerWidth: React.PropTypes.number.isRequired

  getInitialState: ->
    leftColumnWidth: @props.leftColumnWidth

  componentWillReceiveProps: (nextProps) ->
    leftColumnWidth: nextProps.leftColumnWidth

  _getRighColumnWidth: (leftWidth) ->
    @state.width - (leftWidth + @props.dividerWidth)

  handleDividerDrag: (newWidth) ->
    if newWidth > 20 and (@_getRighColumnWidth newWidth) > 20
      @setState
        leftColumnWidth: newWidth

  windowResized: ->
    @setState
      height: window.innerHeight
      width: window.innerWidth

  componentDidMount: ->
    window.addEventListener 'resize', @windowResized
    @windowResized()

    $(@refs.divider.getDOMNode()).draggable
      axis: 'x'
      drag: (e, ui) =>
        @handleDividerDrag ui.offset.left
        ui.position = ui.originalPosition

  render: ->
    rightColumnWidth = @_getRighColumnWidth @state.leftColumnWidth
    _div {},
      _div
        style:
          float: 'left', width: @state.leftColumnWidth - 1, height: @state.height
        @props.children[0]
      _div
        ref: 'divider'
        onDrag: @handleDividerDrag
        style:
          float: 'left', width: @props.dividerWidth, height: @state.height,
          cursor: 'col-resize'
        @props.children[1]
      _div
        style:
          float: 'left', width: rightColumnWidth, height: @state.height
        @props.children[2]
