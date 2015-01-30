WorkerClient = require("ace/worker/worker_client").WorkerClient

oop = require("ace/lib/oop")
EventEmitter = require("ace/lib/event_emitter").EventEmitter

module.exports =
  inherit: (Mode) ->

    class CommandMode extends Mode

      constructor: (@sourceModePath, memory) ->
        super yes, memory

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
            @clearEditingMarker()
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

      createWorker: (session) ->
        @worker = new WorkerClient ["ace", "compilers", "app", "vendor"],
          "app/CommandWorker",
          "Worker",
          null,
          "#{@sourceModePath}/worker"

        @doc = session.getDocument()

        # Attach to document for recompilation on change
        @worker.attachToDocument @doc

        @worker

      prefixWorker: (source) ->
        @worker.call 'prefix', [source]

      updateWorker: ->
        @worker.call 'setValue', [@doc.getValue()]
        @worker.call 'onUpdate', [true]
