define(function (require, exports, module) {
  var __filename = module.uri || "", __dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1);
  var __slice = [].slice;

module.exports = {
  componentWillMount: function() {
    return this.intervals = [];
  },
  setInterval: function() {
    var args;
    args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    return this.intervals.push(setInterval.apply(null, args));
  },
  componentWillUnmount: function() {
    return this.intervals.map(clearInterval);
  }
};

});
