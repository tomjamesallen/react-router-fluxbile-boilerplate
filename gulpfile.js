var gulp = require('gulp');
var eslint = require('gulp-eslint');

var jsPath = './src/js/**';

gulp.task('eslint', function() {
  return gulp.src(jsPath)
    .pipe(eslint())
    .pipe(eslint.format());
});

gulp.task('eslint:watch', function() {
  return gulp.watch(jsPath)
    .on('change', function(file) {
      console.log(`Hinting: ${file.path}`);
      return gulp.src(file.path)
        .pipe(eslint())
        .pipe(eslint.format());
    });
});