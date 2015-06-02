ifCompiled = (state, editor, fn) ->
    # TODO: compile if not autocompiling
    # compileCode() unless state.compiledJs
    if state.compiledJs
      fn()
    else
      editor.displayMessage 'compiler', "Fix: '#{state.message.value}' first"

stripImports = (js) ->
  js.replace /^(.|\n)*var (\w+) = Shem\.\w+\.\2;\n/, ''
    .replace /\nreturn \{[^\}]+\};\n\}\(\)\);$/, ''

class DumpCommand
  @defaultSymbols = ['dump', 'd']
  @description = 'Log generated JavaScript'
  @symbols = @defaultSymbols

  @execute = (args, state, editor) ->
    # TODO: add full output and line numbers
    # ("#{i} #{line}" for line, i in state.compiledJs.split('\n')).join '\n'
    ifCompiled state, editor, ->
      editor.logResult (stripImports state.compiledJs
        .replace /&/g,'&amp;'
        .replace /</g,'&lt;'
        .replace />/g,'&gt;')

# TODO: support toggling auto compile
# class RunCommand
#   @defaultSymbols = ['run', 'r']
#   @description = 'Run just the source code'
#   @symbols = @defaultSymbols

#   @execute = (args, state, editor) ->
#     ifCompiled state, editor, ->
#       editor.logResult editor.execute state.compiledJs

module.exports = [DumpCommand]
