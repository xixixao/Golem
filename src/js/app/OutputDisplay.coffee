{_div, _pre} = hyper = require 'hyper'

React = require 'React'
cx = React.addons.classSet
$ = require 'ejquery'
ace = require 'ace/ace'
jsDump = require 'vendor/jsDump'

_UpdatingDisplay = require './UpdatingDisplay'


# addMessage = (text, id) ->
#   tag = if id?
#     " data-id=#{id}"
#   else
#     ""
#   newMessage = $("<pre#{tag}>#{text}</pre>")
#   $("#output").prepend newMessage
#   setMaxPreWidth newMessage

# eraseMessages = (except...) ->
#   excepts = join ", ", except
#   $("#output").children().not ->
#     $(this).find(excepts).size() > 0
#   .remove()

# getMessage = (n) ->
#   $("#output pre").eq n

# getCurrentMessage = ->
#   getMessage 0

# setCurrentMessage = (text, id) ->
#   getCurrentMessage().text(text).data "id", id

# isCurrentMessage = (id) ->
#   getCurrentMessage().data("id") is id


# outputScrollTop = ->
#   $("#rightColumn").animate
#     scrollTop: 0
#   , $("#rightColumn").scrollTop() / 10

module.exports = hyper class OutputDisplay

  getInitialState: ->
    focusedOutput: undefined

  windowResized: ->
    @setState
      height: window.innerHeight

  componentWillMount: ->
    window.addEventListener 'resize', @windowResized
    @windowResized()

  componentWillReceiveProps: ({focus}) ->
    if focus and not @state.focusedOutput?
      @setState focusedOutput: 0

  componentDidUpdate: (prevProps, prevState) ->
    $this = $ @getDOMNode()
    duration = $this.scrollTop() / 10
    $this.animate
      scrollTop: 0
    , duration

  parseValue: (value) ->
    if typeof value is 'function'
      _pre value.toString()
    else
      _pre jsDump.parse value

  singleDisplay: (key, isSelected, value) ->
    _div
      id: key
      key: key
      className: cx
        log: yes
        selected: isSelected
      dangerouslySetInnerHTML: __html: value
      style:
        'max-width': @props.width - 45

  singleReactDisplay: (key, isSelected, value) ->
    _div
      id: key
      key: key
      className: cx
        log: yes
        selected: isSelected
      style:
        'max-width': @props.width - 45
      value

  render: ->
    _div
      className: 'output'
      style:
        height: @state.height - 25
        padding: '15px 20px 10px 0px'
        overflow: 'auto'
      for [key, value], i in @props.logs
        isSelected = @props.focus and i is @state.focusedOutput
        if React.isValidComponent value
          @singleReactDisplay key, isSelected, value
        else if value.source
          {source, compiled} = value
          _UpdatingDisplay
            key: key
            focus: isSelected
            expression: source
            compiledExpression: compiled
            compiledSource: @props.compiledSource
            maxWidth: @props.width - 45
            onCommand: @props.onCommand
        else
          @singleDisplay key, isSelected, value

