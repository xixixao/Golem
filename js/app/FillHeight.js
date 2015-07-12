define(function (require, exports, module) {
  var __filename = module.uri || "", __dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1);
  var $, FillHeight, React, hyper, _div;

React = require('React');

_div = (hyper = require('hyper'))._div;

$ = require('ejquery');

module.exports = hyper(FillHeight = (function() {
  function FillHeight() {}

  FillHeight.prototype.windowResized = function() {
    var $lastChild, lastChild, windowHeight;
    windowHeight = window.innerHeight;
    $lastChild = $(this.getDOMNode()).children().last();
    lastChild = this.props.children[this.props.children.length - 1];
    return this.props.onResize(windowHeight - $lastChild.offset().top - 40);
  };

  FillHeight.prototype.componentDidMount = function(rootNode) {
    window.addEventListener('resize', this.windowResized);
    return this.windowResized();
  };

  FillHeight.prototype.render = function() {
    return _div({
      style: {
        padding: '15px 5px 5px 15px'
      }
    }, this.props.children);
  };

  return FillHeight;

})());

});
