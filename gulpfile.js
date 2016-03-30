'use strict';

/*
 * Requires Gulp4 to run. */

var gulp = require('gulp'),
    build = require('./tasks/gulp/build'),
    serve = require('./tasks/gulp/serve');


function setDevelopment(done) {
  if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'development';

  } else {
    console.log('Will not overwrite existing (' + process.env.NODE_ENV + ') variable');
  }
  process.env.NODE_PATH += (':' + process.cwd());
  return done();
}

function setProduction(done) {
  process.env.NODE_ENV = 'production';
  process.env.NODE_PATH += (':' + process.cwd());
  return done();
}

//Gulp Default
var devBuildAndStart = gulp.series(
    setDevelopment,
    build.clean,
    build.build,
    serve.start,
    serve.watch);

gulp.task('lint', gulp.parallel(build.csslint, build.eslint));

gulp.task('build', build.build);

gulp.task('prod', gulp.series(setProduction, build.build, serve.start));

gulp.task('dev', devBuildAndStart);

// make dev the default
devBuildAndStart.displayName = 'default';
gulp.task(devBuildAndStart);

