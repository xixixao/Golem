{_div, _p, _table, _tbody, _tr, _td, _code} = require 'hyper'

_ModeBrowser = hyper class ModeBrowser
  render: ->
    _table _tbody {},
      @props.modes.map ({id, name}) =>
        _tr {},
          _td if id is @props.current then '>'
          _td name

class SwitchModeCommand
  @defaultSymbols = ['mode']
  @description = 'Switch to a different compiler'
  @symbols = @defaultSymbols

  @execute = ([name], state, editor) ->
    modeId = state.modes.getId name
    if modeId
      editor.refs.sourceEditor.setMode modeId
    else
      editor.log _div {},
        "Wrong mode name, choose from:",
        _ModeBrowser modes: state.modes.getAll()
    {}

class ListModesCommand
  @defaultSymbols = ['modes', 'm']
  @description = 'List all available modes'
  @symbols = @defaultSymbols

  @execute = (args, state, editor) ->
    editor.log _ModeBrowser
      modes: state.modes.getAll()
      current: editor.refs.sourceEditor.mode

module.exports = [SwitchModeCommand, ListModesCommand]
