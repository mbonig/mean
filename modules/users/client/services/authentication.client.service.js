(function () {
    'use strict';

    angular.module('users').factory('Authentication', Authentication);

    Authentication.$inject = ['$window'];

    function Authentication($window) {
        var auth = {
            user: $window.user
        };

        return auth;
    }
})();
