'use strict';

const gulp = require('gulp');
const stylus = require('gulp-stylus');
const imagemin = require('gulp-imagemin');

gulp.task('imagemin', function() {
    return gulp.src(['./assets/images/*', '!./assets/images/dist'])
      .pipe(imagemin({
          progressive: true
      }))
      .pipe(gulp.dest('./assets/dist/images'));
});

gulp.task('stylus', () => {
  return gulp.src('./assets/stylus/**/*.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest('./assets/dist/css'));
});

gulp.task('default', () => {
  gulp.watch('./assets/stylus/**/*.styl', ['stylus']);
});
