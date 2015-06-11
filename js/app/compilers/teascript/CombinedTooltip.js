define(function (require, exports, module) {
  var __filename = module.uri || "", __dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1);
  var CombinedTooltip, TokenTooltip, ace,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ace = require("ace/ace");

TokenTooltip = require("ace/token-tooltip").TokenTooltip;

module.exports = CombinedTooltip = (function(_super) {
  __extends(CombinedTooltip, _super);

  function CombinedTooltip() {
    return CombinedTooltip.__super__.constructor.apply(this, arguments);
  }

  CombinedTooltip.prototype.getTokenAt = function(_arg) {
    var column, id, marker, markers, row, _i, _ref;
    row = _arg.row, column = _arg.column;
    markers = this.editor.session.getMarkers(true);
    _ref = (function() {
      var _results;
      _results = [];
      for (id in markers) {
        marker = markers[id];
        _results.push(marker);
      }
      return _results;
    })();
    for (_i = _ref.length - 1; _i >= 0; _i += -1) {
      marker = _ref[_i];
      if (marker.range.contains(row, column)) {
        return marker;
      }
    }
    return this.editor.session.getMode().getTokenAt({
      row: row,
      column: column
    });
  };

  return CombinedTooltip;

})(TokenTooltip);

});
