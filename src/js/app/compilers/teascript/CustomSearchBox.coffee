require "ace/ace"
dom = require("ace/lib/dom")
SearchBox = require("ace/ext/searchbox").SearchBox

# Had to overwrite because we use a different layout
html = """<div class="ace_search left">
    <div class="ace_search_options">
        <span action="toggleRegexpMode" class="ace_button" title="RegExp Search">.*</span>
        <span action="toggleCaseSensitive" class="ace_button" title="CaseSensitive Search">Aa</span>
        <span action="toggleWholeWords" class="ace_button" title="Whole Word Search">\\b</span>
    </div>
    <div class="ace_search_forms">
        <div class="ace_search_form">
            <input class="ace_search_field" placeholder="Search for" spellcheck="false"></input>
            <button type="button" action="findNext" class="ace_searchbtn next"></button>
            <button type="button" action="findPrev" class="ace_searchbtn prev"></button>
            <button type="button" action="findAll" class="ace_searchbtn" title="Alt-Enter">All</button>
        </div>
        <div class="ace_replace_form">
            <input class="ace_search_field" placeholder="Replace with" spellcheck="false"></input>
            <button type="button" action="replaceAndFindNext" class="ace_replacebtn">Replace</button>
            <button type="button" action="replaceAll" class="ace_replacebtn">All</button>
        </div>
    </div>
    <button type="button" action="hide" class="ace_searchbtn_close"></button>
</div>""".replace(/>\s+/g, ">");

class CustomSearchBox extends SearchBox
 constructor: (editor, range, showReplaceForm) ->
    div = dom.createElement("div");
    div.innerHTML = html;
    this.element = div.firstChild;

    this.$init();
    this.setEditor(editor);

exports.Search = (editor, isReplace) ->
    sb = editor.searchBox || new CustomSearchBox(editor)
    sb.show(editor.session.getTextRange(), isReplace)
