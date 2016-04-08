(function () {
    'use strict';

    angular.module('core').service('SiteConfig', SiteConfig);

    SiteConfig.$inject = ['$resource'];

    function SiteConfig($resource) {
        return $resource('api/siteConfigs', {}, {});
    }

})();
