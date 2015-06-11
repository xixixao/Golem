define(function (require, exports, module) {
  var __filename = module.uri || "", __dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1);
  var $, React, _div;

React = require('React');

_div = require('hyper')._div;

$ = require('ejquery');

module.exports = React.createClass({
  propTypes: {
    leftColumnWidth: React.PropTypes.number.isRequired,
    dividerWidth: React.PropTypes.number.isRequired
  },
  getInitialState: function() {
    return {
      leftColumnWidth: this.props.leftColumnWidth
    };
  },
  componentWillReceiveProps: function(nextProps) {
    return {
      leftColumnWidth: nextProps.leftColumnWidth
    };
  },
  _getRighColumnWidth: function(leftWidth) {
    return this.state.width - (leftWidth + this.props.dividerWidth);
  },
  handleDividerDrag: function(newWidth) {
    if (newWidth > 20 && (this._getRighColumnWidth(newWidth)) > 20) {
      this.setState({
        leftColumnWidth: newWidth
      });
      return this.props.onResize();
    }
  },
  windowResized: function() {
    return this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  },
  componentDidMount: function() {
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
  },
  render: function() {
    var rightColumnWidth;
    rightColumnWidth = this._getRighColumnWidth(this.state.leftColumnWidth);
    return _div({}, _div({
      style: {
        float: 'left',
        width: this.state.leftColumnWidth - 1,
        height: this.state.height
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
  }
});

});
