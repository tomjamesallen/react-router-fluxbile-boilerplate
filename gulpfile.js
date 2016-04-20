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

require('gulp-react-tools')(gulp, {
  commandPrefix: '',
  componentTemplate: './templates/Component.react.js',
  componentStyleTemplate: './templates/component.css',
  componentDir:               './src/js/components/',
  componentStylesDir:         './src/scss/',

  componentName:              '{{COMPONENT}}.react.js',
  componentStylesName:        '_components.{{COMPONENT_DASHED}}.scss',

  appendStyleImportTemplate:  "// @import 'components.{{COMPONENT_DASHED}}\n",
  appendStyleImportTo:        './src/scss/main.scss'
})
