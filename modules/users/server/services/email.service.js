'use strict';
var Q = require('q');
var tokenizer = require('./token.replacer');
var path = require('path'),
    config = require(path.resolve('./config/config'));

var sendgrid = require('sendgrid')(config.mailer.sendgrid.apikey);

module.exports.send = sendEmail;

/**
 * Sends an email, via sendgrid, to the user, leveraging the template_id in the config for config.mailer.sendgrid.@templateName
 * @param user - user data, typically mongoose User model
 * @param templateName - the template name, as referenced in configs, to get the sendgrid templateId
 * @param bodyText - the sendgrid <%body%>
 * @returns a promise
 */
function sendEmail(user, templateName, bodyText, siteUrl) {
    var deferred = Q.defer();

    var email = new sendgrid.Email();
    email.addTo(user.email);
    email.subject = ' ';
    email.from = config.mailer.from;
    email.text = tokenizer.process(bodyText, user);
    email.html = tokenizer.process(bodyText, user);

    email.setFilters({
        'templates': {
            'settings': {
                'enable': 1,
                'template_id': config.mailer.sendgrid.templates[templateName]
            }
        }
    });

  
    email.setSubstitutions({
        '-siteurl-': [siteUrl]
    });

    sendgrid.send(email, function (err, json) {
        if (!err) {
            deferred.resolve();
        } else {
            deferred.reject(err);
        }
    });


    return deferred.promise;
}
