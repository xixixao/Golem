define(function (require, exports, module) {
  var __filename = module.uri || "", __dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1);
  var $, MessageDisplay, React, ReactTransitionGroup, ace, hyper, _TransitionContainer, _div, _ref, _span;

_ref = hyper = require('hyper'), _div = _ref._div, _span = _ref._span;

$ = require('ejquery');

ace = require('ace/ace');

React = require('React');

ReactTransitionGroup = React.addons.TransitionGroup;

_TransitionContainer = require('./TransitionContainer');

module.exports = hyper(MessageDisplay = (function() {
  function MessageDisplay() {}

  MessageDisplay.prototype._getColor = function() {
    switch (this.props.message.type) {
      case 'compiler':
      case 'runtime':
      case 'command':
        return '#880000';
      case 'file':
      case 'info':
        return '#3E6EcC';
    }
  };

  MessageDisplay.prototype.render = function() {
    return _div({
      style: {
        overflow: 'hidden',
        height: 13,
        padding: '7px 10px',
        'font-size': '13px'
      }
    }, _TransitionContainer({
      on: {
        opacity: 1,
        transition: 'opacity .2s ease-out',
        color: this._getColor()
      },
      off: {
        opacity: 0,
        transition: 'opacity .2s ease-in'
      }
    }, _span({
      className: 'messageDisplay',
      dangerouslySetInnerHTML: {
        __html: this.props.message.value
      }
    })));
  };

  return MessageDisplay;

})());

});
