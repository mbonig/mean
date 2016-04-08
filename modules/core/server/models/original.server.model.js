'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

/**
 * Original Schema
 */
var PasswordsSchema = new Schema({
    name: {
        required: 'Please enter a name',
        type: String
    }
});

mongoose.model('Passwords', PasswordsSchema);
