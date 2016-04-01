(function () {
    'use strict';

    angular.module('users').controller('PasswordController', PasswordController);

    PasswordController.$inject = ['$scope', '$rootScope', '$stateParams', '$http', '$state', 'Authentication', 'PasswordValidator', 'TelemetryService'];

    function PasswordController($scope, $rootScope, $stateParams, $http, $state, Authentication, PasswordValidator, TelemetryService) {
        $rootScope.bodyClass = 'dark';

        $scope.authentication = Authentication;
        $scope.popoverMsg = PasswordValidator.getPopoverMsg();

        //If user is signed in then redirect back home
        if ($scope.authentication.user) {
            $state.go('home');
        }

        // Submit forgotten password account id
        $scope.askForPasswordReset = function (isValid) {
            $scope.success = $scope.error = null;

            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'forgotPasswordForm');

                return false;
            }

            TelemetryService.track('ForgotPassword', {username: $scope.credentials.username});

            $http.post('/api/auth/forgot', $scope.credentials).success(function (response) {
                // Show user success message and clear form
                $scope.credentials = null;
                $scope.success = response.message;

            }).error(function (response) {
                // Show user error message and clear form
                $scope.credentials = null;
                $scope.error = response.message;
            });
        };

        // Change user password
        $scope.resetUserPassword = function (isValid) {
            $scope.success = $scope.error = null;

            /*if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'resetPasswordForm');

                return false;
            }
*/
            TelemetryService.track('ResetPassword', {token: $stateParams.token});

            $http.post('/api/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function (response) {
                // If successful show success message and clear form
                $scope.passwordDetails = null;

                // Attach user profile
                Authentication.user = response;

                // And redirect to the index page
                $state.go('password.reset.success');
            }).error(function (response) {
                TelemetryService.track('ResetPassword.Failed', {
                    token: $stateParams.token,
                    attemptedPassword: $scope.passwordDetails
                });
                $scope.error = response.message;
            });
        };
    }
})();
