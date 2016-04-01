(function () {
    'use strict';

    angular.module('core').service('DeleteConfirm', DeleteConfirm);

    function DeleteConfirm() {
        return function (modalName, objectDescriptor, actualDelete, closeCallback) {
            return {
                template: '<div class="delete-confirm"><div class="modal-header"><h1 class="modal-title">Are you sure?</h3></div><div class="modal-body">' +
                '<p>Are you sure you\'d like to delete the ' + modalName + ' ' + objectDescriptor + '?</p>' +
                '<div class="modal-footer"><button class="btn btn-danger" ng-click="vm.delete()">Yes</button><button class="btn btn-default" ng-click="vm.cancel()">No</button></div>' +
                '</div>',
                controller: function () {
                    return {
                        cancel: function () {
                            closeCallback();
                        },
                        delete: function () {
                            actualDelete();
                            closeCallback();
                        }
                    };
                },
                controllerAs: 'vm'
            };
        };
    }
})();
