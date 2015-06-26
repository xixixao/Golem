{_div, _input} = hyper = require 'hyper'

React = require 'React'
cx = React.addons.classSet

module.exports = hyper class OutputDisplay

  componentDidUpdate: (prevProps, prevState) ->
    if @props.focus
      @refs.fakeInput.getDOMNode().focus()

  handleKeyPress: (e) ->
    console.log "key press"
    switch e.key
      when 'Backspace'
        @props.onDelete @props.key, @props.position
        e.preventDefault()
      when 'ArrowRight', 'Tab'
        @props.onFocusSibling @props.position, 1
        e.preventDefault()
      when 'ArrowLeft'
        @props.onFocusSibling @props.position, -1
        e.preventDefault()

  handleClick: (e) ->
    if e.target is @getDOMNode()
      @props.onFocusSibling @props.position, 0
    else
      @props.onRemoveFocus()

  render: ->
    _div
      id: @props.outputId
      className: cx
        log: yes
        selected: @props.focus
      style:
        maxWidth: @props.width
        cursor: 'pointer'
      onClick: @handleClick
      _div
        style:
          overflow: 'hidden'
          height: 0
          width: 0
        _input
          ref: 'fakeInput'
          style:
            outline: 'none'
          onKeyDown: @handleKeyPress
      _div
        style:
          cursor: 'auto'
        dangerouslySetInnerHTML: if @props.html then __html: @props.html else undefined
        @props.children
