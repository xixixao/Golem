define ->

  class UniqueTimeLine
    class El
      constructor: (@e, @next, @prev) ->
        @prev?.next = this
        @next?.prev = this

      remove: ->
        [@prev.next, @next.prev] = [@next, @prev]

    constructor: ->
      @length = 0
      @head = new El
      @elems = new El
      @head.prev = @elems
      @elems.next = @head
      @now = @head
      @set = {}
      @temporary = null

    push: (e) ->
      nn = new El(e, @head, @head.prev)
      n = @set[e]
      if n?
        n.remove()
      else
        @length++
      @set[e] = nn
      @goNewest()

    temp: (e) ->
      @temporary = e
      @goNewest()

    goBack: ->
      @now = @now.prev if @now.prev.e?
      @curr()

    goForward: ->
      res = @curr()
      @now = @now.next if @now.e?
      @curr()

    goOldest: ->
      @now = @elems.next
      @curr()

    goNewest: ->
      @now = @head
      @curr()

    isInPast: ->
      @now != @head

    curr: ->
      if @now == @head then @temporary
      else @now.e

    newest: (count) ->
      n = @head
      res = []
      for i in [0...count]
        if e = n.prev.e
          res.push e
          n = n.prev
        else
          break
      res.reverse()

    from: (arr) ->
      for e in arr
        @push e
      @goNewest()

    size: ->
      @length