'use strict';

var path = require('path'),
    config = require(path.resolve('./config/config')),
    mongoose = require('mongoose'),
    User = mongoose.model('User'),
    errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
    emailService = require('../services/email.service');

exports.read = function (req, res) {
    res.json(req.model);
};

exports.update = function (req, res) {
    var user = req.model;

    //For security purposes only merge these parameters
    user.firstName = req.body.firstName;
    user.lastName = req.body.lastName;
    user.displayName = user.firstName + ' ' + user.lastName;
    user.roles = req.body.roles;
    user.organization = req.body.organization;
    user.title = req.body.title;
    user.notes = req.body.notes;
    if (req.body.password) {
        user.password = req.body.password;
    }

    user.save(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }

        res.json(user);
    });
};

exports.create = function (req, res) {
    delete req.body._id;

    var user = new User(req.body);
    user.provider = user.provider || 'local';

    user.save(function (err, newUser) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }
        res.json(newUser);
    });
};

exports.delete = function (req, res) {
    var user = req.model;

    user.remove(function (err) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }

        res.json(user);
    });
};

exports.list = function (req, res) {

    var skip = parseInt(req.query.$skip) || 0;
    var limit = parseInt(req.query.$limit) || 10;
    var sort = req.query.$sort;
    var query = {};
    if (req.query.$text) {
        query.$text = {$search: req.query.$text};
    }

    User.find(query, '-salt -password')
        .sort(sort)
        .limit(limit)
        .skip(skip)
        .populate('user', 'displayName').exec(function (err, users) {
        if (err) {
            return res.status(400).send({
                message: errorHandler.getErrorMessage(err)
            });
        }

        res.json(users);
    });
};

exports.generatePassword = function (req, res) {
    User.generateRandomPassphrase()
        .then(function (password) {
            res.send({newPassword: password});
        })
        .catch(function (err) {
            res.status(500).send(err);
        });
};

exports.sendEmail = function (req, res) {

    var httpTransport = 'http://';
    if (config.secure && config.secure.ssl === true) {
        httpTransport = 'https://';
    }
    var siteUrl = httpTransport + req.headers.host;

    var username = req.body.username.toLowerCase();
    var user = User.findOne({username: username})
        .exec()
        .then(function (user) {
            emailService.send(user, req.body.template, req.body.body, siteUrl)
                .then(function () {
                    res.status(200).send('Email sent');
                })
                .catch(function (err) {
                    console.log(err);
                    res.status(500).send('An error occurred while sending an email to ' + username);
                });
        }, function (err) {
            res.status(500).send('Could not find user with username ' + username);
        });

};

exports.userByID = function (req, res, next, id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send({
            message: 'User is invalid'
        });
    }
    var findById = User.findById(id, '-salt -password');

    findById.exec(function (err, user) {
        if (err) {
            return next(err);
        } else if (!user) {
            return next(new Error('Failed to load user ' + id));
        }

        req.model = user;
        next();
    });
};
