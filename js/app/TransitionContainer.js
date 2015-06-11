define(function (require, exports, module) {
  var __filename = module.uri || "", __dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1);
  var TransitionContainer, hyper, merge, _span;

_span = (hyper = require('hyper'))._span;

merge = function(a, b) {
  var k, merged, v;
  merged = {};
  for (k in a) {
    v = a[k];
    merged[k] = v;
  }
  for (k in b) {
    v = b[k];
    merged[k] = v;
  }
  return merged;
};

module.exports = hyper(TransitionContainer = (function() {
  function TransitionContainer() {}

  TransitionContainer.prototype.componentWillReceiveProps = function(nextProps) {
    if (!nextProps.children && this.props.children) {
      this.savedChildren = this.props.children;
      return this.savedStyle = this.props.on;
    }
  };

  TransitionContainer.prototype.render = function() {
    var component, style;
    style = this.props.children ? this.props.on : merge(this.savedStyle, this.props.off);
    component = this.props.component || _span;
    return component({
      style: style
    }, this.props.children || this.savedChildren);
  };

  return TransitionContainer;

})());

});
