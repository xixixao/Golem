{_div, _p, _table, _tr, _td, _code} = require 'hyper'

class HelpCommand
  @defaultSymbols = ['help', 'h']
  @description = 'Show the list of available commands'
  @symbols = @defaultSymbols

  @execute = (args, state, editor) ->
    header = _div {},
      "Issue commands by typing"
      _code ' : '
      "followed by command name and space separated arguments"

    table = _table {},
      for command in state.commands
        _tr {},
          _td [].concat ([(_code symbol), ' '] for symbol in command.symbols)
          _td command.description

    editor.log _div header, table

module.exports = [HelpCommand]
