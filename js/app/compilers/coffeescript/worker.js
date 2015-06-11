define(function (require, exports, module) {
  var __filename = module.uri || "", __dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1);
  var Lexer, Mirror, compile, helpers, lexer, nodes, parser,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Mirror = require("ace/worker/mirror").Mirror;

Lexer = require("./coffee-script/lexer").Lexer;

parser = require("./coffee-script/parser").parser;

nodes = require("./coffee-script/nodes");

helpers = require("./coffee-script/helpers");

window.addEventListener = function() {};

lexer = new Lexer;

parser.lexer = {
  lex: function() {
    var tag, token;
    token = this.tokens[this.pos++];
    if (token) {
      tag = token[0], this.yytext = token[1], this.yylloc = token[2];
      this.yylineno = this.yylloc.first_line;
    } else {
      tag = '';
    }
    return tag;
  },
  setInput: function(tokens) {
    this.tokens = tokens;
    return this.pos = 0;
  },
  upcomingInput: function() {
    return "";
  }
};

parser.yy = nodes;

compile = function(code, options) {
  if (options == null) {
    options = {
      bare: true
    };
  }
  return parser.parse(lexer.tokenize(code, options)).compile(options);
};

parser.yy.parseError = function(message, _arg) {
  var token;
  token = _arg.token;
  message = "unexpected " + (token === 1 ? 'end of input' : token);
  return helpers.throwSyntaxError(message, parser.lexer.yylloc);
};

exports.Worker = (function(_super) {
  __extends(_Class, _super);

  function _Class(sender) {
    _Class.__super__.constructor.call(this, sender);
    this.setTimeout(250);
  }

  _Class.prototype.onUpdate = function() {
    var e, loc, value;
    value = this.doc.getValue();
    try {
      return this.sender.emit("ok", {
        result: compile(value)
      });
    } catch (_error) {
      e = _error;
      loc = e.location;
      if (loc) {
        this.sender.emit("error", {
          row: loc.first_line,
          column: loc.first_column,
          endRow: loc.last_line,
          endColumn: loc.last_column,
          text: e.message,
          type: "error"
        });
      }
    }
  };

  return _Class;

})(Mirror);

});
