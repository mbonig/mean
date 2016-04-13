(function () {
    'use strict';

    angular.module('core').controller('HeaderController', HeaderController);

    HeaderController.$inject = ['$scope', '$state', 'Authentication', 'Menus', 'SiteConfig'];

    function HeaderController($scope, $state, Authentication, Menus, SiteConfig) {
        var vm = this;
        // Expose view variables
        vm.$state = $state;
        vm.authentication = Authentication;
        vm.siteConfig = SiteConfig.get();

        // Get the topbar menu
        vm.menu = Menus.getMenu('topbar');

        // Get the account menu
        vm.accountMenu = Menus.getMenu('account').items[0];

        // Toggle the menu items
        vm.isOpen = false;
        
        // Collapsing the menu after navigation
        $scope.$on('$stateChangeSuccess', function () {
            vm.isOpen = false;
        });

    }
})();
