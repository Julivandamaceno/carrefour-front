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
const usemin = require('gulp-usemin');
const replace = require('gulp-replace-path');
const browserSync = require('browser-sync');
const reload = browserSync.reload;
const Server = require('karma').Server;


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
    debug : false
  };

  // watchify() if watch requested, otherwise run browserify() once
  var bundler = watch ? watchify(browserify(props).transform('babelify', {
      presets: ['es2015'],
			compact : false
    })) : browserify(props);

  function rebundle() {
    var stream = bundler.bundle();

    return stream
      .on('error', handleErrors)
      .pipe(source(file))
      .pipe(gulp.dest('./dist/assets/javascripts'))
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
      .pipe(gulp.dest('./dist/assets/images'));
});

gulp.task('stylus', () => {
  return gulp.src('./assets/stylus/**/*.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest('./dist/assets/css'));
});

gulp.task('scripts', function() {
  return buildScript('main.js', false);
});

gulp.task('test', function (done) {
  new Server({
    configFile: __dirname + '/karma.config.js',
    singleRun: false
  }, done).start();
});

gulp.task('usemin', function() {
  return gulp.src( './*.html' )
    .pipe(usemin({
      js: [],
      css: [ 'concat' ]
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('replace', ['usemin'], function() {
  gulp.src( './dist/**/*.html' )
    .pipe(replace('dist/assets/images', 'assets/images'))
    .pipe(gulp.dest('./dist'));
});

gulp.task('dist', ['usemin', 'replace', 'imagemin']);

gulp.task('default', () => {
  gulp.watch('./assets/stylus/**/*.styl', ['stylus']);
  buildScript('src/main.js', true)
  buildScript('helpers/cruilib.js', true)
});
