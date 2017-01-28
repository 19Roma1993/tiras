var buildPaths = 'build',
  srcPaths = 'app',
  jsPlugPatch = srcPaths + '/js/',
  jsPluginsFile = [
    jsPlugPatch + 'main.js',
  ];

module.exports = {
  pkg: require('./package.json'),
  pluginOpts: {
    browserSync: {
      server: {
        baseDir: buildPaths
      },
      logConnections: false,
      logFileChanges: true,
      notify: true,
      reloadDelay: 300
    },
    jade: {
      pretty: '\t',
      self: true,
      cache: false,
      debug: false,
      compileDebug: false
    },
    uglify: {
      mangle: true,
      output: {
        beautify: false, // beautify output?
        bracketize: false, // use brackets every time?
        comments: false, // output comments?
        semicolons: true  // use semicolons to separate statements? (otherwise, newlines)
      },
      compress: {
        sequences: true,  // join consecutive statemets with the “comma operator”
        properties: true,  // optimize property access: a["foo"] → a.foo
        dead_code: true,  // discard unreachable code
        drop_debugger: true,  // discard “debugger” statements
        unsafe: true, // some unsafe optimizations (see below)
        conditionals: true,  // optimize if-s and conditional expressions
        comparisons: true,  // optimize comparisons
        evaluate: true,  // evaluate constant expressions
        booleans: true,  // optimize boolean expressions
        loops: true,  // optimize loops
        unused: true,  // drop unused variables/functions
        hoist_funs: false,  // hoist function declarations
        hoist_vars: false, // hoist variable declarations
        if_return: true,  // optimize if-s followed by return/continue
        join_vars: true,  // join var declarations
        cascade: true,  // try to cascade `right` into `left` in sequences
        side_effects: true,  // drop side-effect-free statements
        warnings: false  // warn about potentially dangerous optimizations/code
      }
    },
    prefix: {
      browsers: ['> 20%', 'Firefox > 20', 'iOS 7', 'ie >= 8'],
      //remove:false,
      grid: true,
      flexbox: true
    },
    sass:{
      outputStyle:'expanded'
    },
    loadPlugins: {
      DEBUG: false,
      scope: ['dependencies', 'devDependencies', 'peerDependencies'],
      lazy: false,
      rename: {
        'gulp-autoprefixer': 'prefix',
        'gulp-sourcemaps': 'maps',
        'gulp-sass': 'sass',
        'gulp-concat': 'concat',
        'gulp-util': 'gutil'
      }
    },
    imagemin: {
      progressive: true,
      interlaced: true
    }
  },
  paths: {
    src: {
      app: srcPaths,
      js: jsPluginsFile,
      jade: srcPaths + '/view/page/*.jade',
      sass: srcPaths + '/scss/**/**/*.scss',
      images: srcPaths + '/img/**',
      fonts: srcPaths + '/font/**/**',
      video: srcPaths + '/video/**/**'
    },
    build: {
      build: buildPaths,
      js: buildPaths + '/js',
      css: buildPaths + '/css',
      fonts: buildPaths + '/font',
      img: buildPaths + '/img',
      video: buildPaths + '/video'
    },
    overatch: buildPaths + '/**/*.{js,html,css,png,jpg,gif}'
  }
};