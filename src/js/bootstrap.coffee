# Require.js config
require
  urlArgs: "b=#{(new Date()).getTime()}"
  , ['./config', 'React', 'ace/ace', 'ace/mode-coffee', 'app/EditorMain']
