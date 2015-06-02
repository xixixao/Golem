{_span} = hyper = require 'hyper'

merge = (a, b) ->
  merged = {}
  for k, v of a
    merged[k] = v
  for k, v of b
    merged[k] = v
  merged

module.exports = hyper class TransitionContainer

  componentWillReceiveProps: (nextProps) ->
    if !nextProps.children && @props.children
      @savedChildren = @props.children
      @savedStyle = @props.on

  render: ->
    style =
      if @props.children
        @props.on
      else
        merge @savedStyle, @props.off

    component = @props.component || _span

    component style: style,
      @props.children || this.savedChildren
