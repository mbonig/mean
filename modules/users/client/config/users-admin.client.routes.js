(function () {
    'use strict';

    // Setting up route
    angular.module('users.admin.routes').config(routeConfig);

    routeConfig.$inject = ['$stateProvider'];

    function routeConfig($stateProvider) {
        $stateProvider
            .state('admin.users', {
                url: '/users',
                templateUrl: 'modules/users/client/views/admin/list-users.client.view.html',
                controller: 'UserListController',
                controllerAs: 'vm'
            })
            .state('admin.user-create', {
                url: '/users/create',
                templateUrl: 'modules/users/client/views/admin/create-user.client.view.html',
                controller: 'UserCreateController',
                controllerAs: 'vm'
            })
            .state('admin.user', {
                url: '/users/:userId',
                templateUrl: 'modules/users/client/views/admin/view-user.client.view.html',
                controller: 'UserEditController',
                controllerAs: 'vm',
                resolve: {
                    userResolve: ['$stateParams', 'UserAdmin', function ($stateParams, UserAdmin) {
                        return UserAdmin.get({
                            userId: $stateParams.userId
                        });
                    }]
                }
            })
            .state('admin.user-edit', {
                url: '/users/:userId/edit',
                templateUrl: 'modules/users/client/views/admin/edit-user.client.view.html',
                controller: 'UserEditController',
                controllerAs: 'vm',
                resolve: {
                    userResolve: ['$stateParams', 'UserAdmin', function ($stateParams, UserAdmin) {
                        return UserAdmin.get({
                            userId: $stateParams.userId, expand: 'groups'
                        });
                    }]
                }
            });
    }


})();
