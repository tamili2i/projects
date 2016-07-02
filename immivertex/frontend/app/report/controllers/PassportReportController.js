(function() {
  "use strict";

  angular
    .module("immiApp.report")
    .controller("PassportReportController", PassportReportController);

  /**
   * @ngdoc Injector
   * @name PassportReportController
   * @private
   * @module Report
   * @description
   * 
   * @author Connvertex Technologies
   * @copyright
   */
  PassportReportController.$inject = [
    "$scope",
    "$location",
    "$state",
    "PassportReportService",
    "GridConstants",
    "GridService",
    "Session"
  ];

  /**
   * @ngdoc Controller
   * @name PassportReportController
   * @module Report
   * @requires
   * @description
   * Get the Beneficiary Report owned 
   * by logged in user. 
   * Filters:: [Start Date][End Date]
   * @author Connvertex Technologies
   * @copyright
   */
  function PassportReportController($scope, $location, $state, PassportReportService, GridConstants, GridService, Session) {
    var vm = this;

    
    vm.passportReport = {};
    vm.gridName = GridConstants.PASSPORT_REPORT_LIST;

    vm.fetch = function(){
      vm.isLoading = true; 
      vm.getPassportReport();
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
      vm.getPassportReport();
    };

    /**
     * @ngdoc function
     * @name constructQueryParam
     * @param 
     * @description
     * costruct param 
     * based on user selection
     * assign ng-model values to queryParam
     *
     */

    var constructQueryParam = function() {
      var qParam = $location.search(),
        queryParam = {};

      if (qParam.page) {
        queryParam.page = qParam.page;
      }
      //queryParam.party_id = Session.getPartyId();
      queryParam.report = 'passport';
      queryParam.start_date = vm.passportReport.start_date;
      queryParam.end_date = vm.passportReport.end_date;

      return queryParam;
    };

    /**
     * @ngdoc function
     * @name getPassportReport
     * @param {function} successCallback
     * @param {function} errorCallback
     * @description
     * Gets report of passport experition of logged in Party and initiates grid render
     *
     */
    vm.getPassportReport = function() {
        vm.isLoading = true;
        var queryParam = constructQueryParam();
        PassportReportService.getPassportReport(queryParam, function successCallback(response) {
          GridService.renderGridWithPagination({
            "gridId": GridConstants.PASSPORT_REPORT_LIST,
            "dataObj": response,
            "context": $scope,
            "onPaginate" : onPaginate
          }, function() {
            vm.isLoading = false;
          });
        }, function errorCallback() {
          GridService.renderGrid(GridConstants.PASSPORT_REPORT_LIST, [], function(){
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
    $scope.$on("$destroy", function() {
      GridService.destroyGrid(vm.gridName);
    });
  }
})();
