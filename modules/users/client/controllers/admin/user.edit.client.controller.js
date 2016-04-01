(function () {
    'use strict';

    angular.module('users.admin').controller('UserEditController', UserEditController);

    UserEditController.$inject = ['$scope', '$state', 'Authentication', 'userResolve', 'UserAdmin'];

    function UserEditController($scope, $state, Authentication, userResolve, UserAdmin) {
        var vm = this;

        vm.authentication = Authentication;
        vm.user = userResolve;
        vm.update = update;
        vm.generatePassword = generatePassword;

        activate();

        function activate() {
        }

        function generatePassword() {

            UserAdmin.generatePassword({userId: vm.user._id}).$promise.then(function(result){
                vm.user.password = result.newPassword;
            });
        }

        function update(isValid) {
            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

                return false;
            }

            var user = vm.user;

            user.$update(function () {
                $state.go('admin.user', {
                    userId: user._id
                });
            }, function (errorResponse) {
                vm.error = errorResponse.data.message;
            });
        }


    }
})();
