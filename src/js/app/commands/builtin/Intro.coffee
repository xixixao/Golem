{_div, _p, _table, _tr, _td, _code, _img, _pre} = require 'hyper'

intro = """
<div style="text-align: center">
  <img src="img/intro.png" width="50%" height="50%">
</div>
<b>Shem</b> is a new statically typed functional language compiled to JavaScript.
<b>Golem</b> is a browser-based IDE for Shem.

What you are looking at is Golem. If you give Golem a Shem program, it will run it. Click inside the input box in the top left and type:

  <code>"Hello Golem!"</code>

Now press Enter. Congratulations, you have
1) Written your first Shem program.
2) Ran your own Shem program.
3) Got set up with everything you need to write Shem programs.

Next steps:
- Go through the <a href=":e;:tutorial">Tutorial</a>
- Run the command :help
- Run the command :examples
- Start breathing again after you spotted all the parentheses
- Bug us on <a href="http://github.com/xixixao/Golem">Github</a>, download the <a href="http://github.com/xixixao/shem/desktop">desktop version</a> that let's you edit real files
- Learn <a href="http://github.com/xixixao/shem">more</a>
"""

tutorial = """Welcome! This tutorial covers the introduction to both the IDE and the language. <a href=":e;:intro">back to intro</a>

The IDE has three components, the command line in the top left corner, the module editor below it, and the output area on the right, where you are reading this tutorial. First, let's learn how to control the output area. Type:
    <code>42</code>
  on the command line and press Enter. You should see a new output box above this one, with two 42s. If your cursor is still blinking on the command line, press Tab. Alternatively, click on the edge of the output box with 42 in it. Either way, the output box should now be highlighted with a bright blue border. This means you have it selected. Press Backspace (the delete key on Macs). The box should now disappear and this one should be highlighted. If you move your cursor back to the command line, the output box will get deselected. This is the basic way in which you can control your working area, making space for more programs while still seeing this tutorial.

You can also change the proportions of the

"""

userStudy = """You will write the famous binary search algorithm. The objective of this exercise is not to test your abilities or knowledge of the algorithm but to test the environment you will be using.

1. To start off, place cursor in the top left input field and type the following character by character:
    <code>(search 3 {1 2 3 4})</code>
  and press Enter.

  <code>search</code> should be colored in deep red. Hover over it with the cursor to see the error message. Whenever you see a name or parentheses in deep red, you can hover over them to see the error message.

2. Click on <code>search</code>. Simple clicking selects names. Try it on the numbers. If you click behind a closing bracket, brace or parentheses, you will select the whole expression. Same if you click before an opening one.

3. With <code>search</code> selected, press Ctrl-D, to define the function.

4. You should see <code>search</code> turn blue. This is the color for functions being called.

5. Now with the cursor still blinking on <code>search</code> (if it isn't, click on it again), press Ctrl-T, to insert its type.

6. You should now have
    <code>search (fn [x y]
      (: (Fn Num (Array Num) f)))</code>
  In the main editing area on the left. This is a function definition. Here <code>search</code> is in green, because it is a new name you are defining. After an empty space is the value of the definition, in this case a function. This will be the only function definition we will need. <code>x</code> and <code>y</code> are parameters to the function. The expression starting with <code>:</code> is the type of the function.

7. Click on <code>f</code> at the end of the type and press Backspace (delete on a Mac). You should see a list of suggestions. Type:
    <code>N</code>
  Now <code>Num</code> should be the first suggestion.

8. Press Tab. The <code>Num</code> got inserted. Remember that you cannot use Enter to insert completions because it is reserved for making new lines.

9. Now we have the complete type of our search function. You should still have cursor at Num, so press <code>)</code> twice. Now the whole type should be selected.

10. Press Enter. You will no doubt get a list of suggestions again. Press Tab to insert <code>x</code>. Now look to the right, you see <code>3</code> below the call to search. That's right, because we just made it return the first argument. The completions are based on types, so <code>y</code> was not suggested, because we declared the return type of our function to be <code>Num</code>.

11. Now, we are going to use the indexing method for implementing the binary search. Lets first rename the parameters. Click on the green <code>x</code> in the parameter list and type:
    <code>what</code>
  Now click on the <code>y</code> and type:
    <code>in</code>
  Great, now click back on the <code>x</code>. Type first:
    <code>(</code>
  The <code>x</code> should now be wrapped in parentheses and selected. We don't want to call x, so just type over it:
    <code>search-in what 0 (size in) in</code>

12. We have not defined <code>search-in</code>, so let's define it the same way we defined <code>search</code>. If the cursor is still at the <code>list</code> you can use the left arrow to get to <code>search-in</code>. Try moving around the current source with different arrows. Now select <code>search-in</code>, either using a click or the arrows, and press Ctrl-D.

13. You should now have
    <code>search-in (fn [n x y list]
      )</code>
  directly below the line we just edited. If you remember Haskell, this is like a definition inside the where clause.

14. Now press Ctrl-U. The definition moves to the top scope. Because we passed in both the <code>what</code> and the <code>in</code> we do not have to have <code>search-in</code> inside of <code>search</code>.

15. Rename <code>x</code> and <code>y</code> to <code>min</code> and <code>max</code>. Now if you get the cursor back to the empty space inside <code>search-in</code> the autocompletion will suggest all the parameters. They are all numbers. Select max, by typing <code>ma</code> or using the Down arrow key and hit Tab. You should now see that the result of calling <code>search</code> on the right is the length of passed-in the list. Try adding more numbers to the list and see how the changes are reflected immediately.

16. Binary search looks at the middle number in the list each time. We therefore need to calculate the middle index. Instead of <code>max</code>, Type:
    <code>(+ min (div 2 (- min max)))</code>
  If the list has 5 elements, you should get the number 2. If it has 3, you should get 1. Try again to change the list and see what result you get.

17. Let's give this number a name. If you click on any expression inside <code>(+ min (div 2 (- min max)))</code> you can select the whole parent expression by using together Command + Up arrow couple times. If you went to far, you can use Command + Down to select a child expression. Command + arrows work on the expression tree, so Command + Right/Left will select the sibling expression, not the next name or number.

18. With the whole <code>(+ min (div 2 (- min max)))</code> expression selected, pres Ctrl-D and type:
    <code>half</code>
  The results should stay the same. Hit Escape to select only the top <code>half</code> reference.

19. Now with cursor at <code>half</code> pres Command-(, which is Command-Shift-9. This wraps the <code>half</code> in a new call and lets you put in the function name. Type:
    <code>at</code>
  Press Right, Space, and type:
    <code>in</code>
  You should now have the call <code>(at half in)</code> as the body of the <code>search-in</code> function. If you look at the result, you should see something like:
    <code>(Some value: 3)</code>
  This is because <code>at</code> returns a the maybe type <code>?</code>. Hover over at to see its documentation.

20. To get the value out of the maybe value, wrap it inside of a call to <code>!!</code>. You already know the Command-( shortcut. You should have:
    <code>(!! (at half in))</code>
  And the result should be the number in the middle of the list. Try to change the list to see this works.

21. Let's call this value <code>middle</code>. Use Ctrl-D as we did when we defined <code>half</code> and hit Escape to cancel the multiple selection.

22. We need to test the base condition, that <code>max</code> is strictly bigger than <code>min</code>. Wrap <code>middle</code> inside of a call and type:
    <code>(if (>= max min)</code>
  And press enter. Now press Shift-Enter and type:
    <code>None</code>
  Now press the Down arrow and wrap middle in the call to <code>Some</code>. You should have:
    <code>(if (>= max min)
      None
      (Some middle))</code>

23. You should see an error message, the result type, which is the last argument in the call to <code>Fn</code>, of <code>search</code> does not match what <code>search-in</code> returns. Wrap the <code>Num</code> in a call to <code>?</code>.

24. Now we are ready to finish the algorithm. This is a mouthful, but imagine how much code it would be in Java! Select the following code, all of it, copy it (Command-C) and then select the <code>(Some middle)</code> expression and press Command-V to paste over it:

<code>(match (compare n middle)
  LT (search-in n min half list)
  GT (search-in n (+ 1 half) max list)
  EQ (Some half))</code>

25. Can you read the code? Could you tell what it does? Try changing the values on the right and see that the result is correct.

26. Last step, replace <code>(compare n middle)</code> with <code>(log min max half n (compare n middle))</code>. You should see a logging output on the right. Again, play around with the inputs to <code>search</code>. Can you tell now what is happening?
"""
# 23. You should see an error message, the result type, which is the last argument in the call to <code>Fn</code>, of <code>search</code> does not match what <code>search-in</code> returns. Wrap the <code>Num</code> in a call to <code>?</code>. You should now see a different error, that says that there is no such thing as <code>(Map (Array Num) Num (? Num))</code>, which means "there is no map <code>(Array Num)</code> with keys of type <code>Num</code> and values of type <code>(? Num)</code>". Can you tell what the problem is? It will help to hover on the green <code>search-in</code> name and see its inferred type. It says that it takes a map <code>c-b</code> which has values of type <code>(? b)</code> and returns a value <code>(? b)</code>. The reason is that we are returning

displayBox = (htmlText, editor) ->
  _div
    style:
      # 'color': '#eee'
      'font-family': 'Helvetica, Arial'
      'font-size': '13px'
      'white-space': 'pre-wrap'
      'max-height': '600px'
      'overflow': 'scroll'
    className: 'messageDisplay intro'
    dangerouslySetInnerHTML: __html: htmlText
    onClick: (event) ->
      if /:/.test commands = event.target.pathname?[1...]
        for command in commands.split ';'
          console.log command
          editor.executeCommand (command[1...].split ' ')...
        event.preventDefault()

class IntroCommand
  @defaultSymbols = ['intro']
  @description = 'Show introduction'
  @symbols = @defaultSymbols

  @execute = (args, state, editor) ->
    editor.log _div displayBox intro, editor

class TutorialCommand
  @defaultSymbols = ['tutorial']
  @description = 'Show the tutorial'
  @symbols = @defaultSymbols

  @execute = (args, state, editor) ->
    editor.log _div displayBox tutorial, editor

module.exports = [IntroCommand, TutorialCommand]
