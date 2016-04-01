(function () {
    'use strict';

    // Setting up route
    angular.module('users').config(userClientRoutes);

    userClientRoutes.$inject = ['$stateProvider'];
    function userClientRoutes($stateProvider) {
        // Users state routing

        $stateProvider
            .state('settings', {
                abstract: true,
                url: '/settings',
                templateUrl: 'modules/users/client/views/settings/settings.client.view.html',
                data: {
                    roles: ['user', 'admin']
                }
            })
            .state('settings.profile', {
                url: '/profile',
                templateUrl: 'modules/users/client/views/settings/edit-profile.client.view.html'
            })
            .state('settings.password', {
                url: '/password',
                templateUrl: 'modules/users/client/views/settings/change-password.client.view.html'
            })
            .state('settings.accounts', {
                url: '/accounts',
                templateUrl: 'modules/users/client/views/settings/manage-social-accounts.client.view.html'
            })
            .state('authentication', {
                abstract: true,
                url: '/authentication',
                template: '<ui-view/>'
            })
            .state('authentication.signup', {
                url: '/signup',
                templateUrl: 'modules/users/client/views/authentication/signup.client.view.html'
            })
            .state('authentication.signin', {
                url: '/signin?err',
                templateUrl: 'modules/users/client/views/authentication/signin.client.view.html'
            })
            .state('password', {
                abstract: true,
                url: '/password',
                template: '<ui-view/>'
            })
            .state('password.forgot', {
                url: '/forgot',
                templateUrl: 'modules/users/client/views/password/forgot-password.client.view.html'
            })
            .state('password.reset', {
                abstract: true,
                url: '/reset',
                template: '<ui-view/>',
                controller: PasswordResetController,
            })
            .state('password.reset.invalid', {
                url: '/invalid',
                templateUrl: 'modules/users/client/views/password/reset-password-invalid.client.view.html',
                controller: PasswordResetController
            })
            .state('password.reset.success', {
                url: '/success',
                templateUrl: 'modules/users/client/views/password/reset-password-success.client.view.html',
                controller: PasswordResetController
            })
            .state('password.reset.form', {
                url: '/:token',
                templateUrl: 'modules/users/client/views/password/reset-password.client.view.html',
                controller: PasswordResetController
            });
    }
    function PasswordResetController($rootScope) {
        $rootScope.bodyClass = 'dark';
    }
})();
