(function () {
    'use strict';

    angular.module('users.admin').run(UserAdminMenu);
    UserAdminMenu.$inject = ['Menus'];
    function UserAdminMenu(Menus) {
        Menus.addMenuItem('topbar', {
            title: 'Users',
            state: 'admin.users',
            roles: ['admin'],
            position: 3
        });
    }

})();
