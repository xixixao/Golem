class EraseCommand
  @defaultSymbols = ['erase', 'e']
  @description = 'Clear all results'
  @symbols = @defaultSymbols

  @execute = (args, state, editor) ->
    editor.setState
      logs: []

module.exports = [EraseCommand]
