{_div, _p, _table, _tr, _td, _code} = require 'hyper'

module.exports = class HelpCommand
  @defaultSymbols = ['help', 'h']
  @description = 'Show the list of available commands'
  @symbols = @defaultSymbols

  @execute = (args, state) ->
    header = _p {},
      "Issue commands by typing"
      _code ' : '
      "followed by space separated commands"

    table = _table {},
      for command in state.commands
        _tr {},
          _td (_code symbol for symbol in command.symbols)
          _td command.description

    logs: [_div header, table].concat state.logs
