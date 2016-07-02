(function() {
    "use strict";
    /*jslint nomen: true*/
    /*global angular, $, _*/


    function IntakeFormService($q, $timeout, IntakeformDataService, HTTPFactory) {
        var _self = this;

        /**
          * @ngdoc function
          * @name getIntakeformList
          * @param successCallback
          * @param errorCallback
          * @description
          * Get list of intake forms
          *
          */
        _self.getIntakeformList = function(successCallback, errorCallback){
          var intakeformList =  IntakeformDataService.getIntakeformList();
          intakeformList.then(function (response) {
            successCallback(response.data);
          }, function(){
              errorCallback();
          });
        };

        return _self;

    }


    /**
     * @ngdoc Injector
     * @name IntakeFormService
     * @private
     * @module immiApp.intakeform
     * @description
     * Inject module that needs to be useful for grid service
     * @author Ideas2IT Technologies
     * @copyright
     */
    IntakeFormService.$inject = ["$q","$timeout","IntakeformDataService","HTTPFactory"];

    /**
     * @ngdoc Service
     * @name IntakeFormService
     * @module immiApp.intakeform
     * @requires
     * @description
     * This service has functionality to interface with backend to send and fetch data.
     * @author Ideas2IT Technologies
     * @copyright
     */
    angular.module("immiApp.intakeform")
        .service("IntakeFormService", IntakeFormService);

})();
