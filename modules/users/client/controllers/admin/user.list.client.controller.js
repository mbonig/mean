(function () {
    'use strict';

    angular.module('users.admin').controller('UserListController', UserListController);

    UserListController.$inject = ['UserAdmin', 'lodash', '$uibModal', 'DeleteConfirm', 'SearchTerms', '$scope'];

    function UserListController(UserAdmin, _, $uibModal, DeleteConfirm, SearchTerms, $scope) {
        var vm = this;
        vm.users = [];
        vm.getMoreUsers = getMoreUsers;
        vm.searchUsers = searchUsers;
        vm.remove = remove;
        vm.loading = false;
        vm.cantloadmore = false;
        vm.search = '';

        vm.sort = '';
        vm.reverse = false;
        vm.order = order;

        activate();

        function activate() {
            restoreSearchTerm();
            getMoreUsers();

            $scope.$watch('vm.search', function (value) {
                SearchTerms.set('users', value);
            });
        }

        function restoreSearchTerm() {
            vm.search = SearchTerms.get('users');
        }

        function order(predicate) {
            vm.reverse = (vm.sort === predicate) ? !vm.reverse : false;
            vm.sort = predicate;
            searchUsers();
        }

        function searchUsers() {
            vm.cantloadmore = false;
            vm.users = [];
            getMoreUsers();
        }

        function actualRemove(user) {
            return function () {
                user.$remove(function () {
                    _.remove(vm.users, {_id: user._id});
                });
            };
        }

        function getMoreUsers() {
            // $inview has a bug where if the item is hidden, it's always given as in the viewport,
            // so let's double check..
            if (vm.loading || vm.cantloadmore) {
                return;
            }
            vm.loading = true;
            var query = {
                $skip: vm.users.length,
                $limit: 10,
                $text: vm.search,
                $sort: vm.reverse ? '-' + vm.sort : vm.sort
            };
            UserAdmin.query(query).$promise.then(function (users) {
                if (users.length === 0) {
                    vm.cantloadmore = true;
                }
                vm.users = _.concat(vm.users, users);
                vm.loading = false;
            });
        }

        function remove(user) {
            var modal = $uibModal.open(new DeleteConfirm('User', user.email, actualRemove(user), function () {
                modal.close();
            }));
        }

    }
})();
