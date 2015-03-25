# Copied from Ace for performance when loading, see the differences

ace          = require("ace/ace")

require("ace/lib/fixoldbrowsers");

dom = require("ace/lib/dom");
event = require("ace/lib/event");

Editor = require("ace/editor").Editor;
EditSession = require("ace/edit_session").EditSession;
UndoManager = require("ace/undomanager").UndoManager;
Renderer = require("ace/virtual_renderer").VirtualRenderer;
require("ace/worker/worker_client");
require("ace/keyboard/hash_handler");
require("ace/placeholder");
require("ace/multi_select");
require("ace/mode/folding/fold_mode");
require("ace/theme/textmate");
require("ace/ext/error_marker");

exports.edit = (el, mode, theme) ->

    if (el && el.env && el.env.editor instanceof Editor)
        return el.env.editor;

    value = "";
    if (el && /input|textarea/i.test(el.tagName))
        oldNode = el;
        value = oldNode.value;
        el = dom.createElement("pre");
        oldNode.parentNode.replaceChild(el, oldNode);
    else
        value = dom.getInnerText(el);
        el.innerHTML = '';

    doc = ace.createEditSession(value, mode);

    editor = new Editor(new Renderer(el, theme), doc);
    mode.attachToEditor(editor);

    env = {
        document: doc,
        editor: editor,
        onResize: editor.resize.bind(editor, null)
    };
    env.textarea = oldNode if (oldNode)
    event.addListener(window, "resize", env.onResize);
    editor.on("destroy", ->
        event.removeListener(window, "resize", env.onResize);
        env.editor.container.env = null; # prevent memory leak on old ie
    );
    editor.container.env = editor.env = env;
    return editor;
