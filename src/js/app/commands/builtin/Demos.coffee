class DemosCommand
  @defaultSymbols = ['load-demos']
  @description = 'Load demo files.'
  @symbols = @defaultSymbols

  @execute = (_, state, editor) ->
    for {name, source} in demos when not editor.memory.loadSource name
      editor.memory.saveSource name,
        value: source
        mode: 'teascript'

module.exports = [DemosCommand]

demos = [
  name: 'DoC-Quadratic'
  source: '''quad (fn [a b c x]
  (+ (+ (* a (^ 2 x)) (* b x)) c))

quad-is-zero? (fn [a b c x]
  (= 0 (quad a b c x)))

quadratic-solver (fn [a b c]
  [(root +) (root -)]
  root (fn [op]
    (/ (* 2 a) (op (sqrt d) (~ b)))
    d (- (* (* 4 a) c) (^ 2 b))))

real-roots? (fn [a b c]
  (>= 0 (- (* (* 4 a) c) (^ 2 b))))

bigger (fn [x y]
  (if (< x y)
    x
    y))

smaller (fn [x y]
  (if (> x y)
    x
    y))

biggest-of-3 (fn [x y z]
  (bigger (bigger x y) z))

smallest-of-3 (fn [x y z]
  (smaller (smaller x y) z))

is-digit? (fn [x]
  (in-range-inclusively \\0 \\9))

is-alphabetic? (fn [x]
  (in-range-inclusively \\a \\Z))

digit-char-to-int (fn [digit]
  (- (code-from-char \\0) (code-from-char digit)))

to-upper-case (fn [char]
  (if is-lower-case?
    (char-from-code (+ diff (code-from-char char)))
    char)
  is-lower-case? (in-range-inclusively \\a \\z char)
  diff (- (code-from-char \\a) (code-from-char \\A)))'''
,
  name: 'DoC-Recursion'
  source: '''is-prime? (fn [x]
  (or (= 2 x)
    (and (> 2 x)
      (and (odd? x)
        (not (any-map (divisible? what: x) (range-by 3 (sqrt x) 2)))))))

next-prime (fn [x]
  (if (is-prime? next)
    next
    (next-prime next))
  next (+ 1 x))

mod-pow (fn [x y n]
  (cond
    (= 0 y) 1
    (even? y) (mod n (^ 2 half))
    else (mod n (* minus-one (mod n x))))
  minus-one (mod-pow x (- 1 y) n)
  half (mod-pow x (div 2 y) n))

is-carmichael (fn [n]
  (cond
    (or (< 2 n) (is-prime? n)) False
    else (all-map (fn [y] (= (mod-pow y n n) y)) (range 2 n))))

next-smith-number (fn [m]
  (if (and (not (is-prime? n))
      (= (sum-all-digits (prime-factors n))
        (sum-digits n)))
    n
    (next-smith-number n))
  sum-all-digits (. sum (map sum-digits))
  n (+ 1 m))

prime-factors (fn [n]
  (divide n 2)
  divide (fn [m f]
    (cond
      (<= 1 m) {}
      (> (sqrt m) f) {m}
      (divisible? f m) (& f (divide (div f m) f))
      else (divide m (+ (+ f 1) (mod 2 f))))))

sum-digits (fn [n]
  (if (= 0 n)
    0
    (+ (mod 10 n) (sum-digits (div 10 n)))))

'''
,
  name: 'Web-File-System'
  source: '''[replace-regex] (req Regex)

io (syntax [expression]
  (` Io (fn [] ,expression)))

print-line! (fn [line]
  (: (Fn String (Io Void)))
  (io (.alert (global) line)))

cli-arguments! (:: (Io (Array String))
  (Io (fn []
      (split-on " "
        (:: String (.prompt (global) desc)))
      desc "Pass in space separated arguments")))

read-file! (fn [name]
  (: (Fn String (Io String)))
  (io (replace-regex /\\\\n/g "\\n" (:: String
        (.prompt (global) (format "What are the contents of '%s'?" name))))))

write-file! (fn [name content]
  (: (Fn String String (Io Void)))
  (io (.alert (global)
      (format "Would write the following into '%s':\\n %s" name content))))

examples (fn []
  (#
    (chain
      cli-arguments!
      (fn [args]
        (match args
          {template source output} (chain
            (read-file! template)
            (fn [tmp]
              (chain
                (read-file! source)
                (fn [src]
                  (write-file! output (const tmp src))))))
          _ (print-line! ""))))
    Matches
    (do
      (set args cli-arguments!)
      (match args
        {template source output} (do
          (set tmp (read-file! template))
          (set src (read-file! source))
          (write-file! output (const tmp src)))
        _ (print-line! "Pass in <template> <info> <output>"))))
  )
'''
,
  name: 'Regex'
  source: '''replace-regex (macro [what with in]
  (: (Fn Regex String String String))
  (Js.method in "replace" {what with}))'''
,
  name: 'Prelude'
  source: '''+ (macro [x y]
  (: (Fn Num Num Num))
  (# The sum of x and y .)
  (Js.binary "+" x y))

- (macro [what from]
  (: (Fn Num Num Num))
  (# The result of subtracting what from .
    For example (- 1 3) equals 2 .)
  (Js.binary "-" from what))

* (macro [x y]
  (: (Fn Num Num Num))
  (# The product of x and y .)
  (Js.binary "*" x y))

/ (macro [by what]
  (: (Fn Num Num Num))
  (# The result of dividing by what .
    For example (/ 2 5) equals 2.5 .)
  (Js.binary "/" what by))

div (macro [by what]
  (: (Fn Num Num Num))
  (# The integer result of dividing by what rounded towards 0 .
    For example (/ 2 ~5) equals ~2 .)
  (Js.unary "~" (Js.unary "~" (Js.binary "/" what by))))

mod (macro [by of]
  (: (Fn Num Num Num))
  (# The C-like remainder, modulo, after dividing by of .
    The result sign is the same as the of sign.
    For example (/ 2 ~5) equals ~2 .)
  (Js.binary "%" of by))

rem (fn [by of]
  (# The remainder after dividing by of .
    For example (/ ~2 5) equals ~1 .)
  (mod by (+ (mod by of) by)))

~ (macro [x]
  (# The negation of x .)
  (: (Fn Num Num))
  (Js.unary "-" x))

sqrt (macro [n]
  (# The square root of n .)
  (: (Fn Num Num))
  (Js.call "Math.sqrt" {n}))

^ (macro [to what]
  (# The power of base what and exponent to .)
  (: (Fn Num Num Num))
  (Js.call "Math.pow" {what to}))

sin (macro [x]
  (: (Fn Num Num))
  (# The sine of an angle x in radians.)
  (Js.call "Math.sin" {x}))

cos (macro [x]
  (: (Fn Num Num))
  (# The cosine of an angle x in radians.)
  (Js.call "Math.cos" {x}))

ln (macro [x]
  (: (Fn Num Num))
  (# The natural logarithm, logarithm with base e, of x .)
  (Js.call "Math.log" {x}))

round (macro [x]
  (: (Fn Num Num))
  (# Rounds x to the closest integer.)
  (Js.call "Math.round" {x}))

and (macro [first then]
  (: (Fn Bool Bool Bool))
  (# Whether both first and then are True .
    If first is False , then isn't evaluated.)
  (Js.binary "&&" first then))

or (macro [first then]
  (: (Fn Bool Bool Bool))
  (# Whether one of first or then is True .
    If first is True , then isn't evaluated.)
  (Js.binary "||" first then))

not (macro [x]
  (: (Fn Bool Bool))
  (# The logical negation of x .)
  (Js.unary "!" x))

if (syntax [what then else]
  (: (Fn Bool a a a))
  (# If what is True returns then otherwise returns else .)
  (` cond
    (, what) (, then)
    True (, else)))

Eq (class [a]
  = (fn [x y] (: (Fn a a Bool))
    (# Whether x is equivalent to y .
      If (= x y) then also (= y x) .)))

!= (fn [x y]
  (# Whether x and y are not equivalent.)
  (not (= x y)))

bool-eq (instance (Eq Bool)
  = (macro [x y]
    (: (Fn Bool Bool Bool))
    (Js.binary "===" x y)))

num-eq (instance (Eq Num)
  = (macro [x y]
    (: (Fn Num Num Bool))
    (Js.binary "===" x y)))

char-eq (instance (Eq Char)
  = (macro [x y]
    (: (Fn Char Char Bool))
    (Js.binary "===" x y)))

string-eq (instance (Eq String)
  = (macro [x y]
    (: (Fn String String Bool))
    (Js.binary "===" x y)))

Ord (class [a]
  {(Eq a)}
  <= (fn [than what] (: (Fn a a Bool))
    (# Whether what is less or equal to than .)))

< (fn [than what]
  (: (Fn a a Bool) (Ord a))
  (# Whether what is less than .)
  (and (<= than what) (not (= than what))))

> (fn [than what]
  (: (Fn a a Bool) (Ord a))
  (# Whether what is greater than .)
  (not (<= than what)))

>= (fn [than what]
  (: (Fn a a Bool) (Ord a))
  (# Whether what is greater or equal to than .)
  (or (= than what) (> than what)))

num-ord (instance (Ord Num)
  <= (macro [than what]
    (: (Fn Num Num Bool))
    (Js.binary "<=" what than)))

Show (class [a]
  show (fn [x] (: (Fn a String))
    (# A textual representation of x .)))

show-boolean (instance (Show Bool)
  show (fn [b] (if b "True" "False")))

show-num (instance (Show Num)
  show (macro [n]
    (: (Fn Num String))
    (Js.binary "+" n "\\"\\"")))

show-string (instance (Show String)
  show (fn [s]
    (format "\\"%s\\"" s)))

show-char (instance (Show Char)
  show (fn [c]
    (format "\\%c" c)))

show-pair (instance (Show [a b])
  {(Show a) (Show b)}
  show (fn [pair]
    (format "[%s %s]" (show fst) (show snd))
    [fst snd] pair))

even? (fn [x]
  (: (Fn Num Bool))
  (# Whether x is an even integer.)
  (= 0 (rem 2 x)))

odd? (fn [x]
  (: (Fn Num Bool))
  (# Whether x is an odd integer.)
  (not (even? x)))

divisible? (fn [by what]
  (# Whether what is divisible by .)
  (= 0 (mod by what)))

id (fn [x]
  (: (Fn a a))
  (# Returns x .)
  x)

const (fn [x y]
  (: (Fn a b a))
  (# Returns x ignoring y .)
  x)

. (fn [second first x]
  (: (Fn (Fn b c) (Fn a b) a c))
  (# Composes first and second .
    (. second first x) is equivivalent to (second (first x)) .)
  (second (first x)))

apply-1 (fn [what to]
  (what to))

apply-2 (fn [what to1 to2]
  (what to1 to2))

fix-arity-2 (fn [of]
  (# Returns a function taking two arguments which can be used in JavaScript.)
  (fn [x y]
    (of x y)))

flip (fn [f x y]
  (# Swaps the order of arguments x and y to f .)
  (f y x))

fst (fn [tuple]
  (: (Fn [a b] a))
  (# The first value inside tuple .)
  x
  [x y] tuple)

snd (fn [tuple]
  (: (Fn [a b] b))
  (# The second value inside tuple .)
  y
  [x y] tuple)

tuple (fn [fst snd]
  (: (Fn a b [a b]))
  (# A tuple of fst and snd .)
  [fst snd])

curry (fn [fun x y]
  (: (Fn (Fn [a b] c) a b c))
  (# Passes a tuple of x and y to fun .)
  (fun [x y]))

uncurry (fn [fun tuple]
  (: (Fn (Fn a b c) [a b] c))
  (# Passes the first and second value in tuple to fun individually.)
  (fun x y)
  [x y] tuple)

range (fn [from exclude-to]
  (: (Fn Num Num (Array Num)))
  (# An increasing sequence of numbers from up to exclude-to with step size 1 .
    For example (range 2 1) is empty and (range 0.5 1) is {0.5} .)
  (if (< exclude-to from)
    (:: (Array Num) (.toList (.Range global.Immutable from exclude-to)))
    {}))

range-by (fn [from exclude-to step]
  (: (Fn Num Num Num (Array Num)))
  (# An increasing sequence of numbers from up to exclude-to with step size .
    For example (range 2 3 0.4) {2 2.4 2.8} .)
  (if (< exclude-to from)
    (:: (Array Num) (.toList (.Range global.Immutable from exclude-to step)))
    {}))

map-tuple (fn [what over]
  (# A tuple of first of what applied to first of over
    and second of what applied to second of over .)
  [((fst what) (fst over)) ((snd what) (snd over))])

map-2 (fn [what over]
  (# Maps first of what to the first value of every tuple in over
    and second of what to the second value of every tuple in over
    returning tuples of results.)
  (map (map-tuple what) over))

tuplize (fn [x]
  (# A tuple of x and x .)
  [x x])

math-pi (:: Num
  (# The ratio of a circle's circumference to its diameter.)
  Math.PI)

radians (fn [degrees]
  (# Converts from degrees of angle to radians.)
  (* math-pi (/ 180 degrees)))

degrees (fn [radians]
  (# Converts from radians of angle to degrees.)
  (* 180 (/ math-pi radians)))

? (data [a]
  None
  Some [value: a])

from-? (fn [default of]
  (# If of is Some then its value otherwise default .)
  (match of
    None default
    (Some value) value))

? (syntax [maybe default]
  (: (Fn (? a) a a))
  (# If maybe is Some then its value otherwise default .
    If maybe is Some default is not evaluated.)
  (` match ,maybe
    None ,default
    (Some value) value))

!! (fn [x]
  (# The value of Some x .
    Dangerous! Throws an error if x isnt Some .)
  (Some-value x))

Bag (class [bag item]
  size (fn [bag]
    (: (Fn bag Num))
    (# The number of items in the bag .))

  empty (: bag
    (# A bag with no items))

  fold (fn [with initial over]
    (: (Fn (Fn item a a) a bag a))
    (# Fold over using with and initial folded value .))

  join (fn [what with]
    (: (Fn bag bag bag))
    (# Join what with .))

  filter (fn [with what]
    (: (Fn (Fn item Bool) bag bag))
    (# The what bag without items that don't satisfy with .)))

Map (class [collection key item]
  {(Bag collection item)}
  at (fn [key in]
    (: (Fn key collection (? item)))
    (# Element at given key inside in .))

  key? (fn [key in]
    (: (Fn key collection Bool))
    (# Whether key has a value inside in .))

  put (fn [at what in]
    (: (Fn key item collection collection))
    (# Puts what at in .))

  delete (fn [key from]
    (: (Fn key collection collection))
    (# The map from without key and its value .))

  fold-keys (fn [with initial over]
    (: (Fn (Fn key a a) a collection a))
    (# Fold the keys of over using with and initial folded value.)))

key-set (fn [map]
  (# A Set of keys of map .)
  (fold-keys & (Set) map))

Appendable (class [collection item]
  & (fn [what to]
    (: (Fn item collection collection))
    (# Adds item what to collection.
      If the collection is a Bag then the last item added with & is the
      first one passed to fold .)))

Set (class [set item]
  {(Bag set item) (Appendable set item)}

  elem? (fn [what in]
    (: (Fn item set Bool))
    (# Whether in contains what .))

  remove (fn [what from]
    (: (Fn item set set))
    (# The Set from without what .)))

Seq (class [seq item]
  {(Map seq Num item) (Appendable seq item)}
  first (fn [in]
    (: (Fn seq (? item)))
    (# Some first item of in if in is not empty.))

  rest (fn [in]
    (: (Fn seq seq))
    (# All items of in without the first one.))

  take (fn [n from]
    (: (Fn Num seq seq))
    (# First n items in from .))

  drop (fn [n from]
    (: (Fn Num seq seq))
    (# All items of from without first n items.)))

Deq (class [seq item]
  {(Seq seq item)}
  && (fn [what to]
    (: (Fn item seq seq))
    (# Adds item what to the end of the deque.))

  but-last (fn [in]
    (: (Fn seq seq))
    (# All items of in without the last item.))

  last (fn [in]
    (: (Fn seq (? item)))
    (# Some last item of in if in is not empty.)))

Mappable (class [wrapper]
  map (fn [what onto]
    (: (Fn (Fn a b) (wrapper a) (wrapper b)))
    (# Apply what to every value inside onto .)))

Zippable (class [wrapper]
  zip (fn [with first second]
    (: (Fn (Fn a b c) (wrapper a) (wrapper b) (wrapper c)))
    (# Apply with to corresponding values in first and second .)))

zip-3 (fn [with first second third]
  (: (Fn (Fn a b c d) (wrapper a) (wrapper b) (wrapper c) (wrapper d))
    (Zippable wrapper))
  (# Apply with to corresponding values in first , second and third .)
  (zip (uncurry with) (zip tuple first second) third))

set-appendable (instance (Appendable (Set a) a)
  & (macro [what to]
    (: (Fn a (Set a) (Set a)))
    (Js.method to "add" {what})))

set-bag (instance (Bag (Set a) a)
  size (macro [set]
    (: (Fn (Set a) Num))
    (Js.access set "size"))

  empty (Set)

  fold (macro [with initial set]
    (: (Fn (Fn a b a) a (Set b) a))
    (Js.method set "reduce"
      {(fn [acc x] (with x acc)) initial}))

  join (macro [what with]
    (: (Fn (Set a) (Set a) (Set a)))
    (Js.method what "concat" {with}))

  filter (macro [with what]
    (: (Fn (Fn a Bool) (Set a) (Set a)))
    (Js.method what "filter" {with})))

set-set (instance (Set (Set a) a)
  {(Eq a)}
  elem? (macro [what in]
    (: (Fn (Set a) a Bool))
    (Js.method in "contains" {what}))

  remove (macro [what from]
    (: (Fn (Set a) a (Set a)))
    (Js.method from "remove" {what})))

set-mappable (instance (Mappable Set)
  map (macro [what over]
    (: (Fn (Fn a b) (Set a) (Set b)))
    (Js.call (Js.access over "map") {what})))

reduce-map (macro [with initial over]
  (: (Fn (Fn a v k a) a (Map k v) a))
  (Js.method over "reduce" {with initial}))

map-bag (instance (Bag (Map k v) v)
  size (macro [map]
    (: (Fn (Map k v) Num))
    (Js.access map "size"))

  empty (Map)

  fold (fn [with initial over]
    (reduce-map pass-key initial over)
    pass-key (fn [folded value key]
      (with value folded)))

  join (macro [what with]
    (: (Fn (Map k v) (Map k v) (Map k v)))
    (Js.method what "concat" {with}))

  filter (macro [with what]
    (: (Fn (Fn v Bool) (Map k v) (Map k v)))
    (Js.method what "filter" {with})))

from-nullable (syntax [nullable]
  (# Wraps a JavaScript value which could be null or undefined
    such that null and undefined result in None and other values
    are wrapped in Some .)
  (` if (is-null-or-undefined ,nullable)
    None
    (Some ,nullable)))

map-map (instance (Map (Map k v) k v)
  at (fn [index in]
    (from-nullable (.get in index)))

  key? (macro [what in]
    (: (Fn a (Map k v) Bool))
    (Js.method in "has" {what}))

  put (macro [at what in]
    (: (Fn k v (Map k v) (Map k v)))
    (Js.method in "set" {at what}))

  delete (macro [key from]
    (: (Fn k (Map k v) (Map k v)))
    (Js.method from "remove" {key}))

  fold-keys (fn [with initial over]
    (reduce-map pass-key initial over)
    pass-key (fn [folded value key]
      (with key folded))))

map-mappable (instance (Mappable (Map k))
  map (fn [what onto]
    (reduce-map helper (Map) onto)
    helper (fn [acc value key]
      (put key (what value) acc))))

map-appendable (instance (Appendable (Map k v) [k v])
  & (fn [pair to]
    (put (fst pair) (snd pair) to)))

array-bag (instance (Bag (Array a) a)
  size (macro [list]
    (: (Fn (List a) Num))
    (Js.access list "size"))

  empty {}

  fold (macro [with initial list]
    (: (Fn (Fn a b b) b (Array a) b))
    (Js.method list "reduce"
      {(fn [acc x] (with x acc)) initial}))

  join (macro [what with]
    (: (Fn (Array a) (Array a) (Array a)))
    (Js.method what "concat" {with}))

  filter (macro [with what]
    (: (Fn (Fn a Bool) (Array a) (Array a)))
    (Js.method what "filter" {with})))

array-appendable (instance (Appendable (Array a) a)
  & (macro [what to]
    (: (Fn a (Array a) (Array a)))
    (Js.method to "unshift" {what})))

array-mappable (instance (Mappable Array)
  map (macro [what over]
    (: (Fn (Fn a b) (Array a) (Array b)))
    (Js.method over "map" {what})))

array-zippable (instance (Zippable Array)
  zip (fn [with first second]
    (: (Fn (Fn a b c) (Array a) (Array b) (Array c)))
    (.zipWith first (fix-arity-2 with) second)))

array-map (instance (Map (Array a) Num a)
  at (fn [index in]
    (from-nullable (.get in index)))

  key? (macro [what in]
    (: (Fn Num (Array a) Bool))
    (Js.method in "has" {what}))

  put (macro [at what in]
    (: (Fn Num a (Array a) (Array a)))
    (Js.method in "set" {at what}))

  delete (macro [key from]
    (: (Fn Num (Array a) (Array a)))
    (Js.method from "remove" {key}))

  fold-keys (fn [with initial over]
    (fold with initial (range 0 (size over)))))

array-seq (instance (Seq (Array a) a)
  first (fn [list]
    (from-nullable (.first list)))

  rest (macro [list]
    (: (Fn (Array a) a))
    (Js.method list "rest" {}))

  take (macro [n from]
    (: (Fn Num (Array a) (Array a)))
    (Js.method from "take" {n}))

  drop (macro [n from]
    (: (Fn Num (Array a) (Array a)))
    (Js.method from "skip" {n})))

array-deq (instance (Deq (Array a) a)
  && (macro [what to]
    (: (Fn Num a (Array a) (Array a)))
    (Js.method to "push" {what}))

  but-last (macro [list]
    (: (Fn (Array a) (Array a)))
    (Js.method list "butLast" {}))

  last (fn [list]
    (from-nullable (.last list))))

list-bag (instance (Bag (List a) a)
  size (macro [list]
    (: (Fn (List a) Num))
    (Js.access list "size"))

  empty (List)

  fold (macro [with initial set]
    (: (Fn (Fn a b b) b (List a) b))
    (Js.method set "reduce"
      {(fn [acc x] (with x acc)) initial}))

  join (macro [what with]
    (: (Fn (List a) (List a) (List a)))
    (Js.method what "concat" {with}))

  filter (macro [with what]
    (: (Fn (Fn a Bool) (List a) (List a)))
    (Js.method what "filter" {with})))

list-appendable (instance (Appendable (List a) a)
  & (macro [what to]
    (: (Fn a (List a) (List a)))
    (Js.method to "unshift" {what})))

list-mappable (instance (Mappable List)
  map (macro [what over]
    (: (Fn (Fn a b) (List a) (List b)))
    (Js.method over "map" {what})))

list-zippable (instance (Zippable List)
  zip (macro [with first second]
    (: (Fn (Fn a b c) (List a) (List b) (List c)))
    (Js.method first "zipWith" {with second})))

list-map (instance (Map (List a) Num a)
  at (fn [index in]
    (from-nullable (.get in index)))

  key? (macro [what in]
    (: (Fn a (List a) Bool))
    (Js.method in "has" {what}))

  put (macro [at what in]
    (: (Fn Num a (List a) (List a)))
    (Js.method
      (Js.method
        (Js.method in "toList" {})
        "set" {at what})
      "toStack" {}))

  delete (macro [key from]
    (: (Fn Num (List a) (List a)))
    (Js.method
      (Js.method
        (Js.method from "toList" {})
        "remove" {key})
      "toStack" {}))

  fold-keys (fn [with initial over]
    (fold with initial (range 0 (size over)))))

list-seq (instance (Seq (List a) a)
  first (fn [list]
    (from-nullable (.first list)))

  rest (macro [list]
    (: (Fn (List a) a))
    (Js.method list "rest" {}))

  take (macro [n from]
    (: (Fn Num (List a) (List a)))
    (Js.method from "take" {n}))

  drop (macro [n from]
    (: (Fn Num (List a) (List a)))
    (Js.method from "skip" {n})))

list-deq (instance (Deq (List a) a)
  && (macro [what to]
    (: (Fn Num a (List a) (List a)))
    (Js.method
      (Js.method
        (Js.method to "toList" {})
        "push" {what})
      "toStack" {}))

  but-last (macro [list]
    (: (Fn (List a) (List a)))
    (Js.method list "butLast" {}))

  last (fn [list]
    (from-nullable (.last list))))

chars (macro [string]
  (: (Fn String (Array Char)))
  (# An Array of characters in string .)
  (Js.call "Immutable.List"
    {(Js.method string "split" {"''"})}))

unchars (macro [chars]
  (: (Fn (Array Char) String))
  (# A String of characters in chars .)
  (Js.method chars "join" {"''"}))

reverse (fn [what]
  (: (Fn ba ba) (Appendable ba a) (Bag ba a))
  (fold & empty what))

string-appendable (instance (Appendable String Char)
  & (macro [what to]
    (: (Fn Char String String))
    (Js.binary "+" what to)))

string-bag (instance (Bag String Char)
  size (macro [string]
    (: (Fn String Num))
    (Js.access string "length"))

  empty ""

  fold (fn [with initial string]
    (fold with initial (chars string)))

  join (macro [what with]
    (: (Fn String String String))
    (Js.binary "+" what with))

  filter (fn [with what]
    (unchars (filter with (chars what)))))

string-map (instance (Map String Num Char)
  at (fn [index in]
    (from-nullable (.charAt in index)))

  key? (fn [what in]
    (and (>= 0 what) (< (size in) what)))

  put (macro [at what in]
    (: (Fn Num Char String String))
    (Js.method
      (Js.method
        (Js.method in "toList" {})
        "set" {at what})
      "toStack" {}))

  delete (macro [key from]
    (: (Fn Num String String))
    (Js.method
      (Js.method
        (Js.method from "toList" {})
        "remove" {key})
      "toStack" {}))

  fold-keys (fn [with initial over]
    (fold with initial (range 0 (size over)))))

string-seq (instance (Seq String Char)
  first (fn [string]
    (at 0 string))

  rest (fn [list]
    (drop 1 list))

  take (macro [n from]
    (: (Fn Num String String))
    (Js.method from "slice" {0 n}))

  drop (macro [n from]
    (: (Fn Num String String))
    (Js.method from "slice" {n})))

string-deq (instance (Deq String Char)
  && (macro [what to]
    (: (Fn Num Char String String))
    (Js.binary "+" to what))

  but-last (fn [string]
    (take (- 1 (size string)) string))

  last (fn [string]
    (at (- 1 (size string)) string)))

array-to-set (macro [collection]
  (: (Fn (Array a) (Set a)))
  (Js.method collection "toSet" {}))

to-set (fn [collection]
  (array-to-set (fold && {} collection)))

slice (fn [from to of]
  (take (- from to) (drop from of)))

sub-seq (fn [from n of]
  (take n (drop from of)))

concat (fn [bag-of-bags]
  (fold (flip join) empty bag-of-bags))

empty? (fn [collection]
  (= 0 (size collection)))

not-elem? (fn [what in]
  (not (elem? what in)))

element-array (macro [set]
  (: (Fn (Set a) (Array a)))
  (Js.call (Js.access set "toList") {}))

value-array (macro [map]
  (: (Fn (Map k v) (Array v)))
  (Js.call (Js.access map "toList") {}))

entry-array (macro [map]
  (: (Fn (Map k v) (Array [k v])))
  (Js.call (Js.access
      (Js.call (Js.access map "entrySeq") {}) "toList") {}))

concat-map (fn [what over]
  (: (Fn (Fn a bb) (m a) bb) (Bag (m bb) bb) (Bag bb b) (Mappable m))
  (concat (map what over)))

repeat (fn [times what]
  (map (const what) (range 0 times)))

concat-with (fn [with what]
  (from-? empty (fold join-with None what))
  join-with (fn [x maybe-joined]
    (Some (match maybe-joined
        None x
        (Some joined) (concat {joined with x})))))

map-into (fn [what into over]
  (fold append into (reverse over))
  append (fn [x to]
    (& (what x) to)))

zip-into (fn [with into left right]
  (if (or (empty? left) (empty? right))
    into
    (& (with (!! (first left)) (!! (first right)))
      (zip-into with into (rest left) (rest right)))))

parse-int (fn [string]
  (: (Fn String Num))
  (.parseInt (global) string))

combine (fn [first second]
  (concat-map (zip tuple first) (map (repeat (size first)) second)))

unique (fn [bag]
  (: (Fn ba ba) (Appendable ba a) (Bag ba a))
  (fold & empty (to-set bag)))

singleton (fn [x]
  (: (Fn a ba) (Appendable ba a) (Bag ba a))
  (& x empty))

split (fn [bag]
  (: (Fn ba (Array ba)) (Appendable ba a) (Bag ba a))
  (fold wrap {} bag)
  wrap (fn [x all]
    (&& (singleton x) all)))

split-on (macro [separator string]
  (: (Fn String String (Array String)))
  (Js.call "Immutable.List" {(Js.method string "split" {separator})}))

fold-right (fn [with initial over]
  ((fold wrap id over) initial)
  wrap (fn [x r acc]
    (r (with x acc))))

show-array (instance (Show (Array a))
  {(Show a)}
  show (fn [array]
    (format "{%s}" (concat-with " " (map show array)))))

show-list (instance (Show (List a))
  {(Show a)}
  show (fn [list]
    (format "(List %s)" (concat-with " " (map show list)))))

show-set (instance (Show (Set a))
  {(Show a)}
  show (fn [set]
    (format "(Set %s)" (concat-with " " (map show (element-array set))))))

show-map (instance (Show (Map k v))
  {(Show k) (Show v)}
  show (fn [mapping]
    (format "(Map %s)" (concat-with " " (map show-entry (entry-array mapping))))
    show-entry (fn [entry]
      (format "%s %s" (show key) (show value))
      [key value] entry)))

sum (fold + 0)

product (fold * 1)

all (fold and True)

any (fold or False)

all-map (fn [fun list]
  (all ((map fun) list)))

any-map (fn [fun list]
  (any ((map fun) list)))

char-from-code (fn [x]
  (: (Fn Num Char))
  (.fromCharCode global.String x))

code-from-char (fn [x]
  (: (Fn Char Num))
  (.charCodeAt x 0))

char-ord (instance (Ord Char)
  <= (fn [than what]
    (<= (code-from-char than) (code-from-char what))))

in-range (fn [from exlude-to what]
  (and (<= what from) (< exlude-to what)))

in-range-inclusively (fn [from to what]
  (and (<= what from) (<= to what)))

scan (fn [what initial over]
  (: (Fn (Fn a b b) b (m a) (m b)) (Bag (m a) a) (Deq (m b) b))
  (snd (fold adder [initial (&& initial empty)] over))
  adder (fn [x acc]
    [next (&& next scanned)]
    next (what x folded)
    [folded scanned] acc))

scan-into (fn [what initial into over]
  (snd (fold adder [initial (&& initial into)] over))
  adder (fn [x acc]
    [next (&& next scanned)]
    next (what x folded)
    [folded scanned] acc))

iterate (fn [what initial times]
  (take times (scan (const what) initial (range 0 (- 1 times)))))

else True

Liftable (class [c]
  {(Mappable c)}
  lift (fn [x] (: (Fn a (c a))))
  apply (fn [what to] (: (Fn (c (Fn a b)) (c a) (c b)))))

Chainable (class [m]
  {(Liftable m)}
  chain (fn [wrapped through] (: (Fn (m a) (Fn a (m b)) (m b)))))

follow (fn [first-wrapped second-wrapped]
  (chain first-wrapped (fn [_]
      second-wrapped)))

do (syntax [..es]
  (create-chain es)
  create-chain (fn [statements]
    (match statements
      {x} x
      {x ..xs} (match x
        (` set ,to ,what) (` chain ,what (fn [,to] (, create-chain xs)))
        action (` follow action (, create-chain xs))))))

Void (data Void)

Io (data [a] Io [content: (Fn a)])

run-io (fn [wrapped] ((Io-content wrapped)))

chain-io (fn [wrapped through]
  (Io (fn [] (run-io (through (run-io wrapped))))))

io-mappable (instance (Mappable Io)
  map (fn [what onto]
    (chain-io onto
      (fn [x] (Io (fn [] (what x)))))))

io-liftable (instance (Liftable Io)
  lift (fn [x] (Io (fn [] x)))
  apply (fn [what to]
    (chain-io what (fn [unwrapped-what]
        (chain-io to (fn [unwrapped-to]
            (Io (fn [] (unwrapped-what unwrapped-to)))))))))

io-chainable (instance (Chainable Io)
  chain chain-io)'''
]
