{_div, _p, _table, _tbody, _tr, _td, _code} = require 'hyper'

class SwitchModeCommand
  @defaultSymbols = ['mode']
  @description = 'Switch to a different compiler'
  @symbols = @defaultSymbols

  @execute = ([name], state, editor) ->
    modeId = state.modes.getId name
    if modeId
      editor.refs.sourceEditor.setMode modeId
    else
      editor.logAscii "Wrong mode name, choose from:\n\n#{modesList()}"
    {}

class ListModesCommand
  @defaultSymbols = ['modes', 'm']
  @description = 'List all available modes'
  @symbols = @defaultSymbols

  @execute = (args, state, editor) ->
    currentMode = editor.refs.sourceEditor.mode
    table = _table _tbody {},
      state.modes.getAll().map ({id, name}) ->
        _tr {},
          _td if id is currentMode then '>'
          _td name

    editor.log table



module.exports = [SwitchModeCommand, ListModesCommand]
