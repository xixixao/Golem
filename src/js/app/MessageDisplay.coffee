{_div} = hyper = require 'hyper'
$ = require 'ejquery'
ace = require 'ace/ace'

module.exports = hyper class MessageDisplay

  display: (type, message) ->
    @setState
      type: type
      message: message
      opacity: 1
      transition: 'opacity .2s ease-in'

  hide: (types...) ->
    if @state.type in types
      @setState
        type: null
        oldType: @state.type
        opacity: 0
        transition: 'opacity .7s ease-out'

  getInitialState: ->
    opacity: 1

  _getColor: ->
    switch @state.type or @state.oldType
      when 'compiler', 'runtime', 'command' then '#CC3E1E'
      when 'file', 'info' then  '#3E6EcC'

  render: ->
    _div
      style:
        overflow: 'hidden'
        height: 13
        padding: '7px 10px'
        'font-size': 13
        color: @_getColor()
        opacity: @state.opacity
        transition: @state.transition
      @state.message
