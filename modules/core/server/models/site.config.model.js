'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Original Schema
 */
var SiteConfigSchema = new Schema({
    feedback:{
        email: String,
        subject: String
    }
});

mongoose.model('SiteConfig', SiteConfigSchema);
