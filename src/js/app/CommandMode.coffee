ace          = require("ace/ace")
oop          = require("ace/lib/oop")
EventEmitter = require("ace/lib/event_emitter").EventEmitter

{Mode} = require 'compilers/teascript/mode'

AdaptingWorkerClient = require './AdaptingWorkerClient'

# The default "mode" must be the super mode, so that normal editing commands
# work if the command line is empty
module.exports = class CommandMode extends Mode
  constructor: (@id, completers) ->
    super yes
    @completers = completers

    @isSuperDisabled = no

    superTokenizer = @$tokenizer

    @$tokenizer = getLineTokens: (line, state, row, doc) =>
      if line[0] isnt ':'
        @enableSuper() if @isSuperDisabled
        superTokenizer.getLineTokens line, state, row, doc
      else
        @disableSuper() if not @isSuperDisabled
        # @clearEditingMarker()
        tokens: [value: line, type: 'text']
    oop.implement @$tokenizer, EventEmitter

  disableSuper: ->
    @editor.clearSelection()
    @editor.moveCursorToPosition row: 0, column: @getValue().length
    @editor.commands.removeCommands @commands
    @isSuperDisabled = yes

  enableSuper: ->
    @addCommands()
    @isSuperDisabled = no

  resetEditing: ->
    if @isInCommandMode()
      @editor.setValue ""
      @initAst ''
      @enableSuper()
    else
      @setContent ""

  # Overrides source mode to not create another worker
  createWorker: (session) ->

  registerWithWorker: (workerClient) ->
    @worker = new AdaptingWorkerClient workerClient, @id
    # Attach to document for recompilation on change
    @worker.attachToDocument @editor.session.getDocument()
    @worker

  updateWorker: (shouldExecute) ->
    @worker.$sendDeltaQueue() # Flush pending changes so they don't overwrite the below
    @worker.call 'setValue', [@editor.session.getDocument().getValue()]
    @worker.call 'onUpdate', [shouldExecute]

  parseOnlyWorker: (isTopLevel) ->
    @worker.call 'parseOnly', [isTopLevel]

  addCommands: ->
    super
    @editor.commands.addCommands
      'insertstring': # This is the default unhandled command name
        multiSelectAction: 'forEach'
        scrollIntoView: 'cursor'
        autocomplete: yes
        exec: (editor, string) =>
          if @isInCommandMode() or @isEmpty() and (string is ':')
            @editor.insert string
            return yes

          @insertStringForward string
      'initial space inserts colon':
        bindKey: win: 'Space', mac: 'Space'
        exec: =>
          if @isEmpty()
            @editor.commands.exec "insertstring", @editor, ':'
          else
            @editor.commands.exec 'add new sibling expression', @editor

  doAutocomplete: (e) ->
    if @isInCommandMode()
      if e?.command.autocomplete and @getValue()[-1..] is ' ' and not @isAutocompleting()
        @openAutocomplete()
    else
      return if @isEmpty()
      super

  handleEnter: ->
    if @isAutocompleting()
      @editor.completer.insertMatch()

  isInCommandMode: ->
    @getValue()[0] is ':'

  isEmpty: ->
    @getValue() is ''

  getValue: ->
    @editor.getValue()
