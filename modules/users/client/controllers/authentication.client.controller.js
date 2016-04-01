(function () {
    'use strict';

    angular.module('users').controller('AuthenticationController', AuthenticationController);

    AuthenticationController.$inject = ['$scope', '$rootScope', '$state', '$http', '$location', '$window', 'Authentication', 'PasswordValidator', 'TelemetryService'];

    function AuthenticationController($scope, $rootScope, $state, $http, $location, $window, Authentication, PasswordValidator, TelemetryService) {

        $rootScope.bodyClass = 'dark';

        $scope.authentication = Authentication;
        $scope.popoverMsg = PasswordValidator.getPopoverMsg();

        // Get an eventual error defined in the URL query string:
        $scope.error = $location.search().err;

        // If user is signed in then redirect back home
        if ($scope.authentication.user) {
            $location.path('/');
        }

        $scope.signin = function (isValid) {
            $scope.error = null;

            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'userForm');

                return false;
            }

            $http.post('/api/auth/signin', $scope.credentials)
                .success(function (response) {
                    // If successful we assign the response to the global user model
                    $scope.authentication.user = response;

                    // And redirect to the previous or home page
                    $state.go($state.previous.state.name || 'home', $state.previous.params);
                })
                .error(function (response) {
                    TelemetryService.track('LoginFailure', {username: $scope.credentials.username});
                    $scope.error = response.message;
                });
        };

        // OAuth provider request
        $scope.callOauthProvider = function (url) {
            if ($state.previous && $state.previous.href) {
                url += '?redirect_to=' + encodeURIComponent($state.previous.href);
            }

            // Effectively call OAuth authentication route:
            $window.location.href = url;
        };

        $scope.signup = signup;

        function signup(isValid) {
            $scope.error = null;
            // Get an eventual error defined in the URL query string:
            $scope.error = $location.search().err;

            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'userForm');
                // If user is signed in then redirect back home
                if ($scope.authentication.user) {
                    $location.path('/');
                }

                return false;
            }

            $http.post('/api/auth/signup', $scope.credentials).success(function (response) {
                // If successful we assign the response to the global user model
                $scope.authentication.user = response;
                // And redirect to the previous or home page
                $state.go($state.previous.state.name || 'home', $state.previous.params);
            }).error(function (response) {
                $scope.error = response.message;
            });
        }

    }

})();
