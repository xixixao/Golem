define(function (require, exports, module) {
  var __filename = module.uri || "", __dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1);
  var AdaptingWorkerClient, CommandMode, EventEmitter, Mode, ace, oop,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

ace = require("ace/ace");

oop = require("ace/lib/oop");

EventEmitter = require("ace/lib/event_emitter").EventEmitter;

Mode = require('compilers/teascript/mode').Mode;

AdaptingWorkerClient = require('./AdaptingWorkerClient');

module.exports = CommandMode = (function(_super) {
  __extends(CommandMode, _super);

  function CommandMode(id, completers) {
    var superTokenizer;
    this.id = id;
    CommandMode.__super__.constructor.call(this, true);
    this.completers = completers;
    this.commandMode = false;
    superTokenizer = this.$tokenizer;
    this.$tokenizer = {
      getLineTokens: (function(_this) {
        return function(line, state, row, doc) {
          if (line[0] !== ':') {
            if (_this.commandMode) {
              _this.enableSuper();
            }
            return superTokenizer.getLineTokens(line, state, row, doc);
          } else {
            if (line === ":" && !_this.commandMode) {
              _this.disableSuper();
            }
            return {
              tokens: [
                {
                  value: line,
                  type: 'text'
                }
              ]
            };
          }
        };
      })(this)
    };
    oop.implement(this.$tokenizer, EventEmitter);
  }

  CommandMode.prototype.disableSuper = function() {
    this.editor.moveCursorToPosition({
      row: 0,
      column: 1
    });
    this.editor.commands.removeCommands(this.commands);
    return this.commandMode = true;
  };

  CommandMode.prototype.enableSuper = function() {
    this.addCommands();
    return this.commandMode = false;
  };

  CommandMode.prototype.resetEditing = function() {
    if (this.commandMode) {
      this.editor.setValue("");
      return this.enableSuper();
    }
  };

  CommandMode.prototype.createWorker = function(session) {};

  CommandMode.prototype.registerWithWorker = function(workerClient) {
    this.worker = new AdaptingWorkerClient(workerClient, this.id);
    this.worker.attachToDocument(this.editor.session.getDocument());
    return this.worker;
  };

  CommandMode.prototype.updateWorker = function(shouldExecute) {
    this.worker.$sendDeltaQueue();
    this.worker.call('setValue', [this.editor.session.getDocument().getValue()]);
    return this.worker.call('onUpdate', [shouldExecute]);
  };

  CommandMode.prototype.addCommands = function() {
    CommandMode.__super__.addCommands.apply(this, arguments);
    return this.editor.commands.addCommands({
      'insertstring': {
        multiSelectAction: 'forEach',
        scrollIntoView: 'cursor',
        autocomplete: true,
        exec: (function(_this) {
          return function(editor, string) {
            if (_this.isInCommandMode() || _this.isEmpty() && (string === ':')) {
              _this.editor.insert(string);
              return true;
            }
            return _this.insertStringForward(string);
          };
        })(this)
      },
      'initial space inserts colon': {
        bindKey: {
          win: 'Space',
          mac: 'Space'
        },
        exec: (function(_this) {
          return function() {
            if (_this.isEmpty()) {
              return _this.editor.commands.exec("insertstring", _this.editor, ':');
            } else {
              return _this.editor.commands.exec('add new sibling expression', _this.editor);
            }
          };
        })(this)
      }
    });
  };

  CommandMode.prototype.doAutocomplete = function(e) {
    if (this.isInCommandMode()) {
      if ((e != null ? e.command.autocomplete : void 0) && this.getValue().slice(-1) === ' ' && !this.isAutocompleting()) {
        return this.openAutocomplete();
      }
    } else {
      if (this.isEmpty()) {
        return;
      }
      return CommandMode.__super__.doAutocomplete.apply(this, arguments);
    }
  };

  CommandMode.prototype.handleEnter = function() {
    if (this.isAutocompleting()) {
      return this.editor.completer.insertMatch();
    }
  };

  CommandMode.prototype.isInCommandMode = function() {
    return this.getValue()[0] === ':';
  };

  CommandMode.prototype.isEmpty = function() {
    return this.getValue() === '';
  };

  CommandMode.prototype.getValue = function() {
    return this.editor.getValue();
  };

  return CommandMode;

})(Mode);

});
