{_div, _p, _table, _tbody, _tr, _td, _code, _b} = require 'hyper'

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


_KeyboardShortcutsList = hyper class KeyboardShortcutsList
  shouldList: (command, name) ->
    command.bindKey and command.document isnt no and /\s/.test name

  highlight: (name) ->
    name.replace /([A-Z])/g, "<u>$1</u>"

  shortcut: (command) ->
    platform = @props.platform
    command.logicalKey?[platform] or command.bindKey[platform]

  render: ->
    _table _tbody {},
      for name, command of @props.commands when @shouldList command, name
        _tr key: name,
          _td
            style: verticalAlign: 'top',
            "#{@shortcut command} "
          _td
            style: verticalAlign: 'top'
            dangerouslySetInnerHTML: __html: @highlight name

class ListKeyboardShortcutsCommand
  @defaultSymbols = ['keys']
  @description = 'List editing keyboard shortcuts'
  @symbols = @defaultSymbols

  @execute = (args, state, editor) ->
    editor.log _KeyboardShortcutsList
      commands: state.mode.editor.commands.commands
      platform: state.mode.editor.commands.platform

module.exports = [ListKeyboardShortcutsCommand]
