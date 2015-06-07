ace          = require("ace/ace")
TokenTooltip = require("ace/token-tooltip").TokenTooltip

# Shows based on token or front error marker
module.exports = class CombinedTooltip extends TokenTooltip
  getTokenAt: ({row, column}) ->
    markers = @editor.session.getMarkers yes#front
    for marker in (marker for id, marker of markers) by -1
      if marker.range.contains row, column
        return marker
    @editor.session.getMode().getTokenAt {row, column}