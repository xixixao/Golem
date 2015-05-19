{_div, _pre, _input} = hyper = require 'hyper'

React = require 'React'
cx = React.addons.classSet
$ = require 'ejquery'
ace = require 'ace/ace'
jsDump = require 'vendor/jsDump'

_OutputBox = require './OutputBox'
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

  windowResized: ->
    @setState
      height: window.innerHeight

  componentWillMount: ->
    window.addEventListener 'resize', @windowResized
    @windowResized()

  componentDidUpdate: ({logs}, prevState) ->
    if logs.length isnt @props.logs.length and logs[0]?[0] isnt @props.logs[0]?[0]
      $this = $ @getDOMNode()
      duration = $this.scrollTop() / 10
      $this.animate
        scrollTop: 0
      , duration

  handleDelete: (id, position) ->
    if @numBoxes() is 1
      @props.onRemoveFocus()
    else
      @props.onFocusOutput Math.min(@numBoxes() - 2, position)
    @props.onDelete id

  handleFocusSibling: (position, offset) ->
    @props.onFocusOutput Math.max 0, Math.min position + offset, @numBoxes() - 1

  handleRemoveFocus: ->
    @props.onRemoveFocus()

  numBoxes: ->
    @props.logs.length

  parseValue: (value) ->
    if typeof value is 'function'
      _pre value.toString()
    else
      _pre jsDump.parse value

  render: ->
    _div
      className: 'output'
      style:
        height: @state.height - 25
        padding: '15px 20px 10px 0px'
        overflow: 'auto'
      for [key, value], i in @props.logs
        isBareReact = React.isValidComponent value
        isSourceLine = value.source
        isHtml = not isBareReact and not isSourceLine
        _OutputBox
          id: key
          key: key
          position: i
          focus: @props.focus and i is @props.focusedOutputIndex
          width: @props.width - 45
          html: if isHtml then value else undefined
          onDelete: @handleDelete
          onFocusSibling: @handleFocusSibling
          onRemoveFocus: @handleRemoveFocus
          if isBareReact
            value
          else if isSourceLine
            {source, ast, compiled} = value
            _UpdatingDisplay
              key: key
              value: value
              worker: @props.worker
              completers: @props.completers
              updatedSource: @props.updatedSource
              maxWidth: @props.width - 45
              onCommand: @props.onCommand
