(function() {
    "use strict";

    angular.module("immiApp.PcAdministration")
        .controller("ProgramCaseListController", ProgramCaseListController);

    /**
     * @ngdoc Injector
     * @name ProgramCaseListController
     * @private
     * @module immiApp.PcAdministration
     * @description
     * Inject module that needs to be useful for Beneficiary Controller
     * @author Ideas2IT Technologies
     * @copyright
     */
    ProgramCaseListController.$inject = [
        "$scope",
        "$location",
        "$state",
        "ProgramCaseService",
        "GridConstants",
        "GridService"
    ];

    /**
     * @ngdoc Controller
     * @name ProgramCaseListController
     * @module immiApp.PcAdministration
     * @requires $log
     * @description
     *
     * ProgramCaseListController
     *
     */
    /*jslint nomen: true*/
    /*global angular*/

    function ProgramCaseListController($scope, $location, $state, ProgramCaseService, GridConstants, GridService) {
        var vm = this;

        vm.programCases = [];
        vm.isLoading = true;
        vm.gridName = GridConstants.PROGRAM_CASE_LIST;

        /**
         * @ngdoc function
         * @name init
         * @description
         * Initializes the controller
         * with grid data
         *
         */
        function init(){
          vm.getProgramCaseList();
          console.log("PcAdminController initiated");
        }

        /**
         * @ngdoc function
         * @name onPaginate
         * @param {String} pageNo
         * @description
         * binded with pagination
         * and it will be invoked for every
         * page change action
         *
         */
        var onPaginate = function(pageNo) {
          $location.search({
            "page": pageNo
          });
          vm.getProgramCaseList();
        };

        var constructQueryParam = function() {
          var qParam = $location.search(),
            queryParam = {};

          if (qParam.page) {
            queryParam.page = qParam.page;
          }
          // queryParam.party_id = 3;

          return queryParam;
        };

        /**
         * @ngdoc function
         * @name getProgramCaseList
         * @description
         * Gets list of program cases
         *
         */
        vm.getProgramCaseList = function(){
          vm.isLoading = true;
          var queryParam = constructQueryParam();
          ProgramCaseService.getProgramCaseList(queryParam, function successCallback(response) {
            GridService.renderGridWithPagination({
              "gridId": GridConstants.PROGRAM_CASE_LIST,
              "dataObj": response,
              "context": $scope,
              "onPaginate" : onPaginate
            }, function() {
              vm.isLoading = false;
            });
          }, function errorCallback() {
            GridService.renderGrid(GridConstants.PROGRAM_CASE_LIST, [], function(){
                vm.isLoading = false;
            });
          });
        };

        /**
         * @ngdoc event
         * @name $destroy
         * @description
         * Will destroy grid components which
         * associated with this controller.
         */
        $scope.$on("$destroy", function(){
          GridService.destroyGrid(vm.gridName);
        });

        init();
    }

}());
