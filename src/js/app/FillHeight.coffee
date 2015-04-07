React = require 'React'
{_div} = require 'hyper'
$ = require 'ejquery'

module.exports = React.createClass

  windowResized: ->
    windowHeight = window.innerHeight
    $lastChild = $(@getDOMNode()).children().last()
    lastChild = @props.children[@props.children.length - 1]

    @props.onResize windowHeight - $lastChild.offset().top - 20

  componentDidMount: (rootNode) ->
    window.addEventListener 'resize', @windowResized
    @windowResized()

  render: ->
    _div style: padding: '1px 5px 0px 0px',
      @props.children
