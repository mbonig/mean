(function () {
    'use strict';

    angular.module('core')
        .directive('starzHamburgerButton', HamburgerBtn);

    function HamburgerBtn() {
        return {
            templateUrl: 'modules/core/client/views/widgets/hamburger-btn.html',
            restrict: 'E',
            controller: ButtonController,
            controllerAs: 'vm',
            bindToController: true,
            scope: {
                target: '='
            }
        };
    }

    function ButtonController() {
        var vm = this;
        vm.title = 'Open menu';
        vm.activeClass = '';
        vm.target = false;
        vm.toggle = function (e) {
            e.stopPropagation();
            if (!vm.target) {
                vm.open();
            } else {
                vm.close();
            }
        };
        vm.close = function () {
            vm.target = false;
            vm.title = 'Open menu';
            vm.activeClass = '';
        };
        vm.open = function () {
            vm.target = true;
            vm.title = 'Close menu';
            vm.activeClass = 'is-active';
        };
    }
})();
