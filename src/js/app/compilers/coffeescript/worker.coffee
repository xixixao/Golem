coffee = require("ace/mode/coffee/coffee-script")
Mirror = require("ace/worker/mirror").Mirror
oop = require("ace/lib/oop")

window.addEventListener = ->

exports.Worker = class extends Mirror
  constructor: (sender) ->
    super sender
    @setTimeout 250

  onUpdate: ->
    value = @doc.getValue()
    try
      coffee.parse(value).compile()
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
    @sender.emit "ok"

