React = require 'React'
{_div} = require 'hyper'
$ = require 'ejquery'

_MovableDivider = require './MovableDivider'

module.exports = React.createClass

  getDefaultProps: ->
    leftColumnWidth: 400
    dividerWidth: 20

  getInitialState: ->
    leftColumnWidth: @props.leftColumnWidth

  handleDividerDrag: (newWidth) ->
    @setState
      leftColumnWidth: newWidth

  windowResized: ->
    @setState
      height: window.innerHeight
      width: window.innerWidth

  componentDidMount: ->
    window.addEventListener 'resize', @windowResized
    @windowResized()

  render: ->
    rightColumnWidth = @state.width - (@state.leftColumnWidth + @props.dividerWidth)
    _div {},
      _div
        style:
          float: 'left', width: @state.leftColumnWidth, height: @state.height, background: "blue",
        @props.children[0]
      _MovableDivider
        onDrag: @handleDividerDrag
        style:
          float: 'left', width: @props.dividerWidth, height: @state.height, background: "red"
      _div
        style:
          float: 'left', width: rightColumnWidth, height: @state.height, background: "green",
        @props.children[1]
