'use strict';

module.exports.test = function (password) {
    // this mimics the structure of the OWASP test module, even though we don't use most of it.
    var results = {
        errors: [],
        failedTests: [],
        requiredTestErrors: [],
        optionalTestErrors: [],
        passedTests: [],
        isPassphrase: false,
        strong: false,
        optionalTestsPassed: 4
    };

    if (!password || password.length < 7) {
        results.errors.push('The password must be at least 7 characters long.');
    }

    return results;
};
