'use strict';

var mongoose = require('mongoose');
var SiteConfig = mongoose.model('SiteConfig');

module.exports.read = function (req, res) {
    SiteConfig.findOne({}, function (err, siteConfig) {
        res.json(siteConfig);
    });
};
