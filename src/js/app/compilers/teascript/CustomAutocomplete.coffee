ace          = require("ace/ace")
Autocomplete = require("ace/autocomplete").Autocomplete

module.exports = class CustomAutocomplete extends Autocomplete
  constructor: (enableReturn) ->
    delete @commands['Return'] if not enableReturn
    delete @commands['Shift-Return']
    delete @commands['Space']
    super

  detach: ->
    super
    if this.popup
      this.popup.renderer.scrollBarV.setScrollTop 0
