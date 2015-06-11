define(function (require, exports, module) {
  var __filename = module.uri || "", __dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1);
  var BuildCommand, DumpCommand, beautify, format, highlight, hljs, ifCompiled, stripImports;

beautify = (require('beautify')).js_beautify;

highlight = (hljs = require('hljs')).highlight;

ifCompiled = function(state, editor, fn) {
  if (state.compiledJs) {
    return fn();
  } else {
    return editor.displayMessage('compiler', "Fix: '" + state.message.value + "' first");
  }
};

format = function(js) {
  return beautify(js, {
    indent_size: 2
  });
};

highlight = function(js) {
  return (hljs.highlight('javascript', js)).value;
};

stripImports = function(js) {
  return js.replace(/^(.|\n)*var (\w+) = Shem\.\w+\.\2;\n/, '').replace(/^(.|\n)*'use strict'\n/, '').replace(/\nreturn \{[^\}]+\};\n\}\(\)\);$/, '');
};

DumpCommand = (function() {
  function DumpCommand() {}

  DumpCommand.defaultSymbols = ['dump', 'd'];

  DumpCommand.description = 'Log generated JavaScript';

  DumpCommand.symbols = DumpCommand.defaultSymbols;

  DumpCommand.execute = function(args, state, editor) {
    return ifCompiled(state, editor, function() {
      return editor.logResult(highlight(format(stripImports(state.compiledJs))));
    });
  };

  return DumpCommand;

})();

BuildCommand = (function() {
  function BuildCommand() {}

  BuildCommand.defaultSymbols = ['build'];

  BuildCommand.description = 'Build the project and JavaScript';

  BuildCommand.symbols = BuildCommand.defaultSymbols;

  BuildCommand.execute = function(args, state, editor) {
    return ifCompiled(state, editor, function() {
      return state.mode.worker.call('compileBuild', [state.module.moduleName], function(compiled) {
        if (editor.memory.writeBuilt) {
          editor.memory.writeBuilt(compiled.js);
          return editor.displayMessage('file', "Build saved to index.js");
        } else {
          return editor.logResult(highlight(format(compiled.js)));
        }
      });
    });
  };

  return BuildCommand;

})();

module.exports = [DumpCommand, BuildCommand];

});
