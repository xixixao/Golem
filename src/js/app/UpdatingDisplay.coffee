{_div, _pre} = hyper = require 'hyper'

React = require 'React'
jsDump = require 'vendor/jsDump'

module.exports = hyper class UpdatingDisplay

  parseValue: (value) ->
    _pre {},
      if not value?
        "Nothing"
      else if typeof value is 'function'
        value.toString()
      else
        jsDump.parse value

  runSource: ->
    try
      result = eval @props.compiledSource + @props.compiledExpression
      @parseValue result
    catch error
      "Runtime Error: #{error}"

  render: ->
    _div id: @props.key, key: @props.key, className: 'log', style: 'max-width': @props.maxWidth,
      _div @props.expression
      _div @runSource()
