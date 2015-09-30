module.exports = (input) ->
  # match = input.match ///
  #   ^ \s* # beginning whitespace
  #   (
  #     \w+ # command symbol
  #   )
  #   \b
  #   (
  #     (?:
  #       \s+   # word delimiter
  #       (?:
  #         .+\\ # words ended by backslash
  #       |           # or
  #         \S+\b # a word
  #       )
  #     )*
  #   )     # arguments
  #   \s* $ # ending whitespace
  # ///

  [symbol, args...] = input
    .replace /([^\\])\s+/g, "$1$1 "
    .split /[^\\] /
    .map (x) ->
      x.replace /\\(\s)/g, "$1"
  [symbol, args]
