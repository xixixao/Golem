define(function (require, exports, module) {
  var __filename = module.uri || "", __dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1);
  var CommandMode, Mode, React, UpdatingDisplay, ace, compiler, cx, hyper, isStrictSuffix, jsDump, renderMany, _div, _pre, _ref, _span, _table, _tbody, _td, _th, _tr,
  __slice = [].slice;

_ref = hyper = require('hyper'), _div = _ref._div, _pre = _ref._pre, _span = _ref._span, _table = _ref._table, _tbody = _ref._tbody, _tr = _ref._tr, _th = _ref._th, _td = _ref._td;

React = require('React');

cx = React.addons.classSet;

ace = require('./AceEditor');

jsDump = require('vendor/jsDump');

CommandMode = require('./CommandMode');

Mode = require('compilers/teascript/mode').Mode;

compiler = require('compilers/teascript/compiler');

isStrictSuffix = function(suffix, string) {
  return suffix.length < string.length && (string.indexOf(suffix, string.length - suffix.length)) !== -1;
};

renderMany = function(list) {
  var x;
  return ((function() {
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = list.length; _i < _len; _i++) {
      x = list[_i];
      _results.push(React.renderToStaticMarkup(x));
    }
    return _results;
  })()).join('');
};

module.exports = hyper(UpdatingDisplay = (function() {
  function UpdatingDisplay() {}

  UpdatingDisplay.prototype.getInitialState = function() {
    return {
      source: this.props.value.source
    };
  };

  UpdatingDisplay.prototype.parseValue = function(value) {};

  UpdatingDisplay.prototype.runSource = function(compiled) {
    var debugLog, doLog, error, result, savedStacks;
    if (compiled !== this.compiled) {
      this.compiled = compiled;
      return this.cached = (function() {
        try {
          doLog = true;
          savedStacks = {};
          debugLog = (function(_this) {
            return function() {
              var args, domId, expressions, id, newStack, newTable, placeholder, stack, table, value, valueRow, values;
              id = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
              expressions = args.slice(0, args.length / 2);
              values = args.slice(args.length / 2);
              domId = "debug-log-" + id;
              stack = function() {
                var e;
                try {
                  throw new Error("stack");
                } catch (_error) {
                  e = _error;
                  return (e.stack.split('\n')).slice(5).join('');
                }
              };
              valueRow = function() {
                var v;
                return _tr({
                  dangerouslySetInnerHTML: {
                    __html: renderMany((function() {
                      var _i, _len, _results;
                      _results = [];
                      for (_i = 0, _len = values.length; _i < _len; _i++) {
                        v = values[_i];
                        _results.push(_td({
                          style: {
                            paddingRight: '5px'
                          }
                        }, this.displayValue(v)));
                      }
                      return _results;
                    }).call(_this))
                  }
                });
              };
              newTable = function() {
                var e;
                return _table({
                  id: domId,
                  'data-source-id': _this.timesExecuted
                }, _tbody({}, _tr((function() {
                  var _i, _len, _results;
                  _results = [];
                  for (_i = 0, _len = expressions.length; _i < _len; _i++) {
                    e = expressions[_i];
                    _results.push(_td({
                      style: {
                        paddingRight: '15px',
                        whiteSpace: 'pre-wrap'
                      },
                      dangerouslySetInnerHTML: {
                        __html: e
                      }
                    }));
                  }
                  return _results;
                })()), valueRow()));
              };
              if (doLog) {
                newStack = stack();
                if (table = window.document.getElementById(domId)) {
                  if ((table.getAttribute('data-source-id')) !== ("" + _this.timesExecuted) || !((isStrictSuffix(savedStacks[id], newStack)) || (isStrictSuffix(newStack, savedStacks[id])))) {
                    table.parentNode.innerHTML = React.renderToString(newTable());
                  } else {
                    _this.timesLogged++;
                    placeholder = window.document.createElement("div");
                    React.render(_table(_tbody(valueRow())), placeholder);
                    if (table.firstChild.lastChild.innerHTML !== placeholder.firstChild.firstChild.firstChild.innerHTML) {
                      table.firstChild.appendChild(placeholder.firstChild.firstChild.firstChild);
                    }
                  }
                  if (_this.timesLogged > 1000) {
                    doLog = false;
                  }
                } else {
                  window.log(newTable());
                }
              }
              savedStacks[id] = newStack;
              value = values[values.length - 1];
              return value;
            };
          })(this);
          this.timesExecuted++;
          this.timesLogged = 0;
          return result = eval(compiled);
        } catch (_error) {
          error = _error;
          error.compiled = compiled;
          return error;
        }
      }).call(this);
    } else {
      return this.cached;
    }
  };

  UpdatingDisplay.prototype.displayExecuted = function(value) {
    if (value == null) {
      return null;
    }
    if (value instanceof Error) {
      return this.displayError(value);
    } else {
      return this.displayValue(value);
    }
  };

  UpdatingDisplay.prototype.displayValue = function(value) {
    var dumped, e;
    try {
      return _pre({
        style: {
          float: 'left'
        },
        dangerouslySetInnerHTML: {
          __html: (function() {
            if (value == null) {
              return "Nothing";
            } else if (typeof value === 'function') {
              return value.toString();
            } else {
              dumped = jsDump.parse(value);
              if (dumped.html) {
                return dumped.html;
              } else {
                try {
                  return compiler.syntaxedExpHtml(dumped);
                } catch (_error) {
                  return dumped;
                }
              }
            }
          })()
        }
      });
    } catch (_error) {
      e = _error;
      return this.displayError(e);
    }
  };

  UpdatingDisplay.prototype.displayError = function(error) {
    var formatted;
    formatted = "" + (error instanceof SyntaxError ? error.compiled : this.formatStackTrace(error.stack));
    return _div({
      className: 'messageDisplay',
      style: {
        color: '#880000'
      }
    }, _div({
      dangerouslySetInnerHTML: {
        __html: "" + error
      }
    }), (!/^\s*$/.test(formatted) ? _div(formatted) : void 0));
  };

  UpdatingDisplay.prototype.formatStackTrace = function(trace) {
    var cutoff;
    if (trace == null) {
      trace = '';
    }
    cutoff = compiler.builtInLibraryNumLines;
    return trace.replace(/\n?(?:(\w+)[^>\n]+>[^>\n]+:(\d+:\d+)|.*)(?=\n)/g, function(match, name, location) {
      if ((parseInt(location)) > cutoff) {
        return "" + name + " " + location + "\n";
      } else {
        return "";
      }
    }).replace(/\n (?=\n)/g, '');
  };

  UpdatingDisplay.prototype.handleCommand = function(name) {
    return (function(_this) {
      return function() {
        return _this.props.onCommand(name, _this.editor);
      };
    })(this);
  };

  UpdatingDisplay.prototype.componentDidMount = function() {
    var command, commandWorker, editor, mode, name, _ref1, _results;
    mode = new CommandMode(this.props.outputId, this.props.completers);
    this.editor = editor = ace.edit(this.refs.ace.getDOMNode(), mode, "ace/theme/tea");
    editor.setFontSize(13);
    editor.renderer.setScrollMargin(2, 2);
    editor.setHighlightActiveLine(false);
    editor.session.setTabSize(2);
    editor.setShowPrintMargin(false);
    editor.renderer.setShowGutter(false);
    editor.setOptions({
      maxLines: Infinity
    });
    mode.registerWithWorker(this.props.worker);
    mode.setContent(this.props.value.source, null, this.props.value.moduleName);
    mode.updateAst(this.props.value.ast);
    commandWorker = mode.worker;
    editor.session.on('change', (function(_this) {
      return function() {
        return _this.setState({
          source: editor.getValue()
        });
      };
    })(this));
    this.timesExecuted = 0;
    commandWorker.on('ok', (function(_this) {
      return function(_arg) {
        var commandSource, executed, firstError, result, source, type, _ref1;
        _ref1 = _arg.data, result = _ref1.result, type = _ref1.type, commandSource = _ref1.commandSource;
        source = editor.getValue();
        if (source === commandSource) {
          if (result.ast) {
            result.ast.splice(1, result.ast.length - 3);
          }
          mode.updateAst(result.ast, result.errors);
          if (!result.malformed) {
            executed = result.errors ? (firstError = result.errors[0], new Error(firstError.message || firstError)) : _this.runSource(result.js);
            return _this.setState({
              executed: executed
            });
          }
        }
      };
    })(this));
    commandWorker.on('error', (function(_this) {
      return function(_arg) {
        var text;
        text = _arg.data.text;
        return _this.setState({
          executed: new Error(text)
        });
      };
    })(this));
    _ref1 = mode.commands;
    _results = [];
    for (name in _ref1) {
      command = _ref1[name];
      if (command.indirect) {
        _results.push(command.exec = this.handleCommand(name));
      }
    }
    return _results;
  };

  UpdatingDisplay.prototype.componentWillReceiveProps = function(_arg) {
    var updatedSource;
    updatedSource = _arg.updatedSource;
    if (updatedSource !== this.props.updatedSource) {
      return this.editor.session.getMode().updateWorker(true);
    }
  };

  UpdatingDisplay.prototype.componentDidUpdate = function() {
    return this.editor.resize();
  };

  UpdatingDisplay.prototype.componentWillUnmount = function() {
    var _ref1;
    if ((_ref1 = this.editor.completer) != null) {
      _ref1.detach();
    }
    this.editor.session.getMode().detach();
    return this.editor.destroy();
  };

  UpdatingDisplay.prototype.render = function() {
    return _div({}, _div({
      ref: 'ace',
      style: {
        width: '100%'
      }
    }), _div({
      style: {
        height: 0,
        margin: '0 4px',
        overflow: 'hidden'
      }
    }, this.state.source), _div({
      style: {
        padding: '0 4px'
      }
    }, this.displayExecuted(this.state.executed)));
  };

  return UpdatingDisplay;

})());

});
