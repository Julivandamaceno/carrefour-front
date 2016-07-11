'use strict';

const gulp = require('gulp');
const stylus = require('gulp-stylus');
const imagemin = require('gulp-imagemin');
const gutil = require('gulp-util');
const browserify = require('browserify');
const babelify = require('babelify');
const watchify = require('watchify');
const notify = require('gulp-notify');
const buffer = require('vinyl-buffer');
const source = require('vinyl-source-stream');
const browserSync = require('browser-sync');
const reload = browserSync.reload;

function handleErrors() {
  var args = Array.prototype.slice.call(arguments);

  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);

  this.emit('end');
}

function buildScript(file, watch) {
  var props = {
    entries: ['./assets/javascripts/' + file],
    debug : false,
    transform: [babelify]
  };

  // watchify() if watch requested, otherwise run browserify() once
  var bundler = watch ? watchify(browserify(props)) : browserify(props);

  function rebundle() {
    var stream = bundler.bundle();

    return stream
      .on('error', handleErrors)
      .pipe(source(file))
      .pipe(gulp.dest('./assets/dist/javascripts'))
      // .pipe(buffer())
      // .pipe(uglify())
      // .pipe(rename('app.min.js'))
      // .pipe(gulp.dest('./build'))
      .pipe(reload({stream:true}))
  }

  // listen for an update and run rebundle
  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle...');
  });

  // run it once the first time buildScript is called
  return rebundle();
}

gulp.task('imagemin', function() {
    return gulp.src(['./assets/images/*'])
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

gulp.task('scripts', function() {
  return buildScript('main.js', false);
});

gulp.task('default', () => {
  gulp.watch('./assets/stylus/**/*.styl', ['stylus']);
  return buildScript('main.js', true)
});
