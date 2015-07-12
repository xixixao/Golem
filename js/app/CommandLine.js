define(function (require, exports, module) {
  var __filename = module.uri || "", __dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1);
  var $, CommandLine, CommandMode, React, ace, hyper, _div;

React = require('React');

_div = (hyper = require('hyper'))._div;

$ = require('ejquery');

ace = require('./AceEditor');

CommandMode = require('./CommandMode');

module.exports = hyper(CommandLine = (function() {
  function CommandLine() {}

  CommandLine.prototype.propTypes = {
    timeline: React.PropTypes.object.isRequired,
    onCommandExecution: React.PropTypes.func.isRequired,
    onCommandCompiled: React.PropTypes.func.isRequired,
    onCommandFailed: React.PropTypes.func.isRequired
  };

  CommandLine.prototype.getInitialState = function() {
    return {
      backgroundColor: '#222'
    };
  };

  CommandLine.prototype.handleMouseEnter = function() {
    this.editor.focus();
    return this.props.onFocus();
  };

  CommandLine.prototype._getEditorNode = function() {
    return this.refs.ace.getDOMNode();
  };

  CommandLine.prototype.componentWillReceiveProps = function(_arg) {
    var focus, moduleName, updatedSource;
    focus = _arg.focus, moduleName = _arg.moduleName, updatedSource = _arg.updatedSource;
    if (focus) {
      this.editor.focus();
    } else {
      $('input').blur();
    }
    if (updatedSource !== this.props.updatedSource) {
      this.editor.session.getMode().updateWorker(false);
    }
    return this.editor.session.getMode().assignModuleName(moduleName);
  };

  CommandLine.prototype.componentDidMount = function() {
    var commandWorker, editor, mode, timeline;
    mode = new CommandMode("COMMAND_LINE", this.props.completers);
    this.editor = editor = ace.edit(this._getEditorNode(), mode, "ace/theme/tea");
    editor.setFontSize(13);
    editor.renderer.setScrollMargin(2, 2);
    editor.setHighlightActiveLine(false);
    editor.setShowPrintMargin(false);
    editor.renderer.setShowGutter(false);
    mode.registerWithWorker(this.props.worker);
    mode.setContent("", null, this.props.moduleName);
    editor.renderer.on('themeLoaded', (function(_this) {
      return function() {
        return _this.setState({
          backgroundColor: $(_this._getEditorNode()).css('background-color')
        });
      };
    })(this));
    editor.commands.addCommand({
      name: 'execute',
      bindKey: {
        win: 'Enter',
        mac: 'Enter'
      },
      exec: (function(_this) {
        return function() {
          mode.handleEnter();
          return mode.updateWorker(true);
        };
      })(this)
    });
    timeline = this.props.timeline;
    editor.commands.addCommand({
      name: 'previous',
      bindKey: {
        win: 'Up',
        mac: 'Up'
      },
      exec: function() {
        if (!timeline.isInPast()) {
          timeline.temp(editor.getValue());
        }
        return mode.setContent(timeline.goBack());
      }
    });
    editor.commands.addCommand({
      name: 'following',
      bindKey: {
        win: 'Down',
        mac: 'Down'
      },
      exec: function() {
        if (timeline.isInPast()) {
          return mode.setContent(timeline.goForward());
        }
      }
    });
    editor.commands.addCommand({
      name: 'leave',
      bindKey: {
        win: 'Esc',
        mac: 'Esc'
      },
      exec: this.props.onLeave
    });
    editor.commands.addCommand({
      name: 'jump to output',
      bindKey: {
        win: 'Tab',
        mac: 'Tab'
      },
      exec: (function(_this) {
        return function() {
          return _this.props.onFocusOutput(0);
        };
      })(this)
    });
    editor.commands.addCommand({
      name: 'erase all output',
      bindKey: {
        win: 'Ctrl-Shift-Backspace',
        mac: 'Command-Shift-Backspace'
      },
      exec: (function(_this) {
        return function() {
          return _this.props.onRemoveAll();
        };
      })(this)
    });
    commandWorker = mode.worker;
    this.props.memory.loadCommands(timeline);
    commandWorker.on('ok', (function(_this) {
      return function(_arg) {
        var commandSource, result, source, type, _ref;
        _ref = _arg.data, result = _ref.result, type = _ref.type, commandSource = _ref.commandSource;
        source = editor.getValue();
        if (source === commandSource) {
          if (type === 'execute' || type === 'command') {
            if (source.length > 0) {
              timeline.push(source);
              mode.resetEditing();
              _this.props.onCommandExecution(source, _this.props.moduleName, result, type);
              return _this.props.memory.saveCommands(timeline);
            } else {
              return _this.props.onCommandCompiled();
            }
          } else {
            mode.updateAst(result.ast);
            return _this.props.onCommandCompiled();
          }
        }
      };
    })(this));
    return commandWorker.on('error', (function(_this) {
      return function(_arg) {
        var text;
        text = _arg.data.text;
        console.log("command line error", text);
        return _this.props.onCommandFailed(text);
      };
    })(this));
  };

  CommandLine.prototype.render = function() {
    return _div({
      onMouseEnter: this.handleMouseEnter
    }, _div({
      className: 'areaBorder',
      style: {
        backgroundColor: this.state.backgroundColor
      }
    }, _div({
      ref: 'ace',
      style: {
        width: '100%',
        height: 23
      }
    })));
  };

  return CommandLine;

})());

});
