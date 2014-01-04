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

  [symbol, args...] = input.split /\s+/
  [symbol, args]
