var sass = require('gulp-sass');
var concat = require('gulp-concat');
var pxrem = require('gulp-pixrem');
var autoprefixer = require('gulp-autoprefixer');
var fs = require('fs');

module.exports = function(gulp) {
  gulp.task('scss:compile', function () {

    if (!fs.existsSync('build')) fs.mkdirSync('build');
    if (!fs.existsSync('build/css')) fs.mkdirSync('build/css');

    var ENV = process.env.NODE_ENV;
    return gulp.src('./src/scss/main.scss')
      .pipe(sass({
        outputStyle: ENV === 'development' ? 'expanded' : 'compressed'
      }).on('error', function (err) {
        console.log(err);
        this.emit('end');
      }))
      .pipe(concat('main.css'))
      .pipe(pxrem())
      .pipe(autoprefixer('last 4 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
      .pipe(gulp.dest('./build/css/'));
  });

  gulp.task('scss:watch', ['scss:compile'], function () {
    return gulp.watch('./src/scss/**', ['scss:compile']);
  });
}
