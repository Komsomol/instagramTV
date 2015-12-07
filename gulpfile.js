
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

gulp.task('concatScripts', function() {
   return gulp.src([
      'js/vendor/jquery-1.10.1.min.js',
      'js/main.js', ])
    .pipe(maps.init())
    .pipe(concat('all.js'))
    .pipe(maps.write('./'))
    .pipe(gulp.dest('js'));
});

gulp.task("minifyScripts", ["concatScripts"], function() {
  return gulp.src("js/all.js")
    .pipe(uglify().on('error', gutil.log))
    .pipe(uglify())
    .pipe(rename('all.min.js'))
    .pipe(gulp.dest('js'));
});

gulp.task('watchFiles', function() {
  gulp.watch('js/main.js', ['minifyScripts']);
});

gulp.task('clean', function() {
  del(['build']);
});

gulp.task("build", ['minifyScripts'], function() {
  return gulp.src([
    'index.html', 
    'css/**', 
    'js/all.min.js',], { base: './'})
      .pipe(gulp.dest('build'));
});

gulp.task('serve', ['watchFiles']);

gulp.task("default", ["clean"], function() {
  gulp.start('build');
});