define(function (require, exports, module) {
  var __filename = module.uri || "", __dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1);
  var Autocomplete, CustomAutocomplete, ace,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ace = require("ace/ace");

Autocomplete = require("ace/autocomplete").Autocomplete;

module.exports = CustomAutocomplete = (function(_super) {
  __extends(CustomAutocomplete, _super);

  function CustomAutocomplete(enableReturn) {
    if (!enableReturn) {
      delete this.commands['Return'];
    }
    delete this.commands['Shift-Return'];
    delete this.commands['Space'];
    CustomAutocomplete.__super__.constructor.apply(this, arguments);
  }

  return CustomAutocomplete;

})(Autocomplete);

});
