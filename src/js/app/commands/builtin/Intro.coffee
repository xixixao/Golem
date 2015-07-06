{_div, _p, _table, _tr, _td, _code, _img, _pre} = require 'hyper'
marked = require 'marked'

intro = """
<div style="text-align: center; margin-bottom: 20px">
  <img src="img/intro.png" width="50%" height="50%">
</div>

**Shem** is a new statically typed functional language compiled to JavaScript.
**Golem** is a browser-based IDE for Shem.

What you are looking at is Golem. If you give Golem a Shem program, it will run it. Click inside the input box in the top left and type:

```"Hello Golem!"```

Now press Enter. Congratulations, you have
1. Written your first Shem program.
2. Ran your own Shem program.
3. Got set up with everything you need to write Shem programs.

Next steps:
- Go through the [Tutorial](:e;:tutorial)
- Look at the [Language Reference](:e;:language-reference)
- Start breathing again after you spotted all the parentheses
- Bug us on <a href="http://github.com/xixixao/Golem">Github</a>
"""
# , download the <a href="http://github.com/xixixao/shem/desktop">desktop version</a> that let's you edit real files
# - Learn <a href="http://github.com/xixixao/shem">more</a>

tutorial = """
[Intro](:e;:intro) > Tutorial

Welcome! This tutorial provides an introduction to the Golem IDE.

## IDE Components

The IDE has three components, the command line in the top left corner, the module editor below it, and the output area on the right, where you are reading this tutorial.

### Command Line

You can either run commands or evaluate expressions on the command line.

#### IDE commands

The IDE commands deal with files and controlling the IDE. To run an IDE command, type `:command-name` followed by space separated arguments and hit <kbd>Enter</kbd>. For example, [:help](:help) will list all available commands and `:tutorial` will display this tutorial again, in case you manage to close it.

#### Evaluating Expressions

Any expression can be evaluated by typing it in and pressing <kbd>Enter</kbd>.

#### History

The command line keeps a unique history of commands and programs run. You can navigate this history using <kbd title="Up">↑</kbd> and <kbd title="Down">↓</kbd> keys.

### Module Editor

This is where you edit the source of a module. See below for explanation of Golem's editing model.

You can change the proportion between the module editor and the output area by dragging the boundary between them.

### Output Area

This is where programs are run and commands display their output. The area is populated with output boxes. One such box contains this tutorial. You can click on the border of any box to select it. Pressing <kbd>Backspace</kbd> (<kbd>delete</kbd> key on a Mac) will remove the box.

Once a box is selected, you can select sibling boxes using the <kbd title="Left">←</kbd> and <kbd title="Right">→</kbd> keys.

If the command line is in focus (the cursor is blinking on it), the first output box can be selected using the <kbd>Tab</kbd> key.

If you move the cursor back to the module editor or the command line, the output boxes will be deselected.

## Editing Source Code

Golem uses a structural approach to editing - code is edited in terms of its AST instead of its plain-text representation. The changes on the AST are then displayed in plain-text.

Shem's source code consists of expressions - either atoms or forms. A form is a list of expressions, called terms, enclosed in delimiters, either parentheses or square brackets or curly braces. Holes are positions between delimiters or whitespace where new expressions can be added.

### Selection

In Golem, selection always contains one or more expressions.

#### Mouse Selection

Clicking on an atom, including its beginning, will select the whole atom. The same applies to forms, a big complicated expression can be selected simply by clicking on one of its two delimiters. Having some expression selected, you can select a range by holding Shift and clicking on another expression - all expressions between the two will be selected, possibly expanding the selection to parent forms so that all selected expressions are on the same level in the AST. Holding <kbd>Command</kbd> and clicking on an expression triggers the multi-selection mode (multiple cursors, described below).

Clicking on a hole places the cursor on that position. Because clicking is by default used for selection, you need to use a long press for placing cursor anywhere within an atom.

#### Keyboard Selection

<kbd title="Left">←</kbd> and <kbd title="Right">→</kbd> keys are used to travel between previous and next atoms/holes, the leaves of the AST. The <kbd title="Up">↑</kbd> and <kbd title="Down">↓</kbd> keys travel between atoms/holes on previous and next lines and similarly to a cursor in a text editor maintain horizontal position between lines. Press <kbd>Command</kbd> together with arrow keys to perform tree traversal. <kbd>Command</kbd>-<kbd title="Down">↓</kbd> selects the first term within a form, <kbd>Command</kbd>-<kbd>Shift</kbd>-<kbd title="Down">↓</kbd> selects the last child.

Shift-<kbd title="Left">←</kbd>/<kbd title="Right">→</kbd> expand the selection to sibling or parent expression.

<kbd>Command</kbd>-<kbd title="Down">↓</kbd> combination when an atom is selected places the cursor at its end ready for adding more characters. Since Golem preserves the validity of the text representation of the AST, if the atom is itself delimited, that is if it is a string or a regular expression literal, Golem places the cursor automatically within the delimiters. <kbd>Command</kbd>-<kbd>Shift</kbd>-<kbd title="Down">↓</kbd> can be used to place the cursor at the beginning of an atom. <kbd>Alt</kbd>-<kbd title="Left">←</kbd>/<kbd title="Right">→</kbd> moves cursor within an atom.

### Inserting
Code can be typed or pasted in. Selections are overwritten, they always form a valid place to insert into the AST since they are in general a range of sibling expressions. Inserting text within a delimited atom ensures that delimiters are properly escaped. Pressing <kbd>Space</kbd> creates a new sibling hole to insert the next expression, whether you are currently editing an atom or selecting an expression, while <kbd>Shift</kbd>-<kbd>Space</kbd> creates a hole before the current selection. <kbd>Enter</kbd> and <kbd>Shift</kbd>-<kbd>Enter</kbd> work correspondingly.

Pressing <kbd>(</kbd>, <kbd>[</kbd> or <kbd>{</kbd> opens a new correspondingly delimited form while typing any closing delimiter selects the parent expression. Atom delimiters work similarly.

### Editing Actions
Golem provides many useful actions for transforming code. To see all the available actions and their shortcuts, use the [:keys](:keys) command, where you can click on the shortcut of each action to perform it directly in the module editor.

- <kbd>Command</kbd>-<kbd>(</kbd> wraps the selection in parenthesized form, with a hole at its start for the new operator.
- <kbd>Ctrl</kbd>-<kbd>Space</kbd> flattens the selection into a single line, removing any new lines.
- <kbd>Ctrl</kbd>-<kbd>P</kbd> replaces the parent of the current selection with the selection.
- <kbd>Alt</kbd>-<kbd title="Left">←</kbd>/<kbd title="Right">→</kbd> shifts the current selection between the leaves of the AST.
- <kbd>Alt</kbd>-<kbd title="Up">↑</kbd>/<kbd title="Down">↓</kbd> shifts expressions on the current line similarly to text editors but preserves the AST. It is useful for shifting definitions in definition lists.

## The Language

Now that you are familiar with the IDE, let's learn more about the language itself. You can keep this tutorial open for reference. Display [:language-reference](:language-reference).
"""

languageReference = """
This is a short guide to Shem, the language. By clicking on each example, you can either evaluate it or add it to the current module editor. You are encouraged to insert the examples yourself and modify them as desired. Some examples are taken from [Learn You a Haskell](http://learnyouahaskell.com) for comparison.

## Basics

These will give you a feel for the expression syntax of the language.

### Literals and calling functions

```$
(+ 2 15)```

```$
(* 4 19)```

You might not expect the following order of the operands:

```$
(- 1472 1892)```

```$
(/ 2 5)```

No precendence rules to remember:

```$
(* 50 (- 184 672))```

Booleans:

```$
(and True False)```

```$
(and True True)```

```$
(or False True)```

```$
(not False)```

```$
(not (and True True))```

Equality:

```$
(= 5 5)```

```$
(= 1 0)```

```$
(!= 5 5)```

```$
(!= "hello" "hello")```

What non-LISP languages call functions:

```$
(sqrt 49)```

```$
(min 9 10)```

```$
(max 101.5 101.51)```

## Defining functions

```
double-me (fn [x]
  (+ x x))
```


"""

oldTutorial = """Welcome! This tutorial covers the introduction to both the IDE and the language. <a href=":e;:intro">back to intro</a>

The IDE has three components, the command line in the top left corner, the module editor below it, and the output area on the right, where you are reading this tutorial. First, let's learn how to control the output area. Type:
    <code>42</code>
on the command line and press Enter. You should see a new output box above this one, with two 42s.

Click on the edge of the output box with 42 in it. The output box should now be highlighted with a bright blue border, meaning it is selected. Press Backspace (the delete key on Macs). The box should now disappear and this one should be highlighted instead. If you move your cursor back to the command line, the output box will get deselected. This is the basic way in which you can control your working area, making space for more programs while still seeing this tutorial.


Shem is a functional language, similar to Haskell, so let's try some function. Type the following, character by character at the command line:
    <code>(even? 42)</code>
The answer should be True. You can hover over the <code>even?</code> to see its documentation. There are many functions to play with currently included in the Prelude. To modify a program, let's learn about selection.

In Golem, selection works on the AST of the language, which is represented by S-Expressions, such as the one you just wrote. If you click anywhere inside the <code>even?</code> atom (atoms are the simplest expressions), you will select it and it will be highlighted in bright blue. If you clicked with a longer press, you might have started editing the atom and the selection is only faint blue. Just try clicking again. You can now remove the function using Backspace (delete).

You should now see a list of functions which can be applied to your number because they take a number as their first argument. If you type in:
    <code>od</code>
then hit Tab and you should now have the call <code>(odd? 42)</code> and the result False.

Numbers are nice, but let's learn a bit more of Shem's syntax, so we can construct more interesting programs. Evaluate the following:
    <code>(size "Hello, world!")</code>
First, notice that if you type <code>"</code> at the end of the string, the string will get selected. In the same way, if you type <code>)</code> inside of a form (form is an expression consisting of more expressions, called terms), the whole form will get selected. In this way, if you type all closing delimiters (quotes, parentheses), you can type any Shem program character by character as you would type it in a text editor.

The string is displayed with proper quotation marks, this is merely for legibility and has no impact on compilation. Now change the current expression to this one:
    <code>(split-on " " "Hello, world!")</code>
The result should be <code>{“Hello,” “world!”}</code>, a list of two strings.


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
      fontFamily: 'Helvetica, Arial'
      padding: '20px'
      # whiteSpace: 'pre-wrap'
      maxHeight: '600px'
      overflow: 'scroll'
    className: 'messageDisplay intro'
    dangerouslySetInnerHTML: __html: htmlText
    onClick: (event) ->
      console.log event.target
      console.log event.target.pathname?[1...]
      if /:/.test commands = event.target.pathname?[1...]
        for command in commands.split ';'
          console.log command
          editor.executeCommand (command[1...].split ' ')...
      event.preventDefault()

class IntroCommand
  @defaultSymbols = ['intro']
  @description = 'Show the introduction'
  @symbols = @defaultSymbols

  @execute = (args, state, editor) ->
    editor.log _div displayBox (marked intro), editor

class TutorialCommand
  @defaultSymbols = ['tutorial']
  @description = 'Show the tutorial'
  @symbols = @defaultSymbols

  @execute = (args, state, editor) ->
    editor.log _div displayBox (marked tutorial), editor

class LanguageReferenceCommand
  @defaultSymbols = ['language-reference']
  @description = 'Show the language reference'
  @symbols = @defaultSymbols

  @execute = (args, state, editor) ->
    moduleName = editor.unnamedModuleName()
    id = 1000
    marked languageReference,
      highlight: (code, tag) ->
        displayId = "display#{id++}"
        isTopLevel = tag isnt '$'
        console.log tag, isTopLevel
        setTimeout ->
          editor.createAceEditor code, displayId, moduleName, isTopLevel
        , 1
        """<div id="#{displayId}" style="height: 22px"></div>"""
      (_, text) ->
          editor.log _div displayBox text, editor



module.exports = [IntroCommand, TutorialCommand, LanguageReferenceCommand]
