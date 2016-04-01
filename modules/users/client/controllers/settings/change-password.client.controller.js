(function () {
    'use strict';

    angular.module('users').controller('ChangePasswordController', ChangePasswordController);

    ChangePasswordController.$inject = ['$scope', '$rootScope', '$http', 'Authentication', 'PasswordValidator'];

    function ChangePasswordController($scope, $rootScope, $http, Authentication, PasswordValidator) {
        $rootScope.bodyClass = 'dark';

        $scope.user = Authentication.user;
        $scope.popoverMsg = PasswordValidator.getPopoverMsg();

        // Change user password
        $scope.changeUserPassword = function (isValid) {
            $scope.success = $scope.error = null;

            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'passwordForm');

                return false;
            }

            $http.post('/api/users/password', $scope.passwordDetails).success(function (response) {
                // If successful show success message and clear form
                $scope.$broadcast('show-errors-reset', 'passwordForm');
                $scope.success = true;
                $scope.passwordDetails = null;
            }).error(function (response) {
                $scope.error = response.message;
            });
        };
    }

})();
