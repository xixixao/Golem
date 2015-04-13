Mirror = require("ace/worker/mirror").Mirror
oop = window.require("ace/lib/oop");
EventEmitter = require("ace/lib/event_emitter").EventEmitter

compiler = require "./compiler"

window.addEventListener = ->

# Must be kept in this export form for correct loading by Ace
exports.Worker = class extends Mirror
  constructor: (sender) ->
    super sender
    @setTimeout 20 # Take over the scheduling from Mirror
    @compiler = compiler
    # @trigger = delay 700

  setModuleName: (@moduleName) ->

  compileModule: (value, moduleName) ->
    console.log  "compiling module", moduleName
    cacheModule compiler.compileTopLevel, value, moduleName
    @compile()

  onUpdate: ->
    # @trigger @compile
    @compile()

  compile: =>
    console.log "compiling", @moduleName

    @sourceCompiled = true
    value = @doc.getValue()
    try
      result = cacheModule compiler.compileTopLevel, value, @moduleName
      if result.request
        @sender.emit "request", moduleName: result.request
      else
        @sender.emit "ok",
          result: result
          source: value
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
      console.log e.stack
      @sender.emit "error",
        text: e.message
        type: 'error'
        source: value
      return

  matchingDefinitions: (reference, id) ->
    defs = compiler.findMatchingDefinitions @moduleName, reference
    @sender.callback defs, id


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

class ExpressionWorker extends exports.Worker
  constructor: (sender) ->
    super sender

  onUpdate: (execute) ->
    value = @doc.getValue()

    if value[0] is ':'
      if execute
        @sender.emit "ok",
          result: value[1..]
          commandSource : value
          type: 'command'
    else
      try
        console.log "expression worker compiling", @moduleName
        @sender.emit "ok",
          type: (if execute then 'execute' else 'normal')
          commandSource: value
          result:
            cacheModule @compiler.compileExpression, value, @moduleName

      catch e
        console.log e.stack
        @sender.emit "error",
          text: e.message
          type: 'error'
          commandSource: value
        return

cache = {}

cacheModule = (fn, source, moduleName) ->
  if (old = cache[moduleName])?.source is source
    console.log "#{moduleName} was cached."
    old.result
  else
    result = fn source, moduleName
    if not result.request
      cache[moduleName] =
        source: source
        result: result
    result

# Sender with specific id for duplicate workers
class Sender
  constructor: (@id) ->
    oop.implement this, EventEmitter

  callback: (data, callbackId) ->
    postMessage
      type: "call"
      identifier: @id
      id: callbackId
      data: data

  emit: (name, data) ->
    postMessage
      type: "event"
      identifier: @id
      name: name
      data: data

# Map of workers, excluding the original main worker
workers = {}
inheritedOnMessage = window.onmessage

# This overrides the default handler from ace/worker/worker.js
window.onmessage = (e) ->
  msg = e.data
  main = window.main
  sender = window.sender
  id = msg.identifier

  # check sender for global worker initialization
  if sender and id
    if not worker = workers[id]
      worker = workers[id] = new ExpressionWorker new Sender id
    if msg.command
      if worker[msg.command]
        worker[msg.command].apply(worker, msg.args)
      else
          throw new Error("Unknown command:" + msg.command)
    else if msg.event
      worker.sender._signal(msg.event, msg.data)
  else
    inheritedOnMessage e
