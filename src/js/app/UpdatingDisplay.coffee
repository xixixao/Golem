{_div, _pre, _span, _table, _tbody, _tr, _th, _td} = hyper = require 'hyper'

React = require 'React'
cx = require 'classnames'
ace = require './AceEditor'
jsDump = require 'vendor/jsDump'

CommandMode = require './CommandMode'
{Mode} = require 'compilers/teascript/mode'
compiler = require 'compilers/teascript/compiler'

isStrictSuffix = (suffix, string) ->
  suffix.length < string.length and
    (string.indexOf suffix, string.length - suffix.length) isnt -1

renderMany = (list) ->
  (React.renderToStaticMarkup x for x in list).join ''

module.exports = hyper class UpdatingDisplay

  getInitialState: ->
    source: @props.value.source

  parseValue: (value) ->

  runSource: (compiled, filePath) ->
    if compiled isnt @compiled
      @compiled = compiled
      @cached =
        try
          doLog = yes
          savedStacks = {}
          # result = eval @props.compiledSource + @props.compiledExpression
          # console.log compiled
          debugLog = (id, args...) =>
            expressions = args[0...args.length / 2]
            values = args[args.length / 2...]
            domId = "debug-log-#{id}"
            stack = ->
              try throw new Error "stack" catch e then ((e.stack.split '\n')[5...]).join('')

            valueRow = =>
              _tr dangerouslySetInnerHTML:
                __html:  renderMany ((_td style: paddingRight: '5px', @displayValue v) for v in values)

            newTable = =>
              _table
                id: domId
                'data-source-id': @timesExecuted
                _tbody {},
                  _tr ((_td
                    style:
                      paddingRight: '15px'
                      whiteSpace: 'pre-wrap'
                    dangerouslySetInnerHTML: __html: e) for e in expressions)
                  valueRow()

            if doLog
              newStack = stack()
              if table = window.document.getElementById domId
                if (table.getAttribute 'data-source-id') isnt "#{@timesExecuted}" or
                    not ((isStrictSuffix savedStacks[id], newStack) or
                      (isStrictSuffix newStack, savedStacks[id]))
                  table.parentNode.innerHTML = React.renderToString newTable()
                else
                  @timesLogged++
                  placeholder = window.document.createElement "div"
                  React.render (_table _tbody valueRow()), placeholder
                  if table.firstChild.lastChild.innerHTML isnt placeholder.firstChild.firstChild.firstChild.innerHTML
                    table.firstChild.appendChild placeholder.firstChild.firstChild.firstChild
                if @timesLogged > 1000
                  doLog = no
              else
                window.log newTable()
            savedStacks[id] = newStack
            [..., value] = values
            value
          @timesExecuted++
          @timesLogged = 0
          __filename = filePath
          __dirname = filePath and (requireNode 'path').dirname filePath
          result = do (require = requireNode) -> eval compiled
        catch error
          error.compiled = compiled
          error
    else
      @cached

  displayExecuted: (value) ->
    if not value?
      return null
    if value instanceof Error
      @displayError value
    else
      @displayValue value

  displayValue: (value) ->
    try
      _pre
        style: float: 'left'
        dangerouslySetInnerHTML: __html:
          if not value?
            "Nothing"
          else if typeof value is 'function'
            value.toString()
          else
            dumped = jsDump.parse value
            if dumped.html
              dumped.html
            else
              try
                compiler.syntaxedExpHtml dumped
              catch
                dumped
    catch e
      @displayError e

  displayError: (error) ->
    formatted = "#{
      if error instanceof SyntaxError
        error.compiled
      else
        @formatStackTrace error.stack}"
    _div
      className: 'messageDisplay'
      style:
        color: '#880000'
      _div dangerouslySetInnerHTML: __html: "#{error}"
      (_div formatted if not /^\s*$/.test formatted)

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
    mode = new CommandMode @props.outputId, @props.completers
    @editor = editor = ace.edit @refs.ace.getDOMNode(), mode, "ace/theme/tea"
    editor.setFontSize 13
    editor.renderer.setScrollMargin 2, 2
    editor.$blockScrolling = Infinity
    editor.setHighlightActiveLine false
    editor.session.setTabSize 2
    editor.setShowPrintMargin false
    editor.renderer.setShowGutter false
    editor.setOptions maxLines: Infinity
    # editor.setReadOnly true
    # editor.setValue @props.expression, 1
    # editor.moveCursorTo 0, 0
    mode.registerWithWorker @props.worker
    mode.setContent @props.value.source,
      null, @props.value.moduleName, @props.value.filePath
    mode.updateAst @props.value.ast
    # mode.prefixWorker @props.source

    commandWorker = mode.worker

    editor.session.on 'change', =>
        @setState
          source: editor.getValue()

    @timesExecuted = 0

    # CommandWorker compiles either on change or on enter
    commandWorker.on 'ok', ({data: {result, type, filePath, commandSource}}) =>
      source = editor.getValue()

      # Extract the last but one node from the compound tree
      # The compound tree will have
      #          (source nodes..., commandExpression)
      if source is commandSource #TODO: investigate why these get out of sync
        if result.ast
          result.ast.splice 1, result.ast.length - 3 #TODO: remove this hack, why are we validating like this?
        mode.updateAst result.ast, result.errors

        if not result.malformed
          executed =
            if result.errors
              firstError = result.errors[0]
              new Error firstError.message or firstError
            else
              # TODO: instead of setting __filename here let the compiler
              # properly set it up for each compiled module if running in Golem
              @runSource result.js, filePath
          @setState
            executed: executed

    commandWorker.on 'error', ({data: {text}}) =>
      @setState
        executed: new Error text

    for name, command of mode.commands when command.indirect
      command.exec = @handleCommand name

    # initialCompiled = @props.value.compiled
    # executed =
    #   if initialCompiled instanceof Error
    #     initialCompiled
    #   else
    #     @runSource initialCompiled
    # @setState
    #   executed: executed

  componentWillReceiveProps: ({updatedSource}) ->
    if updatedSource isnt @props.updatedSource
      @editor.session.getMode().updateWorker yes

  componentDidUpdate: ->
    @editor.resize()

  # shouldComponentUpdate: (nextProps, {source, compiled}) ->
  #   compiled isnt @state.compiled or source isnt @state.source

  # componentWillUpdate: (nextProps, {compiled}) ->
  #   @shouldRun = compiled isnt @state.compiled

  componentWillUnmount: ->
    @editor.completer?.detach()
    @editor.session.getMode().detach()
    @editor.destroy()

  render: ->
    # @i ?= 0
    _div {},
      _div ref: 'ace', style: width: '100%'#, height: 22
      # Hidden div for stretching width
      _div style: height: 0, margin: '0 4px', overflow: 'hidden', @state.source
      _div style: padding: '0 4px', @displayExecuted @state.executed
      # _div {}, @i++
