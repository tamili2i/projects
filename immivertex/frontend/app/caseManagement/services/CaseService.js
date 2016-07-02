(function() {
    "use strict";

    angular
        .module("immiApp.caseManagement")
        .service("CaseService", CaseService);

    /**
     * @ngdoc Injector
     * @name CaseService
     * @private
     * @module ModuleName
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    CaseService.$inject = [
      "CaseDataService",
      "CaseGridConfig",
      "Session"
    ];

    /**
     * @ngdoc Service
     * @name CaseService
     * @module ModuleName
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function CaseService(CaseDataService, CaseGridConfig, Session) {
        var _self= this;

        /**
         * @ngdoc function
         * @name getCaseList
         * @description
         * //Description goes here
         */
        _self.getCaseList = function(successCallback, errorCallback) {
          var cases = CaseDataService.getCaseList();
          cases.then(function(response){
            successCallback(response);
          }, function(response){
            errorCallback();
          });
        };

        /**
         * @ngdoc function
         * @name getProgramCaseList
         * @description
         * Gets list of program cases
         */
         _self.getProgramCaseList = function(){
           return CaseDataService.getProgramCaseList();
         }

         /**
          * @ngdoc function
          * @name setPageRedirection
          * @description
          * Sets from state is create case
          *
          */
         _self.setPageRedirection = function(value) {
           Session.setPageRedirection(value);
         }
    }
})();
