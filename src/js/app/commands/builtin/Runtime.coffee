{_div} = hyper = require 'hyper'
beautify = (require 'beautify').js_beautify
{highlight} = hljs = (require 'hljs')

ifCompiled = (state, editor, fn) ->
    # TODO: compile if not autocompiling
    # compileCode() unless state.compiledJs
    if state.compiledJs
      fn()
    else
      editor.displayMessage 'compiler', "Fix: '#{state.message.value}' first"

format = (js) ->
  beautify js, indent_size: 2

highlight = (js) ->
  (hljs.highlight 'javascript', js).value

stripImports = (js) ->
  js.replace /^(.|\n)*var (\w+) = Shem\.\w+\.\2;\n/, ''
    .replace /^(.|\n)*'use strict'\n/, '' # for Prelude
    .replace /\nreturn \{[^\}]*\};\n\}\(\)\);$/, ''

addLineNumbers = (text) ->
  (for line, i in text.split '\n'
    "<span class='unselectableText' style='color: #555;'>#{i}  </span>#{line}"
    ).join '\n'

_CodeDump = hyper class CodeDump
  getInitialState: ->
    compiledJs:
      @props.initialCompiledJs

  componentWillMount: ->
    if 'once' not in @props.modifiers
      @props.mode.worker.on 'ok', ({data: {result, type, commandSource}}) =>
        if result.js
          @setState
            compiledJs: result.js

  render: ->
    text =
      if 'module' in @props.modifiers
        @state.compiledJs
      else
        stripImports @state.compiledJs
    _div
      dangerouslySetInnerHTML:
        __html: addLineNumbers highlight format text


class DumpCommand
  @defaultSymbols = ['dump', 'd']
  @description = 'Log generated JavaScript'
  @symbols = @defaultSymbols

  @execute = (modifiers, state, editor) ->
    ifCompiled state, editor, ->
      editor.log _CodeDump
        initialCompiledJs: state.compiledJs
        mode: state.mode
        modifiers: modifiers

class BuildCommand
  @defaultSymbols = ['build']
  @description = 'Build the project and JavaScript'
  @symbols = @defaultSymbols

  @execute = (args, state, editor) ->
    # TODO: add full output and line numbers
    # ("#{i} #{line}" for line, i in state.compiledJs.split('\n')).join '\n'
    ifCompiled state, editor, ->
      state.mode.worker.call 'compileBuild', [state.module.moduleName], (compiled) ->
        if editor.memory.writeBuilt
          editor.memory.writeBuilt compiled.js
          editor.displayMessage 'file', "Build saved to index.js"
        else
          editor.logResult highlight format compiled.js

# TODO: support toggling auto compile
# class RunCommand
#   @defaultSymbols = ['run', 'r']
#   @description = 'Run just the source code'
#   @symbols = @defaultSymbols

#   @execute = (args, state, editor) ->
#     ifCompiled state, editor, ->
#       editor.logResult editor.execute state.compiledJs

module.exports = [DumpCommand, BuildCommand]
