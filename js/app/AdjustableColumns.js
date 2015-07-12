define(function (require, exports, module) {
  var __filename = module.uri || "", __dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1);
  var $, AdjustableColumns, React, hyper, _div;

React = require('React');

_div = (hyper = require('hyper'))._div;

$ = require('ejquery');

module.exports = hyper(AdjustableColumns = (function() {
  function AdjustableColumns() {}

  AdjustableColumns.prototype.propTypes = {
    leftColumnWidth: React.PropTypes.number.isRequired,
    dividerWidth: React.PropTypes.number.isRequired
  };

  AdjustableColumns.prototype.getInitialState = function() {
    return {
      leftColumnWidth: this.props.leftColumnWidth
    };
  };

  AdjustableColumns.prototype.componentWillReceiveProps = function(nextProps) {
    return {
      leftColumnWidth: nextProps.leftColumnWidth
    };
  };

  AdjustableColumns.prototype._getRighColumnWidth = function(leftWidth) {
    return this.state.width - (leftWidth + this.props.dividerWidth);
  };

  AdjustableColumns.prototype.handleDividerDrag = function(newWidth) {
    if (newWidth > 10 && (this._getRighColumnWidth(newWidth)) > 10) {
      this.setState({
        leftColumnWidth: newWidth
      });
      return this.props.onResize();
    }
  };

  AdjustableColumns.prototype.windowResized = function() {
    return this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  };

  AdjustableColumns.prototype.componentDidMount = function() {
    window.addEventListener('resize', this.windowResized);
    this.windowResized();
    return $(this.refs.divider.getDOMNode()).draggable({
      axis: 'x',
      drag: (function(_this) {
        return function(e, ui) {
          _this.handleDividerDrag(ui.offset.left);
          return ui.position = ui.originalPosition;
        };
      })(this)
    });
  };

  AdjustableColumns.prototype.render = function() {
    var rightColumnWidth;
    rightColumnWidth = this._getRighColumnWidth(this.state.leftColumnWidth);
    return _div({}, _div({
      style: {
        float: 'left',
        width: this.state.leftColumnWidth - 1,
        height: this.state.height,
        overflow: 'hidden'
      }
    }, this.props.children[0]), _div({
      ref: 'divider',
      onDrag: this.handleDividerDrag,
      style: {
        float: 'left',
        width: this.props.dividerWidth,
        height: this.state.height,
        cursor: 'col-resize'
      }
    }, this.props.children[1]), _div({
      style: {
        float: 'left',
        width: rightColumnWidth,
        height: this.state.height
      }
    }, this.props.children[2]));
  };

  return AdjustableColumns;

})());

});
