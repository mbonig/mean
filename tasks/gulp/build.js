'use strict';
var gulp = require('gulp'),
    glob = require('glob'),
    gulpLoadPlugins = require('gulp-load-plugins'),
    plugins = gulpLoadPlugins({
        rename: {
            'gulp-angular-templatecache': 'templateCache'
        }
    }),
    plumber = require('gulp-plumber'),
    path = require('path'),
    _ = require('lodash'),
    testAssets = require('../../config/assets/test'),
    defaultAssets = require('../../config/assets/default');


function build(done) {
    var linters = gulp.parallel(csslint, jshint, eslint);
    if (process.env.NODE_ENV === 'production') {
        return gulp.series(gulp.parallel(compile, gulp.series(sass, cssmin)), linters)(done);
    } else {
        return gulp.series(sass, linters)(done);
    }
}

function clean(done) {
    // what's there to clean?
    done();
}


function csslint(done) {
    return gulp.src(defaultAssets.client.css)
        .pipe(plugins.csslint('.csslintrc'))
        .pipe(plugins.csslint.reporter());
}
function jshint(done) {

    var assets = _.union(
        defaultAssets.server.gulpConfig,
        defaultAssets.server.allJS,
        defaultAssets.client.js,
        testAssets.tests.server,
        testAssets.tests.client,
        testAssets.tests.e2e
    );

    return gulp.src(assets)
        .pipe(plugins.jshint())
        .pipe(plugins.jshint.reporter('default'));
}

function eslint(done) {

    var assets = _.union(
        defaultAssets.server.gulpConfig,
        defaultAssets.server.allJS,
        defaultAssets.client.js,
        testAssets.tests.server,
        testAssets.tests.client,
        testAssets.tests.e2e
    );

    return gulp.src(assets)
        .pipe(plugins.eslint())
        .pipe(plugins.eslint.format());
}

function compile() {
    return gulp.src(defaultAssets.client.js)
        .pipe(plugins.ngAnnotate())
        .pipe(plugins.uglify({
            mangle: false
        }))
        .pipe(plugins.concat('application.min.js'))
        .pipe(gulp.dest('public/dist'));
}

function cssmin() {
    return gulp.src(defaultAssets.client.css)
        .pipe(plugins.cssmin())
        .pipe(plugins.concat('application.min.css'))
        .pipe(gulp.dest('public/dist'));
}

function sass() {
    return gulp.src(defaultAssets.client.sass)
        .pipe(plumber())
        .pipe(plugins.sass({errLogToConsole: true}))
        .pipe(plugins.autoprefixer())
        .pipe(plugins.rename(function (file) {
            file.dirname = file.dirname.replace(path.sep + 'scss', path.sep + 'css');
        }))
        .pipe(gulp.dest('./modules/'));
}


module.exports = {
    build: build,
    clean: clean,
    csslint: csslint,
    eslint: eslint,
    jshint: jshint,
    sass: sass
};
