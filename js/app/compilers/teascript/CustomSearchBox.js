define(function (require, exports, module) {
  var __filename = module.uri || "", __dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1);
  var CustomSearchBox, SearchBox, dom, html,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

require("ace/ace");

dom = require("ace/lib/dom");

SearchBox = require("ace/ext/searchbox").SearchBox;

html = "<div class=\"ace_search left\">\n<div class=\"ace_search_options\">\n    <span action=\"toggleRegexpMode\" class=\"ace_button\" title=\"RegExp Search\">.*</span>\n    <span action=\"toggleCaseSensitive\" class=\"ace_button\" title=\"CaseSensitive Search\">Aa</span>\n    <span action=\"toggleWholeWords\" class=\"ace_button\" title=\"Whole Word Search\">\\b</span>\n</div>\n<div class=\"ace_search_forms\">\n    <div class=\"ace_search_form\">\n        <input class=\"ace_search_field\" placeholder=\"Search for\" spellcheck=\"false\"></input>\n        <button type=\"button\" action=\"findNext\" class=\"ace_searchbtn next\"></button>\n        <button type=\"button\" action=\"findPrev\" class=\"ace_searchbtn prev\"></button>\n        <button type=\"button\" action=\"findAll\" class=\"ace_searchbtn\" title=\"Alt-Enter\">All</button>\n    </div>\n    <div class=\"ace_replace_form\">\n        <input class=\"ace_search_field\" placeholder=\"Replace with\" spellcheck=\"false\"></input>\n        <button type=\"button\" action=\"replaceAndFindNext\" class=\"ace_replacebtn\">Replace</button>\n        <button type=\"button\" action=\"replaceAll\" class=\"ace_replacebtn\">All</button>\n    </div>\n</div>\n<button type=\"button\" action=\"hide\" class=\"ace_searchbtn_close\"></button>\n</div>".replace(/>\s+/g, ">");

CustomSearchBox = (function(_super) {
  __extends(CustomSearchBox, _super);

  function CustomSearchBox(editor, range, showReplaceForm) {
    var div;
    div = dom.createElement("div");
    div.innerHTML = html;
    this.element = div.firstChild;
    this.$init();
    this.setEditor(editor);
  }

  return CustomSearchBox;

})(SearchBox);

exports.Search = function(editor, isReplace) {
  var sb;
  sb = editor.searchBox || new CustomSearchBox(editor);
  return sb.show(editor.session.getTextRange(), isReplace);
};

});
