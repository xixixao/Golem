{_div, _pre, _span} = hyper = require 'hyper'

React = require 'React'
cx = React.addons.classSet
ace = require 'ace/ace'
jsDump = require 'vendor/jsDump'

CommandMode = require './CommandMode'
{Mode} = require 'compilers/teascript/mode'
compiler = require 'compilers/teascript/compiler'

module.exports = hyper class UpdatingDisplay

  getInitialState: ->
    compiled: undefined

  parseValue: (value) ->
    _pre dangerouslySetInnerHTML: __html:
      if not value?
        "Nothing"
      else if typeof value is 'function'
        value.toString()
      else
        compiler.syntaxedExpHtml jsDump.parse @converFromImmutable value

  converFromImmutable: (value) ->
    if Immutable?.Iterable.isIterable value
      value.toJS()
    else
      value

  runSource: (compiled = @props.value.compiled) ->
    if compiled instanceof Error
      @displayError compiled
    try
      # result = eval @props.compiledSource + @props.compiledExpression
      result = eval compiled
      @parseValue result
    catch error
      @displayError error

  displayError: (error) ->
      _span style: color: '#cc0000',
        "#{error}"

  handleCommand: (name) ->
    => @props.onCommand name, @editor

  componentDidMount: ->
    # mode = new Mode yes
    console.log "setting id in UpdatingDisplay to", @props.key
    mode = new CommandMode @props.key
    @editor = editor = ace.edit @refs.ace.getDOMNode(), mode, "ace/theme/tea"
    editor.setFontSize 13
    editor.renderer.setScrollMargin 2, 2
    editor.setHighlightActiveLine false
    editor.session.setTabSize 2
    editor.setShowPrintMargin false
    editor.renderer.setShowGutter false
    # editor.setReadOnly true
    # editor.setValue @props.expression, 1
    # editor.moveCursorTo 0, 0
    mode.attachToSession editor.session
    mode.registerWithWorker @props.worker
    mode.setContent @props.value.source, null, @props.value.moduleName
    mode.updateAst @props.value.ast
    # mode.prefixWorker @props.source

    commandWorker = mode.worker

    # CommandWorker compiles either on change or on enter
    commandWorker.on 'ok', ({data: {result, type, commandSource}}) =>
      source = editor.getValue()

      # Extract the last but one node from the compound tree
      # The compound tree will have
      #          (source nodes..., commandExpression)
      if source is commandSource #TODO: investigate why these get out of sync
        if result.ast
          result.ast.splice 1, result.ast.length - 3
        mode.updateAst result.ast

        @setState
          compiled: result.js

    commandWorker.on 'error', ({data: {text}}) =>
      console.log "updaitng display error", text

    for name, command of mode.commands when command.indirect
      command.exec = @handleCommand name

  render: ->
    _div {},
      _div ref: 'ace', style: width: '100%', height: 22
      _div style: height: 0, margin: '0 4px', overflow: 'hidden', @props.value.source
      _div style: padding: '0 4px', @runSource @state.compiled
