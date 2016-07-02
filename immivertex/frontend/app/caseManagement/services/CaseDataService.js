(function() {
    "use strict";

    angular
        .module("immiApp.caseManagement")
        .service('CaseDataService', CaseDataService);

    /**
     * @ngdoc Injector
     * @name CaseDataService
     * @private
     * @module immiApp.caseManagement
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    CaseDataService.$inject = [
      "HTTPFactory",
      "$q",
      "$timeout"
    ];

    /**
     * @ngdoc Service
     * @name CaseDataService
     * @module immiApp.caseManagement
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function CaseDataService(HTTPFactory,$q, $timeout) {
        var _self = this;

        var cases = {
          "total": 5,
          "per_page": "5",
          "current_page": 1,
          "last_page": 1,
          "from": 1,
          "to": 5,
          "data": [
            {
              "beneficiary_name":"rohit",
              "case_name":"H1B",
              "is_premium":1,
              "id": 1
            },{
              "beneficiary_name":"Sanjay",
              "case_name":"H1B",
              "is_premium":0,
              "id": 2
            },{
              "beneficiary_name":"Smith",
              "case_name":"H1B",
              "is_premium":1,
              "id": 3
            },{
              "beneficiary_name":"Praveen",
              "case_name":"H1B",
              "is_premium":0,
              "id": 4
            },{
              "beneficiary_name":"Bravo",
              "case_name":"H1B",
              "is_premium":1,
              "id": 5
            }
          ]
        };

        var programs =  {
          "data":[{
            "id": 46,
            "name": "dfdsg gffdg",
            "created_at": "2016-05-05 19:49:37",
            "updated_at": "2016-05-05 19:49:37",
            "deleted_at": null,
            "updated_by": 755,
            "code": "dfdsg gffdg",
            "description": "fdgfdgfgfd      fdgfdgdfgfdgfd"
          },{
            "id": 45,
            "name": "PCASE",
            "created_at": "2016-04-26 18:08:41",
            "updated_at": "2016-04-26 18:08:41",
            "deleted_at": null,
            "updated_by": 755,
            "code": "PCASE",
            "description": "Checklist"
          },{
            "id": 44,
            "name": "Sadhana",
            "created_at": "2016-04-26 17:39:13",
            "updated_at": "2016-04-26 17:39:13",
            "deleted_at": null,
            "updated_by": 755,
            "code": "Sadhana",
            "description": "Caseses"
          },{
            "id": 43,
            "name": "gggggggggggg",
            "created_at": "2016-04-22 18:45:31",
            "updated_at": "2016-04-22 18:45:31",
            "deleted_at": null,
            "updated_by": 755,
            "code": "gggggggggggg",
            "description": "ertetr"

          },{
            "id": 42,
            "name": "case",
            "created_at": "2016-04-22 14:41:54",
            "updated_at": "2016-04-22 14:41:54",
            "deleted_at": null,
            "updated_by": 755,
            "code": "case",
            "description": "dsfsafs"
          }]
      };


        /**
         * @ngdoc function
         * @name getCaseList
         * @description
         * //Description goes here
         */
         _self.getCaseList = function(){
           var defer = $q.defer();
           $timeout(function(){
             defer.resolve(cases);
           },1000);
           return defer.promise;
         };

         /**
          * @ngdoc function
          * @name getProgramCaseList
          * @description
          * Gets list of cases
          */
         _self.getProgramCaseList = function() {
           return HTTPFactory.call({
             url: "/case-types",
             method: "GET"
           });
         };

    }
})();
