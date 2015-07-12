define(function (require, exports, module) {
  var __filename = module.uri || "", __dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1);
  var Modes, modes;

modes = [
  {
    id: 'coffeescript',
    name: 'CoffeeScript'
  }, {
    id: 'teascript',
    name: 'TeaScript'
  }
];

module.exports = Modes = (function() {
  function Modes() {}

  Modes.getName = function(someId) {
    var id, name, _i, _len, _ref;
    for (_i = 0, _len = modes.length; _i < _len; _i++) {
      _ref = modes[_i], id = _ref.id, name = _ref.name;
      if (id === someId) {
        return name;
      }
    }
  };

  Modes.getId = function(someName) {
    var id, name, _i, _len, _ref;
    for (_i = 0, _len = modes.length; _i < _len; _i++) {
      _ref = modes[_i], id = _ref.id, name = _ref.name;
      if (name === someName) {
        return id;
      }
    }
  };

  Modes.getAll = function() {
    return modes;
  };

  return Modes;

})();

});
