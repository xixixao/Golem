define(function (require, exports, module) {
  var __filename = module.uri || "", __dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1);
  var $, OutputDisplay, React, ace, cx, hyper, jsDump, _OutputBox, _UpdatingDisplay, _div, _input, _pre, _ref;

_ref = hyper = require('hyper'), _div = _ref._div, _pre = _ref._pre, _input = _ref._input;

React = require('React');

cx = React.addons.classSet;

$ = require('ejquery');

ace = require('ace/ace');

jsDump = require('vendor/jsDump');

_OutputBox = require('./OutputBox');

_UpdatingDisplay = require('./UpdatingDisplay');

module.exports = hyper(OutputDisplay = (function() {
  function OutputDisplay() {}

  OutputDisplay.prototype.windowResized = function() {
    return this.setState({
      height: window.innerHeight
    });
  };

  OutputDisplay.prototype.componentWillMount = function() {
    window.addEventListener('resize', this.windowResized);
    return this.windowResized();
  };

  OutputDisplay.prototype.componentDidUpdate = function(_arg, prevState) {
    var $this, duration, logs, _ref1, _ref2;
    logs = _arg.logs;
    if (logs.length !== this.props.logs.length && ((_ref1 = logs[0]) != null ? _ref1[0] : void 0) !== ((_ref2 = this.props.logs[0]) != null ? _ref2[0] : void 0)) {
      $this = $(this.getDOMNode());
      duration = $this.scrollTop() / 10;
      return $this.animate({
        scrollTop: 0
      }, duration);
    }
  };

  OutputDisplay.prototype.handleDelete = function(id, position) {
    if (this.numBoxes() === 1) {
      this.props.onRemoveFocus();
    } else {
      this.props.onFocusOutput(Math.min(this.numBoxes() - 2, position));
    }
    return this.props.onDelete(id);
  };

  OutputDisplay.prototype.handleFocusSibling = function(position, offset) {
    return this.props.onFocusOutput(Math.max(0, Math.min(position + offset, this.numBoxes() - 1)));
  };

  OutputDisplay.prototype.handleRemoveFocus = function() {
    return this.props.onRemoveFocus();
  };

  OutputDisplay.prototype.numBoxes = function() {
    return this.props.logs.length;
  };

  OutputDisplay.prototype.parseValue = function(value) {
    if (typeof value === 'function') {
      return _pre(value.toString());
    } else {
      return _pre(jsDump.parse(value));
    }
  };

  OutputDisplay.prototype.render = function() {
    var ast, compiled, i, isBareReact, isHtml, isSourceLine, key, source, value;
    return _div({
      className: 'output',
      style: {
        height: this.state.height - 25,
        padding: '15px 20px 10px 0px',
        overflow: 'auto'
      }
    }, (function() {
      var _i, _len, _ref1, _ref2, _results;
      _ref1 = this.props.logs;
      _results = [];
      for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
        _ref2 = _ref1[i], key = _ref2[0], value = _ref2[1];
        isBareReact = React.isValidComponent(value);
        isSourceLine = value.source;
        isHtml = !isBareReact && !isSourceLine;
        _results.push(_OutputBox({
          id: key,
          key: key,
          position: i,
          focus: this.props.focus && i === this.props.focusedOutputIndex,
          width: this.props.width - 45,
          html: isHtml ? value : void 0,
          onDelete: this.handleDelete,
          onFocusSibling: this.handleFocusSibling,
          onRemoveFocus: this.handleRemoveFocus
        }, isBareReact ? value : isSourceLine ? ((source = value.source, ast = value.ast, compiled = value.compiled, value), _UpdatingDisplay({
          key: key,
          value: value,
          worker: this.props.worker,
          completers: this.props.completers,
          updatedSource: this.props.updatedSource,
          maxWidth: this.props.width - 45,
          onCommand: this.props.onCommand
        })) : void 0));
      }
      return _results;
    }).call(this));
  };

  return OutputDisplay;

})());

});
