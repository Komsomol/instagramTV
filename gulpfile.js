
var gulp        = require('gulp');
var maps        = require('gulp-sourcemaps');
var minifyCss   = require('gulp-minify-css');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');
var del         = require('del');
var rename      = require('gulp-rename');
var concatCss   = require('gulp-concat-css');
var ignore      = require('gulp-ignore');
var gutil       = require('gulp-util');
var jshint      = require('gulp-jshint');
var stylish     = require('jshint-stylish');

gulp.task('test', function(){
    console.log('This is simply a test. HI!');
});

gulp.task('lint', function() {
  return gulp.src('js/main.js')
    .pipe(jshint())
    .pipe(jshint.reporter(stylish));
});
