// require gulp
var gulp = require('gulp');
// require other packages
var concat = require('gulp-concat');
var rename = require("gulp-rename");
var less = require('gulp-less');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
var autoprefixer = require('gulp-autoprefixer');

////////// tasks
// concat and minify scripts task
gulp.task('scripts', function() {
  gulp.src(['./components/jquery/dist/jquery.js','./js/site.js'])
    .pipe(concat('dokka.js'))
    .pipe(gulp.dest('./js/'))
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./js/'))
});

//compile and minify less styles task
gulp.task('styles', function(){
  gulp.src('./css/site.less')
    .pipe(less())
    .pipe(gulp.dest('./css/'))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(cssnano())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./css/'))
});

//watch task
gulp.task('watch', function(){
  gulp.watch('./js/site.js', ['scripts']);
  gulp.watch('./css/site.less', ['styles']);
});

//define default task
gulp.task('default', ['scripts', 'styles', 'watch']);
