(function() {
    "use strict";

    angular
        .module("immiApp.components")
        .factory("HTTPFactory", HTTPFactory);


    /**
     * @ngdoc Injector
     * @name HTTPFactory
     * @private
     * @module immiApp.components
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    HTTPFactory.$inject = ["$http", "$log", "$window"];

    /**
     * @ngdoc Factory
     * @name HTTPFactory
     * @module immiApp.components
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function HTTPFactory($http, $log,$window) {
        // var host = "http://65.181.53.30:9093";
        //var host =  "http://localhost:9000";
        var host =  "http://192.168.1.56:8000";

        return {
          call : call,
          getHostURL : getHostURL
        };

        /**
         * @ngdoc function
         * @name call
         * @description
         * creates the http request to
         * server
         *
         */
        function call(config) {
          //$log.info()
          config.url = host+config.url;
          return $http(config);
        }

        /**
         * @ngdoc function
         * @name getHostURL
         * @description
         * Gets the URL of server
         */
        function getHostURL(config) {
          return host;
        }
    }
})();
