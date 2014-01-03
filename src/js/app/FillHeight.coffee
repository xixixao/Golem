React = require 'React'
{_div} = require 'hyper'
$ = require 'ejquery'

module.exports = React.createClass

  windowResized: ->
    windowHeight = window.innerHeight
    $lastChild = $(@getDOMNode()).children().last()
    lastChild = @props.children[@props.children.length - 1]

    @props.onResize windowHeight - $lastChild.offset().top - 40

  componentDidMount: (rootNode) ->
    window.addEventListener 'resize', @windowResized
    @windowResized()

  render: ->
    _div style: padding: '15px 5px 5px 15px',
      @props.children
