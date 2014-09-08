Mirror = require("ace/worker/mirror").Mirror
compiler = require "./compiler"

window.addEventListener = ->

exports.Worker = class extends Mirror
  constructor: (sender, @isSource) ->
    super sender
    @setTimeout 250

  onUpdate: ->
    value = @doc.getValue()
    try
      @sender.emit "ok",
        result: if @isSource
            compiler.compile value
          else
            compiler.compileExp value

    catch e
      loc = e.location
      if loc
        @sender.emit "error",
          row: loc.first_line
          column: loc.first_column
          endRow: loc.last_line
          endColumn: loc.last_column
          text: e.message
          type: "error"
      return
