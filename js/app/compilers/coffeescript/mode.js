define(function (require, exports, module) {
  var __filename = module.uri || "", __dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1);
  var FoldMode, Outdent, Range, Rules, TextMode, Tokenizer, WorkerClient, commentLine, hereComment, indentation, indenter,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Tokenizer = require("ace/tokenizer").Tokenizer;

Rules = require("ace/mode/coffee_highlight_rules").CoffeeHighlightRules;

Outdent = require("ace/mode/matching_brace_outdent").MatchingBraceOutdent;

FoldMode = require("ace/mode/folding/coffee").FoldMode;

Range = require("ace/range").Range;

TextMode = require("ace/mode/text").Mode;

WorkerClient = require("ace/worker/worker_client").WorkerClient;

indenter = /(?:[({[=:]|[-=]>|\b(?:else|switch|try|catch(?:\s*[$A-Za-z_\x7f-\uffff][$\w\x7f-\uffff]*)?|finally))\s*$/;

commentLine = /^(\s*)# ?/;

hereComment = /^\s*###(?!#)/;

indentation = /^\s*/;

exports.Mode = (function(_super) {
  __extends(_Class, _super);

  function _Class() {
    this.$tokenizer = new Tokenizer(new Rules().getRules());
    this.$outdent = new Outdent;
    this.foldingRules = new FoldMode;
  }

  _Class.prototype.getNextLineIndent = function(state, line, tab) {
    var indent, tokens;
    indent = this.$getIndent(line);
    tokens = this.$tokenizer.getLineTokens(line, state).tokens;
    if (!(tokens.length && tokens[tokens.length - 1].type === "comment") && state === "start" && indenter.test(line)) {
      indent += tab;
    }
    return indent;
  };

  _Class.prototype.toggleCommentLines = function(state, doc, startRow, endRow) {
    var i, line, range, _i;
    console.log("toggle");
    range = new Range(0, 0, 0, 0);
    for (i = _i = startRow; startRow <= endRow ? _i <= endRow : _i >= endRow; i = startRow <= endRow ? ++_i : --_i) {
      line = doc.getLine(i);
      if (hereComment.test(line)) {
        continue;
      }
      if (commentLine.test(line)) {
        line = line.replace(commentLine, '$1');
      } else {
        line = line.replace(indentation, '$&# ');
      }
      range.end.row = range.start.row = i;
      range.end.column = line.length + 2;
      doc.replace(range, line);
    }
  };

  _Class.prototype.checkOutdent = function(state, line, input) {
    return this.$outdent.checkOutdent(line, input);
  };

  _Class.prototype.autoOutdent = function(state, doc, row) {
    return this.$outdent.autoOutdent(doc, row);
  };

  _Class.prototype.createWorker = function(session) {
    var worker;
    worker = new WorkerClient(["ace", "compilers"], "compilers/coffeescript/worker", "Worker");
    if (session) {
      worker.attachToDocument(session.getDocument());
      worker.on("error", function(e) {
        return session.setAnnotations([e.data]);
      });
      worker.on("ok", (function(_this) {
        return function(e) {
          return session.clearAnnotations();
        };
      })(this));
    }
    return worker;
  };

  return _Class;

})(TextMode);

});
