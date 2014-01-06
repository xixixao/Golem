class EraseCommand
  @defaultSymbols = ['erase', 'e']
  @description = 'Clear all results'
  @symbols = @defaultSymbols

  @execute = (args, state) ->
    logs: []

module.exports = [EraseCommand]
