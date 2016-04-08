'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Passwords = mongoose.model('Passwords'),
    crypto = require('crypto'),
    validator = require('validator'),
    _ = require('lodash'),
    passwordTester = require('../services/password.tester');

/**
 * A Validation function for local strategy properties
 */
var validateLocalStrategyProperty = function (property) {
    return ((this.provider !== 'local' && !this.updated) || property.length);
};

/**
 * A Validation function for local strategy email
 */
var validateLocalStrategyEmail = function (email) {
    return ((this.provider !== 'local' && !this.updated) || validator.isEmail(email, {require_tld: false}));
};

/**
 * User Schema
 */
var UserSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        default: '',
        validate: [validateLocalStrategyProperty, 'Please fill in your first name']
    },
    lastName: {
        type: String,
        trim: true,
        default: '',
        validate: [validateLocalStrategyProperty, 'Please fill in your last name']
    },
    displayName: {
        type: String,
        trim: true
    },
    organization: {
        type: String,
        required: 'Please fill in your organization'
    },
    title: String,
    notes: String,
    groups: [{
        type: Schema.ObjectId,
        ref: 'Group'
    }],
    email: {
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        default: '',
        validate: [validateLocalStrategyEmail, 'Please fill a valid email address']
    },
    username: {
        type: String,
        unique: 'Username already exists',
        required: 'Please fill in a username',
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        default: ''
    },
    salt: {
        type: String
    },
    profileImageURL: {
        type: String,
        default: 'modules/users/client/img/profile/default.png'
    },
    provider: {
        type: String,
        required: 'Provider is required'
    },
    providerData: {},
    additionalProvidersData: {},
    roles: {
        type: [{
            type: String,
            enum: ['user', 'admin']
        }],
        default: ['user'],
        required: 'Please provide at least one role'
    },
    lastLogin: Date,
    updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    },
    /* For reset password */
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    }
});

UserSchema.index({'$**': 'text', groups: 1});
UserSchema.index({created: -1});

/**
 * Hook a pre save method to hash the password
 */
UserSchema.pre('save', function (next) {
    if (this.password && this.isModified('password')) {
        this.salt = crypto.randomBytes(16).toString('base64');
        this.password = this.hashPassword(this.password);

    }

    next();
});

/**
 * Hook a pre validate method to test the local password
 */
UserSchema.pre('validate', function (next) {
    if (this.provider === 'local' && this.password && this.isModified('password')) {
        var result = passwordTester.test(this.password);
        if (result.errors.length) {
            var error = result.errors.join(' ');
            this.invalidate('password', error);
        }
    }

    next();
});

/**
 * Create instance method for hashing a password
 */
UserSchema.methods.hashPassword = function (password) {
    if (this.salt && password) {
        return crypto.pbkdf2Sync(password, new Buffer(this.salt, 'base64'), 10000, 64).toString('base64');
    } else {
        return password;
    }
};

/**
 * Create instance method for authenticating user
 */
UserSchema.methods.authenticate = function (password) {
    return this.password === this.hashPassword(password);
};

/**
 * Find possible not used username
 */
UserSchema.statics.findUniqueUsername = function (username, suffix, callback) {
    var _this = this;
    var possibleUsername = username.toLowerCase() + (suffix || '');

    _this.findOne({
        username: possibleUsername
    }, function (err, user) {
        if (!err) {
            if (!user) {
                callback(possibleUsername);
            } else {
                return _this.findUniqueUsername(username, (suffix || 0) + 1, callback);
            }
        } else {
            callback(null);
        }
    });
};

var words;
Passwords.find().exec(function (err, passwords) {
    words = passwords;
});

UserSchema.statics.generateRandomPassphrase = function () {

    return new Promise(function (resolve, reject) {
        if (!words.length){
            resolve("");
            return;
        }

        var randomString = '0123456789';
        var password;

        do {
            var original = words[Math.floor(Math.random() * words.length)];
            password = _.camelCase(original.name);
            password = password.charAt(0).toUpperCase() + password.slice(1);
            for (var i = 0; i < 4; i++) {
                password += randomString[Math.floor(Math.random() * randomString.length)];
            }
        } while (passwordTester.test(password).errors.length);
        resolve(password);
    });
};

UserSchema.methods.toJSON = function () {
    var obj = this.toObject();
    delete obj.password;
    delete obj.salt;
    delete obj.provider;
    delete obj.additionalProvidersData;
    delete obj.providerData;
    delete obj.resetPasswordToken;
    delete obj.resetPasswordExpires;
    return obj;
};

mongoose.model('User', UserSchema);
