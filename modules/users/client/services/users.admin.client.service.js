(function () {
    'use strict';
    angular.module('users.admin').factory('UserAdmin', UserAdmin);

    UserAdmin.$inject = ['$resource'];

    function UserAdmin($resource) {
        return $resource('api/users/:userId', {
            userId: '@_id'
        }, {
            update: {
                method: 'PUT'
            },
            generatePassword: {
                method: 'GET',
                isArray: false,
                url: 'api/users/generatePassword'
            },
            sendEmail:{
                method: 'POST',
                url: 'api/users/sendEmail'
            }
        });
    }

})();
