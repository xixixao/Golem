define(function(require,exports,module){var e,t,n,r,i=module.uri||"",o=(i.substring(0,i.lastIndexOf("/")+1),{}.hasOwnProperty),s=function(e,t){function n(){this.constructor=e}for(var r in t)o.call(t,r)&&(e[r]=t[r]);return n.prototype=t.prototype,e.prototype=new n,e.__super__=t.prototype,e};require("ace/ace"),n=require("ace/lib/dom"),t=require("ace/ext/searchbox").SearchBox,r='<div class="ace_search left">\n<div class="ace_search_options">\n    <span action="toggleRegexpMode" class="ace_button" title="RegExp Search">.*</span>\n    <span action="toggleCaseSensitive" class="ace_button" title="CaseSensitive Search">Aa</span>\n    <span action="toggleWholeWords" class="ace_button" title="Whole Word Search">\\b</span>\n</div>\n<div class="ace_search_forms">\n    <div class="ace_search_form">\n        <input class="ace_search_field" placeholder="Search for" spellcheck="false"></input>\n        <button type="button" action="findNext" class="ace_searchbtn next"></button>\n        <button type="button" action="findPrev" class="ace_searchbtn prev"></button>\n        <button type="button" action="findAll" class="ace_searchbtn" title="Alt-Enter">All</button>\n    </div>\n    <div class="ace_replace_form">\n        <input class="ace_search_field" placeholder="Replace with" spellcheck="false"></input>\n        <button type="button" action="replaceAndFindNext" class="ace_replacebtn">Replace</button>\n        <button type="button" action="replaceAll" class="ace_replacebtn">All</button>\n    </div>\n</div>\n<button type="button" action="hide" class="ace_searchbtn_close"></button>\n</div>'.replace(/>\s+/g,">"),e=function(e){function t(e){var t;t=n.createElement("div"),t.innerHTML=r,this.element=t.firstChild,this.$init(),this.setEditor(e)}return s(t,e),t}(t),exports.Search=function(t,n){var r;return r=t.searchBox||new e(t),r.show(t.session.getTextRange(),n)}});