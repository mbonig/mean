'use strict';

module.exports = {
    client: {
        lib: {
            css: [
                'public/lib/bootstrap/dist/css/bootstrap.css',
                'public/lib/bootstrap/dist/css/bootstrap-theme.css'
            ],
            js: [
                'public/lib/es6-shim/es6-shim.js',
                'public/lib/system.js/dist/system.js',
                'public/lib/reflect-metadata/Reflect.js',
                'public/lib/angular/bundles/angular2.js'
            ],
            tests: ['public/lib/angular-mocks/angular-mocks.js']
        },
        css: [
            'modules/*/client/css/*.css'
        ],
        less: [
            'modules/*/client/less/*.less'
        ],
        sass: [
            'modules/*/client/scss/*.scss'
        ],
        ts: [
            'modules/*/client/*.ts',
            'modules/*/client/**/*.ts'
        ],
        js: [
            // just want to use the basic stuff for now, since all this has to be rewritten in angular2...
            /*'modules/core/client/app/app.component.js',
            'modules/core/client/app/main.js',
            'modules/!*!/client/!*.js',
             'modules/!*!/client/!**!/!*.js'*/
        ],
        img: [
            'modules/**/*/img/**/*.jpg',
            'modules/**/*/img/**/*.png',
            'modules/**/*/img/**/*.gif',
            'modules/**/*/img/**/*.svg'
        ],
        views: ['modules/*/client/views/**/*.html'],
        templates: ['build/templates.js']
    },
    server: {
        gruntConfig: ['gruntfile.js'],
        gulpConfig: ['gulpfile.js'],
        allJS: ['server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
        models: 'modules/*/server/models/**/*.js',
        routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
        sockets: 'modules/*/server/sockets/**/*.js',
        config: ['modules/*/server/config/*.js'],
        policies: 'modules/*/server/policies/*.js',
        views: ['modules/*/server/views/*.html']
    }
};
