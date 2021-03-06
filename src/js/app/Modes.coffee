
modes = [
    id: 'coffeescript'
    name: 'CoffeeScript'
  ,
    id: 'teascript'
    name: 'TeaScript'
]

module.exports = class Modes
  @getName: (someId) ->
    return name for {id, name} in modes when id is someId

  @getId: (someName) ->
    return id for {id, name} in modes when name is someName

  @getAll: ->
    modes