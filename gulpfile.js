var gulp = require('gulp');
var shell = require('gulp-shell');
var del = require('del');
var webserver = require('gulp-webserver');
var browserify = require('gulp-browserify');
var livereload = require('gulp-livereload');

gulp.task('js', function () {
  gulp.src('js/app.js')
    .pipe(browserify({
      insertGlobals: true,
      debug: false
    }))
    .pipe(gulp.dest('./build/js'))
    .pipe(livereload())
});

gulp.task('clean:build', function () {
  return del([
    'build'
  ]);
});

gulp.task('modernizr', function () {
  gulp.src('js/app.js')
    .pipe(shell('npm run modernizr'));
});
gulp.task('watch', function () {
  livereload.listen();
  gulp.watch(['js/**/*'], ['js']);
});

gulp.task('webserver', function () {
  return gulp.src('./').pipe(webserver({
    port: '8081',
    host: '0.0.0.0'
  }));
});

gulp.task('build', ['clean:build', 'modernizr','js']);
gulp.task('default', ['build', 'webserver', 'watch']);