{_div, _input} = hyper = require 'hyper'

React = require 'React'
cx = React.addons.classSet

module.exports = hyper class OutputDisplay

  componentDidUpdate: (prevProps, prevState) ->
    if @props.focus
      @refs.fakeInput.getDOMNode().focus()

  handleKeyPress: (e) ->
    switch e.key
      when 'Backspace'
        @props.onDelete @props.key, @props.position
        e.preventDefault()

  render: ->
    _div
      id: @props.key
      key: @props.key
      className: cx
        log: yes
        selected: @props.focus
      style:
        'max-width': @props.width
      _div
        style:
          overflow: 'hidden'
          height: 0
        _input
          ref: 'fakeInput'
          style:
            outline: 'none'
          onKeyDown: @handleKeyPress
      _div
        dangerouslySetInnerHTML: if @props.html then __html: @props.html else undefined
        @props.children
