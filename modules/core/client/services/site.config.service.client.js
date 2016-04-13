(function () {
    'use strict';

    angular.module('core').service('SiteConfig', SiteConfig);

    SiteConfig.$inject = ['$resource', 'localStorage'];

    function SiteConfig($resource, localStorage) {
        var resource = $resource('api/siteConfigs', {}, {});
        resource.get = (function (existingGet) {
            return function () {
                var cached = localStorage.getItem('siteConfig');
                if (cached) {
                    var parsed = JSON.parse(cached);
                    if (parsed.expires && Date.parse(parsed.expires) > new Date()) {
                        return parsed.record;
                    }
                }

                var theCall = existingGet();

                theCall.$promise.then(function (record) {
                    var in30Minutes = new Date(new Date().getTime() + 30 * 60000);

                    localStorage.setItem('siteConfig', JSON.stringify({record: record, expires: in30Minutes}));

                });
                return theCall;

            };
        })(resource.get);
        return resource;
    }

})();
