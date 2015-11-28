'use strict';

var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('jshint', function () {
  return gulp.src(['./*.js', './routes/**/*.js', './lib/**/*.js'])
    .pipe(jshint())
    .pipe( jshint.reporter( 'default' ) );
});

gulp.task( 'default', [ 'jshint' ] );
