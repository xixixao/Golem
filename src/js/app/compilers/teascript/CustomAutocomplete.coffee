ace          = require("ace/ace")
Autocomplete = require("ace/autocomplete").Autocomplete

module.exports = class CustomAutocomplete extends Autocomplete
  constructor: ->
    delete @commands['Return']
    delete @commands['Shift-Return']
    super
