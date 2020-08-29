define(function (require, exports, module) {
  var __filename = module.uri || "", __dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1);
  var ClassConstraint, Constrained, Context, ForAll, KindFn, QuantifiedVar, TempKind, TempType, TypeApp, TypeConstr, TypeVariable, Types, accessList, actualOpName, addAllToSet, addConstraints, addConstraintsFrom, addSiblingDefines, addToMap, addToSet, all, allDelims, allInjected, allMap, any, applyKindFn, arityOfKind, arrayToMap, arrayToSet, arrayType, arrowType, assignCompile, assignCompileAs, assignMethodTypes, astFromSource, astize, astizeExpression, astizeExpressionWithWrapper, astizeList, atomCompile, atomicType, auxiliaryDependencies, bindVariable, bindVariable_pure, blockOfLines, boolType, builtInDefinitions, builtInMacros, builtInTypeNames, cache_, callCompile, callConstructorPattern, callInfer, callInferSingle, callJsMethodCompile, callKnownCompile, callMacroCompile, callMacroExpand, callSaturatedKnownCompile, callTyping, callUnknownCompile, callUnknownTranslate, callZeroInfer, call_, charCompile, charType, checkTypes, cloneMap, cloneSet, cloneType, closeDelimFor, collapse, collectArgs, collectRequiresFor, colorize, combinePatterns, compileAstToJs, compileCtxAstToJs, compileCtxAstToJsAlways, compileCtxIrToJs, compileDeferred, compileExpression, compileModuleTopLevel, compileModuleTopLevelAst, compileModuleWithDependencies, compileToJs, compileTopLevelAndExpression, compileTopLevelSource, compileVariableAssignment, compiledModules, concat, concatConcatMaps, concatMap, concatMaps, concatSets, concatTest, concreteReturnType, cond_, conditional, constPattern, constantLabeling, constantToSource, constraintsEqual, constraintsFromCanonicalType, constraintsFromInstance, constraintsFromReference, constraintsFromSuperClasses, constructCond, contextWithDependencies, controls, copyOrigin, crawl, createIndent, curriedType, debug, declareImported, declareImportedByDefault, declareMethods, declaredTypeMissingConstraint, declaredTypeTooGeneral, deferConstraints, deferCurrentDefinition, deferDeferred, deferredExpression, definitionList, definitionListCompile, definitionPairCompile, dependentToGraph, dictAccessors, dictConstructorFunction, dictForConstraint, dictsForConstraint, doIntersect, emptySubstitution, entail, entailedBySuperClasses, expandCall, exportAll, expressionCompile, expressionType, expressionsCompile, extend, extractDocs, fakeCompile, fakeContext, fake_, filter, filterAst, filterMap, filterSet, finalizeTypes, findAvailableTypes, findClassType, findConstrained, findDataType, findDeclarables, findDeclarationFor, findDefinitions, findDefinitionsIncludingDeps, findDeps, findDocsFor, findFree, findFreeInList, findFree_pure, findMatchingDefinitions, findMatchingDefinitionsOnType, findSubClassParam, findSubstitutions, findSuperClassChain, findSuperClassInstances, findUnconstrained, first, firstOrCall, flatten, flattenType, fn_, forallToHumanReadable, formatFail, freshInstance, freshName, freshenType, functionReturnType, hashmapCompile, hashmapType, hashsetType, highlightType, highlightTypeForError, hoistWheres, htmlCalled, htmlDelimited, i, id, iife, immutable, importAny, imports, importsFor, inSet, inSub, includesJsType, indentLines, inferType, injectContext, injectedContext, instanceDictFor, instanceLookupFailed, instancePrefix, intersectMaps, intersectRight, intersectSets, irArray, irArrayTranslate, irCall, irCallTranslate, irDefinition, irDefinitionTranslate, irFunction, irFunctionTranslate, irJsCompatible, irJsCompatibleTranslate, irList, irListTranslate, irMap, irMapTranslate, irMethod, irMethodTranslate, irReference, irReferenceTranslate, irSet, irSetTranslate, isAlreadyParametrized, isAtom, isCall, isCapital, isComment, isConst, isConstructor, isCustomCollectionType, isDotAccess, isExpression, isExpressionOrFake, isFailed, isFake, isForm, isFunctionType, isLabel, isMapEmpty, isModuleAccess, isName, isNormalizedConstraint, isNormalizedConstraintArgument, isNormalizedConstraintArgument_pure, isNotCapital, isNotEmptyForm, isRecord, isSeq, isSetEmpty, isSimpleTranslated, isSplat, isSubset, isTranslated, isTuple, isTypeAnnotation, isValidTypeConstraint, isZeroArityFunctionType, join, joinSubs, joinSubs_pure, jsAccess, jsAccessTranslate, jsArray, jsArrayTranslate, jsAssign, jsAssignStatement, jsAssignStatementTranslate, jsAssignTranslate, jsBinary, jsBinaryMulti, jsBinaryMultiTranslate, jsBinaryTranslate, jsCall, jsCallMethod, jsCallTranslate, jsConditional, jsConditionalTranslate, jsDictionary, jsDictionaryTranslate, jsExprList, jsExprListTranslate, jsFunction, jsFunctionTranslate, jsMalformed, jsMalformedTranslate, jsMethod, jsMethodTranslate, jsNew, jsNewTranslate, jsNoop, jsNoopTranslate, jsReturn, jsReturnTranslate, jsTernary, jsTernaryTranslate, jsType, jsUnary, jsUnaryTranslate, jsValue, jsValueTranslate, jsVarDeclaration, jsVarDeclarationTranslate, jsVarDeclarations, jsVarDeclarationsTranslate, jsWrap, jsWrapTranslate, keysOfMap, kind, kindFn, kindFnNumArgs, kindFnOfArgs, kindedToHtml, kindsEq, labelComments, labelConflict, labelConflicts, labelDelimeters, labelDocs, labelMapping, labelOf, labelOperator, labelUsedParams, labeledToMap, leftDelims, library, listOf, listOfLines, listToPairsWith, listType, literalPattern, logError, lookupCompiledModule, lookupInMap, lookupJs, lookupOrAdd, malformed, map, mapCompile, mapKeys, mapMap, mapOrigin, mapOriginOnFunction, mapSet, mapSub, mapSyntax, mapToArray, mapToArrayVia, mapTyping, mapTypingBare, mapWithOrigin, markFake, markOrigin, matchBranchTranslate, matchType, matchType_pure, merge, mergeSubs, moduleDependencies, moduleGraph, mostGeneralUnifier, mostGeneralUnifier_pure, ms, ms_List, ms_Map, ms_Set, ms_class, ms_comma, ms_cond, ms_data, ms_doset, ms_eq, ms_fn, ms_format, ms_global, ms_instance, ms_log, ms_macro, ms_match, ms_quote, ms_record, ms_req, ms_syntax, ms_type, ms_typed, ms_typed_expression, mutateMappingOrigin, mutateMarkingOrigin, nameCompile, nameTranslate, namespacedNameCompile, nestedAddToMap, nestedLookupInMap, newMap, newMapKeysVals, newMapWith, newSet, newSetWith, newSubstitution, newSubstitution_pure, niceName, normalizeConstraints, numType, numericalCompile, objectToMap, opNameToHtml, operatorCompile, originOf, pairs, pairsLeft, pairsRight, paramTupleIn, parentize, parseExpression, parseTopLevel, parseWith, partition, partitionMap, patternCompile, plainPrettyPrint, polymorphicAssignCompile, preDeclareExplicitlyTyped, preDeclarePatterns, prefixWithInstanceName, prettyPrint, prettyPrintForError, prettyPrintWith, print, printFlattenedToHtml, printIr, printKind, printSubstitution, printType, printTypeToHtml, printTypes, properTypeFn, ps, quantify, quantifyAll, quantifyConstraintFor, quantifyUnbound, reduceConstraints, reduceSet, regexCompile, regexType, rehashMap, removeAllFromSet, removeFromMap, removeFromSet, replaceConstraints, replaceInMap, replaceOrAddToMap, replaceQuantifiedByOrigin, replicate, requireName, requiresFor, reservedInJs, resolveDeferredTypes, retrieve, reverse, reverseModuleDependencies, rightDelims, runTest, runTests, runtimeDependencies, safePrintType, scopedName, seqCompile, seqOrMapCompile, setInSub, setToArray, simpleMacro, simplifyConstraints, sortBasedOnOriginPosition, sortCallArguments, sortedArgs, sortedStronglyConnectedComponents, spaceSeparatedPairs, specialCharacters, splatToName, star, stringCompile, stringType, string_, subIntersection, subLimit, subLimit_pure, subMagnitude, subStart, subToObject, subUnion, subUnion_pure, substitute, substituteList, substituteVarNames, substituteVarNames_pure, substitute_pure, substitutionFail, subtractContexts, subtractMaps, subtractSets, syntaxNameAs, syntaxNewName, syntaxType, syntaxedExpHtml, syntaxedType, tagFreeLabels, teas, termCompile, termsCompile, termsCompileExpectingSameType, termsCompileExpectingType, test, testNamed, tests, theme, themize, toConstrained, toForAll, toHtml, toJs, toJsString, toMatchTypes, toMatchTypes_pure, toMultilineJsString, toNameSets, token_, tokenize, topLevel, topLevelAndExpression, topLevelExpression, topLevelExpressionInModule, topLevelModule, topologicallySortedGroups, trackTransformation, translateIr, translateStatementsToJs, translateToJs, tryDeferConstraints, tupleCompile, tupleOfTypes, tupleType, tuple_, tuplize, typeCompile, typeConstant, typeConstrainedCompile, typeConstraintCompile, typeConstraintsCompile, typeConstructorCompile, typeEnumaration, typeEq, typeFail, typeFn, typeNameCompile, typeNamesOfNormalized, typeTupleCompile, typesCompile, uniformCollectionCompile, unify, unifyFail, unifyImpliedParams, unifyImpliedParams_pure, unifyTypesOfTerms, unifyTypesOfTermsWithType, unify_pure, unique, unzip, validIdentifier, values, varList, varNames, visitExpressions, walk, walkIr, withCache, withOrigin, zeroArrowType, zip, zipWith, __, _arguments, _assigns, _cache, _constraints, _empty, _fakeContext, _fn, _fst, _i, _is, _labelName, _labeled, _len, _names, _not, _notEmpty, _operator, _precs, _ref, _snd, _stringValue, _symbol, _tea, _terms, _type, _validArguments, _validTerms,
  __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
  __slice = [].slice;

tokenize = function(input, initPos) {
  var currentPos, end, match, start, symbol, _results;
  if (initPos == null) {
    initPos = 0;
  }
  currentPos = initPos;
  _results = [];
  while (input.length > 0) {
    match = input.match(RegExp("^(\\x20|\\n|[" + controls + "]|/([^\\s\\)\\}\\]]|\\\\/)([^/]|\\\\/)*?/[gmi]?|\"(?:[^\"\\\\]|\\\\.)*\"|\\\\[^\\s][^\\s" + controls + "]*|[^" + controls + "\\\\\"\\s]+)"));
    if (!match) {
      throw new Error("Could not recognize a token starting with `" + input.slice(0, 11) + "`");
    }
    symbol = match[0];
    input = input.slice(symbol.length);
    start = currentPos;
    currentPos += symbol.length;
    end = currentPos;
    _results.push(constantLabeling({
      symbol: symbol,
      start: start,
      end: end
    }));
  }
  return _results;
};

controls = '\\(\\)\\[\\]\\{\\}';

astize = function(tokens, initialDepth) {
  var ast, closed, current, form, indentAccumulator, stack, token, tree, _i, _len, _ref, _ref1;
  if (initialDepth == null) {
    initialDepth = 0;
  }
  tree = [];
  current = [];
  stack = [[]];
  indentAccumulator = [];
  for (_i = 0, _len = tokens.length; _i < _len; _i++) {
    token = tokens[_i];
    if (token.symbol === ' ' && (indentAccumulator != null ? indentAccumulator.length : void 0) < 2 * (initialDepth + stack.length - 1)) {
      indentAccumulator.push(token);
    } else {
      if ((indentAccumulator != null ? indentAccumulator.length : void 0) > 0) {
        stack[stack.length - 1].push(createIndent(indentAccumulator));
      }
      indentAccumulator = void 0;
      if (token.symbol === '\n') {
        indentAccumulator = [];
      }
      if (_ref = token.symbol, __indexOf.call(leftDelims, _ref) >= 0) {
        form = [token];
        form.start = token.start;
        stack.push(form);
      } else if (_ref1 = token.symbol, __indexOf.call(rightDelims, _ref1) >= 0) {
        closed = stack.pop();
        if (!stack[stack.length - 1]) {
          throw new Error("Missing opening delimeter matching " + token.symbol);
        }
        if (token.symbol !== closeDelimFor[closed[0].symbol]) {
          throw new Error("Wrong closing delimiter " + token.symbol + " for opening delimiter " + closed[0].symbol);
        }
        closed.push(token);
        closed.end = token.end;
        markFake(closed);
        stack[stack.length - 1].push(closed);
      } else {
        stack[stack.length - 1].push(token);
      }
    }
  }
  ast = stack[0][0];
  if (!ast) {
    throw new Error("Missing closing delimeter matching " + stack[stack.length - 1][0].symbol);
  } else {
    return ast;
  }
};

leftDelims = ['(', '[', '{'];

rightDelims = [')', ']', '}'];

allDelims = [].concat(leftDelims, rightDelims);

closeDelimFor = {
  '(': ')',
  '[': ']',
  '{': '}'
};

createIndent = function(accumulator) {
  return {
    symbol: (new Array(accumulator.length + 1)).join(' '),
    start: accumulator[0].start,
    end: accumulator[accumulator.length - 1].end,
    label: 'indent'
  };
};

markFake = function(form) {
  var delimLeft, delimRight, node, prev, rest, _i, _len, _ref, _ref1, _ref2, _ref3;
  prev = form[0], rest = 2 <= form.length ? __slice.call(form, 1) : [];
  for (_i = 0, _len = rest.length; _i < _len; _i++) {
    node = rest[_i];
    if ((((_ref = prev.label) === 'whitespace' || _ref === 'indent') || (delimLeft = (_ref1 = prev.symbol, __indexOf.call(leftDelims, _ref1) >= 0))) && (node.label === 'whitespace' || (delimRight = (_ref2 = node.symbol, __indexOf.call(rightDelims, _ref2) >= 0))) && !(delimLeft && delimRight && ((_ref3 = prev.symbol) === '{' || _ref3 === '['))) {
      node.fake = true;
    }
    prev = node;
  }
};

constantLabeling = function(atom) {
  var symbol;
  symbol = atom.symbol;
  return labelMapping(atom, [
    [
      'numerical', function() {
        return /^-?(\d+|Infinity)/.test(symbol);
      }
    ], [
      'label', function() {
        return isLabel(atom);
      }
    ], [
      'string', function() {
        return /^"/.test(symbol);
      }
    ], [
      'char', function() {
        return /^\\/.test(symbol);
      }
    ], [
      'regex', function() {
        return /^\/.*\/[gmi]?$/.test(symbol);
      }
    ], [
      'paren', function() {
        return symbol === '(' || symbol === ')';
      }
    ], [
      'bracket', function() {
        return symbol === '[' || symbol === ']';
      }
    ], [
      'brace', function() {
        return symbol === '{' || symbol === '}';
      }
    ], [
      'whitespace', function() {
        return /^\s+$/.test(symbol);
      }
    ]
  ]);
};

labelMapping = function(word, rules) {
  var cond, label, _i, _len, _ref;
  for (_i = 0, _len = rules.length; _i < _len; _i++) {
    _ref = rules[_i], label = _ref[0], cond = _ref[1];
    if (!(cond())) {
      continue;
    }
    word.label = label;
    return word;
  }
  return word;
};

labelOperator = function(expression) {
  if (isForm(expression)) {
    return labelDelimeters(expression, 'operator');
  } else if (!isFake(expression)) {
    return expression.label = 'operator';
  }
};

labelDelimeters = function(form, label) {
  var close, open, _, _i;
  open = form[0], _ = 3 <= form.length ? __slice.call(form, 1, _i = form.length - 1) : (_i = 1, []), close = form[_i++];
  return open.label = close.label = label;
};

crawl = function(ast, cb, parent) {
  var node, _i, _len, _results;
  if (Array.isArray(ast)) {
    _results = [];
    for (_i = 0, _len = ast.length; _i < _len; _i++) {
      node = ast[_i];
      _results.push(crawl(node, cb, ast));
    }
    return _results;
  } else {
    return cb(ast, ast.symbol, parent);
  }
};

visitExpressions = function(expression, cb) {
  var term, _i, _len, _ref, _results;
  cb(expression);
  if (isForm(expression)) {
    _ref = _terms(expression);
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      term = _ref[_i];
      _results.push(visitExpressions(term, cb));
    }
    return _results;
  }
};

teas = function(fn, string) {
  var ast, compiled, ctx;
  ast = astize(tokenize(string));
  compiled = fn((ctx = new Context), ast);
  return {
    syntax: collapse(toHtml(ast)),
    types: values(mapMap(__(highlightType, _type), subtractMaps(ctx._scope(), builtInDefinitions()))),
    translation: '\n' + compiled
  };
};

mapCompile = function(fn, string) {
  return fn(new Context, astize(tokenize(string)));
};

mapTyping = function(fn, string) {
  var ast, ctx, expressions;
  ast = astize(tokenize(string));
  fn((ctx = new Context), ast);
  expressions = [];
  visitExpressions(ast, function(expression) {
    if (expression.tea) {
      return expressions.push("" + (collapse(toHtml(expression))) + " :: " + (highlightType(expression.tea)));
    }
  });
  return {
    types: values(mapMap(__(highlightType, _type), subtractMaps(ctx._scope(), builtInDefinitions()))),
    fails: map(formatFail, ctx.substitution.fails),
    ast: expressions,
    deferred: ctx.deferredBindings()
  };
};

formatFail = function(error) {
  if (error.message) {
    return join([error.message], map(__(collapse, toHtml), filter(_is, error.conflicts)));
  } else {
    return error;
  }
};

printSubstitution = function(sub) {
  return subToObject(mapSub(highlightType, sub));
};

mapTypingBare = function(fn, string) {
  var ast, ctx, expressions;
  ast = astize(tokenize(string));
  fn((ctx = new Context), ast);
  expressions = [];
  visitExpressions(ast, function(expression) {
    if (expression.tea) {
      return expressions.push([collapse(toHtml(expression)), expression.tea]);
    }
  });
  return {
    types: values(mapMap(_type, subtractMaps(ctx._scope(), builtInDefinitions()))),
    subs: ctx.substitution,
    ast: expressions,
    deferred: ctx.deferredBindings()
  };
};

highlightType = function(type) {
  var typeAst;
  if (type) {
    typeAst = astize(tokenize(printType(type)));
    syntaxType(typeAst);
    return collapse(toHtml(typeAst));
  } else {
    return "undefined";
  }
};

subToObject = function(sub) {
  var i, ob, s, _i, _len, _ref;
  ob = {};
  _ref = sub.vars;
  for (i = _i = 0, _len = _ref.length; _i < _len; i = ++_i) {
    s = _ref[i];
    if (s) {
      ob["" + (i + sub.start)] = s;
    }
  }
  return ob;
};

_type = function(declaration) {
  return declaration.type;
};

mapSyntax = function(fn, string) {
  var ast;
  ast = astize(tokenize(string));
  fn(new Context, ast);
  return collapse(toHtml(ast));
};

Context = (function() {
  function Context() {
    var topScope;
    this.definitions = [];
    this.variableIndex = 0;
    this.typeVariabeIndex = 0;
    this.logId = 0;
    this.nameIndex = 1;
    this.substitution = emptySubstitution();
    this.statement = [];
    this.cacheScopes = [[]];
    this._assignTos = [];
    topScope = this._augmentScope(builtInDefinitions(), builtInMacros(), this.scopeIndex = 0);
    topScope.typeNames = builtInTypeNames();
    topScope.topLevel = true;
    this.scopes = [topScope];
    this.savedScopes = [];
    this.classParams = newMap();
    this.types = [];
    this.isMalformed = false;
    this.importedModules = newSet();
    this._requested = newMap();
  }

  Context.prototype.req = function(moduleName, names) {
    addToMap(this._requested, moduleName, names);
    if (!this.isModuleLoaded(moduleName)) {
      return this._requesting = true;
    }
  };

  Context.prototype.isModuleLoaded = function(moduleName) {
    return inSet(this.importedModules, moduleName);
  };

  Context.prototype.requested = function() {
    if (this._requested.size > 0) {
      return this._requested;
    }
  };

  Context.prototype.isRequesting = function() {
    return this._requesting;
  };

  Context.prototype.markMalformed = function() {
    return this.isMalformed = true;
  };

  Context.prototype.definePattern = function(pattern) {
    if (this.isDefining()) {
      throw new Error("already defining, forgot to leaveDefinition?");
    }
    return this._scope().definition = {
      name: pattern && (!isFake(pattern)) && pattern.symbol,
      id: (pattern != null ? pattern.symbol : void 0) && (this.currentDeclarationId(pattern.symbol)) || this.freshId(),
      pattern: pattern,
      inside: 0,
      late: false,
      deferredBindings: [],
      definedNames: [],
      usedNames: [],
      deferrable: true,
      _defers: []
    };
  };

  Context.prototype.bareDefine = function() {
    return this.definePattern();
  };

  Context.prototype.defineNonDeferrablePattern = function(pattern) {
    var definition;
    definition = this.definePattern(pattern);
    return definition.deferrable = false;
  };

  Context.prototype.leaveDefinition = function() {
    return this._scope().definition = void 0;
  };

  Context.prototype.downInsideDefinition = function() {
    var _ref;
    return (_ref = this._definition()) != null ? _ref.inside++ : void 0;
  };

  Context.prototype.upInsideDefinition = function() {
    var _ref;
    return (_ref = this._definition()) != null ? _ref.inside-- : void 0;
  };

  Context.prototype.definitionName = function() {
    return this._definition().name;
  };

  Context.prototype.definitionId = function() {
    return this._definition().id;
  };

  Context.prototype.definitionPattern = function() {
    return this._definition().pattern;
  };

  Context.prototype._currentDefinition = function() {
    return this._scope().definition;
  };

  Context.prototype._currentDeferrableDefinition = function() {
    var def;
    return (def = this._scope().definition) && def.deferrable && def;
  };

  Context.prototype._definition = function() {
    return this._definitionAtScope(this.scopes.length - 1);
  };

  Context.prototype._definitionAtScope = function(i) {
    return this.scopes[i].definition || i > 0 && (this._definitionAtScope(i - 1)) || void 0;
  };

  Context.prototype._deferrableDefinition = function() {
    return this._deferrableDefinitionAtScope(this.scopes.length - 1);
  };

  Context.prototype._deferrableDefinitionAtScope = function(i) {
    var def;
    return (def = this.scopes[i].definition) && def.deferrable && def || i > 0 && (this._deferrableDefinitionAtScope(i - 1)) || void 0;
  };

  Context.prototype.parentDeferrableDefinitionNames = function() {
    return this._parentDeferrableDefinitionNames(this.scopes.length - 1);
  };

  Context.prototype._parentDeferrableDefinitionNames = function(i) {
    var def, rest;
    rest = i > 0 ? this._parentDeferrableDefinitionNames(i - 1) : [];
    if ((def = this.scopes[i].definition) && def.deferrable && def.name) {
      return join([def.name], rest);
    } else {
      return rest;
    }
  };

  Context.prototype.isDefining = function() {
    return !!this._scope().definition;
  };

  Context.prototype.isAtDefinition = function() {
    var definition;
    return (definition = this._currentDefinition()) && definition.pattern && definition.inside === 0;
  };

  Context.prototype.isAtBareDefinition = function() {
    var definition;
    return (definition = this._currentDefinition()) && definition.inside === 0;
  };

  Context.prototype.isAtSimpleDefinition = function() {
    return this.isAtDefinition() && this.definitionName();
  };

  Context.prototype.isAtNonDeferrableDefinition = function() {
    return this.isAtDefinition() && !this._currentDefinition().deferrable;
  };

  Context.prototype.isAtDeferrableDefinition = function() {
    return this.isAtDefinition() && this._currentDefinition().deferrable;
  };

  Context.prototype.setAssignTo = function(compiled) {
    return this._assignTos.push({
      value: compiled
    });
  };

  Context.prototype.assignTo = function() {
    var _ref;
    return (_ref = this._assignTos[this._assignTos.length - 1]) != null ? _ref.value : void 0;
  };

  Context.prototype.cacheAssignTo = function() {
    var assignTo, cache, cacheName;
    assignTo = this._assignTos[this._assignTos.length - 1];
    if ((assignTo != null ? assignTo.value : void 0) && !assignTo.cache) {
      cacheName = this.newJsVariable();
      cache = [cacheName, this.assignTo()];
      return this._assignTos[this._assignTos.length - 1] = {
        value: cacheName,
        cache: cache
      };
    }
  };

  Context.prototype.resetAssignTo = function() {
    var cache;
    if (cache = this._assignTos.pop().cache) {
      return [cache];
    } else {
      return [];
    }
  };

  Context.prototype._scope = function() {
    return this.scopes[this.scopes.length - 1];
  };

  Context.prototype._outerScope = function() {
    return this.scopes[this.scopes.length - 2];
  };

  Context.prototype.newScope = function() {
    return this.scopes.push(this._augmentScope(newMap(), newMap(), ++this.scopeIndex));
  };

  Context.prototype._augmentScope = function(scope, macros, index) {
    scope.index = index;
    scope.macros = macros;
    scope.deferred = [];
    scope.deferredBindings = [];
    scope.boundTypeVariables = newSet();
    scope.classes = newMap();
    scope.typeNames = newMap();
    scope.typeAliases = newMap();
    scope.deferredConstraints = [];
    scope.usedNames = [];
    scope.auxiliaries = newMap();
    return scope;
  };

  Context.prototype.newLateScope = function() {
    var _ref;
    this.newScope();
    return (_ref = this._deferrableDefinition()) != null ? _ref.late = true : void 0;
  };

  Context.prototype.closeScope = function() {
    var closedScope;
    closedScope = this.scopes.pop();
    return this.savedScopes[closedScope.index] = {
      parent: this.currentScopeIndex(),
      definitions: cloneMap(closedScope),
      deferredConstraints: closedScope.deferredConstraints,
      boundTypeVariables: closedScope.boundTypeVariables
    };
  };

  Context.prototype.currentScopeIndex = function() {
    return this._scope().index;
  };

  Context.prototype.isInsideLateScope = function() {
    var _ref;
    return (_ref = this._deferrableDefinition()) != null ? _ref.late : void 0;
  };

  Context.prototype.isInTopScope = function() {
    return this._scope().topLevel;
  };

  Context.prototype.addTypeName = function(dataType) {
    var kind, name, _ref;
    if (dataType instanceof TypeApp) {
      _ref = dataType.op, name = _ref.name, kind = _ref.kind;
    } else {
      name = dataType.name, kind = dataType.kind;
    }
    if ((lookupInMap(this._scope().typeNames, name)) instanceof TempKind) {
      removeFromMap(this._scope().typeNames, name);
    }
    return addToMap(this._scope().typeNames, name, kind);
  };

  Context.prototype.kindOfTypeName = function(name) {
    var kind, scope, _i, _len, _ref;
    _ref = reverse(this.scopes);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      scope = _ref[_i];
      if (kind = lookupInMap(scope.typeNames, name)) {
        return kind;
      }
    }
  };

  Context.prototype.addTypeAlias = function(name, type) {
    return addToMap(this._scope().typeAliases, name, type);
  };

  Context.prototype.resolveTypeAliases = function(name) {
    var alias;
    if (alias = lookupInMap(this._scope().typeAliases, name)) {
      return alias;
    } else {
      return name;
    }
  };

  Context.prototype.bindTypeVariables = function(vars) {
    var name, ref, _i, _len, _ref, _results;
    _results = [];
    for (_i = 0, _len = vars.length; _i < _len; _i++) {
      _ref = vars[_i], name = _ref.name, ref = _ref.ref;
      _results.push(addToMap(this._scope().boundTypeVariables, name, ref));
    }
    return _results;
  };

  Context.prototype.bindTypeVariableNames = function(names) {
    var name, _i, _len, _results;
    _results = [];
    for (_i = 0, _len = names.length; _i < _len; _i++) {
      name = names[_i];
      _results.push(addToMap(this._scope().boundTypeVariables, name, {}));
    }
    return _results;
  };

  Context.prototype.allBoundTypeVariables = function() {
    return this.allBoundTypeVariablesAt(this.currentScopeIndex());
  };

  Context.prototype.allBoundTypeVariablesAt = function(scopeIndex) {
    var scope;
    return substituteVarNames(this, concatMaps.apply(null, (scopeIndex === this.currentScopeIndex() ? this.boundTypeVariablesInCurrentScopes() : join(((function() {
      var _results;
      _results = [];
      while (scope = this.savedScopes[scopeIndex]) {
        scopeIndex = scope.parent;
        _results.push(scope.boundTypeVariables);
      }
      return _results;
    }).call(this)), this.boundTypeVariablesInCurrentScopes()))));
  };

  Context.prototype.boundTypeVariablesInCurrentScopes = function() {
    var scope, _i, _len, _ref, _results;
    _ref = this.scopes;
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      scope = _ref[_i];
      _results.push(scope.boundTypeVariables);
    }
    return _results;
  };

  Context.prototype.addToScopeConstraints = function(constraints) {
    var _ref;
    return (_ref = this._scope().deferredConstraints).push.apply(_ref, constraints);
  };

  Context.prototype.currentScopeConstraints = function() {
    return this._scope().deferredConstraints;
  };

  Context.prototype.isClassDefined = function(name) {
    return !!this._classNamed(name);
  };

  Context.prototype.addClass = function(name, classConstraint, superClasses, declarations) {
    return addToMap(this._scope().classes, name, {
      supers: superClasses,
      constraint: classConstraint,
      instances: [],
      declarations: declarations
    });
  };

  Context.prototype.classNamed = function(name) {
    return (this._classNamed(name)) || (function() {
      throw new Error("Class " + name + " is not defined");
    })();
  };

  Context.prototype._classNamed = function(name) {
    var classDeclaration, scope, _i, _len, _ref;
    _ref = reverse(this.scopes);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      scope = _ref[_i];
      if (classDeclaration = lookupInMap(scope.classes, name)) {
        return classDeclaration;
      }
    }
  };

  Context.prototype.addInstance = function(name, type) {
    return (this.classNamed(type.type.type.className)).instances.push({
      name: name,
      type: type
    });
  };

  Context.prototype.isMethod = function(name, type) {
    var className;
    return any((function() {
      var _i, _len, _ref, _results;
      _ref = type.constraints;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        className = _ref[_i].className;
        _results.push(lookupInMap((this.classNamed(className)).declarations, name));
      }
      return _results;
    }).call(this));
  };

  Context.prototype.declareMacro = function(name, macro, docs) {
    name.id = macro.id = this.freshId();
    name.scope = this.currentScopeIndex();
    macro.docs = docs;
    return addToMap(this._scope().macros, name.symbol, macro);
  };

  Context.prototype.isMacroDeclared = function(name) {
    return !!this.macro(name);
  };

  Context.prototype.macro = function(name) {
    return this._macroInScope(this.scopes.length - 1, name);
  };

  Context.prototype._macroInScope = function(i, name) {
    return (lookupInMap(this.scopes[i].macros, name)) || (!this._declarationInScope(i, name)) && i > 0 && (this._macroInScope(i - 1, name)) || void 0;
  };

  Context.prototype.isDeclared = function(name) {
    return !!this._declaration(name);
  };

  Context.prototype.isFinallyDeclared = function(name) {
    var _ref;
    return (_ref = this._declaration(name)) != null ? _ref.final : void 0;
  };

  Context.prototype.isCurrentlyDeclared = function(name) {
    return !!this._declarationInCurrentScope(name);
  };

  Context.prototype.isFinallyCurrentlyDeclared = function(name) {
    var _ref;
    return (_ref = this._declarationInCurrentScope(name)) != null ? _ref.final : void 0;
  };

  Context.prototype.isFinallyDeclaredCurrentlyTyped = function(name) {
    var declaration;
    declaration = this._declarationInCurrentScope(name);
    return (declaration != null ? declaration.final : void 0) && (declaration != null ? declaration.type : void 0);
  };

  Context.prototype.isTyped = function(name) {
    return !!this.type(name);
  };

  Context.prototype.isPreTyped = function(name) {
    return !!(this.preDeclaredType(name));
  };

  Context.prototype.isFinallyTyped = function(name, scopeIndex) {
    return !!this.finalType(name, scopeIndex);
  };

  Context.prototype.type = function(name) {
    var _ref;
    return (_ref = this._declaration(name)) != null ? _ref.type : void 0;
  };

  Context.prototype.finalType = function(name, scopeIndex) {
    var type, _ref;
    return (type = (_ref = this.savedDeclaration(name, scopeIndex)) != null ? _ref.type : void 0) && (!(type instanceof TempType)) && type;
  };

  Context.prototype.preDeclaredType = function(name) {
    var _ref;
    return (_ref = this._preDeclaration(name)) != null ? _ref.type : void 0;
  };

  Context.prototype.currentDeclarations = function() {
    return cloneMap(this._scope());
  };

  Context.prototype.scopeIndexOfDeclaration = function(name) {
    return (this._scopeOfDeclared(this.scopes.length - 1, name)).index;
  };

  Context.prototype.assignType = function(name, type) {
    return this.assignTypeTo(name, this._declarationInCurrentScope(name), type);
  };

  Context.prototype.assignTypeLate = function(name, scopeIndex, type) {
    if (scopeIndex !== this.currentScopeIndex()) {
      return this.assignTypeTo(name, this.savedDeclaration(name, scopeIndex), type);
    } else {
      return this.assignType(name, type);
    }
  };

  Context.prototype.assignTypeTo = function(name, declaration, type) {
    if (declaration) {
      if (declaration.type && !(declaration.type instanceof TempType)) {
        throw new Error("assignType: " + name + " already has a type");
      }
      declaration.type = type;
      return this.types[declaration.id] = type;
    } else {
      throw new Error("assignType: " + name + " is not declared");
    }
  };

  Context.prototype.assignArity = function(name, arity) {
    return (this._declarationInCurrentScope(name)).arity = arity;
  };

  Context.prototype.addDefinitionSource = function(name, source) {
    return (this._declarationInCurrentScope(name)).source = source;
  };

  Context.prototype.declareTyped = function(names, types) {
    var i, name, _i, _len, _results;
    _results = [];
    for (i = _i = 0, _len = names.length; _i < _len; i = ++_i) {
      name = names[i];
      _results.push(this.declare(name, {
        type: types[i]
      }));
    }
    return _results;
  };

  Context.prototype.declare = function(name, declaration) {
    declaration.final = true;
    return this._declare(name, declaration);
  };

  Context.prototype.preDeclare = function(name, declaration) {
    declaration.final = false;
    return this._declare(name, declaration);
  };

  Context.prototype.declareAsFinal = function(name, scopeIndex) {
    return (this.savedDeclaration(name, scopeIndex)).final = true;
  };

  Context.prototype._declare = function(name, declaration) {
    if (declaration.id == null) {
      declaration.id = this.freshId();
    }
    return replaceOrAddToMap(this._scope(), name, declaration);
  };

  Context.prototype._preDeclaration = function(name) {
    var declaration;
    return (declaration = this._declarationInCurrentScope(name)) && !declaration.final && declaration;
  };

  Context.prototype._declarationInCurrentScope = function(name) {
    return lookupInMap(this._scope(), name);
  };

  Context.prototype._declaration = function(name) {
    return this._lookupDeclaration(this.scopes.length - 1, name);
  };

  Context.prototype._lookupDeclaration = function(i, name) {
    return (this._declarationInScope(i, name)) || i > 0 && (this._lookupDeclaration(i - 1, name)) || void 0;
  };

  Context.prototype._scopeOfDeclared = function(i, name) {
    return (this._declarationInScope(i, name)) && this.scopes[i] || i > 0 && (this._scopeOfDeclared(i - 1, name)) || void 0;
  };

  Context.prototype._declarationInScope = function(i, name) {
    var decl;
    return (decl = lookupInMap(this.scopes[i], name)) && !decl.isClass && decl;
  };

  Context.prototype.freshId = function() {
    return this.nameIndex++;
  };

  Context.prototype.savedDeclaration = function(name, scopeIndex) {
    var saved;
    if (scopeIndex !== this.currentScopeIndex()) {
      saved = this.savedScopes[scopeIndex];
      return (lookupInMap(saved.definitions, name)) || this.savedDeclaration(name, saved.parent);
    } else {
      return this._declarationInCurrentScope(name);
    }
  };

  Context.prototype.addToDeferredNames = function(binding) {
    return this._deferrableDefinition().deferredBindings.push(binding);
  };

  Context.prototype.addToDeferredBindings = function(binding) {
    return this._scope().deferredBindings.push(binding);
  };

  Context.prototype.addToParentDeferred = function(binding) {
    return this._outerScope().deferredBindings.push(binding);
  };

  Context.prototype.addToDefinedNames = function(binding) {
    var _ref, _ref1;
    return (_ref = this._currentDefinition()) != null ? (_ref1 = _ref.definedNames) != null ? _ref1.push(binding) : void 0 : void 0;
  };

  Context.prototype.addToUsedNames = function(name) {
    return (this._scopeOfDeclared(this.scopes.length - 1, name)).usedNames.push(name);
  };

  Context.prototype.definedNames = function() {
    var _ref, _ref1;
    return (_ref = (_ref1 = this._currentDefinition()) != null ? _ref1.definedNames : void 0) != null ? _ref : [];
  };

  Context.prototype.usedNames = function() {
    return this._scope().usedNames;
  };

  Context.prototype.setUsedNames = function(usedNames) {
    return this._scope().usedNames = usedNames;
  };

  Context.prototype.setAuxiliaryDefinitions = function(compiledDefinitions) {
    var auxiliaries, def, defined, _i, _j, _len, _len1, _ref;
    auxiliaries = newMap();
    for (_i = 0, _len = compiledDefinitions.length; _i < _len; _i++) {
      def = compiledDefinitions[_i];
      if (def.definedNames) {
        _ref = def.definedNames;
        for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
          defined = _ref[_j];
          addToMap(auxiliaries, defined, {
            deps: unique(def.usedNames),
            defines: def.definedNames,
            definition: def
          });
        }
      }
    }
    return this._scope().auxiliaries = auxiliaries;
  };

  Context.prototype.auxiliaries = function() {
    return this._scope().auxiliaries;
  };

  Context.prototype.deferredNames = function() {
    return this._definition().deferredBindings;
  };

  Context.prototype.deferredBindings = function() {
    return this._scope().deferredBindings;
  };

  Context.prototype.currentDeclarationId = function(name) {
    var _ref;
    return (_ref = this._declarationInCurrentScope(name)) != null ? _ref.id : void 0;
  };

  Context.prototype.declarationId = function(name) {
    var _ref;
    return (_ref = this._declaration(name)) != null ? _ref.id : void 0;
  };

  Context.prototype.arity = function(name) {
    var _ref;
    return (_ref = this._declaration(name)) != null ? _ref.arity : void 0;
  };

  Context.prototype.tempType = function(name) {
    var _ref;
    return (_ref = this._declaration(name)) != null ? _ref.tempType : void 0;
  };

  Context.prototype.freshTypeVariable = function(kind) {
    var name;
    if (!kind) {
      throw new Error("Provide kind in freshTypeVariable");
    }
    name = freshName(this.typeVariabeIndex++);
    return new TypeVariable(name, kind);
  };

  Context.prototype.extendSubstitution = function(substitution) {
    return this.substitution = joinSubs(substitution, this.substitution);
  };

  Context.prototype.newJsVariable = function() {
    return "i" + (this.variableIndex++);
  };

  Context.prototype.doDefer = function(expression, dependencyName) {
    var definition;
    definition = this._deferrableDefinition();
    return definition._defers.push([expression, dependencyName, this.currentScopeIndex()]);
  };

  Context.prototype.deferReason = function() {
    return this._deferReasonOf(this._deferrableDefinition());
  };

  Context.prototype.shouldDefer = function() {
    return !!(this._deferReasonOf(this._deferrableDefinition()));
  };

  Context.prototype._deferReasonOf = function(definition) {
    return definition != null ? definition._defers[0] : void 0;
  };

  Context.prototype.addDeferredDefinition = function(_arg) {
    var dependencyName, expression, lhs, rhs, useScopeIndex;
    expression = _arg[0], dependencyName = _arg[1], useScopeIndex = _arg[2], lhs = _arg[3], rhs = _arg[4];
    return this._scope().deferred.push([expression, dependencyName, useScopeIndex, lhs, rhs]);
  };

  Context.prototype.deferred = function() {
    return this._scope().deferred;
  };

  Context.prototype.addClassParams = function(params) {
    return this.classParams = concatMaps(this.classParams, params);
  };

  Context.prototype.classParamNameFor = function(constraint) {
    var typeMap;
    typeMap = this.classParamsForType(constraint);
    if (typeMap) {
      return lookupInMap(typeMap, constraint.className);
    }
  };

  Context.prototype.classParamsForType = function(constraint) {
    return nestedLookupInMap(this.classParams, typeNamesOfNormalized(constraint));
  };

  Context.prototype.updateClassParams = function() {};

  return Context;

})();

expressionCompile = function(ctx, expression) {
  var compileFn;
  if (!(ctx instanceof Context && (expression != null))) {
    throw new Error("invalid expressionCompile args");
  }
  compileFn = isFake(expression) ? fakeCompile : isAtom(expression) ? atomCompile : isTuple(expression) ? tupleCompile : isSeq(expression) ? seqOrMapCompile : isCall(expression) ? callCompile : void 0;
  if (!compileFn) {
    return malformed(ctx, expression, 'not a valid expression');
  } else {
    return compileFn(ctx, expression);
  }
};

callCompile = function(ctx, call) {
  var expandedOp, operator, operatorName;
  operator = _operator(call);
  operatorName = _symbol(operator);
  if (isName(operator)) {
    return (isDotAccess(operator) ? callJsMethodCompile : (ctx.isMacroDeclared(operatorName)) && !ctx.isDeclared(operatorName) ? callMacroCompile : (isFake(operator)) || (ctx.isFinallyDeclared(operatorName)) && !ctx.arity(operatorName) ? callUnknownCompile : callKnownCompile)(ctx, call);
  } else {
    expandedOp = termCompile(ctx, operator);
    if (isTranslated(expandedOp)) {
      return callUnknownTranslate(ctx, expandedOp, call);
    } else {
      return expressionCompile(ctx, replicate(call, call_(join([expandedOp], _arguments(call)))));
    }
  }
};

callMacroCompile = function(ctx, call) {
  var compiled, expanded;
  expanded = callMacroExpand(ctx, call);
  if (isTranslated(expanded)) {
    return expanded;
  } else {
    compiled = expressionCompile(ctx, expanded);
    retrieve(call, expanded);
    return compiled;
  }
};

callMacroExpand = function(ctx, call) {
  var macro, op;
  op = _operator(call);
  op.label = 'keyword';
  op.scope = ctx.currentScopeIndex();
  macro = ctx.macro(op.symbol);
  op.id = macro.id;
  return macro(ctx, call);
};

isTranslated = function(result) {
  return (isSimpleTranslated(result)) || (Array.isArray(result)) && ((_empty(result)) || (isSimpleTranslated(result[0])));
};

isSimpleTranslated = function(result) {
  return result.js || result.ir || result.precs || result.assigns;
};

callUnknownCompile = function(ctx, call) {
  return callUnknownTranslate(ctx, operatorCompile(ctx, call), call);
};

callKnownCompile = function(ctx, call) {
  var args, argsInOrder, compiled, extraParamNames, extraParams, invalidArgLabels, labeledArgs, lambda, n, nonLabeledArgs, operator, paramNames, paramNamesSet, positionalParams, sortedCall;
  operator = _operator(call);
  args = _labeled(_arguments(call));
  labeledArgs = labeledToMap(args);
  if (tagFreeLabels(ctx, args)) {
    return jsNoop();
  }
  paramNames = ctx.arity(operator.symbol);
  if (!paramNames) {
    return callUnknownCompile(ctx, call);
  }
  paramNamesSet = arrayToSet(paramNames);
  positionalParams = filter((function(param) {
    return !(lookupInMap(labeledArgs, param));
  }), paramNames);
  nonLabeledArgs = map(_snd, filter((function(_arg) {
    var label, value;
    label = _arg[0], value = _arg[1];
    return !label;
  }), args));
  invalidArgLabels = map(_fst, filter((function(_arg) {
    var label, value;
    label = _arg[0], value = _arg[1];
    return label && !inSet(paramNamesSet, _labelName(label));
  }), args));
  map((function(label) {
    return malformed(ctx, label, "Invalid label for " + operator.symbol);
  }), invalidArgLabels);
  if (_notEmpty(invalidArgLabels)) {
    return jsNoop();
  }
  extraParamNames = positionalParams.slice(nonLabeledArgs.length);
  extraParams = map(token_, (function() {
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = extraParamNames.length; _i < _len; _i++) {
      n = extraParamNames[_i];
      _results.push("_" + n);
    }
    return _results;
  })());
  argsInOrder = sortCallArguments(paramNames, labeledArgs, nonLabeledArgs, extraParams);
  sortedCall = call_(operator, argsInOrder);
  if (ctx.assignTo()) {
    if (isCapital(operator)) {
      if (args.length < paramNames.length && nonLabeledArgs.length > 0) {
        return malformed(ctx, call, "curried constructor pattern");
      } else {
        compiled = callConstructorPattern(ctx, sortedCall, extraParamNames);
        retrieve(call, sortedCall);
        return compiled;
      }
    } else {
      return malformed(ctx, call, "function patterns not supported");
    }
  } else {
    if (nonLabeledArgs.length < positionalParams.length) {
      lambda = fn_(extraParams, [sortedCall]);
      trackTransformation(lambda, sortedCall);
      compiled = callMacroCompile(ctx, lambda);
      retrieve(call, lambda);
      ctx.savedScopes[ctx.savedScopes.length - 1].definitions = newMap();
      return compiled;
    } else {
      compiled = ctx.isMacroDeclared(operator.symbol) ? callMacroCompile(ctx, sortedCall) : callSaturatedKnownCompile(ctx, sortedCall);
      retrieve(call, sortedCall);
      if (nonLabeledArgs.length > positionalParams.length) {
        malformed(ctx, call, "Too many arguments to " + operator.symbol);
      }
      return compiled;
    }
  }
};

sortedArgs = function(paramNames, call) {
  var args, labeledArgs, nonLabeledArgs;
  args = _labeled(_arguments(call));
  labeledArgs = labeledToMap(args);
  nonLabeledArgs = map(_snd, filter((function(_arg) {
    var label, value;
    label = _arg[0], value = _arg[1];
    return !label;
  }), args));
  return sortCallArguments(paramNames, labeledArgs, nonLabeledArgs, []);
};

sortCallArguments = function(paramNames, labeledArgs, nonLabeledArgs, extraParams) {
  var extraArgs, param, positionalArgs, _i, _len, _results;
  positionalArgs = map(id, nonLabeledArgs);
  extraArgs = map(id, extraParams);
  _results = [];
  for (_i = 0, _len = paramNames.length; _i < _len; _i++) {
    param = paramNames[_i];
    _results.push((lookupInMap(labeledArgs, param)) || positionalArgs.shift() || extraArgs.shift());
  }
  return _results;
};

callConstructorPattern = function(ctx, call, extraParamNames) {
  var arg, args, compiledArgs, elemCompiled, i, isExtra, operator, paramNames, precsForData, _i, _len;
  operator = _operator(call);
  args = _arguments(call);
  isExtra = function(arg) {
    var _ref;
    return (isAtom(arg)) && (_ref = _symbol(arg), __indexOf.call(extraParamNames, _ref) >= 0);
  };
  paramNames = ctx.arity(operator.symbol);
  if (args.length - extraParamNames.length > 1) {
    ctx.cacheAssignTo();
  }
  compiledArgs = (function() {
    var _i, _len, _results;
    _results = [];
    for (i = _i = 0, _len = args.length; _i < _len; i = ++_i) {
      arg = args[i];
      if (!(!isExtra(arg))) {
        continue;
      }
      ctx.setAssignTo(jsAccess(ctx.assignTo(), paramNames[i]));
      elemCompiled = expressionCompile(ctx, arg);
      _results.push(withCache(ctx.resetAssignTo(), elemCompiled));
    }
    return _results;
  })();
  precsForData = operatorCompile(ctx, call);
  for (_i = 0, _len = args.length; _i < _len; _i++) {
    arg = args[_i];
    if (isExtra(arg)) {
      arg.tea = toConstrained(ctx.freshTypeVariable(star));
    }
  }
  callTyping(ctx, call);
  return combinePatterns(join([precsForData], compiledArgs));
};

callSaturatedKnownCompile = function(ctx, call) {
  var args, compiledArgs, compiledOperator, operator;
  operator = _operator(call);
  args = _arguments(call);
  compiledOperator = operatorCompile(ctx, call);
  compiledArgs = termsCompile(ctx, args);
  callTyping(ctx, call);
  return assignCompile(ctx, call, irCall(operator.tea, compiledOperator, compiledArgs));
};

labeledToMap = function(pairs) {
  var labelNaming;
  labelNaming = function(_arg) {
    var label, value;
    label = _arg[0], value = _arg[1];
    return [_labelName(label), value];
  };
  return newMapKeysVals.apply(null, unzip(map(labelNaming, filter(all, pairs))));
};

tagFreeLabels = function(ctx, pairs) {
  var freeLabels;
  freeLabels = filter((function(_arg) {
    var label, value;
    label = _arg[0], value = _arg[1];
    return !value;
  }), pairs);
  freeLabels.map(function(label) {
    return malformed(ctx, label, 'Missing value for a label');
  });
  return freeLabels.length > 0;
};

operatorCompile = function(ctx, call) {
  var compiledOperator, op;
  op = _operator(call);
  ctx.downInsideDefinition();
  compiledOperator = expressionCompile(ctx, op);
  if (isAtom(op)) {
    labelOperator(op);
  }
  ctx.upInsideDefinition();
  return compiledOperator;
};

callUnknownTranslate = function(ctx, translatedOperator, call) {
  var argList, args;
  args = _arguments(call);
  argList = ctx.shouldDefer() ? deferredExpression() : termsCompile(ctx, args);
  callTyping(ctx, call);
  if (ctx.assignTo()) {
    return malformed(ctx, call, 'Invalid pattern');
  } else {
    return assignCompile(ctx, call, isFake(_operator(call)) ? jsNoop() : jsCall("_" + args.length, join([translatedOperator], argList)));
  }
};

callTyping = function(ctx, call) {
  var op, tea, terms;
  if (ctx.shouldDefer()) {
    return;
  }
  terms = _terms(call);
  op = _operator(call);
  if (!all((function() {
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = terms.length; _i < _len; _i++) {
      tea = terms[_i].tea;
      _results.push(tea);
    }
    return _results;
  })())) {
    return;
  }
  return call.tea = terms.length === 1 ? callZeroInfer(ctx, op, op.tea) : callInfer(ctx, _operator(call), terms);
};

callInfer = function(ctx, operator, terms) {
  var arg, lastArg, op, subTerms, _i;
  if (terms.length > 2) {
    subTerms = 2 <= terms.length ? __slice.call(terms, 0, _i = terms.length - 1) : (_i = 0, []), lastArg = terms[_i++];
    return callInferSingle(ctx, operator, callInfer(ctx, operator, subTerms), lastArg.tea);
  } else {
    op = terms[0], arg = terms[1];
    return callInferSingle(ctx, operator, op.tea, arg.tea);
  }
};

callInferSingle = function(ctx, originalOperator, operatorTea, argTea) {
  var callType, returnType;
  returnType = withOrigin(ctx.freshTypeVariable(star), originalOperator);
  callType = mapOriginOnFunction(typeFn(argTea.type, returnType), originalOperator);
  unify(ctx, operatorTea.type, callType);
  return new Constrained(join(operatorTea.constraints, argTea.constraints), returnType);
};

callZeroInfer = function(ctx, originalOperator, operatorTea) {
  var callType, returnType;
  returnType = withOrigin(ctx.freshTypeVariable(star), originalOperator);
  callType = mapOriginOnFunction(typeFn(returnType), originalOperator);
  unify(ctx, operatorTea.type, callType);
  return new Constrained(operatorTea.constraints, returnType);
};

termsCompile = function(ctx, list) {
  var term, _i, _len, _results;
  _results = [];
  for (_i = 0, _len = list.length; _i < _len; _i++) {
    term = list[_i];
    _results.push(termCompile(ctx, term));
  }
  return _results;
};

termCompile = function(ctx, term) {
  var compiled;
  ctx.downInsideDefinition();
  compiled = expressionCompile(ctx, term);
  ctx.upInsideDefinition();
  return compiled;
};

expressionsCompile = function(ctx, list) {
  var expression, _i, _len, _results;
  _results = [];
  for (_i = 0, _len = list.length; _i < _len; _i++) {
    expression = list[_i];
    _results.push(expressionCompile(ctx, expression));
  }
  return _results;
};

tupleCompile = function(ctx, form) {
  var arity, compiledElems, elem, elemCompiled, elems, i;
  elems = _terms(form);
  arity = elems.length;
  if (arity > 1) {
    ctx.cacheAssignTo();
  }
  compiledElems = (function() {
    var _i, _len, _results;
    if (ctx.assignTo()) {
      _results = [];
      for (i = _i = 0, _len = elems.length; _i < _len; i = ++_i) {
        elem = elems[i];
        ctx.setAssignTo(jsAccess(ctx.assignTo(), "" + i));
        elemCompiled = expressionCompile(ctx, elem);
        _results.push(withCache(ctx.resetAssignTo(), elemCompiled));
      }
      return _results;
    } else {
      return termsCompile(ctx, elems);
    }
  })();
  if (!ctx.shouldDefer()) {
    form.tea = withOrigin(tupleOfTypes(map(_tea, elems)), form);
  }
  if (ctx.assignTo()) {
    return combinePatterns(compiledElems);
  } else {
    labelOperator(form);
    return assignCompile(ctx, form, jsArray(compiledElems));
  }
};

withCache = function(cache, compiled) {
  return {
    precs: compiled.precs,
    assigns: cache.concat(compiled.assigns || [])
  };
};

seqOrMapCompile = function(ctx, form) {
  var elems;
  elems = _terms(form);
  return ((_notEmpty(elems)) && isLabel(elems[0]) ? hashmapCompile : seqCompile)(ctx, form);
};

seqCompile = function(ctx, form) {
  var compiledArgs, compiledItems, cond, elem, elemType, elems, hasSplat, i, index, lhs, lhsCompiled, requiredElems, rhs, sequence, size, splatted, _i, _j, _len, _len1;
  elems = _validTerms(form);
  size = elems.length;
  if (size > 1) {
    ctx.cacheAssignTo();
  }
  if (sequence = ctx.assignTo()) {
    hasSplat = false;
    requiredElems = 0;
    for (_i = 0, _len = elems.length; _i < _len; _i++) {
      elem = elems[_i];
      if (isSplat(elem)) {
        if (hasSplat) {
          return malformed(ctx, elem, 'Only one splat is allowed');
        } else {
          hasSplat = true;
        }
      } else {
        requiredElems++;
      }
    }
    if (hasSplat && requiredElems === 0) {
      return malformed(ctx, form, 'Matching with splat requires at least one element name');
    }
    splatted = false;
    compiledArgs = (function() {
      var _j, _len1, _ref, _results;
      _results = [];
      for (i = _j = 0, _len1 = elems.length; _j < _len1; i = ++_j) {
        elem = elems[i];
        _ref = isSplat(elem) ? (splatted = true, elem.label = 'name', [splatToName(elem), jsCall("seq_splat", [i, elems.length - i - 1, sequence])]) : (index = splatted ? jsBinary("-", jsCall("seq_size", [sequence]), elems.length - i) : i, [elem, jsCall("seq_at", [index, sequence])]), lhs = _ref[0], rhs = _ref[1];
        ctx.setAssignTo(rhs);
        lhsCompiled = expressionCompile(ctx, lhs);
        retrieve(elem, lhs);
        _results.push(withCache(ctx.resetAssignTo(), lhsCompiled));
      }
      return _results;
    })();
    elemType = ctx.freshTypeVariable(star);
    form.tea = new Constrained(concatMap(_constraints, map(_tea, elems)), mapOrigin(new TypeApp(cloneType(arrayType), elemType), form));
    for (_j = 0, _len1 = elems.length; _j < _len1; _j++) {
      elem = elems[_j];
      unify(ctx, elem.tea.type, isSplat(elem) ? form.tea.type : elemType);
    }
    cond = jsBinary((hasSplat ? '>=' : '==='), jsCall("seq_size", [sequence]), requiredElems);
    return combinePatterns(join([
      {
        precs: [cond_(cond)]
      }
    ], compiledArgs));
  } else {
    if (_notEmpty(elems)) {
      elems = _terms(form);
    }
    compiledItems = uniformCollectionCompile(ctx, form, elems, arrayType);
    return assignCompile(ctx, form, irArray(compiledItems));
  }
};

isSplat = function(expression) {
  return (isAtom(expression)) && (_symbol(expression)).slice(0, 2) === '..';
};

splatToName = function(splat) {
  return replicate(splat, token_((_symbol(splat)).slice(2)));
};

hashmapCompile = function(ctx, form) {
  var compiledItems, hashmap, items, keyedType, keys, labels, _ref;
  if (hashmap = ctx.assignTo()) {
    throw new Error("matching on hash maps not supported yet");
  } else {
    _ref = unzip(filter(all, pairsLeft(isLabel, _terms(form)))), labels = _ref[0], items = _ref[1];
    keyedType = withOrigin(new TypeApp(hashmapType, stringType), form);
    compiledItems = uniformCollectionCompile(ctx, form, items, keyedType);
    keys = map(__(string_, _labelName), labels);
    return assignCompile(ctx, form, irMap(keys, compiledItems));
  }
};

uniformCollectionCompile = function(ctx, form, items, collectionType, moreConstraints) {
  var compiled, constraints, itemType, markedType, _ref;
  if (moreConstraints == null) {
    moreConstraints = [];
  }
  markedType = mapWithOrigin(collectionType, isCall(form) ? _operator(form) : form);
  _ref = termsCompileExpectingSameType(ctx, form, items), constraints = _ref.constraints, itemType = _ref.itemType, compiled = _ref.compiled;
  if (!isCall(form)) {
    labelOperator(form);
  }
  form.tea = new Constrained(join(moreConstraints, constraints), withOrigin(new TypeApp(markedType, itemType), form));
  return compiled;
};

termsCompileExpectingSameType = function(ctx, origin, items) {
  var itemType;
  itemType = withOrigin(ctx.freshTypeVariable(star), origin);
  return termsCompileExpectingType(ctx, itemType, items);
};

termsCompileExpectingType = function(ctx, itemType, terms) {
  var compiled, constraints;
  compiled = termsCompile(ctx, terms);
  constraints = unifyTypesOfTermsWithType(ctx, itemType, terms);
  return {
    constraints: constraints,
    itemType: itemType,
    compiled: compiled
  };
};

unifyTypesOfTerms = function(ctx, terms) {
  var constraints, itemType;
  itemType = ctx.freshTypeVariable(star);
  constraints = unifyTypesOfTermsWithType(ctx, itemType, terms);
  return {
    itemType: itemType,
    constraints: constraints
  };
};

unifyTypesOfTermsWithType = function(ctx, canonicalType, terms) {
  var tea, term, _i, _len;
  for (_i = 0, _len = terms.length; _i < _len; _i++) {
    term = terms[_i];
    if (term.tea) {
      unify(ctx, canonicalType, term.tea.type);
    }
  }
  return concatMap(_constraints, (function() {
    var _j, _len1, _results;
    _results = [];
    for (_j = 0, _len1 = terms.length; _j < _len1; _j++) {
      tea = terms[_j].tea;
      if (tea) {
        _results.push(tea);
      }
    }
    return _results;
  })());
};

typeConstrainedCompile = function(ctx, call) {
  var constraints, type, _ref;
  _ref = _arguments(call), type = _ref[0], constraints = 2 <= _ref.length ? __slice.call(_ref, 1) : [];
  return new Constrained(typeConstraintsCompile(ctx, constraints), typeCompile(ctx, type));
};

typeCompile = function(ctx, expression, expectedKind) {
  var _base;
  if (!expression) {
    throw new Error("invalid typeCompile args");
  }
  return typeof (_base = (isAtom(expression) ? typeNameCompile : isTuple(expression) ? typeTupleCompile : isCall(expression) ? typeConstructorCompile : malformed(ctx, expression, 'not a valid type'))) === "function" ? _base(ctx, expression, expectedKind) : void 0;
};

typesCompile = function(ctx, expressions, expectedKinds) {
  var e, i, _i, _len, _results;
  if (expectedKinds == null) {
    expectedKinds = [];
  }
  _results = [];
  for (i = _i = 0, _len = expressions.length; _i < _len; i = ++_i) {
    e = expressions[i];
    _results.push(typeCompile(ctx, e, expectedKinds[i]));
  }
  return _results;
};

typeNameCompile = function(ctx, atom, expectedKind) {
  var expanded, finalKind, kindOfType, type;
  expanded = ctx.resolveTypeAliases(atom.symbol);
  type = expanded === atom.symbol ? (kindOfType = isNotCapital(atom) ? expectedKind || star : ctx.kindOfTypeName(atom.symbol), kindOfType instanceof TempKind ? kindOfType = expectedKind || star : void 0, !kindOfType ? (!isFake(atom) ? malformed(ctx, atom, "This type name has not been defined") : void 0, kindOfType = star) : void 0, isFake(atom) ? atom.inferredType = true : void 0, withOrigin((isFake(atom) ? ctx.freshTypeVariable(kindOfType) : atomicType(atom.symbol, kindOfType)), atom)) : expanded;
  finalKind = kind(type);
  if (expectedKind instanceof KindFn) {
    labelOperator(atom);
  } else {
    if (!isFake(atom)) {
      atom.label = 'typename';
    }
  }
  return type;
};

typeTupleCompile = function(ctx, form) {
  var elemTypes;
  labelOperator(form);
  elemTypes = _terms(form);
  return applyKindFn.apply(null, [withOrigin(tupleType(elemTypes.length), form)].concat(__slice.call(typesCompile(ctx, elemTypes))));
};

typeConstructorCompile = function(ctx, call) {
  var args, arity, compiledArgs, name, op, operatorType;
  op = _operator(call);
  args = _arguments(call);
  if (isAtom(op)) {
    name = op.symbol;
    compiledArgs = typesCompile(ctx, args);
    if (name === 'Fn') {
      labelOperator(op);
      return mapOriginOnFunction(typeFn.apply(null, compiledArgs), call);
    } else {
      arity = args.length;
      operatorType = typeNameCompile(ctx, op, kindFn(arity));
      return withOrigin(applyKindFn.apply(null, [operatorType].concat(__slice.call(compiledArgs))), call);
    }
  } else {
    return malformed(ctx, op, 'Expected a type constructor instead');
  }
};

typeConstraintCompile = function(ctx, expression) {
  var args, className, constraint, op, paramKinds;
  if (isValidTypeConstraint(ctx, expression)) {
    op = _operator(expression);
    args = _arguments(expression);
    labelOperator(op);
    className = op.symbol;
    constraint = ctx.classNamed(className).constraint;
    paramKinds = map(kind, constraint.types.types);
    return withOrigin(new ClassConstraint(op.symbol, new Types(typesCompile(ctx, args, paramKinds))), expression);
  }
};

isValidTypeConstraint = function(ctx, expression) {
  var op;
  if (isCall(expression)) {
    if ((!isAtom((op = _operator(expression)))) || isFake(op)) {
      malformed(ctx, expression, 'Class name required in a constraint');
      return false;
    }
  } else {
    malformed(ctx, expression, 'Class constraint expected');
    return false;
  }
  return true;
};

typeConstraintsCompile = function(ctx, expressions) {
  var e;
  return filter((function(t) {
    return t instanceof ClassConstraint;
  }), (function() {
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = expressions.length; _i < _len; _i++) {
      e = expressions[_i];
      if (!isFake(e)) {
        _results.push(typeConstraintCompile(ctx, e));
      }
    }
    return _results;
  })());
};

assignCompile = function(ctx, expression, translatedExpression) {
  return assignCompileAs(ctx, expression, translatedExpression, false);
};

assignCompileAs = function(ctx, expression, translatedExpression, polymorphic) {
  var assigns, inferredType, isMalformed, name, precs, to, translation, translationCache, _ref;
  if (ctx.isAtDefinition()) {
    to = ctx.definitionPattern();
    ctx.setAssignTo(irDefinition(expression.tea, translatedExpression, {
      name: ctx.definitionName(),
      scopeIndex: ctx.currentScopeIndex()
    }));
    _ref = patternCompile(ctx, to, expression, polymorphic), precs = _ref.precs, assigns = _ref.assigns, isMalformed = _ref.isMalformed;
    translationCache = ctx.resetAssignTo();
    if (ctx.shouldDefer()) {
      return deferCurrentDefinition(ctx, expression);
    }
    if (!expression.tea) {
      return jsNoop();
    }
    if (isMalformed || isFake(expression)) {
      return jsNoop();
    }
    if (assigns.length === 0) {
      return malformed(ctx, to, 'Not an assignable pattern');
    }
    translation = map(compileVariableAssignment, join(translationCache, assigns));
    translation.usedNames = ctx.usedNames();
    translation.definedNames = (function() {
      var _i, _len, _ref1, _results;
      _ref1 = ctx.definedNames();
      _results = [];
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        name = _ref1[_i].name;
        _results.push(name);
      }
      return _results;
    })();
    ctx.setUsedNames([]);
    return translation;
  } else {
    if (ctx.isAtBareDefinition() && expression.tea) {
      inferredType = expression.tea;
      deferConstraints(ctx, inferredType.constraints, inferredType, ctx.currentScopeIndex());
    }
    return translatedExpression;
  }
};

deferCurrentDefinition = function(ctx, expression) {
  ctx.addDeferredDefinition(ctx.deferReason().concat([ctx.definitionPattern(), expression]));
  return deferredExpression();
};

polymorphicAssignCompile = function(ctx, expression, translatedExpression) {
  return assignCompileAs(ctx, expression, translatedExpression, true);
};

patternCompile = function(ctx, pattern, matched, polymorphic) {
  var assigns, constraints, currentType, deferredConstraints, definedNames, deps, id, isMalformed, name, precs, shouldDeclareFinally, type, _i, _j, _len, _len1, _ref, _ref1, _ref2;
  _ref = expressionCompile(ctx, pattern), precs = _ref.precs, assigns = _ref.assigns;
  definedNames = ctx.definedNames();
  if (ctx.shouldDefer()) {
    shouldDeclareFinally = ctx.isDeclared(ctx.deferReason()[1]);
    for (_i = 0, _len = definedNames.length; _i < _len; _i++) {
      _ref1 = definedNames[_i], name = _ref1.name, id = _ref1.id;
      if (shouldDeclareFinally && (!ctx.isFinallyCurrentlyDeclared(name))) {
        ctx.declare(name, {
          id: id
        });
      } else if (!ctx.isCurrentlyDeclared(name)) {
        ctx.preDeclare(name, {
          id: id
        });
      }
    }
    return {};
  }
  if (pattern.tea && matched.tea) {
    unify(ctx, matched.tea.type, pattern.tea.type);
  }
  if (!matched.tea || isFake(pattern)) {
    return {
      precs: precs,
      assigns: assigns,
      isMalformed: true
    };
  }
  constraints = matched.tea.constraints;
  for (_j = 0, _len1 = definedNames.length; _j < _len1; _j++) {
    _ref2 = definedNames[_j], name = _ref2.name, id = _ref2.id, type = _ref2.type;
    deps = ctx.deferredNames();
    if (ctx.isFinallyDeclaredCurrentlyTyped(name)) {
      malformed(ctx, pattern, "" + name + " is already declared");
      isMalformed = true;
    } else {
      if (!ctx.isCurrentlyDeclared(name)) {
        ctx.declare(name, {
          id: id
        });
      }
      if (deps.length > 0) {
        currentType = type;
        ctx.addToDeferredBindings({
          name: scopedName(name, ctx.currentScopeIndex()),
          id: name,
          scopeIndex: ctx.currentScopeIndex(),
          type: currentType,
          constraints: constraints,
          polymorphic: polymorphic,
          deps: deps
        });
        if (!ctx.isTyped(name)) {
          ctx.assignType(name, new TempType(type));
        }
      } else {
        deferredConstraints = inferType(ctx, name, type, constraints, polymorphic);
        ctx.addToScopeConstraints(deferredConstraints);
      }
    }
  }
  if (definedNames.length === 1) {
    ctx.addDefinitionSource((_fst(definedNames)).name, matched);
  }
  return {
    precs: precs != null ? precs : [],
    assigns: assigns != null ? assigns : [],
    isMalformed: isMalformed
  };
};

inferType = function(ctx, name, type, constraints, polymorphic, scopeIndex) {
  var constraint, currentType, declaredType, deferredConstraints, explicitType, inferredType, isDeclaredConstraint, notDeclared, retainedConstraints, success, unifiedType, updatedDeclaredType, _i, _len;
  if (scopeIndex == null) {
    scopeIndex = ctx.currentScopeIndex();
  }
  currentType = type;
  if (ctx.isFinallyTyped(name, scopeIndex)) {
    declaredType = ctx.type(name);
    explicitType = copyOrigin(freshInstance(ctx, declaredType), declaredType.type);
    updatedDeclaredType = quantifyUnbound(ctx, explicitType);
    unify(ctx, currentType.type, explicitType.type);
    unifiedType = explicitType;
    inferredType = quantifyUnbound(ctx, unifiedType);
    if (!typeEq(inferredType, updatedDeclaredType)) {
      declaredTypeTooGeneral(ctx, inferredType, updatedDeclaredType, unifiedType, declaredType);
    }
    isDeclaredConstraint = function(c) {
      var entailed;
      return entailed = entail(ctx, unifiedType.constraints, c);
    };
    notDeclared = filter(__(_not, isDeclaredConstraint), constraints);
    success = deferConstraints(ctx, notDeclared, currentType, scopeIndex).success;
    if (success) {
      deferredConstraints = success[0], retainedConstraints = success[1];
      if (_notEmpty(retainedConstraints)) {
        for (_i = 0, _len = retainedConstraints.length; _i < _len; _i++) {
          constraint = retainedConstraints[_i];
          declaredTypeMissingConstraint(ctx, name, constraint);
        }
      }
    }
  } else {
    if (!ctx.isAtNonDeferrableDefinition()) {
      success = deferConstraints(ctx, constraints, currentType, scopeIndex).success;
      if (!success) {
        return [];
      }
      deferredConstraints = success[0], retainedConstraints = success[1];
      currentType = type;
    }
    ctx.assignTypeLate(name, scopeIndex, polymorphic ? quantifyUnbound(ctx, addConstraints(currentType, retainedConstraints)) : toForAll(currentType));
  }
  ctx.declareAsFinal(name, scopeIndex);
  return deferredConstraints || [];
};

declaredTypeTooGeneral = function(ctx, inferredType, updatedDeclaredType, unifiedType, declaredType) {
  var conflicts, declaringType, fromDeclared, fromInferred, got, inferred, t1, t2, types, _ref, _ref1;
  _ref = matchType(copyOrigin(inferredType.type.type, unifiedType.type), copyOrigin(updatedDeclaredType.type.type, declaredType.type.type)).fails[0], conflicts = _ref.conflicts, types = _ref.types;
  fromInferred = types[0], fromDeclared = types[1];
  _ref1 = sortBasedOnOriginPosition(fromInferred, fromDeclared), t1 = _ref1[0], t2 = _ref1[1];
  declaringType = originOf(fromDeclared);
  if (declaringType && isFake(declaringType)) {
    return declaringType.inferredType = replaceQuantifiedByOrigin(fromInferred);
  } else {
    inferred = "inferred " + (prettyPrintForError(fromInferred));
    got = "got " + (highlightTypeForError(declaringType));
    return ctx.extendSubstitution(substitutionFail({
      message: "declared type is too general, " + (t1 === fromInferred ? "" + inferred + ", " + got : "" + got + ", " + inferred),
      conflicts: conflicts
    }));
  }
};

declaredTypeMissingConstraint = function(ctx, name, constraint) {
  return ctx.extendSubstitution(substitutionFail({
    message: "" + name + "'s declared type is too weak, missing " + (prettyPrintForError(replaceQuantifiedByOrigin(constraint))),
    conflicts: [constraint, constraint.types.types[0]]
  }));
};

replaceQuantifiedByOrigin = function(type) {
  if (type.QuantifiedVar) {
    if (type.origin && type.origin.label === 'typename') {
      return new TypeVariable(print(type.origin), star);
    } else {
      return new TypeVariable(type["var"], star);
    }
  } else if (type.TypeVariable && type.ref.val) {
    return replaceQuantifiedByOrigin(type.ref.val);
  } else if (type.TypeVariable && type.origin && type.origin.label === 'typename') {
    return new TypeVariable(print(type.origin), type.kind);
  } else if (type.TypeApp) {
    return new TypeApp(replaceQuantifiedByOrigin(type.op), replaceQuantifiedByOrigin(type.arg));
  } else if (type.ClassConstraint) {
    return new ClassConstraint(type.className, new Types((function() {
      var _i, _len, _ref, _results;
      _ref = type.types.types;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        type = _ref[_i];
        _results.push(replaceQuantifiedByOrigin(type));
      }
      return _results;
    })()));
  } else {
    return type;
  }
};

topLevelExpression = function(ctx, expression) {
  var compiled, deferred, dependencyName;
  ctx.bareDefine();
  compiled = expressionCompile(ctx, expression);
  deferred = ctx.deferReason();
  ctx.leaveDefinition();
  if (deferred) {
    expression = deferred[0], dependencyName = deferred[1];
    malformed(ctx, expression, "" + dependencyName + " is not defined");
    return void 0;
  } else if (expression.tea) {
    return irDefinition(expression.tea, compiled, null, true);
  } else {
    return jsNoop();
  }
};

topLevel = function(ctx, form) {
  return definitionList(ctx, spaceSeparatedPairs(form));
};

topLevelModule = function(moduleName, defaultImports) {
  return function(ctx, form) {
    return [jsAssignStatement(jsAccess("Shem", validIdentifier(moduleName)), exportAll(ctx, join(importAny(defaultImports), topLevel(ctx, form))))];
  };
};

topLevelExpressionInModule = function(defaultImports) {
  return function(ctx, expression) {
    return iife(concat([toJsString('use strict;'), importAny(defaultImports), [jsReturn(topLevelExpression(ctx, expression))]]));
  };
};

definitionList = function(ctx, pairs) {
  return concat(definitionListCompile(ctx, pairs));
};

definitionListCompile = function(ctx, pairs) {
  var compiled, compiledPairs, lhs, rhs, shouldRecompile;
  compiledPairs = (function() {
    var _i, _len, _ref, _results;
    _results = [];
    for (_i = 0, _len = pairs.length; _i < _len; _i++) {
      _ref = pairs[_i], lhs = _ref[0], rhs = _ref[1];
      if (!rhs) {
        malformed(ctx, lhs, 'missing value in definition');
        rhs = fake_();
      }
      compiled = definitionPairCompile(ctx, lhs, rhs);
      if (ctx.isRequesting()) {
        break;
      }
      _results.push(compiled);
    }
    return _results;
  })();
  if (ctx.isRequesting()) {
    [];
  }
  shouldRecompile = true;
  while (shouldRecompile) {
    compiledPairs = join(compiledPairs, compileDeferred(ctx));
    shouldRecompile = _notEmpty(ctx.deferredBindings());
    resolveDeferredTypes(ctx);
  }
  deferDeferred(ctx);
  return filter(_is, compiledPairs);
};

resolveDeferredTypes = function(ctx) {
  var added, addedDep, allConstraints, allDeferredConstraints, binding, bindings, canonicalType, deferredConstraints, deferredToParent, definitionConstraints, dep, depCanonicalType, depConstraints, depDeferredConstraints, finalType, group, groups, name, shouldBeDeferred, type, unresolvedNames, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1, _ref2, _ref3, _ref4, _ref5;
  if (_notEmpty(ctx.deferredBindings())) {
    groups = topologicallySortedGroups(ctx.deferredBindings());
    allDeferredConstraints = newMap();
    deferredToParent = newSet();
    for (_i = 0, _len = groups.length; _i < _len; _i++) {
      group = groups[_i];
      bindings = newMap();
      shouldBeDeferred = false;
      _ref = ctx.deferredBindings();
      for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
        binding = _ref[_j];
        if (!(inSet(group, binding.name))) {
          continue;
        }
        added = lookupOrAdd(bindings, binding.name, {
          types: []
        });
        added.id = binding.id;
        added.scopeIndex = binding.scopeIndex;
        added.types.push(binding.type);
        added.constraints = binding.constraints;
        added.polymorphic = binding.polymorphic;
        added.deps = binding.deps;
        _ref1 = binding.deps;
        for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
          dep = _ref1[_k];
          addedDep = lookupOrAdd(bindings, dep.name, {
            types: []
          });
          if (addedDep.id == null) {
            addedDep.id = dep.id;
          }
          if (addedDep.scopeIndex == null) {
            addedDep.scopeIndex = dep.scopeIndex;
          }
          addedDep.types.push(dep.type);
          if (dep.defining) {
            depDeferredConstraints = lookupInMap(allDeferredConstraints, dep.name);
            added.constraints = join(added.constraints, depDeferredConstraints || []);
          }
        }
      }
      unresolvedNames = newMap();
      _ref2 = values(bindings);
      for (name in _ref2) {
        binding = _ref2[name];
        if (canonicalType = ctx.finalType(binding.id, binding.scopeIndex)) {
          _ref3 = binding.types;
          for (_l = 0, _len3 = _ref3.length; _l < _len3; _l++) {
            type = _ref3[_l];
            unify(ctx, type.type, mapOrigin((freshInstance(ctx, canonicalType)).type, type.type.origin));
          }
        } else {
          if ((ctx.isDeclared(binding.id)) && (!ctx.isCurrentlyDeclared(binding.id)) && !binding.deps || inSet(deferredToParent, name)) {
            shouldBeDeferred = true;
          } else {
            addToMap(unresolvedNames, name, binding);
          }
        }
      }
      _ref4 = values(unresolvedNames);
      for (name in _ref4) {
        binding = _ref4[name];
        canonicalType = toConstrained(ctx.freshTypeVariable(star));
        definitionConstraints = [];
        _ref5 = binding.types;
        for (_m = 0, _len4 = _ref5.length; _m < _len4; _m++) {
          type = _ref5[_m];
          unify(ctx, canonicalType.type, type.type);
        }
        depConstraints = concat((function() {
          var _len5, _n, _ref6, _results;
          _ref6 = binding.deps || [];
          _results = [];
          for (_n = 0, _len5 = _ref6.length; _n < _len5; _n++) {
            dep = _ref6[_n];
            if (!dep.defining && (depCanonicalType = ctx.finalType(dep.id, dep.scopeIndex))) {
              _results.push(constraintsFromCanonicalType(ctx, depCanonicalType, dep.type));
            }
          }
          return _results;
        })());
        allConstraints = join(binding.constraints || [], depConstraints);
        if (shouldBeDeferred) {
          ctx.addToParentDeferred({
            name: name,
            id: binding.id,
            scopeIndex: binding.scopeIndex,
            type: finalType = addConstraints(canonicalType, allConstraints),
            constraints: allConstraints,
            polymorphic: binding.polymorphic,
            deps: binding.deps
          });
          ctx.addToDeferredNames({
            name: name,
            id: binding.id,
            scopeIndex: binding.scopeIndex,
            type: finalType,
            defining: true
          });
          addToSet(deferredToParent, name);
        } else {
          deferredConstraints = inferType(ctx, binding.id, canonicalType, allConstraints, binding.polymorphic, binding.scopeIndex);
          addToMap(allDeferredConstraints, name, deferredConstraints);
          if (binding.scopeIndex === ctx.currentScopeIndex()) {
            ctx.addToScopeConstraints(deferredConstraints || []);
          }
        }
      }
    }
  }
  return ctx.deferredBindings().length = 0;
};

compileDeferred = function(ctx) {
  var compiledPairs, deferred, deferredCount, dependencyName, expression, lhs, prevSize, rhs, useScope, _ref;
  compiledPairs = [];
  if (_notEmpty(ctx.deferred())) {
    deferredCount = 0;
    while ((_notEmpty(ctx.deferred())) && deferredCount < ctx.deferred().length) {
      prevSize = ctx.deferred().length;
      _ref = deferred = ctx.deferred().shift(), expression = _ref[0], dependencyName = _ref[1], useScope = _ref[2], lhs = _ref[3], rhs = _ref[4];
      if (useScope !== ctx.currentScopeIndex() && (ctx.isDeclared(dependencyName)) || (ctx.isTyped(dependencyName))) {
        compiledPairs.push(definitionPairCompile(ctx, lhs, rhs));
        deferredCount = 0;
      } else {
        ctx.addDeferredDefinition(deferred);
        deferredCount++;
      }
    }
  }
  return compiledPairs;
};

deferDeferred = function(ctx) {
  var dependencyName, expression, lhs, rhs, _i, _len, _ref, _ref1, _results;
  if (_notEmpty(ctx.deferred())) {
    _ref = ctx.deferred();
    _results = [];
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      _ref1 = _ref[_i], expression = _ref1[0], dependencyName = _ref1[1], lhs = _ref1[2], rhs = _ref1[3];
      if (ctx.isInTopScope()) {
        _results.push(malformed(ctx, expression, "" + dependencyName + " is not defined"));
      } else if (!ctx.isCurrentlyDeclared(dependencyName)) {
        _results.push(ctx.doDefer(expression, dependencyName));
      } else {
        _results.push(void 0);
      }
    }
    return _results;
  }
};

definitionPairCompile = function(ctx, pattern, value) {
  var compiled, wasDeferred;
  ctx.definePattern(pattern);
  compiled = expressionCompile(ctx, value);
  wasDeferred = ctx.shouldDefer();
  ctx.leaveDefinition();
  if (wasDeferred) {
    return void 0;
  } else {
    return compiled;
  }
};

importAny = function(defaultImports) {
  var name, names;
  return concat((function() {
    var _ref, _results;
    _ref = values(defaultImports);
    _results = [];
    for (name in _ref) {
      names = _ref[name];
      _results.push(imports(name, names));
    }
    return _results;
  })());
};

exportAll = function(ctx, definitions) {
  var exportList, exported, nonVirtual, shouldBeExported;
  shouldBeExported = function(name, declaration) {
    return !declaration.virtual && declaration.final;
  };
  nonVirtual = filterMap(shouldBeExported, ctx._scope());
  exported = subtractSets(nonVirtual, builtInDefinitions());
  exportList = map(validIdentifier, setToArray(exported));
  return iife(concat([toJsString('use strict'), definitions, [jsReturn(jsDictionary(exportList, exportList))]]));
};

ms = {};

ms.fn = ms_fn = function(ctx, call) {
  var args, body, compiledBody, compiledType, compiledWheres, deferredConstraints, defs, docs, documentation, explicitType, name, newParamType, nonLiftedWheres, op, param, paramList, paramNames, paramTypeVars, paramTypes, params, type, wheres, _i, _len, _ref, _ref1;
  args = _arguments(call);
  paramList = args[0], defs = 2 <= args.length ? __slice.call(args, 1) : [];
  params = paramTupleIn(ctx, call, paramList);
  if (defs == null) {
    defs = [];
  }
  if (defs.length === 0) {
    return malformed(ctx, call, 'Missing function result');
  } else {
    _ref = partition(isComment, defs), docs = _ref[0], defs = _ref[1];
    if (isTypeAnnotation(defs[0])) {
      type = defs[0], body = defs[1], wheres = 3 <= defs.length ? __slice.call(defs, 2) : [];
    } else {
      body = defs[0], wheres = 2 <= defs.length ? __slice.call(defs, 1) : [];
    }
    paramNames = _names(params);
    if (name = ctx.isAtSimpleDefinition()) {
      if (type) {
        compiledType = typeConstrainedCompile(ctx, type);
        explicitType = preDeclareExplicitlyTyped(ctx, compiledType, docs);
        ctx.assignArity(name, paramNames);
      } else {
        documentation = extractDocs(docs);
        if (!ctx.isFinallyCurrentlyDeclared(name)) {
          ctx.preDeclare(name, {
            arity: paramNames,
            id: ctx.definitionId(),
            type: ctx.preDeclaredType(name),
            docs: documentation
          });
        }
      }
    }
    ctx.newLateScope();
    newParamType = function(param) {
      param.scope = ctx.currentScopeIndex();
      return withOrigin(ctx.freshTypeVariable(star), param);
    };
    paramTypeVars = map(newParamType, params);
    paramTypes = map(__(toForAll, toConstrained), paramTypeVars);
    ctx.bindTypeVariables(paramTypeVars);
    ctx.declareTyped(paramNames, paramTypes);
    for (_i = 0, _len = params.length; _i < _len; _i++) {
      param = params[_i];
      param.id = ctx.currentDeclarationId(_symbol(param));
    }
    preDeclarePatterns(ctx, _fst(unzip(pairs(wheres))));
    compiledWheres = definitionListCompile(ctx, pairs(wheres));
    ctx.setAuxiliaryDefinitions(compiledWheres);
    if (body) {
      compiledBody = termCompile(ctx, body);
    }
    nonLiftedWheres = concat(findDefinitionsIncludingDeps(ctx, ctx.usedNames()));
    ctx.setUsedNames([]);
    deferredConstraints = ctx.currentScopeConstraints();
    ctx.closeScope();
    labelUsedParams(join(docs, (body ? join([body], wheres) : wheres)), paramNames);
    return polymorphicAssignCompile(ctx, call, ctx.shouldDefer() ? deferredExpression() : (op = _operator(call), call.tea = op.tea = body && body.tea ? new Constrained(join(body.tea.constraints, deferredConstraints), mapOriginOnFunction(typeFn.apply(null, __slice.call(paramTypeVars).concat([(_ref1 = body.tea) != null ? _ref1.type : void 0])), call)) : explicitType ? copyOrigin(freshInstance(ctx, explicitType), compiledType) : void 0, irFunction({
      name: name,
      params: paramNames,
      body: join(nonLiftedWheres, [jsReturn(compiledBody)])
    })));
  }
};

labelUsedParams = function(ast, paramNames) {
  var isUsedParam, labelParams;
  isUsedParam = function(expression) {
    var _ref;
    return (isName(expression)) && expression.label !== 'name' && (_ref = _symbol(expression), __indexOf.call(paramNames, _ref) >= 0);
  };
  labelParams = function(expression) {
    return map((function(token) {
      return token.label = 'param';
    }), filterAst(isUsedParam, expression));
  };
  return map(labelParams, ast);
};

preDeclareExplicitlyTyped = function(ctx, type, docs) {
  var explicitType, id, name;
  explicitType = quantifyUnbound(ctx, type);
  copyOrigin(explicitType.type, type);
  name = ctx.definitionName();
  id = ctx.definitionId();
  if (ctx.isPreTyped(name)) {
    explicitType = ctx.preDeclaredType(name);
  }
  if (ctx.isFinallyCurrentlyDeclared(name)) {
    malformed(ctx, ctx.definitionPattern(), 'This name is already taken');
  } else {
    ctx.preDeclare(name, {
      id: id,
      type: explicitType,
      docs: extractDocs(docs)
    });
  }
  return explicitType;
};

preDeclarePatterns = function(ctx, patterns) {
  var compiled, pattern, _i, _len, _results;
  _results = [];
  for (_i = 0, _len = patterns.length; _i < _len; _i++) {
    pattern = patterns[_i];
    ctx.definePattern(pattern);
    ctx.doDefer(void 0, void 0);
    ctx.setAssignTo(true);
    compiled = patternCompile(ctx, pattern);
    ctx.resetAssignTo();
    _results.push(ctx.leaveDefinition());
  }
  return _results;
};

extractDocs = function(docs) {
  var content, cutIndent, firstIndent, nonWs, _ref;
  map(labelComments, docs);
  docs = docs[0];
  cutIndent = function(length) {
    return function(node) {
      if (node.label === 'indent') {
        return {
          symbol: node.symbol.slice(length)
        };
      } else {
        return node;
      }
    };
  };
  if (docs && isComment(docs)) {
    nonWs = 3;
    while ((_ref = docs[nonWs].symbol) != null ? _ref.match(/\s+/) : void 0) {
      nonWs++;
    }
    firstIndent = _fst(filter((function(_arg) {
      var label;
      label = _arg.label;
      return label === 'indent';
    }), docs));
    content = docs.slice(nonWs, docs.length - 1);
    return print((firstIndent ? crawl(content, cutIndent(firstIndent.symbol.length)) : content));
  }
};

ms.type = ms_type = function(ctx, call) {
  var alias, hasName, type;
  hasName = requireName(ctx, 'Name required to declare new type alias');
  alias = ctx.definitionName();
  if (!(isCapital({
    symbol: alias
  }))) {
    malformed(ctx, ctx.definitionPattern(), 'Type aliases must start with a capital letter');
  }
  type = _arguments(call)[0];
  ctx.addTypeAlias(alias, typeCompile(ctx, type));
  return jsNoop();
};

ms.data = ms_data = function(ctx, call) {
  var accessors, args, constr, constrFunction, constrType, constrValue, dataName, dataType, defs, fieldTypes, hasName, i, identifier, label, names, paramLabels, paramLabelsIn, paramNames, paramTypes, params, typeArgLists, typeParamTuple, typeParams, _i, _j, _len, _len1, _ref, _ref1, _ref2, _ref3;
  hasName = requireName(ctx, 'Name required to declare new algebraic data');
  args = _validArguments(call);
  if (isTuple(args[0])) {
    _ref = args, typeParamTuple = _ref[0], args = 2 <= _ref.length ? __slice.call(_ref, 1) : [];
    typeParams = paramTupleIn(ctx, call, typeParamTuple);
  }
  if (typeParams == null) {
    typeParams = [];
  }
  defs = pairsLeft(isAtom, args);
  _ref1 = unzip(defs), names = _ref1[0], typeArgLists = _ref1[1];
  map(syntaxNewName(ctx, 'Type constructor name required'), names);
  if (!hasName) {
    return jsNoop();
  }
  dataName = ctx.definitionName();
  paramLabelsIn = function(params) {
    if (params == null) {
      params = [];
    }
    return map(_labelName, filter(_is, map(_fst, _labeled(_validTerms(params)))));
  };
  _ref2 = findDataType(ctx, typeArgLists, typeParams, dataName), fieldTypes = _ref2.fieldTypes, dataType = _ref2.dataType;
  for (i = _i = 0, _len = defs.length; _i < _len; i = ++_i) {
    _ref3 = defs[i], constr = _ref3[0], params = _ref3[1];
    paramTypes = fieldTypes[i];
    constrType = params ? typeFn.apply(null, join(paramTypes, [dataType])) : dataType;
    paramLabels = paramLabelsIn(params);
    ctx.declare(constr.symbol, {
      type: quantifyUnbound(ctx, toConstrained(constrType)),
      arity: (params ? paramLabels : void 0)
    });
    constr.tea = constrType;
    for (i = _j = 0, _len1 = paramLabels.length; _j < _len1; i = ++_j) {
      label = paramLabels[i];
      ctx.declare("" + constr.symbol + "-" + label, {
        arity: ["" + (constr.symbol[0].toLowerCase()) + constr.symbol.slice(1)],
        type: quantifyUnbound(ctx, toConstrained(typeFn(dataType, paramTypes[i])))
      });
    }
  }
  ctx.addTypeName(dataType);
  return concat((function() {
    var _k, _len2, _ref4, _results;
    _results = [];
    for (_k = 0, _len2 = defs.length; _k < _len2; _k++) {
      _ref4 = defs[_k], constr = _ref4[0], params = _ref4[1];
      identifier = validIdentifier(constr.symbol);
      paramLabels = paramLabelsIn(params);
      paramNames = paramLabels.map(validIdentifier);
      constrValue = jsAssignStatement("" + identifier + "._value", params ? jsCall("λ" + paramNames.length, [
        jsFunction({
          params: paramNames,
          body: [jsReturn(jsNew(identifier, paramNames))]
        })
      ]) : jsNew(identifier, []));
      constrFunction = dictConstructorFunction(constr.symbol, paramNames);
      accessors = dictAccessors(constr.symbol, identifier, paramNames, defs.length);
      _results.push(concat([constrFunction, accessors, [constrValue]]));
    }
    return _results;
  })());
};

findDataType = function(ctx, typeArgLists, typeParams, dataName) {
  var dataKind, fieldTypes, foundKind, freshingSub, kind, kinds, name, type, typeArgs, typeExpression, typeParam, typeVars, varNameSet, varNames, _i, _len;
  varNames = map(_symbol, typeParams);
  varNameSet = arrayToSet(varNames);
  kinds = newMap();
  ctx.addTypeName(new TypeConstr(dataName, new TempKind));
  fieldTypes = (function() {
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = typeArgLists.length; _i < _len; _i++) {
      typeArgs = typeArgLists[_i];
      if (typeArgs) {
        if (isRecord(typeArgs)) {
          _results.push((function() {
            var _j, _len1, _ref, _ref1, _results1;
            _ref = _snd(unzip(_labeled(_validTerms(typeArgs))));
            _results1 = [];
            for (_j = 0, _len1 = _ref.length; _j < _len1; _j++) {
              typeExpression = _ref[_j];
              if (!(typeExpression)) {
                continue;
              }
              type = typeCompile(ctx, typeExpression);
              _ref1 = values(findFree(type));
              for (name in _ref1) {
                kind = _ref1[name];
                if (!inSet(varNameSet, name)) {
                  malformed(ctx, typeExpression, "Type variable " + name + " not declared");
                } else {
                  if (foundKind = lookupInMap(kinds, name)) {
                    if (!kindsEq(foundKind, kind)) {
                      malformed(ctx, typeExpression, "Type variable " + name + " must have the same kind");
                    }
                  } else {
                    addToMap(kinds, name, kind);
                  }
                }
              }
              _results1.push(type);
            }
            return _results1;
          })());
        } else {
          malformed(ctx, typeArgs, 'Required a record of types');
          _results.push([]);
        }
      } else {
        _results.push([]);
      }
    }
    return _results;
  })();
  for (_i = 0, _len = typeParams.length; _i < _len; _i++) {
    typeParam = typeParams[_i];
    if (!lookupInMap(kinds, _symbol(typeParam))) {
      malformed(ctx, typeParam, 'Data type parameter not used');
    }
  }
  freshingSub = mapMap((function(kind) {
    return ctx.freshTypeVariable(kind);
  }), kinds);
  dataKind = kindFnOfArgs.apply(null, map((function(name) {
    return lookupInMap(kinds, name);
  }), varNames));
  typeVars = map((function(name) {
    return new TypeVariable(name, lookupInMap(kinds, name));
  }), varNames);
  return {
    dataType: substitute(freshingSub, applyKindFn.apply(null, [new TypeConstr(dataName, dataKind)].concat(__slice.call(typeVars)))),
    fieldTypes: map((function(types) {
      return substituteList(freshingSub, types);
    }), fieldTypes)
  };
};

ms.record = ms_record = function(ctx, call) {
  var args, hasName, name, type, typeParamTuple, _i, _len, _ref, _ref1, _ref2;
  args = _validArguments(call);
  hasName = requireName(ctx, 'Name required to declare new record');
  if (isTuple(args[0])) {
    _ref = args, typeParamTuple = _ref[0], args = 2 <= _ref.length ? __slice.call(_ref, 1) : [];
  } else {
    typeParamTuple = tuple_([]);
  }
  _ref1 = _labeled(args);
  for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
    _ref2 = _ref1[_i], name = _ref2[0], type = _ref2[1];
    if (!name) {
      malformed(ctx, type, 'Label is required');
    }
    if (!type) {
      malformed(ctx, name, 'Missing type');
    }
  }
  if (args.length === 0) {
    malformed(ctx, call, 'Missing field declarations');
  }
  if (!hasName) {
    return 'malformed';
  }
  return replicate(call, call_(token_('data'), [typeParamTuple, token_(ctx.definitionName()), tuple_(args)]));
};

ms[':'] = ms_typed = function(ctx, call) {
  var compiledType, constraintSeq, constraints, defs, docs, hasName, rest, type, _ref;
  hasName = requireName(ctx, 'Name required to declare typed values for now');
  _ref = partition(isComment, _arguments(call)), docs = _ref[0], defs = _ref[1];
  type = defs[0], constraintSeq = defs[1], rest = 3 <= defs.length ? __slice.call(defs, 2) : [];
  compiledType = isSeq(constraintSeq) ? (constraints = typeConstraintsCompile(ctx, _terms(constraintSeq)), type ? new Constrained(constraints, typeCompile(ctx, type)) : void 0) : typeConstrainedCompile(ctx, filter(__(_not, isComment), call));
  if (hasName) {
    preDeclareExplicitlyTyped(ctx, compiledType, docs);
  }
  return jsNoop();
};

ms['::'] = ms_typed_expression = function(ctx, call) {
  var compiledType, constraintSeq, constraints, defs, docs, expression, type, _ref;
  _ref = partition(isComment, _arguments(call)), docs = _ref[0], defs = _ref[1];
  type = defs[0], constraintSeq = defs[1], expression = defs[2];
  if (isSeq(constraintSeq)) {
    constraints = typeConstraintsCompile(ctx, _terms(constraintSeq));
  } else {
    constraints = [];
    expression = constraintSeq;
  }
  compiledType = new Constrained(constraints, typeCompile(ctx, type));
  if (ctx.isAtSimpleDefinition()) {
    preDeclareExplicitlyTyped(ctx, compiledType, docs);
  }
  call.tea = compiledType;
  return assignCompile(ctx, call, termCompile(ctx, expression));
};

ms.global = ms_global = function(ctx, call) {
  call.tea = toConstrained(markOrigin(jsType, call));
  return assignCompile(ctx, call, jsValue("global"));
};

callJsMethodCompile = function(ctx, call) {
  var args, compiled, constraints, dotMethod, object, _ref;
  _ref = _validTerms(call), dotMethod = _ref[0], object = _ref[1], args = 3 <= _ref.length ? __slice.call(_ref, 2) : [];
  labelOperator(dotMethod);
  compiled = object ? /^.-/.test(dotMethod.symbol) ? jsAccess(termCompile(ctx, object), dotMethod.symbol.slice(2)) : jsMethod(termCompile(ctx, object), dotMethod.symbol.slice(1), termsCompile(ctx, args)) : (malformed(ctx, call, 'Missing an object'), jsNoop());
  constraints = object ? concatMap(__(_constraints, _tea), join([object], args)) : [];
  call.tea = new Constrained(constraints, markOrigin(jsType, call));
  return assignCompile(ctx, call, compiled);
};

ms['set!'] = ms_doset = function(ctx, call) {
  var to, toCompiled, what, whatCompiled, _ref;
  _ref = _arguments(call), what = _ref[0], to = _ref[1];
  if (what) {
    whatCompiled = termCompile(ctx, what);
  }
  if (to) {
    toCompiled = termCompile(ctx, to);
  }
  call.tea = toConstrained(markOrigin(jsType, call));
  if (whatCompiled && toCompiled) {
    return jsAssign(whatCompiled, toCompiled);
  } else {
    return jsNoop();
  }
};

ms["class"] = ms_class = function(ctx, call) {
  var classConstraint, constraintSeq, constraints, declarations, def, defs, docs, freshedDeclarations, hasName, methodDefinitions, name, paramList, paramNames, params, superClassNames, superClasses, wheres, _i, _len, _ref, _ref1, _ref2, _ref3, _ref4;
  hasName = requireName(ctx, 'Name required to declare a new class');
  _ref = _validArguments(call), paramList = _ref[0], defs = 2 <= _ref.length ? __slice.call(_ref, 1) : [];
  params = paramTupleIn(ctx, call, paramList);
  paramNames = _names(params);
  _ref1 = partition(isComment, defs), docs = _ref1[0], defs = _ref1[1];
  constraintSeq = defs[0], wheres = 2 <= defs.length ? __slice.call(defs, 1) : [];
  if (!isSeq(constraintSeq)) {
    wheres = defs;
    constraints = [];
  } else {
    constraints = typeConstraintsCompile(ctx, _terms(constraintSeq));
  }
  superClasses = map(quantifyConstraintFor(paramNames), constraints);
  superClassNames = map((function(_arg) {
    var className;
    className = _arg.className;
    return className;
  }), constraints);
  methodDefinitions = pairs(wheres);
  ctx.newScope();
  ctx.bindTypeVariableNames(paramNames);
  definitionList(ctx, methodDefinitions);
  declarations = ctx.currentDeclarations();
  ctx.closeScope();
  for (_i = 0, _len = methodDefinitions.length; _i < _len; _i++) {
    _ref2 = methodDefinitions[_i], name = _ref2[0], def = _ref2[1];
    if ((_ref3 = lookupInMap(declarations, name.symbol)) != null) {
      _ref3.def = def;
    }
  }
  if (hasName) {
    name = ctx.definitionName();
    if (ctx.isClassDefined(name)) {
      return malformed(ctx, 'class already defined', ctx.definitionPattern());
    } else {
      _ref4 = findClassType(ctx, params, name, paramNames, declarations, constraints), classConstraint = _ref4.classConstraint, freshedDeclarations = _ref4.freshedDeclarations;
      if (classConstraint) {
        ctx.addClass(name, classConstraint, superClasses, freshedDeclarations);
        declareMethods(ctx, classConstraint, freshedDeclarations);
        ctx.declare(name, {
          isClass: true
        });
        return dictConstructorFunction(name, keysOfMap(freshedDeclarations), superClassNames);
      } else {
        return jsNoop();
      }
    }
  } else {
    return jsNoop();
  }
};

quantifyConstraintFor = function(names) {
  return function(constraint) {
    var index, type;
    return new ClassConstraint(constraint.className, new Types((function() {
      var _i, _len, _ref, _results;
      _ref = constraint.types.types;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        type = _ref[_i];
        if (type.TypeVariable) {
          index = names.indexOf(type.name);
          _results.push(new QuantifiedVar(index));
        } else {
          _results.push(type);
        }
      }
      return _results;
    })()));
  };
};

findClassType = function(ctx, params, className, paramNames, methods, constraints) {
  var classParam, def, foundKind, freshingSub, kindSoFar, kinds, method, param, type, types, vars, _i, _j, _len, _len1, _ref;
  kinds = mapMap((function() {
    return void 0;
  }), arrayToSet(paramNames));
  types = join(map((function(c) {
    return {
      type: c
    };
  }), constraints), map((function(_arg) {
    var def, type;
    type = _arg.type, def = _arg.def;
    return {
      type: type.type,
      def: def
    };
  }), mapToArray(methods)));
  for (_i = 0, _len = types.length; _i < _len; _i++) {
    _ref = types[_i], type = _ref.type, def = _ref.def;
    vars = findFree(type);
    for (_j = 0, _len1 = paramNames.length; _j < _len1; _j++) {
      param = paramNames[_j];
      kindSoFar = lookupInMap(kinds, param);
      foundKind = lookupInMap(vars, param);
      if (kindSoFar && foundKind && !kindsEq(foundKind, kindSoFar)) {
        malformed(ctx, def, 'All methods must use the class paramater of the same kind');
      }
      if (foundKind) {
        replaceInMap(kinds, param, foundKind);
      }
    }
  }
  if (!all((function() {
    var _k, _len2, _results;
    _results = [];
    for (_k = 0, _len2 = params.length; _k < _len2; _k++) {
      param = params[_k];
      if (!(!lookupInMap(kinds, _symbol(param)))) {
        continue;
      }
      malformed(ctx, param, 'A class paramater must occur in at least one method\'s type');
      _results.push(false);
    }
    return _results;
  })())) {
    return {};
  }
  freshingSub = mapMap((function(kind) {
    return ctx.freshTypeVariable(kind);
  }), kinds);
  classParam = function(param) {
    return substitute(freshingSub, new TypeVariable(param, lookupInMap(kinds, param)));
  };
  method = function(_arg) {
    var arity, def, docs, type;
    arity = _arg.arity, type = _arg.type, docs = _arg.docs, def = _arg.def;
    return {
      arity: arity,
      docs: docs,
      def: def,
      type: substitute(freshingSub, type)
    };
  };
  return {
    classConstraint: new ClassConstraint(className, new Types(map(classParam, paramNames))),
    freshedDeclarations: mapMap(method, methods)
  };
};

declareMethods = function(ctx, classConstraint, methodDeclarations) {
  var arity, docs, name, type, _ref, _ref1;
  _ref = values(methodDeclarations);
  for (name in _ref) {
    _ref1 = _ref[name], arity = _ref1.arity, docs = _ref1.docs, type = _ref1.type;
    type = quantifyUnbound(ctx, addConstraints(freshInstance(ctx, type), [classConstraint]));
    ctx.declare(name, {
      arity: arity,
      docs: docs,
      type: type,
      virtual: true
    });
  }
};

ms.instance = ms_instance = function(ctx, call) {
  var classDefinition, className, constraintSeq, constraints, definitions, defs, freshConstraints, freshInstanceType, hasName, instance, instanceConstraint, instanceName, instanceType, lhs, methodTypes, methods, methodsDeclarations, rhs, superClassInstances, wheres, _ref;
  hasName = requireName(ctx, 'Name required to declare a new instance');
  _ref = _validArguments(call), instanceConstraint = _ref[0], defs = 2 <= _ref.length ? __slice.call(_ref, 1) : [];
  if (!instanceConstraint || !isValidTypeConstraint(ctx, instanceConstraint)) {
    return malformed(ctx, call, 'Requiring the instance type');
  } else {
    instanceType = typeConstraintCompile(ctx, instanceConstraint);
  }
  constraintSeq = defs[0], wheres = 2 <= defs.length ? __slice.call(defs, 1) : [];
  if (!isSeq(constraintSeq)) {
    wheres = defs;
    constraints = [];
  } else {
    constraints = typeConstraintsCompile(ctx, _terms(constraintSeq));
  }
  className = instanceType.className;
  classDefinition = ctx.classNamed(className);
  if (!classDefinition) {
    return malformed(ctx, _operator(instanceConstraint), 'Class doesn\'t exist');
  }
  superClassInstances = findSuperClassInstances(ctx, instanceType.types, classDefinition);
  if (!hasName) {
    return malformed(ctx, call, "An instance requires a name");
  }
  instanceName = ctx.definitionName();
  freshInstanceType = freshInstance(ctx, quantifyUnbound(ctx, new Constrained(constraints, instanceType.types)));
  if (!freshInstanceType) {
    return jsNoop();
  } else {
    freshConstraints = freshInstanceType.constraints;
    instance = quantifyAll(new Constrained(freshConstraints, new ClassConstraint(instanceType.className, freshInstanceType.type)));
    ctx.addInstance(instanceName, instance);
    ctx.newScope();
    assignMethodTypes(ctx, instanceConstraint, freshInstanceType, instanceName, classDefinition);
    definitions = pairs(wheres);
    methodsDeclarations = definitionList(ctx, prefixWithInstanceName(ctx, definitions, instanceName));
    ctx.closeScope();
    if (ctx.shouldDefer()) {
      return deferCurrentDefinition(ctx, call);
    }
    methods = map((function(_arg) {
      var rhs;
      rhs = _arg.rhs;
      return rhs;
    }), methodsDeclarations);
    methodTypes = (function() {
      var _i, _len, _ref1, _results;
      _results = [];
      for (_i = 0, _len = definitions.length; _i < _len; _i++) {
        _ref1 = definitions[_i], lhs = _ref1[0], rhs = _ref1[1];
        _results.push(rhs != null ? rhs.tea : void 0);
      }
      return _results;
    })();
    if (!all(methodTypes)) {
      malformed(ctx, call, "missing type of a method");
      return jsNoop();
    }
    ctx.declare(instanceName, {
      virtual: false
    });
    return jsVarDeclaration(validIdentifier(instanceName), irDefinition(new Constrained(freshConstraints, (tupleOfTypes(methodTypes)).type), jsNew(validIdentifier(className), join(superClassInstances, methods))));
  }
};

assignMethodTypes = function(ctx, typeExpression, freshInstanceType, instanceName, classDeclaration) {
  var arity, check, classParams, freshType, freshedClassType, freshingSub, instanceSpecificType, name, prefixedName, quantifiedType, type, _ref, _ref1;
  classParams = findFree(classDeclaration.constraint);
  freshingSub = mapMap((function(kind) {
    return ctx.freshTypeVariable(kind);
  }), classParams);
  freshedClassType = mapOrigin(substitute(freshingSub, classDeclaration.constraint.types), _operator(typeExpression));
  if (isFailed((check = mostGeneralUnifier(freshedClassType, freshInstanceType.type)))) {
    ctx.extendSubstitution(check);
    return null;
  }
  ctx.bindTypeVariableNames(setToArray(findFree(freshInstanceType)));
  _ref = values(classDeclaration.declarations);
  for (name in _ref) {
    _ref1 = _ref[name], arity = _ref1.arity, type = _ref1.type;
    freshType = freshInstance(ctx, type);
    instanceSpecificType = substitute(freshingSub, freshType);
    quantifiedType = quantifyUnbound(ctx, addConstraints(instanceSpecificType, freshInstanceType.constraints));
    prefixedName = instancePrefix(instanceName, name);
    ctx.preDeclare(prefixedName, {
      arity: arity,
      type: quantifiedType
    });
  }
  return freshInstanceType;
};

prefixWithInstanceName = function(ctx, definitionPairs, instanceName) {
  var lhs, prefixedName, rhs, _i, _len, _ref, _results;
  _results = [];
  for (_i = 0, _len = definitionPairs.length; _i < _len; _i++) {
    _ref = definitionPairs[_i], lhs = _ref[0], rhs = _ref[1];
    if ((syntaxNewName(ctx, 'Method name required', lhs)) === true) {
      prefixedName = instancePrefix(instanceName, lhs.symbol);
      lhs.tea = ctx.type(prefixedName);
      _results.push([token_(prefixedName), rhs]);
    } else {
      _results.push([lhs, rhs]);
    }
  }
  return _results;
};

instancePrefix = function(instanceName, methodName) {
  return "" + instanceName + "_" + methodName;
};

findSuperClassInstances = function(ctx, instanceTypes, classDefinition) {
  var constraint, superConstraints, _i, _len, _results;
  superConstraints = substituteList(instanceTypes.types, classDefinition.supers);
  _results = [];
  for (_i = 0, _len = superConstraints.length; _i < _len; _i++) {
    constraint = superConstraints[_i];
    _results.push(instanceDictFor(ctx, constraint));
  }
  return _results;
};

ms.match = ms_match = function(ctx, call) {
  var assigns, branchUsedNames, cases, compiledCases, compiledResult, compiledResults, conds, constraints, errorMessage, i, jointlyUsed, lifted, lifting, oldUsed, pattern, precs, result, resultType, subject, subjectCompiled, translationCache, used, usedNameLists, varNames, _ref, _ref1;
  if (ctx.assignTo()) {
    return malformed(ctx, call, 'not a valid pattern');
  }
  _ref = _arguments(call), subject = _ref[0], cases = 2 <= _ref.length ? __slice.call(_ref, 1) : [];
  if (!subject) {
    return malformed(ctx, call, 'match `subject` missing');
  }
  if (cases.length % 2 !== 0) {
    malformed(ctx, call, 'match missing result for last pattern');
  }
  subjectCompiled = termCompile(ctx, subject);
  resultType = ctx.freshTypeVariable(star);
  ctx.setAssignTo(subjectCompiled);
  ctx.cacheAssignTo();
  varNames = [];
  constraints = map(id, ((_ref1 = subject.tea) != null ? _ref1.constraints : void 0) || []);
  errorMessage = ctx.definitionName() != null ? " in " + (ctx.definitionName()) : "";
  oldUsed = ctx.usedNames();
  compiledResults = (function() {
    var _i, _len, _ref2, _ref3, _ref4, _results;
    _ref2 = pairs(cases);
    _results = [];
    for (_i = 0, _len = _ref2.length; _i < _len; _i++) {
      _ref3 = _ref2[_i], pattern = _ref3[0], result = _ref3[1];
      ctx.setUsedNames([]);
      ctx.newScope();
      ctx.defineNonDeferrablePattern(pattern);
      _ref4 = patternCompile(ctx, pattern, subject, false), precs = _ref4.precs, assigns = _ref4.assigns;
      if (result) {
        ctx.setAssignTo(void 0);
        compiledResult = termCompile(ctx, result);
        ctx.resetAssignTo();
      }
      ctx.leaveDefinition();
      ctx.closeScope();
      branchUsedNames = ctx.usedNames();
      if (ctx.shouldDefer()) {
        continue;
      }
      if (result) {
        unify(ctx, resultType, result.tea.type);
        constraints.push.apply(constraints, result.tea.constraints);
        varNames.push.apply(varNames, findDeclarables(precs));
      }
      _results.push([branchUsedNames, precs, assigns, compiledResult]);
    }
    return _results;
  })();
  usedNameLists = unzip(compiledResults)[0];
  lifting = map(findDeps(ctx), usedNameLists);
  jointlyUsed = addSiblingDefines(ctx, intersectSets(lifting));
  compiledCases = conditional((function() {
    var _i, _len, _ref2, _ref3, _results;
    _results = [];
    for (i = _i = 0, _len = compiledResults.length; _i < _len; i = ++_i) {
      _ref2 = compiledResults[i], used = _ref2[0], precs = _ref2[1], assigns = _ref2[2], compiledResult = _ref2[3];
      if (!(compiledResult)) {
        continue;
      }
      lifted = lifting[i];
      _ref3 = matchBranchTranslate(precs, assigns, compiledResult), conds = _ref3[0], assigns = _ref3[1];
      _results.push([conds, join(findDefinitions(ctx, setToArray(subtractSets(lifted, jointlyUsed))), assigns)]);
    }
    return _results;
  })(), "throw new Error(" + (toMultilineJsString("match failed to match " + (print(subject)) + errorMessage)) + ");");
  ctx.setUsedNames(join(oldUsed, setToArray(jointlyUsed)));
  translationCache = ctx.resetAssignTo();
  call.tea = new Constrained(constraints, resultType);
  return assignCompile(ctx, call, iife(concat(filter(_is, [map(compileVariableAssignment, translationCache), varList(varNames), compiledCases]))));
};

matchBranchTranslate = function(precs, assigns, compiledResult) {
  var conds, preassigns, _ref;
  _ref = constructCond(precs), conds = _ref.conds, preassigns = _ref.preassigns;
  return [conds, concat([map(compileVariableAssignment, join(preassigns, assigns)), [jsReturn(compiledResult)]])];
};

varList = function(varNames) {
  if (varNames.length > 0) {
    return jsVarDeclarations(varNames);
  } else {
    return null;
  }
};

conditional = function(condCasePairs, elseCase) {
  var branch, cond, _ref;
  if (condCasePairs.length === 1) {
    _ref = condCasePairs[0], cond = _ref[0], branch = _ref[1];
    if (cond === 'true') {
      return branch;
    }
  }
  return jsConditional(condCasePairs, elseCase);
};

ms.req = ms_req = function(ctx, call) {
  var arg, moduleName, moduleNameAtom, name, reqTuple, reqs, requiredNames, _i, _len;
  reqTuple = ctx.definitionPattern();
  reqs = _validTerms(reqTuple);
  if ((!isTuple(reqTuple)) || _empty(reqs)) {
    return malformed(ctx, reqTuple, 'req requires a tuple of names to be required');
  }
  map(syntaxNewName(ctx, 'definition name to be imported required'), reqs);
  moduleNameAtom = _validArguments(call)[0];
  if (!moduleNameAtom || !isName(moduleNameAtom)) {
    return malformed(ctx, call, 'req requires a module name to require from');
  }
  moduleNameAtom.label = 'module';
  moduleName = moduleNameAtom.symbol;
  requiredNames = arrayToSet(filter(_is, map(_symbol, reqs)));
  ctx.req(moduleName, requiredNames);
  if (ctx.isModuleLoaded(moduleName)) {
    for (_i = 0, _len = reqs.length; _i < _len; _i++) {
      arg = reqs[_i];
      if (isName(arg)) {
        name = arg.symbol;
        if (ctx.isFinallyTyped(name, ctx.currentScopeIndex())) {
          malformed(ctx, arg, "" + name + " already declared");
        } else if (!ctx.isCurrentlyDeclared(arg.symbol)) {
          malformed(ctx, arg, "" + name + " was not declared in " + moduleName);
        } else {
          arg.id = ctx.currentDeclarationId(name);
          arg.imported = {
            module: moduleName,
            name: name
          };
          declareImported(ctx, name);
        }
      } else {
        malformed(ctx, arg, 'Name required');
      }
    }
  }
  return imports(moduleName, setToArray(requiredNames));
};

declareImportedByDefault = function(ctx, modules) {
  var moduleName, name, names, _ref, _results;
  _ref = values(modules);
  _results = [];
  for (moduleName in _ref) {
    names = _ref[moduleName];
    if (ctx.isModuleLoaded(moduleName)) {
      _results.push((function() {
        var _i, _len, _results1;
        _results1 = [];
        for (_i = 0, _len = names.length; _i < _len; _i++) {
          name = names[_i];
          _results1.push(declareImported(ctx, name));
        }
        return _results1;
      })());
    } else {
      _results.push(void 0);
    }
  }
  return _results;
};

declareImported = function(ctx, name) {
  ctx.assignType(name, ctx.tempType(name));
  return ctx.declareAsFinal(name, ctx.currentScopeIndex());
};

imports = function(moduleName, names) {
  var name, validModuleName, validName, _i, _len, _results;
  validModuleName = validIdentifier(moduleName);
  _results = [];
  for (_i = 0, _len = names.length; _i < _len; _i++) {
    name = names[_i];
    validName = validIdentifier(name);
    _results.push(jsVarDeclaration(validName, jsAccess(jsAccess("Shem", validModuleName), validName)));
  }
  return _results;
};

ms.format = ms_format = function(ctx, call) {
  var args, compiled, compiledArgs, formatString, formatStringToken, formattedArgs, i, match, matched, name, prefix, symbol, type, typeTable, types, _ref;
  typeTable = {
    n: numType,
    i: numType,
    s: stringType,
    c: charType
  };
  _ref = _arguments(call), formatStringToken = _ref[0], args = 2 <= _ref.length ? __slice.call(_ref, 1) : [];
  if (!formatStringToken) {
    return malformed(ctx, call, 'Format string required.');
  }
  compiledArgs = termsCompile(ctx, args);
  if (ctx.shouldDefer()) {
    return jsNoop();
  }
  if (!all(map(_tea, args))) {
    call.tea = toConstrained(stringType);
    return malformed(ctx, call, "Argument not typed");
  }
  call.tea = new Constrained(concatMap(__(_constraints, _tea), args), markOrigin(stringType, call));
  types = [];
  formatString = _stringValue(formatStringToken);
  for (name in typeTable) {
    type = typeTable[name];
    markOrigin(type, formatStringToken);
  }
  while (formatString.length > 0) {
    match = formatString.match(/^(.*?(?:^|[^\\]|\\\\))\%(.)/);
    if (!match) {
      break;
    }
    matched = match[0], prefix = match[1], symbol = match[2];
    if (symbol in typeTable) {
      types.push({
        type: typeTable[symbol],
        symbol: symbol,
        prefix: prefix
      });
    } else {
      malformed(ctx, formatString, "Found an unsupported control character " + symbol);
    }
    formatString = formatString.slice(matched.length);
  }
  if (args.length > types.length) {
    malformed(ctx, call, "Too many arguments to format");
  }
  formattedArgs = (function() {
    var _i, _len, _ref1, _results;
    _results = [];
    for (i = _i = 0, _len = types.length; _i < _len; i = ++_i) {
      _ref1 = types[i], type = _ref1.type, symbol = _ref1.symbol, prefix = _ref1.prefix;
      if (!args[i]) {
        continue;
      }
      compiled = compiledArgs[i];
      unify(ctx, type, args[i].tea.type);
      _results.push([
        string_(prefix), (function() {
          switch (symbol) {
            case 's':
              return compiled;
            case 'c':
              return compiled;
            case 'n':
              return compiled;
            case 'i':
              return jsUnary("~", jsUnary("~", compiled));
          }
        })()
      ]);
    }
    return _results;
  })();
  return assignCompile(ctx, call, jsBinaryMulti("+", join(concat(formattedArgs), [string_(formatString)])));
};

ms.cond = ms_cond = function(ctx, call) {
  var args, branches, compiled, compiledResults, conds, doneConds, doneResults, errorMessage, i, jointlyUsed, lifted, lifting, oldUsed, res, result, results, someResults, used, usedNames, _ref;
  args = _arguments(call);
  _ref = unzip(pairs(args)), conds = _ref[0], someResults = _ref[1];
  results = filter(_is, someResults);
  doneConds = termsCompileExpectingType(ctx, markOrigin(boolType, call), conds);
  oldUsed = ctx.usedNames();
  compiledResults = (function() {
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = results.length; _i < _len; _i++) {
      result = results[_i];
      ctx.setUsedNames([]);
      compiled = termCompile(ctx, result);
      _results.push([ctx.usedNames(), compiled]);
    }
    return _results;
  })();
  doneResults = unifyTypesOfTerms(ctx, results);
  usedNames = unzip(compiledResults)[0];
  lifting = map(findDeps(ctx), usedNames);
  jointlyUsed = intersectSets(lifting);
  branches = (function() {
    var _i, _len, _ref1, _results;
    _results = [];
    for (i = _i = 0, _len = compiledResults.length; _i < _len; i = ++_i) {
      _ref1 = compiledResults[i], used = _ref1[0], res = _ref1[1];
      lifted = lifting[i];
      _results.push(join(findDefinitions(ctx, setToArray(subtractSets(lifted, jointlyUsed))), [jsReturn(res)]));
    }
    return _results;
  })();
  ctx.setUsedNames(join(oldUsed, setToArray(jointlyUsed)));
  errorMessage = ctx.definitionName() != null ? " in " + (ctx.definitionName()) : "";
  call.tea = new Constrained(join(doneConds.constraints, doneResults.constraints), doneResults.itemType);
  return assignCompile(ctx, call, branches.length > 0 ? iife([jsConditional(zip(doneConds.compiled.slice(0, branches.length), branches), "throw new Error('cond failed to match" + errorMessage + "');")]) : jsNoop());
};

findDefinitionsIncludingDeps = function(ctx, names) {
  return findDefinitions(ctx, setToArray((findDeps(ctx))(unique(names))));
};

findDefinitions = function(ctx, names) {
  var alreadyDefined, aux, auxiliaries, name;
  auxiliaries = ctx.auxiliaries();
  alreadyDefined = newSet();
  return concat((function() {
    var _i, _len, _results;
    _results = [];
    for (_i = 0, _len = names.length; _i < _len; _i++) {
      name = names[_i];
      aux = lookupInMap(auxiliaries, name);
      if (aux && !inSet(alreadyDefined, name)) {
        addAllToSet(alreadyDefined, aux.defines);
        _results.push(aux.definition);
      } else {
        _results.push([]);
      }
    }
    return _results;
  })());
};

addSiblingDefines = function(ctx, nameSet) {
  var auxiliaries, name;
  auxiliaries = ctx.auxiliaries();
  return arrayToSet(concat((function() {
    var _ref, _results;
    _results = [];
    for (name in values(nameSet)) {
      _results.push((_ref = lookupInMap(auxiliaries, name)) != null ? _ref.defines : void 0);
    }
    return _results;
  })()));
};

findDeps = function(ctx) {
  return function(names) {
    var auxiliaries;
    auxiliaries = ctx.auxiliaries();
    return arrayToSet(auxiliaryDependencies(auxiliaries, names));
  };
};

auxiliaryDependencies = function(graph, names) {
  var name, nameSet, nameStack, node, nodes;
  nameSet = newSet();
  nameStack = map(id, names);
  nodes = [];
  while (name = nameStack.pop()) {
    if (!(!inSet(nameSet, name))) {
      continue;
    }
    addToSet(nameSet, name);
    if (node = lookupInMap(graph, name)) {
      nodes.push({
        name: name,
        deps: map((function(name) {
          return {
            name: name
          };
        }), node.deps)
      });
      nameStack.push.apply(nameStack, node.deps);
    }
  }
  return concat(map(setToArray, topologicallySortedGroups(nodes)));
};

ms.syntax = ms_syntax = function(ctx, call) {
  var compiledMacro, doDeclare, docs, hasName, macroCompiled, macroFn, macroName, macroSource, maybeType, param, paramTuple, params, rest, splatted, typed, _ref;
  hasName = requireName(ctx, 'Name required to declare a new syntax macro');
  _ref = _arguments(call), paramTuple = _ref[0], rest = 2 <= _ref.length ? __slice.call(_ref, 1) : [];
  maybeType = rest[0];
  doDeclare = isTypeAnnotation(maybeType);
  docs = partition(isComment, rest)[0];
  typed = isTypeAnnotation(maybeType);
  if (hasName) {
    macroName = ctx.definitionName();
    param = _terms(paramTuple)[0];
    if (isSplat(param)) {
      splatted = true;
      param.label = 'name';
      paramTuple = tuple_(splatToName(param));
    }
    macroSource = call_(token_('fn'), join([paramTuple], rest));
    macroCompiled = termCompile(ctx, macroSource);
    compiledMacro = translateToJs(translateIr(ctx, macroCompiled));
    retrieve(call, macroSource);
    macroFn = eval(compiledMacro);
    if (macroFn) {
      ctx.declareMacro(ctx.definitionPattern(), function(ctx, call) {
        var args, i;
        args = _arguments(call);
        if (typed) {
          operatorCompile(ctx, call);
        }
        if (splatted) {
          return constantToSource(macroFn(Immutable.List(args)));
        } else {
          if (macroFn.length !== args.length) {
            args = join(args, (function() {
              var _i, _ref1, _ref2, _results;
              _results = [];
              for (i = _i = _ref1 = args.length, _ref2 = macroFn.length; _ref1 <= _ref2 ? _i < _ref2 : _i > _ref2; i = _ref1 <= _ref2 ? ++_i : --_i) {
                _results.push(fake_());
              }
              return _results;
            })());
          }
          return constantToSource(macroFn.apply(null, args));
        }
      }, extractDocs(docs));
    } else {
      malformed(ctx, ctx.definitionPattern(), 'Macro failed to compile');
    }
  }
  if (typed) {
    params = map(token_, map(_symbol, _terms(paramTuple)));
    return fn_(params, concat([[maybeType], docs, [call_(token_(macroName), params)]]));
  } else {
    return jsNoop();
  }
};

ms['`'] = ms_quote = function(ctx, call) {
  var commedAtom, expression, matchAst, serializeAst;
  expression = firstOrCall(call);
  if ((_arguments(call)).length > 1) {
    labelDelimeters(call, 'const');
  }
  commedAtom = function(atom, otherwise) {
    var compiled, identifier, splat;
    if ((_symbol(atom))[0] === ',') {
      splat = (_symbol(atom)).slice(1, 3) === '..';
      identifier = token_((_symbol(atom)).slice((splat ? 3 : 1)));
      compiled = termCompile(ctx, identifier);
      retrieve(atom, identifier);
      if (ctx.assignTo()) {
        return compiled;
      } else {
        if (splat) {
          return jsMethod(compiled, 'toArray', []);
        } else {
          return jsArray([compiled]);
        }
      }
    } else {
      return otherwise();
    }
  };
  if (ctx.assignTo()) {
    matchAst = function(ast) {
      var i, matched, precs, term, termsCheck, _ref;
      matched = ctx.assignTo();
      if (isForm(ast)) {
        if (((_ref = _operator(ast)) != null ? _ref.symbol : void 0) === ',') {
          return termCompile(ctx, ast);
        } else {
          labelDelimeters(ast, 'const');
          return combinePatterns((function() {
            var _i, _len, _ref1, _results;
            _ref1 = _terms(ast);
            _results = [];
            for (i = _i = 0, _len = _ref1.length; _i < _len; i = ++_i) {
              term = _ref1[i];
              ctx.setAssignTo(jsAccess(jsCall("_terms", [matched]), i));
              precs = matchAst(term);
              ctx.resetAssignTo();
              termsCheck = {
                precs: [cond_(jsAccess(matched, "length"))]
              };
              _results.push(combinePatterns([termsCheck, precs]));
            }
            return _results;
          })());
        }
      } else {
        return commedAtom(ast, function() {
          ast.label = 'const';
          return {
            precs: [cond_(jsBinary("===", jsAccess(matched, "symbol"), toJsString(ast.symbol)))]
          };
        });
      }
    };
    return matchAst(expression);
  } else {
    call.tea = toConstrained(markOrigin(expressionType, call));
    serializeAst = function(ast) {
      var terms, _ref;
      if (isForm(ast)) {
        return jsArray([((_ref = _operator(ast)) != null ? _ref.symbol : void 0) === ',' ? termCompile(ctx, ast) : (labelDelimeters(ast, 'const'), terms = map(serializeAst, ast), _empty(terms) ? jsArray([]) : jsMethod(_fst(terms), 'concat', terms.slice(1)))]);
      } else {
        return commedAtom(ast, function() {
          var serialized;
          serialized = jsValue(JSON.stringify(ast));
          if (isExpression(ast)) {
            ast.label = 'const';
          }
          return jsArray([serialized]);
        });
      }
    };
    return _fst((serializeAst(expression)).elems);
  }
};

ms[','] = ms_comma = function(ctx, call) {
  var expression, matched;
  expression = firstOrCall(_arguments(call));
  if (matched = ctx.assignTo()) {
    return expressionCompile(ctx, expression);
  } else {
    return jsCall('constantToSource', [expressionCompile(ctx, expression)]);
  }
};

firstOrCall = function(expression) {
  var args, opIndex;
  args = _arguments(expression);
  if (args.length > 1) {
    opIndex = expression.indexOf(args[0]);
    return call_(expression[opIndex], expression.slice(opIndex + 1, -1));
  } else {
    return args[0];
  }
};

constantToSource = function(value) {
  var kind;
  switch (typeof value) {
    case 'boolean':
      return (tokenize((value ? 'True' : 'False')))[0];
    case 'number':
      return (tokenize((value < 0 ? "-" + (Math.abs(value)) : "" + value)))[0];
    case 'string':
      return (tokenize(JSON.stringify(value)))[0];
    case 'object':
      kind = Object.prototype.toString.call(value).slice(8, -1);
      switch (kind) {
        case 'RegExp':
          return (tokenize("" + value.source))[0];
        default:
          if (Immutable.Iterable.isIterable(value)) {
            return concat([(tokenize("{"))[0], map(constantToSource, value.toJS()), (tokenize("}"))[0]]);
          } else {
            return value;
          }
      }
  }
};

ms.macro = ms_macro = function(ctx, call) {
  var body, compiledMacro, defs, docs, hasName, macroBody, macroName, paramNames, paramTuple, params, type, typeList, _ref, _ref1;
  hasName = requireName(ctx, 'Name required to declare a new instance');
  _ref = _arguments(call), paramTuple = _ref[0], body = 2 <= _ref.length ? __slice.call(_ref, 1) : [];
  _ref1 = partition(isComment, body), docs = _ref1[0], defs = _ref1[1];
  type = defs[0], macroBody = 2 <= defs.length ? __slice.call(defs, 1) : [];
  if (hasName) {
    macroName = ctx.definitionName();
    params = _terms(paramTuple);
    paramNames = map(_symbol, params);
    if (!type || !isTypeAnnotation(type)) {
      if (!ctx.isPreTyped(macroName)) {
        malformed(ctx, call, "Type annotation required");
      }
      macroBody = join([type], macroBody);
      typeList = [];
    } else {
      typeList = [type];
    }
    compiledMacro = translateToJs(translateIr(ctx, termCompile(ctx, call_(token_('fn'), join([paramTuple], macroBody)))));
    params = map(token_, paramNames);
    if (ctx.isMacroDeclared(macroName)) {
      return malformed(ctx, ctx.definitionPattern(), "Macro with this name already defined");
    } else {
      ctx.declareMacro(ctx.definitionPattern(), simpleMacro(eval(compiledMacro)));
      return fn_(params, concat([typeList, docs, [call_(token_(macroName), params)]]));
    }
  }
};

simpleMacro = function(macroFn) {
  return function(ctx, call) {
    var args;
    operatorCompile(ctx, call);
    args = termsCompile(ctx, (_arguments(call)).slice(0, +macroFn.length + 1 || 9e9));
    callTyping(ctx, call);
    return assignCompile(ctx, call, macroFn.apply(null, args));
  };
};

_ref = ['binary', 'ternary', 'unary', 'access', 'call', 'method', 'assign', 'new'];
_fn = function(jsMethod) {
  return ms["Js." + jsMethod] = function(ctx, call) {
    var compatibles, compiled, i, term, terms;
    call.tea = toConstrained(jsType);
    terms = _arguments(call);
    compatibles = (function() {
      var _j, _len1, _results;
      _results = [];
      for (i = _j = 0, _len1 = terms.length; _j < _len1; i = ++_j) {
        term = terms[i];
        compiled = termCompile(ctx, term);
        _results.push(irJsCompatible(term.tea, compiled));
      }
      return _results;
    })();
    return jsCall("js" + (jsMethod[0].toUpperCase()) + jsMethod.slice(1), compatibles);
  };
};
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  jsMethod = _ref[_i];
  _fn(jsMethod);
}

ms.log = ms_log = function(ctx, call) {
  var args, compiled, value, view;
  args = _validArguments(call);
  value = args[args.length - 1];
  compiled = termsCompile(ctx, args);
  if (ctx.shouldDefer()) {
    return jsNoop();
  }
  call.tea = new Constrained(concatMap(__(_constraints, _tea), args), value.tea.type);
  view = map(__(__(toMultilineJsString, collapse), toHtml), args);
  return assignCompile(ctx, call, jsCall("debugLog", concat([ctx.logId++, view, compiled])));
};

ms['=='] = ms_eq = function(ctx, call) {
  var a, b, compiledA, compiledB, _ref1;
  _ref1 = _arguments(call), a = _ref1[0], b = _ref1[1];
  operatorCompile(ctx, call);
  compiledA = termCompile(ctx, a);
  compiledB = termCompile(ctx, b);
  callTyping(ctx, call);
  return assignCompile(ctx, call, jsBinary("===", compiledA, compiledB));
};

ms.Set = ms_Set = function(ctx, call) {
  var compiledItems, items;
  if (ctx.assignTo()) {
    throw new Error("matching on sets not supported yet");
  } else {
    items = _arguments(call);
    compiledItems = uniformCollectionCompile(ctx, call, items, hashsetType);
    return assignCompile(ctx, call, irSet(compiledItems));
  }
};

ms.List = ms_List = function(ctx, call) {
  var compiledItems, items;
  if (ctx.assignTo()) {
    throw new Error("matching on lists not supported yet");
  } else {
    items = _arguments(call);
    compiledItems = uniformCollectionCompile(ctx, call, items, listType);
    return assignCompile(ctx, call, irList(compiledItems));
  }
};

ms.Map = ms_Map = function(ctx, call) {
  var args, compiledItems, compiledLabels, items, keyType, labels, _ref1;
  if (ctx.assignTo()) {
    throw new Error("matching on maps not supported yet");
  } else {
    args = _arguments(call);
    if (args.length % 2 !== 0) {
      return malformed(ctx, args[args.length - 1], 'Missing value for key');
    }
    _ref1 = unzip(pairs(args)), labels = _ref1[0], items = _ref1[1];
    compiledLabels = termsCompileExpectingSameType(ctx, call, labels);
    keyType = applyKindFn(hashmapType, compiledLabels.itemType);
    compiledItems = uniformCollectionCompile(ctx, call, items, keyType, compiledLabels.constraints);
    return assignCompile(ctx, call, irMap(compiledLabels.compiled, compiledItems));
  }
};

builtInMacros = function() {
  return objectToMap(ms);
};

iife = function(body) {
  return jsWrap(jsCall(jsFunction({
    params: [],
    body: body
  }), []));
};

paramTupleIn = function(ctx, call, expression) {
  var params;
  if (!expression || !isTuple(expression)) {
    malformed(ctx, call, 'Missing paramater list');
    params = [];
  } else {
    params = _validTerms(expression);
    map(syntaxNewName(ctx, 'Parameter name expected'), params);
  }
  return params;
};

quantifyUnbound = function(ctx, type) {
  var vars;
  vars = subtractSets(findFree(type), ctx.allBoundTypeVariables());
  return quantify(vars, type);
};

substituteVarNames = function(ctx, varNames) {
  var name, ref;
  return concatSets.apply(null, (function() {
    var _ref1, _results;
    _ref1 = values(varNames);
    _results = [];
    for (name in _ref1) {
      ref = _ref1[name];
      if (ref.val) {
        _results.push(findFree(ref.val));
      } else {
        _results.push(newSetWith(name));
      }
    }
    return _results;
  })());
};

substituteVarNames_pure = function(ctx, varNames) {
  var subbed;
  subbed = (function(_this) {
    return function(name) {
      return (inSub(ctx.substitution, name)) || new TypeVariable(name);
    };
  })(this);
  return findFreeInList(map(subbed, setToArray(varNames)));
};

deferConstraints = function(ctx, constraints, type, scopeIndex) {
  var result;
  result = tryDeferConstraints(ctx, constraints, type, scopeIndex);
  if (result.error) {
    ctx.extendSubstitution(result.error);
  }
  return result;
};

tryDeferConstraints = function(ctx, constraints, type, scopeIndex) {
  var ambiguous, deferred, finalType, fixedVars, impliedConstraints, impliedVars, isAmbiguous, isFixed, quantifiedVars, reducedConstraints, retained, validVars, _ref1, _ref2;
  reducedConstraints = reduceConstraints(ctx, constraints);
  if (!reducedConstraints.success) {
    return reducedConstraints;
  }
  fixedVars = ctx.allBoundTypeVariablesAt(scopeIndex);
  impliedConstraints = reducedConstraints.success;
  isFixed = function(constraint) {
    return isSubset(fixedVars, findUnconstrained(constraint));
  };
  _ref1 = partition(isFixed, impliedConstraints), deferred = _ref1[0], retained = _ref1[1];
  quantifiedVars = findFree(finalType = type);
  impliedVars = concatSets.apply(null, map(findConstrained, impliedConstraints));
  validVars = concatSets(quantifiedVars, impliedVars);
  isAmbiguous = function(constraint) {
    return !isSubset(validVars, findUnconstrained(constraint));
  };
  _ref2 = partition(isAmbiguous, retained), ambiguous = _ref2[0], retained = _ref2[1];
  if (_notEmpty(ambiguous)) {
    return {
      error: substitutionFail({
        message: "Constraint " + (prettyPrintForError(ambiguous[0])) + " is ambiguous for inferred type " + (prettyPrintForError(finalType)),
        conflicts: [type.type, ambiguous[0]]
      })
    };
  } else {
    return {
      success: [deferred, retained]
    };
  }
};

reduceConstraints = function(ctx, constraints) {
  var normalized;
  normalized = normalizeConstraints(ctx, constraints);
  if (normalized.success) {
    return simplifyConstraints(ctx, normalized.success);
  } else {
    return normalized;
  }
};

normalizeConstraints = function(ctx, constraints) {
  var after, before, constraint, instanceContraints, normalized, toNormalize;
  toNormalize = map(id, constraints);
  normalized = [];
  while (_notEmpty(toNormalize)) {
    constraint = toNormalize.shift();
    if (isNormalizedConstraint(constraint)) {
      normalized.push(constraint);
    } else {
      before = subLimit(ctx.substitution);
      instanceContraints = constraintsFromInstance(ctx, constraint);
      if (instanceContraints) {
        toNormalize.push.apply(toNormalize, instanceContraints);
      } else {
        return {
          error: instanceLookupFailed(constraint)
        };
      }
      after = subLimit(ctx.substitution);
      if (after !== before) {
        toNormalize.push.apply(toNormalize, normalized);
        normalized = [];
      }
    }
  }
  if (all(normalized)) {
    return {
      success: normalized
    };
  } else {
    return {
      error: "??Not all normalized??"
    };
  }
};

simplifyConstraints = function(ctx, constraints) {
  var constraint, i, requiredConstraints, _j, _len1;
  requiredConstraints = [];
  for (i = _j = 0, _len1 = constraints.length; _j < _len1; i = ++_j) {
    constraint = constraints[i];
    if (!entailedBySuperClasses(ctx, join(requiredConstraints, constraints.slice(i + 1)), constraint)) {
      requiredConstraints.push(constraint);
    }
  }
  return {
    success: requiredConstraints
  };
};

entail = function(ctx, constraints, constraint) {
  var instanceContraints;
  if (entailedBySuperClasses(ctx, constraints, constraint)) {
    return true;
  }
  instanceContraints = constraintsFromInstance(ctx, constraint);
  if (instanceContraints) {
    return allMap((function(c) {
      return entail(ctx, constraints, c);
    }), instanceContraints);
  } else {
    return false;
  }
};

entailedBySuperClasses = function(ctx, constraints, constraint) {
  var c, sub, superClassConstraint, _j, _k, _len1, _len2, _ref1;
  for (_j = 0, _len1 = constraints.length; _j < _len1; _j++) {
    c = constraints[_j];
    _ref1 = constraintsFromSuperClasses(ctx, c);
    for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
      superClassConstraint = _ref1[_k];
      if ((sub = constraintsEqual(superClassConstraint, constraint))) {
        return true;
      }
    }
  }
  return false;
};

constraintsEqual = function(c1, c2) {
  return c1.className === c2.className && (typeEq(c1.types.types[0], c2.types.types[0])) && unifyImpliedParams(c1.types, c2.types);
};

constraintsFromSuperClasses = function(ctx, constraint) {
  var className, s, types;
  className = constraint.className, types = constraint.types;
  return join([constraint], concat((function() {
    var _j, _len1, _ref1, _results;
    _ref1 = (ctx.classNamed(className)).supers;
    _results = [];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      s = _ref1[_j];
      _results.push(constraintsFromSuperClasses(ctx, substitute(types.types, s)));
    }
    return _results;
  })()));
};

constraintsFromInstance = function(ctx, constraint) {
  var className, freshed, instance, substitution, type, _j, _len1, _ref1;
  className = constraint.className, type = constraint.type;
  _ref1 = (ctx.classNamed(className)).instances;
  for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
    instance = _ref1[_j];
    freshed = freshInstance(ctx, instance.type);
    substitution = toMatchTypes(freshed.type.types, constraint.types);
    if (substitution) {
      ctx.extendSubstitution(substitution);
      return freshed.constraints;
    }
  }
  return null;
};

instanceLookupFailed = function(constraint) {
  var first, second, _ref1;
  _ref1 = sortBasedOnOriginPosition(constraint, constraint.types.types[0]), first = _ref1[0], second = _ref1[1];
  return substitutionFail({
    message: "No instance found to satisfy " + (prettyPrintForError(constraint)),
    conflicts: [first, second]
  });
};

_names = function(list) {
  return map(_symbol, list);
};

findDeclarables = function(precs) {
  return map(__(_fst, _cache), filter(_cache, precs));
};

combinePatterns = function(list) {
  return {
    precs: concat(map(_precs, filter(_precs, list))),
    assigns: concat(map(_assigns, filter(_assigns, list)))
  };
};

_precs = function(_arg) {
  var precs;
  precs = _arg.precs;
  return precs;
};

_assigns = function(_arg) {
  var assigns;
  assigns = _arg.assigns;
  return assigns;
};

_cache = function(_arg) {
  var cache;
  cache = _arg.cache;
  return cache;
};

cache_ = function(x) {
  return {
    cache: x
  };
};

cond_ = function(x) {
  return {
    cond: x
  };
};

malformed = function(ctx, expression, message) {
  ctx.markMalformed();
  expression.malformed = message;
  return jsNoop();
};

dictConstructorFunction = function(dictName, fieldNames, additionalFields) {
  var allFieldNames, constrFn, paramAssigns;
  if (additionalFields == null) {
    additionalFields = [];
  }
  allFieldNames = join(additionalFields, fieldNames);
  paramAssigns = allFieldNames.map(function(name) {
    return jsAssignStatement(jsAccess("this", name), validIdentifier(name));
  });
  constrFn = jsFunction({
    name: validIdentifier(dictName),
    params: map(validIdentifier, allFieldNames),
    body: paramAssigns
  });
  return [constrFn];
};

dictAccessors = function(constrName, dictName, fieldNames, numConstructors) {
  var accessors;
  return accessors = fieldNames.map(function(name) {
    var accessorName, errorMessage;
    accessorName = "" + dictName + "-" + name;
    errorMessage = "throw new Error('Expected " + constrName + ", got ' + dict.constructor.name + ' instead in " + accessorName + "')";
    return jsVarDeclaration(validIdentifier(accessorName), jsFunction({
      name: validIdentifier(accessorName),
      params: ["dict"],
      body: [numConstructors > 1 ? jsConditional([["dict instanceof " + (validIdentifier(constrName)), [jsReturn(jsAccess("dict", name))]]], errorMessage) : jsReturn(jsAccess("dict", name))]
    }));
  });
};

requireName = function(ctx, message) {
  if (ctx.isAtDefinition()) {
    return syntaxNewName(ctx, message, ctx.definitionPattern());
  } else {
    malformed(ctx, call, message);
    return false;
  }
};

fakeCompile = function(ctx, token) {
  token.tea = toConstrained(ctx.freshTypeVariable(star));
  token.scope = ctx.currentScopeIndex();
  ctx.markMalformed();
  if (ctx.assignTo()) {
    token.assignable = {
      top: ctx.isAtDeferrableDefinition()
    };
    return {
      precs: [],
      assigns: []
    };
  } else {
    if (ctx.isAtDeferrableDefinition()) {
      ctx.doDefer(token, token.symbol);
    }
    return assignCompile(ctx, token, jsNoop());
  }
};

atomCompile = function(ctx, atom) {
  var id, label, pattern, symbol, translation, type, _ref1;
  symbol = atom.symbol, label = atom.label;
  _ref1 = ((function() {
    switch (label) {
      case 'numerical':
        return numericalCompile;
      case 'regex':
        return regexCompile;
      case 'char':
        return charCompile;
      case 'string':
        return stringCompile;
      default:
        if (isModuleAccess(atom)) {
          return namespacedNameCompile;
        } else {
          return nameCompile;
        }
    }
  })())(ctx, atom, symbol), type = _ref1.type, id = _ref1.id, translation = _ref1.translation, pattern = _ref1.pattern;
  if (type) {
    atom.tea = type;
  }
  if (id != null) {
    atom.id = id;
  }
  atom.scope = ctx.currentScopeIndex();
  if (ctx.assignTo()) {
    return pattern;
  } else {
    return assignCompile(ctx, atom, translation);
  }
};

nameCompile = function(ctx, atom, symbol) {
  var contextType, exp, id, type, _ref1, _ref2;
  contextType = ctx.type(symbol);
  if (exp = ctx.assignTo()) {
    if (isConst(atom)) {
      atom.label = 'const';
      if (contextType) {
        return {
          type: mapOrigin(freshInstance(ctx, ctx.type(symbol)), atom),
          pattern: constPattern(ctx, symbol)
        };
      } else {
        ctx.doDefer(atom, symbol);
        return {
          pattern: []
        };
      }
    } else {
      atom.label = 'name';
      id = (_ref1 = (_ref2 = ctx.definitionName() && ctx.definitionId()) != null ? _ref2 : ctx.currentDeclarationId(symbol)) != null ? _ref1 : ctx.freshId();
      type = toConstrained(withOrigin(ctx.freshTypeVariable(star), atom));
      if (symbol !== '_') {
        ctx.addToDefinedNames({
          name: symbol,
          id: id,
          type: type
        });
      }
      return {
        type: type,
        id: id,
        pattern: {
          assigns: [[validIdentifier(symbol), exp]]
        }
      };
    }
  } else {
    if (contextType && !(contextType instanceof TempType)) {
      type = mapOrigin(freshInstance(ctx, contextType), atom);
      return nameTranslate(ctx, atom, symbol, type);
    } else if (((!ctx.isCurrentlyDeclared(symbol)) && (ctx.isDeclared(symbol))) || contextType instanceof TempType) {
      type = toConstrained(ctx.freshTypeVariable(star));
      ctx.addToDeferredNames({
        name: scopedName(symbol, ctx.scopeIndexOfDeclaration(symbol)),
        id: symbol,
        type: mapOrigin(type, atom),
        scopeIndex: ctx.currentScopeIndex()
      });
      return nameTranslate(ctx, atom, symbol, type);
    } else {
      ctx.doDefer(atom, symbol);
      return {
        translation: deferredExpression()
      };
    }
  }
};

scopedName = function(name, scopeIndex) {
  return "" + name + "_" + scopeIndex;
};

constPattern = function(ctx, symbol) {
  var exp;
  exp = ctx.assignTo();
  return {
    precs: [
      cond_((function() {
        switch (symbol) {
          case 'True':
            return exp;
          case 'False':
            return jsUnary("!", exp);
          default:
            return jsBinary("instanceof", exp, validIdentifier(symbol));
        }
      })())
    ]
  };
};

nameTranslate = function(ctx, atom, symbol, type) {
  var id, translation;
  id = ctx.declarationId(symbol);
  ctx.addToUsedNames(symbol);
  translation = (function() {
    if (isConst(atom)) {
      atom.label = 'const';
      switch (symbol) {
        case 'True':
          return 'true';
        case 'False':
          return 'false';
        default:
          return jsAccess(validIdentifier(symbol), "_value");
      }
    } else {
      return irReference(symbol, type, ctx.currentScopeIndex());
    }
  })();
  return {
    id: id,
    type: type,
    translation: translation
  };
};

namespacedNameCompile = function(ctx, atom, symbol) {
  if (ctx.assignTo()) {
    malformed(ctx, atom, 'Matching on namespaced not supported');
  }
  return {
    translation: /^global./.test(symbol) ? "global." + symbol.slice('global.'.length) : symbol,
    type: toConstrained(markOrigin(jsType, atom)),
    pattern: {
      precs: []
    }
  };
};

numericalCompile = function(ctx, atom, symbol) {
  var translation;
  translation = symbol;
  return {
    type: toConstrained(markOrigin(numType, atom)),
    translation: translation,
    pattern: literalPattern(ctx, translation)
  };
};

regexCompile = function(ctx, atom, symbol) {
  return {
    type: toConstrained(markOrigin(regexType, atom)),
    translation: symbol,
    pattern: ctx.assignTo() ? {
      precs: [cond_(jsBinary("===", jsAccess(ctx.assignTo(), "string"), "" + symbol + ".string"))]
    } : void 0
  };
};

specialCharacters = "\\newline \\tab \\formfeed \\backspace \\return".split(' ');

charCompile = function(ctx, atom, symbol) {
  var translation;
  translation = symbol.length === 2 ? symbol[1] === '"' ? "'" + symbol[1] + "'" : '"' + symbol[1] + '"' : symbol === "\\space" ? '" "' : __indexOf.call(specialCharacters, symbol) >= 0 ? "\"\\" + symbol[1] + "\"" : /^\\x[a-fA-F0-9]{2}/.test(symbol) ? '"' + symbol + '"' : /^\\u[a-fA-F0-9]{4}/.test(symbol) ? '"' + symbol + '"' : (malformed(ctx, atom, 'Unrecognized character'), '');
  return {
    type: toConstrained(markOrigin(charType, atom)),
    translation: translation,
    pattern: literalPattern(ctx, translation)
  };
};

stringCompile = function(ctx, atom, symbol) {
  return {
    type: toConstrained(markOrigin(stringType, atom)),
    translation: symbol,
    pattern: literalPattern(ctx, symbol)
  };
};

literalPattern = function(ctx, translation) {
  if (ctx.assignTo()) {
    return {
      precs: [cond_(jsBinary("===", ctx.assignTo(), translation))]
    };
  }
};

deferredExpression = function() {
  return jsNoop();
};

syntaxType = function(expression) {
  if (isName(expression)) {
    return expression.label = 'typename';
  } else if (isTuple(expression)) {
    return map(syntaxType, _terms(expression));
  } else if (isCall(expression)) {
    (_operator(expression)).label = 'typecons';
    return map(syntaxType, _arguments(expression));
  }
};

syntaxNewName = function(ctx, message, atom) {
  var curried;
  curried = function(atom) {
    return syntaxNameAs(ctx, message, 'name', atom);
  };
  if (atom) {
    return curried(atom);
  } else {
    return curried;
  }
};

syntaxNameAs = function(ctx, message, label, atom) {
  var curried;
  curried = function(atom) {
    if (isName(atom)) {
      atom.label = label;
      return true;
    } else {
      return malformed(ctx, atom, message);
    }
  };
  if (atom) {
    return curried(atom);
  } else {
    return curried;
  }
};

call_ = function(op, args) {
  return concat([tokenize('('), [op], args, tokenize(')')]);
};

tuple_ = function(list) {
  return concat([tokenize('['), list, tokenize(']')]);
};

fn_ = function(params, rest) {
  return call_(token_('fn'), join([tuple_(params)], rest));
};

token_ = function(string) {
  return (tokenize(string))[0];
};

fake_ = function() {
  return {
    fake: true
  };
};

string_ = function(string) {
  return "\"" + string + "\"";
};

ps = function(string) {
  return "(" + string + ")";
};

translateIr = function(ctx, irAst) {
  return walkIr(irAst, function(ast) {
    var name, node, walked;
    if (ast.ir) {
      return ast.ir(ctx, ast);
    } else {
      walked = {};
      for (name in ast) {
        node = ast[name];
        if (name !== 'js') {
          walked[name] = node && translateIr(ctx, node);
        }
      }
      walked.js = ast.js;
      return walked;
    }
  });
};

irDefinition = function(type, expression, reference, bare) {
  return {
    ir: irDefinitionTranslate,
    type: type,
    expression: expression,
    reference: reference,
    bare: bare
  };
};

irDefinitionTranslate = function(ctx, _arg) {
  var bare, className, classParamNames, classParams, constraint, counter, dictName, expression, finalType, names, reducedConstraints, reference, type, typeMap;
  type = _arg.type, expression = _arg.expression, reference = _arg.reference, bare = _arg.bare;
  finalType = type;
  reducedConstraints = reference ? constraintsFromReference(ctx, {
    type: type,
    name: reference.name,
    scopeIndex: reference.scopeIndex
  }) : (reduceConstraints(ctx, finalType.constraints)).success;
  if (!reducedConstraints) {
    return jsNoop();
  }
  if (bare && _notEmpty(reducedConstraints)) {
    ctx.extendSubstitution(substitutionFail({
      message: "Ambiguous class constraints: " + (map(prettyPrintForError, reducedConstraints)),
      conflicts: reducedConstraints
    }));
    return "null";
  }
  ctx.updateClassParams();
  counter = {};
  classParams = newMap();
  classParamNames = (function() {
    var _j, _len1, _results;
    _results = [];
    for (_j = 0, _len1 = reducedConstraints.length; _j < _len1; _j++) {
      constraint = reducedConstraints[_j];
      if (!(!isAlreadyParametrized(ctx, constraint))) {
        continue;
      }
      className = constraint.className;
      names = typeNamesOfNormalized(constraint);
      typeMap = nestedLookupInMap(classParams, names);
      if (!typeMap) {
        nestedAddToMap(classParams, names, (typeMap = newMap()));
      }
      dictName = "_" + (validIdentifier(className)) + "_" + (counter[className] != null ? counter[className] : counter[className] = 0, ++counter[className]);
      addToMap(typeMap, className, dictName);
      _results.push(dictName);
    }
    return _results;
  })();
  ctx.addClassParams(classParams);
  if (_notEmpty(classParamNames)) {
    if (expression.ir === irFunctionTranslate) {
      return irFunctionTranslate(ctx, {
        name: expression.name,
        params: join(classParamNames, expression.params),
        body: expression.body
      });
    } else {
      return jsFunction({
        params: classParamNames,
        body: [jsReturn(translateIr(ctx, expression))]
      });
    }
  } else {
    return translateIr(ctx, expression);
  }
};

irCall = function(type, op, args) {
  return {
    ir: irCallTranslate,
    type: type,
    op: op,
    args: args
  };
};

irCallTranslate = function(ctx, _arg) {
  var args, classParams, finalType, op, type;
  type = _arg.type, op = _arg.op, args = _arg.args;
  finalType = addConstraintsFrom(ctx, op, type);
  classParams = op.ir === irReferenceTranslate && ctx.isMethod(op.name, op.type) ? [] : dictsForConstraint(ctx, finalType.constraints);
  op = op.ir === irReferenceTranslate && !ctx.isMethod(op.name, op.type) ? validIdentifier(op.name) : translateIr(ctx, op);
  return jsCall(op, join(classParams, translateIr(ctx, args)));
};

addConstraintsFrom = function(ctx, _arg, to) {
  var name, scopeIndex, type, typed;
  name = _arg.name, type = _arg.type, scopeIndex = _arg.scopeIndex;
  if ((scopeIndex != null) && (typed = ctx.savedDeclaration(name, scopeIndex)) && typed.type && (_empty(to.constraints)) && (_notEmpty(typed.type.type.constraints))) {
    return addConstraints(to, constraintsFromCanonicalType(ctx, typed.type, type));
  } else {
    return to;
  }
};

constraintsFromReference = function(ctx, _arg) {
  var name, scopeIndex, type, typed;
  name = _arg.name, type = _arg.type, scopeIndex = _arg.scopeIndex;
  if ((scopeIndex != null) && (typed = ctx.savedDeclaration(name, scopeIndex)) && typed.type && (_notEmpty(typed.type.type.constraints))) {
    return constraintsFromCanonicalType(ctx, typed.type, type);
  } else {
    return [];
  }
};

constraintsFromCanonicalType = function(ctx, canonicalType, type) {
  var c1, c2, inferredType, _j, _k, _len1, _len2, _ref1, _ref2;
  inferredType = freshInstance(ctx, canonicalType);
  matchType(inferredType.type, type.type);
  reduceConstraints(ctx, inferredType.constraints);
  _ref1 = inferredType.constraints;
  for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
    c1 = _ref1[_j];
    _ref2 = type.constraints;
    for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
      c2 = _ref2[_k];
      constraintsEqual(c1, c2);
    }
  }
  return inferredType.constraints;
};

irReference = function(name, type, scopeIndex) {
  return {
    ir: irReferenceTranslate,
    name: name,
    type: type,
    scopeIndex: scopeIndex
  };
};

irReferenceTranslate = function(ctx, _arg) {
  var arity, classParams, finalType, name, params, scopeIndex, type;
  name = _arg.name, type = _arg.type, scopeIndex = _arg.scopeIndex;
  if (ctx.isMethod(name, type)) {
    return translateIr(ctx, irMethod(type, name));
  } else {
    finalType = addConstraintsFrom(ctx, {
      type: type,
      name: name,
      scopeIndex: scopeIndex
    }, type);
    classParams = dictsForConstraint(ctx, finalType.constraints);
    if (classParams.length > 0) {
      arity = ctx.savedDeclaration(name, scopeIndex).arity;
      params = map(validIdentifier, arity);
      return irFunctionTranslate(ctx, {
        params: params,
        body: [jsReturn(jsCall(validIdentifier(name), join(classParams, params)))]
      });
    } else {
      return validIdentifier(name);
    }
  }
};

irMethod = function(type, name) {
  return {
    ir: irMethodTranslate,
    type: type,
    name: name
  };
};

irMethodTranslate = function(ctx, _arg) {
  var dict, finalType, name, resolvedMethod, type;
  type = _arg.type, name = _arg.name;
  finalType = type;
  resolvedMethod = (function() {
    var _j, _len1, _ref1, _results;
    _ref1 = dictsForConstraint(ctx, finalType.constraints);
    _results = [];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      dict = _ref1[_j];
      _results.push(jsAccess(dict, name));
    }
    return _results;
  })();
  if (resolvedMethod.length > 1) {
    throw new Error("expected one constraint on a method");
  } else if (resolvedMethod.length === 1) {
    return resolvedMethod[0];
  } else {
    return method;
  }
};

dictsForConstraint = function(ctx, constraints) {
  var constraint, _j, _len1, _results;
  _results = [];
  for (_j = 0, _len1 = constraints.length; _j < _len1; _j++) {
    constraint = constraints[_j];
    _results.push(dictForConstraint(ctx, constraint));
  }
  return _results;
};

dictForConstraint = function(ctx, constraint) {
  var constraints;
  if (isNormalizedConstraint(constraint)) {
    return (ctx.classParamNameFor(constraint)) || findSubClassParam(ctx, constraint);
  } else if (_notEmpty((constraints = (constraintsFromInstance(ctx, constraint)) || []))) {
    return jsCall(instanceDictFor(ctx, constraint), dictsForConstraint(ctx, constraints));
  } else {
    return instanceDictFor(ctx, constraint);
  }
};

findSubClassParam = function(ctx, constraint) {
  var chain, className, classParams, dict, toClassName, _ref1;
  toClassName = function(c) {
    return c.className;
  };
  classParams = ctx.classParamsForType(constraint);
  if (!classParams) {
    ctx.extendSubstitution(substitutionFail({
      message: "Constraint " + (prettyPrintForError(constraint)) + " is ambiguous",
      conflicts: [constraint]
    }));
    return {};
  }
  _ref1 = values(classParams);
  for (className in _ref1) {
    dict = _ref1[className];
    if (chain = findSuperClassChain(ctx, className, constraint.className)) {
      return accessList(dict, chain);
    }
  }
  throw new Error("Couldn't find dict for " + (prettyPrintForError(constraint)));
};

findSuperClassChain = function(ctx, className, targetClassName) {
  var chain, name, s, _j, _len1, _ref1;
  _ref1 = (ctx.classNamed(className)).supers;
  for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
    s = _ref1[_j];
    name = s.className;
    if (name === targetClassName) {
      return [name];
    } else if (chain = findSuperClassChain(ctx, name, targetClassName)) {
      return join([name], chain);
    }
  }
  return void 0;
};

typeNamesOfNormalized = function(constraint) {
  return [printType(constraint.types.types[0])];
};

accessList = function(what, list) {
  var first, rest;
  first = list[0], rest = 2 <= list.length ? __slice.call(list, 1) : [];
  if (first) {
    return accessList(jsAccess(what, first), rest);
  } else {
    return what;
  }
};

isAlreadyParametrized = function(ctx, constraint) {
  return !!ctx.classParamNameFor(constraint);
};

instanceDictFor = function(ctx, constraint) {
  var name, type, _j, _len1, _ref1, _ref2;
  _ref1 = (ctx.classNamed(constraint.className)).instances;
  for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
    _ref2 = _ref1[_j], name = _ref2.name, type = _ref2.type;
    if (toMatchTypes((freshInstance(ctx, type)).type.types, constraint.types)) {
      return validIdentifier(name);
    }
  }
  ctx.extendSubstitution(instanceLookupFailed(constraint));
  return 'undefined';
};

irFunction = function(_arg) {
  var body, name, params;
  name = _arg.name, params = _arg.params, body = _arg.body;
  return {
    ir: irFunctionTranslate,
    name: name,
    params: params,
    body: body
  };
};

irFunctionTranslate = function(ctx, _arg) {
  var body, name, params;
  name = _arg.name, params = _arg.params, body = _arg.body;
  return jsCall("λ" + params.length, [
    jsFunction({
      name: (name ? validIdentifier(name) : void 0),
      params: map(validIdentifier, params),
      body: translateIr(ctx, body)
    })
  ]);
};

irArray = function(items) {
  return {
    ir: irArrayTranslate,
    items: items
  };
};

irArrayTranslate = function(ctx, _arg) {
  var items;
  items = _arg.items;
  return jsCall("Immutable.List.of", translateIr(ctx, items));
};

irList = function(items) {
  return {
    ir: irListTranslate,
    items: items
  };
};

irListTranslate = function(ctx, _arg) {
  var items;
  items = _arg.items;
  return jsCall("Immutable.Stack.of", translateIr(ctx, items));
};

irMap = function(keys, elems) {
  return {
    ir: irMapTranslate,
    keys: keys,
    elems: elems
  };
};

irMapTranslate = function(ctx, _arg) {
  var elems, keys;
  keys = _arg.keys, elems = _arg.elems;
  return jsCall("Immutable.Map", [jsArray(map(jsArray, zip(translateIr(ctx, keys), translateIr(ctx, elems))))]);
};

irSet = function(items) {
  return {
    ir: irSetTranslate,
    items: items
  };
};

irSetTranslate = function(ctx, _arg) {
  var items;
  items = _arg.items;
  return jsCall("Immutable.Set.of", translateIr(ctx, items));
};

irJsCompatible = function(type, expression) {
  return {
    ir: irJsCompatibleTranslate,
    type: type,
    expression: expression
  };
};

irJsCompatibleTranslate = function(ctx, _arg) {
  var expression, finalType, translated, type;
  type = _arg.type, expression = _arg.expression;
  finalType = type;
  translated = translateIr(ctx, expression);
  if (isCustomCollectionType(finalType)) {
    return jsCall(jsAccess(translated, 'toArray'), []);
  } else {
    return translated;
  }
};

isCustomCollectionType = function(_arg) {
  var helpContext, newVar, type;
  type = _arg.type;
  helpContext = new Context;
  newVar = function() {
    return helpContext.freshTypeVariable(star);
  };
  return (toMatchTypes(applyKindFn(arrayType, newVar()), type)) || (toMatchTypes(applyKindFn(hashmapType, newVar(), newVar()), type)) || (toMatchTypes(applyKindFn(hashsetType, newVar()), type));
};

isTypeAnnotation = function(expression) {
  return (isCall(expression)) && (':' === _symbol(_operator(expression)));
};

isComment = function(expression) {
  return (isCall(expression)) && ('#' === _symbol(_operator(expression)));
};

isCall = function(expression) {
  return (isForm(expression)) && (isNotEmptyForm(expression)) && expression[0].symbol === '(';
};

isRecord = function(expression) {
  return (isTuple(expression)) && (isLabel(_fst(_terms(expression))));
};

isSeq = function(expression) {
  return (isForm(expression)) && expression[0].symbol === '{';
};

isTuple = function(expression) {
  return (isForm(expression)) && expression[0].symbol === '[';
};

isNotEmptyForm = function(form) {
  return (_terms(form)).length > 0;
};

isForm = function(expression) {
  return Array.isArray(expression);
};

isModuleAccess = function(atom) {
  return /^\w+\.\w/.test(atom.symbol);
};

isDotAccess = function(atom) {
  return /^\.-?\w+/.test(atom.symbol);
};

isConst = function(atom) {
  return /^[A-Z]([^\s\.-]|-(?=[A-Z]))*$/.test(atom.symbol);
};

isLabel = function(atom) {
  return /[^\\]:$/.test(atom.symbol);
};

isCapital = function(atom) {
  return /^[A-Z]/.test(atom.symbol);
};

isNotCapital = function(atom) {
  return /^[a-z]/.test(atom.symbol);
};

isName = function(expression) {
  var _ref1;
  if (!expression) {
    throw new Error("Nothing passed to isName");
  }
  return (isAtom(expression)) && (((_ref1 = expression.symbol) === '~' || _ref1 === '/' || _ref1 === '//') || /[^~"'\/].*/.test(expression.symbol));
};

isAtom = function(expression) {
  return !(Array.isArray(expression));
};

isExpressionOrFake = function(node) {
  return (isFake(node)) || (isExpression(node));
};

isFake = function(node) {
  return node.fake;
};

isExpression = function(node) {
  var _ref1, _ref2;
  return ((_ref1 = node.label) !== 'whitespace' && _ref1 !== 'indent') && (!node.symbol || (_ref2 = node.symbol, __indexOf.call(allDelims, _ref2) < 0));
};

_labeled = function(list) {
  return pairsLeft(isLabel, list);
};

spaceSeparatedPairs = function(nodes) {
  var expression, isNewLine, lhs, newLine, node, pairs, space, _j, _len1;
  isNewLine = function(token) {
    return token.symbol === '\n';
  };
  pairs = [];
  for (_j = 0, _len1 = nodes.length; _j < _len1; _j++) {
    node = nodes[_j];
    newLine = isNewLine(node);
    expression = isExpressionOrFake(node);
    if (!lhs && expression && !newLine) {
      lhs = node;
      space = false;
    } else if (lhs && (expression && !newLine || space && newLine)) {
      pairs.push([lhs, node]);
      lhs = false;
    } else if (lhs && newLine) {
      pairs.push([lhs, fake_()]);
      lhs = false;
    } else if (!expression) {
      space = true;
    }
  }
  if (lhs) {
    pairs.push([lhs, fake_()]);
  }
  return pairs;
};

pairsLeft = function(leftTest, list) {
  return listToPairsWith(list, function(item, next) {
    if (leftTest(item)) {
      return [item, (next && !leftTest(next) ? next : null)];
    } else {
      if (leftTest(item)) {
        return [item, null];
      } else {
        return [null, item];
      }
    }
  });
};

pairsRight = function(rightTest, list) {
  return pairsLeft((function(x) {
    return !rightTest(x);
  }), list);

  /*listToPairsWith list, (item, next) ->
    if next and rightTest next
      [(if not rightTest item then item else null), next]
    else
      if rightTest item
        [null, item]
      else
        [item, null]
   */
};

listToPairsWith = function(list, convertBy) {
  var i, result;
  return filter(_is, ((function() {
    var _results;
    i = 0;
    _results = [];
    while (i < list.length) {
      result = convertBy(list[i], list[i + 1]);
      if (result[0] && result[1]) {
        i++;
      }
      i++;
      _results.push(result);
    }
    return _results;
  })()));
};

pairs = function(list) {
  var el, i, _j, _len1, _results;
  _results = [];
  for (i = _j = 0, _len1 = list.length; _j < _len1; i = _j += 2) {
    el = list[i];
    _results.push([el, list[i + 1]]);
  }
  return _results;
};

tuplize = function(n, list) {
  var e, i, _j, _len1, _results;
  _results = [];
  for ((n > 0 ? (i = _j = 0, _len1 = list.length) : i = _j = list.length - 1); n > 0 ? _j < _len1 : _j >= 0; i = _j += n) {
    e = list[i];
    _results.push(list.slice(i, i + n));
  }
  return _results;
};

unzip = function(pairs) {
  return [map(_fst, pairs), map(_snd, pairs)];
};

zip = function(list1, list2) {
  return zipWith((function(a, b) {
    return [a, b];
  }), list1, list2);
};

zipWith = function(fn, list1, list2) {
  var el, i, _j, _len1, _results;
  _results = [];
  for (i = _j = 0, _len1 = list1.length; _j < _len1; i = ++_j) {
    el = list1[i];
    _results.push(fn(el, list2[i]));
  }
  return _results;
};

replicate = function(expression, newForm) {
  return newForm;
};

retrieve = function(expression, newForm) {
  expression.tea = newForm.tea;
  expression.malformed = newForm.malformed;
  if (newForm.label) {
    expression.label = newForm.label;
  }
  return trackTransformation(expression, newForm);
};

trackTransformation = function(transformed, newForm) {
  return newForm.transformed = transformed;
};

filterAst = function(test, expression) {
  var term;
  return join(filter(test, [expression]), isForm(expression) ? concat((function() {
    var _j, _len1, _ref1, _results;
    _ref1 = _terms(expression);
    _results = [];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      term = _ref1[_j];
      _results.push(filterAst(test, term));
    }
    return _results;
  })()) : []);
};

translateStatementsToJs = function(jsAstList) {
  return listOfLines(translateToJs(jsAstList));
};

translateToJs = function(jsAst) {
  return walkIr(jsAst, function(ast) {
    var args, name, node;
    args = {};
    for (name in ast) {
      node = ast[name];
      if (name !== 'js') {
        args[name] = node && translateToJs(node);
      }
    }
    return ast.js(args);
  });
};

walkIr = function(ast, cb) {
  var node, _j, _len1, _results;
  if (Array.isArray(ast)) {
    _results = [];
    for (_j = 0, _len1 = ast.length; _j < _len1; _j++) {
      node = ast[_j];
      _results.push(walkIr(node, cb));
    }
    return _results;
  } else if (ast.ir || ast.js) {
    return cb(ast);
  } else {
    return ast;
  }
};

printIr = function(ast) {
  return walkIr(ast, function(ast) {
    var args, name, node;
    args = {};
    for (name in ast) {
      node = ast[name];
      if (name !== 'js' && name !== 'ir') {
        args[name] = node != null ? name === 'type' ? printType(node) : printIr(node) : void 0;
      }
    }
    return args;
  });
};

jsCallMethod = function(object, methodName, args) {
  return jsCall(jsAccess(object, methodName), args);
};

jsAccess = function(lhs, name) {
  return {
    js: jsAccessTranslate,
    lhs: lhs,
    name: name
  };
};

jsAccessTranslate = function(_arg) {
  var lhs, name;
  lhs = _arg.lhs, name = _arg.name;
  if (/^\d/.test(name)) {
    return "" + lhs + "[" + name + "]";
  } else if ((validIdentifier(name)) !== name) {
    return "" + lhs + "['" + name + "']";
  } else {
    return "" + lhs + "." + name;
  }
};

jsArray = function(elems) {
  return {
    js: jsArrayTranslate,
    elems: elems
  };
};

jsArrayTranslate = function(_arg) {
  var elems;
  elems = _arg.elems;
  return "[" + (listOf(elems)) + "]";
};

jsAssign = function(lhs, rhs) {
  return {
    js: jsAssignTranslate,
    lhs: lhs,
    rhs: rhs
  };
};

jsAssignTranslate = function(_arg) {
  var lhs, rhs;
  lhs = _arg.lhs, rhs = _arg.rhs;
  return "(" + lhs + " = " + rhs + ")";
};

jsAssignStatement = function(lhs, rhs) {
  return {
    js: jsAssignStatementTranslate,
    lhs: lhs,
    rhs: rhs
  };
};

jsAssignStatementTranslate = function(_arg) {
  var lhs, rhs;
  lhs = _arg.lhs, rhs = _arg.rhs;
  return "" + lhs + " = " + rhs + ";";
};

jsBinary = function(op, lhs, rhs) {
  return {
    js: jsBinaryTranslate,
    op: op,
    lhs: lhs,
    rhs: rhs
  };
};

jsBinaryTranslate = function(_arg) {
  var lhs, op, rhs;
  op = _arg.op, lhs = _arg.lhs, rhs = _arg.rhs;
  return jsBinaryMultiTranslate({
    op: op,
    args: [lhs, rhs]
  });
};

jsBinaryMulti = function(op, args) {
  return {
    js: jsBinaryMultiTranslate,
    op: op,
    args: args
  };
};

jsBinaryMultiTranslate = function(_arg) {
  var args, op;
  op = _arg.op, args = _arg.args;
  return "(" + (args.join(" " + op + " ")) + ")";
};

jsCall = function(fun, args) {
  return {
    js: jsCallTranslate,
    fun: fun,
    args: args
  };
};

jsCallTranslate = function(_arg) {
  var args, fun;
  fun = _arg.fun, args = _arg.args;
  return "" + fun + "(" + (listOf(args)) + ")";
};

jsConditional = function(condCasePairs, elseCase) {
  return {
    js: jsConditionalTranslate,
    condCasePairs: condCasePairs,
    elseCase: elseCase
  };
};

jsConditionalTranslate = function(_arg) {
  var branch, cond, condCasePairs, control, elseCase, i;
  condCasePairs = _arg.condCasePairs, elseCase = _arg.elseCase;
  return (((function() {
    var _j, _len1, _ref1, _results;
    _results = [];
    for (i = _j = 0, _len1 = condCasePairs.length; _j < _len1; i = ++_j) {
      _ref1 = condCasePairs[i], cond = _ref1[0], branch = _ref1[1];
      control = i === 0 ? 'if' : ' else if';
      _results.push("" + control + " (" + cond + ") {\n  " + (listOfLines(branch)) + "\n}");
    }
    return _results;
  })()).join('')) + (" else {\n  " + elseCase + "\n}");
};

jsDictionary = function(keys, values) {
  return {
    js: jsDictionaryTranslate,
    keys: keys,
    values: values
  };
};

jsDictionaryTranslate = function(_arg) {
  var body, keys, values;
  keys = _arg.keys, values = _arg.values;
  body = zipWith((function(key, value) {
    return "\"" + key + "\": " + value;
  }), keys, values);
  return "{" + (listOf(body)) + "}";
};

jsExprList = function(elems) {
  return {
    js: jsExprListTranslate,
    elems: elems
  };
};

jsExprListTranslate = function(_arg) {
  var elems;
  elems = _arg.elems;
  return "(" + (listOf(elems)) + ")";
};

jsFunction = function(_arg) {
  var body, name, params;
  name = _arg.name, params = _arg.params, body = _arg.body;
  if (!Array.isArray(body)) {
    throw new Error("body of jsFunction must be a list");
  }
  return {
    js: jsFunctionTranslate,
    name: name,
    params: params,
    body: body
  };
};

jsFunctionTranslate = function(_arg) {
  var body, name, params;
  name = _arg.name, params = _arg.params, body = _arg.body;
  return "function " + (name || '') + "(" + (listOf(params)) + "){" + (blockOfLines(body)) + "}";
};

jsMalformed = function(message) {
  return {
    js: jsMalformedTranslate,
    message: message
  };
};

jsMalformedTranslate = function(_arg) {
  var message;
  message = _arg.message;
  return message;
};

jsMethod = function(object, method, args) {
  return {
    js: jsMethodTranslate,
    object: object,
    method: method,
    args: args
  };
};

jsMethodTranslate = function(_arg) {
  var args, method, object;
  object = _arg.object, method = _arg.method, args = _arg.args;
  return translateToJs(jsCall(jsAccess(object, method), args));
};

jsNew = function(classFun, args) {
  return {
    js: jsNewTranslate,
    classFun: classFun,
    args: args
  };
};

jsNewTranslate = function(_arg) {
  var args, classFun;
  classFun = _arg.classFun, args = _arg.args;
  return "new " + classFun + "(" + (listOf(args)) + ")";
};

jsNoop = function() {
  return {
    js: jsNoopTranslate
  };
};

jsNoopTranslate = function() {
  return "null";
};

jsReturn = function(result) {
  return {
    js: jsReturnTranslate,
    result: result
  };
};

jsReturnTranslate = function(_arg) {
  var result;
  result = _arg.result;
  return "return " + result + ";";
};

jsTernary = function(cond, thenExp, elseExp) {
  return {
    js: jsTernaryTranslate,
    cond: cond,
    thenExp: thenExp,
    elseExp: elseExp
  };
};

jsTernaryTranslate = function(_arg) {
  var cond, elseExp, thenExp;
  cond = _arg.cond, thenExp = _arg.thenExp, elseExp = _arg.elseExp;
  return "" + cond + " ? " + thenExp + " : " + elseExp;
};

jsUnary = function(op, arg) {
  return {
    js: jsUnaryTranslate,
    op: op,
    arg: arg
  };
};

jsUnaryTranslate = function(_arg) {
  var arg, op;
  op = _arg.op, arg = _arg.arg;
  return "" + op + arg;
};

jsValue = function(value) {
  return {
    js: jsValueTranslate,
    value: value
  };
};

jsValueTranslate = function(_arg) {
  var value;
  value = _arg.value;
  return value;
};

jsVarDeclaration = function(name, rhs) {
  return {
    js: jsVarDeclarationTranslate,
    name: name,
    rhs: rhs
  };
};

jsVarDeclarationTranslate = function(_arg) {
  var name, rhs;
  name = _arg.name, rhs = _arg.rhs;
  return "var " + name + " = " + rhs + ";";
};

jsVarDeclarations = function(names) {
  return {
    js: jsVarDeclarationsTranslate,
    names: names
  };
};

jsVarDeclarationsTranslate = function(_arg) {
  var names;
  names = _arg.names;
  return "var " + (listOf(names)) + ";";
};

jsWrap = function(value) {
  return {
    js: jsWrapTranslate,
    value: value
  };
};

jsWrapTranslate = function(_arg) {
  var value;
  value = _arg.value;
  return "(" + value + ")";
};

blockOfLines = function(lines) {
  if (lines.length === 0) {
    return '';
  } else {
    return '\n' + (listOfLines(lines)) + '\n';
  }
};

listOfLines = function(lines) {
  return lines.join('\n');
};

indentLines = function(indent, lines) {
  return blockOfLines(map((function(line) {
    return indent + line;
  }), filter(_notEmpty, lines)));
};

listOf = function(args) {
  return args.join(', ');
};

theme = {
  keyword: 'red',
  numerical: '#FEDF6B',
  "const": '#FEDF6B',
  typename: '#FEDF6B',
  typecons: '#67B3DD',
  label: '#9C49B6',
  string: '#FEDF6B',
  char: '#FEDF6B',
  paren: '#444',
  name: '#9EE062',
  recurse: '#67B3DD',
  param: '#FDA947',
  comment: 'grey',
  operator: '#67B3DD',
  malformed: '#880000',
  normal: 'white'
};

colorize = function(color, string) {
  var style;
  style = color ? " style=\"color: " + color + "\"" : '';
  return "<span" + style + ">" + string + "</span>";
};

themize = function(label, string) {
  return colorize(theme[label], string);
};

labelComments = function(call) {
  var term, _j, _len1, _ref1, _results;
  _ref1 = _validTerms(call);
  _results = [];
  for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
    term = _ref1[_j];
    _results.push(term.label = 'comment');
  }
  return _results;
};

toHtml = function(highlighted) {
  return crawl(highlighted, function(node, symbol, parent) {
    return themize(labelOf(node, parent), node.label === 'string' ? "“" + symbol.slice(1, -1) + "”" : symbol);
  });
};

print = function(ast) {
  if (!ast) {
    return ast;
  }
  return collapse(crawl(ast, function(node, symbol) {
    return symbol;
  }));
};

labelOf = function(node, parent) {
  var _ref1;
  return node.malformed && 'malformed' || (parent != null ? parent.malformed : void 0) && (_ref1 = node.symbol, __indexOf.call(allDelims, _ref1) >= 0) && 'malformed' || node.label || 'normal';
};

collapse = function(nodes) {
  var collapsed, node, _j, _len1;
  collapsed = "";
  for (_j = 0, _len1 = nodes.length; _j < _len1; _j++) {
    node = nodes[_j];
    crawl(node, function(node) {
      return collapsed += node;
    });
  }
  return collapsed;
};

parentize = function(ast) {
  return walk(ast, function(node) {
    var subNode, _j, _len1, _results;
    _results = [];
    for (_j = 0, _len1 = node.length; _j < _len1; _j++) {
      subNode = node[_j];
      _results.push(subNode.parent = node);
    }
    return _results;
  });
};

walk = function(ast, cb) {
  var node, _j, _len1;
  if (Array.isArray(ast)) {
    cb(ast);
    for (_j = 0, _len1 = ast.length; _j < _len1; _j++) {
      node = ast[_j];
      walk(node, cb);
    }
  }
  return ast;
};

validIdentifier = function(name) {
  if (inSet(reservedInJs, name)) {
    return "" + name + "_";
  } else {
    return (!isModuleAccess({
      symbol: name
    }) ? name.replace(/\./g, 'dot_') : name).replace(/\'/g, 'quote_').replace(/\+/g, 'plus_').replace(/\-/g, '__').replace(/\*/g, 'times_').replace(/\//g, 'over_').replace(/\!/g, 'not_').replace(/\=/g, 'eq_').replace(/\</g, 'lt_').replace(/\>/g, 'gt_').replace(/\~/g, 'neg_').replace(/\^/g, 'pow_').replace(/\&/g, 'and_').replace(/\@/g, 'at_').replace(/\|/g, 'or_').replace(/\?/g, 'p_');
  }
};

topologicallySortedGroups = function(dependent) {
  return toNameSets(sortedStronglyConnectedComponents(dependentToGraph(dependent)));
};

dependentToGraph = function(dependent) {
  var dep, deps, findOrAdd, name, node, nodes, _j, _k, _len1, _len2, _ref1;
  nodes = newMap();
  findOrAdd = function(name) {
    return lookupOrAdd(nodes, name, {
      name: name,
      edges: []
    });
  };
  for (_j = 0, _len1 = dependent.length; _j < _len1; _j++) {
    _ref1 = dependent[_j], name = _ref1.name, deps = _ref1.deps;
    node = findOrAdd(name);
    for (_k = 0, _len2 = deps.length; _k < _len2; _k++) {
      dep = deps[_k];
      node.edges.push(findOrAdd(dep.name));
    }
  }
  return mapToArray(nodes);
};

toNameSets = function(vertexGroups) {
  var group, name, _j, _len1, _results;
  _results = [];
  for (_j = 0, _len1 = vertexGroups.length; _j < _len1; _j++) {
    group = vertexGroups[_j];
    _results.push(arrayToSet((function() {
      var _k, _len2, _results1;
      _results1 = [];
      for (_k = 0, _len2 = group.length; _k < _len2; _k++) {
        name = group[_k].name;
        _results1.push(name);
      }
      return _results1;
    })()));
  }
  return _results;
};

sortedStronglyConnectedComponents = function(graph) {
  var S, groups, index, v, visit, _j, _len1;
  index = 0;
  S = [];
  groups = [];
  visit = function(v) {
    var group, w, _j, _len1, _ref1;
    v.index = index;
    v.lowlink = index;
    index = index + 1;
    S.push(v);
    v.onStack = true;
    _ref1 = v.edges;
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      w = _ref1[_j];
      if (w.index === void 0) {
        visit(w);
        v.lowlink = Math.min(v.lowlink, w.lowlink);
      } else if (w.onStack) {
        v.lowlink = Math.min(v.lowlink, w.index);
      }
    }
    if (v.lowlink === v.index) {
      group = [];
      while (true) {
        w = S.pop();
        w.onStack = false;
        group.push(w);
        if (w === v) {
          break;
        }
      }
      return groups.push(group);
    }
  };
  for (_j = 0, _len1 = graph.length; _j < _len1; _j++) {
    v = graph[_j];
    if (v.index === void 0) {
      visit(v);
    }
  }
  return groups;
};

hoistWheres = function(hoistable, assigns) {
  var def, defined, hoisted, hoistedNames, missing, n, name, names, notHoisted, set, stillMissingDeps, stillMissingNames, where, _, _j, _len1;
  defined = addAllToSet(newSet(), (function() {
    var _j, _len1, _ref1, _results;
    _results = [];
    for (_j = 0, _len1 = assigns.length; _j < _len1; _j++) {
      _ref1 = assigns[_j], n = _ref1[0], _ = _ref1[1];
      _results.push(n);
    }
    return _results;
  })());
  hoistedNames = newSet();
  hoisted = [];
  notHoisted = [];
  for (_j = 0, _len1 = hoistable.length; _j < _len1; _j++) {
    where = hoistable[_j];
    missing = where.missing, names = where.names, def = where.def, set = where.set;
    stillMissingNames = addAllToSet(newSet(), (function() {
      var _k, _len2, _ref1, _results;
      _ref1 = setToArray(missing);
      _results = [];
      for (_k = 0, _len2 = _ref1.length; _k < _len2; _k++) {
        name = _ref1[_k];
        if (!inSet(defined, name)) {
          _results.push(name);
        }
      }
      return _results;
    })());
    stillMissingDeps = removeAllFromSet(cloneSet(set), setToArray(hoistedNames));
    if (stillMissingNames.size === 0 && stillMissingDeps.size === 0) {
      hoisted.push(def);
      addAllToSet(hoistedNames, names);
    } else {
      notHoisted.push({
        def: def,
        names: names,
        missing: stillMissingNames,
        set: stillMissingDeps
      });
    }
  }
  return [hoisted, notHoisted];
};

toMultilineJsString = function(symbol) {
  return "('" + (symbol.replace(/\n/g, "\\n' + '")) + "')";
};

toJsString = function(symbol) {
  return "'" + symbol + "'";
};

compileVariableAssignment = function(_arg) {
  var from, to;
  to = _arg[0], from = _arg[1];
  return jsVarDeclaration(to, from);
};

constructCond = function(precs) {
  var cases, i, lastCond, preassigns, prec, pushCurrentCase, singleCase, translateCondPart, _j, _len1;
  if (precs.length === 0) {
    return {
      conds: 'true',
      preassigns: []
    };
  }
  lastCond = false;
  cases = [];
  singleCase = [];
  translateCondPart = function(_arg) {
    var cache, cond;
    cond = _arg.cond, cache = _arg.cache;
    if (cond) {
      return cond;
    } else {
      return jsAssign(cache[0], cache[1]);
    }
  };
  pushCurrentCase = function() {
    var condParts;
    condParts = map(translateCondPart, singleCase);
    cases.push(condParts.length === 1 ? condParts[0] : jsExprList(condParts));
    return singleCase = [];
  };
  for (i = _j = 0, _len1 = precs.length; _j < _len1; i = ++_j) {
    prec = precs[i];
    if (lastCond) {
      pushCurrentCase();
    }
    singleCase.push(prec);
    lastCond = prec.cond;
  }
  preassigns = lastCond ? (pushCurrentCase(), []) : map(_cache, singleCase);
  return {
    conds: jsBinaryMulti("&&", cases),
    preassigns: preassigns
  };
};

builtInTypeNames = function() {
  return arrayToMap(map((function(_arg) {
    var kind, name;
    name = _arg.name, kind = _arg.kind;
    return [name, kind];
  }), [arrowType, arrayType, listType, hashmapType, hashsetType, stringType, charType, boolType, numType, regexType, jsType, expressionType]));
};

builtInDefinitions = function() {
  return newMapWith('True', {
    type: quantifyAll(toConstrained(boolType)),
    arity: []
  }, 'False', {
    type: quantifyAll(toConstrained(boolType)),
    arity: []
  }, '==', {
    type: quantifyAll(toConstrained(typeFn(atomicType('a', star), atomicType('a', star), boolType))),
    arity: ['x', 'y']
  }, 'is-null-or-undefined', {
    type: quantifyAll(toConstrained(typeFn(atomicType('a', star), boolType))),
    arity: ['x']
  });
};

newSet = newMap = function() {
  return {
    size: 0,
    values: {}
  };
};

addToSet = function(set, key) {
  return addToMap(set, key, true);
};

addToMap = function(set, key, value) {
  if (set.values[key]) {
    return;
  }
  set.size++;
  set.values[key] = value;
  return set;
};

replaceInMap = function(map, key, value) {
  return map.values[key] = value;
};

replaceOrAddToMap = function(map, key, value) {
  if (!map.values[key]) {
    map.size++;
  }
  map.values[key] = value;
  return map;
};

lookupOrAdd = function(map, key, value) {
  var existing;
  if (existing = map.values[key]) {
    return existing;
  } else {
    map.size++;
    map.values[key] = value;
    return value;
  }
};

removeFromSet = removeFromMap = function(set, key) {
  if (set.values[key] == null) {
    return;
  }
  set.size -= 1;
  return delete set.values[key];
};

addAllToSet = function(set, array) {
  var v, _j, _len1;
  for (_j = 0, _len1 = array.length; _j < _len1; _j++) {
    v = array[_j];
    addToSet(set, v);
  }
  return set;
};

removeAllFromSet = function(set, array) {
  var v, _j, _len1;
  for (_j = 0, _len1 = array.length; _j < _len1; _j++) {
    v = array[_j];
    removeFromSet(set, v);
  }
  return set;
};

keysOfMap = setToArray = function(set) {
  var key, _results;
  _results = [];
  for (key in set.values) {
    _results.push(key);
  }
  return _results;
};

mapToArray = function(map) {
  var key, val, _ref1, _results;
  _ref1 = map.values;
  _results = [];
  for (key in _ref1) {
    val = _ref1[key];
    _results.push(val);
  }
  return _results;
};

mapToArrayVia = function(fn, map) {
  var key, val, _ref1, _results;
  _ref1 = map.values;
  _results = [];
  for (key in _ref1) {
    val = _ref1[key];
    _results.push(fn(key, val));
  }
  return _results;
};

cloneSet = cloneMap = function(set) {
  var clone, key, val, _ref1;
  clone = newSet();
  _ref1 = set.values;
  for (key in _ref1) {
    val = _ref1[key];
    addToMap(clone, key, val);
  }
  return clone;
};

lookupInMap = inSet = function(set, name) {
  return set.values[name];
};

isSetEmpty = isMapEmpty = function(set) {
  return set.size === 0;
};

mapMap = function(fn, set) {
  var initialized, key, val, _ref1;
  initialized = newMap();
  _ref1 = set.values;
  for (key in _ref1) {
    val = _ref1[key];
    addToMap(initialized, key, fn(val, key));
  }
  return initialized;
};

mapKeys = function(fn, map) {
  var initialized, key, val, _ref1;
  initialized = newMap();
  _ref1 = map.values;
  for (key in _ref1) {
    val = _ref1[key];
    addToMap(initialized, key, fn(key));
  }
  return initialized;
};

mapSet = rehashMap = function(fn, set) {
  var initialized, key, val, _ref1;
  initialized = newMap();
  _ref1 = set.values;
  for (key in _ref1) {
    val = _ref1[key];
    addToMap(initialized, fn(key), val);
  }
  return initialized;
};

filterSet = filterMap = function(fn, set) {
  var initialized, key, val, _ref1;
  initialized = newMap();
  _ref1 = set.values;
  for (key in _ref1) {
    val = _ref1[key];
    if (fn(key, val)) {
      addToMap(initialized, key, val);
    }
  }
  return initialized;
};

partitionMap = function(fn, map) {
  var filteredIn, filteredOut, key, val, _ref1;
  filteredIn = newMap();
  filteredOut = newMap();
  _ref1 = map.values;
  for (key in _ref1) {
    val = _ref1[key];
    addToMap((fn(val, key) ? filteredIn : filteredOut), key, val);
  }
  return [filteredIn, filteredOut];
};

reduceSet = function(fn, def, set) {
  return (setToArray(set)).reduce(function(prev, curr) {
    return fn(curr, prev);
  }, def);
};

newSetWith = function() {
  var args, initialized, k, _j, _len1;
  args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  initialized = newSet();
  for (_j = 0, _len1 = args.length; _j < _len1; _j++) {
    k = args[_j];
    addToSet(initialized, k);
  }
  return initialized;
};

newMapWith = function() {
  var args, i, initialized, k, _j, _len1;
  args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  initialized = newMap();
  for (i = _j = 0, _len1 = args.length; _j < _len1; i = _j += 2) {
    k = args[i];
    addToMap(initialized, k, args[i + 1]);
  }
  return initialized;
};

newMapKeysVals = function(keys, vals) {
  var i, initialized, item, _j, _len1;
  initialized = newMap();
  for (i = _j = 0, _len1 = vals.length; _j < _len1; i = ++_j) {
    item = vals[i];
    addToMap(initialized, keys[i], item);
  }
  return initialized;
};

concatSets = concatMaps = function() {
  var concated, k, m, maps, v, _j, _len1, _ref1;
  maps = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
  concated = newMap();
  for (_j = 0, _len1 = maps.length; _j < _len1; _j++) {
    m = maps[_j];
    _ref1 = m.values;
    for (k in _ref1) {
      v = _ref1[k];
      addToMap(concated, k, v);
    }
  }
  return concated;
};

concatConcatMaps = function(maps) {
  var concated, k, list, m, v, _j, _len1, _ref1;
  concated = newMap();
  for (_j = 0, _len1 = maps.length; _j < _len1; _j++) {
    m = maps[_j];
    _ref1 = m.values;
    for (k in _ref1) {
      v = _ref1[k];
      if (list = lookupInMap(concated, k)) {
        list.push(v);
      } else {
        addToMap(concated, k, [v]);
      }
    }
  }
  return concated;
};

subtractSets = subtractMaps = function(from, what) {
  var k, subtracted, v, _ref1;
  subtracted = newMap();
  _ref1 = from.values;
  for (k in _ref1) {
    v = _ref1[k];
    if (!(k in what.values)) {
      addToMap(subtracted, k, v);
    }
  }
  return subtracted;
};

arrayToSet = function(array) {
  return addAllToSet(newSet(), array);
};

arrayToMap = function(pairs) {
  var created, key, value, _j, _len1, _ref1;
  created = newMap();
  for (_j = 0, _len1 = pairs.length; _j < _len1; _j++) {
    _ref1 = pairs[_j], key = _ref1[0], value = _ref1[1];
    addToMap(created, key, value);
  }
  return created;
};

objectToMap = function(object) {
  var created, key, value;
  created = newMap();
  for (key in object) {
    value = object[key];
    addToMap(created, key, value);
  }
  return created;
};

values = function(map) {
  return map.values;
};

doIntersect = function(setA, setB) {
  return (subtractSets(setA, setB)).size !== setA.size;
};

isSubset = function(superSet, subSet) {
  return (subtractSets(subSet, superSet)).size === 0;
};

intersectRight = function(mapA, mapB) {
  var intersection, k, v, _ref1;
  intersection = newMap();
  _ref1 = mapB.values;
  for (k in _ref1) {
    v = _ref1[k];
    if (k in mapA.values) {
      addToMap(intersection, k, v);
    }
  }
  return intersection;
};

intersectMaps = intersectSets = function(maps) {
  var x, xs;
  x = maps[0], xs = 2 <= maps.length ? __slice.call(maps, 1) : [];
  if (_empty(maps)) {
    return newMap();
  } else if (_empty(xs)) {
    return x;
  } else {
    return intersectRight(x, intersectMaps(xs));
  }
};

nestedAddToMap = function(map, keys, value) {
  var finalKey, key, nestedKeys, _j, _k, _len1;
  nestedKeys = 2 <= keys.length ? __slice.call(keys, 0, _j = keys.length - 1) : (_j = 0, []), finalKey = keys[_j++];
  for (_k = 0, _len1 = nestedKeys.length; _k < _len1; _k++) {
    key = nestedKeys[_k];
    map = lookupInMap(map, key);
    if (!map) {
      map = addToMap(map, key, newMap());
    }
  }
  return addToMap(map, finalKey, value);
};

nestedLookupInMap = function(map, keys) {
  var key, _j, _len1;
  for (_j = 0, _len1 = keys.length; _j < _len1; _j++) {
    key = keys[_j];
    if ((map != null ? map.size : void 0) == null) {
      return null;
    }
    map = lookupInMap(map, key);
  }
  return map;
};

unify = function(ctx, t1, t2) {
  if (!(ctx instanceof Context && t1 && t2)) {
    throw new Error("invalid args to unify");
  }
  return ctx.extendSubstitution(mostGeneralUnifier(t1, t2));
};

mostGeneralUnifier = function(t1, t2) {
  var s1, s2;
  if (t1.TypeVariable && t2.TypeVariable && t1.name === t2.name) {
    return emptySubstitution();
  } else if (t1.TypeVariable && t1.ref.val) {
    return mostGeneralUnifier(t1.ref.val, t2);
  } else if (t2.TypeVariable && t2.ref.val) {
    return mostGeneralUnifier(t1, t2.ref.val);
  } else if (t1.TypeVariable) {
    return bindVariable(t1, t2);
  } else if (t2.TypeVariable) {
    return mostGeneralUnifier(t2, t1);
  } else if (t1.TypeConstr && t2.TypeConstr && t1.name === t2.name) {
    return emptySubstitution();
  } else if (t1.TypeApp && t2.TypeApp) {
    s1 = mostGeneralUnifier(t1.op, t2.op);
    s2 = mostGeneralUnifier(t1.arg, t2.arg);
    return joinSubs(s1, s2);
  } else if (t1.Types && t2.Types) {
    if (t1.types.length !== t2.types.length) {
      return unifyFail(t1, t2);
    } else if (_notEmpty(t1.types)) {
      s1 = mostGeneralUnifier(t1.types[0], t2.types[0]);
      s2 = mostGeneralUnifier(new Types(t1.types.slice(1)), new Types(t2.types.slice(1)));
      return joinSubs(s1, s2);
    } else {
      return emptySubstitution();
    }
  } else {
    return unifyFail(t1, t2);
  }
};

bindVariable = function(variable, type) {
  var desc, first, second, _ref1;
  if (inSet(findFree(type), variable.name)) {
    return typeFail("Types cannot match: ", variable, type);
  } else if (!kindsEq(kind(variable), kind(type))) {
    _ref1 = sortBasedOnOriginPosition(variable, type), first = _ref1[0], second = _ref1[1];
    desc = function(type) {
      return "" + (prettyPrintForError(type)) + " which " + (type === variable ? 'should be' : 'is') + " a " + (printKind(kind(type)));
    };
    return substitutionFail({
      message: "Cannot match " + (desc(first)) + " with " + (desc(second)),
      conflicts: [first, second]
    });
  } else {
    variable.ref.val = type;
    return newSubstitution();
  }
};

toMatchTypes = function(t1, t2) {
  var substitution;
  substitution = matchType(t1, t2);
  if (_notEmpty(substitution.fails)) {
    return null;
  } else {
    return substitution;
  }
};

matchType = function(t1, t2) {
  var s1, s2;
  if (t1.TypeVariable && t1.ref.val) {
    if (typeEq(t1.ref.val, t2)) {
      return emptySubstitution();
    } else {
      return unifyFail(t1, t2);
    }
  } else if (t2.TypeVariable && t2.ref.val) {
    return matchType(t1, t2.ref.val);
  } else if (t1.TypeVariable && t2.TypeVariable && t1.name === t2.name) {
    return emptySubstitution();
  } else if (t1.TypeVariable && kindsEq(kind(t1), kind(t2))) {
    t1.ref.val = t2;
    return newSubstitution();
  } else if (t1.QuantifiedVar && t2.QuantifiedVar) {
    if (t1["var"] !== t2["var"]) {
      return unifyFail(t1, t2);
    } else {
      return emptySubstitution();
    }
  } else if (t1.TypeConstr && t2.TypeConstr && t1.name === t2.name) {
    return emptySubstitution();
  } else if (t1.TypeApp && t2.TypeApp) {
    s1 = matchType(t1.op, t2.op);
    s2 = matchType(t1.arg, t2.arg);
    return subUnion(s1, s2);
  } else if (t1.Types && t2.Types) {
    if (t1.types.length !== t2.types.length) {
      return unifyFail(t1, t2);
    } else if (_notEmpty(t1.types)) {
      s1 = matchType(t1.types[0], t2.types[0]);
      if (isFailed(s1)) {
        return s1;
      } else {
        return unifyImpliedParams(t1, t2);
      }
    } else {
      return emptySubstitution();
    }
  } else {
    return unifyFail(t1, t2);
  }
};

unifyImpliedParams = function(t1, t2) {
  var makeSub, sub, subbed1, subbed2, types1, types2;
  types1 = new Types(t1.types.slice(1));
  types2 = new Types(t2.types.slice(1));
  makeSub = function(types) {
    return mapMap((function(kind, name) {
      return new TypeVariable(name, kind, {});
    }), findFree(types));
  };
  subbed1 = substitute(makeSub(types1), types1);
  subbed2 = substitute(makeSub(types2), types2);
  if (isFailed((sub = mostGeneralUnifier(subbed1, subbed2)))) {
    return sub;
  } else {
    return mostGeneralUnifier(types1, types2);
  }
};

substitute = function(substitution, type) {
  if (type.TypeVariable) {
    if (type.ref.val) {
      return substitute(substitution, type.ref.val);
    } else {
      return substitution.values && (lookupInMap(substitution, type.name)) || type;
    }
  } else if (type.QuantifiedVar) {
    return substitution[type["var"]] || type;
  } else if (type.TypeConstr) {
    return withOrigin(new TypeConstr(type.name, type.kind), type.origin);
  } else if (type.TypeApp) {
    return withOrigin(new TypeApp(substitute(substitution, type.op), substitute(substitution, type.arg)), type.origin);
  } else if (type.ForAll) {
    return new ForAll(type.kinds, substitute(substitution, type.type));
  } else if (type.Constrained) {
    return new Constrained(substituteList(substitution, type.constraints), substitute(substitution, type.type));
  } else if (type.ClassConstraint) {
    return withOrigin(new ClassConstraint(type.className, substitute(substitution, type.types)), type.origin);
  } else if (type.Types) {
    return new Types(substituteList(substitution, type.types));
  } else {
    return type;
  }
};

findFree = function(type) {
  if (type.TypeVariable) {
    if (type.ref.val) {
      return findFree(type.ref.val);
    } else {
      return newMapWith(type.name, type.kind);
    }
  } else if (type.TypeApp) {
    return concatMaps(findFree(type.op), findFree(type.arg));
  } else if (type.Constrained) {
    return concatMaps(findFree(type.type), findFreeInList(type.constraints));
  } else if (type.ClassConstraint) {
    return findFree(type.types);
  } else if (type.Types) {
    return findFreeInList(type.types);
  } else {
    return newMap();
  }
};

freshenType = function(type) {
  if (type.TypeVariable) {
    if (type.ref.val) {
      return freshenType(type.ref.val);
    } else {
      return new TypeVariable(type.name, type.kind);
    }
  } else if (type.TypeApp) {
    return new TypeApp(freshenType(type.op), freshenType(type.arg));
  } else {
    return type;
  }
};

unify_pure = function(ctx, t1, t2) {
  var sub;
  if (!(ctx instanceof Context && t1 && t2)) {
    throw new Error("invalid args to unify");
  }
  sub = ctx.substitution;
  return ctx.extendSubstitution(mostGeneralUnifier(substitute(sub, t1), substitute(sub, t2)));
};

mostGeneralUnifier_pure = function(t1, t2) {
  var s1, s2;
  if (t1.TypeVariable) {
    return bindVariable(t1, t2);
  } else if (t2.TypeVariable) {
    return bindVariable(t2, t1);
  } else if (t1.TypeConstr && t2.TypeConstr && t1.name === t2.name) {
    return emptySubstitution();
  } else if (t1.TypeApp && t2.TypeApp) {
    s1 = mostGeneralUnifier(t1.op, t2.op);
    s2 = mostGeneralUnifier(substitute(s1, t1.arg), substitute(s1, t2.arg));
    return joinSubs(s2, s1);
  } else if (t1.Types && t2.Types) {
    if (t1.types.length !== t2.types.length) {
      return unifyFail(t1, t2);
    } else if (_notEmpty(t1.types)) {
      s1 = mostGeneralUnifier(t1.types[0], t2.types[0]);
      s2 = mostGeneralUnifier(new Types(t1.types.slice(1)), new Types(t2.types.slice(1)));
      return joinSubs(s2, s1);
    } else {
      return emptySubstitution();
    }
  } else {
    return unifyFail(t1, t2);
  }
};

unifyFail = function(t1, t2) {
  return typeFail("Types don't match: ", t1, t2);
};

bindVariable_pure = function(variable, type) {
  if (type.TypeVariable && variable.name === type.name) {
    return emptySubstitution();
  } else if (inSet(findFree(type), variable.name)) {
    return typeFail("Types cannot match: ", variable, type);
  } else if (!kindsEq(kind(variable), kind(type))) {
    return typeFail("Kinds of types don't match: ", variable, type);
  } else {
    return newSubstitution(variable.name, type);
  }
};

typeFail = function(message, t1, t2) {
  var first, second, _ref1;
  _ref1 = sortBasedOnOriginPosition(t1, t2), first = _ref1[0], second = _ref1[1];
  return substitutionFail({
    message: "" + message + " " + (prettyPrintForError(first)) + ", " + (prettyPrintForError(second)),
    conflicts: [first, second],
    types: [t1, t2]
  });
};

sortBasedOnOriginPosition = function(t1, t2) {
  var _ref1, _ref2;
  if (((_ref1 = originOf(t1)) != null ? _ref1.start : void 0) > ((_ref2 = originOf(t2)) != null ? _ref2.start : void 0)) {
    return [t2, t1];
  } else {
    return [t1, t2];
  }
};

originOf = function(type) {
  if (type.TypeVariable && type.ref.val) {
    return originOf(type.ref.val);
  } else {
    return type.origin;
  }
};

toMatchTypes_pure = function(t1, t2) {
  var substitution;
  substitution = matchType(t1, t2);
  if (_notEmpty(substitution.fails)) {
    return null;
  } else {
    return substitution;
  }
};

matchType_pure = function(t1, t2) {
  var s1, s2, s3;
  if (t1.TypeVariable && kindsEq(kind(t1), kind(t2))) {
    return newSubstitution(t1.name, t2);
  } else if (t1.TypeConstr && t2.TypeConstr && t1.name === t2.name) {
    return emptySubstitution();
  } else if (t1.TypeApp && t2.TypeApp) {
    s1 = matchType(t1.op, t2.op);
    s2 = matchType(t1.arg, t2.arg);
    s3 = mergeSubs(s1, s2);
    return s3 || unifyFail(t1, t2);
  } else if (t1.Types && t2.Types) {
    if (t1.types.length !== t2.types.length) {
      return unifyFail(t1, t2);
    } else if (_notEmpty(t1.types)) {
      s1 = matchType(t1.types[0], t2.types[0]);
      s2 = unifyImpliedParams(substitute(s1, t1), t2);
      s3 = mergeSubs(s1, s2);
      return s3 || unifyFail(t1, t2);
    } else {
      return emptySubstitution();
    }
  } else {
    return unifyFail(t1, t2);
  }
};

unifyImpliedParams_pure = function(t1, t2) {
  return mostGeneralUnifier(new Types(t1.types.slice(1)), new Types(t2.types.slice(1)));
};

joinSubs = function(s1, s2) {
  return subUnion(s1, s2);
};

joinSubs_pure = function(s1, s2) {
  return subUnion(s1, mapSub((function(type) {
    return substitute(s1, type);
  }), s2));
};

mergeSubs = function(s1, s2) {
  var agree;
  agree = function(varName) {
    var variable;
    variable = new TypeVariable(varName, star);
    return typeEq(substitute(s1, variable), substitute(s2, variable));
  };
  if (allMap(agree, subIntersection(s1, s2))) {
    return subUnion(s1, s2);
  } else {
    return null;
  }
};

mapSub = function(fn, sub) {
  var mapped, name, v, _j, _ref1, _ref2;
  mapped = emptySubstitution();
  mapped.start = subStart(sub);
  mapped.fails = sub.fails;
  for (name = _j = _ref1 = subStart(sub), _ref2 = subLimit(sub); _j < _ref2; name = _j += 1) {
    if (v = inSub(sub, name)) {
      setInSub(mapped, name, fn(v));
    }
  }
  return mapped;
};

subIntersection = function(subA, subB) {
  var name, _j, _ref1, _ref2, _results;
  _results = [];
  for (name = _j = _ref1 = subStart(subB), _ref2 = subLimit(subB); _j < _ref2; name = _j += 1) {
    if ((inSub(subB, name)) && (inSub(subA, name))) {
      _results.push(name);
    }
  }
  return _results;
};

subUnion = function(subA, subB) {
  var union;
  union = emptySubstitution();
  union.start = subA.start + subB.start;
  union.fails = [].concat(subB.fails, subA.fails);
  return union;
};

subUnion_pure = function(subA, subB) {
  var end, name, start, type, union, _j;
  union = emptySubstitution();
  start = Math.min(subStart(subA), subStart(subB));
  end = Math.max(subLimit(subA), subLimit(subB));
  union.start = start;
  for (name = _j = start; _j < end; name = _j += 1) {
    type = (inSub(subA, name)) || (inSub(subB, name));
    if (type) {
      setInSub(union, name, type);
    }
  }
  union.fails = [].concat(subB.fails, subA.fails);
  return union;
};

newSubstitution = function() {
  var sub;
  sub = emptySubstitution();
  sub.start = 0;
  return sub;
};

newSubstitution_pure = function(name, type) {
  var sub;
  sub = emptySubstitution();
  sub.vars[0] = type;
  sub.start = name;
  return sub;
};

isFailed = function(sub) {
  return sub.fails.length > 0;
};

substitutionFail = function(failure) {
  var sub;
  sub = emptySubstitution();
  sub.fails.push(failure);
  return sub;
};

subLimit = function(sub) {
  if (sub.start === Infinity) {
    return -Infinity;
  } else {
    return sub.start;
  }
};

subLimit_pure = function(sub) {
  if (sub.start === Infinity) {
    return -Infinity;
  } else {
    return sub.start + sub.vars.length;
  }
};

subStart = function(sub) {
  return sub.start;
};

setInSub = function(sub, name, value) {
  return sub.vars[name - sub.start] = value;
};

inSub = function(sub, name) {
  return sub.vars[name - sub.start];
};

emptySubstitution = function() {
  return {
    start: Infinity,
    fails: []
  };
};

substitute_pure = function(substitution, type) {
  if (type.TypeVariable) {
    return substitution.vars && (inSub(substitution, type.name)) || substitution.values && (lookupInMap(substitution, type.name)) || type;
  } else if (type.QuantifiedVar) {
    return substitution[type["var"]] || type;
  } else if (type.TypeApp) {
    return withOrigin(new TypeApp(substitute(substitution, type.op), substitute(substitution, type.arg)), type.origin);
  } else if (type.ForAll) {
    return new ForAll(type.kinds, substitute(substitution, type.type));
  } else if (type.Constrained) {
    return new Constrained(substituteList(substitution, type.constraints), substitute(substitution, type.type));
  } else if (type.ClassConstraint) {
    return withOrigin(new ClassConstraint(type.className, substitute(substitution, type.types)), type.origin);
  } else if (type.Types) {
    return new Types(substituteList(substitution, type.types));
  } else {
    return type;
  }
};

substituteList = function(substitution, list) {
  return map((function(t) {
    return substitute(substitution, t);
  }), list);
};

findFree_pure = function(type) {
  if (type.TypeVariable) {
    return newMapWith(type.name, type.kind);
  } else if (type.TypeApp) {
    return concatMaps(findFree(type.op), findFree(type.arg));
  } else if (type.Constrained) {
    return concatMaps(findFree(type.type), findFreeInList(type.constraints));
  } else if (type.ClassConstraint) {
    return findFree(type.types);
  } else if (type.Types) {
    return findFreeInList(type.types);
  } else {
    return newMap();
  }
};

findFreeInList = function(list) {
  return concatMaps.apply(null, map(findFree, list));
};

findUnconstrained = function(constraint) {
  return findFree(constraint.types.types[0]);
};

findConstrained = function(constraint) {
  return findFreeInList(constraint.types.types.slice(1));
};

freshInstance = function(ctx, type) {
  var freshes;
  if (!(type && type.ForAll)) {
    throw new Error("not a forall in freshInstance " + (safePrintType(type)));
  }
  freshes = map((function(kind) {
    return ctx.freshTypeVariable(kind);
  }), type.kinds);
  return (substitute(freshes, type)).type;
};

freshName = function(nameIndex) {
  return nameIndex;
};

niceName = function(nameIndex) {
  var suffix;
  suffix = nameIndex >= 25 ? niceName((Math.floor(nameIndex / 25)) - 1) : '';
  return (String.fromCharCode(97 + nameIndex % 25)) + suffix;
};

copyOrigin = function(to, from) {
  var c, i, _j, _len1, _ref1;
  if (to.Constrained) {
    copyOrigin(to.type, from.type);
    _ref1 = to.constraints;
    for (i = _j = 0, _len1 = _ref1.length; _j < _len1; i = ++_j) {
      c = _ref1[i];
      copyOrigin(c, from.constraints[i]);
    }
  } else if (from.TypeVariable && from.ref.val) {
    copyOrigin(to, from.ref.val);
  } else {
    if (to.TypeApp) {
      copyOrigin(to.op, from.op);
      copyOrigin(to.arg, from.arg);
    }
    mutateMarkingOrigin(to, from.origin);
  }
  return to;
};

mapOriginOnFunction = function(type, expression) {
  if (isFunctionType(type)) {
    withOrigin(type, expression);
    withOrigin(type.op, expression);
    if (type.op.op) {
      withOrigin(type.op.op, expression);
    }
    mapOriginOnFunction(type.arg, expression);
  }
  return type;
};

mapOrigin = function(type, expression) {
  mutateMappingOrigin(type, expression);
  return type;
};

mutateMappingOrigin = function(type, expression) {
  var c, t, _j, _k, _len1, _len2, _ref1, _ref2, _results, _results1;
  if (type.Constrained) {
    mutateMappingOrigin(type.type, expression);
    _ref1 = type.constraints;
    _results = [];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      c = _ref1[_j];
      _results.push(mutateMarkingOrigin(c, expression));
    }
    return _results;
  } else if (type.Types) {
    _ref2 = type.types;
    _results1 = [];
    for (_k = 0, _len2 = _ref2.length; _k < _len2; _k++) {
      t = _ref2[_k];
      _results1.push(mutateMappingOrigin(t, expression));
    }
    return _results1;
  } else {
    if (type.TypeApp) {
      mutateMappingOrigin(type.op, expression);
      mutateMappingOrigin(type.arg, expression);
    }
    return mutateMarkingOrigin(type, expression);
  }
};

mapWithOrigin = function(type, expression) {
  var clone;
  clone = cloneType(type);
  mapOrigin(clone, expression);
  return clone;
};

markOrigin = function(typeOrConstraint, expression) {
  var clone;
  clone = cloneType(typeOrConstraint);
  mutateMarkingOrigin(clone, expression);
  return clone;
};

withOrigin = function(typeOrConstraint, expression) {
  mutateMarkingOrigin(typeOrConstraint, expression);
  return typeOrConstraint;
};

mutateMarkingOrigin = function(typeOrConstraint, expression) {
  return typeOrConstraint.origin = expression;
};

cloneType = function(type) {
  return substitute(newMap(), type);
};

isNormalizedConstraint = function(constraint) {
  return isNormalizedConstraintArgument(constraint.types.types[0]);
};

isNormalizedConstraintArgument = function(type) {
  if (type) {
    if (type.TypeVariable) {
      if (type.ref.val) {
        return isNormalizedConstraintArgument(type.ref.val);
      } else {
        return true;
      }
    } else if (type.TypeConstr) {
      return false;
    } else if (type.TypeApp) {
      return isNormalizedConstraintArgument(type.op);
    }
  }
};

isNormalizedConstraintArgument_pure = function(type) {
  if (type) {
    if (type.TypeVariable) {
      return true;
    } else if (type.TypeConstr) {
      return false;
    } else if (type.TypeApp) {
      return isNormalizedConstraintArgument(type.op);
    }
  }
};

includesJsType = function(type) {
  if (type.TypeVariable && type.ref.val) {
    return includesJsType(type.ref.val);
  } else if (type.TypeConstr) {
    return typeEq(type, jsType);
  } else if (type.TypeApp) {
    return (includesJsType(type.op)) || (includesJsType(type.arg));
  }
};

typeEq = function(a, b) {
  if (a.TypeVariable && b.TypeVariable && a.name === b.name) {
    return true;
  } else if (a.TypeVariable && a.ref.val) {
    return typeEq(a.ref.val, b);
  } else if (b.TypeVariable && b.ref.val) {
    return typeEq(a, b.ref.val);
  } else if (a.TypeConstr && b.TypeConstr) {
    return a.name === b.name;
  } else if (a.QuantifiedVar && b.QuantifiedVar) {
    return a["var"] === b["var"];
  } else if (a.TypeApp && b.TypeApp) {
    return (typeEq(a.op, b.op)) && (typeEq(a.arg, b.arg));
  } else if (a.ForAll && b.ForAll) {
    return typeEq(a.type, b.type);
  } else if (a.Constrained && b.Constrained) {
    return (all(zipWith(typeEq, a.constraints, b.constraints))) && (typeEq(a.type, b.type));
  } else if (a.ClassConstraint && b.ClassConstraint) {
    return a.className === b.className && typeEq(a.types, b.types);
  } else if (a.Types && b.Types) {
    return all(zipWith(typeEq, a.types, b.types));
  } else {
    return false;
  }
};

typeConstant = function(name) {
  return new TypeConstr(name, star);
};

atomicType = function(name, kind) {
  if (isNotCapital({
    symbol: name
  })) {
    return new TypeVariable(name, kind);
  } else {
    return new TypeConstr(name, kind);
  }
};

tupleType = function(arity) {
  return new TypeConstr("[" + arity + "]", kindFn(arity));
};

tupleOfTypes = function(types) {
  return new Constrained(concatMap(_constraints, types), applyKindFn.apply(null, [tupleType(types.length)].concat(__slice.call(map(_type, types)))));
};

_constraints = function(type) {
  return type.constraints;
};

kindFn = function(arity) {
  if (arity === 0) {
    return star;
  } else {
    return new KindFn(star, kindFn(arity - 1));
  }
};

kindFnOfArgs = function() {
  var arg, args;
  arg = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
  if (!arg) {
    return star;
  } else {
    return new KindFn(arg, kindFnOfArgs.apply(null, args));
  }
};

typeFn = function() {
  var argType, args;
  argType = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
  if (_empty(args)) {
    return new TypeApp(cloneType(zeroArrowType), argType);
  } else {
    return properTypeFn.apply(null, [argType].concat(__slice.call(args)));
  }
};

properTypeFn = function() {
  var args, from, to;
  from = arguments[0], to = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
  if (args.length === 0) {
    if (!to) {
      return from;
    } else {
      return new TypeApp(new TypeApp(cloneType(arrowType), from), to);
    }
  } else {
    return properTypeFn(from, properTypeFn.apply(null, [to].concat(__slice.call(args))));
  }
};

applyKindFn = function() {
  var arg, args, fn;
  fn = arguments[0], arg = arguments[1], args = 3 <= arguments.length ? __slice.call(arguments, 2) : [];
  if (!arg) {
    return fn;
  } else if (args.length === 0) {
    return new TypeApp(fn, arg);
  } else {
    return applyKindFn.apply(null, [applyKindFn(fn, arg)].concat(__slice.call(args)));
  }
};

isConstructor = function(type) {
  return type.TypeApp;
};

kind = function(type) {
  if (type.kind) {
    return type.kind;
  } else if (type.TypeApp) {
    return (kind(type.op)).to;
  } else {
    throw new Error("Invalid type in kind");
  }
};

kindsEq = function(k1, k2) {
  return k1 === k2 || k1 && k2 && k1.from && k2.from && (kindsEq(k1.from, k2.from)) && (kindsEq(k1.to, k2.to));
};

printKind = function(kind) {
  var arity;
  if (kind instanceof KindFn) {
    arity = arityOfKind(kind);
    return "type constructor taking " + arity + " argument" + (arity > 1 ? 's' : '');
  } else {
    return "type";
  }
};

arityOfKind = function(kind) {
  if (kind instanceof KindFn) {
    return 1 + arityOfKind(kind.to);
  } else {
    return 0;
  }
};

KindFn = (function() {
  function KindFn(from, to) {
    this.from = from;
    this.to = to;
  }

  return KindFn;

})();

TempKind = (function() {
  function TempKind() {}

  return TempKind;

})();

TypeVariable = (function() {
  function TypeVariable(name, kind, ref) {
    this.name = name;
    this.kind = kind;
    this.ref = ref != null ? ref : {};
    this.TypeVariable = true;
  }

  return TypeVariable;

})();

TypeConstr = (function() {
  function TypeConstr(name, kind) {
    this.name = name;
    this.kind = kind;
    this.TypeConstr = true;
  }

  return TypeConstr;

})();

TypeApp = (function() {
  function TypeApp(op, arg) {
    this.op = op;
    this.arg = arg;
    this.TypeApp = true;
  }

  return TypeApp;

})();

QuantifiedVar = (function() {
  function QuantifiedVar(_var) {
    this["var"] = _var;
    this.QuantifiedVar = true;
  }

  return QuantifiedVar;

})();

ForAll = (function() {
  function ForAll(kinds, type) {
    this.kinds = kinds;
    this.type = type;
    this.ForAll = true;
  }

  return ForAll;

})();

TempType = (function() {
  function TempType(type) {
    this.type = type;
    this.TempType = true;
  }

  return TempType;

})();

Types = (function() {
  function Types(types) {
    this.types = types;
    this.Types = true;
  }

  return Types;

})();

Constrained = (function() {
  function Constrained(constraints, type) {
    this.constraints = constraints;
    this.type = type;
    this.Constrained = true;
  }

  return Constrained;

})();

ClassConstraint = (function() {
  function ClassConstraint(className, types) {
    this.className = className;
    this.types = types;
    this.ClassConstraint = true;
  }

  return ClassConstraint;

})();

addConstraints = function(_arg, addedConstraints) {
  var constraints, type;
  constraints = _arg.constraints, type = _arg.type;
  return new Constrained(join(constraints, addedConstraints), type);
};

replaceConstraints = function(_arg, constraints) {
  var type;
  type = _arg.type;
  return new Constrained(constraints, type);
};

toConstrained = function(type) {
  return new Constrained([], type);
};

toForAll = function(type) {
  return new ForAll([], substitute(newMap(), type));
};

quantifyAll = function(type) {
  return quantify(findFree(type), type);
};

quantify = function(vars, type) {
  var kinds, polymorphicVars, quantifiedVars, varIndex;
  polymorphicVars = filterMap((function(name) {
    return inSet(vars, name);
  }), findFree(type));
  kinds = mapToArray(polymorphicVars);
  varIndex = 0;
  quantifiedVars = mapMap((function() {
    return new QuantifiedVar(varIndex++);
  }), polymorphicVars);
  return new ForAll(kinds, substitute(quantifiedVars, type));
};

star = '*';

arrowType = new TypeConstr('Fn', kindFn(2));

zeroArrowType = new TypeConstr('Fn0', kindFn(1));

arrayType = new TypeConstr('Array', kindFn(1));

listType = new TypeConstr('List', kindFn(1));

hashmapType = new TypeConstr('Map', kindFn(2));

hashsetType = new TypeConstr('Set', kindFn(1));

stringType = typeConstant('String');

charType = typeConstant('Char');

boolType = typeConstant('Bool');

numType = typeConstant('Num');

regexType = typeConstant('Regex');

jsType = typeConstant('Js');

expressionType = typeConstant('Expression');

safePrintType = function(type) {
  var e;
  try {
    return printType(type);
  } catch (_error) {
    e = _error;
    return "" + type;
  }
};

prettyPrintForError = function(type) {
  var e;
  try {
    return "<code>" + (prettyPrint(type)) + "</code>";
  } catch (_error) {
    e = _error;
    return "" + type;
  }
};

highlightTypeForError = function(type) {
  return "<code>" + (collapse(toHtml(type))) + "</code>";
};

prettyPrint = function(type) {
  return prettyPrintWith(printTypeToHtml, type);
};

plainPrettyPrint = function(type) {
  return prettyPrintWith(printType, type);
};

prettyPrintWith = function(printer, type) {
  if (type.ForAll) {
    return prettyPrintWith(printer, forallToHumanReadable(type));
  } else if (type.Constrained) {
    if (_notEmpty(type.constraints)) {
      return (map(printer, join([type.type], type.constraints))).join(' ');
    } else {
      return printer(type.type);
    }
  } else {
    return printer(type);
  }
};

_fakeContext = void 0;

fakeContext = function() {
  return _fakeContext || (_fakeContext = new Context);
};

forallToHumanReadable = function(type) {
  var allVars, c, constrained, constraining, constrainingGroups, constrainingVars, filtered, group, index, newVar, nextConstrainingName, nextSimpleName, notConstrained, simple, sub, toDependent, _j, _len1, _name, _ref1;
  notConstrained = function(type) {
    if (type.Types && type.types.length > 1) {
      return mapMap((function() {
        return findFreeInList(type.types.slice(1));
      }), notConstrained(type.types[0]));
    } else if (type.TypeVariable) {
      return newSetWith(type.name);
    } else if (type.TypeApp) {
      return notConstrained(type.op);
    } else {
      return newSet();
    }
  };
  _name = function(_arg) {
    var name;
    name = _arg.name;
    return name;
  };
  toDependent = function(name, deps) {
    return {
      name: name,
      deps: map((function(name) {
        return {
          name: name
        };
      }), setToArray(deps))
    };
  };
  constrained = freshInstance(fakeContext(), type);
  allVars = findFree(constrained);
  constrainingVars = concatMaps.apply(null, (function() {
    var _j, _len1, _ref1, _results;
    _ref1 = constrained.constraints;
    _results = [];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      c = _ref1[_j];
      _results.push(notConstrained(c.types));
    }
    return _results;
  })());
  constrainingGroups = topologicallySortedGroups(mapToArrayVia(toDependent, constrainingVars));
  _ref1 = partitionMap((function(_, name) {
    return inSet(constrainingVars, name);
  }), allVars), constraining = _ref1[0], simple = _ref1[1];
  index = 0;
  newVar = function(name) {
    return new TypeVariable(name, star);
  };
  nextSimpleName = function() {
    return String.fromCharCode(97 + index++ % 25);
  };
  sub = mapKeys(__(newVar, nextSimpleName), simple);
  nextConstrainingName = function(name) {
    var dependent, suffix;
    if (name !== 'undefined') {
      dependent = setToArray(lookupInMap(constrainingVars, name));
      suffix = (map((function(name) {
        return (lookupInMap(sub, name)).name;
      }), dependent)).join('');
      return nextSimpleName() + (suffix ? "-" + suffix : '');
    }
  };
  for (_j = 0, _len1 = constrainingGroups.length; _j < _len1; _j++) {
    group = constrainingGroups[_j];
    filtered = filterSet((function(name) {
      return inSet(constrainingVars, name);
    }), group);
    sub = concatMaps(sub, mapKeys(__(newVar, nextConstrainingName), filtered));
  }
  return substitute(sub, constrained);
};

printType = function(type) {
  if (type.TypeVariable) {
    if (type.ref.val) {
      return printType(type.ref.val);
    } else {
      if (/^[0-9]/.test(type.name)) {
        return niceName(type.name);
      } else {
        return "" + type.name;
      }
    }
  } else if (type.QuantifiedVar) {
    return niceName(type["var"]);
  } else if (type.TypeConstr) {
    return "" + type.name;
  } else if (type.TypeApp) {
    return flattenType(collectArgs(type));
  } else if (type.ForAll) {
    return "(∀ " + (printType(type.type)) + ")";
  } else if (type.ClassConstraint) {
    return "(" + type.className + " " + ((map(printType, type.types.types)).join(' ')) + ")";
  } else if (type.Constrained) {
    return "(: " + ((map(printType, join([type.type], type.constraints))).join(' ')) + ")";
  } else if (type.TempType) {
    return "(. " + (printType(type.type)) + ")";
  } else if (type.Types) {
    return (map(printType, type.types)).join(' ');
  } else if (Array.isArray(type)) {
    return "\"" + (listOf(type)) + "\"";
  } else if (type === void 0) {
    return "undefined";
  } else {
    throw new Error("Unrecognized type in printType");
  }
};

printTypes = function(list) {
  return map(printType, list);
};

printTypeToHtml = function(type) {
  var flatenned;
  if (type.TypeVariable) {
    if (type.ref.val) {
      return printTypeToHtml(type.ref.val);
    } else {
      return kindedToHtml(type, /^[0-9]/.test(type.name) ? niceName(type.name) : "" + type.name);
    }
  } else if (type.QuantifiedVar) {
    return themize((type.error ? 'malformed' : 'typename'), niceName(type["var"]));
  } else if (type.TypeConstr) {
    return kindedToHtml(type, type.name);
  } else if (type.TypeApp) {
    flatenned = flatten(type);
    return printFlattenedToHtml(flatenned);
  } else if (type.ClassConstraint) {
    return htmlCalled(type, "" + (opNameToHtml(type.className)) + " " + ((map(printTypeToHtml, type.types.types)).join(' ')));
  } else if (type.Constrained) {
    return htmlCalled(type, ": " + ((map(printTypeToHtml, join([type.type], type.constraints))).join(' ')));
  } else if (type.args) {
    return printFlattenedToHtml(type);
  } else {
    throw new Error("Unrecognized type in printTypeToHtml");
  }
};

printFlattenedToHtml = function(type) {
  var opName, printedOp;
  printedOp = printType(type.op);
  if ((printType(type.op)).match(/^\[\d+\]$/)) {
    return htmlDelimited(type, '[', ']', "" + ((map(printTypeToHtml, type.args)).join(' ')));
  } else {
    opName = printedOp === 'Fn0' ? opNameToHtml('Fn') : printTypeToHtml(type.op);
    return htmlCalled(type, "" + opName + " " + ((map(printTypeToHtml, type.args)).join(' ')));
  }
};

htmlCalled = function(type, string) {
  return htmlDelimited(type, '(', ')', string);
};

htmlDelimited = function(type, open, close, string) {
  var label;
  label = type.error ? 'malformed' : 'paren';
  return (themize(label, open)) + string + (themize(label, close));
};

flatten = function(type) {
  var arg, op;
  if (type.TypeApp) {
    op = flatten(type.op);
    arg = flatten(type.arg);
    if (op.args && arg.op && op.op.name === 'Fn' && arg.op.name === 'Fn') {
      return {
        op: op.op,
        args: join(op.args, arg.args),
        error: type.error || arg.error
      };
    } else if (op.args) {
      return {
        op: op.op,
        args: join(op.args, [arg]),
        error: type.error || op.error
      };
    } else {
      return {
        op: op,
        args: [arg],
        error: type.error
      };
    }
  } else {
    return type;
  }
};

kindedToHtml = function(type, name) {
  return themize((type.error ? 'malformed' : (kind(type)).from ? 'operator' : 'typename'), name);
};

opNameToHtml = function(name) {
  return themize('operator', "" + name);
};

collectArgs = function(type) {
  var arg, op;
  if (type.TypeVariable && type.ref.val) {
    return collectArgs(type.ref.val);
  } else if (type.TypeApp) {
    op = collectArgs(type.op);
    arg = collectArgs(type.arg);
    if ((Array.isArray(op)) && (Array.isArray(arg)) && op[0] === 'Fn' && arg[0] === 'Fn') {
      return join(op, arg.slice(1));
    } else {
      return join((Array.isArray(op) ? op : [op]), [Array.isArray(arg) ? flattenType(arg) : arg]);
    }
  } else {
    return printType(type);
  }
};

flattenType = function(types) {
  if (types[0].match(/^\[\d+\]$/)) {
    return "[" + (types.slice(1).join(' ')) + "]";
  } else if (types[0] === 'Fn0') {
    return "(Fn " + (types.slice(1).join(' ')) + ")";
  } else {
    return "(" + (types.join(' ')) + ")";
  }
};

library = "var $listize = function (list) {\n  if (list.length === 0) {\n   return {length: 0};\n  }\n  return and_(list[0], $listize(list.slice(1)));\n};\n\nvar and_ = function (x, xs) {\n  if (typeof xs === \"undefined\" || xs === null) {\n    throw new Error('Second argument to & must be a sequence');\n  }\n  if (Immutable.List.isList(xs)) {\n    return xs.unshift(x);\n  }\n  if (Immutable.Set.isSet(xs)) {\n    return xs.add(x);\n  }\n  if (typeof xs == 'string' || xs instanceof String) {\n    if (xs === '' && !(typeof x == 'string' || x instanceof String)) {\n      return [x];\n    } else {\n      return x + xs;\n    }\n  }\n  if (xs.unshift) {\n    return [x].concat(xs);\n  }// cases for other sequences\n  return {\n    head: x,\n    tail: xs\n  };\n};\n\nvar seq_size = function (xs) {\n  if (typeof xs === \"undefined\" || xs === null) {\n    throw new Error('Pattern matching on size of undefined');\n  }\n  if (xs.size !== null) {\n    return xs.size;\n  }\n  if (xs.length !== null) {\n    return xs.length;\n  }\n  return 1 + seq_size(xs.tail);\n};\n\nvar seq_at = function (i, xs) {\n  if (typeof xs === \"undefined\" || xs === null) {\n    throw new Error('Pattern matching required sequence got undefined');\n  }\n  if (Immutable.Iterable.isIterable(xs)) {\n    if (i >= xs.size) {\n      throw new Error('Pattern matching required a list of size at least ' + (i + 1));\n    }\n    return xs.get(i);\n  }\n  if (xs.length !== null) {\n    if (i >= xs.length) {\n      throw new Error('Pattern matching required a list of size at least ' + (i + 1));\n    }\n    return xs[i];\n  }\n  if (i === 0) {\n    return xs.head;\n  }\n  return seq_at(i - 1, xs.tail);\n};\n\nvar seq_splat = function (from, leave, xs) {\n  if (xs.slice) {\n    return xs.slice(from, (xs.size || xs.length) - leave);\n  }\n  return $listSlice(from, seq_size(xs) - leave - from, xs);\n};\n\n// temporary, will be replaced by typed 0-argument function\nvar $empty = function (xs) {\n  if (typeof xs === \"undefined\" || xs === null) {\n    throw new Error('Empty needs a sequence');\n  }\n  if (typeof xs == 'string' || xs instanceof String) {\n    return \"\";\n  }\n  if (xs.unshift) {\n    return [];\n  }\n  if ('length' in xs) {\n    return $listize([]);\n  } // cases for other sequences\n  return {};\n};\n\nvar $listSlice = function (from, n, xs) {\n  if (n === 0) {\n    return $listize([]);\n  }\n  if (from === 0) {\n    return and_(xs.head, $listSlice(from, n - 1, xs.tail));\n  }\n  return $listSlice(from - 1, n, xs.tail);\n};\n\nvar show__list = function (x) {\n  var t = [];\n  while (x.length !== 0) {\n    t.push(x.head);\n    x = x.tail;\n  }\n  return t;\n};\n\nvar is__null__or__undefined = function (jsValue) {\n  return typeof jsValue === \"undefined\" || jsValue === null;\n};" + ((function() {
  var _j, _results;
  _results = [];
  for (i = _j = 1; _j <= 9; i = ++_j) {
    varNames = "abcdefghi".split('');
    first = function(j) {
      return varNames.slice(0, j).join(', ');
    };
    _results.push("var _" + i + " = function (fn, " + (first(i)) + ") {\n  if (fn._ === " + i + " || !fn._ && fn.length === " + i + ") {\n    return fn(" + (first(i)) + ");\n  } else if (fn._ > " + i + " || !fn._ && fn.length > " + i + ") {\n    return function (" + varNames[i] + ") {\n      return _" + (i + 1) + "(fn, " + (first(i + 1)) + ");\n    };\n  } else {\n    return _1(" + (i === 1 ? "fn()" : "_" + (i - 1) + "(fn, " + (first(i - 1)) + ")") + ", " + varNames[i - 1] + ");\n  }\n};");
  }
  return _results;
})()).join('\n\n') + ((function() {
  var _j, _results;
  _results = [];
  for (i = _j = 0; _j <= 9; i = ++_j) {
    _results.push("var λ" + i + " = function (fn) {\n  fn._ = " + i + ";\n  return fn;\n};");
  }
  return _results;
})()).join('\n\n') + "var _0 = function (fn) {\n  if (fn._ === 0 || !fn._ && fn.length === 0) {\n    return fn();\n  } else if (fn._ > 0 || !fn._ && fn.length > 0) {\n    return function (a) {\n      return _1(fn, a);\n    };\n  }\n}\n;\nvar global = (1,eval)('this');\nvar Shem = Shem || {};";

eval(library);

immutable = "/**\n *  Copyright (c) 2014-2015, Facebook, Inc.\n *  All rights reserved.\n *\n *  This source code is licensed under the BSD-style license found in the\n *  LICENSE file in the root directory of this source tree. An additional grant\n *  of patent rights can be found in the PATENTS file in the same directory.\n *\n * I removed the loader code for nodejs and amd because it was clashing with require js for now\n * I also changed context to window, to make sure it registers when evaling\n */\n!function(t,e){global.Immutable=e()}(this,function(){\"use strict\";function t(t,e){e&&(t.prototype=Object.create(e.prototype)),t.prototype.constructor=t}function e(t){return t.value=!1,t}function r(t){t&&(t.value=!0)}function n(){}function i(t,e){e=e||0;for(var r=Math.max(0,t.length-e),n=Array(r),i=0;r>i;i++)n[i]=t[i+e];return n}function o(t){return void 0===t.size&&(t.size=t.__iterate(s)),t.size}function u(t,e){return e>=0?+e:o(t)+ +e}function s(){return!0}function a(t,e,r){return(0===t||void 0!==r&&-r>=t)&&(void 0===e||void 0!==r&&e>=r)}function h(t,e){return c(t,e,0)}function f(t,e){return c(t,e,e)}function c(t,e,r){return void 0===t?r:0>t?Math.max(0,e+t):void 0===e?t:Math.min(e,t)}function _(t){return y(t)?t:O(t)}function p(t){return d(t)?t:x(t)}function v(t){return m(t)?t:k(t)}function l(t){return y(t)&&!g(t)?t:A(t)}function y(t){return!(!t||!t[vr])}function d(t){return!(!t||!t[lr])}function m(t){return!(!t||!t[yr])}function g(t){return d(t)||m(t)}function w(t){return!(!t||!t[dr])}function S(t){this.next=t}function z(t,e,r,n){var i=0===t?e:1===t?r:[e,r];return n?n.value=i:n={value:i,done:!1},n}function I(){return{value:void 0,done:!0}}function b(t){return!!M(t)}function q(t){return t&&\"function\"==typeof t.next}function D(t){var e=M(t);return e&&e.call(t)}function M(t){var e=t&&(Sr&&t[Sr]||t[zr]);return\"function\"==typeof e?e:void 0}function E(t){return t&&\"number\"==typeof t.length}function O(t){return null===t||void 0===t?T():y(t)?t.toSeq():C(t)}function x(t){return null===t||void 0===t?T().toKeyedSeq():y(t)?d(t)?t.toSeq():t.fromEntrySeq():W(t)}function k(t){return null===t||void 0===t?T():y(t)?d(t)?t.entrySeq():t.toIndexedSeq():B(t)}function A(t){return(null===t||void 0===t?T():y(t)?d(t)?t.entrySeq():t:B(t)).toSetSeq()}function j(t){this._array=t,this.size=t.length}function R(t){var e=Object.keys(t);this._object=t,this._keys=e,this.size=e.length}function U(t){this._iterable=t,this.size=t.length||t.size;}function K(t){this._iterator=t,this._iteratorCache=[]}function L(t){return!(!t||!t[br])}function T(){return qr||(qr=new j([]))}function W(t){var e=Array.isArray(t)?new j(t).fromEntrySeq():q(t)?new K(t).fromEntrySeq():b(t)?new U(t).fromEntrySeq():\"object\"==typeof t?new R(t):void 0;if(!e)throw new TypeError(\"Expected Array or iterable object of [k, v] entries, or keyed object: \"+t);return e}function B(t){var e=J(t);if(!e)throw new TypeError(\"Expected Array or iterable object of values: \"+t);return e}function C(t){var e=J(t)||\"object\"==typeof t&&new R(t);if(!e)throw new TypeError(\"Expected Array or iterable object of values, or keyed object: \"+t);return e}function J(t){return E(t)?new j(t):q(t)?new K(t):b(t)?new U(t):void 0}function P(t,e,r,n){var i=t._cache;if(i){for(var o=i.length-1,u=0;o>=u;u++){var s=i[r?o-u:u];if(e(s[1],n?s[0]:u,t)===!1)return u+1}return u}return t.__iterateUncached(e,r)}function H(t,e,r,n){var i=t._cache;if(i){var o=i.length-1,u=0;return new S(function(){var t=i[r?o-u:u];return u++>o?I():z(e,n?t[0]:u-1,t[1])})}return t.__iteratorUncached(e,r)}function N(){throw TypeError(\"Abstract\")}function V(){}function Y(){}function Q(){}function X(t,e){if(t===e||t!==t&&e!==e)return!0;if(!t||!e)return!1;if(\"function\"==typeof t.valueOf&&\"function\"==typeof e.valueOf){if(t=t.valueOf(),e=e.valueOf(),t===e||t!==t&&e!==e)return!0;if(!t||!e)return!1}return\"function\"==typeof t.equals&&\"function\"==typeof e.equals&&t.equals(e)?!0:!1}function F(t,e){return e?G(e,t,\"\",{\"\":t}):Z(t)}function G(t,e,r,n){return Array.isArray(e)?t.call(n,r,k(e).map(function(r,n){return G(t,r,n,e)})):$(e)?t.call(n,r,x(e).map(function(r,n){return G(t,r,n,e)})):e}function Z(t){return Array.isArray(t)?k(t).map(Z).toList():$(t)?x(t).map(Z).toMap():t}function $(t){return t&&(t.constructor===Object||void 0===t.constructor)}function tt(t){return t>>>1&1073741824|3221225471&t}function et(t){if(t===!1||null===t||void 0===t)return 0;if(\"function\"==typeof t.valueOf&&(t=t.valueOf(),t===!1||null===t||void 0===t))return 0;if(t===!0)return 1;var e=typeof t;if(\"number\"===e){var r=0|t;for(r!==t&&(r^=4294967295*t);t>4294967295;)t/=4294967295,r^=t;return tt(r)}return\"string\"===e?t.length>jr?rt(t):nt(t):\"function\"==typeof t.hashCode?t.hashCode():it(t)}function rt(t){var e=Kr[t];return void 0===e&&(e=nt(t),Ur===Rr&&(Ur=0,Kr={}),Ur++,Kr[t]=e),e}function nt(t){for(var e=0,r=0;t.length>r;r++)e=31*e+t.charCodeAt(r)|0;return tt(e)}function it(t){var e;if(xr&&(e=Dr.get(t),void 0!==e))return e;if(e=t[Ar],void 0!==e)return e;if(!Or){if(e=t.propertyIsEnumerable&&t.propertyIsEnumerable[Ar],void 0!==e)return e;if(e=ot(t),void 0!==e)return e}if(e=++kr,1073741824&kr&&(kr=0),xr)Dr.set(t,e);else{if(void 0!==Er&&Er(t)===!1)throw Error(\"Non-extensible objects are not allowed as keys.\");if(Or)Object.defineProperty(t,Ar,{enumerable:!1,configurable:!1,writable:!1,value:e});else if(void 0!==t.propertyIsEnumerable&&t.propertyIsEnumerable===t.constructor.prototype.propertyIsEnumerable)t.propertyIsEnumerable=function(){return this.constructor.prototype.propertyIsEnumerable.apply(this,arguments)},t.propertyIsEnumerable[Ar]=e;else{if(void 0===t.nodeType)throw Error(\"Unable to set a non-enumerable property on object.\");t[Ar]=e}}return e}function ot(t){if(t&&t.nodeType>0)switch(t.nodeType){case 1:return t.uniqueID;case 9:return t.documentElement&&t.documentElement.uniqueID}}function ut(t,e){if(!t)throw Error(e)}function st(t){ut(t!==1/0,\"Cannot perform this action with an infinite size.\")}function at(t,e){this._iter=t,this._useKeys=e,this.size=t.size}function ht(t){this._iter=t,this.size=t.size}function ft(t){this._iter=t,this.size=t.size}function ct(t){this._iter=t,this.size=t.size}function _t(t){var e=jt(t);return e._iter=t,e.size=t.size,e.flip=function(){return t},e.reverse=function(){var e=t.reverse.apply(this);return e.flip=function(){return t.reverse()},e},e.has=function(e){return t.includes(e)},e.includes=function(e){return t.has(e)},e.cacheResult=Rt,e.__iterateUncached=function(e,r){var n=this;return t.__iterate(function(t,r){return e(r,t,n)!==!1},r)},e.__iteratorUncached=function(e,r){if(e===wr){\nvar n=t.__iterator(e,r);return new S(function(){var t=n.next();if(!t.done){var e=t.value[0];t.value[0]=t.value[1],t.value[1]=e}return t})}return t.__iterator(e===gr?mr:gr,r)},e}function pt(t,e,r){var n=jt(t);return n.size=t.size,n.has=function(e){return t.has(e)},n.get=function(n,i){var o=t.get(n,cr);return o===cr?i:e.call(r,o,n,t)},n.__iterateUncached=function(n,i){var o=this;return t.__iterate(function(t,i,u){return n(e.call(r,t,i,u),i,o)!==!1},i)},n.__iteratorUncached=function(n,i){var o=t.__iterator(wr,i);return new S(function(){var i=o.next();if(i.done)return i;var u=i.value,s=u[0];return z(n,s,e.call(r,u[1],s,t),i)})},n}function vt(t,e){var r=jt(t);return r._iter=t,r.size=t.size,r.reverse=function(){return t},t.flip&&(r.flip=function(){var e=_t(t);return e.reverse=function(){return t.flip()},e}),r.get=function(r,n){return t.get(e?r:-1-r,n)},r.has=function(r){return t.has(e?r:-1-r)},r.includes=function(e){return t.includes(e)},r.cacheResult=Rt,r.__iterate=function(e,r){var n=this;return t.__iterate(function(t,r){return e(t,r,n)},!r)},r.__iterator=function(e,r){return t.__iterator(e,!r)},r}function lt(t,e,r,n){var i=jt(t);return n&&(i.has=function(n){var i=t.get(n,cr);return i!==cr&&!!e.call(r,i,n,t)},i.get=function(n,i){var o=t.get(n,cr);return o!==cr&&e.call(r,o,n,t)?o:i}),i.__iterateUncached=function(i,o){var u=this,s=0;return t.__iterate(function(t,o,a){return e.call(r,t,o,a)?(s++,i(t,n?o:s-1,u)):void 0},o),s},i.__iteratorUncached=function(i,o){var u=t.__iterator(wr,o),s=0;return new S(function(){for(;;){var o=u.next();if(o.done)return o;var a=o.value,h=a[0],f=a[1];if(e.call(r,f,h,t))return z(i,n?h:s++,f,o)}})},i}function yt(t,e,r){var n=Lt().asMutable();return t.__iterate(function(i,o){n.update(e.call(r,i,o,t),0,function(t){return t+1})}),n.asImmutable()}function dt(t,e,r){var n=d(t),i=(w(t)?Ie():Lt()).asMutable();t.__iterate(function(o,u){i.update(e.call(r,o,u,t),function(t){return t=t||[],t.push(n?[u,o]:o),t})});var o=At(t);return i.map(function(e){return Ot(t,o(e))})}function mt(t,e,r,n){var i=t.size;if(a(e,r,i))return t;var o=h(e,i),s=f(r,i);if(o!==o||s!==s)return mt(t.toSeq().cacheResult(),e,r,n);var c=s-o;0>c&&(c=0);var _=jt(t);return _.size=0===c?c:t.size&&c||void 0,!n&&L(t)&&c>=0&&(_.get=function(e,r){return e=u(this,e),e>=0&&c>e?t.get(e+o,r):r}),_.__iterateUncached=function(e,r){var i=this;if(0===c)return 0;if(r)return this.cacheResult().__iterate(e,r);var u=0,s=!0,a=0;return t.__iterate(function(t,r){return s&&(s=u++<o)?void 0:(a++,e(t,n?r:a-1,i)!==!1&&a!==c)}),a},_.__iteratorUncached=function(e,r){if(c&&r)return this.cacheResult().__iterator(e,r);var i=c&&t.__iterator(e,r),u=0,s=0;return new S(function(){for(;u++<o;)i.next();if(++s>c)return I();var t=i.next();return n||e===gr?t:e===mr?z(e,s-1,void 0,t):z(e,s-1,t.value[1],t)})},_}function gt(t,e,r){var n=jt(t);return n.__iterateUncached=function(n,i){var o=this;if(i)return this.cacheResult().__iterate(n,i);var u=0;return t.__iterate(function(t,i,s){return e.call(r,t,i,s)&&++u&&n(t,i,o)}),u},n.__iteratorUncached=function(n,i){var o=this;if(i)return this.cacheResult().__iterator(n,i);var u=t.__iterator(wr,i),s=!0;return new S(function(){if(!s)return I();var t=u.next();if(t.done)return t;var i=t.value,a=i[0],h=i[1];return e.call(r,h,a,o)?n===wr?t:z(n,a,h,t):(s=!1,I())})},n}function wt(t,e,r,n){var i=jt(t);return i.__iterateUncached=function(i,o){var u=this;if(o)return this.cacheResult().__iterate(i,o);var s=!0,a=0;return t.__iterate(function(t,o,h){return s&&(s=e.call(r,t,o,h))?void 0:(a++,i(t,n?o:a-1,u))}),a},i.__iteratorUncached=function(i,o){var u=this;if(o)return this.cacheResult().__iterator(i,o);var s=t.__iterator(wr,o),a=!0,h=0;return new S(function(){var t,o,f;do{if(t=s.next(),t.done)return n||i===gr?t:i===mr?z(i,h++,void 0,t):z(i,h++,t.value[1],t);var c=t.value;o=c[0],f=c[1],a&&(a=e.call(r,f,o,u))}while(a);return i===wr?t:z(i,o,f,t)})},i}function St(t,e){var r=d(t),n=[t].concat(e).map(function(t){return y(t)?r&&(t=p(t)):t=r?W(t):B(Array.isArray(t)?t:[t]),t}).filter(function(t){return 0!==t.size});if(0===n.length)return t;if(1===n.length){var i=n[0];if(i===t||r&&d(i)||m(t)&&m(i))return i;}var o=new j(n);return r?o=o.toKeyedSeq():m(t)||(o=o.toSetSeq()),o=o.flatten(!0),o.size=n.reduce(function(t,e){if(void 0!==t){var r=e.size;if(void 0!==r)return t+r}},0),o}function zt(t,e,r){var n=jt(t);return n.__iterateUncached=function(n,i){function o(t,a){var h=this;t.__iterate(function(t,i){return(!e||e>a)&&y(t)?o(t,a+1):n(t,r?i:u++,h)===!1&&(s=!0),!s},i)}var u=0,s=!1;return o(t,0),u},n.__iteratorUncached=function(n,i){var o=t.__iterator(n,i),u=[],s=0;return new S(function(){for(;o;){var t=o.next();if(t.done===!1){var a=t.value;if(n===wr&&(a=a[1]),e&&!(e>u.length)||!y(a))return r?t:z(n,s++,a,t);u.push(o),o=a.__iterator(n,i)}else o=u.pop()}return I()})},n}function It(t,e,r){var n=At(t);return t.toSeq().map(function(i,o){return n(e.call(r,i,o,t))}).flatten(!0)}function bt(t,e){var r=jt(t);return r.size=t.size&&2*t.size-1,r.__iterateUncached=function(r,n){var i=this,o=0;return t.__iterate(function(t){return(!o||r(e,o++,i)!==!1)&&r(t,o++,i)!==!1},n),o},r.__iteratorUncached=function(r,n){var i,o=t.__iterator(gr,n),u=0;return new S(function(){return(!i||u%2)&&(i=o.next(),i.done)?i:u%2?z(r,u++,e):z(r,u++,i.value,i)})},r}function qt(t,e,r){e||(e=Ut);var n=d(t),i=0,o=t.toSeq().map(function(e,n){return[n,e,i++,r?r(e,n,t):e]}).toArray();return o.sort(function(t,r){return e(t[3],r[3])||t[2]-r[2]}).forEach(n?function(t,e){o[e].length=2}:function(t,e){o[e]=t[1]}),n?x(o):m(t)?k(o):A(o)}function Dt(t,e,r){if(e||(e=Ut),r){var n=t.toSeq().map(function(e,n){return[e,r(e,n,t)]}).reduce(function(t,r){return Mt(e,t[1],r[1])?r:t});return n&&n[0]}return t.reduce(function(t,r){return Mt(e,t,r)?r:t})}function Mt(t,e,r){var n=t(r,e);return 0===n&&r!==e&&(void 0===r||null===r||r!==r)||n>0}function Et(t,e,r){var n=jt(t);return n.size=new j(r).map(function(t){return t.size}).min(),n.__iterate=function(t,e){for(var r,n=this.__iterator(gr,e),i=0;!(r=n.next()).done&&t(r.value,i++,this)!==!1;);return i},n.__iteratorUncached=function(t,n){var i=r.map(function(t){return t=_(t),D(n?t.reverse():t)}),o=0,u=!1;return new S(function(){var r;return u||(r=i.map(function(t){\nreturn t.next()}),u=r.some(function(t){return t.done})),u?I():z(t,o++,e.apply(null,r.map(function(t){return t.value})))})},n}function Ot(t,e){return L(t)?e:t.constructor(e)}function xt(t){if(t!==Object(t))throw new TypeError(\"Expected [K, V] tuple: \"+t)}function kt(t){return st(t.size),o(t)}function At(t){return d(t)?p:m(t)?v:l}function jt(t){return Object.create((d(t)?x:m(t)?k:A).prototype)}function Rt(){return this._iter.cacheResult?(this._iter.cacheResult(),this.size=this._iter.size,this):O.prototype.cacheResult.call(this)}function Ut(t,e){return t>e?1:e>t?-1:0}function Kt(t){var e=D(t);if(!e){if(!E(t))throw new TypeError(\"Expected iterable or array-like: \"+t);e=D(_(t))}return e}function Lt(t){return null===t||void 0===t?Qt():Tt(t)?t:Qt().withMutations(function(e){var r=p(t);st(r.size),r.forEach(function(t,r){return e.set(r,t)})})}function Tt(t){return!(!t||!t[Lr])}function Wt(t,e){this.ownerID=t,this.entries=e}function Bt(t,e,r){this.ownerID=t,this.bitmap=e,this.nodes=r}function Ct(t,e,r){this.ownerID=t,this.count=e,this.nodes=r}function Jt(t,e,r){this.ownerID=t,this.keyHash=e,this.entries=r}function Pt(t,e,r){this.ownerID=t,this.keyHash=e,this.entry=r}function Ht(t,e,r){this._type=e,this._reverse=r,this._stack=t._root&&Vt(t._root)}function Nt(t,e){return z(t,e[0],e[1])}function Vt(t,e){return{node:t,index:0,__prev:e}}function Yt(t,e,r,n){var i=Object.create(Tr);return i.size=t,i._root=e,i.__ownerID=r,i.__hash=n,i.__altered=!1,i}function Qt(){return Wr||(Wr=Yt(0))}function Xt(t,r,n){var i,o;if(t._root){var u=e(_r),s=e(pr);if(i=Ft(t._root,t.__ownerID,0,void 0,r,n,u,s),!s.value)return t;o=t.size+(u.value?n===cr?-1:1:0)}else{if(n===cr)return t;o=1,i=new Wt(t.__ownerID,[[r,n]])}return t.__ownerID?(t.size=o,t._root=i,t.__hash=void 0,t.__altered=!0,t):i?Yt(o,i):Qt()}function Ft(t,e,n,i,o,u,s,a){return t?t.update(e,n,i,o,u,s,a):u===cr?t:(r(a),r(s),new Pt(e,i,[o,u]))}function Gt(t){return t.constructor===Pt||t.constructor===Jt}function Zt(t,e,r,n,i){if(t.keyHash===n)return new Jt(e,n,[t.entry,i]);var o,u=(0===r?t.keyHash:t.keyHash>>>r)&fr,s=(0===r?n:n>>>r)&fr,a=u===s?[Zt(t,e,r+ar,n,i)]:(o=new Pt(e,n,i),\ns>u?[t,o]:[o,t]);return new Bt(e,1<<u|1<<s,a)}function $t(t,e,r,i){t||(t=new n);for(var o=new Pt(t,et(r),[r,i]),u=0;e.length>u;u++){var s=e[u];o=o.update(t,0,void 0,s[0],s[1])}return o}function te(t,e,r,n){for(var i=0,o=0,u=Array(r),s=0,a=1,h=e.length;h>s;s++,a<<=1){var f=e[s];void 0!==f&&s!==n&&(i|=a,u[o++]=f)}return new Bt(t,i,u)}function ee(t,e,r,n,i){for(var o=0,u=Array(hr),s=0;0!==r;s++,r>>>=1)u[s]=1&r?e[o++]:void 0;return u[n]=i,new Ct(t,o+1,u)}function re(t,e,r){for(var n=[],i=0;r.length>i;i++){var o=r[i],u=p(o);y(o)||(u=u.map(function(t){return F(t)})),n.push(u)}return ie(t,e,n)}function ne(t){return function(e,r,n){return e&&e.mergeDeepWith&&y(r)?e.mergeDeepWith(t,r):t?t(e,r,n):r}}function ie(t,e,r){return r=r.filter(function(t){return 0!==t.size}),0===r.length?t:0!==t.size||t.__ownerID||1!==r.length?t.withMutations(function(t){for(var n=e?function(r,n){t.update(n,cr,function(t){return t===cr?r:e(t,r,n)})}:function(e,r){t.set(r,e)},i=0;r.length>i;i++)r[i].forEach(n)}):t.constructor(r[0])}function oe(t,e,r,n){var i=t===cr,o=e.next();if(o.done){var u=i?r:t,s=n(u);return s===u?t:s}ut(i||t&&t.set,\"invalid keyPath\");var a=o.value,h=i?cr:t.get(a,cr),f=oe(h,e,r,n);return f===h?t:f===cr?t.remove(a):(i?Qt():t).set(a,f)}function ue(t){return t-=t>>1&1431655765,t=(858993459&t)+(t>>2&858993459),t=t+(t>>4)&252645135,t+=t>>8,t+=t>>16,127&t}function se(t,e,r,n){var o=n?t:i(t);return o[e]=r,o}function ae(t,e,r,n){var i=t.length+1;if(n&&e+1===i)return t[e]=r,t;for(var o=Array(i),u=0,s=0;i>s;s++)s===e?(o[s]=r,u=-1):o[s]=t[s+u];return o}function he(t,e,r){var n=t.length-1;if(r&&e===n)return t.pop(),t;for(var i=Array(n),o=0,u=0;n>u;u++)u===e&&(o=1),i[u]=t[u+o];return i}function fe(t){var e=le();if(null===t||void 0===t)return e;if(ce(t))return t;var r=v(t),n=r.size;return 0===n?e:(st(n),n>0&&hr>n?ve(0,n,ar,null,new _e(r.toArray())):e.withMutations(function(t){t.setSize(n),r.forEach(function(e,r){return t.set(r,e)})}))}function ce(t){return!(!t||!t[Pr])}function _e(t,e){this.array=t,this.ownerID=e}function pe(t,e){function r(t,e,r){\nreturn 0===e?n(t,r):i(t,e,r)}function n(t,r){var n=r===s?a&&a.array:t&&t.array,i=r>o?0:o-r,h=u-r;return h>hr&&(h=hr),function(){if(i===h)return Vr;var t=e?--h:i++;return n&&n[t]}}function i(t,n,i){var s,a=t&&t.array,h=i>o?0:o-i>>n,f=(u-i>>n)+1;return f>hr&&(f=hr),function(){for(;;){if(s){var t=s();if(t!==Vr)return t;s=null}if(h===f)return Vr;var o=e?--f:h++;s=r(a&&a[o],n-ar,i+(o<<n))}}}var o=t._origin,u=t._capacity,s=ze(u),a=t._tail;return r(t._root,t._level,0)}function ve(t,e,r,n,i,o,u){var s=Object.create(Hr);return s.size=e-t,s._origin=t,s._capacity=e,s._level=r,s._root=n,s._tail=i,s.__ownerID=o,s.__hash=u,s.__altered=!1,s}function le(){return Nr||(Nr=ve(0,0,ar))}function ye(t,r,n){if(r=u(t,r),r>=t.size||0>r)return t.withMutations(function(t){0>r?we(t,r).set(0,n):we(t,0,r+1).set(r,n)});r+=t._origin;var i=t._tail,o=t._root,s=e(pr);return r>=ze(t._capacity)?i=de(i,t.__ownerID,0,r,n,s):o=de(o,t.__ownerID,t._level,r,n,s),s.value?t.__ownerID?(t._root=o,t._tail=i,t.__hash=void 0,t.__altered=!0,t):ve(t._origin,t._capacity,t._level,o,i):t}function de(t,e,n,i,o,u){var s=i>>>n&fr,a=t&&t.array.length>s;if(!a&&void 0===o)return t;var h;if(n>0){var f=t&&t.array[s],c=de(f,e,n-ar,i,o,u);return c===f?t:(h=me(t,e),h.array[s]=c,h)}return a&&t.array[s]===o?t:(r(u),h=me(t,e),void 0===o&&s===h.array.length-1?h.array.pop():h.array[s]=o,h)}function me(t,e){return e&&t&&e===t.ownerID?t:new _e(t?t.array.slice():[],e)}function ge(t,e){if(e>=ze(t._capacity))return t._tail;if(1<<t._level+ar>e){for(var r=t._root,n=t._level;r&&n>0;)r=r.array[e>>>n&fr],n-=ar;return r}}function we(t,e,r){var i=t.__ownerID||new n,o=t._origin,u=t._capacity,s=o+e,a=void 0===r?u:0>r?u+r:o+r;if(s===o&&a===u)return t;if(s>=a)return t.clear();for(var h=t._level,f=t._root,c=0;0>s+c;)f=new _e(f&&f.array.length?[void 0,f]:[],i),h+=ar,c+=1<<h;c&&(s+=c,o+=c,a+=c,u+=c);for(var _=ze(u),p=ze(a);p>=1<<h+ar;)f=new _e(f&&f.array.length?[f]:[],i),h+=ar;var v=t._tail,l=_>p?ge(t,a-1):p>_?new _e([],i):v;if(v&&p>_&&u>s&&v.array.length){f=me(f,i);for(var y=f,d=h;d>ar;d-=ar){var m=_>>>d&fr;y=y.array[m]=me(y.array[m],i)}y.array[_>>>ar&fr]=v}if(u>a&&(l=l&&l.removeAfter(i,0,a)),s>=p)s-=p,a-=p,h=ar,f=null,l=l&&l.removeBefore(i,0,s);else if(s>o||_>p){for(c=0;f;){var g=s>>>h&fr;if(g!==p>>>h&fr)break;g&&(c+=(1<<h)*g),h-=ar,f=f.array[g]}f&&s>o&&(f=f.removeBefore(i,h,s-c)),f&&_>p&&(f=f.removeAfter(i,h,p-c)),c&&(s-=c,a-=c)}return t.__ownerID?(t.size=a-s,t._origin=s,t._capacity=a,t._level=h,t._root=f,t._tail=l,t.__hash=void 0,t.__altered=!0,t):ve(s,a,h,f,l)}function Se(t,e,r){for(var n=[],i=0,o=0;r.length>o;o++){var u=r[o],s=v(u);s.size>i&&(i=s.size),y(u)||(s=s.map(function(t){return F(t)})),n.push(s)}return i>t.size&&(t=t.setSize(i)),ie(t,e,n)}function ze(t){return hr>t?0:t-1>>>ar<<ar}function Ie(t){return null===t||void 0===t?De():be(t)?t:De().withMutations(function(e){var r=p(t);st(r.size),r.forEach(function(t,r){return e.set(r,t)})})}function be(t){return Tt(t)&&w(t)}function qe(t,e,r,n){var i=Object.create(Ie.prototype);return i.size=t?t.size:0,i._map=t,i._list=e,i.__ownerID=r,i.__hash=n,i}function De(){return Yr||(Yr=qe(Qt(),le()))}function Me(t,e,r){var n,i,o=t._map,u=t._list,s=o.get(e),a=void 0!==s;if(r===cr){if(!a)return t;u.size>=hr&&u.size>=2*o.size?(i=u.filter(function(t,e){return void 0!==t&&s!==e}),n=i.toKeyedSeq().map(function(t){return t[0]}).flip().toMap(),t.__ownerID&&(n.__ownerID=i.__ownerID=t.__ownerID)):(n=o.remove(e),i=s===u.size-1?u.pop():u.set(s,void 0))}else if(a){if(r===u.get(s)[1])return t;n=o,i=u.set(s,[e,r])}else n=o.set(e,u.size),i=u.set(u.size,[e,r]);return t.__ownerID?(t.size=n.size,t._map=n,t._list=i,t.__hash=void 0,t):qe(n,i)}function Ee(t){return null===t||void 0===t?ke():Oe(t)?t:ke().unshiftAll(t)}function Oe(t){return!(!t||!t[Qr])}function xe(t,e,r,n){var i=Object.create(Xr);return i.size=t,i._head=e,i.__ownerID=r,i.__hash=n,i.__altered=!1,i}function ke(){return Fr||(Fr=xe(0))}function Ae(t){return null===t||void 0===t?Ke():je(t)?t:Ke().withMutations(function(e){var r=l(t);st(r.size),r.forEach(function(t){return e.add(t)})})}function je(t){return!(!t||!t[Gr])}function Re(t,e){\nreturn t.__ownerID?(t.size=e.size,t._map=e,t):e===t._map?t:0===e.size?t.__empty():t.__make(e)}function Ue(t,e){var r=Object.create(Zr);return r.size=t?t.size:0,r._map=t,r.__ownerID=e,r}function Ke(){return $r||($r=Ue(Qt()))}function Le(t){return null===t||void 0===t?Be():Te(t)?t:Be().withMutations(function(e){var r=l(t);st(r.size),r.forEach(function(t){return e.add(t)})})}function Te(t){return je(t)&&w(t)}function We(t,e){var r=Object.create(tn);return r.size=t?t.size:0,r._map=t,r.__ownerID=e,r}function Be(){return en||(en=We(De()))}function Ce(t,e){var r,n=function(o){if(o instanceof n)return o;if(!(this instanceof n))return new n(o);if(!r){r=!0;var u=Object.keys(t);He(i,u),i.size=u.length,i._name=e,i._keys=u,i._defaultValues=t}this._map=Lt(o)},i=n.prototype=Object.create(rn);return i.constructor=n,n}function Je(t,e,r){var n=Object.create(Object.getPrototypeOf(t));return n._map=e,n.__ownerID=r,n}function Pe(t){return t._name||t.constructor.name||\"Record\"}function He(t,e){try{e.forEach(Ne.bind(void 0,t))}catch(r){}}function Ne(t,e){Object.defineProperty(t,e,{get:function(){return this.get(e)},set:function(t){ut(this.__ownerID,\"Cannot set on an immutable record.\"),this.set(e,t)}})}function Ve(t,e){if(t===e)return!0;if(!y(e)||void 0!==t.size&&void 0!==e.size&&t.size!==e.size||void 0!==t.__hash&&void 0!==e.__hash&&t.__hash!==e.__hash||d(t)!==d(e)||m(t)!==m(e)||w(t)!==w(e))return!1;if(0===t.size&&0===e.size)return!0;var r=!g(t);if(w(t)){var n=t.entries();return e.every(function(t,e){var i=n.next().value;return i&&X(i[1],t)&&(r||X(i[0],e))})&&n.next().done}var i=!1;if(void 0===t.size)if(void 0===e.size)\"function\"==typeof t.cacheResult&&t.cacheResult();else{i=!0;var o=t;t=e,e=o}var u=!0,s=e.__iterate(function(e,n){return(r?t.has(e):i?X(e,t.get(n,cr)):X(t.get(n,cr),e))?void 0:(u=!1,!1)});return u&&t.size===s}function Ye(t,e,r){if(!(this instanceof Ye))return new Ye(t,e,r);if(ut(0!==r,\"Cannot step a Range by 0\"),t=t||0,void 0===e&&(e=1/0),r=void 0===r?1:Math.abs(r),t>e&&(r=-r),this._start=t,this._end=e,this._step=r,this.size=Math.max(0,Math.ceil((e-t)/r-1)+1),\n0===this.size){if(nn)return nn;nn=this}}function Qe(t,e){if(!(this instanceof Qe))return new Qe(t,e);if(this._value=t,this.size=void 0===e?1/0:Math.max(0,e),0===this.size){if(on)return on;on=this}}function Xe(t,e){var r=function(r){t.prototype[r]=e[r]};return Object.keys(e).forEach(r),Object.getOwnPropertySymbols&&Object.getOwnPropertySymbols(e).forEach(r),t}function Fe(t,e){return e}function Ge(t,e){return[e,t]}function Ze(t){return function(){return!t.apply(this,arguments)}}function $e(t){return function(){return-t.apply(this,arguments)}}function tr(t){return\"string\"==typeof t?JSON.stringify(t):t}function er(){return i(arguments)}function rr(t,e){return e>t?1:t>e?-1:0}function nr(t){if(t.size===1/0)return 0;var e=w(t),r=d(t),n=e?1:0,i=t.__iterate(r?e?function(t,e){n=31*n+or(et(t),et(e))|0}:function(t,e){n=n+or(et(t),et(e))|0}:e?function(t){n=31*n+et(t)|0}:function(t){n=n+et(t)|0});return ir(i,n)}function ir(t,e){return e=Mr(e,3432918353),e=Mr(e<<15|e>>>-15,461845907),e=Mr(e<<13|e>>>-13,5),e=(e+3864292196|0)^t,e=Mr(e^e>>>16,2246822507),e=Mr(e^e>>>13,3266489909),e=tt(e^e>>>16)}function or(t,e){return t^e+2654435769+(t<<6)+(t>>2)|0}var ur=Array.prototype.slice,sr=\"delete\",ar=5,hr=1<<ar,fr=hr-1,cr={},_r={value:!1},pr={value:!1};t(p,_),t(v,_),t(l,_),_.isIterable=y,_.isKeyed=d,_.isIndexed=m,_.isAssociative=g,_.isOrdered=w,_.Keyed=p,_.Indexed=v,_.Set=l;var vr=\"@@__IMMUTABLE_ITERABLE__@@\",lr=\"@@__IMMUTABLE_KEYED__@@\",yr=\"@@__IMMUTABLE_INDEXED__@@\",dr=\"@@__IMMUTABLE_ORDERED__@@\",mr=0,gr=1,wr=2,Sr=\"function\"==typeof Symbol&&Symbol.iterator,zr=\"@@iterator\",Ir=Sr||zr;S.prototype.toString=function(){return\"[Iterator]\"},S.KEYS=mr,S.VALUES=gr,S.ENTRIES=wr,S.prototype.inspect=S.prototype.toSource=function(){return\"\"+this},S.prototype[Ir]=function(){return this},t(O,_),O.of=function(){return O(arguments)},O.prototype.toSeq=function(){return this},O.prototype.toString=function(){return this.__toString(\"Seq {\",\"}\")},O.prototype.cacheResult=function(){return!this._cache&&this.__iterateUncached&&(this._cache=this.entrySeq().toArray(),\nthis.size=this._cache.length),this},O.prototype.__iterate=function(t,e){return P(this,t,e,!0)},O.prototype.__iterator=function(t,e){return H(this,t,e,!0)},t(x,O),x.prototype.toKeyedSeq=function(){return this},t(k,O),k.of=function(){return k(arguments)},k.prototype.toIndexedSeq=function(){return this},k.prototype.toString=function(){return this.__toString(\"Seq [\",\"]\")},k.prototype.__iterate=function(t,e){return P(this,t,e,!1)},k.prototype.__iterator=function(t,e){return H(this,t,e,!1)},t(A,O),A.of=function(){return A(arguments)},A.prototype.toSetSeq=function(){return this},O.isSeq=L,O.Keyed=x,O.Set=A,O.Indexed=k;var br=\"@@__IMMUTABLE_SEQ__@@\";O.prototype[br]=!0,t(j,k),j.prototype.get=function(t,e){return this.has(t)?this._array[u(this,t)]:e},j.prototype.__iterate=function(t,e){for(var r=this._array,n=r.length-1,i=0;n>=i;i++)if(t(r[e?n-i:i],i,this)===!1)return i+1;return i},j.prototype.__iterator=function(t,e){var r=this._array,n=r.length-1,i=0;return new S(function(){return i>n?I():z(t,i,r[e?n-i++:i++])})},t(R,x),R.prototype.get=function(t,e){return void 0===e||this.has(t)?this._object[t]:e},R.prototype.has=function(t){return this._object.hasOwnProperty(t)},R.prototype.__iterate=function(t,e){for(var r=this._object,n=this._keys,i=n.length-1,o=0;i>=o;o++){var u=n[e?i-o:o];if(t(r[u],u,this)===!1)return o+1}return o},R.prototype.__iterator=function(t,e){var r=this._object,n=this._keys,i=n.length-1,o=0;return new S(function(){var u=n[e?i-o:o];return o++>i?I():z(t,u,r[u])})},R.prototype[dr]=!0,t(U,k),U.prototype.__iterateUncached=function(t,e){if(e)return this.cacheResult().__iterate(t,e);var r=this._iterable,n=D(r),i=0;if(q(n))for(var o;!(o=n.next()).done&&t(o.value,i++,this)!==!1;);return i},U.prototype.__iteratorUncached=function(t,e){if(e)return this.cacheResult().__iterator(t,e);var r=this._iterable,n=D(r);if(!q(n))return new S(I);var i=0;return new S(function(){var e=n.next();return e.done?e:z(t,i++,e.value)})},t(K,k),K.prototype.__iterateUncached=function(t,e){if(e)return this.cacheResult().__iterate(t,e);for(var r=this._iterator,n=this._iteratorCache,i=0;n.length>i;)if(t(n[i],i++,this)===!1)return i;for(var o;!(o=r.next()).done;){var u=o.value;if(n[i]=u,t(u,i++,this)===!1)break}return i},K.prototype.__iteratorUncached=function(t,e){if(e)return this.cacheResult().__iterator(t,e);var r=this._iterator,n=this._iteratorCache,i=0;return new S(function(){if(i>=n.length){var e=r.next();if(e.done)return e;n[i]=e.value}return z(t,i,n[i++])})};var qr;t(N,_),t(V,N),t(Y,N),t(Q,N),N.Keyed=V,N.Indexed=Y,N.Set=Q;var Dr,Mr=\"function\"==typeof Math.imul&&-2===Math.imul(4294967295,2)?Math.imul:function(t,e){t=0|t,e=0|e;var r=65535&t,n=65535&e;return r*n+((t>>>16)*n+r*(e>>>16)<<16>>>0)|0},Er=Object.isExtensible,Or=function(){try{return Object.defineProperty({},\"@\",{}),!0}catch(t){return!1}}(),xr=\"function\"==typeof WeakMap;xr&&(Dr=new WeakMap);var kr=0,Ar=\"__immutablehash__\";\"function\"==typeof Symbol&&(Ar=Symbol(Ar));var jr=16,Rr=255,Ur=0,Kr={};t(at,x),at.prototype.get=function(t,e){return this._iter.get(t,e)},at.prototype.has=function(t){return this._iter.has(t)},at.prototype.valueSeq=function(){return this._iter.valueSeq()},at.prototype.reverse=function(){var t=this,e=vt(this,!0);return this._useKeys||(e.valueSeq=function(){return t._iter.toSeq().reverse()}),e},at.prototype.map=function(t,e){var r=this,n=pt(this,t,e);return this._useKeys||(n.valueSeq=function(){return r._iter.toSeq().map(t,e)}),n},at.prototype.__iterate=function(t,e){var r,n=this;return this._iter.__iterate(this._useKeys?function(e,r){return t(e,r,n)}:(r=e?kt(this):0,function(i){return t(i,e?--r:r++,n)}),e)},at.prototype.__iterator=function(t,e){if(this._useKeys)return this._iter.__iterator(t,e);var r=this._iter.__iterator(gr,e),n=e?kt(this):0;return new S(function(){var i=r.next();return i.done?i:z(t,e?--n:n++,i.value,i)})},at.prototype[dr]=!0,t(ht,k),ht.prototype.includes=function(t){return this._iter.includes(t)},ht.prototype.__iterate=function(t,e){var r=this,n=0;return this._iter.__iterate(function(e){return t(e,n++,r)},e)},ht.prototype.__iterator=function(t,e){var r=this._iter.__iterator(gr,e),n=0;return new S(function(){var e=r.next();return e.done?e:z(t,n++,e.value,e);})},t(ft,A),ft.prototype.has=function(t){return this._iter.includes(t)},ft.prototype.__iterate=function(t,e){var r=this;return this._iter.__iterate(function(e){return t(e,e,r)},e)},ft.prototype.__iterator=function(t,e){var r=this._iter.__iterator(gr,e);return new S(function(){var e=r.next();return e.done?e:z(t,e.value,e.value,e)})},t(ct,x),ct.prototype.entrySeq=function(){return this._iter.toSeq()},ct.prototype.__iterate=function(t,e){var r=this;return this._iter.__iterate(function(e){if(e){xt(e);var n=y(e);return t(n?e.get(1):e[1],n?e.get(0):e[0],r)}},e)},ct.prototype.__iterator=function(t,e){var r=this._iter.__iterator(gr,e);return new S(function(){for(;;){var e=r.next();if(e.done)return e;var n=e.value;if(n){xt(n);var i=y(n);return z(t,i?n.get(0):n[0],i?n.get(1):n[1],e)}}})},ht.prototype.cacheResult=at.prototype.cacheResult=ft.prototype.cacheResult=ct.prototype.cacheResult=Rt,t(Lt,V),Lt.prototype.toString=function(){return this.__toString(\"Map {\",\"}\")},Lt.prototype.get=function(t,e){return this._root?this._root.get(0,void 0,t,e):e},Lt.prototype.set=function(t,e){return Xt(this,t,e)},Lt.prototype.setIn=function(t,e){return this.updateIn(t,cr,function(){return e})},Lt.prototype.remove=function(t){return Xt(this,t,cr)},Lt.prototype.deleteIn=function(t){return this.updateIn(t,function(){return cr})},Lt.prototype.update=function(t,e,r){return 1===arguments.length?t(this):this.updateIn([t],e,r)},Lt.prototype.updateIn=function(t,e,r){r||(r=e,e=void 0);var n=oe(this,Kt(t),e,r);return n===cr?void 0:n},Lt.prototype.clear=function(){return 0===this.size?this:this.__ownerID?(this.size=0,this._root=null,this.__hash=void 0,this.__altered=!0,this):Qt()},Lt.prototype.merge=function(){return re(this,void 0,arguments)},Lt.prototype.mergeWith=function(t){var e=ur.call(arguments,1);return re(this,t,e)},Lt.prototype.mergeIn=function(t){var e=ur.call(arguments,1);return this.updateIn(t,Qt(),function(t){return t.merge.apply(t,e)})},Lt.prototype.mergeDeep=function(){return re(this,ne(void 0),arguments)},Lt.prototype.mergeDeepWith=function(t){\nvar e=ur.call(arguments,1);return re(this,ne(t),e)},Lt.prototype.mergeDeepIn=function(t){var e=ur.call(arguments,1);return this.updateIn(t,Qt(),function(t){return t.mergeDeep.apply(t,e)})},Lt.prototype.sort=function(t){return Ie(qt(this,t))},Lt.prototype.sortBy=function(t,e){return Ie(qt(this,e,t))},Lt.prototype.withMutations=function(t){var e=this.asMutable();return t(e),e.wasAltered()?e.__ensureOwner(this.__ownerID):this},Lt.prototype.asMutable=function(){return this.__ownerID?this:this.__ensureOwner(new n)},Lt.prototype.asImmutable=function(){return this.__ensureOwner()},Lt.prototype.wasAltered=function(){return this.__altered},Lt.prototype.__iterator=function(t,e){return new Ht(this,t,e)},Lt.prototype.__iterate=function(t,e){var r=this,n=0;return this._root&&this._root.iterate(function(e){return n++,t(e[1],e[0],r)},e),n},Lt.prototype.__ensureOwner=function(t){return t===this.__ownerID?this:t?Yt(this.size,this._root,t,this.__hash):(this.__ownerID=t,this.__altered=!1,this)},Lt.isMap=Tt;var Lr=\"@@__IMMUTABLE_MAP__@@\",Tr=Lt.prototype;Tr[Lr]=!0,Tr[sr]=Tr.remove,Tr.removeIn=Tr.deleteIn,Wt.prototype.get=function(t,e,r,n){for(var i=this.entries,o=0,u=i.length;u>o;o++)if(X(r,i[o][0]))return i[o][1];return n},Wt.prototype.update=function(t,e,n,o,u,s,a){for(var h=u===cr,f=this.entries,c=0,_=f.length;_>c&&!X(o,f[c][0]);c++);var p=_>c;if(p?f[c][1]===u:h)return this;if(r(a),(h||!p)&&r(s),!h||1!==f.length){if(!p&&!h&&f.length>=Br)return $t(t,f,o,u);var v=t&&t===this.ownerID,l=v?f:i(f);return p?h?c===_-1?l.pop():l[c]=l.pop():l[c]=[o,u]:l.push([o,u]),v?(this.entries=l,this):new Wt(t,l)}},Bt.prototype.get=function(t,e,r,n){void 0===e&&(e=et(r));var i=1<<((0===t?e:e>>>t)&fr),o=this.bitmap;return 0===(o&i)?n:this.nodes[ue(o&i-1)].get(t+ar,e,r,n)},Bt.prototype.update=function(t,e,r,n,i,o,u){void 0===r&&(r=et(n));var s=(0===e?r:r>>>e)&fr,a=1<<s,h=this.bitmap,f=0!==(h&a);if(!f&&i===cr)return this;var c=ue(h&a-1),_=this.nodes,p=f?_[c]:void 0,v=Ft(p,t,e+ar,r,n,i,o,u);if(v===p)return this;if(!f&&v&&_.length>=Cr)return ee(t,_,h,s,v);if(f&&!v&&2===_.length&&Gt(_[1^c]))return _[1^c];if(f&&v&&1===_.length&&Gt(v))return v;var l=t&&t===this.ownerID,y=f?v?h:h^a:h|a,d=f?v?se(_,c,v,l):he(_,c,l):ae(_,c,v,l);return l?(this.bitmap=y,this.nodes=d,this):new Bt(t,y,d)},Ct.prototype.get=function(t,e,r,n){void 0===e&&(e=et(r));var i=(0===t?e:e>>>t)&fr,o=this.nodes[i];return o?o.get(t+ar,e,r,n):n},Ct.prototype.update=function(t,e,r,n,i,o,u){void 0===r&&(r=et(n));var s=(0===e?r:r>>>e)&fr,a=i===cr,h=this.nodes,f=h[s];if(a&&!f)return this;var c=Ft(f,t,e+ar,r,n,i,o,u);if(c===f)return this;var _=this.count;if(f){if(!c&&(_--,Jr>_))return te(t,h,_,s)}else _++;var p=t&&t===this.ownerID,v=se(h,s,c,p);return p?(this.count=_,this.nodes=v,this):new Ct(t,_,v)},Jt.prototype.get=function(t,e,r,n){for(var i=this.entries,o=0,u=i.length;u>o;o++)if(X(r,i[o][0]))return i[o][1];return n},Jt.prototype.update=function(t,e,n,o,u,s,a){void 0===n&&(n=et(o));var h=u===cr;if(n!==this.keyHash)return h?this:(r(a),r(s),Zt(this,t,e,n,[o,u]));for(var f=this.entries,c=0,_=f.length;_>c&&!X(o,f[c][0]);c++);var p=_>c;if(p?f[c][1]===u:h)return this;if(r(a),(h||!p)&&r(s),h&&2===_)return new Pt(t,this.keyHash,f[1^c]);var v=t&&t===this.ownerID,l=v?f:i(f);return p?h?c===_-1?l.pop():l[c]=l.pop():l[c]=[o,u]:l.push([o,u]),v?(this.entries=l,this):new Jt(t,this.keyHash,l)},Pt.prototype.get=function(t,e,r,n){return X(r,this.entry[0])?this.entry[1]:n},Pt.prototype.update=function(t,e,n,i,o,u,s){var a=o===cr,h=X(i,this.entry[0]);return(h?o===this.entry[1]:a)?this:(r(s),a?void r(u):h?t&&t===this.ownerID?(this.entry[1]=o,this):new Pt(t,this.keyHash,[i,o]):(r(u),Zt(this,t,e,et(i),[i,o])))},Wt.prototype.iterate=Jt.prototype.iterate=function(t,e){for(var r=this.entries,n=0,i=r.length-1;i>=n;n++)if(t(r[e?i-n:n])===!1)return!1},Bt.prototype.iterate=Ct.prototype.iterate=function(t,e){for(var r=this.nodes,n=0,i=r.length-1;i>=n;n++){var o=r[e?i-n:n];if(o&&o.iterate(t,e)===!1)return!1}},Pt.prototype.iterate=function(t){return t(this.entry)},t(Ht,S),Ht.prototype.next=function(){for(var t=this._type,e=this._stack;e;){var r,n=e.node,i=e.index++;if(n.entry){if(0===i)return Nt(t,n.entry);}else if(n.entries){if(r=n.entries.length-1,r>=i)return Nt(t,n.entries[this._reverse?r-i:i])}else if(r=n.nodes.length-1,r>=i){var o=n.nodes[this._reverse?r-i:i];if(o){if(o.entry)return Nt(t,o.entry);e=this._stack=Vt(o,e)}continue}e=this._stack=this._stack.__prev}return I()};var Wr,Br=hr/4,Cr=hr/2,Jr=hr/4;t(fe,Y),fe.of=function(){return this(arguments)},fe.prototype.toString=function(){return this.__toString(\"List [\",\"]\")},fe.prototype.get=function(t,e){if(t=u(this,t),0>t||t>=this.size)return e;t+=this._origin;var r=ge(this,t);return r&&r.array[t&fr]},fe.prototype.set=function(t,e){return ye(this,t,e)},fe.prototype.remove=function(t){return this.has(t)?0===t?this.shift():t===this.size-1?this.pop():this.splice(t,1):this},fe.prototype.clear=function(){return 0===this.size?this:this.__ownerID?(this.size=this._origin=this._capacity=0,this._level=ar,this._root=this._tail=null,this.__hash=void 0,this.__altered=!0,this):le()},fe.prototype.push=function(){var t=arguments,e=this.size;return this.withMutations(function(r){we(r,0,e+t.length);for(var n=0;t.length>n;n++)r.set(e+n,t[n])})},fe.prototype.pop=function(){return we(this,0,-1)},fe.prototype.unshift=function(){var t=arguments;return this.withMutations(function(e){we(e,-t.length);for(var r=0;t.length>r;r++)e.set(r,t[r])})},fe.prototype.shift=function(){return we(this,1)},fe.prototype.merge=function(){return Se(this,void 0,arguments)},fe.prototype.mergeWith=function(t){var e=ur.call(arguments,1);return Se(this,t,e)},fe.prototype.mergeDeep=function(){return Se(this,ne(void 0),arguments)},fe.prototype.mergeDeepWith=function(t){var e=ur.call(arguments,1);return Se(this,ne(t),e)},fe.prototype.setSize=function(t){return we(this,0,t)},fe.prototype.slice=function(t,e){var r=this.size;return a(t,e,r)?this:we(this,h(t,r),f(e,r))},fe.prototype.__iterator=function(t,e){var r=0,n=pe(this,e);return new S(function(){var e=n();return e===Vr?I():z(t,r++,e)})},fe.prototype.__iterate=function(t,e){for(var r,n=0,i=pe(this,e);(r=i())!==Vr&&t(r,n++,this)!==!1;);return n},fe.prototype.__ensureOwner=function(t){\nreturn t===this.__ownerID?this:t?ve(this._origin,this._capacity,this._level,this._root,this._tail,t,this.__hash):(this.__ownerID=t,this)},fe.isList=ce;var Pr=\"@@__IMMUTABLE_LIST__@@\",Hr=fe.prototype;Hr[Pr]=!0,Hr[sr]=Hr.remove,Hr.setIn=Tr.setIn,Hr.deleteIn=Hr.removeIn=Tr.removeIn,Hr.update=Tr.update,Hr.updateIn=Tr.updateIn,Hr.mergeIn=Tr.mergeIn,Hr.mergeDeepIn=Tr.mergeDeepIn,Hr.withMutations=Tr.withMutations,Hr.asMutable=Tr.asMutable,Hr.asImmutable=Tr.asImmutable,Hr.wasAltered=Tr.wasAltered,_e.prototype.removeBefore=function(t,e,r){if(r===e?1<<e:0||0===this.array.length)return this;var n=r>>>e&fr;if(n>=this.array.length)return new _e([],t);var i,o=0===n;if(e>0){var u=this.array[n];if(i=u&&u.removeBefore(t,e-ar,r),i===u&&o)return this}if(o&&!i)return this;var s=me(this,t);if(!o)for(var a=0;n>a;a++)s.array[a]=void 0;return i&&(s.array[n]=i),s},_e.prototype.removeAfter=function(t,e,r){if(r===e?1<<e:0||0===this.array.length)return this;var n=r-1>>>e&fr;if(n>=this.array.length)return this;var i,o=n===this.array.length-1;if(e>0){var u=this.array[n];if(i=u&&u.removeAfter(t,e-ar,r),i===u&&o)return this}if(o&&!i)return this;var s=me(this,t);return o||s.array.pop(),i&&(s.array[n]=i),s};var Nr,Vr={};t(Ie,Lt),Ie.of=function(){return this(arguments)},Ie.prototype.toString=function(){return this.__toString(\"OrderedMap {\",\"}\")},Ie.prototype.get=function(t,e){var r=this._map.get(t);return void 0!==r?this._list.get(r)[1]:e},Ie.prototype.clear=function(){return 0===this.size?this:this.__ownerID?(this.size=0,this._map.clear(),this._list.clear(),this):De()},Ie.prototype.set=function(t,e){return Me(this,t,e)},Ie.prototype.remove=function(t){return Me(this,t,cr)},Ie.prototype.wasAltered=function(){return this._map.wasAltered()||this._list.wasAltered()},Ie.prototype.__iterate=function(t,e){var r=this;return this._list.__iterate(function(e){return e&&t(e[1],e[0],r)},e)},Ie.prototype.__iterator=function(t,e){return this._list.fromEntrySeq().__iterator(t,e)},Ie.prototype.__ensureOwner=function(t){if(t===this.__ownerID)return this;var e=this._map.__ensureOwner(t),r=this._list.__ensureOwner(t);return t?qe(e,r,t,this.__hash):(this.__ownerID=t,this._map=e,this._list=r,this)},Ie.isOrderedMap=be,Ie.prototype[dr]=!0,Ie.prototype[sr]=Ie.prototype.remove;var Yr;t(Ee,Y),Ee.of=function(){return this(arguments)},Ee.prototype.toString=function(){return this.__toString(\"Stack [\",\"]\")},Ee.prototype.get=function(t,e){var r=this._head;for(t=u(this,t);r&&t--;)r=r.next;return r?r.value:e},Ee.prototype.peek=function(){return this._head&&this._head.value},Ee.prototype.push=function(){if(0===arguments.length)return this;for(var t=this.size+arguments.length,e=this._head,r=arguments.length-1;r>=0;r--)e={value:arguments[r],next:e};return this.__ownerID?(this.size=t,this._head=e,this.__hash=void 0,this.__altered=!0,this):xe(t,e)},Ee.prototype.pushAll=function(t){if(t=v(t),0===t.size)return this;st(t.size);var e=this.size,r=this._head;return t.reverse().forEach(function(t){e++,r={value:t,next:r}}),this.__ownerID?(this.size=e,this._head=r,this.__hash=void 0,this.__altered=!0,this):xe(e,r)},Ee.prototype.pop=function(){return this.slice(1)},Ee.prototype.unshift=function(){return this.push.apply(this,arguments)},Ee.prototype.unshiftAll=function(t){return this.pushAll(t)},Ee.prototype.shift=function(){return this.pop.apply(this,arguments)},Ee.prototype.clear=function(){return 0===this.size?this:this.__ownerID?(this.size=0,this._head=void 0,this.__hash=void 0,this.__altered=!0,this):ke()},Ee.prototype.slice=function(t,e){if(a(t,e,this.size))return this;var r=h(t,this.size),n=f(e,this.size);if(n!==this.size)return Y.prototype.slice.call(this,t,e);for(var i=this.size-r,o=this._head;r--;)o=o.next;return this.__ownerID?(this.size=i,this._head=o,this.__hash=void 0,this.__altered=!0,this):xe(i,o)},Ee.prototype.__ensureOwner=function(t){return t===this.__ownerID?this:t?xe(this.size,this._head,t,this.__hash):(this.__ownerID=t,this.__altered=!1,this)},Ee.prototype.__iterate=function(t,e){if(e)return this.reverse().__iterate(t);for(var r=0,n=this._head;n&&t(n.value,r++,this)!==!1;)n=n.next;return r},Ee.prototype.__iterator=function(t,e){if(e)return this.reverse().__iterator(t);var r=0,n=this._head;return new S(function(){if(n){var e=n.value;return n=n.next,z(t,r++,e)}return I()})},Ee.isStack=Oe;var Qr=\"@@__IMMUTABLE_STACK__@@\",Xr=Ee.prototype;Xr[Qr]=!0,Xr.withMutations=Tr.withMutations,Xr.asMutable=Tr.asMutable,Xr.asImmutable=Tr.asImmutable,Xr.wasAltered=Tr.wasAltered;var Fr;t(Ae,Q),Ae.of=function(){return this(arguments)},Ae.fromKeys=function(t){return this(p(t).keySeq())},Ae.prototype.toString=function(){return this.__toString(\"Set {\",\"}\")},Ae.prototype.has=function(t){return this._map.has(t)},Ae.prototype.add=function(t){return Re(this,this._map.set(t,!0))},Ae.prototype.remove=function(t){return Re(this,this._map.remove(t))},Ae.prototype.clear=function(){return Re(this,this._map.clear())},Ae.prototype.union=function(){var t=ur.call(arguments,0);return t=t.filter(function(t){return 0!==t.size}),0===t.length?this:0!==this.size||this.__ownerID||1!==t.length?this.withMutations(function(e){for(var r=0;t.length>r;r++)l(t[r]).forEach(function(t){return e.add(t)})}):this.constructor(t[0])},Ae.prototype.intersect=function(){var t=ur.call(arguments,0);if(0===t.length)return this;t=t.map(function(t){return l(t)});var e=this;return this.withMutations(function(r){e.forEach(function(e){t.every(function(t){return t.includes(e)})||r.remove(e)})})},Ae.prototype.subtract=function(){var t=ur.call(arguments,0);if(0===t.length)return this;t=t.map(function(t){return l(t)});var e=this;return this.withMutations(function(r){e.forEach(function(e){t.some(function(t){return t.includes(e)})&&r.remove(e)})})},Ae.prototype.merge=function(){return this.union.apply(this,arguments)},Ae.prototype.mergeWith=function(){var t=ur.call(arguments,1);return this.union.apply(this,t)},Ae.prototype.sort=function(t){return Le(qt(this,t))},Ae.prototype.sortBy=function(t,e){return Le(qt(this,e,t))},Ae.prototype.wasAltered=function(){return this._map.wasAltered()},Ae.prototype.__iterate=function(t,e){var r=this;return this._map.__iterate(function(e,n){return t(n,n,r)},e)},Ae.prototype.__iterator=function(t,e){return this._map.map(function(t,e){\nreturn e}).__iterator(t,e)},Ae.prototype.__ensureOwner=function(t){if(t===this.__ownerID)return this;var e=this._map.__ensureOwner(t);return t?this.__make(e,t):(this.__ownerID=t,this._map=e,this)},Ae.isSet=je;var Gr=\"@@__IMMUTABLE_SET__@@\",Zr=Ae.prototype;Zr[Gr]=!0,Zr[sr]=Zr.remove,Zr.mergeDeep=Zr.merge,Zr.mergeDeepWith=Zr.mergeWith,Zr.withMutations=Tr.withMutations,Zr.asMutable=Tr.asMutable,Zr.asImmutable=Tr.asImmutable,Zr.__empty=Ke,Zr.__make=Ue;var $r;t(Le,Ae),Le.of=function(){return this(arguments)},Le.fromKeys=function(t){return this(p(t).keySeq())},Le.prototype.toString=function(){return this.__toString(\"OrderedSet {\",\"}\")},Le.isOrderedSet=Te;var tn=Le.prototype;tn[dr]=!0,tn.__empty=Be,tn.__make=We;var en;t(Ce,V),Ce.prototype.toString=function(){return this.__toString(Pe(this)+\" {\",\"}\")},Ce.prototype.has=function(t){return this._defaultValues.hasOwnProperty(t)},Ce.prototype.get=function(t,e){if(!this.has(t))return e;var r=this._defaultValues[t];return this._map?this._map.get(t,r):r},Ce.prototype.clear=function(){if(this.__ownerID)return this._map&&this._map.clear(),this;var t=this.constructor;return t._empty||(t._empty=Je(this,Qt()))},Ce.prototype.set=function(t,e){if(!this.has(t))throw Error('Cannot set unknown key \"'+t+'\" on '+Pe(this));var r=this._map&&this._map.set(t,e);return this.__ownerID||r===this._map?this:Je(this,r)},Ce.prototype.remove=function(t){if(!this.has(t))return this;var e=this._map&&this._map.remove(t);return this.__ownerID||e===this._map?this:Je(this,e)},Ce.prototype.wasAltered=function(){return this._map.wasAltered()},Ce.prototype.__iterator=function(t,e){var r=this;return p(this._defaultValues).map(function(t,e){return r.get(e)}).__iterator(t,e)},Ce.prototype.__iterate=function(t,e){var r=this;return p(this._defaultValues).map(function(t,e){return r.get(e)}).__iterate(t,e)},Ce.prototype.__ensureOwner=function(t){if(t===this.__ownerID)return this;var e=this._map&&this._map.__ensureOwner(t);return t?Je(this,e,t):(this.__ownerID=t,this._map=e,this)};var rn=Ce.prototype;rn[sr]=rn.remove,rn.deleteIn=rn.removeIn=Tr.removeIn,\nrn.merge=Tr.merge,rn.mergeWith=Tr.mergeWith,rn.mergeIn=Tr.mergeIn,rn.mergeDeep=Tr.mergeDeep,rn.mergeDeepWith=Tr.mergeDeepWith,rn.mergeDeepIn=Tr.mergeDeepIn,rn.setIn=Tr.setIn,rn.update=Tr.update,rn.updateIn=Tr.updateIn,rn.withMutations=Tr.withMutations,rn.asMutable=Tr.asMutable,rn.asImmutable=Tr.asImmutable,t(Ye,k),Ye.prototype.toString=function(){return 0===this.size?\"Range []\":\"Range [ \"+this._start+\"...\"+this._end+(this._step>1?\" by \"+this._step:\"\")+\" ]\"},Ye.prototype.get=function(t,e){return this.has(t)?this._start+u(this,t)*this._step:e},Ye.prototype.includes=function(t){var e=(t-this._start)/this._step;return e>=0&&this.size>e&&e===Math.floor(e)},Ye.prototype.slice=function(t,e){return a(t,e,this.size)?this:(t=h(t,this.size),e=f(e,this.size),t>=e?new Ye(0,0):new Ye(this.get(t,this._end),this.get(e,this._end),this._step))},Ye.prototype.indexOf=function(t){var e=t-this._start;if(e%this._step===0){var r=e/this._step;if(r>=0&&this.size>r)return r}return-1},Ye.prototype.lastIndexOf=function(t){return this.indexOf(t)},Ye.prototype.__iterate=function(t,e){for(var r=this.size-1,n=this._step,i=e?this._start+r*n:this._start,o=0;r>=o;o++){if(t(i,o,this)===!1)return o+1;i+=e?-n:n}return o},Ye.prototype.__iterator=function(t,e){var r=this.size-1,n=this._step,i=e?this._start+r*n:this._start,o=0;return new S(function(){var u=i;return i+=e?-n:n,o>r?I():z(t,o++,u)})},Ye.prototype.equals=function(t){return t instanceof Ye?this._start===t._start&&this._end===t._end&&this._step===t._step:Ve(this,t)};var nn;t(Qe,k),Qe.prototype.toString=function(){return 0===this.size?\"Repeat []\":\"Repeat [ \"+this._value+\" \"+this.size+\" times ]\"},Qe.prototype.get=function(t,e){return this.has(t)?this._value:e},Qe.prototype.includes=function(t){return X(this._value,t)},Qe.prototype.slice=function(t,e){var r=this.size;return a(t,e,r)?this:new Qe(this._value,f(e,r)-h(t,r))},Qe.prototype.reverse=function(){return this},Qe.prototype.indexOf=function(t){return X(this._value,t)?0:-1},Qe.prototype.lastIndexOf=function(t){return X(this._value,t)?this.size:-1;},Qe.prototype.__iterate=function(t){for(var e=0;this.size>e;e++)if(t(this._value,e,this)===!1)return e+1;return e},Qe.prototype.__iterator=function(t){var e=this,r=0;return new S(function(){return e.size>r?z(t,r++,e._value):I()})},Qe.prototype.equals=function(t){return t instanceof Qe?X(this._value,t._value):Ve(t)};var on;_.Iterator=S,Xe(_,{toArray:function(){st(this.size);var t=Array(this.size||0);return this.valueSeq().__iterate(function(e,r){t[r]=e}),t},toIndexedSeq:function(){return new ht(this)},toJS:function(){return this.toSeq().map(function(t){return t&&\"function\"==typeof t.toJS?t.toJS():t}).__toJS()},toJSON:function(){return this.toSeq().map(function(t){return t&&\"function\"==typeof t.toJSON?t.toJSON():t}).__toJS()},toKeyedSeq:function(){return new at(this,!0)},toMap:function(){return Lt(this.toKeyedSeq())},toObject:function(){st(this.size);var t={};return this.__iterate(function(e,r){t[r]=e}),t},toOrderedMap:function(){return Ie(this.toKeyedSeq())},toOrderedSet:function(){return Le(d(this)?this.valueSeq():this)},toSet:function(){return Ae(d(this)?this.valueSeq():this)},toSetSeq:function(){return new ft(this)},toSeq:function(){return m(this)?this.toIndexedSeq():d(this)?this.toKeyedSeq():this.toSetSeq()},toStack:function(){return Ee(d(this)?this.valueSeq():this)},toList:function(){return fe(d(this)?this.valueSeq():this)},toString:function(){return\"[Iterable]\"},__toString:function(t,e){return 0===this.size?t+e:t+\" \"+this.toSeq().map(this.__toStringMapper).join(\", \")+\" \"+e},concat:function(){var t=ur.call(arguments,0);return Ot(this,St(this,t))},contains:function(t){return this.includes(t)},includes:function(t){return this.some(function(e){return X(e,t)})},entries:function(){return this.__iterator(wr)},every:function(t,e){st(this.size);var r=!0;return this.__iterate(function(n,i,o){return t.call(e,n,i,o)?void 0:(r=!1,!1)}),r},filter:function(t,e){return Ot(this,lt(this,t,e,!0))},find:function(t,e,r){var n=this.findEntry(t,e);return n?n[1]:r},findEntry:function(t,e){var r;return this.__iterate(function(n,i,o){\nreturn t.call(e,n,i,o)?(r=[i,n],!1):void 0}),r},findLastEntry:function(t,e){return this.toSeq().reverse().findEntry(t,e)},forEach:function(t,e){return st(this.size),this.__iterate(e?t.bind(e):t)},join:function(t){st(this.size),t=void 0!==t?\"\"+t:\",\";var e=\"\",r=!0;return this.__iterate(function(n){r?r=!1:e+=t,e+=null!==n&&void 0!==n?\"\"+n:\"\"}),e},keys:function(){return this.__iterator(mr)},map:function(t,e){return Ot(this,pt(this,t,e))},reduce:function(t,e,r){st(this.size);var n,i;return arguments.length<2?i=!0:n=e,this.__iterate(function(e,o,u){i?(i=!1,n=e):n=t.call(r,n,e,o,u)}),n},reduceRight:function(){var t=this.toKeyedSeq().reverse();return t.reduce.apply(t,arguments)},reverse:function(){return Ot(this,vt(this,!0))},slice:function(t,e){return Ot(this,mt(this,t,e,!0))},some:function(t,e){return!this.every(Ze(t),e)},sort:function(t){return Ot(this,qt(this,t))},values:function(){return this.__iterator(gr)},butLast:function(){return this.slice(0,-1)},isEmpty:function(){return void 0!==this.size?0===this.size:!this.some(function(){return!0})},count:function(t,e){return o(t?this.toSeq().filter(t,e):this)},countBy:function(t,e){return yt(this,t,e)},equals:function(t){return Ve(this,t)},entrySeq:function(){var t=this;if(t._cache)return new j(t._cache);var e=t.toSeq().map(Ge).toIndexedSeq();return e.fromEntrySeq=function(){return t.toSeq()},e},filterNot:function(t,e){return this.filter(Ze(t),e)},findLast:function(t,e,r){return this.toKeyedSeq().reverse().find(t,e,r)},first:function(){return this.find(s)},flatMap:function(t,e){return Ot(this,It(this,t,e))},flatten:function(t){return Ot(this,zt(this,t,!0))},fromEntrySeq:function(){return new ct(this)},get:function(t,e){return this.find(function(e,r){return X(r,t)},void 0,e)},getIn:function(t,e){for(var r,n=this,i=Kt(t);!(r=i.next()).done;){var o=r.value;if(n=n&&n.get?n.get(o,cr):cr,n===cr)return e}return n},groupBy:function(t,e){return dt(this,t,e)},has:function(t){return this.get(t,cr)!==cr},hasIn:function(t){return this.getIn(t,cr)!==cr},isSubset:function(t){return t=\"function\"==typeof t.includes?t:_(t),\nthis.every(function(e){return t.includes(e)})},isSuperset:function(t){return t.isSubset(this)},keySeq:function(){return this.toSeq().map(Fe).toIndexedSeq()},last:function(){return this.toSeq().reverse().first()},max:function(t){return Dt(this,t)},maxBy:function(t,e){return Dt(this,e,t)},min:function(t){return Dt(this,t?$e(t):rr)},minBy:function(t,e){return Dt(this,e?$e(e):rr,t)},rest:function(){return this.slice(1)},skip:function(t){return this.slice(Math.max(0,t))},skipLast:function(t){return Ot(this,this.toSeq().reverse().skip(t).reverse())},skipWhile:function(t,e){return Ot(this,wt(this,t,e,!0))},skipUntil:function(t,e){return this.skipWhile(Ze(t),e)},sortBy:function(t,e){return Ot(this,qt(this,e,t))},take:function(t){return this.slice(0,Math.max(0,t))},takeLast:function(t){return Ot(this,this.toSeq().reverse().take(t).reverse())},takeWhile:function(t,e){return Ot(this,gt(this,t,e))},takeUntil:function(t,e){return this.takeWhile(Ze(t),e)},valueSeq:function(){return this.toIndexedSeq()},hashCode:function(){return this.__hash||(this.__hash=nr(this))}});var un=_.prototype;un[vr]=!0,un[Ir]=un.values,un.__toJS=un.toArray,un.__toStringMapper=tr,un.inspect=un.toSource=function(){return\"\"+this},un.chain=un.flatMap,function(){try{Object.defineProperty(un,\"length\",{get:function(){if(!_.noLengthWarning){var t;try{throw Error()}catch(e){t=e.stack}if(-1===t.indexOf(\"_wrapObject\"))return console&&console.warn&&console.warn(\"iterable.length has been deprecated, use iterable.size or iterable.count(). This warning will become a silent error in a future version. \"+t),this.size}}})}catch(t){}}(),Xe(p,{flip:function(){return Ot(this,_t(this))},findKey:function(t,e){var r=this.findEntry(t,e);return r&&r[0]},findLastKey:function(t,e){return this.toSeq().reverse().findKey(t,e)},keyOf:function(t){return this.findKey(function(e){return X(e,t)})},lastKeyOf:function(t){return this.findLastKey(function(e){return X(e,t)})},mapEntries:function(t,e){var r=this,n=0;return Ot(this,this.toSeq().map(function(i,o){return t.call(e,[o,i],n++,r)}).fromEntrySeq());},mapKeys:function(t,e){var r=this;return Ot(this,this.toSeq().flip().map(function(n,i){return t.call(e,n,i,r)}).flip())}});var sn=p.prototype;sn[lr]=!0,sn[Ir]=un.entries,sn.__toJS=un.toObject,sn.__toStringMapper=function(t,e){return JSON.stringify(e)+\": \"+tr(t)},Xe(v,{toKeyedSeq:function(){return new at(this,!1)},filter:function(t,e){return Ot(this,lt(this,t,e,!1))},findIndex:function(t,e){var r=this.findEntry(t,e);return r?r[0]:-1},indexOf:function(t){var e=this.toKeyedSeq().keyOf(t);return void 0===e?-1:e},lastIndexOf:function(t){return this.toSeq().reverse().indexOf(t)},reverse:function(){return Ot(this,vt(this,!1))},slice:function(t,e){return Ot(this,mt(this,t,e,!1))},splice:function(t,e){var r=arguments.length;if(e=Math.max(0|e,0),0===r||2===r&&!e)return this;t=h(t,this.size);var n=this.slice(0,t);return Ot(this,1===r?n:n.concat(i(arguments,2),this.slice(t+e)))},findLastIndex:function(t,e){var r=this.toKeyedSeq().findLastKey(t,e);return void 0===r?-1:r},first:function(){return this.get(0)},flatten:function(t){return Ot(this,zt(this,t,!1))},get:function(t,e){return t=u(this,t),0>t||this.size===1/0||void 0!==this.size&&t>this.size?e:this.find(function(e,r){return r===t},void 0,e)},has:function(t){return t=u(this,t),t>=0&&(void 0!==this.size?this.size===1/0||this.size>t:-1!==this.indexOf(t))},interpose:function(t){return Ot(this,bt(this,t))},interleave:function(){var t=[this].concat(i(arguments)),e=Et(this.toSeq(),k.of,t),r=e.flatten(!0);return e.size&&(r.size=e.size*t.length),Ot(this,r)},last:function(){return this.get(-1)},skipWhile:function(t,e){return Ot(this,wt(this,t,e,!1))},zip:function(){var t=[this].concat(i(arguments));return Ot(this,Et(this,er,t))},zipWith:function(t){var e=i(arguments);return e[0]=this,Ot(this,Et(this,t,e))}}),v.prototype[yr]=!0,v.prototype[dr]=!0,Xe(l,{get:function(t,e){return this.has(t)?t:e},includes:function(t){return this.has(t)},keySeq:function(){return this.valueSeq()}}),l.prototype.has=un.includes,Xe(x,p.prototype),Xe(k,v.prototype),Xe(A,l.prototype),Xe(V,p.prototype),Xe(Y,v.prototype),\nXe(Q,l.prototype);var an={Iterable:_,Seq:O,Collection:N,Map:Lt,OrderedMap:Ie,List:fe,Stack:Ee,Set:Ae,OrderedSet:Le,Record:Ce,Range:Ye,Repeat:Qe,is:X,fromJS:F};return an});";

eval(immutable);

reservedInJs = newSetWith.apply(null, ("abstract arguments boolean break byte case catch char class " + "const continue debugger default delete do double else enum eval export " + "extends final finally float for function goto if implements import in " + "instanceof int interface let long native new null package private protected " + "public return short static super switch synchronized this throw throws transient " + "try typeof var void volatile while with yield").split(' '));

compiledModules = newMap();

moduleGraph = newMap();

lookupCompiledModule = function(name) {
  return lookupInMap(compiledModules, name);
};

compileModuleTopLevel = function(source, moduleName, requiredMap) {
  if (moduleName == null) {
    moduleName = '@unnamed';
  }
  if (requiredMap == null) {
    requiredMap = newMap();
  }
  return compileModuleTopLevelAst(astFromSource("(" + source + ")", -1, -1), moduleName, requiredMap);
};

compileModuleTopLevelAst = function(ast, moduleName, requiredMap) {
  var compilationFn, ctx, defaultImports, errors, ir, js, request, requiredModuleName, toInject, _ref1;
  if (moduleName == null) {
    moduleName = '@unnamed';
  }
  if (requiredMap == null) {
    requiredMap = newMap();
  }
  addToMap(requiredMap, 'Prelude', true);
  removeFromMap(requiredMap, moduleName);
  for (requiredModuleName in values(requiredMap)) {
    if (!lookupCompiledModule(requiredModuleName)) {
      return {
        request: requiredModuleName
      };
    }
  }
  replaceOrAddToMap(moduleGraph, moduleName, {
    requires: requiredMap
  });
  toInject = requiresFor(moduleName);
  ctx = injectedContext(toInject);
  defaultImports = importsFor(subtractSets(newSetWith('Prelude'), newSetWith(moduleName)));
  declareImportedByDefault(ctx, defaultImports);
  compilationFn = topLevelModule(moduleName, defaultImports);
  _ref1 = compileCtxAstToJs(compilationFn, ctx, ast), request = _ref1.request, ir = _ref1.ir, js = _ref1.js;
  if (request) {
    if (!allInjected(request, requiredMap)) {
      return compileModuleTopLevelAst(ast, moduleName, request);
    } else {
      js = compileCtxIrToJs(ctx, ir).js;
    }
  }
  errors = checkTypes(ctx);
  finalizeTypes(ctx, ast);
  replaceOrAddToMap(compiledModules, moduleName, {
    declared: subtractContexts(ctx, injectedContext(toInject)),
    js: js
  });
  return {
    js: js,
    ast: ast,
    errors: errors
  };
};

compileModuleWithDependencies = function(moduleName) {
  if (moduleName == null) {
    moduleName = '@unnamed';
  }
  return {
    js: library + immutable + (listOfLines(map(lookupJs, setToArray(runtimeDependencies(moduleName)))))
  };
};

compileExpression = function(source, moduleName) {
  var js, parsed;
  if (moduleName == null) {
    moduleName = '@unnamed';
  }
  js = (parsed = parseExpression(source, moduleName)).js;
  return extend(parsed, {
    js: library + immutable + (listOfLines(map(lookupJs, setToArray(runtimeDependencies(moduleName))))) + '\n;' + js
  });
};

parseTopLevel = function(source, moduleName) {
  var ast;
  if (moduleName == null) {
    moduleName = '@unnamed';
  }
  ast = astFromSource("(" + source + ")", -1, -1);
  return parseWith(ast, ast, topLevel, moduleName, true);
};

parseExpression = function(source, moduleName) {
  var ast, compilationFn, expression;
  if (moduleName == null) {
    moduleName = '@unnamed';
  }
  ast = astFromSource("(" + source + ")", -1, -1);
  expression = _terms(ast)[0];
  compilationFn = topLevelExpressionInModule(importsFor(moduleDependencies(moduleName)));
  return parseWith(ast, expression, compilationFn, moduleName, false);
};

parseWith = function(originalAst, ast, compilationFn, moduleName, doDeclare) {
  var ctx, errors, js, modules, _ref1;
  if (_empty(_validTerms(originalAst))) {
    return {
      ast: originalAst,
      js: ''
    };
  } else {
    _ref1 = contextWithDependencies(moduleDependencies(moduleName)), modules = _ref1.modules, ctx = _ref1.ctx;
    js = compileCtxAstToJs(compilationFn, ctx, ast).js;
    errors = checkTypes(ctx);
    finalizeTypes(ctx, ast);
    if (doDeclare) {
      replaceOrAddToMap(compiledModules, moduleName, {
        declared: subtractContexts(ctx, injectedContext(requiresFor(moduleName))),
        ast: originalAst
      });
    }
    return {
      ast: originalAst,
      errors: errors,
      malformed: ctx.isMalformed,
      js: js
    };
  }
};

expandCall = function(moduleName, call) {
  var ctx, e, expanded, modules, _ref1;
  _ref1 = contextWithDependencies(moduleDependencies(moduleName)), modules = _ref1.modules, ctx = _ref1.ctx;
  try {
    expanded = callMacroExpand(ctx, call);
    if (!isTranslated(expanded)) {
      return expanded;
    }
  } catch (_error) {
    e = _error;
    console.error("Error in expandCall");
    console.error(e);
    return null;
  }
};

importsFor = function(moduleSet) {
  var lookupDefinitions;
  lookupDefinitions = function(name) {
    return setToArray((lookupCompiledModule(name)).declared.definitions);
  };
  return mapKeys(lookupDefinitions, moduleSet);
};

contextWithDependencies = function(modules) {
  return {
    ctx: injectedContext(modules, true),
    modules: setToArray(modules)
  };
};

moduleDependencies = function(moduleName) {
  return concatSets(requiresFor(moduleName), newSetWith(moduleName));
};

runtimeDependencies = function(moduleName) {
  return concatSets(collectRequiresFor(moduleName), newSetWith(moduleName));
};

reverseModuleDependencies = function(moduleName) {
  return concatSets(newSetWith(moduleName), requiresFor(moduleName));
};

checkTypes = function(ctx) {
  if (isFailed(ctx.substitution)) {
    labelConflicts(_fst(ctx.substitution.fails));
    return ctx.substitution.fails;
  }
};

labelConflicts = function(fail) {
  if (!fail.conflicts) {
    return fail;
  }
  return map(labelConflict, fail.conflicts);
};

labelConflict = function(conflict) {
  if (conflict.TypeVariable && conflict.ref.val) {
    return labelConflict(conflict.ref.val);
  } else {
    return conflict.error = true;
  }
};

lookupJs = function(moduleName) {
  var ast, compiled, js;
  compiled = lookupCompiledModule(moduleName);
  if (!compiled) {
    return console.error("" + moduleName + " not found");
  } else {
    js = compiled.js, ast = compiled.ast;
    if (js == null) {
      js = compileModuleTopLevelAst(ast, moduleName).js;
    }
    return js;
  }
};

allInjected = function(required, injected) {
  var injectedNames, name, names, _ref1;
  _ref1 = values(required);
  for (name in _ref1) {
    names = _ref1[name];
    injectedNames = lookupInMap(injected, name);
    if (!injectedNames) {
      return false;
    }
  }
  return true;
};

subtractContexts = function(ctx, what) {
  var classes, definitions, macros, nameIndex, savedScopes, typeNames;
  definitions = subtractMaps(ctx._scope(), what._scope());
  typeNames = subtractMaps(ctx._scope().typeNames, what._scope().typeNames);
  classes = subtractMaps(ctx._scope().classes, what._scope().classes);
  macros = subtractMaps(ctx._scope().macros, what._scope().macros);
  savedScopes = ctx.savedScopes;
  nameIndex = ctx.nameIndex;
  return {
    definitions: definitions,
    typeNames: typeNames,
    classes: classes,
    macros: macros,
    savedScopes: savedScopes,
    nameIndex: nameIndex
  };
};

injectedContext = function(modulesToInject, shouldDeclare) {
  var compiled, ctx, moduleName, names, _ref1;
  ctx = new Context;
  _ref1 = values(modulesToInject);
  for (moduleName in _ref1) {
    names = _ref1[moduleName];
    if (compiled = lookupCompiledModule(moduleName)) {
      injectContext(ctx, shouldDeclare, compiled.declared, moduleName, names);
    }
  }
  return ctx;
};

injectContext = function(ctx, shouldDeclare, compiledModule, moduleName, names) {
  var arity, classes, definitions, docs, final, isClass, macro, macros, name, shouldImport, source, topScope, type, typeNames, virtual, _ref1, _ref2, _ref3;
  definitions = compiledModule.definitions, typeNames = compiledModule.typeNames, classes = compiledModule.classes, macros = compiledModule.macros;
  topScope = ctx._scope();
  shouldImport = function(name) {
    return !names.size || inSet(names, name);
  };
  _ref1 = values(macros);
  for (name in _ref1) {
    macro = _ref1[name];
    if (shouldImport(name)) {
      if (ctx.isMacroDeclared(name)) {
        throw new Error("Macro " + name + " already defined");
      } else {
        addToMap(topScope.macros, name, macro);
      }
    }
  }
  _ref2 = values(definitions);
  for (name in _ref2) {
    _ref3 = _ref2[name], type = _ref3.type, arity = _ref3.arity, docs = _ref3.docs, source = _ref3.source, isClass = _ref3.isClass, virtual = _ref3.virtual, final = _ref3.final;
    if (shouldImport(name)) {
      addToMap(topScope, name, {
        arity: arity,
        docs: docs,
        source: source,
        isClass: isClass,
        virtual: virtual,
        final: final,
        type: (shouldDeclare ? type : void 0),
        tempType: type,
        id: ctx.freshId()
      });
    }
  }
  topScope.typeNames = concatMaps(topScope.typeNames, typeNames);
  topScope.classes = concatMaps(topScope.classes, classes);
  ctx.scopeIndex += compiledModule.savedScopes.length;
  ctx.nameIndex += compiledModule.nameIndex;
  addToSet(ctx.importedModules, moduleName);
  return ctx;
};

collectRequiresFor = function(name) {
  var collected, marked, visit;
  marked = newSet();
  collected = newMap();
  visit = function(name, value) {
    var compiled, dep, requires, v, _ref1;
    if (inSet(marked, name)) {
      throw new Error("Cyclic dependency between modules " + (listOf(setToArray(marked))));
    } else if (!lookupInMap(collected, name)) {
      compiled = lookupInMap(moduleGraph, name);
      if (!compiled) {
        return console.error("" + name + " module not found");
      } else {
        requires = compiled.requires;
        addToSet(marked, name);
        _ref1 = values(requires);
        for (dep in _ref1) {
          v = _ref1[dep];
          visit(dep, v);
        }
        removeFromSet(marked, name);
        return addToMap(collected, name, value);
      }
    }
  };
  visit(name);
  return collected;
};

requiresFor = function(name) {
  var compiled;
  compiled = lookupInMap(moduleGraph, name);
  if (!compiled) {
    console.error("" + name + " module not found");
    return newMap();
  } else {
    return compiled.requires;
  }
};

findAvailableTypes = function(moduleName, inferredType) {
  var available, ctx, inferred, printed, typeNames;
  typeNames = lookupCompiledModule(moduleName).declared.typeNames;
  ctx = contextWithDependencies(reverseModuleDependencies(moduleName)).ctx;
  printed = function(kind, name) {
    var kindArity;
    kindArity = kindFnNumArgs(kind);
    return {
      type: kindArity === 0 ? name : "(" + name + (Array(kindArity + 1).join(' ')) + ")",
      docs: null
    };
  };
  available = concatMaps(typeNames, ctx._scope().typeNames);
  if (inferredType !== true) {
    if (inferredType.name) {
      available = filterMap((function(name) {
        return name !== inferredType.name;
      }), available);
    }
    inferred = newMapWith('inferred', {
      type: plainPrettyPrint(toForAll(toConstrained(inferredType)))
    });
  } else {
    inferred = newMap();
  }
  return values(concatMaps(inferred, mapMap(printed, available)));
};

kindFnNumArgs = function(kind) {
  if (kind === star) {
    return 0;
  } else {
    return 1 + kindFnNumArgs(kind.to);
  }
};

findMatchingDefinitions = function(moduleName, reference) {
  var ctx, emptyCall, found, pattern, savedScopes, scope, scoped, topScope, type;
  savedScopes = lookupCompiledModule(moduleName).declared.savedScopes;
  ctx = contextWithDependencies(reverseModuleDependencies(moduleName)).ctx;
  scope = reference.scope, type = reference.type, pattern = reference.pattern, emptyCall = reference.emptyCall;
  if (scope == null) {
    return [];
  }
  scoped = (function() {
    var _results;
    if (savedScopes[scope]) {
      _results = [];
      while (scope !== 0) {
        found = savedScopes[scope];
        scope = found.parent;
        _results.push(found.definitions);
      }
      return _results;
    } else {
      return [];
    }
  })();
  topScope = cloneMap(ctx._scope());
  removeFromMap(topScope, '==');
  removeFromMap(topScope, 'is-null-or-undefined');
  addToMap(topScope, '{}', {
    type: quantifyAll(toConstrained(new TypeApp(arrayType, new TypeVariable('a', star)))),
    isPattern: true
  });
  return findMatchingDefinitionsOnType(type, pattern, emptyCall, join(scoped, [topScope]));
};

findMatchingDefinitionsOnType = function(type, isPattern, emptyCall, definitionLists) {
  var UNTYPED_PENALTY, ctx, curried, def, definitions, full, isTyped, isValid, name, originalOrTyped, returnType, scoreAndPrint, scored, simplePrint, sum, typed, untyped, validDefinitions, _ref1;
  ctx = new Context;
  _ref1 = unzip((function() {
    var _j, _len1, _results;
    _results = [];
    for (i = _j = 0, _len1 = definitionLists.length; _j < _len1; i = ++_j) {
      definitions = definitionLists[i];
      isValid = function(name, def) {
        return (def.type != null) && !def.type.TempType && (!isPattern || (isConst({
          symbol: name
        })) || def.isPattern) && (!emptyCall || def.type.type.type && isFunctionType(def.type.type.type));
      };
      validDefinitions = filterMap(isValid, definitions);
      if (!emptyCall) {
        validDefinitions = concatMaps.apply(null, [validDefinitions].concat(__slice.call((function() {
          var _ref1, _results1;
          _ref1 = values(validDefinitions);
          _results1 = [];
          for (name in _ref1) {
            def = _ref1[name];
            if (!(def.arity && (returnType = concreteReturnType(def.type)))) {
              continue;
            }
            curried = def.arity.length > 1 ? newMapWith("(" + name + " " + (Array(def.arity.length - 1).join(' ')) + ")", {
              type: new ForAll(def.type.kinds, new Constrained([], curriedType(def.type.type.type))),
              docs: def.docs,
              fabricated: true
            }) : void 0;
            full = newMapWith("(" + name + " " + (Array(def.arity.length).join(' ')) + ")", {
              type: new ForAll(def.type.kinds, new Constrained([], returnType)),
              docs: def.docs,
              fabricated: true
            });
            if (curried) {
              _results1.push(concatMaps(full, curried));
            } else {
              _results1.push(full);
            }
          }
          return _results1;
        })())));
      }
      UNTYPED_PENALTY = -1000000;
      sum = 0;
      simplePrint = function(constrained) {
        return (printType(constrained.type)) + ' ' + (map(printType, constrained.constraints)).join(' ');
      };
      scoreAndPrint = function(def) {
        var checkedType, freshedType, returnTypeMatching, score, sub;
        returnTypeMatching = emptyCall && !isZeroArityFunctionType(def.type.type.type);
        freshedType = freshenType(type.type);
        checkedType = (freshInstance(ctx, def.type)).type;
        sub = returnTypeMatching ? mostGeneralUnifier(functionReturnType(checkedType), functionReturnType(freshedType)) : mostGeneralUnifier(checkedType, freshedType);
        if (isFailed(sub)) {
          score = UNTYPED_PENALTY;
        } else {
          score = -((subMagnitude(checkedType, freshedType)) + i * 100);
        }
        return {
          type: simplePrint(def.type.type),
          arity: def.arity,
          docs: def.docs,
          rawType: def.type,
          score: score,
          fabricated: def.fabricated
        };
      };
      originalOrTyped = function(name, completion) {
        return (isTyped(completion)) || !completion.fabricated;
      };
      isTyped = function(completion) {
        return completion.score !== UNTYPED_PENALTY;
      };
      scored = mapMap(scoreAndPrint, validDefinitions);
      _results.push(partitionMap(isTyped, filterMap(originalOrTyped, scored)));
    }
    return _results;
  })()), typed = _ref1[0], untyped = _ref1[1];
  return values(concatMaps.apply(null, __slice.call(typed).concat(__slice.call(untyped))));
};

subMagnitude = function(candidate, subject) {
  var magnitude, opName, s, subs, _j, _len1;
  subs = join(findSubstitutions(candidate), findSubstitutions(subject));
  magnitude = 0;
  for (_j = 0, _len1 = subs.length; _j < _len1; _j++) {
    s = subs[_j];
    magnitude += s.TypeApp ? (opName = actualOpName(s.op), opName === 'Fn' ? 20 : 3) : 2;
  }
  return magnitude;
};

findSubstitutions = function(type) {
  if (type.TypeVariable && type.ref.val) {
    return [type.ref.val];
  } else if (type.TypeApp) {
    return join(findSubstitutions(type.op), findSubstitutions(type.arg));
  } else {
    return [];
  }
};

actualOpName = function(type) {
  var _ref1;
  return (_ref1 = type.name) != null ? _ref1 : actualOpName(type.op);
};

concreteReturnType = function(_arg) {
  var returnType, type;
  type = _arg.type.type;
  return (isFunctionType(type)) && (returnType = functionReturnType(type)) && (!returnType.QuantifiedVar) && returnType;
};

curriedType = function(type) {
  if (type.arg && isFunctionType(type.arg)) {
    return curriedType(type.arg);
  } else {
    return type;
  }
};

functionReturnType = function(type) {
  if (type.arg && isFunctionType(type)) {
    return functionReturnType(type.arg);
  } else {
    return type;
  }
};

isFunctionType = function(type) {
  var _ref1;
  return ((_ref1 = type.op) != null ? _ref1.op : void 0) && (typeEq(type.op.op, arrowType)) || isZeroArityFunctionType(type);
};

isZeroArityFunctionType = function(type) {
  return type.op && (typeEq(type.op, zeroArrowType));
};

findDocsFor = function(moduleName, reference) {
  var arity, docs, found, name, source, type;
  if (found = findDeclarationFor(moduleName, reference)) {
    name = reference.name;
    arity = found.arity, type = found.type, docs = found.docs, source = found.source;
    return {
      name: name,
      rawType: type,
      docs: docs,
      arity: arity,
      source: source
    };
  }
};

findDeclarationFor = function(moduleName, reference) {
  var ctx, docs, found, name, savedScope, savedScopes, scope, _ref1;
  savedScopes = lookupCompiledModule(moduleName).declared.savedScopes;
  name = reference.name, scope = reference.scope;
  while (scope > 0 && !found) {
    savedScope = savedScopes[scope];
    if (!savedScope) {
      break;
    }
    found = lookupInMap(savedScope.definitions, name);
    scope = savedScope.parent;
  }
  if (!found) {
    ctx = contextWithDependencies(reverseModuleDependencies(moduleName)).ctx;
    found = lookupInMap(ctx._scope(), name);
  }
  if (!found) {
    docs = (_ref1 = lookupInMap(ctx._scope().macros, name)) != null ? _ref1.docs : void 0;
    if (docs) {
      found = {
        docs: docs
      };
    }
  }
  return found;
};

syntaxedExpHtml = function(string) {
  return collapse(toHtml(astize(tokenize(string))));
};

syntaxedType = function(type) {
  return collapse(toHtml(typeCompile(new Context, type)));
};

compileTopLevelSource = function(source) {
  var ast, ctx, js, _ref1;
  _ref1 = compileToJs(topLevel, "(" + source + ")", -1, -1), js = _ref1.js, ast = _ref1.ast, ctx = _ref1.ctx;
  finalizeTypes(ctx, ast);
  return {
    js: js,
    ast: ast,
    types: typeEnumaration(ctx)
  };
};

compileTopLevelAndExpression = function(source) {
  return topLevelAndExpression(source);
};

topLevelAndExpression = function(source) {
  var ast, compiledDefinitions, compiledExpression, ctx, expression, terms, _j, _ref1;
  ast = astize(tokenize("(" + source + ")", -1), -1);
  _ref1 = _validTerms(ast), terms = 2 <= _ref1.length ? __slice.call(_ref1, 0, _j = _ref1.length - 1) : (_j = 0, []), expression = _ref1[_j++];
  ctx = (compiledDefinitions = compileAstToJs(definitionList, pairs(terms))).ctx;
  compiledExpression = compileCtxAstToJs(topLevelExpression, ctx, expression);
  finalizeTypes(ctx, expression);
  return {
    types: ctx._scope(),
    subs: ctx.substitution.fails,
    ast: ast,
    compiled: library + immutable + compiledDefinitions.js + '\n;' + compiledExpression.js
  };
};

typeEnumaration = function(ctx) {
  return values(mapMap(_type, ctx._scope()));
};

toJs = function(compileFn, source) {
  var _ref1;
  return (_ref1 = compileToJs(compileFn, "(" + source + ")", -1, -1)) != null ? _ref1.js : void 0;
};

compileToJs = function(compileFn, source, posOffset, depthOffset) {
  if (posOffset == null) {
    posOffset = 0;
  }
  if (depthOffset == null) {
    depthOffset = 0;
  }
  return compileAstToJs(compileFn, astFromSource(source, posOffset, depthOffset));
};

astFromSource = function(source, posOffset, depthOffset) {
  if (posOffset == null) {
    posOffset = 0;
  }
  if (depthOffset == null) {
    depthOffset = 0;
  }
  return astize(tokenize(source, posOffset), depthOffset);
};

compileAstToJs = function(compileFn, ast) {
  var ctx;
  ctx = new Context;
  return compileCtxAstToJsAlways(compileFn, ctx, ast);
};

compileCtxAstToJsAlways = function(compileFn, ctx, ast) {
  var ir, js;
  ir = compileFn(ctx, ast);
  js = compileCtxIrToJs(ctx, ir).js;
  return {
    ctx: ctx,
    ast: ast,
    ir: ir,
    js: js
  };
};

compileCtxAstToJs = function(compileFn, ctx, ast) {
  var ir, js;
  ir = compileFn(ctx, ast);
  if (ctx.requested()) {
    return {
      request: ctx.requested(),
      ast: ast,
      ir: ir
    };
  }
  js = compileCtxIrToJs(ctx, ir).js;
  return {
    ctx: ctx,
    ast: ast,
    ir: ir,
    js: js
  };
};

compileCtxIrToJs = function(ctx, ir) {
  var js, jsIr;
  if (ir) {
    jsIr = translateIr(ctx, ir);
    js = (Array.isArray(jsIr) ? translateStatementsToJs : translateToJs)(jsIr);
  }
  return {
    js: js
  };
};

astizeList = function(source) {
  return parentize(astize(tokenize("(" + source + ")", -1), -1));
};

astizeExpression = function(source) {
  return parentize(astize(tokenize(source)));
};

astizeExpressionWithWrapper = function(source) {
  return parentize(astize(tokenize("(" + source + ")", -1), -1));
};

labelDocs = function(source, params) {
  var ast, labelOperators, word, _j, _len1;
  ast = (astizeList(source)).slice(1, -1);
  if (params) {
    labelUsedParams(ast, params);
  }
  for (_j = 0, _len1 = ast.length; _j < _len1; _j++) {
    word = ast[_j];
    if (!((isForm(word)) || (word.label === 'param'))) {
      word.label = null;
    }
  }
  labelOperators = function(token, symbol, parent) {
    if ((isCall(parent)) && token === (_operator(parent))) {
      return token.label = 'operator';
    }
  };
  crawl(ast, labelOperators);
  return collapse(toHtml(ast));
};

finalizeTypes = function(ctx, ast) {
  var def, name, scope, _j, _len1, _ref1, _ref2;
  visitExpressions(ast, function(expression) {
    var type;
    if (expression.label === 'name' && expression.scope && (type = ctx.finalType(expression.symbol, expression.scope))) {
      expression.tea = type;
    }
  });
  _ref1 = ctx.savedScopes;
  for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
    scope = _ref1[_j];
    if (scope != null) {
      _ref2 = values(scope.definitions);
      for (name in _ref2) {
        def = _ref2[name];
        if (def.type) {
          def.type = substitute(ctx.substitution, def.type);
        }
      }
    }
  }
};

_tea = function(expression) {
  return expression.tea;
};

_operator = function(call) {
  return (_terms(call))[0];
};

_arguments = function(call) {
  return (_terms(call)).slice(1);
};

_validArguments = function(call) {
  return (_validTerms(call)).slice(1);
};

_terms = function(form) {
  return filter(isExpressionOrFake, form);
};

_validTerms = function(form) {
  return filter(isExpression, form);
};

_snd = function(_arg) {
  var a, b;
  a = _arg[0], b = _arg[1];
  return b;
};

_fst = function(_arg) {
  var a, b;
  a = _arg[0], b = _arg[1];
  return a;
};

_labelName = function(atom) {
  return (_symbol(atom)).slice(0, -1);
};

_stringValue = function(_arg) {
  var symbol;
  symbol = _arg.symbol;
  return symbol.slice(1, -1);
};

_symbol = function(_arg) {
  var symbol;
  symbol = _arg.symbol;
  return symbol;
};

unique = function(list) {
  return setToArray(arrayToSet(list));
};

join = function(seq1, seq2) {
  return seq1.concat(seq2);
};

concatMap = function(fn, list) {
  return concat(map(fn, list));
};

concat = function(lists) {
  var _ref1;
  return (_ref1 = []).concat.apply(_ref1, lists);
};

reverse = function(list) {
  return (map(id, list)).reverse();
};

id = function(x) {
  return x;
};

map = function(fn, list) {
  if (list) {
    return list.map(fn);
  }
};

allMap = function(fn, list) {
  return all(map(fn, list));
};

all = function(list) {
  return (filter(_is, list)).length === list.length;
};

any = function(list) {
  return (filter(_is, list)).length > 0;
};

filter = function(fn, list) {
  return list.filter(fn);
};

partition = function(fn, list) {
  return [filter(fn, list), filter(__(_not, fn), list)];
};

_notEmpty = function(x) {
  return x.length > 0;
};

_empty = function(x) {
  return x.length === 0;
};

_not = function(x) {
  return !x;
};

_is = function(x) {
  return !!x;
};

__ = function(fna, fnb) {
  return function(x) {
    return fna(fnb(x));
  };
};

merge = function(objects) {
  var a, c, key, value, _j, _len1;
  c = {};
  for (_j = 0, _len1 = objects.length; _j < _len1; _j++) {
    a = objects[_j];
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

test = function(testName, teaSource, result) {
  var compiled, e, failure, got, success;
  try {
    compiled = topLevelAndExpression(teaSource);
  } catch (_error) {
    e = _error;
    logError("Failed to compile test |" + testName + "|\n" + teaSource + "\n", e);
    return;
  }
  try {
    log(collapse(toHtml(compiled.ast)));
    if (_notEmpty(compiled.subs)) {
      log(map(formatFail, compiled.subs));
      failure = true;
    }
    if (result !== (got = eval(compiled.compiled))) {
      log("'" + testName + "' expected", result, "got", got);
      success = false;
    } else {
      success = !failure;
    }
  } catch (_error) {
    e = _error;
    logError("Error in test |" + testName + "|\n" + teaSource + "\n", e);
  }
  return success;
};

tests = ['simple defs', "a 2", "a", 2, 'more defs', "a 2\nb 3", "a", 2, 'constant data', "Color (data Red Blue)\nr Red\nb Blue\nr2 Red", "(== r r2)", true, 'match numbers', "positive (fn [n]\n(match n\n  0 False\n  m True))", "(positive 3)", true, 'composite data', "Person (data\n  Baby\n  Adult [name: String])\n\na (Adult \"Adam\")\n\nb Baby\n\nname (fn [person]\n  (match person\n    (Adult name) name))", "(name a)", "Adam", 'records', "Person (record name: String id: Num)\n\nname (fn [person]\n  (match person\n    (Person name id) name))", "(name ((Person id: 3) \"Mike\"))", "Mike", 'polymorphic records', "Person (record [a] name: a id: Num)\n\nname (fn [person]\n  (match person\n    (Person name id) name))", "(name ((Person id: 3) \"Mike\"))", "Mike", 'recursive data', "Tree (data [a]\n  Val [value: a]\n  Node [child: (Tree a)])", '(Val-value (Node-child (Node (Val 42))))', 42, 'late bound function', "f (fn [x] (g x))\ng (fn [x] 2)", "(f 4)", 2, 'late bound def', "[x y] z\nz [1 2]", "y", 2, 'tuples', "snd (fn [pair]\n(match pair\n  [x y] y))", "(snd [1 2])", 2, 'match data', "Person (record name: String id: Num)\nname (fn [person]\n  (match person\n    (Person \"Joe\" id) 0\n    (Person name id) id))", "(name (Person \"Mike\" 3))", 3, 'seqs', "{x y z} list\nlist {1 2 3}", "z", 3, 'match seq', "tail? (fn [list]\n  (match list\n    {} False\n    xx True))\n{x ..xs} {1}", "(tail? xs)", false, 'seq splice in match', "& (macro [what to]\n  (: (Fn a (Array a) (Array a)))\n  (Js.call (Js.access to \"unshift\") {what}))\n\nmap (fn [what to]\n  (match to\n    {} {}\n    {x ..xs} (& (what x) (map what xs))))\n\n{{x} ..xs} (map (& 42) {{}})", "x", 42, 'typed function', "f (fn [x y]\n(: (Fn Bool String Bool))\nx)", "(f True \"a\")", true, 'classes', "Show (class [a]\n  show (fn [x] (: (Fn a String))))\n\nshow-string (instance (Show String)\n  show (fn [x] x))\n\naliased-show (fn [something]\n  (show something))\n\nshowed-simply (show \"Hello\")\nshowed-via-alias (aliased-show \"Hello\")", "(== showed-simply showed-via-alias)", true, 'multiple methods', "Util (class [a]\n  show (fn [x] (: (Fn a String)))\n  read (fn [x] (: (Fn String a))))\n\nutil-string (instance (Util String)\n   show (fn [x] x)\n   read (fn [x] x))\n\ntest (fn [string]\n  (: (Fn String String))\n  (read (show string)))", "(test \"Hello\")", "Hello", 'multiple instances', "Show (class [a]\n  show (fn [x] (: (Fn a String))))\n\nshow-string (instance (Show String)\n  show (fn [x] x))\n\nshow-bool (instance (Show Bool)\n  show (fn [x]\n    (match x\n      True \"True\"\n      False \"False\")))", "(show False)", "False", 'instance constraints', "Show (class [a]\n  show (fn [x] (: (Fn a String))))\n\nshow-string (instance (Show String)\n  show (fn [x] x))\n\nshow-snd (instance (Show [a b])\n  {(Show a) (Show b)}\n  show (fn [x]\n    (match x\n      [fst snd] (show snd))))", "(show [\"Adam\" \"Michal\"])", "Michal", 'instance constraints on array', "Show (class [a]\n  show (fn [x] (: (Fn a String))))\n\nshow-string (instance (Show String)\n  show (fn [x] x))\n\nhead (fn [array]\n  x\n  {x ..xs} array)\n\nshow-snd (instance (Show (Array a))\n  {(Show a)}\n  show (fn [array]\n    (show (head array))))", "(show {\"Michal\" \"Adam\"})", "Michal", 'multiple constraints', "Show (class [a]\n  show (fn [x] (: (Fn a String))))\n\nHide (class [a]\n  hide (fn [x] (: (Fn a String))))\n\nshow-string (instance (Show String)\n  show (fn [x] x))\n\nhide-string (instance (Hide String)\n  hide (fn [x] x))\n\nf (fn [x]\n  (== (show x) (hide x)))", "(f \"Hello\")", true, 'superclasses', "Eq (class [a]\n  = (fn [x y] (: (Fn a a Bool))))\n\nOrd (class [a]\n  {(Eq a)}\n  <= (fn [x y] (: (Fn a a Bool))))\n\neq-bool (instance (Eq Bool)\n  = (fn [x y]\n    (match [x y]\n      [True True] True\n      [False False] True\n      [w z] False)))\n\nord-bool (instance (Ord Bool)\n  <= (fn [x y]\n    (match [x y]\n      [True any] True\n      [w z] (= w z))))\n\ntest (fn [x]\n  (== (<= x x) (= x x)))", "(test False)", true, 'function with constrained result', "Eq (class [a]\n  = (fn [x y] (: (Fn a a Bool))))\n\n!= (fn [x y]\n  (not (= x y)))\n\nnot (fn [x]\n  (match x\n    False True\n    True False))\n\neq-bool (instance (Eq Bool)\n  = (fn [x y]\n    (match [x y]\n      [True True] True\n      [False False] True\n      [w z] False)))", "(!= False True)", true, 'polymorphic data', "Maybe (data [a]\n  None\n  Just [value: a])\n\nfrom-just (fn [maybe]\n  (match maybe\n    (Just x) x))", "(from-just (Just 42))", 42, 'js unary op', "~ (macro [x]\n  (: (Fn Num Num))\n  (Js.unary \"-\" x))\nx -42", "(~ x)", 42, 'js binary op', "+ (macro [x y]\n  (: (Fn Num Num Num))\n  (Js.binary \"+\" x y))", "(+ 1 2)", 3, 'js cond', "if (macro [what then else]\n  (: (Fn Bool a a a))\n  (Js.ternary what then else))", "(if False 1 2)", 2, 'currying functional macros', "* (macro [x y]\n  (: (Fn Num Num Num))\n  (Js.binary \"*\" x y))\n\nf (* 2)", "(f 3)", 6, 'getters', "Person (record\n  first: String last: String)\n\njack (Person \"Jack\" \"Jack\")", "(== (Person-first jack) (Person-last jack))", true, 'macros in instances', "Show (class [a]\n  show (fn [x] (: (Fn a String))))\n\nnum-to-string (macro [n]\n  (: (Fn Num String))\n  (Js.binary \"+\" n \"\\\"\\\"\"))\n\nshow-num (instance (Show Num)\n  show (fn [x]\n    (num-to-string x)))", "(show 3)", '3', 'fib', "fibonacci (fn [month] (adults month))\n\nadults (fn [month]\n  (match month\n    1 0\n    n (+ (adults previous-month) (babies previous-month)))\n  previous-month (- 1 month))\n\nbabies (fn [month]\n  (match month\n    1 1\n    n (adults (- 1 month))))\n\n+ (macro [x y]\n  (: (Fn Num Num Num))\n  (Js.binary \"+\" x y))\n\n- (macro [x y]\n  (: (Fn Num Num Num))\n  (Js.binary \"-\" y x))", "(fibonacci 7)", 8, 'Map literal', "data {a: True b: False}\n\nkey? (macro [what in]\n  (: (Fn k (Map k i) Bool))\n  (Js.call (Js.access in \"has\") {what}))\n\nat (macro [key in]\n  (: (Fn k (Map k i) i))\n  (Js.call (Js.access in \"get\") {key}))", "(== (key? \"c\" data) (at \"b\" data))", true, 'create Set', "data (Set \"Adam\" \"Vojta\" \"Michal\")\n\nelem? (macro [what in]\n  (: (Fn i (Set i) Bool))\n  (Js.call (Js.access in \"has\") {what}))", "(elem? \"Michal\" data)", true, 'create Map', "data (Map 3 \"a\" 5 \"b\")\n\nat (macro [key in]\n  (: (Fn k (Map k i) i))\n  (Js.call (Js.access in \"get\") {key}))", "(at 5 data)", 'b', 'type alias', "Point (type [Num Num])\n\nx (fn [p]\n  (: (Fn Point Num))\n  first\n  [first second] p)", "(x [3 4])", 3, 'collections', "Collection (class [collection]\n  elem? (fn [what in]\n    (: (Fn item (collection item) Bool))\n    (# Whether in contains what .)))\n\nBag (class [bag]\n  {(Collection bag)}\n\n  fold (fn [with initial over]\n    (: (Fn (Fn item b b) b (bag item)))\n    (# Fold over with using initial .))\n\n  length (fn [bag]\n    (: (Fn (bag item) Num))\n    (# The number of items in the bag .))\n\n  empty? (fn [bag]\n    (: (Fn (bag item) Bool))\n    (# Whether the bag contains no elements.)))\n\nlist-elem? (macro [what in]\n  (: (Fn item (Array item) Bool))\n  (Js.call (Js.access in \"contains\") {what}))\n\ncollection-list (instance (Collection Array)\n  elem? (fn [what in]\n    (list-elem? what in)))", "(elem? 3 {1 2 3})", true, 'multiparam classes', "Collection (class [ce e]\n  first (fn [in]\n    (: (Fn (ce e) e))))\n\nlist-first (macro [in]\n  (: (Fn (Array item) item))\n  (Js.call (Js.access in \"first\") {}))\n\nlist-collection (instance (Collection Array a)\n  first (fn [in]\n    (list-first in)))", "(first {42 43 44})", 42, 'functional deps', "Collection (class [ce e]\n  first (fn [in]\n    (: (Fn ce e))))\n\nlist-first (macro [in]\n  (: (Fn (Array item) item))\n  (Js.call (Js.access in \"first\") {}))\n\nlist-collection (instance (Collection (Array a) a)\n  first (fn [in]\n    (list-first in)))", "(first {42 43 44})", 42, 'functional deps on function', "Map (class [m k v]\n  put (fn [key value map]\n    (: (Fn k v m m))))\n\nmap-map (instance (Map (Map k v) k v)\n  put (macro [key value map]\n    (: (Fn k v (Map k v) (Map k v)))\n    (Js.call (Js.access map \"set\") {key value})))\n\ncount (macro [map]\n  (: (Fn (Map k v) Num))\n  (Js.access map \"size\"))\n\nmagic (fn [key map]\n  (put key 42 map))", "(count (magic \\C (Map)))", 1, 'super classes with less params', "Bag (class [b i]\n  length (fn [bag]\n    (: (Fn b Num)))\n  id (fn [item]\n    (: (Fn i i))))\n\nMap (class [m k v]\n  {(Bag m v)}\n  put (fn [key value map]\n    (: (Fn k v m m))))\n\nmap-bag (instance (Bag (Map k v) v)\n  length (macro [map]\n    (: (Fn (Map k v) Num))\n    (Js.access map \"size\"))\n  id (fn [x] x))\n\nmap-map (instance (Map (Map k v) k v)\n  put (macro [key value map]\n    (: (Fn k v (Map k v) (Map k v)))\n    (Js.call (Js.access map \"set\") {key value})))\n\nmagic (fn [key map]\n  (put key 42 map))", "(length (magic \\C (Map)))", 1, 'functional deps with instance constraints', "Stack (data [a]\n  Nil\n  Node [value: a tail: (Stack a)])\n\nEq (class [a]\n  = (fn [x y] (: (Fn a a Bool))))\n\nnum-eq (instance (Eq Num)\n  = (macro [x y]\n    (: (Fn Num Num Bool))\n    (Js.binary \"===\" x y)))\n\nCollection (class [collection item]\n  elem? (fn [what in]\n    (: (Fn item collection Bool))))\n\nBag (class [bag item]\n  fold (fn [with initial over]\n    (: (Fn (Fn a item a) a bag a))))\n\nstack-collection (instance (Collection (Stack a) a)\n  {(Eq a)}\n  elem? (fn [what in]\n    (= what what)))\n\nstack-bag (instance (Bag (Stack a) a)\n  fold (fn [with initial over]\n    (match over\n      Nil initial\n      (Node x xs) (fold with (with initial x) xs))))", "(elem? 2 (Node 2 Nil))", true, 'deferring constraints on explicitly typed Js-inferred values', "Eq (class [a]\n  = (fn [x y] (: (Fn a a Bool))))\n\nnum-eq (instance (Eq Num)\n  = (macro [x y]\n    (: (Fn Num Num Bool))\n    (Js.binary \"===\" x y)))\n\nSet (class [set item]\n  remove (fn [what from]\n    (: (Fn item set item))))\n\narray-set (instance (Set (Array a) a)\n  {(Eq a)}\n  remove (fn [what from]\n    (:: a (.indexOf from what))))", "(remove 2 {1 2 3})", 1, 'nested pattern matching', "f (fn [x]\n  y\n  [[z y] g] x)", "(f [[2 42] 3])", 42, 'deferring in tuples', "g [f {} 3]\nf 4\n[o t r] g", "o", 4, 'multiple generic constraints', "Show (class [a]\n  show (fn [x] (: (Fn a String))))\n\nshow-string (instance (Show String)\n  show (fn [x] x))\n\nf (fn [pair]\n  [(show a) (show b)]\n  [a b] pair)\n\n[x y] (f [\"A\" \"B\"])", "x", "A", 'higher-order use of constrained function', "Show (class [a]\n  show (fn [x] (: (Fn a String))))\n\nshow-string (instance (Show String)\n  show (fn [x] x))\n\nf (fn [pair]\n  [(show a) (show b)]\n  [a b] pair)\n\napply (fn [m to]\n  (m to))\n\n[x y] (apply f [\"A\" \"B\"])", "x", "A", 'deeply deferred', "c b\nb a\na 3", "c", 3, 'compile before typing due to multiple deferred', "a (f 3)\nf (fn [x] (h g x))\ng (fn [x] b)\nh (fn [y z] (y z))\nb 4\nc (f 2)", "a", 4, 'more deferred', "a (e 3)\n\nmap (fn [l] (l 2))\n\ne (fn [x]\n  (map f)\n  k (g 2))\n\nf (fn [x]\n  (h 2))\n\ng (fn [x]\n  2)\n\nh (fn [x]\n  (j 1))\n\nj (fn [x]\n  2)", "a", 2, 'constants in classes', "A (class [c e]\n  empty (: c)\n\n  first (fn [x] (: (Fn c e))))\n\nlist-a (instance (A (Array a) a)\n  empty {}\n\n  first (macro [list]\n    (: (Fn (Array a) a))\n    (Js.call (Js.access list \"first\") {})))\n\nunshift (macro [what to]\n  (: (Fn a (Array a) (Array a)))\n  (Js.call (Js.access to \"unshift\") {what}))", "(first (unshift 3 empty))", 3, 'values with constraints', "A (class [c]\n  empty (: c))\n\nB (class [c e]\n  add (fn [what to] (: (Fn e c c))))\n\nlist-a (instance (A (Array a))\n  empty {})\n\nlist-b (instance (B (Array a) a)\n  add (macro [what to]\n    (: (Fn a (Array a) (Array a)))\n    (Js.call (Js.access to \"unshift\") {what})))\n\nfirst (macro [list]\n  (: (Fn (Array a) a))\n  (Js.call (Js.access list \"first\") {}))\n\nsome (add 2 empty)\n\nx (first some)", "x", 2, 'curried type constructor', "+ (macro [x y]\n  (: (Fn Num Num Num))\n  (Js.binary \"+\" x y))\n\nget (macro [key from]\n  (: (Fn k (Map k v) v))\n  (Js.method from \"get\" {key}))\n\nput (macro [key value into]\n  (: (Fn k v (Map k v) (Map k v)))\n  (Js.method into \"set\" {key value}))\n\nMappable (class [wrapper]\n  map (fn [what onto]\n    (: (Fn (Fn a b) (wrapper a) (wrapper b)))\n    (# Apply what to every value inside onto .)))\n\nreduce-map (macro [with initial over]\n  (: (Fn (Fn a v k a) a (Map k v) a))\n  (Js.method over \"reduce\" {with initial}))\n\nmap-mappable (instance (Mappable (Map k))\n  map (fn [what onto]\n    (reduce-map helper (Map) onto)\n    helper (fn [acc value key]\n      (put key (what value) acc))))", "(get \"c\" (map (+ 1) {a: 3 b: 2 c: 4}))", 5, 'reduced call context', "Bag (class [bag item]\n  empty (: bag)\n\n  fold (fn [with initial over]\n    (: (Fn (Fn item a a) a bag a)))\n\n  append (fn [what to]\n    (: (Fn bag bag bag)))\n\n  first (fn [of]\n    (: (Fn bag item))))\n\narray-bag (instance (Bag (Array a) a)\n  empty {}\n\n  fold (macro [with initial list]\n    (: (Fn (Fn a b b) b (Array a) b))\n    (Js.method list \"reduce\"\n      {(fn [acc x] (with x acc)) initial}))\n\n  append (macro [what to]\n    (: (Fn (Array a) (Array a) (Array a)))\n    (Js.method to \"concat\" {what}))\n\n  first (macro [list]\n    (: (Fn (Array a) a))\n    (Js.method list \"first\" {})))\n\nconcat (fn [bag-of-bags]\n  (fold append empty bag-of-bags))", "(first (concat {{1} {2} {3}}))", 1, 'mixing constructor classes with fundeps', concatTest = "Mappable (class [wrapper]\n  map (fn [what onto]\n    (: (Fn (Fn a b) (wrapper a) (wrapper b)))))\n\nBag (class [bag item]\n  size (fn [bag]\n    (: (Fn bag Num)))\n\n  empty (: bag)\n\n  fold (fn [with initial over]\n    (: (Fn (Fn item a a) a bag a)))\n\n  join (fn [what with]\n    (: (Fn bag bag bag))))\n\narray-mappable (instance (Mappable Array)\n  map (macro [what over]\n    (: (Fn (Fn a b) (Array a) (Array b)))\n    (Js.method over \"map\" {what})))\n\narray-bag (instance (Bag (Array a) a)\n  size (macro [list]\n    (: (Fn (List a) Num))\n    (Js.access list \"size\"))\n\n  empty {}\n\n  fold (macro [with initial list]\n    (: (Fn (Fn a b b) b (Array a) b))\n    (Js.method list \"reduce\"\n      {(fn [acc x] (with x acc)) initial}))\n\n  join (macro [what with]\n    (: (Fn (Array a) (Array a) (Array a)))\n    (Js.method what \"concat\" {with})))\n\nconcat (fn [bag-of-bags]\n  (fold join empty bag-of-bags))\n\nconcat-map (fn [what over]\n  (concat (map what over)))", "(size (concat-map (fn [x] {1}) {1 2 3}))", 3, 'overloaded subfunctions', "" + concatTest + "\n\nconcat-suffix (fn [suffix what]\n  (fold join-suffix empty what)\n  join-suffix (fn [x joined]\n    (concat {joined suffix x})))", "(size (concat-suffix {1} (concat-map (fn [x] {{1}}) {1 2 3})))", 6, 'overloaded subfunctions 2', "id (fn [x] x)\n\nBag (class [bag item]\n  fold (fn [with initial over]\n    (: (Fn (Fn item a a) a bag a))))\n\nfold-right (fn [with initial over]\n  ((fold helper id over) initial)\n  helper (fn [x r acc]\n    (r (with x acc))))", "6", 6, 'overloaded subfunctions 3', "Deq (class [seq item]\n  && (fn [what to]\n    (: (Fn item seq seq))))\n\narray-deq (instance (Deq (Array a) a)\n  && (macro [what to]\n    (: (Fn a (Array a) (Array a)))\n    (Js.method to \"push\" {what})))\n\nAppendable (class [collection item]\n  & (fn [what to]\n    (: (Fn item collection collection))))\n\nBag (class [bag item]\n  empty (: bag)\n\n  fold (fn [with initial over]\n    (: (Fn (Fn item a a) a bag a))))\n\nsplit (fn [bag]\n  (: (Fn ba (Array ba)) (Appendable ba a) (Bag ba a))\n  (fold wrap {} bag)\n  wrap (fn [x all]\n    (&& (& x empty) all)))", "6", 6, 'overloaded subfunctions 4', "id (fn [x] x)\n\nif (macro [what then else]\n  (: (Fn Bool a a a))\n  (Js.ternary what then else))\n\nBag (class [bag item]\n  fold (fn [with initial over]\n    (: (Fn (Fn item a a) a bag a))\n    (# Fold over using with and initial folded value .)))\n\nAppendable (class [collection item]\n  & (fn [what to]\n    (: (Fn item collection collection))))\n\nfold-right (fn [with initial over]\n  ((fold wrap id over) initial)\n  wrap (fn [x r acc]\n    (r (with x acc))))\n\narray-bag (instance (Bag (Array a) a)\n  fold (macro [with initial list]\n    (: (Fn (Fn a b b) b (Array a) b))\n    (Js.method list \"reduce\"\n      {(fn [acc x] (with x acc)) initial})))\n\narray-appendable (instance (Appendable (Array a) a)\n  & (macro [what to]\n    (: (Fn a (Array a) (Array a)))\n    (Js.method to \"unshift\" {what})))\n\nchars (macro [string]\n  (: (Fn String (Array Char)))\n  (Js.call \"Immutable.List\"\n    {(Js.method string \"split\" {\"''\"})}))\n\nstring-bag (instance (Bag String Char)\n  fold (fn [with initial string]\n    (fold with initial (chars string))))\n\nstring-appendable (instance (Appendable String Char)\n  & (macro [what to]\n    (: (Fn Char String String))\n    (Js.binary \"+\" what to)))\n\nSet (class [set item]\n  elem? (fn [what in]\n    (: (Fn item set Bool))\n    (# Whether in contains what .)))\n\nset-set (instance (Set (Set a) a)\n  elem? (macro [what in]\n    (: (Fn (Set a) a Bool))\n    (Js.method in \"contains\" {what})))\n\nmy-split (fn [separators text]\n  (fold-right distinguish [\"\" {\"\"}] text)\n  distinguish (fn [letter done]\n    (if (elem? letter separators)\n      [(& letter seps-in-order) (& \"\" words)]\n      [seps-in-order (& (& letter first-word) rest-words)])\n    {first-word ..rest-words} words\n    [seps-in-order words] done))\n\nseparators (Set \\space \\, \\!)\n\n[seps words] (my-split separators \"Hello, world!\")", "seps", ", !", 'recursive overloaded functions', "Show (class [a]\n  show (fn [x] (: (Fn a String))))\n\nshow-string (instance (Show String)\n  show (fn [x] x))\n\nshow-bool (instance (Show Bool)\n  show (fn [x] \"Bool\"))\n\naliased-show (fn [something b]\n  (match b\n    True (aliased-show something False)\n    False (show something)))\n\nx (aliased-show \"Bool\" True)\ny (fn [x] (aliased-show x True))", "(== x (y True))", true, 'ffi function', "upper-case (fn [x]\n  (: (Fn String String))\n  (.toUpperCase x))", "(upper-case \"Hello\")", "HELLO", 'ffi expression', "", "(.toUpperCase \"x\")", "X", 'ffi access', "", "Math.PI", Math.PI, 'ffi access on global', "", "global.Math.PI", Math.PI, 'sets', "first (macro [set]\n  (: (Fn (Set a) a))\n  (Js.method set \"first\" {}))\nx 2\ny (Set x 1 3)", '(first y)', 2, 'recursion in subfunction', "f (fn [x]\n  (match x\n    True False\n    False g)\n  g (f True))", 'False', false, 'lifting into conditionals', "f (fn [x]\n  (cond\n    x False\n    True g)\n  g (f True))", '(f False)', false, 'lifting with nested functions', "f (fn [x]\n  ((fn [y]\n      g) 2)\n  g 3)", '(f False)', 3, 'lifting into match conditional', "f (fn [x]\n  (match x\n    True False\n    False g)\n  g (f h)\n  h True)", '(f False)', false, 'lifting into match', "Maybe (data [a]\n  None\n  Just [value: a])\n\nf (fn [x]\n  (match x\n    None 0\n    (Just y) g)\n  g y)", '(f (Just 4))', 4, 'lifting into match from a call', "Maybe (data [a]\n  None\n  Just [value: a])\n\nf (fn [x]\n  (match x\n    None 0\n    (Just [y z]) g)\n  g (y z))", '(f (Just [(fn [w] w) 2]))', 2, 'shadowing', "f (macro [n]\n  (: (Fn Num Num))\n  (Js.binary \"+\" n 2))\n\ng (fn [x]\n  y\n  y (f x)\n  f (fn [y] y))", '(g 3)', 3, 'zero arity', "f (fn [] 4)\n\ng (f)", 'g', 4, 'syntax macro', "id (syntax [x]\n  x)\n\nsome (syntax [y]\n  (` (id (, y))))", '(some 42)', 42, 'pattern match syntax', "+ (macro [x y]\n  (: (Fn Num Num Num))\n  (Js.binary \"+\" x y))\n\ninfix (syntax [exp]\n  (match exp\n    (` ((, x) (, op) (, z))) (` ((, op) (, x) (, z)))\n    _ (` \"Failed to match syntax\")))\n\nf (infix (3 + 4))", 'f', 7, 'shortened syntax quote', "+ (macro [x y]\n  (: (Fn Num Num Num))\n  (Js.binary \"+\" x y))\n\ninfix (syntax [exp]\n  (match exp\n    (` ,x ,op ,z) (` ,op ,x ,z)\n    _ (` \"Failed to match syntax\")))\n\nf (infix (3 + 4))", 'f', 7, 'constraints and deferring', "Show (class [a]\n  show (fn [x] (: (Fn a String))))\n\nshow-string (instance (Show String)\n  show (fn [x] x))\n\ns (fn [y]\n  (show y))\n\nf (fn [x]\n  g)\n\ng \"2\"\n\nr (fn [y]\n  (f (s y)))\n\nj (fn [x]\n  (r \"src\"))", '(j 2)', "2", 'deferred in where', "f (fn [x] g)\n\ng 3\n\nh (fn [x]\n  2\n  gg (fn [x]\n    ff)\n  ff (f \"\"))", '(h 3)', 2, 'overloaded reference', "Mappable (class [wrapper]\n  map (fn [what onto]\n    (: (Fn (Fn a b) (wrapper a) (wrapper b)))))\n\narray-mappable (instance (Mappable Array)\n  map (macro [what over]\n    (: (Fn (Fn a b) (Array a) (Array b)))\n    (Js.method over \"map\" {what})))\n\ng (fn [lines]\n  (map f lines))\n\nf (fn [x]\n  x)\n\nexpand (fn [x]\n  gg\n  gg (g {\"\"}))", '3', 3, 'defer in subdefinition', "f (fn [x]\n  \"\"\n  g (fn [y]\n    ((fn [x] x) h))\n  h ((fn [x] x) x))", '3', 3, 'dont lift when used in function', "Maybe (data [a]\n  None\n  Some [value: a])\n\nf (fn [x]\n  (match x\n    None (g 4)\n    (Some v) h)\n  h 45\n  hh h\n  g (fn [x]\n    h)\n  p (fn [x] (p x)))", '(f None)', 45, 'ambiguity on deferred non polymorphic', "Show (class [a]\n  show (fn [x] (: (Fn a String))))\n\nshow-string (instance (Show String)\n  show (fn [x] x))\n\nf (fn [x]\n  (g x))\n\ng (fn [y]\n  \"\")\n\nexpand (fn [z w]\n  \"\"\n  d (f (show w)))", '(expand 3 "2")', "", 'shadowing in resolve deferred types', "f (fn [x]\n  (g x))\n\ng (fn [y]\n  \"\")\n\nd 4\n\nexpand (fn [z w]\n  \"\"\n  d (f 3))", '(expand 3 "2")', "", 'using constructor in deferred definition', "Maybe (data [a]\n  None\n  Just [value: a])\n\ntest (fn []\n  (Just x)\n  x (test2))\n\ntest2 (fn []\n  42)", "(Just-value (test))", 42];

testNamed = function(givenName) {
  var expression, name, result, source, _j, _len1, _ref1, _ref2;
  _ref1 = tuplize(4, tests);
  for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
    _ref2 = _ref1[_j], name = _ref2[0], source = _ref2[1], expression = _ref2[2], result = _ref2[3];
    if (name === givenName) {
      return source + "\n" + "_ " + expression;
    }
  }
  throw new Error("Test " + givenName + " not found!");
};

logError = function(message, error) {
  return log(message, error.message, error.stack.replace(/\n?((\w+)[^>\n]+>[^>\n]+>[^>\n]+:(\d+:\d+)|.*)(?=\n)/g, '\n$2 $3').replace(/\n (?=\n)/g, ''));
};

debug = function(fun) {
  var e;
  try {
    return fun();
  } catch (_error) {
    e = _error;
    return logError("debug", e);
  }
};

runTest = function(givenName) {
  var expression, name, result, source, _j, _len1, _ref1, _ref2;
  _ref1 = tuplize(4, tests);
  for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
    _ref2 = _ref1[_j], name = _ref2[0], source = _ref2[1], expression = _ref2[2], result = _ref2[3];
    if (name === givenName) {
      test(name, source + "\n" + expression, result);
    }
  }
  return "Done";
};

runTests = function(tests) {
  var expression, name, result, results, source;
  results = (function() {
    var _j, _len1, _ref1, _ref2, _results;
    _ref1 = tuplize(4, tests);
    _results = [];
    for (_j = 0, _len1 = _ref1.length; _j < _len1; _j++) {
      _ref2 = _ref1[_j], name = _ref2[0], source = _ref2[1], expression = _ref2[2], result = _ref2[3];
      _results.push(test(name, source + "\n" + expression, result));
    }
    return _results;
  })();
  if (all(results)) {
    return "All correct";
  } else {
    return (filter(_not, results)).length + " failed";
  }
};

exports.compileModuleTopLevel = compileModuleTopLevel;

exports.compileModuleWithDependencies = compileModuleWithDependencies;

exports.compileExpression = compileExpression;

exports.parseTopLevel = parseTopLevel;

exports.parseExpression = parseExpression;

exports.expand = expandCall;

exports.findAvailableTypes = findAvailableTypes;

exports.findMatchingDefinitions = findMatchingDefinitions;

exports.findDocsFor = findDocsFor;

exports.astizeList = astizeList;

exports.astizeExpression = astizeExpression;

exports.astizeExpressionWithWrapper = astizeExpressionWithWrapper;

exports.syntaxedExpHtml = syntaxedExpHtml;

exports.syntaxedType = syntaxedType;

exports.prettyPrint = prettyPrint;

exports.plainPrettyPrint = plainPrettyPrint;

exports.labelDocs = labelDocs;

exports.builtInLibraryNumLines = library.split('\n').length + immutable.split('\n').length;

exports.library = library;

exports.originOf = originOf;

exports.sortedArgs = sortedArgs;

exports.isNotCapital = isNotCapital;

exports.isForm = isForm;

exports.isCall = isCall;

exports.isAtom = isAtom;

exports.join = join;

exports.concatMap = concatMap;

exports.concat = concat;

exports.id = id;

exports.map = map;

exports.zipWith = zipWith;

exports.unzip = unzip;

exports.allMap = allMap;

exports.all = all;

exports.filter = filter;

exports.partition = partition;

exports._notEmpty = _notEmpty;

exports._empty = _empty;

exports._is = _is;

exports.__ = __;

exports._operator = _operator;

exports._arguments = _arguments;

exports._terms = _terms;

exports._validTerms = _validTerms;

exports._snd = _snd;

exports._fst = _fst;

exports._labelName = _labelName;

exports._symbol = _symbol;

exports.call_ = call_;

exports.fn_ = fn_;

exports.token_ = token_;

});