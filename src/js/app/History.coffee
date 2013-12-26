# TODO: What is this for? I think it's for rewinding history
# I think the development broke in the middle of writing this
define ->
  class History
    constructor: ->
      @data = []

    add: (change) ->
      @data.push change

    print: (log) ->
      text = [""]

      for point in @data
        insert text, point.from, point.to, point.text
        log text

      return

    insert = (text, from, to, what) ->
      singleLine = from.line is to.line
      if singleLine
        curr = text[from.line]
        text[from.line] = curr[0...from.ch] + what[0] + curr[to.ch..]
      else
        text[from.line] = text[from.line][0...from.ch] + what[0]
        text[to.line] = what[what.length - 1] + text[to.line][to.ch..]

      newLines = what.length
      oldLines = 1 + to.line - from.line
      if newLines > 2 or oldLines > 2
        appended = if singleLine then what[1..] else what[1...-1]
        text[from.line + 1...Math.max(0, oldLines - newLines)] = appended

    merge: ->
