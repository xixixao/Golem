{_div} = hyper = require 'hyper'
$ = require 'ejquery'
ace = require 'ace/ace'

module.exports = hyper class MessageDisplay

  _getColor: ->
    switch @props.type
      when 'compiler', 'runtime', 'command' then '#CC3E1E'
      when 'file', 'info' then  '#3E6EcC'

  componentWillReceiveProps: (nextProps) ->
    $this = $(@.getDOMNode())
    if nextProps.hideTypes and @props.type in nextProps.hideTypes
      $this.fadeOut 700
    if nextProps.type
      $this.stop(true, true).fadeIn 200

  render: ->
    _div
      style:
        overflow: 'hidden'
        height: 13
        padding: '7px 10px'
        'font-size': 13
        color: @_getColor()
      @props.value
