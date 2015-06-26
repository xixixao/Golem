React = require 'React'
{_div} = hyper = require 'hyper'
$ = require 'ejquery'

module.exports = hyper class AdjustableColumns

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
    if newWidth > 10 and (@_getRighColumnWidth newWidth) > 10
      @setState
        leftColumnWidth: newWidth
      @props.onResize()


  windowResized: ->
    @setState
      width: window.innerWidth
      height: window.innerHeight

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
          float: 'left'
          width: @state.leftColumnWidth - 1
          height: @state.height
          overflow: 'hidden'
        @props.children[0]
      _div
        ref: 'divider'
        onDrag: @handleDividerDrag
        style:
          float: 'left'
          width: @props.dividerWidth
          height: @state.height,
          cursor: 'col-resize'
        @props.children[1]
      _div
        style:
          float: 'left'
          width: rightColumnWidth
          height: @state.height
        @props.children[2]
