{_span} = hyper = require 'hyper'


module.exports = hyper class TransitionContainer

  componentWillReceiveProps: (nextProps) ->
    if !nextProps.children && @props.children
      @savedChildren = @props.children
      @savedStyle = @props.on

  render: ->
    if @props.children
      style = @props.on
    else
      style = Object.merge @savedStyle, @props.off

    component = @props.component || _span

    component
      style:
        style
      @props.children || this.savedChildren
