(function () {
    'use strict';
    angular.module('core').service('SearchTerms', SearchTerms);

    SearchTerms.$inject = ['$window'];

    function SearchTerms($window) {

        $window.localStorage = $window.localStorage || {
                _data: {},
                setItem: function (id, val) {
                    /*jshint -W093 */
                    return this._data[id] = String(val);
                },
                getItem: function (id) {
                    return this._data.hasOwnProperty(id) ? this._data[id] : undefined;
                },
                removeItem: function (id) {
                    return delete this._data[id];
                },
                clear: function () {
                    /*jshint -W093 */
                    return this._data = {};
                }
            };

        return {
            get: function (key) {
                return $window.localStorage.getItem(key);
            },
            set: function (key, value) {
                return $window.localStorage.setItem(key, value);

            }
        };
    }
})();
