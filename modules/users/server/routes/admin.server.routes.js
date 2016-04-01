'use strict';

/**
 * Module dependencies.
 */
var adminPolicy = require('../policies/admin.server.policy'),
    admin = require('../controllers/admin.server.controller');

module.exports = function (app) {

    // User route registration first. Ref: #713
    require('./users.server.routes.js')(app);

    // Users collection routes
    app.route('/api/users')
        .all(adminPolicy.isAllowed)
        .get(admin.list)
        .post(admin.create);

    app.route('/api/users/sendEmail')
        .all(adminPolicy.isAllowed)
        .post(admin.sendEmail);

    app.route('/api/users/generatePassword')
        .all(adminPolicy.isAllowed)
        .get(admin.generatePassword);

    app.route('/api/users/:userId')
        .all(adminPolicy.isAllowed)
        .get(admin.read)
        .put(admin.update)
        .delete(admin.delete);


    // Finish by binding the user middleware
    app.param('userId', admin.userByID);
};
