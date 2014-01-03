{_div, _pre} = hyper = require 'hyper'
$ = require 'ejquery'
ace = require 'ace/ace'


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

  componentDidUpdate: (prevProps, prevState, rootNode) ->
    $this = $ rootNode
    duration = $this.scrollTop() / 10
    $this.animate
      scrollTop: 0
    , duration

  render: ->
    _div className: 'output',
      for value in @props.values
        _pre style: 'max-width': @props.width - 45,
          value
