{_div, _pre, _span} = hyper = require 'hyper'

React = require 'React'
cx = React.addons.classSet
ace = require './AceEditor'
jsDump = require 'vendor/jsDump'

CommandMode = require './CommandMode'
{Mode} = require 'compilers/teascript/mode'
compiler = require 'compilers/teascript/compiler'

module.exports = hyper class UpdatingDisplay

  getInitialState: ->
    compiled: undefined
    source: @props.value.source

  parseValue: (value) ->
    _pre dangerouslySetInnerHTML: __html:
      if not value?
        "Nothing"
      else if typeof value is 'function'
        value.toString()
      else
        dumped = jsDump.parse value
        if dumped.html
          dumped.html
        else
          compiler.syntaxedExpHtml dumped

  runSource: (compiled = @props.value.compiled) ->
    if @shouldRun
      @cached =
        if compiled instanceof Error
          @displayError compiled
        else
          try
            # result = eval @props.compiledSource + @props.compiledExpression
            # console.log compiled
            result = eval compiled
            @parseValue result
          catch error
            @displayError error, compiled
    else
      @cached

  displayError: (error, compiled) ->
    _div style: color: '#cc0000',
      _div "#{error}"
      _div "#{
        if error instanceof SyntaxError
          compiled
        else
          @formatStackTrace error.stack}"

  formatStackTrace: (trace = '') ->
    cutoff = compiler.builtInLibraryNumLines
    trace
      .replace /\n?(?:(\w+)[^>\n]+>[^>\n]+:(\d+:\d+)|.*)(?=\n)/g, (match, name, location) ->
        if (parseInt location) > cutoff
          "#{name} #{location}\n"
        else
          ""
      .replace /\n (?=\n)/g, ''

  handleCommand: (name) ->
    => @props.onCommand name, @editor

  componentDidMount: ->
    mode = new CommandMode @props.key, @props.completers
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
    mode.registerWithWorker @props.worker
    mode.setContent @props.value.source, null, @props.value.moduleName
    mode.updateAst @props.value.ast
    # mode.prefixWorker @props.source

    commandWorker = mode.worker

    editor.session.on 'change', =>
        @setState
          source: editor.getValue()

    # CommandWorker compiles either on change or on enter
    commandWorker.on 'ok', ({data: {result, type, commandSource}}) =>
      source = editor.getValue()

      # Extract the last but one node from the compound tree
      # The compound tree will have
      #          (source nodes..., commandExpression)
      if source is commandSource #TODO: investigate why these get out of sync
        if result.ast
          result.ast.splice 1, result.ast.length - 3
        mode.updateAst result.ast, result.errors

        if not result.malformed
          @setState
            compiled:
              if result.errors
                firstError = result.errors[0]
                new Error firstError.message or firstError
              else
                result.js

    commandWorker.on 'error', ({data: {text}}) =>
      console.log "updaitng display error", text
      @setState
        compiled: new Error text

    for name, command of mode.commands when command.indirect
      command.exec = @handleCommand name

  componentWillReceiveProps: ({updatedSource}) ->
    if updatedSource isnt @props.updatedSource
      @editor.session.getMode().updateWorker yes

  componentDidUpdate: ->
    @editor.resize()

  shouldComponentUpdate: (nextProps, {source, compiled}) ->
    compiled isnt @state.compiled or source isnt @state.source

  componentWillUpdate: (nextProps, {compiled}) ->
    @shouldRun = compiled isnt @state.compiled

  componentWillUnmount: ->
    @editor.completer?.detach()
    @editor.session.getMode().detach()

  render: ->
    # @i ?= 0
    _div {},
      _div ref: 'ace', style: width: '100%', height: 22
      # Hidden div for stretching width
      _div style: height: 0, margin: '0 4px', overflow: 'hidden', @state.source
      _div style: padding: '0 4px', @runSource @state.compiled
      # _div {}, @i++
