module.exports =
  componentWillMount: ->
    @intervals = []

  setInterval: (args...) ->
    @intervals.push setInterval args...

  componentWillUnmount: ->
    @intervals.map clearInterval
