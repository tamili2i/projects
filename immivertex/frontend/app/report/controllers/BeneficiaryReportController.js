(function() {
  "use strict";

  angular
    .module("immiApp.report")
    .controller("BeneficiaryReportController", BeneficiaryReportController);

  /**
   * @ngdoc Injector
   * @name BeneficiaryReportController
   * @private
   * @module Report
   * @description
   * 
   * @author Connvertex Technologies
   * @copyright
   */
  BeneficiaryReportController.$inject = [
    "$scope",
    "$location",
    "$state",
    "BeneficiaryReportService",
    "GridConstants",
    "GridService",
    "Session"
  ];

  /**
   * @ngdoc Controller
   * @name BeneficiaryReportController
   * @module Report
   * @requires
   * @description
   * Get the Beneficiary Report owned 
   * by logged in user. 
   * Filters:: [Start Date][End Date]
   * @author Connvertex Technologies
   * @copyright
   */
  function BeneficiaryReportController($scope, $location, $state, BeneficiaryReportService, GridConstants, GridService, Session) {
    var vm = this;

    
    vm.beneficiaryReport = {};
    vm.gridName = GridConstants.BENEFICIARY_REPORT_LIST;

    vm.fetch = function(){
      vm.isLoading = true; 
      vm.getBeneficiaryReport();
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
      vm.getBeneficiaryReport();
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
      queryParam.report = 'beneficiary';
      queryParam.id = Session.getPartyId();
      queryParam.module = Session.getPartyType();
      queryParam.start_date = vm.beneficiaryReport.start_date;
      queryParam.end_date = vm.beneficiaryReport.end_date;

      return queryParam;
    };

    /**
     * @ngdoc function
     * @name getBeneficiaryReport
     * @param {function} successCallback
     * @param {function} errorCallback
     * @description
     * Gets list of Benificiaries of logged in Party and initiates grid render
     *
     */
    vm.getBeneficiaryReport = function() {
        vm.isLoading = true;
        var queryParam = constructQueryParam();
        BeneficiaryReportService.getBeneficiaryReport(queryParam, function successCallback(response) {
          GridService.renderGridWithPagination({
            "gridId": GridConstants.BENEFICIARY_REPORT_LIST,
            "dataObj": response,
            "context": $scope,
            "onPaginate" : onPaginate
          }, function() {
            vm.isLoading = false;
          });
        }, function errorCallback() {
          GridService.renderGrid(GridConstants.BENEFICIARY_REPORT_LIST, [], function(){
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
