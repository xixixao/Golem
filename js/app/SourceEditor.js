define(function (require, exports, module) {
  var __filename = module.uri || "", __dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1);
  var $, Memory, React, SetIntervalMixin, SourceEditor, UndoManager, ace, hyper, _div, _require;

React = require('React');

_div = (hyper = require('hyper'))._div;

$ = require('ejquery');

UndoManager = require('ace/undomanager');

ace = require('./AceEditor');

Memory = require('./Memory');

SetIntervalMixin = require('./SetIntervalMixin');

_require = require;

module.exports = hyper(SourceEditor = (function() {
  function SourceEditor() {}

  SourceEditor.prototype.load = function(_arg) {
    var moduleName, scroll, selection, session, value, _base;
    value = _arg.value, selection = _arg.selection, moduleName = _arg.moduleName, scroll = _arg.scroll;
    session = this.editor.session;
    if (session.getUndoManager().execute) {
      this.undoStore[this.props.module.moduleName] = session.getUndoManager();
    }
    session.setUndoManager(session.$defaultUndoManager);
    session.getMode().setContent(value, selection, moduleName);
    session.setUndoManager(this.undoStore[moduleName] || (typeof (_base = session.getMode()).createUndoManager === "function" ? _base.createUndoManager() : void 0) || new UndoManager);
    if (scroll) {
      session.setScrollTop(scroll.top);
      return session.setScrollLeft(scroll.left);
    }
  };

  SourceEditor.prototype.serializedModule = function() {
    return {
      value: this.editor.getValue(),
      mode: 'teascript',
      selection: this.editor.getSelectionRange(),
      cursor: this.editor.getCursorPosition(),
      scroll: {
        top: this.editor.session.getScrollTop(),
        left: this.editor.session.getScrollLeft()
      }
    };
  };

  SourceEditor.prototype.mode = function() {
    return this.editor.session.getMode();
  };

  SourceEditor.prototype.forceResize = function() {
    return this.editor.resize();
  };

  SourceEditor.prototype.getInitialState = function() {
    return {
      backgroundColor: '#222'
    };
  };

  SourceEditor.prototype.handleMouseEnter = function() {
    this.editor.focus();
    return this.props.onFocus();
  };

  SourceEditor.prototype._getEditorNode = function() {
    return this.refs.ace.getDOMNode();
  };

  SourceEditor.prototype.componentWillReceiveProps = function(_arg) {
    var focus, module;
    focus = _arg.focus, module = _arg.module;
    if (focus && !this.props.focus) {
      this.editor.focus();
    }
    if (module && module.moduleName !== this.props.module.moduleName) {
      return this.load(module);
    }
  };

  SourceEditor.prototype.componentDidMount = function() {
    var editor;
    this.editor = editor = ace.edit(this._getEditorNode(), this.props.mode, "ace/theme/tea");
    editor.setFontSize(13);
    editor.renderer.setScrollMargin(2, 2);
    editor.setHighlightActiveLine(false);
    editor.session.setTabSize(2);
    editor.setShowPrintMargin(false);
    editor.setOption('scrollPastEnd', true);
    this.undoStore = {};
    editor.session.on('change', (function(_this) {
      return function() {
        return _this.props.onChange();
      };
    })(this));
    editor.session.getSelection().on('changeSelection', (function(_this) {
      return function() {
        return _this.props.onChange();
      };
    })(this));
    editor.renderer.on('themeLoaded', (function(_this) {
      return function() {
        return _this.setState({
          backgroundColor: $(_this._getEditorNode()).css('background-color')
        });
      };
    })(this));
    editor.commands.addCommand({
      name: 'leave',
      bindKey: {
        win: 'Esc',
        mac: 'Esc'
      },
      exec: this.props.onLeave
    });
    this.load(this.props.module);
    return window.addEventListener('resize', (function(_this) {
      return function() {
        return _this.editor.resize();
      };
    })(this));
  };

  SourceEditor.prototype.render = function() {
    return _div({
      className: 'areaBorder',
      style: {
        backgroundColor: this.state.backgroundColor,
        paddingLeft: 0,
        paddingRight: 20
      },
      onMouseEnter: this.handleMouseEnter
    }, _div({
      ref: 'ace',
      style: {
        width: '100%',
        height: this.props.height
      }
    }));
  };

  return SourceEditor;

})());

});
