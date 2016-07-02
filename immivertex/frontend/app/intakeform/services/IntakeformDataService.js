(function() {
    "use strict";
    /*jslint nomen: true*/
    /*global angular, $, _*/


    function IntakeformDataService($q, $timeout, IntakeFormGridConfig, HTTPFactory) {

    	var data_list = [{  "id":15401,
                          "name":"Form H1-234",
                          "description":"For beneficiary",
                          "created_id":12301,
                          "updated_id":12306

                        },{
                          "id":15402,
                          "name":"Form I1-209",
                          "description":"For attorney",
                          "created_id":12310,
                          "updated_id":12315
                        },{
                          "id":15403,
                          "name":"R1-109",
                          "description":"For employer",
                          "created_id":12320,
                          "updated_id":12346}];

        var _self = this;

        /**
          * @ngdoc function
          * @name getIntakeformList
          * @description
          * Get list of intake forms
          *
          */
        _self.getIntakeformList = function(){
          return HTTPFactory.call({
            method: "GET",
            url: "/intake-form/intake-forms"
          });
        };

        return _self;

    }


    /**
     * @ngdoc Injector
     * @name IntakeformDataService
     * @private
     * @module immiApp.intakeform
     * @description
     * Inject module that needs to be useful for grid service
     * @author Ideas2IT Technologies
     * @copyright
     */
    IntakeformDataService.$inject = ["$q","$timeout", "IntakeFormGridConfig","HTTPFactory"];

    /**
     * @ngdoc Service
     * @name IntakeformDataService
     * @module immiApp.intakeform
     * @requires
     * @description
     * This service has functionality to interface with backend to send and fetch data.
     * @author Ideas2IT Technologies
     * @copyright
     */
    angular.module("immiApp.intakeform")
        .service("IntakeformDataService", IntakeformDataService);

})();
