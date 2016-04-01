(function () {
    'use strict';
    angular.module('users.admin').controller('UserCreateController', UserCreateController);

    UserCreateController.$inject = ['$scope', '$state', 'UserAdmin'];

    function UserCreateController($scope, $state, UserAdmin) {
        var vm = this;
        vm.user = new UserAdmin({roles:['user']});
        vm.save = save;

        function save(isValid) {
            if (!isValid) {
                $scope.$broadcast('show-errors-check-validity', 'vm.userForm');
                return false;
            }

            var user = vm.user;

            user.$save(function () {
                $state.go('admin.user', {
                    userId: user._id
                });
            }, function (errorResponse) {
                vm.error = errorResponse.data.message;
            });
        }
    }
})();
