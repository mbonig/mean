(function () {
    'use strict';
    angular.module('users.admin').controller('ImportController', ImportController);

    ImportController.$inject = ['$scope', '$state', 'UserImporterService'];

    function ImportController($scope, $state, UserImporterService) {
        var vm = this;
        vm.submit = submit;
        vm.file = null;

        function submit() {
            UserImporterService.file = vm.file;
            $scope.$close('');
            $state.go('group.import');
        }
    }
})();
