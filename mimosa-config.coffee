# All of the below are mimosa defaults and only need to be uncommented in the event you want
# to override them.
#
# IMPORTANT: Be sure to comment out all of the nodes from the base to the option you want to
# override. If you want to turn change the source directory you would need to uncomment watch
# and sourceDir. Also be sure to respect coffeescript indentation rules.  2 spaces per level
# please!

exports.config = {

  # minMimosaVersion:null      # The minimum Mimosa version that must be installed to use the project.
  # requiredMimosaVersion:null # The Mimosa version that must be installed to use the project.

  ###
  The list of Mimosa modules to use for this application. The defaults come bundled with Mimosa
  and do not need to be installed. If a module is listed here that Mimosa is unaware of, Mimosa
  will attempt to install it.
  ###
  modules: ['jshint', 'csslint', 'server', 'require', 'minify-js', 'minify-css', 'live-reload', 'bower', 'require-commonjs']

  requireCommonjs:
    exclude: [/[/\\]vendor[/\\]/, /[/\\]js[/\\]bootstrap\./]

  watch:
    sourceDir: "src"                     # directory location of web assets, can be relative to
                                         # the project root, or absolute
    compiledDir: "build"                 # directory location of compiled web assets, can be
                                         # relative to the project root, or absolute
    javascriptDir: "js"                  # Location of precompiled javascript (i.e.
                                         # coffeescript), must be relative to sourceDir
    stylesheets: "css"
    # exclude: [/[/\\](\.|~)[^/\\]+$/]   # regexes or strings matching the files to be
                                         # ignored by mimosa, the default matches all sorts of
                                         # dot files and temp files. Strings are paths and can
                                         # be relative to sourceDir or absolute.
    # throttle: 0                        # number of file adds the watcher handles before
                                         # taking a 100 millisecond pause to let those files
                                         # finish their processing. This helps avoid EMFILE
                                         # issues for projects containing large numbers of
                                         # files that all get copied at once. If the throttle
                                         # is set to 0, no throttling is performed. Recommended
                                         # to leave this set at 0, thedefault, until you start
                                         # encountering EMFILE problems. throttle has no effect
                                         # if usePolling is set to false.
    # usePolling: true                   # WARNING: Do not change this default if you are on
                                         # *Nix. Windows users, read on.
                                         # Whether or not to poll for system file changes.
                                         # Unless you have a lot files and your CPU starts
                                         # running hot, it is best to leave this setting alone.
    # interval: 100                      # Interval of file system polling.
    # binaryInterval: 300                # Interval of file system polling for binary files

  vendor:                              # settings for vendor assets
    javascripts: "js/vendor"  # location, relative to the watch.sourceDir, of vendor
                                         # javascript assets. Unix style slashes please.
    stylesheets: "css/vendor"  # location, relative to the watch.sourceDir, of vendor
                                         # stylesheet assets. Unix style slashes please.


  # compilers:
    # extensionOverrides:       # A list of extension overrides, format is:
                                # [compilerName]:[arrayOfExtensions], see
                                # http://mimosa.io/compilers.html for list of compiler names
      # coffee: ["coff"]        # This is an example override, this is not a default, must be
                                # array of strings
    # libs: {}                  # If Mimosa contains a version of a compiler that your code is
                                # not compatible with, use this setting to adjust to the right
                                # version. The key to the libs object is the name of the
                                # compiler and the value is a nodejs require call to pull the
                                # library in.  Ex: libs: less: require('less'). You will need
                                # to have the version of the compiler you need installed in
                                # your project. This is the only means to use node-sass as
                                # Mimosa does not come bundled with it.

  # coffeescript:               # config settings for coffeescript
    # sourceMap:true            # whether to generate source during "mimosa watch".
                                # Source maps are not generated during "mimosa build"
                                # regardless of setting.
    # sourceMapDynamic: true    # Whether or not to inline the source maps, this adds base64
                                # encoded source maps to the compiled file rather than write
                                # an extra map file.
    # sourceMapExclude: [/\/specs?\//, /_spec.js$/] # files to exclude from source map generation
    # bare:true                 # whether or not to include the top level wrapper around
                                # each compiled coffeescript file. Defaults to not wrapping
                                # as wrapping with define/require is assumed.

  # iced:                       # config settings for iced coffeescript
    # sourceMap:true            # whether to generate source during "mimosa watch".
                                # Source maps are not generated during "mimosa build"
                                # regardless of setting.
    # sourceMapDynamic: true    # Whether or not to inline the source maps, this adds base64
                                # encoded source maps to the compiled file rather than write
                                # an extra map file.
    # sourceMapExclude: [/\/specs?\//, /_spec.js$/] # files to exclude from source map generation
    # bare:true                 # whether or not to include the top level wrapper around each
                                # compiled iced file. Defaults to not wrapping as wrapping with
                                # define/require is assumed.
    # runtime:"none"            # No runtime boilerplate is included

  # typescript:                 # config settings for typescript
    # module: null              # how compiled tyepscript is wrapped, defaults to no wrapping,
                                # can be "amd" or "commonjs"

  # coco:                       # config settings for coco
    # bare:true                 # whether or not to include the top level wrapper around
                                # each compiled coco file. Defaults to not wrapping
                                # as wrapping with define/require is assumed.

  # livescript:                 # config settings for livescript
    # bare:true                 # whether or not to include the top level wrapper around
                                # each compiled coffeescript file. Defaults to not wrapping
                                # as wrapping with define/require is assumed.

  # stylus:                     # config settings for stylus
    # use:['nib']               # names of libraries to use, should match the npm name for
                                # the desired libraries
    # import:['nib']            # Files to import for compilation
    # define: {}                # An object containing stylus variable defines
    # includes: []              # Files to include for compilation

  # template:                         # overall template object can be set to null if no
                                      # templates being used
    # nameTransform: "fileName"       # means by which Mimosa creates the name for each
                                      # template, options: default "fileName" is name of file,
                                      # "filePath" is path of file after watch.sourceDir
                                      # with the extension dropped, a supplied regex can be
                                      # used to remove any unwanted portions of the filePath,
                                      # and a provided function will be called with the
                                      # filePath as input
    # wrapType: "amd"                 # The type of module wrapping for the output templates
                                      # file. Possible values: "amd", "common", "none".
    # commonLibPath: null             # Valid when wrapType is 'common'. The path to the
                                      # client library. Some libraries do not have clients
                                      # therefore this is not strictly required when choosing
                                      # the common wrapType.s
    # outputFileName: "javascripts/templates"  # the file all templates are compiled into,
                                               # is relative to watch.sourceDir.

    # outputFileName:                 # outputFileName Alternate Config 1
      # hogan:"hogans"                # Optionally outputFileName can be provided an object of
      # jade:"jades"                  # file extension to file name in the event you are using
                                      # multiple templating libraries. The file extension must
                                      # match one of the default compiler extensions or one of
                                      # the extensions configured for a compiler in the
                                      # compilers.extensionOverrides section above.

    # output: [{                      # output Alternate Config 2
    #   folders:[""]                  # Use output instead of outputFileName if you want
    #   outputFileName: ""            # to break up your templates into multiple files, for
    # }]                              # instance, if you have a two page app and want the
                                      # templates for each page to be built separately.
                                      # For each entry, provide an array of folders that
                                      # contain the templates to combine.  folders entries are
                                      # relative to watch.sourceDir and must exist.
                                      # outputFileName works identically to outputFileName
                                      # above, including the alternate config, however, no
                                      # default file name is assumed. An output name must be
                                      # provided for each output entry, and the names
                                      # must be unique.

    # handlebars:                     # handlebars specific configuration
      # helpers:["app/template/handlebars-helpers"]  # the paths from watch.javascriptDir to
                                      # the files containing handlebars helper/partial
                                      # registrations
      # ember:                        # Ember.js has its own Handlebars compilation needs,
                                      # use this config block to provide Ember specific
                                      # Handlebars configuration.
        # enabled: false              # Whether or not to use the Ember Handlebars compiler
        # path: "vendor/ember"        # location of the Ember library, this is used as
                                      # as a dependency in the compiled templates.

  ###
  # the extensions of files to copy from sourceDir to compiledDir. vendor js/css, images, etc.
  ###
  # copy:
    # extensions: ["js","css","png","jpg","jpeg","gif","html","eot","svg","ttf","woff","otf","yaml","kml","ico","htc","htm","json","txt","xml","xsd","map","md","mp4"]

  # growl:
    # onStartup: false       # Controls whether or not to Growl when assets successfully
                             # compile/copy on startup, If you've got 100 CoffeeScript files,
                             # and you do a clean and then start watching, you'll get 100 Growl
                             # notifications.  This is set to false by default to prevent that.
                             # Growling for every successful file on startup can also cause
                             # EMFILE issues. See watch.throttle
    # onSuccess:             # Controls whether to Growl when assets successfully compile/copy
      # javascript: true     # growl on successful compilation? will always send on failure
      # css: true            # growl on successful compilation? will always send on failure
      # template: true       # growl on successful compilation? will always send on failure
      # copy: true           # growl on successful copy?

  server:                      # configuration for server when server option is enabled via CLI
    defaultServer:
      enabled: true              # whether or not mimosa starts a default server for you, when
                                 # true, mimosa starts its own on the port below, when false,
                                 # Mimosa will use server provided by path below
      # onePager: false          # Whether or not your app is a one page application. When set to
                                 # true, all routes will be pointed at index
    # path: 'server.coffee'      # valid when defaultServer.enabled: false, path to file for provided
                                 # server which must contain export startServer method that takes
                                 # an enriched mimosa-config object
    # port: 3000                 # port to start server on
    # base: ''                   # base of url for the app, if altered should start with a slash
    # views:                     # configuration for the view layer of your application
      # compileWith: 'jade'      # Valid options: "jade", "hogan", "html", "ejs", "handlebars", "dust".
                                 # The compiler for your views.
      # extension: 'jade'        # extension of your server views
      # path: 'views'            # This is the path to project views, it can be absolute or
                                 # relative. If defaultServer.enabled is true, it is relative to the
                                 # root of the project. If defaultServer.enabled is false it is
                                 # relative to the server.path setting above.
  # minifyJS:                     # Configuration for minifying/cleaning js using the
                                  # --minify flag
    # exclude:[/\.min\./]         # List of string paths and regexes to match files to exclude
                                  # when running minification. Any path with ".min." in its name,
                                  # is assumed to already be minified and is ignored by default.
                                  # Paths can be relative to the watch.compiledDir, or absolute.
                                  # Paths are to compiled files,  so '.js' rather than '.coffee'


  # minifyCSS:                    # Configuration for minifying/cleaning css using the
                                  # --minify flag
    # exclude:[/\.min\./]         # List of string paths and regexes to match files to exclude
                                  # when running minification. Any path with ".min." in its name,
                                  # is assumed to already be minified and is ignored by default.
                                  # Paths can be relative to the watch.compiledDir, or absolute.
                                  # Paths are to compiled files,  so '.css' rather than '.styl'


  # jshint:                    # settings for javascript hinting
    # exclude:[]               # array of strings or regexes that match files to not jshint,
                               # strings are paths that can be relative to the watch.sourceDir
                               # or absolute
    # compiled: true           # fire jshint on successful compile of meta-language to javascript
    # copied: true             # fire jshint for copied javascript files
    # vendor: false            # fire jshint for copied vendor javascript files (like jquery)
    # jshintrc: ".jshintrc"    # This is the path, either relative to the root of the project or
                               # absolute, to a .jshintrc file. By default mimosa will look at
                               # the root of the project for this file. The file does not need to
                               # be present. If it is present, it must be valid JSON.
    # rules:                   # Settings: http://www.jshint.com/options/, these settings will
                               # override any settings set up in the jshintrc
      # plusplus: true         # This is an example override, this is not a default

  # csslint:                    # settings for javascript hinting
    # exclude:[]               # array of strings or regexes that match files to not csslint,
                               # strings are paths that can be relative to the watch.sourceDir
                               # or absolute
    # compiled: true           # fire csslint on successful compile of meta-language to javascript
    # copied: true             # fire csslint for copied javascript files
    # vendor: false            # fire csslint for copied vendor javascript files (like jquery)
    # rules:                   # Settings: http://www.csslint.com/options/, these settings will
                               # override any settings set up in the csslintrc
      # floats: false          # This is an example override, this is not a default


  # liveReload:                   # Configuration for live-reload
    # enabled:true                # Whether or not live-reload is enabled
    # additionalDirs:["views"]    # Additional directories outside the watch.compiledDir
                                  # that you would like to have trigger a page refresh,
                                  # like, by default, static views. Is string path,
                                  # can be relative to project root, or absolute

  # require:                 # configuration for requirejs options.
    # exclude:[]             # Regex or string paths. Paths can be absolute or relative to the
                             # watch.javascriptDir. These files will be excluded from all
                             # require module functionality. That includes AMD verification and
                             # being considered a root level file to be optimized.
    # commonConfig: "common" # The path from 'javascriptDir' to the location of common requirejs
                             # config. This is config shared across multiple requirejs modules.
                             # This should be either a require.config({}) or a requirejs.config({})
                             # function call. Defaults to the value `common` - referring to a file
                             # named common.js in the root of javascriptDir. Does not need to
                             #  exist, so can be left alone if a commonConfig is not being used.
    # tracking:              # every time mimosa starts up, mimosa-require needs to be able to
                             # build a dependency graph for the codebase. It can do that by
                             # processing all the files, but that means each file needs to be
                             # processed when mimosa watch starts which slows down startup.
                             # tracking allows mimosa-require to write interim state to the file
                             # system so that from one mimosa run to another it can persist the
                             # important information and not need the entire application to be
                             # rebuilt
      # enabled: true       # whether or not tracking is enabled
      # path: ".mimosa/require/tracking.json" # the path to the tracking file relative to the
                             # root of the project.
    # verify:                # settings for requirejs path verification
      # enabled: true        # Whether or not to perform verification
    # optimize :
      # inferConfig:true     # Mimosa figures out all you'd need for a simple r.js optimizer run.
                             # If you rather Mimosa not do that, set inferConfig to false and
                             # provide your config in the overrides section. See here
                             # https://github.com/dbashford/mimosa#requirejs-optimizer-defaults
                             # to see what the defaults are.
      # modules:             # If using a modules config, place it here. mimosa-require will use
                             # the modules config directly, but also base many other r.js config
                             # options based on a modules setup instead of a single file setup.
      # moduleCachingPath: ".mimosa/require/moduleCaching" # Only valid if using modules. This
                             # path is where pristine root module files are kept in between r.js
                             # runs. This cache allows you to keep "mimosa watch" running while
                             # building and rebuilding your application.
      # overrides:           # Optimization configuration and Mimosa overrides. If you need to
                             # make tweaks uncomment this line and add the r.js config
                             # (http://requirejs.org/docs/optimization.html#options) as new
                             # paramters inside the overrides ojbect. To unset Mimosa's defaults,
                             # set a property to null.
                             #
                             # overrides can also be a function that takes mimosa-require's
                             # inferred config for each module. This allows the inferred config
                             # to be updated and enhanced instead of just overridden.

  bower:                        # Configuration for bower module
    # watch: true                 # Whether or not to watch the bower.json file to automatically
                                  # kick off a bower install when it changes.
    # bowerDir:
      # path: ".mimosa/bower/bower_components"  # The location mimosa-bower places temporary
                                                # bower assets.
      # clean: true               # whether or not to remove temporary bower assets after install

    copy:                       # configuration for the copying of assets from bower temp
                                  # directories into the project
      # enabled: true             # whether or not to copy the assets out of the bowerDir.path
                                  # into the project vendor location
      # trackChanges: true        # When set to true, mimosa-bower will keep track of your
                                  # bower.json and mimosa-config "bower" configuration and kick
                                  # off installs based on changes. When set to false, bower's
                                  # default checking is used. This is based on the contents of
                                  # bowerDir.path. If bowerDir.clean is true, and trackChanges is
                                  # false, mimosa-bower will not perform installs during "watch"
                                  # and "build" because installs would occur every time mimosa
                                  # starts up.
      # outRoot: null             # A string path to append to the vendor directory before
                                  # copying in assets.  All copied assets would go inside this
                                  # directory. Example: "bower-managed". null means no outRoot
                                  # is applied.
      # exclude:[]                # An array of string paths or regexes. Files to exclude from
                                  # copying. Paths should be relative to the bowerdir.path or
                                  # absolute.
      # unknownMainFullCopy: false # When set to true, any bower package that does not have main
                                  # files configured in its bower.json will have its entire
                                  # folder contents copied in.
      mainOverrides:
        "coffee-script": ["extras/"]
        "iced-coffee-script": ["lib/": "../app/compilers/icedcoffeescript/"]
        "metacoffee": ["lib/": "../app/compilers/metacoffee/"]

                                  # Occasionally bower packages do not clearly indicate what file
                                  # is the main library file. In those cases, mimosa cannot find
                                  # the main files to copy them to the vendor directory. json2 is
                                  # a good example. mainOverrides allows for setting which files
                                  # should be copied for a package. The key for this object is
                                  # the name of the package. The value is an array of path
                                  # strings representing the package's main files. The paths
                                  # should be relative to the root of the package. For example:
                                  # {"json2":["json2.js","json_parse.js"]}. The paths can also
                                  # be to directories. That will include all the directory's
                                  # files. mainOverrides packages can also be provided an object
                                  # in addition to string paths. The object maps input paths to
                                  # output paths and allow for specific placement of files and
                                  # folders. Ex {"json2":{"json2.js":"json-utils/json2.js"}. In
                                  # this case the "json2.js" file will be placed in
                                  # "json-utils/json2.js" in the vendor.javascripts folder.
      # strategy: "packageRoot"   # The copying strategy. "vendorRoot" places all files at the
                                  # root of the vendor directory. "packageRoot" places the files
                                  # in the vendor directory in a folder named for that package.
                                  # "none" will copy the assets into the vendor directory without
                                  # modification.  strategy can also be an object with keys that
                                  # match the names of packages and values of strategy types.
                                  # When using a strategy object, the key of "*" provides a
                                  # default strategy. If only 2 of 10 packages are specified
                                  # the rest get the "*" strategy. If no "*" is provided,
                                  # "packageRoot" is the assumed default.
      # forceLatest: true         # If you are running into a problem where dependency versions
                                  # are clashing, use forceLatest to make it so the latest
                                  # version is loaded.  For instance, you might have jquery 2.0.0
                                  # as a package, but something else depends on 1.8.1.
      # pathMod: []               # pathMod can be an array of strings or a regex. It is used to
                                  # strip full pieces of a path from the output file when the
                                  # selected strategy is "none". If a bower package script is in
                                  # "packageName/lib/js/foo.js" and "pathMod" is set to
                                  # ['js', 'lib'] the output path would have "lib" and "js"
                                  # stripped. Feel free to suggest additions to this based on
                                  # your experience!

}