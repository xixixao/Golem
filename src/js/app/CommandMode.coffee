ace          = require("ace/ace")
oop          = require("ace/lib/oop")
EventEmitter = require("ace/lib/event_emitter").EventEmitter

{Mode} = require 'compilers/teascript/mode'

AdaptingWorkerClient = require './AdaptingWorkerClient'

module.exports = class CommandMode extends Mode
  constructor: (@id, completers) ->
    super yes
    @completers = completers

    @commandMode = no

    superTokenizer = @$tokenizer

    @$tokenizer = getLineTokens: (line, state, row, doc) =>
      if line[0] isnt ':'
        @enableSuper() if @commandMode
        superTokenizer.getLineTokens line, state, row, doc
      else
        @disableSuper() if line is ":" and not @commandMode
        # @clearEditingMarker()
        tokens: [value: line, type: 'text']
    oop.implement @$tokenizer, EventEmitter

  disableSuper: ->
    @editor.moveCursorToPosition row: 0, column: 1
    @editor.commands.removeCommands @commands
    @commandMode = yes

  enableSuper: ->
    @editor.commands.addCommands @commands
    @commandMode = no

  # Overrides source mode to not create another worker
  createWorker: (session) ->

  registerWithWorker: (workerClient) ->
    @worker = new AdaptingWorkerClient workerClient, @id
    # Attach to document for recompilation on change
    @worker.attachToDocument @editor.session.getDocument()
    @worker

  updateWorker: (shouldExecute) ->
    @worker.call 'setValue', [@editor.session.getDocument().getValue()]
    @worker.call 'onUpdate', [shouldExecute]

  addCommands: ->
    super
    @editor.commands.addCommands
      'insertstring': # This is the default unhandled command name
        multiSelectAction: 'forEach'
        scrollIntoView: 'cursor'
        autocomplete: yes
        exec: (editor, string) =>
          if @isInCommandMode() or @isEmpty()  and (string is ':')
            @editor.insert string
            return yes

          @insertStringForward string

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
