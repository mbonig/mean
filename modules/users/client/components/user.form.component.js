(function () {
    'use strict';
    angular.module('users').component('starzUserForm', {
        templateUrl: 'modules/users/client/views/admin/widgets/user.form.html',
        require: '^form',
        controller: function(UserAdmin){
            var vm = this;
            vm.populateUsername = populateUsername;
            vm.generatePassword = generatePassword;

            function populateUsername() {
                if (!vm.model.username) {
                    vm.model.username = vm.model.email.substring(0, vm.model.email.indexOf('@'));
                }
            }

            function generatePassword() {
                UserAdmin.generatePassword().$promise.then(function (result) {
                    vm.model.password = result.newPassword;
                });
            }

        },
        controllerAs: 'vm',
        bindings:{
            model:'=',
            form:'='
        }
    });


})();
