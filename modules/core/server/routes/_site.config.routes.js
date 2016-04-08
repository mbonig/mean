'use strict';
var siteConfig = require('../controllers/site.config.server.controller');

module.exports = function (app) {

    app.route('/api/siteConfigs').get(siteConfig.read);

};
