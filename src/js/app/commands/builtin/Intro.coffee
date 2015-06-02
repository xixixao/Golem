{_div, _p, _table, _tr, _td, _code, _img, _pre} = require 'hyper'

text = """
<b>Shem</b> is a new statically typed functional language compiled to JavaScript.

<b>Golem</b> is a browser-based IDE for Shem.

What you are looking at is Golem. If you give Golem a Shem program, it will run it. Click inside the input box  and type:

  <span style="font-family: Monaco, monospace">"Hello Golem!"</span>

Now press Enter. Congratulations, you have
1) Written your first Shem program.
2) Ran your own Shem program.
3) Got set up with everything you need to write Shem programs.

Next steps:
- Run the command :help
- Run the command :examples
- Start breathing again after you spotted all the parentheses
- Bug us on <a href="http://github.com/xixixao/shem">Github</a>, download the <a href="http://github.com/xixixao/shem/desktop">desktop version</a> that let's you edit real files
- Have fun!
"""

class IntroCommand
  @defaultSymbols = ['intro']
  @description = 'Show introduction'
  @symbols = @defaultSymbols

  @execute = (args, state, editor) ->
    intro = _div style: padding: '25px',
      _img
        src: 'img/intro.png'
        width: '50%'
        height: '50%'
        style: margin: '0 0 30px'
      _div
        style:
          'font-family': 'Helvetica, Arial',
          'white-space': 'pre-wrap'
        dangerouslySetInnerHTML: __html: text
    editor.log _div intro

module.exports = [IntroCommand]
