AdaptingWorkerClient = require './AdaptingWorkerClient'

oop = require("ace/lib/oop")
EventEmitter = require("ace/lib/event_emitter").EventEmitter

{Mode} = require 'compilers/teascript/mode'

module.exports =
  class CommandMode extends Mode
    constructor: (@id) ->
      super yes

      @commandMode = no

      superTokenizer = @$tokenizer

      @disablingCommands =
        'disable up':
          bindKey: win: 'Up', mac: 'Up'
          exec: =>

        'disable down':
          bindKey: win: 'Down', mac: 'Down'
          exec: =>

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
      @editor.commands.addCommands @disablingCommands
      @commandMode = yes

    enableSuper: ->
      @editor.commands.addCommands @commands
      @editor.commands.removeCommands @disablingCommands
      @commandMode = no

    # Overrides source mode to not create another worker
    createWorker: (session) ->

    registerWithWorker: (workerClient) ->
      @worker = new AdaptingWorkerClient workerClient, @id
      # Attach to document for recompilation on change
      @worker.attachToDocument @editor.session.getDocument()
      @worker

    updateWorker: ->
      @worker.call 'setValue', [@editor.session.getDocument().getValue()]
      @worker.call 'onUpdate', [true]
