Mirror = require("ace/worker/mirror").Mirror
compiler = require "./compiler"

window.addEventListener = ->

exports.Worker = class extends Mirror
  constructor: (sender) ->
    super sender
    @setTimeout 0 # Take over the scheduling from Mirror
    @compiler = compiler
    @trigger = delay 700
    # @sender.on 'prefix', ({data: {data: @prefix}}) =>

  setModuleName: (@moduleName) ->

  onUpdate: ->
    @trigger @compile

  compile: =>
    console.log  "compiling", @moduleName

    @sourceCompiled = true
    value = @doc.getValue()
    try
      @sender.emit "ok",
        result:
          compiler.compileTopLevel value, @moduleName
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


# Returns a function which runs given function maximally once during given
# duration.
delay = (duration) ->
  timeout = undefined
  ready = true
  reset = (executed, fn) -> ->
    ready = true
    if not executed
      fn()
  (fn, force = no) ->
    clearTimeout timeout if timeout?
    run = ready or force
    if run
      fn()
    timeout = setTimeout (reset run, fn), duration
    ready = false
