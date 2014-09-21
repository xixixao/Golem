{pipe, to, run, watch} = require 'gump'

coffee = require 'gulp-coffee'
del = require 'del'

tasks
  default: ->
    run @clean,
      @assets
      watch(@assets)

  dist: ->
    # do r js optimization
    # run @clean('dist')
    # compile to dist

  assets: ->
    pipe @compiledJs, @copiedJs, @compiledCss, @compiledHtml,
      -> to 'build'

  compiledJs: ->
    pipe 'src|js/**/*.coffee',
      -> coffee()
      -> commonToRequire()

  copiedJs: ->
    pipe 'src|js/**/*.js'

  compiledCss: ->
    pipe 'src|css/**/*.styl',
      -> stylus()

  compiledHtml: (optimized = no) ->
    pipe 'views|**/*.jade',
      -> jade {optimized}

  clean: (dir = 'build')->
    del dir