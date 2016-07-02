(function() {
  "use strict";

  angular
    .module("immiApp.report")
    .controller("PartyReportController", PartyReportController);

  /**
   * @ngdoc Injector
   * @name PartyReportController
   * @private
   * @module Report
   * @description
   * 
   * @author Connvertex Technologies
   * @copyright
   */
  PartyReportController.$inject = [
    "$scope",
    "$location",
    "$state",
    "PartyReportService",
    "GridConstants",
    "GridService",
    "Session"
  ];

  /**
   * @ngdoc Controller
   * @name PartyReportController
   * @module Report
   * @requires
   * @description
   * Get the Beneficiary Report owned 
   * by logged in user. 
   * Filters:: [Start Date][End Date]
   * @author Connvertex Technologies
   * @copyright
   */
  function PartyReportController($scope, $location, $state, PartyReportService, GridConstants, GridService, Session) {
    var vm = this;

    
    vm.partyReport = {};
    vm.gridName = GridConstants.PARTY_REPORT_LIST;

    vm.fetch = function(){
      vm.isLoading = true; 
      vm.getPartyReport();
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
      vm.getPartyReport();
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
      queryParam.report = 'party';
      queryParam.start_date = vm.partyReport.start_date;
      queryParam.end_date = vm.partyReport.end_date;

      return queryParam;
    };

    /**
     * @ngdoc function
     * @name getPartyReport
     * @param {function} successCallback
     * @param {function} errorCallback
     * @description
     * Gets list of Parties of logged in Party and initiates grid render
     *
     */
    vm.getPartyReport = function() {
        vm.isLoading = true;
        var queryParam = constructQueryParam();
        PartyReportService.getPartyReport(queryParam, function successCallback(response) {
          GridService.renderGridWithPagination({
            "gridId": GridConstants.PARTY_REPORT_LIST,
            "dataObj": response,
            "context": $scope,
            "onPaginate" : onPaginate
          }, function() {
            vm.isLoading = false;
          });
        }, function errorCallback() {
          GridService.renderGrid(GridConstants.PARTY_REPORT_LIST, [], function(){
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
