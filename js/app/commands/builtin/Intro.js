define(function (require, exports, module) {
  var __filename = module.uri || "", __dirname = __filename.substring(0, __filename.lastIndexOf("/") + 1);
  var IntroCommand, text, _code, _div, _img, _p, _pre, _ref, _table, _td, _tr;

_ref = require('hyper'), _div = _ref._div, _p = _ref._p, _table = _ref._table, _tr = _ref._tr, _td = _ref._td, _code = _ref._code, _img = _ref._img, _pre = _ref._pre;

text = "<b>Shem</b> is a new statically typed functional language compiled to JavaScript.\n<b>Golem</b> is a browser-based IDE for Shem.\n\nWhat you are looking at is Golem. If you give Golem a Shem program, it will run it. Click inside the input box in the top left and type:\n\n  <span style=\"font-family: Monaco, monospace\">\"Hello Golem!\"</span>\n\nNow press Enter. Congratulations, you have\n1) Written your first Shem program.\n2) Ran your own Shem program.\n3) Got set up with everything you need to write Shem programs.\n\nNext steps:\n- Run the command :help\n- Run the command :examples\n- Start breathing again after you spotted all the parentheses\n- Bug us on <a href=\"http://github.com/xixixao/shem\">Github</a>, download the <a href=\"http://github.com/xixixao/shem/desktop\">desktop version</a> that let's you edit real files\n- Learn <a href=\"http://github.com/xixixao/shem\">more</a>";

text = "You will write the famous binary search algorithm. The objective of this exercise is not to test your abilities or knowledge of the algorithm but to test the environment you will be using.\n\n1. To start off, place cursor in the top left input field and type:\n    <code>(search 3 {1 2 3 4})</code>\n  and press Enter.\n\n  <code>search</code> should be colored in deep red. Hover over it with the cursor to see the error message. Whenever you see a name or parentheses in deep red, you can hover over them to see the error message.\n\n2. Click on <code>search</code>. Simple clicking selects names. Try it on the numbers. If you click on a bracket, brace or parentheses, you will select the whole expression.\n\n3. With <code>search</code> selected, press Ctrl-D, to define the function.\n\n4. You should see <code>search</code> turn blue. This is the color for functions being called.\n\n5. Now with the cursor still blinking on <code>search</code> (if it isn't, click on it again), press Ctrl-T, to insert its type.\n\n6. You should now have\n    search (fn [x y]\n      (: (Fn Num (Array Num) f)))\n  In the main editing area on the left. This is a function definition. Here <code>search</code> is in green, because it is a new name you are defining. After an empty space is the value of the definition, in this case a function. This will be the only function defintion we will need. <code>x</code> and <code>y</code> are parameters to the function. The expression starting with <code>:</code> is the type of the function.\n\n7. Click on <code>f</code> at the end of the type and press Backspace (delete on a Mac). You should see a list of suggestions, the first one being <code>Num</code>.\n\n8. Press Tab. The <code>Num</code> got inserted. Remember that you cannot use Enter to insert completions because it is reserved for making new lines.\n\n9. Now we have the complete type of our search function. You should still have cursor at Num, so press <code>)</code> twice. Now the whole type should be selected.\n\n10. Press enter. You will no doubt get a list of suggestions again. Press Tab to insert <code>x</code>. Now look to the right, you see <code>3</code> below the call to search. That's right, because we just made it return the first argument. The completions are based on types, so <code>y</code> was not suggested, because we declared the return type of our function to be <code>Num</code>.\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n";

IntroCommand = (function() {
  function IntroCommand() {}

  IntroCommand.defaultSymbols = ['intro'];

  IntroCommand.description = 'Show introduction';

  IntroCommand.symbols = IntroCommand.defaultSymbols;

  IntroCommand.execute = function(args, state, editor) {
    var intro;
    intro = _div({
      style: {
        padding: '25px'
      }
    }, _div({
      style: {
        'color': '#eee',
        'font-size': '13px',
        'line-height': '16px',
        'white-space': 'pre-wrap',
        'max-height': '600px',
        'overflow': 'scroll'
      },
      className: 'messageDisplay',
      dangerouslySetInnerHTML: {
        __html: text
      }
    }));
    return editor.log(_div(intro));
  };

  return IntroCommand;

})();

module.exports = [IntroCommand];

});
