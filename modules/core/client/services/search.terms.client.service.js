(function () {
    'use strict';
    angular.module('core').service('SearchTerms', SearchTerms);

    SearchTerms.$inject = ['$window', 'localStorage'];

    function SearchTerms($window, localStorage) {


        return {
            get: function (key) {
                return localStorage.getItem(key);
            },
            set: function (key, value) {
                return localStorage.setItem(key, value);

            }
        };
    }
})();
