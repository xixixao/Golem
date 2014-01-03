React = require 'React'
{_div} = require 'hyper'

_AdjustableColumns = require './AdjustableColumns'
_SourceEditor = require './SourceEditor'
_CommandLine = require './CommandLine'
_FillHeight = require './FillHeight'
_MessageDisplay = require './MessageDisplay'

module.exports = React.createClass

  getInitialState: ->
    sourceEditorFocus: yes

  handleCommandLineLeave: ->
    @setState
      sourceEditorFocus: yes

  handleSourceEditorLeave: ->
    @setState
      sourceEditorFocus: no

  render: ->
    windowWidth = Math.floor window.innerWidth
    dividerWidth = 20

    _AdjustableColumns leftColumnWidth: (windowWidth - dividerWidth) / 2, dividerWidth: dividerWidth,
      _FillHeight {},
        _CommandLine
          onLeave: @handleCommandLineLeave
          focus: !@state.sourceEditorFocus
        # _compilationIndicator to: 0,
        #   '&middot;'
        _MessageDisplay type: 'file', value: 'File loaded'
        #   @state.message
        _SourceEditor
          onLeave: @handleSourceEditorLeave
          focus: @state.sourceEditorFocus
          onCompilerLoad: ->
      ''
      _div
        @state.logs

React.renderComponent (
  module.exports()
), document.getElementById 'test'
