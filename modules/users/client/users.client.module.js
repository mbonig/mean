(function (app) {
    'use strict';

    // Use Applicaion configuration module to register a new module
    app.registerModule('users', ['core']);
    app.registerModule('users.admin', ['core.admin']);
    app.registerModule('users.admin.routes', ['core.admin.routes']);
})(ApplicationConfiguration);
