React = require 'React'
{_div} = require 'hyper'
$ = require 'ejquery'

module.exports = React.createClass

  getInitialState: ->
    height: window.innerHeight

  windowResized: ->
    @setState
      height: window.innerHeight

  componentDidMount: ->
    window.addEventListener 'resize', @windowResized

  componentDidUpdate: (prevProps, prevState, rootNode) ->
    $lastChild = $(rootNode).children().last()
    $lastChild.css height: prevState.height - $lastChild.offset().top - 40

  render: ->
    _div style: padding: '15px 5px 5px 15px',
      @props.children
