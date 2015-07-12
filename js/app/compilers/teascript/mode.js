define(function (require, exports, module) {
  var __filename = module.uri || "", __dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1);
  var BACKWARD, Behaviour, CombinedTooltip, CustomAutocomplete, CustomSearchBox, CustomUndoManager, DistributingWorkerClient, EventEmitter, FIRST, FORWARD, HashHandler, LAST, NEXT, PREVIOUS, Range, Selection, TextMode, ace, all, ammendAst, ammendToken, ancestorAtDefinitonList, append, argumentNamesFromCall, astize, astizeExpressions, atomDelimiter, atomOrPositionFrom, atomReference, bookmarkBefore, call_, changeNumericalAt, childIndex, childIndexOfTangible, cloneNode, cloneNodePreserving, cloneNodes, cloneNodesPreserving, compiler, concat, concatMap, concatTangibles, convertToAceLineTokens, convertToAceToken, definitionAncestorOf, depthOf, duplicateProperties, edgeIdxOfNode, edgeOfList, edgeWithinAtom, editableEdgeWithin, editableLength, enforceSpacing, escape, extend, fakeAtInsertion, filter, findAdjecentInList, findAllOccurences, findAllReferences, findFunctionBody, findName, findNodeWithPosition, findNodesBetween, findOtherReferences, findParamList, findParentFunction, findParentScope, firstFakeInside, firstNotMatchingInside, firstTypeVarInside, following, followingTangibleAtomOrPosition, inOrder, indexWithin, insToTangible, insertChildNodeAt, insideTangible, isAtom, isAtomOrPositionAt, isBetaReducible, isCall, isClosingDelim, isDelim, isDelimitedAtom, isEmptyCall, isExpression, isForm, isFunction, isFunctionBody, isHalfDelimitedAtom, isIndent, isLabel, isMacro, isName, isNewLine, isNodeInside, isNotCapital, isNumerical, isOpeningDelim, isOperator, isParentOfDefinitionList, isReal, isSpace, isTangibleAtDefinitionList, isWhitespace, join, limitTerm, listToForm, log, map, memorable, merge, next, nextExpression, nodeEdgeOfTangible, nodeEdgesOfTangible, nodesEqual, nodesToString, onlyExpression, oop, opposite, originOf, outsToTangible, padding, paddingEdge, parentOf, parentOfTangible, pickupBookmarks, positionsToRange, preceding, precedingWhitespace, previous, previousExpression, reindent, reindentMutateNodes, reindentNodes, reindentNodesPreserving, reindentTangible, reindentTangiblePreserving, repeat, setIndentTo, sibling, siblingAncestorsFrom, siblingLeaf, siblingTangibleAncestors, siblingTerm, sortSiblingTangibles, sortTuple, sortedArgs, spliceString, tangibleAncestor, tangibleBetween, tangibleEdge, tangibleInAfter, tangibleInside, tangibleMargin, tangibleParent, tangibleSurroundedBy, tangibleToIns, tangibleWithMargin, tangibleWithSomeMargin, termToTangible, toNode, toTangible, token_, topList, unzip, validOut, zipWith, __, _arguments, _empty, _fst, _is, _labelName, _notEmpty, _operator, _ref, _snd, _symbol, _terms, _transformed, _validTerms,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
  __slice = [].slice;

ace = require("ace/ace");

Range = require("ace/range").Range;

TextMode = require("ace/mode/text").Mode;

Behaviour = require("ace/mode/behaviour").Behaviour;

Selection = require("ace/selection").Selection;

oop = require("ace/lib/oop");

EventEmitter = require("ace/lib/event_emitter").EventEmitter;

HashHandler = require("ace/keyboard/hash_handler").HashHandler;

CustomAutocomplete = require("./CustomAutocomplete");

CustomSearchBox = require("./CustomSearchBox");

CombinedTooltip = require("./CombinedTooltip");

DistributingWorkerClient = require("app/DistributingWorkerClient");

log = function(arg) {
  console.log(arg);
  return arg;
};

_ref = compiler = require('./compiler'), isForm = _ref.isForm, isCall = _ref.isCall, isNotCapital = _ref.isNotCapital, concat = _ref.concat, map = _ref.map, concatMap = _ref.concatMap, zipWith = _ref.zipWith, unzip = _ref.unzip, filter = _ref.filter, join = _ref.join, all = _ref.all, __ = _ref.__, sortedArgs = _ref.sortedArgs, originOf = _ref.originOf, _is = _ref._is, _notEmpty = _ref._notEmpty, _empty = _ref._empty, _operator = _ref._operator, _arguments = _ref._arguments, _terms = _ref._terms, _validTerms = _ref._validTerms, _snd = _ref._snd, _fst = _ref._fst, _labelName = _ref._labelName, _symbol = _ref._symbol, call_ = _ref.call_, token_ = _ref.token_;

(function() {
  var fromOrientedRange, toOrientedRange;
  fromOrientedRange = this.fromOrientedRange;
  this.fromOrientedRange = function(range) {
    fromOrientedRange.call(this, range);
    this.$nodes = range.$nodes;
    this.$editing = range.$editing;
    return this.$editMarker = range.$editMarker;
  };
  toOrientedRange = this.toOrientedRange;
  return this.toOrientedRange = function(range) {
    range = toOrientedRange.call(this, range);
    range.$nodes = this.$nodes;
    range.$editing = this.$editing;
    range.$editMarker = this.$editMarker;
    return range;
  };
}).call(Selection.prototype);

exports.Mode = (function(_super) {
  var commentLine, hereComment, indentation;

  __extends(_Class, _super);

  function _Class(isSingleLineInput, editorInstance) {
    this.isSingleLineInput = isSingleLineInput;
    this.editorInstance = editorInstance;
    this.handleRangeDeselect = __bind(this.handleRangeDeselect, this);
    this.handleCommandExecution = __bind(this.handleCommandExecution, this);
    this.replay = __bind(this.replay, this);
    this.removeMultiSelectKeyboardHandler = __bind(this.removeMultiSelectKeyboardHandler, this);
    this.addMultiSelectKeyboardHandler = __bind(this.addMultiSelectKeyboardHandler, this);
    this.createMultiSelectKeyboardHandler = __bind(this.createMultiSelectKeyboardHandler, this);
    this.handlePaste = __bind(this.handlePaste, this);
    this.handleCopy = __bind(this.handleCopy, this);
    this.handleClick = __bind(this.handleClick, this);
    this.handleMouseUp = __bind(this.handleMouseUp, this);
    this.handleMouseDown = __bind(this.handleMouseDown, this);
    this.detach = __bind(this.detach, this);
    this.closeTooltip = __bind(this.closeTooltip, this);
    this.docsTooltip = __bind(this.docsTooltip, this);
    this.createCompleter = __bind(this.createCompleter, this);
    this.tokensOnLine = __bind(this.tokensOnLine, this);
    this.$tokenizer = {
      getLineTokens: (function(_this) {
        return function(line, state, row, doc) {
          var tokens;
          if (doc == null) {
            doc = _this.editor.session.getDocument();
          }
          if (tokens = _this.tokensOnLine(row, doc)) {
            return {
              tokens: convertToAceLineTokens(tokens)
            };
          } else {
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
    this.$behaviour = void 0;
    this.completers = [this.completer = this.createCompleter()];
  }

  _Class.prototype.tokensOnLine = function(row, doc) {
    var end, start;
    start = doc.positionToIndex({
      row: row,
      column: 0
    });
    end = doc.positionToIndex({
      row: row + 1,
      column: 0
    });
    if (!this.ast) {
      return void 0;
    }
    return findNodesBetween(topList(this.ast), start, end);
  };

  _Class.prototype.getTokenAt = function(pos) {
    var after, before, _ref1;
    _ref1 = this.tokensSurroundingPos(pos), before = _ref1[0], after = _ref1[1];
    if (after && isExpression(after)) {
      return after;
    } else {
      return before || after;
    }
  };

  _Class.prototype.getNextLineIndent = function(state, line, tab) {
    var indent, numClosed, numOpen;
    indent = this.$getIndent(line);
    numOpen = (line.match(/[\(\[\{]/g) || []).length;
    numClosed = (line.match(/[\)\]\}]/g) || []).length;
    return new Array(numOpen - numClosed + indent.length / tab.length + 1).join(tab);
  };

  commentLine = /^(\s*)# ?/;

  hereComment = /^\s*###(?!#)/;

  indentation = /^\s*/;

  _Class.prototype.toggleCommentLines = function(state, doc, startRow, endRow) {
    var i, line, range, _i;
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

  _Class.prototype.detachFromSession = function(session) {
    this.editor.removeListener('mousedown', this.handleMouseDown);
    this.editor.removeListener('mouseup', this.handleMouseUp);
    this.editor.tokenTooltip.destroy();
    this.editor.onPaste = this.__editorOnPaste;
    this.editor.getCopyText = this.__editorCopyText;
    this.editor.setOption('dragEnabled', true);
    return this.editor.setOption('enableBlockSelect', true);
  };

  _Class.prototype.attachToEditor = function(editor) {
    var session;
    session = editor.session;
    this.editor = editor;
    this.editor.completers = this.completers;
    this.editor.session.setUndoManager(this.createUndoManager());
    editor.setOption('dragEnabled', false);
    editor.setOption('enableBlockSelect', false);
    this.editor.on('mousedown', this.handleMouseDown);
    this.editor.on('mouseup', this.handleMouseUp);
    this.editor.tokenTooltip = new CombinedTooltip(this.editor);
    this.editor.tokenTooltip.setTooltipContentForToken = this.docsTooltip;
    this.__editorOnPaste = this.editor.onPaste;
    this.editor.onPaste = this.handlePaste;
    this.__editorCopyText = this.editor.getCopyText;
    this.editor.getCopyText = this.handleCopy;
    this.editor.selection.on('removeRange', this.handleRangeDeselect);
    this.editor.commands.on('afterExec', this.handleCommandExecution);
    this.createMultiSelectKeyboardHandler();
    session.multiSelect.on('multiSelect', this.addMultiSelectKeyboardHandler);
    session.multiSelect.on('singleSelect', this.removeMultiSelectKeyboardHandler);
    this.editor.on('blur', this.detach);
    if (!this.isSingleLineInput) {
      this.addVerticalCommands(session);
    }
    this.addCommands(session);
    return this.initAst("");
  };

  _Class.prototype.setContent = function(string, selectedRange, moduleName) {
    var added, e, inside;
    try {
      if (moduleName != null) {
        this.assignModuleName(moduleName);
      }
      added = astize(string, this.ast);
      inside = insideTangible(this.ast);
      this.mutate(extend({
        changeInTree: {
          added: added,
          at: inside
        }
      }, selectedRange ? {
        selectionRange: selectedRange
      } : {
        tangibleSelection: {
          "in": added,
          out: inside.out
        }
      }));
      return this.handleCommandExecution();
    } catch (_error) {
      e = _error;
      console.error(e, e.stack);
      console.error(string);
      return this.editor.insert(string);
    }
  };

  _Class.prototype.selectInitially = function(toSelect) {
    return this.initialSelection = toSelect;
  };

  _Class.prototype.tangibleSelectionFromRange = function(range) {
    var end, from, start, to;
    start = this.tangibleAtPos(range.start);
    end = this.tangibleAtPos(range.end);
    if (_notEmpty(start["in"])) {
      from = childIndex(start["in"][0]);
      to = childIndex(end.out[0]);
      return {
        "in": (parentOfTangible(start)).slice(from, to),
        out: end.out
      };
    } else {
      return end;
    }
  };

  _Class.prototype.initAst = function(value) {
    this.ast = this.isSingleLineInput ? compiler.astizeExpressionWithWrapper(value) : compiler.astizeList(value);
    if (value === '') {
      return this.mutate({
        tangibleSelection: insideTangible(this.ast)
      });
    }
  };

  _Class.prototype.updateAst = function(ast, errors) {
    var e, toSelect;
    if (errors == null) {
      errors = [];
    }
    try {
      duplicateProperties(ast, this.ast);
    } catch (_error) {
      e = _error;
      console.error(ast, this.ast);
    }
    this.$tokenizer._signal('update', {
      data: {
        rows: {
          first: 1
        }
      }
    });
    if ((_empty(errors)) || !this.isAutocompleting()) {
      this.updateAutocomplete();
    }
    this.addErrorMarkers(errors);
    if (toSelect = this.initialSelection) {
      this.initialSelection = null;
      return this.mutate({
        inSelection: findName(toSelect.name, this.ast)
      });
    }
  };

  _Class.prototype.repositionAst = function() {
    var currentPosition, n, next, node, offset, push, stack, _results;
    currentPosition = this.ast.start;
    stack = [[this.ast, true]];
    _results = [];
    while (next = stack.pop()) {
      node = next[0], push = next[1];
      if (isForm(node)) {
        if (push) {
          node.start = currentPosition;
          stack.push([node, false]);
          _results.push((function() {
            var _i, _results1;
            _results1 = [];
            for (_i = node.length - 1; _i >= 0; _i += -1) {
              n = node[_i];
              _results1.push(stack.push([n, true]));
            }
            return _results1;
          })());
        } else {
          _results.push(node.end = currentPosition);
        }
      } else {
        offset = currentPosition - node.start;
        node.start = currentPosition;
        node.end += offset;
        _results.push(currentPosition = node.end);
      }
    }
    return _results;
  };

  _Class.prototype.addErrorMarkers = function(errors) {
    var conflicts, firstError, i, message, node, origin, trueOrigin, type;
    this.removeErrorMarkers();
    this.errorMarkers = [];
    firstError = errors[0];
    if (firstError) {
      message = firstError.message, conflicts = firstError.conflicts;
      if (message) {
        this.errorMarkers = (function() {
          var _i, _len, _results;
          _results = [];
          for (i = _i = 0, _len = conflicts.length; _i < _len; i = ++_i) {
            type = conflicts[i];
            if (!(type && (origin = originOf(type)))) {
              continue;
            }
            trueOrigin = _transformed(origin);
            node = findNodeWithPosition(this.ast, trueOrigin.start, trueOrigin.end)[0];
            _results.push({
              node: node
            });
          }
          return _results;
        }).call(this);
        return this.updateErrorMarkers();
      }
    }
  };

  _Class.prototype.updateErrorMarkers = function() {
    var lineRange, marker, node, range, _i, _len, _ref1, _results;
    this.removeErrorMarkers();
    _ref1 = this.errorMarkers || [];
    _results = [];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      marker = _ref1[_i];
      if (!marker.node) {
        continue;
      }
      node = marker.node;
      range = this.nodeRange(node);
      lineRange = this.errorMarkerRange(range);
      _results.push(marker.id = this.editor.session.addMarker(lineRange, 'clazz', this.showError(range, lineRange, node.tea), true));
    }
    return _results;
  };

  _Class.prototype.removeErrorMarkers = function() {
    var id, _i, _len, _ref1, _results;
    _ref1 = this.errorMarkers || [];
    _results = [];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      id = _ref1[_i].id;
      if (id) {
        _results.push(this.editor.session.removeMarker(id));
      }
    }
    return _results;
  };

  _Class.prototype.showError = function(range, lineRange, type) {
    var draw;
    draw = (function(_this) {
      return function(stringBuilder, r, l, t, config, layer) {
        var subclass;
        subclass = range.isMultiLine() ? ' golem_error-origin-open' : '';
        return layer.drawSingleLineMarker(stringBuilder, lineRange, 'golem_error-origin' + subclass, config);
      };
    })(this);
    draw.type = type;
    return draw;
  };

  _Class.prototype.errorMarkerRange = function(range) {
    var row;
    if (range.isMultiLine()) {
      row = range.start.row;
      return new Range(row, range.start.column, row, this.editor.session.getScreenLastRowColumn(row));
    } else {
      return range;
    }
  };

  _Class.prototype.doAutocomplete = function(e) {
    var atom, editor, ignoredCommands, _ref1;
    editor = this.editor;
    ignoredCommands = ['Up', 'Down', 'Ctrl-Up|Ctrl-Home', 'Ctrl-Down|Ctrl-End', 'PageUp', 'PageDown'];
    if ((e != null ? e.command.autocomplete : void 0) && ((atom = this.editedAtom()) && (!isHalfDelimitedAtom(atom)) && (!isNumerical(atom)) && (this.offsetToCursor(atom)) === atom.symbol.length || this.isInserting())) {
      return this.openAutocomplete();
    } else if (editor.completer && ((_ref1 = e != null ? e.command.name : void 0, __indexOf.call(ignoredCommands, _ref1) < 0) || atom && isNumerical(atom))) {
      return editor.completer.detach();
    }
  };

  _Class.prototype.openAutocomplete = function() {
    var editor;
    editor = this.editor;
    if (!this.isAutocompleting() || this.isInserting()) {
      if (!editor.completer) {
        editor.completer = new CustomAutocomplete(!this.isSingleLineInput);
      }
      this.closeTooltip();
      return editor.completer.showPopup(editor);
    }
  };

  _Class.prototype.updateAutocomplete = function() {
    var selected;
    if (this.isAutocompleting()) {
      return this.editor.completer.updateCompletions();
    } else if (this.editor.isFocused() && (this.isInserting() || (selected = this.onlySelectedExpression()) && !selected.tea)) {
      return this.openAutocomplete();
    }
  };

  _Class.prototype.isAutocompleting = function() {
    return this.editor.completer && this.editor.completer.activated;
  };

  _Class.prototype.createCompleter = function() {
    var completer;
    return completer = {
      getCompletions: (function(_this) {
        return function(editor, session, pos, prefix, callback) {
          var editedSymbol, reference, targetMode, typed, _ref1, _ref2;
          if (prefix && ((_ref1 = editor.completer.completions) != null ? _ref1.filtered.length : void 0) > 0) {
            return;
          }
          targetMode = session.getMode();
          if (targetMode.isEditing()) {
            typed = targetMode.editedAtom();
            editedSymbol = typed.symbol;
          } else {
            typed = toNode(targetMode.selectedTangible());
          }
          if (typed.tea && !typed.tea.ForAll && !((_ref2 = typed.assignable) != null ? _ref2.top : void 0)) {
            reference = {
              type: typed.tea,
              scope: typed.scope,
              pattern: typed.assignable,
              emptyCall: isEmptyCall(typed.parent)
            };
            return _this.worker.call('matchingDefinitions', [reference], function(completions) {
              var arity, docs, rawType, score, symbol, type;
              return callback(null, (function() {
                var _ref3, _results;
                _results = [];
                for (symbol in completions) {
                  _ref3 = completions[symbol], type = _ref3.type, score = _ref3.score, rawType = _ref3.rawType, arity = _ref3.arity, docs = _ref3.docs;
                  _results.push({
                    name: symbol,
                    value: symbol,
                    completer: completer,
                    score: score,
                    meta: type,
                    rawType: rawType,
                    arity: arity,
                    docs: docs
                  });
                }
                return _results;
              })());
            });
          } else if (typed.inferredType) {
            return _this.worker.call('availableTypes', [typed.inferredType], function(completions) {
              var docs, name, type;
              return callback(null, (function() {
                var _ref3, _results;
                _results = [];
                for (name in completions) {
                  _ref3 = completions[name], type = _ref3.type, docs = _ref3.docs;
                  _results.push({
                    name: type,
                    value: type,
                    completer: completer,
                    docs: docs
                  });
                }
                return _results;
              })());
            });
          } else {
            callback("error", []);
          }
        };
      })(this),
      getDocTooltip: (function(_this) {
        return function(selected) {
          if (selected.rawType && !selected.docHTML) {
            selected.docHTML = _this.createDocTooltipHtml(selected);
          }
        };
      })(this),
      insertMatch: (function(_this) {
        return function(editor, _arg) {
          var mode, selected, value;
          value = _arg.value;
          mode = editor.session.getMode();
          mode.startGroupMutation();
          mode.removeSelected();
          mode.insertStringForward(value);
          if (isForm(selected = mode.onlySelectedExpression())) {
            mode.mutate({
              tangibleSelection: firstFakeInside(FORWARD, selected)
            });
          }
          return mode.finishGroupMutation();
        };
      })(this)
    };
  };

  _Class.prototype.docsTooltip = function(token, tooltip) {
    var activate, malformed, reference, type, _ref1;
    activate = (function(_this) {
      return function(html) {
        tooltip.setHtml(html);
        tooltip.open();
        return _this.activeTooltip = tooltip;
      };
    })(this);
    tooltip.hideAndRemoveMarker();
    if ((malformed = token.malformed) || (isDelim(token)) && (malformed = token.parent.malformed)) {
      return activate(malformed);
    } else if (token.scope != null) {
      reference = {
        name: token.symbol,
        scope: token.scope
      };
      return this.worker.call('docsFor', [reference], (function(_this) {
        return function(info) {
          if (info != null) {
            return activate((token.label === 'name') && info.rawType ? _this.prettyPrintTypeForDoc(info) : _this.createDocTooltipHtml(info));
          }
        };
      })(this));
    } else if (type = ((_ref1 = token.type) != null ? _ref1.type : void 0) || token.tea) {
      return activate(this.prettyPrintTypeForDoc({
        rawType: type
      }));
    }
  };

  _Class.prototype.lookupSource = function(token, whenFound) {
    var reference;
    reference = {
      name: token.symbol,
      scope: token.scope
    };
    return this.worker.call('docsFor', [reference], (function(_this) {
      return function(info) {
        var fn, params, rest, source, _ref1;
        source = info.source;
        if (isFunction(source)) {
          _ref1 = _terms(source), fn = _ref1[0], params = _ref1[1], rest = 3 <= _ref1.length ? __slice.call(_ref1, 2) : [];
          source = call_(fn, join([params], filter(isFunctionBody, rest)));
        }
        return whenFound(enforceSpacing(source));
      };
    })(this));
  };

  _Class.prototype.closeTooltip = function() {
    return this.detach();
  };

  _Class.prototype.detach = function() {
    var _ref1;
    return (_ref1 = this.activeTooltip) != null ? _ref1.hideAndRemoveMarker() : void 0;
  };

  _Class.prototype.createDocTooltipHtml = function(info) {
    var paramNames;
    return ("<span style='color: #9EE062'>" + info.name + "</span>") + (!info.arity ? '' : (paramNames = info.arity || [], " <span style='color: #9C49B6'>" + (paramNames.join(' ')) + "</span>")) + '\n' + (!info.rawType ? '' : "" + (this.prettyPrintTypeForDoc(info)) + "\n") + (!info.docs ? '' : compiler.labelDocs(info.docs, paramNames));
  };

  _Class.prototype.prettyPrintTypeForDoc = function(_arg) {
    var rawType;
    rawType = _arg.rawType;
    return compiler.prettyPrint(rawType);
  };

  _Class.prototype.handleMouseDown = function(event) {
    return this.mouseDownTime = +(new Date);
  };

  _Class.prototype.handleMouseUp = function(event) {
    event.duration = (new Date) - this.mouseDownTime;
    event.preventDefault();
    return this.handleClick(event);
  };

  _Class.prototype.handleClick = function(event) {
    var LONG_CLICK_DURATION;
    LONG_CLICK_DURATION = 200;
    if (event.duration > LONG_CLICK_DURATION) {
      return this.editor.execCommand('edit by click');
    } else if (event.domEvent.shiftKey) {
      return this.editor.execCommand('expand selection by click');
    } else {
      if (this.ast) {
        return this.editor.execCommand('select by click');
      }
    }
  };

  _Class.prototype.handleCopy = function() {
    var indentSize, selectedText;
    selectedText = this.editor.getSelectedText();
    indentSize = depthOf(toNode(this.selectedTangible()));
    if (indentSize > 0) {
      return selectedText.replace(new RegExp("\\n" + (Array(indentSize * 2 + 1).join(' ')), 'g'), '\n');
    } else {
      return selectedText;
    }
  };

  _Class.prototype.handlePaste = function(string) {
    var expressions, selections;
    expressions = string.split(/(?:\r\n|\r|\n)(?!\s)/);
    selections = this.editor.selection.rangeList.ranges;
    if (expressions.length > selections.length || expressions.length < 2 || !expressions[1]) {
      return this.editor.commands.exec("insertstring", this.editor, string);
    }
    this.startGroupMutation();
    this.editor.forEachSelection({
      exec: (function(_this) {
        return function() {
          return _this.insertStringForward(expressions[_this.editor.selection.index]);
        };
      })(this)
    });
    this.finishGroupMutation();
    return this.handleCommandExecution({
      command: {
        name: 'paste'
      }
    });
  };

  _Class.prototype.undoManager = function() {
    var manager;
    return manager = this.editor.session.getUndoManager();
  };

  _Class.prototype.createUndoManager = function() {
    return new CustomUndoManager(this);
  };

  _Class.prototype.addVerticalCommands = function() {
    return this.editor.commands.addCommands({
      'move up to atom or position': {
        bindKey: {
          win: 'Up',
          mac: 'Up'
        },
        multiSelectAction: 'forEach',
        autocomplete: true,
        exec: (function(_this) {
          return function() {
            return _this.selectLineAdjecentAtomOrPosition(PREVIOUS);
          };
        })(this)
      },
      'move down to atom or position': {
        bindKey: {
          win: 'Down',
          mac: 'Down'
        },
        multiSelectAction: 'forEach',
        autocomplete: true,
        exec: (function(_this) {
          return function() {
            return _this.selectLineAdjecentAtomOrPosition(NEXT);
          };
        })(this)
      },
      'add a new sibling expression on the next line': {
        bindKey: {
          win: 'Enter',
          mac: 'Enter'
        },
        multiSelectAction: 'forEach',
        autocomplete: true,
        exec: (function(_this) {
          return function() {
            return _this.replaceSpace(FORWARD, '\n');
          };
        })(this)
      },
      'add a new sibling expression on the previous line': {
        bindKey: {
          win: 'Shift-Enter',
          mac: 'Shift-Enter'
        },
        multiSelectAction: 'forEach',
        exec: (function(_this) {
          return function() {
            return _this.replaceSpace(BACKWARD, '\n');
          };
        })(this)
      },
      'select the next reference of selection': {
        bindKey: {
          win: 'Tab',
          mac: 'Tab'
        },
        scrollIntoView: 'center',
        multiSelectAction: 'forEach',
        exec: (function(_this) {
          return function() {
            return _this.selectReferenceInDirection(FORWARD);
          };
        })(this)
      },
      'select the previous reference of selection': {
        bindKey: {
          win: 'Shift-Tab',
          mac: 'Shift-Tab'
        },
        scrollIntoView: 'center',
        multiSelectAction: 'forEach',
        exec: (function(_this) {
          return function() {
            return _this.selectReferenceInDirection(BACKWARD);
          };
        })(this)
      }
    });
  };

  _Class.prototype.createMultiSelectKeyboardHandler = function() {
    return this.multiSelectKeyboardHandler = new HashHandler([
      {
        name: 'escape multi select',
        bindKey: 'esc',
        scrollIntoView: 'cursor',
        readOnly: true,
        exec: (function(_this) {
          return function() {
            var firstSelected, selection, _ref1;
            selection = _this.editor.selection;
            _ref1 = selection.ranges, firstSelected = _ref1[_ref1.length - 1];
            return selection.toSingleRange(firstSelected);
          };
        })(this),
        isAvailable: (function(_this) {
          return function() {
            return _this.isMultiSelecting();
          };
        })(this)
      }
    ]);
  };

  _Class.prototype.addMultiSelectKeyboardHandler = function() {
    return this.editor.keyBinding.addKeyboardHandler(this.multiSelectKeyboardHandler);
  };

  _Class.prototype.removeMultiSelectKeyboardHandler = function() {
    return this.editor.keyBinding.removeKeyboardHandler(this.multiSelectKeyboardHandler);
  };

  _Class.prototype.addCommands = function() {
    this.editor.commands.addCommands({
      'insertstring': {
        multiSelectAction: 'forEach',
        scrollIntoView: 'cursor',
        autocomplete: true,
        exec: (function(_this) {
          return function(editor, string) {
            return _this.insertStringForward(string);
          };
        })(this)
      }
    });
    return this.editor.commands.addCommands(this.commands = {
      'ignoretheseshortcuts': {
        readOnly: true,
        bindKey: {
          win: "Ctrl-Shift-E",
          mac: "Ctrl-Shift-E|Command-G|Command-Shift-G|Ctrl-G|Ctrl-Shift-G|Command-Shift-Up|Shift-Up|Shift-Down|Ctrl-N|Option-Shift-Left|Option-Shift-Right|Command-Shift-Left|Command-Shift-Right|Ctrl-B|Ctrl-V|Command-Option-E|Command-Shift-E|Command-D|Command-Shift-D duplicateSelection|Command-Alt-S|Command-/|Command-Shift-/|Command-Option-Up|Command-Option-Down|Command-Delete|Ctrl-H|Alt-Delete|Alt-Backspace|Ctrl-Alt-Backspace|Ctrl-[|Ctrl-]|Ctrl-Shift-U|Command-Shift-L|Ctrl-Alt-Up|Ctrl-Alt-Down|Ctrl-Alt-Shift-Up|Ctrl-Alt-Shift-Down|Ctrl-Alt-Left|Ctrl-Alt-Right|Ctrl-Alt-Shift-Left|Ctrl-Alt-Shift-Right|Ctrl-Alt-L|Ctrl-Alt-A|Ctrl-Alt-G"
        },
        exec: (function(_this) {
          return function() {};
        })(this)
      },
      'select by click': {
        readOnly: true,
        autocomplete: true,
        exec: (function(_this) {
          return function() {
            return _this.mutate({
              tangibleSelection: _this.tangibleAtPos(_this.cursorPosition())
            });
          };
        })(this)
      },
      'edit by click': {
        multiSelectAction: 'forEach',
        autocomplete: true,
        exec: (function(_this) {
          return function() {
            var node, tangible;
            tangible = _this.tangibleAtPos(_this.cursorPosition());
            node = onlyExpression(tangible);
            return _this.mutate(node && isAtom(node) ? {
              withinAtom: node,
              withinAtomPos: _this.offsetToCursor(node)
            } : {
              tangibleSelection: tangible
            });
          };
        })(this)
      },
      'expand selection by click': {
        readOnly: true,
        multiSelectAction: 'forEach',
        exec: (function(_this) {
          return function() {
            var from, to, _ref1;
            _ref1 = siblingTangibleAncestors([_this.selectedTangible(), _this.tangibleAtPos(_this.cursorPosition())]), from = _ref1[0], to = _ref1[1];
            return _this.mutate({
              tangibleSelection: tangibleBetween(from, to)
            });
          };
        })(this)
      },
      'cut': {
        scrollIntoView: 'cursor',
        multiSelectAction: 'forEach',
        autocomplete: true,
        exec: (function(_this) {
          return function() {
            var range;
            range = _this.editor.getSelectionRange();
            _this.editor._emit('cut', range);
            return _this.remove(FORWARD);
          };
        })(this)
      },
      'find': {
        bindKey: {
          win: "Ctrl-Shift-F",
          mac: "Command-F"
        },
        readOnly: true,
        exec: (function(_this) {
          return function() {
            if (!_this.isSingleLineInput) {
              return CustomSearchBox.Search(_this.editor);
            }
          };
        })(this)
      },
      'selectall': {
        bindKey: {
          win: "Ctrl-A",
          mac: "Command-A"
        },
        readOnly: true,
        exec: (function(_this) {
          return function() {
            return _this.mutate({
              tangibleSelection: insideTangible(_this.ast)
            });
          };
        })(this)
      },
      'select enclosing expression': {
        bindKey: {
          win: 'Ctrl-Up',
          mac: 'Command-Up'
        },
        readOnly: true,
        multiSelectAction: 'forEach',
        exec: (function(_this) {
          return function() {
            return _this.mutate({
              inSelection: _this.isEditing() ? _this.editedAtom() : _this.realParentOfSelected()
            });
          };
        })(this)
      },
      'select the first expression inside selection': {
        bindKey: {
          win: 'Ctrl-Down',
          mac: 'Command-Down'
        },
        readOnly: true,
        multiSelectAction: 'forEach',
        autocomplete: true,
        exec: (function(_this) {
          return function() {
            return _this.moveDown(FIRST, LAST);
          };
        })(this)
      },
      'select the last expression inside selection': {
        bindKey: {
          win: 'Ctrl-Shift-Down',
          mac: 'Command-Shift-Down'
        },
        readOnly: true,
        multiSelectAction: 'forEach',
        autocomplete: true,
        exec: (function(_this) {
          return function() {
            return _this.moveDown(LAST, FIRST);
          };
        })(this)
      },
      'move to next atom or position': {
        bindKey: {
          win: 'Right',
          mac: 'Right'
        },
        readOnly: true,
        multiSelectAction: 'forEach',
        autocomplete: true,
        exec: (function(_this) {
          return function() {
            return _this.selectFollowingAtomOrPosition(NEXT);
          };
        })(this)
      },
      'move to previous atom or position': {
        bindKey: {
          win: 'Left',
          mac: 'Left'
        },
        readOnly: true,
        multiSelectAction: 'forEach',
        autocomplete: true,
        exec: (function(_this) {
          return function() {
            return _this.selectFollowingAtomOrPosition(PREVIOUS);
          };
        })(this)
      },
      'select next sibling expression': {
        bindKey: {
          win: 'Ctrl-Right',
          mac: 'Command-Right'
        },
        readOnly: true,
        multiSelectAction: 'forEach',
        autocomplete: true,
        exec: (function(_this) {
          return function() {
            return _this.selectSibling(NEXT);
          };
        })(this)
      },
      'select previous sibling expression': {
        bindKey: {
          win: 'Ctrl-Left',
          mac: 'Command-Left'
        },
        readOnly: true,
        multiSelectAction: 'forEach',
        autocomplete: true,
        exec: (function(_this) {
          return function() {
            return _this.selectSibling(PREVIOUS);
          };
        })(this)
      },
      'include next expression in selection': {
        bindKey: {
          win: 'Shift-Right',
          mac: 'Shift-Right'
        },
        readOnly: true,
        multiSelectAction: 'forEach',
        exec: (function(_this) {
          return function() {
            return _this.expandSelection(NEXT);
          };
        })(this)
      },
      'include previous expression in selection': {
        bindKey: {
          win: 'Shift-Left',
          mac: 'Shift-Left'
        },
        readOnly: true,
        multiSelectAction: 'forEach',
        exec: (function(_this) {
          return function() {
            return _this.expandSelection(PREVIOUS);
          };
        })(this)
      },
      'add new sibling expression': {
        bindKey: {
          win: 'Space',
          mac: 'Space'
        },
        multiSelectAction: 'forEach',
        autocomplete: true,
        exec: (function(_this) {
          return function() {
            return _this.insertSpace(FORWARD, ' ');
          };
        })(this)
      },
      'add new sibling expression before current': {
        bindKey: {
          win: 'Shift-Space',
          mac: 'Shift-Space'
        },
        multiSelectAction: 'forEach',
        autocomplete: true,
        exec: (function(_this) {
          return function() {
            return _this.insertSpace(BACKWARD, ' ');
          };
        })(this)
      },
      'removeback': {
        bindKey: {
          win: 'Backspace',
          mac: 'Backspace'
        },
        multiSelectAction: 'forEach',
        autocomplete: true,
        exec: (function(_this) {
          return function() {
            return _this.remove(BACKWARD);
          };
        })(this)
      },
      'removeforward': {
        bindKey: {
          win: 'Delete',
          mac: 'Delete|Shift-Delete|Ctrl-Backspace|Shift-Backspace'
        },
        multiSelectAction: 'forEach',
        autocomplete: true,
        exec: (function(_this) {
          return function() {
            return _this.remove(FORWARD);
          };
        })(this)
      },
      'flatten onto a single line': {
        bindKey: {
          win: 'Ctrl-Space',
          mac: 'Ctrl-Space'
        },
        multiSelectAction: 'forEach',
        exec: (function(_this) {
          return function() {
            return _this.removeNewLines();
          };
        })(this)
      },
      'jump to next occurence of the selection': {
        bindKey: {
          win: 'Ctrl-Tab',
          mac: 'Alt-Tab'
        },
        readOnly: true,
        scrollIntoView: 'center',
        multiSelectAction: 'forEach',
        exec: (function(_this) {
          return function() {
            return _this.selectOccurenceInDirection(FORWARD);
          };
        })(this)
      },
      'jump to previous occurence of the selection': {
        bindKey: {
          win: 'Ctrl-Shift-Tab',
          mac: 'Alt-Shift-Tab'
        },
        readOnly: true,
        scrollIntoView: 'center',
        multiSelectAction: 'forEach',
        exec: (function(_this) {
          return function() {
            return _this.selectOccurenceInDirection(BACKWARD);
          };
        })(this)
      },
      'multiselect next reference': {
        bindKey: {
          win: 'Ctrl-S',
          mac: 'Ctrl-S'
        },
        readOnly: true,
        scrollIntoView: 'center',
        exec: (function(_this) {
          return function() {
            return _this.multiSelectReferenceInDirection(FORWARD);
          };
        })(this)
      },
      'multiselect previous reference': {
        bindKey: {
          win: 'Ctrl-Shift-S',
          mac: 'Ctrl-Shift-S'
        },
        readOnly: true,
        scrollIntoView: 'center',
        exec: (function(_this) {
          return function() {
            return _this.multiSelectReferenceInDirection(BACKWARD);
          };
        })(this)
      },
      'shift expression backward': {
        bindKey: {
          win: 'Alt-Left',
          mac: 'Alt-Left'
        },
        multiSelectAction: 'forEach',
        autocomplete: true,
        exec: (function(_this) {
          return function() {
            return _this.moveSelection(BACKWARD);
          };
        })(this)
      },
      'shift expression forward': {
        bindKey: {
          win: 'Alt-Right',
          mac: 'Alt-Right'
        },
        multiSelectAction: 'forEach',
        autocomplete: true,
        exec: (function(_this) {
          return function() {
            return _this.moveSelection(FORWARD);
          };
        })(this)
      },
      'shift all expressions on a line up': {
        bindKey: {
          win: 'Alt-Up',
          mac: 'Alt-Up'
        },
        multiSelectAction: 'forEach',
        autocomplete: true,
        exec: (function(_this) {
          return function() {
            return _this.moveSelectionByLine(BACKWARD);
          };
        })(this)
      },
      'shift all expressions on a line down': {
        bindKey: {
          win: 'Alt-Down',
          mac: 'Alt-Down'
        },
        multiSelectAction: 'forEach',
        autocomplete: true,
        exec: (function(_this) {
          return function() {
            return _this.moveSelectionByLine(FORWARD);
          };
        })(this)
      },
      'insert a character': {
        bindKey: {
          win: '\\',
          mac: '\\'
        },
        multiSelectAction: 'forEach',
        exec: (function(_this) {
          return function() {
            return _this.insertStringForward(_this.isEditingHalfDelimited() ? '\\' : '\\_');
          };
        })(this)
      },
      'wrap in a call': {
        bindKey: {
          win: 'Ctrl-Shift-9',
          mac: 'Command-Shift-9'
        },
        logicalKey: {
          win: 'Ctrl-(',
          mac: 'Command-('
        },
        multiSelectAction: 'forEach',
        autocomplete: true,
        exec: (function(_this) {
          return function() {
            return _this.wrap('(', {
              insert: true
            }, ' ', {
              selected: true
            }, ')');
          };
        })(this)
      },
      'wrap in parentheses': {
        bindKey: {
          win: '(',
          mac: '('
        },
        multiSelectAction: 'forEach',
        autocomplete: true,
        exec: (function(_this) {
          return function() {
            return _this.insertOpeningDelim('(', ')');
          };
        })(this)
      },
      'wrap in brackets': {
        bindKey: {
          win: '[',
          mac: '['
        },
        multiSelectAction: 'forEach',
        autocomplete: true,
        exec: (function(_this) {
          return function() {
            return _this.insertOpeningDelim('[', ']');
          };
        })(this)
      },
      'wrap in braces': {
        bindKey: {
          win: '{',
          mac: '{'
        },
        multiSelectAction: 'forEach',
        autocomplete: true,
        exec: (function(_this) {
          return function() {
            return _this.insertOpeningDelim('{', '}');
          };
        })(this)
      },
      'insert or surround by quotes': {
        bindKey: {
          win: '"',
          mac: '"'
        },
        multiSelectAction: 'forEach',
        exec: (function(_this) {
          return function() {
            var atom, selected;
            if (_this.isEditingHalfDelimited()) {
              if ((atom = _this.editedAtom()).label === 'string' && _this.isAtLimit(FORWARD, atom)) {
                return _this.mutate({
                  inSelection: atom
                });
              } else {
                return _this.insertStringForward('"');
              }
            } else {
              selected = escape('"', _this.selectedText());
              atom = astize('"' + selected + '"', _this.parentOfSelected())[0];
              return _this.mutate(extend({
                changeInTree: {
                  added: [atom],
                  at: _this.selectedTangible()
                }
              }, _this.isSelecting() ? {
                inSelection: atom
              } : {
                withinAtom: atom,
                withinAtomPos: selected.length + 1
              }));
            }
          };
        })(this)
      },
      'select enclosing form or insert )': {
        bindKey: {
          win: ')',
          mac: ')'
        },
        readOnly: true,
        multiSelectAction: 'forEach',
        exec: (function(_this) {
          return function() {
            return _this.closeParentOrInsert(')');
          };
        })(this)
      },
      'select enclosing form or insert }': {
        bindKey: {
          win: '}',
          mac: '}'
        },
        readOnly: true,
        multiSelectAction: 'forEach',
        exec: (function(_this) {
          return function() {
            return _this.closeParentOrInsert('}');
          };
        })(this)
      },
      'select enclosing form or insert ]': {
        bindKey: {
          win: ']',
          mac: ']'
        },
        readOnly: true,
        multiSelectAction: 'forEach',
        exec: (function(_this) {
          return function() {
            return _this.closeParentOrInsert(']');
          };
        })(this)
      },
      'increment a number': {
        bindKey: {
          win: 'Ctrl-Shift-Up',
          mac: 'Alt-Shift-Up'
        },
        multiSelectAction: 'forEach',
        exec: (function(_this) {
          return function() {
            return _this.changeNumerical(1);
          };
        })(this)
      },
      'decrement a number': {
        bindKey: {
          win: 'Ctrl-Shift-Down',
          mac: 'Alt-Shift-Down'
        },
        multiSelectAction: 'forEach',
        exec: (function(_this) {
          return function() {
            return _this.changeNumerical(-1);
          };
        })(this)
      },
      'select enclosing definition': {
        bindKey: {
          win: 'Ctrl-Shift-0',
          mac: 'Command-Shift-0'
        },
        logicalKey: {
          win: 'Ctrl-)',
          mac: 'Command-)'
        },
        readOnly: true,
        multiSelectAction: 'forEach',
        exec: (function(_this) {
          return function() {
            return _this.mutate({
              inSelection: definitionAncestorOf(nodeEdgeOfTangible(FIRST, _this.selectedTangible()))
            });
          };
        })(this)
      },
      'addlabel': {
        bindKey: {
          win: ':',
          mac: ':'
        },
        multiSelectAction: 'forEach',
        autocomplete: true,
        exec: (function(_this) {
          return function() {
            var atom, endOffset, label, _ref1;
            if (_this.isSingleLineInput && _this.editor.getValue() === '') {
              return false;
            }
            if (_this.isEditingHalfDelimited()) {
              return _this.insertStringForward(':');
            } else {
              atom = _this.onlySelectedExpression();
              return _this.mutate(_this.isEditing() || atom && isAtom(atom) ? (endOffset = atom.symbol.length, {
                changeWithinAtom: {
                  string: ':',
                  atom: atom,
                  range: [endOffset, endOffset]
                }
              }) : ((_ref1 = astize(':', _this.parentOfSelected()), label = _ref1[0], _ref1), {
                changeInTree: {
                  added: [label],
                  at: _this.selectedTangible()
                },
                withinAtom: label,
                withinAtomPos: 0
              }));
            }
          };
        })(this)
      },
      'insert a comment': {
        bindKey: {
          win: '#',
          mac: '#'
        },
        multiSelectAction: 'forEach',
        exec: (function(_this) {
          return function() {
            if (_this.isEditingHalfDelimited()) {
              return _this.insertStringForward('#');
            } else {
              return _this.wrap('(', '#', ' ', {
                selected: true,
                select: true
              }, ')');
            }
          };
        })(this)
      },
      'go to definition': {
        bindKey: {
          win: 'Ctrl-E',
          mac: 'Ctrl-E'
        },
        readOnly: true,
        multiSelectAction: 'forEach',
        exec: (function(_this) {
          return function() {
            var atom, loadModule, ref, references, selected, _i, _len, _results;
            loadModule = function(moduleName) {
              return _this.editorInstance.executeCommand('load', moduleName);
            };
            selected = _this.onlySelectedExpression();
            if (selected && (isAtom(atom = selected))) {
              if (atom.id != null) {
                references = (findAllReferences(atom))(_this.ast);
                _results = [];
                for (_i = 0, _len = references.length; _i < _len; _i++) {
                  ref = references[_i];
                  if (!(isName(ref))) {
                    continue;
                  }
                  if (ref.imported) {
                    _this.selectInitially({
                      name: ref.imported.name
                    });
                    loadModule(ref.imported.module);
                  } else {
                    _this.mutate({
                      inSelection: ref
                    });
                  }
                  break;
                }
                return _results;
              } else if (atom.label === 'module') {
                return _this.editorInstance.executeCommand('load', atom.symbol);
              }
            }
          };
        })(this)
      },
      'insert call-site type': {
        bindKey: {
          win: 'Ctrl-T',
          mac: 'Ctrl-T'
        },
        readOnly: true,
        indirect: true,
        autocomplete: true,
        exec: (function(_this) {
          return function(editor, _arg) {
            var selected, targetEditor, targetMode, type, withoutConcretes;
            targetEditor = (_arg != null ? _arg : {}).targetEditor;
            if (targetEditor) {
              targetMode = targetEditor.session.getMode();
              selected = targetMode.onlySelectedExpression();
              if (selected && selected.tea) {
                type = compiler.plainPrettyPrint(selected.tea);
                withoutConcretes = type.replace(/_\d+/, '');
                _this.startGroupMutation();
                _this.insertStringForward("(: " + withoutConcretes + ")");
                _this.mutate({
                  tangibleSelection: firstTypeVarInside(FORWARD, _fst(_arguments(_this.onlySelectedExpression())))
                });
                return _this.finishGroupMutation();
              }
            }
          };
        })(this)
      },
      'show type of an expression': {
        bindKey: {
          win: 'Ctrl-Shift-T',
          mac: 'Ctrl-Shift-T'
        },
        readOnly: true,
        multiSelectAction: 'forEach',
        exec: (function(_this) {
          return function() {
            var expression, selected;
            selected = _this.selectedTangible();
            if (expression = (onlyExpression(selected)) || (fakeAtInsertion(selected))) {
              if (expression.malformed) {
                return window.log(expression.malformed);
              } else if (expression.tea) {
                return window.log(compiler.prettyPrint(expression.tea));
              }
            }
          };
        })(this)
      },
      'remove all source': {
        bindKey: {
          win: 'Ctrl-Shift-Backspace',
          mac: 'Ctrl-Shift-Backspace'
        },
        document: false,
        exec: (function(_this) {
          return function() {
            _this.editor.setValue('');
            return _this.initAst('');
          };
        })(this)
      },
      'replace enclosing Parent expression with current selection': {
        bindKey: {
          win: 'Ctrl-P',
          mac: 'Ctrl-P'
        },
        multiSelectAction: 'forEach',
        exec: (function(_this) {
          return function() {
            var added, at, lifted, parent;
            parent = _this.realParentOfSelected();
            if (parent) {
              added = _this.selectedTangible();
              lifted = reindentTangible(added, parent.parent);
              at = insToTangible([parent]);
              return _this.mutate({
                changeInTree: {
                  added: lifted,
                  at: at
                },
                inSelections: _notEmpty(lifted) ? lifted : void 0,
                tangibleSelection: _empty(lifted) ? outsToTangible(at.out) : void 0
              });
            }
          };
        })(this)
      },
      'wrap current selection in a Function': {
        bindKey: {
          win: 'Ctrl-F',
          mac: 'Ctrl-F'
        },
        multiSelectAction: 'forEach',
        autocomplete: true,
        exec: (function(_this) {
          return function() {
            var separator;
            separator = !(isTangibleAtDefinitionList(_this.selectedTangible())) || _this.isSingleLineInput ? [' '] : ['\n', '  '];
            if (_this.isInserting()) {
              return _this.wrap.apply(_this, ['(', 'fn', ' ', [
                  '[', {
                    insert: true
                  }, ']'
                ]].concat(__slice.call(separator), [{
                  selected: true
                }], [')']));
            } else {
              return _this.wrap('(', 'fn', ' ', '[]', ' ', {
                selected: true,
                select: true
              }, ')');
            }
          };
        })(this)
      },
      'Match on current selection': {
        bindKey: {
          win: 'Ctrl-M',
          mac: 'Ctrl-M'
        },
        multiSelectAction: 'forEach',
        autocomplete: true,
        exec: (function(_this) {
          return function() {
            if (_this.isInserting()) {
              return _this.wrap('(', 'match', ' ', {
                selected: true,
                insert: true
              }, '\n', '  ', ' ', ')');
            } else {
              return _this.wrap('(', 'match', ' ', {
                selected: true
              }, '\n', '  ', {
                insert: true
              }, ' ', ')');
            }
          };
        })(this)
      },
      'wrap in a Match to return current selection': {
        bindKey: {
          win: 'Ctrl-Shift-M',
          mac: 'Ctrl-Shift-M'
        },
        multiSelectAction: 'forEach',
        autocomplete: true,
        exec: (function(_this) {
          return function() {
            return _this.wrap('(', 'match', ' ', {
              insert: true
            }, '\n', '  ', ' ', {
              selected: true
            }, ')');
          };
        })(this)
      },
      'replace selection with an Added function parameter': {
        bindKey: {
          win: 'Ctrl-Shift-A',
          mac: 'Ctrl-A'
        },
        exec: (function(_this) {
          return function() {
            var endOfParams, fun, params, parent;
            parent = siblingTangibleAncestors(_this.selectedTangiblesList())[0];
            if (parent) {
              fun = findParentFunction(toNode(parent));
            }
            if (fun) {
              params = findParamList(fun);
            }
            if (params) {
              endOfParams = outsToTangible(params.slice(-1));
              return _this.mutate(extend((_notEmpty(_terms(params)) ? {
                changeInTree: {
                  added: astize(' ', params),
                  at: endOfParams
                }
              } : {}), {
                newSelections: [endOfParams]
              }));
            }
          };
        })(this)
      },
      'select all occurences of selection to Rename': {
        bindKey: {
          win: 'Ctrl-R',
          mac: 'Ctrl-R'
        },
        multiSelectAction: 'forEach',
        exec: (function(_this) {
          return function() {
            var atom, others, selected, tangibles;
            selected = _this.onlySelectedExpression();
            if (selected && isAtom(atom = selected)) {
              others = (findOtherReferences(atom))(_this.ast);
              tangibles = map(toTangible, others);
              return _this.mutate({
                inSelection: atom,
                newSelections: tangibles
              });
            }
          };
        })(this)
      },
      'Evaluate selected expression': {
        bindKey: {
          win: 'Ctrl-Shift-X',
          mac: 'Ctrl-X'
        },
        readOnly: true,
        indirect: true,
        exec: (function(_this) {
          return function(editor, _arg) {
            var close, open, selected, targetEditor, targetMode, _ref1;
            targetEditor = (_arg != null ? _arg : {}).targetEditor;
            if (targetEditor == null) {
              targetEditor = _this.editor;
            }
            targetMode = targetEditor.session.getMode();
            if (selected = targetMode.onlySelectedExpression()) {
              _ref1 = compiler.astizeList(''), open = _ref1[0], close = _ref1[1];
              return _this.editorInstance.log({
                source: targetEditor.getSelectedText(),
                moduleName: targetMode.moduleName,
                ast: [open, selected, close]
              });
            }
          };
        })(this)
      },
      'Add definition of selected name': {
        bindKey: {
          win: 'Ctrl-Shift-C',
          mac: 'Ctrl-C'
        },
        readOnly: true,
        indirect: true,
        exec: (function(_this) {
          return function(editor, _arg) {
            var atom, def, moved, movedTo, targetEditor, targetMode;
            targetEditor = (_arg != null ? _arg : {}).targetEditor;
            if (targetEditor == null) {
              targetEditor = _this.editor;
            }
            targetMode = targetEditor.session.getMode();
            if ((atom = targetMode.onlySelectedExpression()) && isName(atom)) {
              def = tangibleBetween(toTangible(atom), toTangible(siblingTerm(NEXT, atom)));
              movedTo = _this.insertIntoDefinitionListContaining(_this.selectedTangible());
              moved = reindentTangible(def, movedTo.parent);
              return _this.mutate({
                changeInTree: {
                  added: moved,
                  at: outsToTangible([movedTo])
                },
                inSelections: moved
              });
            }
          };
        })(this)
      },
      'Define selected token': {
        bindKey: {
          win: 'Ctrl-D',
          mac: 'Ctrl-D'
        },
        indirect: true,
        exec: (function(_this) {
          return function(editor, _arg) {
            var args, atom, definition, hole, moved, movedTo, nameHole, newName, originalHoles, rememberedHoles, sameMode, selected, selection, selections, targetEditor, targetMode;
            targetEditor = (_arg != null ? _arg : {}).targetEditor;
            if (targetEditor == null) {
              targetEditor = _this.editor;
            }
            targetMode = targetEditor.session.getMode();
            selected = targetMode.onlySelectedExpression();
            if (selected) {
              sameMode = targetEditor === _this.editor;
              newName = (isAtom(atom = selected)) && atom.malformed;
              _this.startGroupMutation();
              selections = targetMode.selectedTangiblesList();
              if (!newName && sameMode) {
                originalHoles = (function() {
                  var _i, _len, _results;
                  _results = [];
                  for (_i = 0, _len = selections.length; _i < _len; _i++) {
                    selection = selections[_i];
                    this.mutate(this.removeSelectable(selection));
                    _results.push(bookmarkBefore(this.selectedTangible()));
                  }
                  return _results;
                }).call(_this);
              }
              movedTo = _this.insertIntoDefinitionListContaining(_this.selectedTangible());
              if (newName) {
                _this.insertStringForward(isOperator(atom) ? (args = argumentNamesFromCall(atom.parent), "" + atom.symbol + " (fn [" + (args.join(' ')) + "]\n  )") : "" + atom.symbol + " ");
                hole = definition = _this.selectableEdge(LAST);
                if (isOperator(atom)) {
                  hole = tangibleInside(LAST, toNode(definition));
                }
                _this.mutate({
                  tangibleSelection: hole
                });
              } else {
                nameHole = bookmarkBefore(_this.selectedTangible());
                _this.insertSpace(FORWARD, " ");
                moved = reindentTangible(_fst(selections), movedTo.parent);
                rememberedHoles = join(pickupBookmarks(originalHoles || []), [nameHole()]);
                _this.mutate({
                  changeInTree: {
                    added: moved,
                    at: outsToTangible([movedTo])
                  },
                  tangibleSelection: rememberedHoles[0],
                  newSelections: rememberedHoles.slice(1)
                });
              }
              return _this.finishGroupMutation();
            }
          };
        })(this)
      },
      'Inline selected expression or replace a name by its definition': {
        bindKey: {
          win: 'Ctrl-I',
          mac: 'Ctrl-I'
        },
        multiSelectAction: 'forEach',
        exec: (function(_this) {
          return function() {
            var arg, args, atom, body, definition, fn, fun, i, indented, inlined, numInlined, other, others, paramIndex, paramList, params, reducible, reindentedBody, reindentedFn, selected, use, uses, _i, _j, _k, _len, _len1, _len2;
            selected = _this.onlySelectedExpression();
            if (selected && (isAtom(atom = selected))) {
              if (isName(atom)) {
                others = (findOtherReferences(atom))(_this.ast);
                _this.startGroupMutation();
                if ((paramList = parentOf(atom)) && (fun = parentOf(paramList)) && (isOperator(fun)) && (isFunction(fun)) && ((findParamList(fun)) === paramList)) {
                  args = sortedArgs(map(_symbol, _validTerms(paramList)), fun.parent);
                  paramIndex = (_terms(paramList)).indexOf(atom);
                  if (paramIndex < args.length && args[paramIndex]) {
                    inlined = toTangible(args[paramIndex]);
                    _this.mutate({
                      changeInTree: {
                        at: tangibleWithSomeMargin(inlined)
                      }
                    });
                    _this.mutate({
                      changeInTree: {
                        at: tangibleWithSomeMargin(toTangible(atom))
                      }
                    });
                  }
                } else if ((definition = siblingTerm(FORWARD, atom)) && isExpression(definition)) {
                  inlined = toTangible(definition);
                  _this.mutate(_this.removeSelectable(tangibleBetween(toTangible(atom), inlined)));
                  _this.mutate(_this.remove(BACKWARD));
                  if (_this.isInserting()) {
                    _this.mutate(_this.remove(BACKWARD));
                  }
                }
                if (inlined) {
                  for (i = _i = 0, _len = others.length; _i < _len; i = ++_i) {
                    other = others[i];
                    indented = reindentTangible(inlined, other.parent);
                    _this.mutate({
                      changeInTree: {
                        added: indented,
                        at: toTangible(other)
                      }
                    });
                    _this.mutate(i === 0 ? {
                      inSelections: indented
                    } : {
                      newSelections: [insToTangible(indented)]
                    });
                  }
                  return _this.finishGroupMutation();
                }
              } else if (isMacro(atom)) {
                return _this.worker.call('expand', [atom.parent], function(result) {
                  var replacing;
                  if (result) {
                    replacing = reindentNodes([enforceSpacing(result)], atom.parent.parent);
                    return _this.mutate({
                      changeInTree: {
                        added: replacing,
                        at: toTangible(atom.parent)
                      },
                      inSelections: replacing
                    });
                  }
                });
              } else {
                return _this.lookupSource(atom, function(definition) {
                  var replacing;
                  replacing = reindentNodes([definition], atom.parent);
                  return _this.mutate({
                    changeInTree: {
                      added: replacing,
                      at: _this.selectedTangible()
                    },
                    inSelections: replacing
                  });
                });
              }
            } else if (selected && (isBetaReducible(reducible = selected)) || (parentOf(selected)) && (isBetaReducible(reducible = parentOf(selected)))) {
              fn = _operator(reducible);
              params = _validTerms(findParamList(fn));
              args = _arguments(reducible);
              _this.startGroupMutation();
              for (i = _j = 0, _len1 = args.length; _j < _len1; i = ++_j) {
                arg = args[i];
                if (!(i < params.length)) {
                  continue;
                }
                uses = (findOtherReferences(params[i]))(reducible);
                for (_k = 0, _len2 = uses.length; _k < _len2; _k++) {
                  use = uses[_k];
                  indented = reindentTangible(toTangible(arg), use.parent);
                  _this.mutate({
                    changeInTree: {
                      added: indented,
                      at: toTangible(use)
                    }
                  });
                }
              }
              if (args.length === params.length) {
                body = (_terms(fn))[2];
                reindentedBody = reindentTangible(toTangible(body), reducible.parent);
                _this.mutate({
                  changeInTree: {
                    added: reindentedBody,
                    at: toTangible(reducible)
                  },
                  inSelections: reindentedBody
                });
              } else {
                numInlined = Math.min(args.length, params.length);
                _this.mutate({
                  changeInTree: {
                    at: tangibleWithMargin(tangibleBetween(toTangible(params[0]), toTangible(params[numInlined - 1])))
                  }
                });
                _this.mutate({
                  changeInTree: {
                    at: tangibleWithMargin(tangibleBetween(toTangible(args[0]), toTangible(args[numInlined - 1])))
                  }
                });
                if (args.length < params.length) {
                  reindentedFn = reindentTangible(toTangible(fn), reducible.parent);
                  _this.mutate({
                    changeInTree: {
                      added: reindentedFn,
                      at: toTangible(reducible)
                    },
                    inSelections: reindentedFn
                  });
                }
              }
              return _this.finishGroupMutation();
            }
          };
        })(this)
      },
      'abstract an operator with a Lambda': {
        bindKey: {
          win: 'Ctrl-L',
          mac: 'Ctrl-L'
        },
        multiSelectAction: 'forEach',
        exec: (function(_this) {
          return function() {
            var abstractToLambda, args, op, parent, selected;
            abstractToLambda = function(op, args) {
              var argList, call, fn, params, wrapper, _ref1;
              argList = args.join(' ');
              wrapper = astize("(fn [" + argList + "] ( " + argList + "))", op[0].parent);
              _this.startGroupMutation();
              _this.mutate({
                changeInTree: {
                  added: wrapper,
                  at: insToTangible(op)
                },
                inSelections: wrapper
              });
              _ref1 = _terms(wrapper[0]), fn = _ref1[0], params = _ref1[1], call = _ref1[2];
              _this.mutate({
                changeInTree: {
                  added: reindentNodes(op, call),
                  at: outsToTangible([call[1]])
                }
              });
              return _this.finishGroupMutation();
            };
            if (isCall(parent = _this.parentOfSelected())) {
              if (isOperator(toNode(selected = _this.selectedTangible()))) {
                op = selected["in"];
                args = (argumentNamesFromCall(parent)).slice((_validTerms(op)).length - 1);
                return abstractToLambda(op, args);
              } else if ((op = _this.onlySelectedExpression()) && isAtom(op)) {
                return _this.worker.call('docsFor', [atomReference(op)], function(info) {
                  if (info.arity) {
                    args = info.arity;
                    return abstractToLambda([op], args);
                  }
                });
              }
            }
          };
        })(this)
      },
      'push a lambda inside of a call to the Outer expression': {
        bindKey: {
          win: 'Ctrl-O',
          mac: 'Ctrl-O'
        },
        multiSelectAction: 'forEach',
        exec: (function(_this) {
          return function() {
            var form, fun, newCall, newFun, pushedIn, pushedUp, pushedUpBody;
            if ((fun = _this.onlySelectedExpression()) && (isFunction(fun)) && (isOperator(fun)) && (form = parentOf(fun.parent))) {
              _this.startGroupMutation();
              pushedUpBody = reindentNodes([findFunctionBody(fun)], form);
              _this.mutate({
                changeInTree: {
                  added: pushedUpBody,
                  at: toTangible(fun.parent)
                }
              });
              pushedUp = reindentNodes([fun.parent], form.parent);
              newCall = pushedUp[0];
              newFun = _operator(newCall);
              _this.mutate({
                changeInTree: {
                  added: pushedUp,
                  at: toTangible(form)
                }
              });
              pushedIn = reindentNodes([form], newCall);
              _this.mutate({
                changeInTree: {
                  added: pushedIn,
                  at: toTangible(findFunctionBody(newFun))
                },
                inSelection: newFun
              });
              return _this.finishGroupMutation();
            }
          };
        })(this)
      },
      'push definition Up': {
        bindKey: {
          win: 'Ctrl-U',
          mac: 'Ctrl-U'
        },
        multiSelectAction: 'forEach',
        exec: (function(_this) {
          return function() {
            var pushUp, selection;
            selection = _this.selectedTangible();
            pushUp = function(at) {
              var definition, definitionPair, moved, movedTo, name, newSelectionNodes, parent, recover, selectionNodes, separator, top, _ref1, _ref2;
              top = ancestorAtDefinitonList(at);
              definitionPair = isName(top) ? isExpression(definition = siblingTerm(FORWARD, top)) ? tangibleBetween(toTangible(top), toTangible(definition)) : void 0 : isName(name = siblingTerm(BACKWARD, top)) ? tangibleBetween(toTangible(name), toTangible(top)) : void 0;
              if (definitionPair && parentOf(top)) {
                parent = ancestorAtDefinitonList(top.parent);
                movedTo = nodeEdgeOfTangible(LAST, toTangible(parent));
                _ref1 = memorable(selection), selectionNodes = _ref1[0], recover = _ref1[1];
                _ref2 = reindentTangiblePreserving(definitionPair, parent.parent, selectionNodes), moved = _ref2[0], newSelectionNodes = _ref2[1];
                separator = parentOf(parent) ? '\n' : '\n\n';
                _this.startGroupMutation();
                _this.mutate(_this.removeSelectable(definitionPair));
                if (_this.isInserting()) {
                  _this.mutate(_this.remove(BACKWARD));
                }
                _this.insertSpaceAt(FORWARD, separator, movedTo);
                _this.mutate({
                  changeInTree: {
                    added: moved,
                    at: {
                      "in": [],
                      out: [movedTo]
                    }
                  },
                  memorableSelection: [recover, newSelectionNodes]
                });
                return _this.finishGroupMutation();
              } else {
                return pushUp(parentOf(at));
              }
            };
            return pushUp(toNode(_this.selectedTangible()));
          };
        })(this)
      }
    });
  };

  _Class.prototype.multiSelectReferenceInDirection = function(direction) {
    var atom, references, selected;
    selected = this.onlySelectedExpression();
    if (selected && (isAtom(atom = selected)) && (atom.id != null)) {
      references = (findAllReferences(atom))(this.ast);
      return this.mutate({
        newSelections: [toTangible(findAdjecentInList(direction, atom, references))]
      });
    } else {
      return this.multiSelectOccurenceInDirection(direction);
    }
  };

  _Class.prototype.multiSelectOccurenceInDirection = function(direction) {
    var occurences, selected;
    if (!this.isInserting()) {
      selected = this.selectedTangible()["in"];
      occurences = (findAllOccurences(selected))(this.ast);
      return this.mutate({
        newSelections: [insToTangible(findAdjecentInList(direction, selected, occurences))]
      });
    }
  };

  _Class.prototype.selectReferenceInDirection = function(direction) {
    var atom, references, selected;
    selected = this.onlySelectedExpression();
    if (selected && (isAtom(atom = selected)) && (atom.id != null)) {
      references = (findAllReferences(atom))(this.ast);
      return this.mutate({
        inSelection: findAdjecentInList(direction, atom, references)
      });
    } else {
      return this.selectOccurenceInDirection(direction);
    }
  };

  _Class.prototype.selectOccurenceInDirection = function(direction) {
    var occurences, selected;
    if (!this.isInserting()) {
      selected = this.selectedTangible()["in"];
      occurences = (findAllOccurences(selected))(this.ast);
      return this.mutate({
        inSelections: findAdjecentInList(direction, selected, occurences)
      });
    }
  };

  _Class.prototype.moveDown = function(inTree, inAtom) {
    var expression;
    return this.mutate(this.isSelectingMultiple() ? {
      tangibleSelection: this.selectableEdge(inTree)
    } : (expression = this.onlySelectedExpression()) ? isForm(expression) ? {
      tangibleSelection: tangibleInside(inTree, expression)
    } : {
      withinAtom: expression,
      withinAtomPos: editableEdgeWithin(inAtom, expression)
    } : {});
  };

  _Class.prototype.changeNumerical = function(difference) {
    var atom, changed, changedSymbol, editing, offset;
    if ((atom = this.onlySelectedExpression()) && isNumerical(atom)) {
      offset = this.offsetToCursor(atom);
      changedSymbol = changeNumericalAt(atom.symbol, offset, difference);
      changed = astize(changedSymbol, atom.parent)[0];
      editing = this.isEditing();
      return this.mutate({
        changeInTree: {
          added: [changed],
          at: this.selectedTangible()
        },
        inSelection: !editing ? changed : void 0,
        withinAtom: editing ? changed : void 0,
        withinAtomPos: editing ? changed.symbol.length - (atom.symbol.length - offset) : void 0
      });
    }
  };

  _Class.prototype.closeParentOrInsert = function(closingDelim) {
    if (this.isEditingHalfDelimited()) {
      return this.insertStringForward(closingDelim);
    } else {
      return this.mutate({
        inSelection: this.realParentOfSelected()
      });
    }
  };

  _Class.prototype.insertOpeningDelim = function(open, close) {
    if (this.isEditingHalfDelimited()) {
      return this.insertStringForward(open);
    } else {
      return this.wrap(open, {
        selected: true,
        select: true
      }, close);
    }
  };

  _Class.prototype.wrap = function() {
    var findTags, flatten, isString, tags, tokens;
    tokens = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
    isString = function(s) {
      return typeof s === 'string';
    };
    findTags = function(tokens) {
      var at, ats, i, key, nestedTags, offset, path, tagged, tags, _i, _j, _len, _len1;
      tags = {};
      offset = 0;
      for (i = _i = 0, _len = tokens.length; _i < _len; i = ++_i) {
        tagged = tokens[i];
        if (!isString(tagged)) {
          if (Array.isArray(tagged)) {
            nestedTags = findTags(tagged);
            for (key in nestedTags) {
              ats = nestedTags[key];
              for (_j = 0, _len1 = ats.length; _j < _len1; _j++) {
                at = ats[_j];
                path = {};
                (tags[key] != null ? tags[key] : tags[key] = []).push({
                  parent: i - offset,
                  child: at
                });
              }
            }
          } else {
            for (key in tagged) {
              (tags[key] != null ? tags[key] : tags[key] = []).push(i - offset);
            }
            offset++;
          }
        }
      }
      return tags;
    };
    tags = findTags(tokens);
    flatten = function(list) {
      var flattened, node;
      if (Array.isArray(list)) {
        return ((function() {
          var _i, _len, _results;
          _results = [];
          for (_i = 0, _len = list.length; _i < _len; _i++) {
            node = list[_i];
            if (flattened = flatten(node)) {
              _results.push(flattened);
            }
          }
          return _results;
        })()).join('');
      } else if (isString(list)) {
        return list;
      }
    };
    return this.wrapIn(flatten(tokens), this.selectedTangible(), tags);
  };

  _Class.prototype.wrapIn = function(wrapperString, tangible, _arg) {
    var atPath, empty, insert, select, selected, selections, wrapped, wrapper;
    selected = _arg.selected, select = _arg.select, insert = _arg.insert;
    if (selected == null) {
      throw new Error("missing selected in wrapIn");
    }
    wrapper = astize(wrapperString, parentOfTangible(tangible))[0];
    empty = tangible["in"].length === 0;
    atPath = function(path, node) {
      if (path.parent) {
        return atPath(path.child, node[path.parent]);
      } else {
        return node[path];
      }
    };
    this.startGroupMutation();
    this.mutate({
      changeInTree: {
        added: [wrapper],
        at: tangible
      }
    });
    wrapped = reindentTangible(tangible, wrapper);
    selections = join(select || [], insert || []);
    this.mutate({
      changeInTree: {
        added: wrapped,
        at: {
          "in": [],
          out: [atPath(selected[0], wrapper)]
        }
      },
      inSelections: select && !empty ? wrapped : void 0,
      tangibleSelection: !select || empty ? {
        "in": [],
        out: [atPath(selections[0], wrapper)]
      } : void 0,
      newSelections: map((function(i) {
        return {
          "in": [],
          out: [atPath(i, wrapper)]
        };
      }), selections.slice(1))
    });
    return this.finishGroupMutation();
  };

  _Class.prototype.removeNewLines = function() {
    var flattenNodes, nodes, replacing, selected;
    selected = this.selectedTangible();
    nodes = selected["in"];
    flattenNodes = function(nodes) {
      var node, _i, _len, _results;
      _results = [];
      for (_i = 0, _len = nodes.length; _i < _len; _i++) {
        node = nodes[_i];
        if (!isIndent(node)) {
          if (isNewLine(node)) {
            _results.push((astize(' ', node.parent))[0]);
          } else if (isForm(node)) {
            _results.push(listToForm(flattenNodes(node)));
          } else {
            _results.push(cloneNode(node));
          }
        }
      }
      return _results;
    };
    replacing = flattenNodes(nodes);
    return this.mutate({
      changeInTree: {
        added: replacing,
        at: selected
      },
      inSelections: replacing
    });
  };

  _Class.prototype.moveSelectionByLine = function(direction) {
    var onSiblingLine, replacedLine, selected, selectedLine;
    selected = this.selectedTangible();
    selectedLine = insToTangible(this.allOnLine(toNode(selected)));
    if (onSiblingLine = sibling(direction, edgeOfList(direction, padding(direction, selectedLine)))) {
      replacedLine = insToTangible(this.allOnLine(onSiblingLine));
      return this.swap(direction, selectedLine, replacedLine);
    }
  };

  _Class.prototype.allOnLine = function(node) {
    var isInline, isOnLine, parent, towards;
    isOnLine = (function(_this) {
      return function(node) {
        var range;
        range = _this.rangeOfNodes([node]);
        return range.start.row === range.end.row;
      };
    })(this);
    isInline = function(node) {
      return (isExpression(node)) || (isSpace(node));
    };
    towards = function(dir) {
      var n, prev, _results;
      n = node;
      _results = [];
      while ((prev = sibling(dir, n)) && isInline(prev)) {
        _results.push(n = prev);
      }
      return _results;
    };
    if ((parent = parentOf(node)) && isOnLine(parent)) {
      return this.allOnLine(parent);
    }
    return concat([(towards(FIRST)).reverse(), (isInline(node) ? [node] : []), towards(LAST)]);
  };

  _Class.prototype.moveSelection = function(direction) {
    var atom, replaced, selected;
    if (this.isEditing()) {
      atom = this.editedAtom();
      if (!this.isAtLimit(direction, atom)) {
        return this.mutate({
          withinAtom: atom,
          withinAtomPos: (this.offsetToCursor(atom)) + direction
        });
      }
    } else {
      selected = this.selectedTangible();
      replaced = this.selectedSibling(direction);
      if (replaced) {
        return this.swap(direction, selected, replaced);
      }
    }
  };

  _Class.prototype.swap = function(direction, selected, replaced) {
    var movingReplaced, movingSelected, targetHole;
    movingSelected = cloneNodes(selected["in"]);
    movingReplaced = cloneNodes(replaced["in"]);
    this.startGroupMutation();
    this.mutate({
      changeInTree: {
        added: [],
        at: selected
      }
    });
    this.mutate({
      changeInTree: {
        added: movingReplaced,
        at: {
          "in": [],
          out: selected.out
        }
      }
    });
    this.mutate({
      changeInTree: {
        added: [],
        at: replaced
      }
    });
    targetHole = {
      "in": [],
      out: replaced.out
    };
    this.mutate({
      changeInTree: {
        added: movingSelected,
        at: targetHole
      },
      inSelections: _notEmpty(movingSelected) ? movingSelected : void 0,
      tangibleSelection: _empty(movingSelected) ? targetHole : void 0
    });
    return this.finishGroupMutation();
  };

  _Class.prototype.insertStringForward = function(string) {
    return this.insertString(FORWARD, string);
  };

  _Class.prototype.insertString = function(direction, string) {
    var added, atom, delimiter, offset, validString;
    if (string == null) {
      throw "Missing string in insertString";
    }
    return this.mutate(this.isEditing() ? (atom = this.editedAtom(), validString = isDelimitedAtom(atom) ? (delimiter = atomDelimiter(atom), escape(delimiter, string)) : string, offset = this.offsetToCursor(atom), {
      changeWithinAtom: {
        string: validString,
        range: atom.label === 'char' && atom.symbol === '\\_' ? [1, 2] : [offset, offset]
      }
    }) : (added = astize(string, this.parentOfSelected()), extend({
      changeInTree: {
        added: added,
        at: this.selectedTangible()
      }
    }, added.length === 1 && isAtom((atom = added[0])) ? {
      withinAtom: atom,
      withinAtomPos: atom.symbol.length
    } : {
      inSelections: added
    })));
  };

  _Class.prototype.insertSpace = function(direction, space) {
    if (this.isEditing() && isDelimitedAtom(this.editedAtom())) {
      return this.insertString(direction, space);
    } else {
      return this.insertSpaceAt(direction, space, this.selectedNodeEdge(direction));
    }
  };

  _Class.prototype.replaceSpace = function(direction, newLine) {
    var margin, siblingTangible, _ref1;
    _ref1 = this.toSelectionSibling(direction), margin = _ref1.margin, siblingTangible = _ref1.siblingTangible;
    if (margin && isSpace(edgeOfList(opposite(direction), margin["in"]))) {
      return this.mutate({
        changeInTree: {
          added: astize(newLine, parentOfTangible(margin)),
          at: margin
        },
        tangibleSelection: siblingTangible
      });
    } else {
      return this.insertSpace(direction, newLine);
    }
  };

  _Class.prototype.insertSpaceAt = function(direction, space, insertPos) {
    var added, parent;
    parent = insertPos.parent;
    added = astize(space, parent);
    return this.mutate({
      changeInTree: {
        added: added,
        at: {
          "in": [],
          out: [insertPos]
        }
      },
      tangibleSelection: {
        "in": [],
        out: direction === FORWARD ? [insertPos] : added
      }
    });
  };

  _Class.prototype.insertIntoDefinitionListContaining = function(tangible) {
    var movedTo, separator, top;
    top = ancestorAtDefinitonList(toNode(tangible));
    movedTo = nodeEdgeOfTangible(LAST, termToTangible(top));
    if (!top.fake || isName(siblingTerm(PREVIOUS, top))) {
      separator = parentOf(top) ? '\n' : '\n\n';
      this.insertSpaceAt(FORWARD, separator, movedTo);
    }
    return movedTo;
  };

  _Class.prototype.selectLineAdjecentAtomOrPosition = function(direction) {
    var adjecent, column, form, formEdge, formStart, insideDirection, pos, row, selected, toSelect, _ref1;
    pos = this.startPos(selected = toNode(this.selectedTangible()));
    column = (_ref1 = this.editor.selection.$desiredColumn) != null ? _ref1 : pos.column;
    row = pos.row + direction;
    adjecent = this.tangibleAtPos({
      row: row,
      column: column + 1
    });
    toSelect = isForm(form = toNode(adjecent)) ? (formStart = this.startPos(form), formEdge = this.edgeOfNode(direction, form), insideDirection = formEdge.row === row && formStart.column > column ? FIRST : isNodeInside(selected, form) ? direction : opposite(direction), termToTangible(limitTerm(insideDirection, toNode(adjecent)))) : adjecent;
    return this.mutate({
      tangibleSelection: toSelect,
      desiredColumn: column
    });
  };

  _Class.prototype.selectFollowingAtomOrPosition = function(direction) {
    if (this.isSelectingMultiple()) {
      return this.selectSibling(direction);
    } else {
      return this.mutate({
        tangibleSelection: followingTangibleAtomOrPosition(direction, this.selectedTangible())
      });
    }
  };

  _Class.prototype.selectSibling = function(direction) {
    var siblingSelection;
    return this.mutate(this.isSelectingMultiple() ? {
      tangibleSelection: this.selectableEdge(direction)
    } : (siblingSelection = this.selectedSibling(direction), !siblingSelection && isReal(this.parentOfSelected()) ? {
      inSelection: this.parentOfSelected()
    } : {
      tangibleSelection: siblingSelection
    }));
  };

  _Class.prototype.expandSelection = function(direction) {
    var margin, siblingTangible, toSibling, _ref1;
    _ref1 = this.toSelectionSibling(direction), margin = _ref1.margin, siblingTangible = _ref1.siblingTangible;
    return this.mutate(siblingTangible ? (toSibling = append(direction, margin, siblingTangible), {
      tangibleSelection: append(direction, this.selectedTangible(), toSibling)
    }) : {
      inSelection: this.realParentOfSelected()
    });
  };

  _Class.prototype.tangibleAtPos = function(pos) {
    var after, before, res, _ref1;
    _ref1 = this.tokensSurroundingPos(pos), before = _ref1[0], after = _ref1[1];
    res = tangibleSurroundedBy(FORWARD, before, after || before);
    return res;
  };

  _Class.prototype.tokenFollowingPos = function(pos) {
    var after, before, _ref1;
    _ref1 = this.tokensSurroundingPos(pos), before = _ref1[0], after = _ref1[1];
    return after || before;
  };

  _Class.prototype.tokensSurroundingPos = function(pos) {
    var idx;
    idx = this.trimmedPosToIdx(pos);
    return findNodesBetween(this.ast, idx - 1, idx + 1);
  };

  _Class.prototype.tangibleRange = function(tangible) {
    var end, start, _ref1;
    _ref1 = nodeEdgesOfTangible(tangible), start = _ref1[0], end = _ref1[1];
    return positionsToRange(this.startPos(start), this.startPos(end));
  };

  _Class.prototype.remove = function(direction) {
    var atLimit, atom, defaultMargin, next, offset, parent, previous, removeDirection, removeMargin, tn;
    return this.mutate((atom = this.editedAtom()) ? atLimit = (editableLength(atom)) === (isDelimitedAtom(atom) ? 0 : 1) ? this.removeSelectable(this.selectedTangible()) : (offset = this.offsetToCursor(atom), removeDirection = this.isAtLimit(direction, atom) ? opposite(direction) : direction, {
      changeWithinAtom: {
        string: '',
        range: [offset, offset + removeDirection]
      }
    }) : this.isSelecting() ? this.removeSelectable(this.selectedTangible()) : (tn = this.selectedTangible(), defaultMargin = this.selectionMargin(direction), removeDirection = defaultMargin ? direction : opposite(direction), removeMargin = this.selectionMargin(removeDirection), removeMargin ? (previous = sibling(PREVIOUS, nodeEdgeOfTangible(FIRST, removeMargin)), next = nodeEdgeOfTangible(LAST, removeMargin), {
      changeInTree: {
        at: removeMargin
      },
      tangibleSelection: tangibleSurroundedBy(FORWARD, previous, next)
    }) : isReal(parent = this.parentOfSelected()) ? this.removeSelectable(insToTangible([parent])) : {}));
  };

  _Class.prototype.removeSelected = function() {
    if (!this.isInserting()) {
      return this.mutate(this.removeSelectable(this.selectedTangible()));
    }
  };

  _Class.prototype.removeSelectable = function(tangible) {
    return {
      changeInTree: {
        at: tangible
      },
      tangibleSelection: {
        "in": [],
        out: tangible.out
      }
    };
  };

  _Class.prototype.isAtLimit = function(direction, atom) {
    var toLimit;
    toLimit = this.distance(this.cursorPosition(), this.editableEdge(direction, atom));
    return toLimit === 0;
  };

  _Class.prototype.offsetToCursor = function(atom) {
    return this.distance(this.cursorPosition(), this.startPos(atom));
  };

  _Class.prototype.selectedText = function() {
    if (this.isEditing()) {
      return this.editedAtom().symbol;
    } else {
      return this.editor.getSelectedText();
    }
  };

  _Class.prototype.selectableEdge = function(direction) {
    return tangibleEdge(direction, this.selectedTangible());
  };

  _Class.prototype.editableEdge = function(direction, atom) {
    if (isDelimitedAtom(atom)) {
      return this.idxToPos((edgeIdxOfNode(direction, atom)) + (opposite(direction)));
    } else {
      return this.edgeOfNode(direction, atom);
    }
  };

  _Class.prototype.realParentOfSelected = function() {
    var parent;
    if (isReal(parent = this.parentOfSelected())) {
      return parent;
    }
  };

  _Class.prototype.parentOfSelected = function() {
    return parentOfTangible(this.selectedTangible());
  };

  _Class.prototype.selectedSibling = function(direction) {
    return (this.toSelectionSibling(direction)).siblingTangible;
  };

  _Class.prototype.toSelectionSibling = function(direction) {
    var margin, siblingTangible;
    margin = this.selectionMargin(direction);
    if (margin) {
      siblingTangible = padding(direction, margin);
      return {
        margin: margin,
        siblingTangible: tangibleSurroundedBy(direction, edgeOfList(direction, margin["in"]), edgeOfList(opposite(direction), siblingTangible))
      };
    } else {
      return {};
    }
  };

  _Class.prototype.selectionMargin = function(direction) {
    return tangibleMargin(direction, this.selectedTangible());
  };

  _Class.prototype.selectedNodeEdge = function(direction) {
    return nodeEdgeOfTangible(direction, this.selectedTangible());
  };

  _Class.prototype.editedAtom = function() {
    if (this.isEditing()) {
      return this.onlySelectedExpression();
    }
  };

  _Class.prototype.onlySelectedExpression = function() {
    return onlyExpression(this.selectedTangible());
  };

  _Class.prototype.startGroupMutation = function() {
    return this.groupMutating = true;
  };

  _Class.prototype.finishGroupMutation = function() {
    this.groupMutating = false;
    return this.undoManager().packGroupMutation();
  };

  _Class.prototype.registerMutation = function(state, way) {
    var atom, selectionMutation, _base;
    selectionMutation = this.isEditing() ? (atom = this.editedAtom(), {
      withinAtom: atom,
      withinAtomPos: this.distance(this.startPos(atom), this.editor.selection.getRange().end)
    }) : {
      tangibleSelection: this.selectedTangible()
    };
    return typeof (_base = this.undoManager()).registerMutation === "function" ? _base.registerMutation(state, selectionMutation, way) : void 0;
  };

  _Class.prototype.replay = function(stack, way) {
    var state, states, _i, _len;
    states = stack.pop();
    if (states) {
      this.startGroupMutation();
      for (_i = 0, _len = states.length; _i < _len; _i++) {
        state = states[_i];
        this.mutate(state, way);
      }
      return this.finishGroupMutation();
    }
  };

  _Class.prototype.mutate = function(state, way) {
    var added, addedString, atom, editing, range, recover, removedRange, replaced, selectionNodes, selectionRange, selections, tangible, _base, _i, _len, _ref1, _ref2;
    if (way == null) {
      way = {
        undo: true
      };
    }
    this.registerMutation(state, way);
    if (!this.groupMutating) {
      if (typeof (_base = this.undoManager()).packGroupMutation === "function") {
        _base.packGroupMutation();
      }
    }
    if (state.changeInTree) {
      replaced = state.changeInTree.at;
      added = state.changeInTree.added || [];
      removedRange = this.rangeOfTangible(replaced);
      addedString = nodesToString(added);
      ammendAst(replaced, added);
    }
    if (state.changeWithinAtom) {
      if (removedRange) {
        throw "atom edit during tree edit not supported";
      }
      replaced = state.changeWithinAtom.range;
      added = state.changeWithinAtom.string;
      atom = state.changeWithinAtom.atom || this.editedAtom();
      removedRange = this.rangeWithingAtom(atom, replaced);
      addedString = added;
      ammendToken(atom, replaced, added);
    }
    if (addedString != null) {
      this.repositionAst();
      this.docReplace(removedRange, addedString);
    }
    if (state.inSelection || state.inSelections || state.tangibleSelection || state.selectionRange || state.memorableSelection) {
      selections = state.tangibleSelection || state.selectionRange && (this.tangibleSelectionFromRange(state.selectionRange)) || state.memorableSelection && (_ref1 = state.memorableSelection, recover = _ref1[0], selectionNodes = _ref1[1], _ref1) && (recover(selectionNodes)) || insToTangible(state.inSelections || [state.inSelection]);
      selectionRange = this.rangeOfTangible(selections);
      editing = false;
    }
    if (state.withinAtom) {
      if (selections) {
        throw "shouldn't set both withinAtom and selection";
      }
      selections = insToTangible([state.withinAtom]);
      selectionRange = this.rangeWithingAtom(state.withinAtom, [state.withinAtomPos, state.withinAtomPos]);
      editing = true;
    }
    if (selections) {
      this.select(selections, editing);
      this.setSelectionRange(selectionRange, state.desiredColumn);
    }
    if (state.newSelections) {
      _ref2 = state.newSelections;
      for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
        tangible = _ref2[_i];
        range = this.tangibleRange(tangible);
        this.selectFor(tangible, false, range);
        this.editor.selection.addRange(range);
      }
    }
    return true;
  };

  _Class.prototype.handleCommandExecution = function(e) {
    this.updateEditingMarkers();
    this.updateErrorMarkers();
    this.closeTooltip();
    return this.doAutocomplete(e);
  };

  _Class.prototype.select = function(selections, shouldEdit) {
    this.editor.selection.$nodes = selections;
    return this.editor.selection.$editing = shouldEdit;
  };

  _Class.prototype.selectFor = function(selections, shouldEdit, editorSelection) {
    editorSelection.$nodes = selections;
    return editorSelection.$editing = shouldEdit;
  };

  _Class.prototype.setSelectionRange = function(range, desiredColumn) {
    this.editor.selection.setSelectionRange(range);
    return this.editor.selection.$desiredColumn = desiredColumn;
  };

  _Class.prototype.updateEditingMarkers = function() {
    var editorSelections, i, range, _i, _len;
    editorSelections = this.isMultiSelecting() ? this.editor.multiSelect.ranges : [this.editor.selection];
    for (i = _i = 0, _len = editorSelections.length; _i < _len; i = ++_i) {
      range = editorSelections[i];
      this.updateEditingMarkerFor(this.isEditingFor(range), range);
    }
  };

  _Class.prototype.updateEditingMarkerFor = function(shouldEdit, editorSelection) {
    var atom, id, range;
    if (id = editorSelection.$editMarker) {
      this.editor.session.removeMarker(id);
      editorSelection.$editMarker = void 0;
    }
    if (shouldEdit) {
      atom = onlyExpression(editorSelection.$nodes);
      range = this.editableRange(atom);
      id = this.editor.session.addMarker(range, 'ace_active-token');
      return editorSelection.$editMarker = id;
    }
  };

  _Class.prototype.isMultiSelecting = function() {
    return this.editor.multiSelect.inMultiSelectMode;
  };

  _Class.prototype.selectedTangiblesList = function() {
    var selection, _i, _ref1, _results;
    if (this.isMultiSelecting()) {
      _ref1 = this.editor.multiSelect.ranges;
      _results = [];
      for (_i = _ref1.length - 1; _i >= 0; _i += -1) {
        selection = _ref1[_i];
        _results.push(selection.$nodes);
      }
      return _results;
    } else {
      return [this.selectedTangible()];
    }
  };

  _Class.prototype.selectedTangible = function() {
    return this.editor.selection.$nodes;
  };

  _Class.prototype.isEditing = function() {
    return this.editor.selection.$editing;
  };

  _Class.prototype.isEditingFor = function(editorSelection) {
    return editorSelection.$editing;
  };

  _Class.prototype.isEditingDelimited = function() {
    return this.isEditing() && isDelimitedAtom(this.editedAtom());
  };

  _Class.prototype.isEditingHalfDelimited = function() {
    return this.isEditing() && isHalfDelimitedAtom(this.editedAtom());
  };

  _Class.prototype.isSelecting = function() {
    return !this.isEditing() && this.selectedTangible()["in"].length > 0;
  };

  _Class.prototype.isSelectingMultiple = function() {
    return this.isSelecting() && this.selectedTangible()["in"].length > 1;
  };

  _Class.prototype.isInserting = function() {
    return this.selectedTangible()["in"].length === 0;
  };

  _Class.prototype.toText = function(node) {
    return this.editor.session.doc.getTextRange(this.range(node));
  };

  _Class.prototype.editableRange = function(atom) {
    if (isDelimitedAtom(atom)) {
      return this.delimitedAtomRange(atom);
    } else {
      return this.range(atom);
    }
  };

  _Class.prototype.cursorPosition = function() {
    return this.editor.getCursorPosition();
  };

  _Class.prototype.handleRangeDeselect = function(_arg) {
    var range, ranges, _i, _len, _results;
    ranges = _arg.ranges;
    _results = [];
    for (_i = 0, _len = ranges.length; _i < _len; _i++) {
      range = ranges[_i];
      _results.push(this.updateEditingMarkerFor(false, range));
    }
    return _results;
  };

  _Class.prototype.delimitedAtomRange = function(atom) {
    var end, start, _ref1;
    _ref1 = this.range(atom), start = _ref1.start, end = _ref1.end;
    return Range.fromPoints(this.shiftPosBy(start, 1), this.shiftPosBy(end, -1));
  };

  _Class.prototype.rangeWithingAtom = function(atom, range) {
    var end, start, _ref1;
    _ref1 = sortTuple(range), start = _ref1[0], end = _ref1[1];
    return Range.fromPoints(this.idxToPos(atom.start + start), this.idxToPos(atom.start + end));
  };

  _Class.prototype.rangeOfNodes = function(nodes) {
    var first, last;
    first = nodes[0], last = nodes[nodes.length - 1];
    return positionsToRange(this.startPos(first), this.endPos(last));
  };

  _Class.prototype.rangeOfTangible = function(tangible) {
    var from, to, _ref1;
    _ref1 = nodeEdgesOfTangible(tangible), from = _ref1[0], to = _ref1[1];
    return positionsToRange(this.startPos(from), this.startPos(to));
  };

  _Class.prototype.range = function(node) {
    var end, start;
    start = this.startPos(node);
    end = this.endPos(node);
    return Range.fromPoints(start, end);
  };

  _Class.prototype.endOfLine = function(pos) {
    return this.idxToPos((this.posToIdx({
      row: pos.row + 1,
      column: 0
    })) - 1);
  };

  _Class.prototype.edgeOfNode = function(direction, node) {
    return this.idxToPos(edgeIdxOfNode(direction, node));
  };

  _Class.prototype.nodeRange = function(node) {
    return positionsToRange(this.startPos(node), this.endPos(node));
  };

  _Class.prototype.startPos = function(node) {
    return this.idxToPos(node.start);
  };

  _Class.prototype.endPos = function(node) {
    return this.idxToPos(node.end);
  };

  _Class.prototype.distance = function(posA, posB) {
    return Math.abs((this.posToIdx(posB)) - (this.posToIdx(posA)));
  };

  _Class.prototype.idxToPos = function(idx) {
    return this.editor.session.doc.indexToPosition(idx);
  };

  _Class.prototype.posToIdx = function(pos) {
    return this.editor.session.doc.positionToIndex(pos);
  };

  _Class.prototype.trimmedPosToIdx = function(pos) {
    return this.posToIdx(this.editor.session.$clipPositionToDocument(pos.row, pos.column));
  };

  _Class.prototype.shiftPosBy = function(pos, offset) {
    return this.idxToPos((this.posToIdx(pos)) + offset);
  };

  _Class.prototype.docReplace = function(range, text) {
    var doc;
    doc = this.editor.session.doc;
    doc.remove(range);
    return doc.insert(range.start, text);
  };

  _Class.prototype.prepareWorker = function() {
    var worker;
    worker = new DistributingWorkerClient(["ace", "compilers"], "compilers/teascript/worker", "Worker", null);
    return this.worker = worker;
  };

  _Class.prototype.createWorker = function(session) {
    if (!this.worker) {
      throw new Error("Missing worker in mode");
    }
    this.worker.attachToDocument(session.getDocument());
    this.worker.on("error", function(e) {
      return session.setAnnotations([e.data]);
    });
    this.worker.on("ok", (function(_this) {
      return function(e) {
        return session.clearAnnotations();
      };
    })(this));
    return this.worker;
  };

  _Class.prototype.assignModuleName = function(moduleName) {
    if (moduleName !== this.moduleName) {
      this.moduleName = moduleName;
      return this.worker.call('setModuleName', [moduleName]);
    }
  };

  return _Class;

})(TextMode);

CustomUndoManager = (function() {
  function CustomUndoManager(mode) {
    this.mode = mode;
    this.reset = __bind(this.reset, this);
    this.redo = __bind(this.redo, this);
    this.undo = __bind(this.undo, this);
    this.packGroupMutation = __bind(this.packGroupMutation, this);
    this.registerMutation = __bind(this.registerMutation, this);
    this.execute = __bind(this.execute, this);
    this.reset();
  }

  CustomUndoManager.prototype.execute = function() {};

  CustomUndoManager.prototype.registerMutation = function(state, selectionMutation, way) {
    var added, atom, from, replaced, reversals, stack, to, _ref1;
    stack = way.undo ? this.undoStack : this.redoStack;
    reversals = [];
    if (state.changeInTree) {
      replaced = state.changeInTree.at;
      added = state.changeInTree.added || [];
      reversals.push({
        changeInTree: {
          at: {
            "in": added,
            out: replaced.out
          },
          added: replaced["in"]
        }
      });
    }
    if (state.changeWithinAtom) {
      _ref1 = sortTuple(state.changeWithinAtom.range), from = _ref1[0], to = _ref1[1];
      added = state.changeWithinAtom.string;
      atom = state.changeWithinAtom.atom || this.mode.editedAtom();
      reversals.push({
        changeWithinAtom: {
          range: [from, from + added.length],
          string: atom.symbol.slice(from, to),
          atom: atom
        }
      });
    }
    reversals.push(selectionMutation);
    this.groupMutationRegister.stack = stack;
    return this.groupMutationRegister.states.push(merge(reversals));
  };

  CustomUndoManager.prototype.packGroupMutation = function() {
    var res, stack, states, _ref1;
    _ref1 = this.groupMutationRegister, stack = _ref1.stack, states = _ref1.states;
    states.reverse();
    stack.push((this.sameKindMutation(states, stack[stack.length - 1] || []) ? res = states.concat(stack.pop()) : states));
    return this.groupMutationRegister = {
      states: []
    };
  };

  CustomUndoManager.prototype.undo = function() {
    return this.mode.replay(this.undoStack, {
      redo: true
    });
  };

  CustomUndoManager.prototype.redo = function() {
    return this.mode.replay(this.redoStack, {
      undo: true
    });
  };

  CustomUndoManager.prototype.reset = function() {
    this.undoStack = [];
    this.redoStack = [];
    return this.groupMutationRegister = {
      states: []
    };
  };

  CustomUndoManager.prototype.sameKindMutation = function(previousStates, nextStates) {
    var atom, n, p, _ref1, _ref2, _ref3, _ref4, _ref5, _ref6, _ref7, _ref8;
    if (previousStates.length > 0 && nextStates.length > 0) {
      p = previousStates[0];
      n = nextStates[0];
      return (atom = (_ref1 = p.changeInTree) != null ? _ref1.added[0] : void 0) && atom === ((_ref2 = n.changeWithinAtom) != null ? _ref2.atom : void 0) || (atom = (_ref3 = p.changeWithinAtom) != null ? _ref3.atom : void 0) && p.changeWithinAtom.string.length > 0 && atom === ((_ref4 = n.changeWithinAtom) != null ? _ref4.atom : void 0) && n.changeWithinAtom.string.length > 0 || (atom = (_ref5 = p.changeWithinAtom) != null ? _ref5.atom : void 0) && p.changeWithinAtom.string.length === 0 && atom === ((_ref6 = n.changeInTree) != null ? _ref6.at["in"][0] : void 0) || (atom = (_ref7 = p.changeWithinAtom) != null ? _ref7.atom : void 0) && p.changeWithinAtom.string.length === 0 && atom === ((_ref8 = n.changeWithinAtom) != null ? _ref8.atom : void 0) && n.changeWithinAtom.string.length === 0;
    } else {
      return false;
    }
  };

  return CustomUndoManager;

})();

argumentNamesFromCall = function(call) {
  var addArgName, argNames, args, defaultNames, i, labeled, term, _i, _len, _ref1;
  defaultNames = "xyzwtuvmnopqrs";
  labeled = false;
  i = 0;
  argNames = {};
  args = [];
  addArgName = function(symbol) {
    var count;
    return args.push(((count = argNames[symbol]) ? (argNames[symbol]++, symbol + count) : (argNames[symbol] = 2, symbol)));
  };
  _ref1 = _arguments(call);
  for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
    term = _ref1[_i];
    if (labeled) {
      labeled = false;
      continue;
    }
    addArgName(isLabel(term) ? (labeled = true, _labelName(term)) : (isAtom(term)) && (!isHalfDelimitedAtom(term)) && !isNumerical(term) ? term.symbol : defaultNames[i++]);
  }
  return args;
};

isTangibleAtDefinitionList = function(tangible) {
  var parent;
  if (isReal(parent = parentOfTangible(tangible))) {
    return isParentOfDefinitionList(parent);
  } else {
    return true;
  }
};

ancestorAtDefinitonList = function(node) {
  var parent;
  if ((parent = parentOf(node))) {
    if ((isParentOfDefinitionList(parent)) && isExpression(node)) {
      return node;
    } else {
      return ancestorAtDefinitonList(parent);
    }
  } else {
    return node;
  }
};

findParentScope = function(top, expression) {
  return (findParentFunction(expression)) || top;
};

findParentFunction = function(expression) {
  if (isFunction(expression)) {
    return expression;
  } else if (isReal(expression.parent)) {
    return findParentFunction(expression.parent);
  }
};

findParamList = function(form) {
  var params;
  params = _arguments(form)[0];
  return params;
};

findFunctionBody = function(form) {
  var body, _ref1;
  _ref1 = _arguments(form), body = _ref1[_ref1.length - 1];
  return body;
};

isBetaReducible = function(expression) {
  return (isCall(expression)) && isFunction(_operator(expression));
};

isParentOfDefinitionList = function(expression) {
  var _ref1;
  return (isFunction(expression)) || (isForm(expression)) && ((_ref1 = _operator(expression)) != null ? _ref1.symbol : void 0) === 'syntax';
};

isFunction = function(expression) {
  var _ref1;
  return (isForm(expression)) && ((_ref1 = _operator(expression)) != null ? _ref1.symbol : void 0) === 'fn';
};

isFunctionBody = function(expression) {
  var _ref1, _ref2;
  return !((isForm(expression)) && ((_ref1 = (_ref2 = _operator(expression)) != null ? _ref2.symbol : void 0) === '#' || _ref1 === ':'));
};

enforceSpacing = function(expression) {
  var form, i, prev, space, spacedForm, term, _i, _len, _ref1;
  if (isForm(form = expression)) {
    spacedForm = form.slice(0, 2);
    _ref1 = form.slice(2, -1);
    for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
      term = _ref1[i];
      if (!(!isWhitespace(term))) {
        continue;
      }
      prev = form[i - 1 + 2];
      space = isIndent(prev) ? form.slice(i - 2 + 2, i + 2) : isWhitespace(prev) ? [prev] : [token_(' ')];
      spacedForm.push.apply(spacedForm, __slice.call(space).concat([enforceSpacing(term)]));
    }
    spacedForm.push(form[form.length - 1]);
    return listToForm(spacedForm);
  } else {
    return expression;
  }
};

definitionAncestorOf = function(node) {
  var parent;
  if ((parent = parentOf(node))) {
    if (isName(siblingTerm(PREVIOUS, parent))) {
      return parent;
    } else {
      return definitionAncestorOf(parent);
    }
  }
};

isName = function(expression) {
  return (expression != null ? expression.label : void 0) === 'name';
};

isMacro = function(expression) {
  return (expression != null ? expression.label : void 0) === 'keyword';
};

findAllOccurences = function(nodes) {
  return function(node) {
    var child, current, i, numNodes, terms;
    numNodes = nodes.length;
    current = (function() {
      var _i, _ref1, _results;
      if (numNodes === 1) {
        if (nodesEqual(nodes[0], node)) {
          return [[node]];
        }
      } else if ((isForm(node)) && node.length >= numNodes) {
        _results = [];
        for (i = _i = 0, _ref1 = node.length - numNodes; 0 <= _ref1 ? _i <= _ref1 : _i >= _ref1; i = 0 <= _ref1 ? ++_i : --_i) {
          if (nodesEqual((terms = node.slice(i, i + numNodes)), nodes)) {
            _results.push(terms);
          }
        }
        return _results;
      }
    })();
    child = isForm(node) ? concatMap(findAllOccurences(nodes), node) : void 0;
    return join(current || [], child || []);
  };
};

nodesEqual = function(a, b) {
  if (isForm(a)) {
    return (isForm(b)) && a.length === b.length && all(zipWith(nodesEqual, a, b));
  } else {
    return a.symbol === b.symbol;
  }
};

findName = function(symbol, nodes) {
  var term, _i, _len;
  for (_i = 0, _len = nodes.length; _i < _len; _i++) {
    term = nodes[_i];
    if ((isName(term)) && (term.symbol === symbol)) {
      return term;
    }
  }
};

atomReference = function(atom) {
  return {
    name: atom.symbol,
    scope: atom.scope
  };
};

findAllReferences = function(atom) {
  return function(node) {
    if (isForm(node)) {
      return concatMap(findAllReferences(atom), node);
    } else {
      if (node.id === atom.id) {
        return [node];
      } else {
        return [];
      }
    }
  };
};

findOtherReferences = function(atom) {
  return function(node) {
    if (isForm(node)) {
      return concatMap(findOtherReferences(atom), node);
    } else {
      if (node.id === atom.id && node !== atom) {
        return [node];
      } else {
        return [];
      }
    }
  };
};

siblingTerm = function(direction, node) {
  var i, t, terms, _i, _len;
  terms = _terms(node.parent);
  for (i = _i = 0, _len = terms.length; _i < _len; i = ++_i) {
    t = terms[i];
    if (t === node) {
      if (direction === FORWARD) {
        return terms[i + 1];
      } else {
        return terms[i - 1];
      }
    }
  }
};

findAdjecentInList = function(direction, what, list) {
  var element, returnNext, _i, _len;
  for ((direction > 0 ? (_i = 0, _len = list.length) : _i = list.length - 1); direction > 0 ? _i < _len : _i >= 0; _i += direction) {
    element = list[_i];
    if (returnNext) {
      return element;
    }
    if (element === what || element[0] && element[0] === what[0]) {
      returnNext = true;
    }
  }
  return edgeOfList(opposite(direction), list);
};

onlyExpression = function(tangible) {
  var node;
  node = tangible["in"][0];
  if (tangible["in"].length === 1 && isExpression(node)) {
    return node;
  }
};

fakeAtInsertion = function(tangible) {
  var fake;
  fake = tangible.out[0];
  if (fake.fake) {
    return fake;
  }
};

siblingTangibleAncestors = function(tangibles) {
  var depths, minDepth, parents, t;
  depths = map(__(depthOf, parentOfTangible), tangibles);
  minDepth = Math.min.apply(Math, depths);
  parents = (function() {
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = tangibles.length; _i < _len; _i++) {
      t = tangibles[_i];
      _results.push(tangibleAncestor(t, (depthOf(parentOfTangible(t))) - minDepth));
    }
    return _results;
  })();
  return siblingAncestorsFrom(parents);
};

siblingAncestorsFrom = function(tangibles) {
  var first, t, _i, _len;
  first = parentOfTangible(tangibles[0]);
  for (_i = 0, _len = tangibles.length; _i < _len; _i++) {
    t = tangibles[_i];
    if ((parentOfTangible(t)) !== first) {
      return siblingAncestorsFrom(map(tangibleParent, tangibles));
    }
  }
  return tangibles;
};

tangibleAncestor = function(tangible, levels) {
  if (levels === 0) {
    return tangible;
  } else {
    return tangibleAncestor(tangibleParent(tangible), levels - 1);
  }
};

tangibleBetween = function(tangible1, tangible2) {
  var from, fromNode, parent, to, _ref1;
  _ref1 = sortSiblingTangibles(tangible1, tangible2), from = _ref1[0], to = _ref1[1];
  parent = parentOfTangible(from);
  fromNode = nodeEdgeOfTangible(FIRST, from);
  return {
    "in": parent.slice(childIndex(fromNode), childIndexOfTangible(to)),
    out: to.out
  };
};

tangibleWithSomeMargin = function(tangible) {
  var before;
  return concatTangibles(filter(_is, [(before = tangibleMargin(PREVIOUS, tangible)), tangible, !before ? tangibleMargin(NEXT, tangible) : void 0]));
};

tangibleWithMargin = function(tangible) {
  return concatTangibles(filter(_is, [tangibleMargin(PREVIOUS, tangible), tangible, tangibleMargin(NEXT, tangible)]));
};

tangibleMargin = function(direction, tangible) {
  var paddingEdge, paddingNodes;
  paddingNodes = padding(direction, tangible);
  paddingEdge = edgeOfList(direction, paddingNodes);
  if (isWhitespace(paddingEdge)) {
    return insToTangible(paddingNodes);
  } else {
    return null;
  }
};

sortSiblingTangibles = function(tangible1, tangible2) {
  if ((childIndexOfTangible(tangible1)) > (childIndexOfTangible(tangible2))) {
    return [tangible2, tangible1];
  } else {
    return [tangible1, tangible2];
  }
};

tangibleEdge = function(direction, tangible) {
  var edge;
  edge = edgeOfList(direction, tangible["in"]);
  if (direction === FORWARD || tangible["in"].length === 0) {
    return {
      "in": !edge || isWhitespace(edge) ? [] : [edge],
      out: tangible.out
    };
  } else {
    if (isWhitespace(edge)) {
      return {
        "in": [],
        out: [edge]
      };
    } else {
      return insToTangible([edge]);
    }
  }
};

parentOfTangible = function(tangible) {
  return tangible.out[0].parent;
};

childIndexOfTangible = function(tangible) {
  return childIndex(tangible.out[0]);
};

nodeEdgeOfTangible = function(direction, tangible) {
  return edgeOfList(direction, nodeEdgesOfTangible(tangible));
};

nodeEdgesOfTangible = function(tangible) {
  var from, to;
  from = join(tangible["in"], tangible.out)[0];
  to = tangible.out[0];
  return [from, to];
};

insToTangible = function(ins) {
  var last, next;
  last = ins[ins.length - 1];
  next = sibling(NEXT, last);
  return {
    "in": ins,
    out: validOut(next)
  };
};

outsToTangible = function(outs) {
  return {
    "in": [],
    out: validOut(outs[0])
  };
};

concatTangibles = function(tangibles) {
  var allIn, last, _i;
  allIn = 2 <= tangibles.length ? __slice.call(tangibles, 0, _i = tangibles.length - 1) : (_i = 0, []), last = tangibles[_i++];
  return {
    "in": join(concatMap(tangibleToIns, allIn), last["in"]),
    out: last.out
  };
};

tangibleToIns = function(tangible) {
  return tangible["in"];
};

firstTypeVarInside = function(direction, form) {
  var notTypeVar;
  notTypeVar = function(x) {
    return (isAtom(x)) && !isNotCapital(x);
  };
  return firstNotMatchingInside(notTypeVar, direction, form);
};

firstFakeInside = function(direction, form) {
  return firstNotMatchingInside(isExpression, direction, form);
};

firstNotMatchingInside = function(notMatch, direction, form) {
  var child, inside, notMatched;
  inside = tangibleInside(opposite(direction), form);
  while ((notMatched = notMatch(child = toNode(inside))) && isNodeInside(child, form)) {
    inside = followingTangibleAtomOrPosition(direction, inside);
  }
  if (notMatched) {
    return form;
  } else {
    return inside;
  }
};

isNodeInside = function(child, ancestor) {
  return child && (child === ancestor || isNodeInside(child.parent, ancestor));
};

followingTangibleAtomOrPosition = function(direction, tangible) {
  return atomOrPositionFrom(direction, siblingLeaf(direction, nodeEdgeOfTangible(direction, tangible)));
};

atomOrPositionFrom = function(direction, token) {
  var tangible;
  if (token) {
    if (tangible = isAtomOrPositionAt(token)) {
      return tangible;
    } else {
      return atomOrPositionFrom(direction, siblingLeaf(direction, token));
    }
  }
};

isAtomOrPositionAt = function(after) {
  var before;
  before = preceding(after);
  if ((((isWhitespace(after)) && !isIndent(after)) || (isClosingDelim(after))) && (!isClosingDelim(before))) {
    return {
      "in": isExpression(before) ? [before] : [],
      out: validOut(after)
    };
  }
};

tangibleParent = function(tangible) {
  var parent;
  parent = parentOfTangible(tangible);
  if (isReal(parent)) {
    return insToTangible([parent]);
  }
};

tangibleSurroundedBy = function(direction, first, second) {
  var after, before, _ref1;
  _ref1 = inOrder(direction, first, second), before = _ref1[0], after = _ref1[1];
  if (before === after && isExpression(before)) {
    return insToTangible([before]);
  } else if (isClosingDelim(before)) {
    return insToTangible([before.parent]);
  } else if (isOpeningDelim(after)) {
    return insToTangible([after.parent]);
  } else if (isExpression(before)) {
    return {
      "in": [before],
      out: validOut(after)
    };
  } else if (isExpression(after)) {
    return insToTangible([after]);
  } else if ((isOpeningDelim(before)) || (!isIndent(after))) {
    return {
      "in": [],
      out: validOut(after)
    };
  } else {
    return tangibleInAfter(direction, second);
  }
};

tangibleInAfter = function(direction, node) {
  var other;
  return (other = sibling(direction, node)) && tangibleSurroundedBy(direction, node, other);
};

tangibleInside = function(direction, form) {
  return tangibleEdge(direction, insideTangible(form));
};

inOrder = function(direction, a, b) {
  if (direction === FORWARD) {
    return [a, b];
  } else {
    return [b, a];
  }
};

insideTangible = function(form) {
  return {
    "in": form.slice(1, -1),
    out: form.slice(-1)
  };
};

paddingEdge = function(direction, tangible) {
  return edgeOfList(direction, padding(direction, tangible));
};

padding = function(direction, tangible) {
  if (direction === FORWARD) {
    return tangible.out;
  } else {
    return precedingWhitespace(sibling(PREVIOUS, toNode(tangible)));
  }
};

pickupBookmarks = function(bookmarks) {
  return map((function(bookmark) {
    return bookmark();
  }), bookmarks);
};

bookmarkBefore = function(tangible) {
  var at;
  at = preceding(toNode(tangible));
  return function() {
    return {
      "in": [],
      out: validOut(following(at))
    };
  };
};

memorable = function(tangible) {
  if (tangible["in"].length === 0) {
    return [[tangible.out[0]], outsToTangible];
  } else {
    return [tangible["in"], insToTangible];
  }
};

termToTangible = function(term) {
  if (isExpression(term)) {
    return toTangible(term);
  } else {
    return {
      "in": [],
      out: validOut(term)
    };
  }
};

toTangible = function(node) {
  return insToTangible([node]);
};

toNode = function(tangible) {
  return nodeEdgeOfTangible(FIRST, tangible);
};

precedingWhitespace = function(node) {
  if (isIndent(node)) {
    return [sibling(PREVIOUS, node), node];
  } else {
    return [node];
  }
};

validOut = function(node) {
  var siblingNode;
  siblingNode = sibling(NEXT, node);
  if ((isWhitespace(node)) && siblingNode && isIndent(siblingNode)) {
    return [node, siblingNode];
  } else {
    return [node];
  }
};

limitTerm = function(direction, node) {
  if (isForm(node)) {
    return limitTerm(direction, edgeOfList(direction, _terms(node)));
  } else {
    return node;
  }
};

depthOf = function(node) {
  if (!isReal(node)) {
    return -1;
  } else {
    return 1 + depthOf(node.parent);
  }
};

insertChildNodeAt = function(child, parent, index) {
  child.parent = parent;
  return parent.splice(index, 0, child);
};

ammendAst = function(replaced, added) {
  var index, node, parent, _i, _len;
  parent = replaced.out[0].parent;
  for (_i = 0, _len = added.length; _i < _len; _i++) {
    node = added[_i];
    node.parent = parent;
  }
  index = childIndex(nodeEdgeOfTangible(FIRST, replaced));
  return parent.splice.apply(parent, [index, replaced["in"].length].concat(__slice.call(added)));
};

ammendToken = function(token, at, added) {
  var end, removed, start, _ref1;
  _ref1 = sortTuple(at), start = _ref1[0], end = _ref1[1];
  removed = end - start;
  token.symbol = spliceString(token.symbol, start, removed, added);
  return token.end += added.length - removed;
};

append = function(direction, tangibleA, tangibleB) {
  var after, before, _ref1;
  _ref1 = inOrder(direction, tangibleA, tangibleB), before = _ref1[0], after = _ref1[1];
  return {
    "in": join(before["in"], after["in"]),
    out: after.out
  };
};

sortTuple = function(_arg) {
  var a, b;
  a = _arg[0], b = _arg[1];
  return [Math.min(a, b), Math.max(a, b)];
};

nodesToString = function(nodes) {
  var node, string, _i, _len;
  string = "";
  for (_i = 0, _len = nodes.length; _i < _len; _i++) {
    node = nodes[_i];
    string += isForm(node) ? nodesToString(node) : node.symbol;
  }
  return string;
};

editableLength = function(atom) {
  return atom.symbol.length - (isDelimitedAtom(atom) ? 2 : isHalfDelimitedAtom(atom) ? 1 : 0);
};

changeNumericalAt = function(symbol, offset, amount) {
  var at, decimals, fp, n, t;
  n = symbol.length;
  fp = (at = symbol.indexOf(".")) >= 0 ? at + 1 : n;
  decimals = n - fp;
  t = parseFloat(symbol);
  t *= Math.pow(10, decimals);
  amount *= Math.pow(10, n - offset - (fp !== n && offset < fp ? 1 : 0));
  t += amount;
  t /= Math.pow(10, decimals);
  return t.toFixed(decimals);
};

isExpression = function(node) {
  return !(isWhitespace(node)) && !(isDelim(node));
};

isAtom = function(node) {
  return (isExpression(node)) && !isForm(node);
};

isNumerical = function(atom) {
  return atom.symbol && /^-?\d/.test(atom.symbol);
};

isDelimitedAtom = function(atom) {
  var _ref1;
  return (_ref1 = atom.label) === 'string' || _ref1 === 'regex';
};

isHalfDelimitedAtom = function(atom) {
  return atom.label === 'char' || isDelimitedAtom(atom);
};

atomDelimiter = function(atom) {
  return atom.symbol[0];
};

isDelim = function(node) {
  return /^[\(\)\[\]\{\}]$/.test(node.symbol);
};

isClosingDelim = function(node) {
  return /^[\)\]\}]$/.test(node.symbol);
};

isOpeningDelim = function(node) {
  return /^[\(\[\{]$/.test(node.symbol);
};

isOperator = function(node) {
  var parent;
  parent = parentOf(node);
  return parent && (isCall(parent)) && (_fst(_terms(parent))) === node;
};

isEmptyCall = function(expression) {
  return expression.length === 2 && expression[0].symbol === '(';
};

isLabel = function(expression) {
  return expression.label === 'label';
};

isWhitespace = function(node) {
  var _ref1;
  return (_ref1 = node.label) === 'whitespace' || _ref1 === 'indent';
};

isIndent = function(node) {
  return node.label === 'indent';
};

isSpace = function(token) {
  return token.symbol === ' ';
};

isNewLine = function(token) {
  return token.symbol === '\n';
};

isReal = function(node) {
  return node.start >= 0;
};

escape = function(what, string) {
  return string.replace(RegExp("" + what, "g"), "\\" + what);
};

repeat = function(n, string) {
  return (new Array(n + 1)).join(string);
};

merge = function(objects) {
  var a, c, key, value, _i, _len;
  c = {};
  for (_i = 0, _len = objects.length; _i < _len; _i++) {
    a = objects[_i];
    for (key in a) {
      value = a[key];
      c[key] = value;
    }
  }
  return c;
};

extend = function(a, b) {
  return merge([a, b]);
};

_transformed = function(origin) {
  if (origin.transformed) {
    return _transformed(origin.transformed);
  } else {
    return origin;
  }
};

findNodeWithPosition = function(node, start, end) {
  var expr;
  if (start < node.end && node.start < end) {
    if (start === node.start && end === node.end) {
      return [node];
    } else {
      return concat((function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = node.length; _i < _len; _i++) {
          expr = node[_i];
          _results.push(findNodeWithPosition(expr, start, end));
        }
        return _results;
      })());
    }
  } else {
    return [];
  }
};

findNodesBetween = function(node, start, end) {
  var expr;
  if (start < node.end && node.start < end) {
    if (isForm(node)) {
      return concat((function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = node.length; _i < _len; _i++) {
          expr = node[_i];
          _results.push(findNodesBetween(expr, start, end));
        }
        return _results;
      })());
    } else {
      return [node];
    }
  } else {
    return [];
  }
};

convertToAceLineTokens = function(tokens) {
  var converted, last;
  converted = map(convertToAceToken, tokens);
  if ((last = converted[converted.length - 1]) && last.value === '\n') {
    converted.pop();
  }
  return converted;
};

convertToAceToken = function(token) {
  var delim;
  delim = isDelim(token);
  return {
    value: token.label === 'string' ? "“" + token.symbol.slice(1, -1) + "”" : token.symbol,
    type: ((function() {
      if (delim && token.parent.malformed || !delim && token.malformed) {
        return 'token_malformed';
      } else {
        switch (token.label) {
          case 'whitespace':
            return 'text';
          default:
            if (token.label) {
              return 'token_' + token.label;
            } else {
              return 'text';
            }
        }
      }
    })()) + (token.fake ? '.token_fake' : '')
  };
};

topList = function(ast) {
  var inside;
  inside = ast.slice(1, -1);
  inside.start = ast.start + 1;
  inside.end = ast.end - 1;
  return inside;
};

edgeIdxOfNode = function(direction, node) {
  if (direction === FORWARD) {
    return node.end;
  } else {
    return node.start;
  }
};

editableEdgeWithin = function(direction, atom) {
  return (edgeWithinAtom(direction, atom)) + (isDelimitedAtom(atom) ? opposite(direction) : 0);
};

edgeWithinAtom = function(direction, atom) {
  if (direction === FORWARD) {
    return atom.symbol.length;
  } else {
    return 0;
  }
};

edgeOfList = function(direction, list) {
  var first, last;
  first = list[0], last = list[list.length - 1];
  if (direction === FORWARD) {
    return last;
  } else {
    return first;
  }
};

positionsToRange = function(start, end) {
  return Range.fromPoints(start, end);
};

spliceString = function(string, index, count, add) {
  return string.slice(0, index) + add + string.slice(index + count);
};

previousExpression = function(expression) {
  var node, reached, _i, _ref1;
  reached = false;
  _ref1 = expression.parent;
  for (_i = _ref1.length - 1; _i >= 0; _i += -1) {
    node = _ref1[_i];
    if (reached && isExpression(node)) {
      return node;
    }
    if (node === expression) {
      reached = true;
    }
  }
  return expression;
};

nextExpression = function(expression) {
  var node, reached, _i, _len, _ref1;
  reached = false;
  _ref1 = expression.parent;
  for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
    node = _ref1[_i];
    if (reached && isExpression(node)) {
      return node;
    }
    if (node === expression) {
      reached = true;
    }
  }
  return expression;
};

preceding = function(node) {
  return siblingLeaf(BACKWARD, node);
};

following = function(node) {
  return siblingLeaf(FORWARD, node);
};

siblingLeaf = function(direction, node) {
  var candidate;
  candidate = (sibling(direction, node)) || (isReal(node.parent)) && (siblingLeaf(direction, node.parent));
  if (candidate) {
    if (isForm(candidate)) {
      return edgeOfList(opposite(direction), candidate);
    } else {
      return candidate;
    }
  }
};

parentOf = function(node) {
  if (isReal(node.parent)) {
    return node.parent;
  }
};

sibling = function(direction, node) {
  return node.parent[(childIndex(node)) + direction];
};

previous = function(node) {
  return node.parent[(childIndex(node)) - 1];
};

next = function(node) {
  return node.parent[(childIndex(node)) + 1];
};

childIndex = function(node) {
  return indexWithin(node, node.parent);
};

indexWithin = function(what, array) {
  var element, i, _i, _len;
  for (i = _i = 0, _len = array.length; _i < _len; i = ++_i) {
    element = array[i];
    if (element === what) {
      return i;
    }
  }
  throw new Error("what is not inside of array in indexWithin");
};

duplicateProperties = function(newAst, oldAst) {
  var i, node, _i, _len, _results;
  oldAst.malformed = newAst.malformed;
  oldAst.tea = newAst.tea;
  oldAst.id = newAst.id;
  oldAst.fake = newAst.fake;
  oldAst.assignable = newAst.assignable;
  oldAst.scope = newAst.scope;
  oldAst.inferredType = newAst.inferredType;
  oldAst.imported = newAst.imported;
  if (isForm(newAst)) {
    _results = [];
    for (i = _i = 0, _len = newAst.length; _i < _len; i = ++_i) {
      node = newAst[i];
      _results.push(duplicateProperties(node, oldAst[i]));
    }
    return _results;
  } else {
    return oldAst.label = newAst.label;
  }
};

reindentTangiblePreserving = function(tangible, to, preservedList) {
  return reindentNodesPreserving(tangible["in"], to, preservedList);
};

reindentTangible = function(tangible, to) {
  return reindentNodes(tangible["in"], to);
};

reindentNodes = function(nodes, to) {
  var reindented;
  reindented = reindentNodesPreserving(nodes, to, [])[0];
  return reindented;
};

reindentNodesPreserving = function(nodes, to, preservedList) {
  var cloned, node, preserved, _i, _len, _ref1;
  _ref1 = cloneNodesPreserving(nodes, preservedList), cloned = _ref1[0], preserved = _ref1[1];
  for (_i = 0, _len = cloned.length; _i < _len; _i++) {
    node = cloned[_i];
    node.parent = to;
  }
  return [reindentMutateNodes(cloned, to), preserved];
};

astize = function(string, parent) {
  var close, expressions, open, wrapped, _i;
  wrapped = compiler.astizeList(string);
  reindent(depthOf(parent), wrapped);
  open = wrapped[0], expressions = 3 <= wrapped.length ? __slice.call(wrapped, 1, _i = wrapped.length - 1) : (_i = 1, []), close = wrapped[_i++];
  return expressions;
};

cloneNodes = function(nodes) {
  var clones;
  clones = cloneNodesPreserving(nodes, [])[0];
  return clones;
};

cloneNodesPreserving = function(nodes, preserving) {
  var clones, preservedLists, _ref1;
  _ref1 = unzip(map(cloneNodePreserving(preserving), nodes)), clones = _ref1[0], preservedLists = _ref1[1];
  return [clones, concat(preservedLists)];
};

cloneNode = function(node) {
  var clone;
  clone = (cloneNodePreserving([]))(node)[0];
  return clone;
};

cloneNodePreserving = function(preserving) {
  return function(node) {
    var clone, preserved, _ref1;
    if (isForm(node)) {
      _ref1 = cloneNodesPreserving(node, preserving), clone = _ref1[0], preserved = _ref1[1];
      listToForm(clone);
    } else {
      preserved = [];
      clone = {
        symbol: node.symbol,
        label: node.label
      };
    }
    clone.start = node.start;
    clone.end = node.end;
    clone.malformed = node.malformed;
    clone.tea = node.tea;
    clone.id = node.id;
    if (__indexOf.call(preserving, node) >= 0) {
      preserved = [clone];
    }
    return [clone, preserved];
  };
};

reindentMutateNodes = function(nodes, parent) {
  reindent(depthOf(parent), nodes);
  return nodes;
};

reindent = function(depth, ast, next, nextIndex) {
  var i, indent, indentToken, newLine, shouldIndent, _ref1;
  if (isForm(ast)) {
    i = 0;
    while (i < ast.length) {
      reindent(depth + 1, ast[i], ast[i + 1], i + 1);
      ++i;
    }
  } else if (next && isNewLine(ast)) {
    indent = repeat(depth, '  ');
    shouldIndent = depth > 0;
    if (isIndent(next)) {
      if (shouldIndent) {
        setIndentTo(next, indent);
      } else {
        next.parent.splice(nextIndex, 1);
      }
    } else if (shouldIndent) {
      _ref1 = astizeExpressions("\n  "), newLine = _ref1[0], indentToken = _ref1[1];
      setIndentTo(indentToken, indent);
      insertChildNodeAt(indentToken, next.parent, childIndex(next));
    }
  }
};

listToForm = function(nodes) {
  var node, _i, _len;
  for (_i = 0, _len = nodes.length; _i < _len; _i++) {
    node = nodes[_i];
    node.parent = nodes;
  }
  return nodes;
};

setIndentTo = function(token, indent) {
  token.symbol = indent;
  return token.end = token.start + indent.length;
};

astizeExpressions = function(string) {
  var close, expressions, open, _i, _ref1;
  _ref1 = compiler.astizeExpression("(" + string + ")"), open = _ref1[0], expressions = 3 <= _ref1.length ? __slice.call(_ref1, 1, _i = _ref1.length - 1) : (_i = 1, []), close = _ref1[_i++];
  return expressions;
};

LAST = FORWARD = NEXT = 1;

FIRST = BACKWARD = PREVIOUS = -1;

opposite = function(direction) {
  return direction * -1;
};

});
