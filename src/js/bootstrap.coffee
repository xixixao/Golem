# Require.js config
require
  urlArgs: "b=#{(new Date()).getTime()}"
  paths:
    hyper: 'vendor/hyper/hyper'
    React: 'vendor/react/react-with-addons'
    compilers: 'app/compilers'
    ace: 'vendor/ace'
    'ace/autocomplete': 'vendor/ace/ext-language_tools'
    'ace/ext/searchbox': 'vendor/ace/ext-searchbox'
    jqueryLibs: 'vendor/jquery'
    jquery: 'vendor/jquery/jquery'
    ejquery: 'app/jquery.extended'
    'coffee-script': 'vendor/coffee-script/coffee-script'
    'tinyemitter': 'vendor/tiny-emitter/tinyemitter'
    'file-saver': 'vendor/file-saver/FileSaver'
    'beautify': 'vendor/js-beautify/beautify'
    'hljs': 'vendor/highlight/highlight'
    'marked': 'vendor/marked/marked'
    'classnames': 'vendor/classnames/index'
  shim:
    'vendor/jquery/jquery.cookie': ['jquery']
    'vendor/jquery/jquery.total-storage': ['jquery']
    'vendor/jquery/jquery.select-text': ['jquery']
    'vendor/jquery/jquery-ui-draggable': ['jquery']
  , ['React', 'ace/ace'], ->
    require ['app/EditorMain']
