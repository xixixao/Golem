React = require 'React'
{_div} = require 'hyper'

_AdjustableColumns = require './AdjustableColumns'

# module.exports = React.createClass

#   render: ->
#     _div {},
#       _div
#         _commandLine
#         _compilationIndicator to: 0,
#           '&middot;'
#         _message {},
#           @state.message
#         _sourceEditor
#       _MovableDivider()
#       _div
#         @state.logs

_Test = React.createClass

  render: ->
    _AdjustableColumns left: 500,
      "Blabla lb"
      "Dum dum"

React.renderComponent (
  _Test()
), document.getElementById 'test'
