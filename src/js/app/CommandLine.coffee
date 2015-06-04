React = require 'React'
{_div} = hyper = require 'hyper'

$ = require 'ejquery'
ace = require './AceEditor'

CommandMode = require './CommandMode'
# _require = require # Otherwise the require packager would fail

module.exports = hyper class CommandLine

  propTypes:
    timeline: React.PropTypes.object.isRequired
    onCommandExecution: React.PropTypes.func.isRequired
    onCommandCompiled: React.PropTypes.func.isRequired
    onCommandFailed: React.PropTypes.func.isRequired

  getInitialState: ->
    backgroundColor: '#222'

  handleMouseEnter: ->
    @editor.focus()
    @props.onFocus()

  _getEditorNode: ->
    @refs.ace.getDOMNode()

  componentWillReceiveProps: ({focus, moduleName, updatedSource}) ->
    if focus
      @editor.focus()
    else
      $('input').blur()

    if updatedSource isnt @props.updatedSource
      @editor.session.getMode().updateWorker no

    @editor.session.getMode().reportModuleName moduleName

  componentDidMount: ->
    mode = new CommandMode "COMMAND_LINE", @props.completers
    @editor = editor = ace.edit @_getEditorNode(), mode, "ace/theme/tea"
    editor.setFontSize 13
    editor.renderer.setScrollMargin 2, 2
    editor.setHighlightActiveLine false
    editor.setShowPrintMargin false
    editor.renderer.setShowGutter false
    mode.registerWithWorker @props.worker
    mode.setContent "", null, @props.moduleName

    editor.renderer.on 'themeLoaded', =>
      @setState backgroundColor: $(@_getEditorNode()).css 'background-color'

    editor.commands.addCommand
      name: 'execute'
      bindKey: win: 'Enter', mac: 'Enter'
      exec: =>
        mode.handleEnter()
        mode.updateWorker yes

    timeline = @props.timeline

    editor.commands.addCommand
      name: 'previous'
      bindKey: win: 'Up', mac: 'Up'
      exec: ->
        timeline.temp editor.getValue() unless timeline.isInPast()
        mode.setContent timeline.goBack()

    editor.commands.addCommand
      name: 'following'
      bindKey: win: 'Down', mac: 'Down'
      exec: ->
        mode.setContent timeline.goForward() if timeline.isInPast()

    editor.commands.addCommand
      name: 'leave'
      bindKey: win: 'Esc', mac: 'Esc'
      exec: @props.onLeave

    editor.commands.addCommand
      name: 'jump to output'
      bindKey: win: 'Tab', mac: 'Tab'
      exec: =>
        @props.onFocusOutput 0


    commandWorker = mode.worker
    @props.memory.loadCommands timeline

    # CommandWorker compiles either on change or on enter
    commandWorker.on 'ok', ({data: {result, type, commandSource}}) =>
      source = editor.getValue()
      # console.log "received ok from command worker"

      # Extract the last but one node from the compound tree
      # The compound tree will have
      #          (source nodes..., commandExpression)
      if source is commandSource #TODO: investigate why these get out of sync
        if type in ['execute', 'command']
          if source.length > 0
            timeline.push source
            if type isnt 'command'
              mode.removeContent ""
            mode.resetEditing()
            @props.onCommandExecution source, @props.moduleName, result, type
            @props.memory.saveCommands timeline
          else
            @props.onCommandCompiled()
        else
          mode.updateAst result.ast
          @props.onCommandCompiled()

    commandWorker.on 'error', ({data: {text}}) =>
      console.log "command line error", text
      @props.onCommandFailed text


  render: ->
    # This wrapper is required for mouseEnter triggering
    _div onMouseEnter: @handleMouseEnter,
      _div
        className: 'areaBorder'
        style: backgroundColor: @state.backgroundColor,
        _div ref: 'ace', style: width: '100%', height: 23