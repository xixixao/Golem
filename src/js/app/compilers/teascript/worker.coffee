Mirror = require("ace/worker/mirror").Mirror
compiler = require "./compiler"

window.addEventListener = ->

exports.Worker = class extends Mirror
  constructor: (sender) ->
    super sender
    @setTimeout 250

    @compiler = compiler

    # @sender.on 'prefix', ({data: {data: @prefix}}) =>

  onUpdate: ->
    value = @doc.getValue()
    try
      @sender.emit "ok",
        result:
          compiler.compileTopLevel value
    catch e
      # loc = e.location
      # if loc
      #   @sender.emit "error",
      #     row: loc.first_line
      #     column: loc.first_column
      #     endRow: loc.last_line
      #     endColumn: loc.last_column
      #     text: e.message
      #     type: "error"
      @sender.emit "error",
        text: e.message
        type: 'error'
      return
