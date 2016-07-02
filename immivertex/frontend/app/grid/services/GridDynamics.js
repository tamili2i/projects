(function() {
    "use strict";

    angular
        .module("immiApp.grid")
        .service("GridDynamics", GridDynamics);

    /**
     * @ngdoc Injector
     * @name GridDynamics
     * @private
     * @module immiApp.grid
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    GridDynamics.$inject = ["Utils"];

    /**
     * @ngdoc Service
     * @name GridDynamics
     * @module immiApp.grid
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function GridDynamics(Utils) {
      var _self = this,
        gridConfig = {};

      /**
       * @name pushGridConfig
       * @param gridId, configObj
       * @description
       * Whole applications total grid Configuration from
       * various modules will be set to GridService local
       */
      _self.pushGridConfig = function (gridId, configObj) {
        if(!(gridId in gridConfig)){
          gridConfig[gridId] = configObj;
        }
      };

      /**
       * @ngdoc function
       * @name calculateGridHeight
       * @param config
       * @description
       * Calculates grid height based on window height
       * @return config
       */
      _self.calculateGridHeight = function(config){
        if(typeof config.scrollY === "number"){
          config.scrollY = Utils.getHeight(config.scrollY) + "px";
        }
        return config;
      };

      /**
       * @name getGridConfig
       * @param gridId
       * @description
       * Returns grid configuration object for
       * given id
       * @return configObj || null
       */
      _self.getGridConfig = function (gridId, data) {
        if((gridId in gridConfig)){

          var config = angular.copy(gridConfig[gridId]);

          config = _self.calculateGridHeight(config);

          if(data && data.length > 0)
            config.aaData = data;

          return config;
        } else {
          return null;
        }
      };

      return _self;
    }
})();
