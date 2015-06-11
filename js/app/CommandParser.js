define(function (require, exports, module) {
  var __filename = module.uri || "", __dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1);
  var __slice = [].slice;

module.exports = function(input) {
  var args, symbol, _ref;
  _ref = input.split(/\s+/), symbol = _ref[0], args = 2 <= _ref.length ? __slice.call(_ref, 1) : [];
  return [symbol, args];
};

});
