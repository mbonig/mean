(function () {
    'use strict';

    angular.module('users').factory('PasswordValidator', PasswordValidator);

    PasswordValidator.$inject = [];

    function PasswordValidator() {
        return {
            getResult: function (password) {
                return test(password);
            },
            getPopoverMsg: function () {
                return 'Your password needs to be at least 7 characters. You are not required to use numbers or symbols or capital letters, but we recommend you do.';
            }
        };
    }

    function test(password){
        // this is copied and pasted from the server module (which is tested and maintained)
        // /modules/users/server/services/password.tester.js. If in doubt, this code
        // should be the exact same as that code...
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
            results.errors.push('The password must be at least 8 characters long.');
        }

        return results;

    }
})();
