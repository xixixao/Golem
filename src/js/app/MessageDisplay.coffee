{_div, _span} = hyper = require 'hyper'
$ = require 'ejquery'
ace = require 'ace/ace'

React = require 'React'
ReactTransitionGroup = React.addons.TransitionGroup
_TransitionContainer = require './TransitionContainer'

module.exports = hyper class MessageDisplay

  _getColor: ->
    switch @props.message.type
      when 'compiler', 'runtime', 'command' then '#880000'
      when 'file', 'info' then  '#3E6EcC'

  render: ->
    _div
      style:
        overflow: 'hidden'
        height: 13
        padding: '7px 10px'
        'font-size': 13
        'font-family': 'Helvetica, Arial, sans-serif'
      _TransitionContainer
        on:
          opacity: 1
          transition: 'opacity .2s ease-out'
          color: @_getColor()
        off:
          opacity: 0
          transition: 'opacity .2s ease-in'
        _span
          className: 'messageDisplay'
          dangerouslySetInnerHTML: __html: @props.message.value
