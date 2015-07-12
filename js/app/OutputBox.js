define(function (require, exports, module) {
  var __filename = module.uri || "", __dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1);
  var OutputDisplay, React, cx, hyper, _div, _input, _ref;

_ref = hyper = require('hyper'), _div = _ref._div, _input = _ref._input;

React = require('React');

cx = React.addons.classSet;

module.exports = hyper(OutputDisplay = (function() {
  function OutputDisplay() {}

  OutputDisplay.prototype.componentDidUpdate = function(prevProps, prevState) {
    if (this.props.focus) {
      return this.refs.fakeInput.getDOMNode().focus();
    }
  };

  OutputDisplay.prototype.handleKeyPress = function(e) {
    switch (e.key) {
      case 'Backspace':
        this.props.onDelete(this.props.outputId, this.props.position);
        return e.preventDefault();
      case 'ArrowRight':
      case 'Tab':
        this.props.onFocusSibling(this.props.position, 1);
        return e.preventDefault();
      case 'ArrowLeft':
        this.props.onFocusSibling(this.props.position, -1);
        return e.preventDefault();
    }
  };

  OutputDisplay.prototype.handleClick = function(e) {
    if (e.target === this.getDOMNode()) {
      return this.props.onFocusSibling(this.props.position, 0);
    } else {
      return this.props.onRemoveFocus();
    }
  };

  OutputDisplay.prototype.render = function() {
    return _div({
      id: this.props.outputId,
      className: cx({
        log: true,
        selected: this.props.focus
      }),
      style: {
        maxWidth: this.props.width,
        cursor: 'pointer'
      },
      onClick: this.handleClick
    }, _div({
      style: {
        overflow: 'hidden',
        height: 0,
        width: 0
      }
    }, _input({
      ref: 'fakeInput',
      style: {
        outline: 'none'
      },
      onKeyDown: this.handleKeyPress
    })), _div({
      style: {
        cursor: 'auto'
      },
      dangerouslySetInnerHTML: this.props.html ? {
        __html: this.props.html
      } : void 0
    }, this.props.children));
  };

  return OutputDisplay;

})());

});
