'use strict';

var gulp = require('gulp'),
    glob = require('glob'),
    nodemon = require('gulp-nodemon'),
    livereload = require('gulp-livereload'),
    _ = require('lodash'),
    build = require('./build'),
    chalk = require('chalk'),
    defaultAssets = require('../../config/assets/default');

var spawn = require('child_process').spawn;

function start(done) {
    if (process.env.NODE_ENV === 'development') {
        nodemon({
            script: 'server.js',
            nodeArgs: ['--debug'],
            ext: 'js,html',
            watch: _.union(defaultAssets.server.views, defaultAssets.server.allJS, defaultAssets.server.config)
        });
    } else {
        var server = spawn('node', ['server.js']);

        server.on('error', function (err) {
            console.log(chalk.red(err));
        });

        server.stdout.pipe(process.stdout);
        server.stderr.pipe(process.stderr);
        server.on('exit', function (code) {
            console.log('Server exited with code: ' + code);
        });
    }

    return done();
}

function watch(done) {
    // Start livereload
    livereload.listen();

    // Add watch rules
    gulp.watch(defaultAssets.server.views, livereloadChanged);
    gulp.watch(defaultAssets.server.allJS, gulp.parallel(build.eslint, livereloadChanged));
    gulp.watch(defaultAssets.client.js, gulp.parallel(build.eslint, livereloadChanged));
    gulp.watch(defaultAssets.client.sass, gulp.series(build.sass, build.csslint, livereloadChanged));
    gulp.watch(defaultAssets.client.views, livereloadChanged);

    return done();
}


function livereloadChanged(done) {
    livereload.changed('Restart Client');
    return done();
}

module.exports = {
    start: start,
    watch: watch
};
