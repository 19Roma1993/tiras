var gulp = require('gulp'),
  gConfig = require('./gulpConfig'),
  pack = gConfig.pkg,
  opts = gConfig.pluginOpts,
  path = gConfig.paths,
  $ = require('gulp-load-plugins')(opts.loadPlugins),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload;

gulp.task('sass', function() {
  gulp.src(path.src.sass)
    .pipe($.maps.init())
    .pipe($.sass(opts.sass).on('error', $.sass.logError))
    .pipe($.prefix(opts.prefix))
    //.pipe($.csso())
    .pipe($.maps.write('./',{
      includeContent: true,
      sourceRoot: '/app/scss'
    }))
    .pipe(gulp.dest(path.build.css))
});
gulp.task('jade', function() {
  return gulp.src(path.src.jade)
    .pipe($.jade(opts.jade))
    .pipe(gulp.dest(path.build.build))
});
gulp.task('images', function() {
  return gulp.src(path.src.images)
    .pipe($.imagemin(opts.imagemin))
    .pipe(gulp.dest(path.build.img))
});

gulp.task('font', function() {
  return gulp.src(path.src.fonts)
    .pipe(gulp.dest(path.build.fonts))
});
gulp.task('video', function() {
  return gulp.src(path.src.video)
      .pipe(gulp.dest(path.build.video))
});
gulp.task('js', function() {
  return gulp.src(path.src.js)
    //.pipe($.maps.init())
    //.pipe($.concat('all.min.js'))
    //.pipe($.uglify(opts.uglify).on('error', $.gutil.log))
    //.pipe($.maps.write('/'))
    .pipe(gulp.dest(path.build.js))
});

gulp.task('watch', function() {
  gulp.watch(path.src.js, ['js']);
  gulp.watch(path.src.app + '/view/**/*.jade', ['jade']);
  gulp.watch(path.build.build + '/*.html').on('change', reload);
  gulp.watch(path.src.images, ['images']);
  gulp.watch(path.src.fonts, ['font']);
  gulp.watch(path.src.video, ['video']);
  gulp.watch(path.src.sass, ['sass']);
});
// gulp.task('deploy',function(){
//   return gulp.src('build/**')
//     .pipe(gulp.dest('deploy'))
// });

gulp.task('server', ['watch'], function() {
  browserSync.init(opts.browserSync);
});
gulp.task('default', ['sass', 'jade', 'images', 'font', 'video', 'js', 'server']);