ifCompiled = (state, editor, fn) ->
    # TODO: compile if not autocompiling
    # compileCode() unless state.compiledJs
    if state.compiledJs
      fn()
    else
      editor.displayMessage 'compiler', "Fix: '#{state.message.value}' first"

class DumpCommand
  @defaultSymbols = ['dump', 'd']
  @description = 'Log generated JavaScript'
  @symbols = @defaultSymbols

  @execute = (args, state, editor) ->
    ifCompiled state, editor, ->
      console.log state.compiledJs
      editor.logResult state.compiledJs

class RunCommand
  @defaultSymbols = ['run', 'r']
  @description = 'Run just the source code'
  @symbols = @defaultSymbols

  @execute = (args, state, editor) ->
    ifCompiled state, editor, ->
      editor.logResult editor.execute state.compiledJs

module.exports = [DumpCommand, RunCommand]
