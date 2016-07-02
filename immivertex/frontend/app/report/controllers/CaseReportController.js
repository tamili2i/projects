(function() {
  "use strict";

  angular
    .module("immiApp.report")
    .controller("CaseReportController", CaseReportController);

  /**
   * @ngdoc Injector
   * @name CaseReportController
   * @private
   * @module Report
   * @description
   * 
   * @author Connvertex Technologies
   * @copyright
   */
  CaseReportController.$inject = [
    "$scope",
    "$location",
    "$state",
    "CaseFormTypes",
    "CaseReportService",
    "GridConstants",
    "GridService",
    "Session"
  ];

  /**
   * @ngdoc Controller
   * @name CaseReportController
   * @module Report
   * @requires
   * @description
   * Get the Case Report owned 
   * by logged in user. 
   * Filters:: [Start Date][End Date]
   * @author Connvertex Technologies
   * @copyright
   */
  function CaseReportController($scope, $location, $state, CaseFormTypes, CaseReportService, GridConstants, GridService, Session) {
    var vm = this;

    vm.caseReport = {};
    vm.gridName = GridConstants.PASSPORT_REPORT_LIST;
    vm.allCaseTypes = CaseFormTypes;
    vm.fetch = function(){
      vm.isLoading = true; 
      vm.getCaseReport();
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
      vm.getCaseReport();
    };

    vm.resetParam = function(){
      
      vm.caseReport.caseForm="";
    }

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
      console.log(vm.caseReport);
      if(vm.caseReport.caseForm){
        
        queryParam.id = vm.caseReport.caseForm;
      }else{
        queryParam.id = Session.getPartyId();
      } 
      queryParam.report = vm.caseReport.caseBy;
      queryParam.start_date = vm.caseReport.start_date;
      queryParam.end_date = vm.caseReport.end_date;

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
    vm.getCaseReport = function() {
        vm.isLoading = true;
        var queryParam = constructQueryParam();
        CaseReportService.getCaseReport(queryParam, function successCallback(response) {
          GridService.renderGridWithPagination({
            "gridId": GridConstants.CASE_REPORT_LIST,
            "dataObj": response,
            "context": $scope,
            "onPaginate" : onPaginate
          }, function() {
            vm.isLoading = false;
          });
        }, function errorCallback() {
          GridService.renderGrid(GridConstants.CASE_REPORT_LIST, [], function(){
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
