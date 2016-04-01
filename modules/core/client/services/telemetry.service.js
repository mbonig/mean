(function () {
    'use strict';
    angular.module('core').service('TelemetryService', TelemetryService);
    TelemetryService.$inject = ['app_name'];
    function TelemetryService(app_name) {
        return {
            track: function(key, value){
                /* global mixpanel */
                mixpanel.track(app_name + '.' + key, value);
            }
        };
    }
})();
