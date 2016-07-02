(function() {
  "use strict";


  angular.module("immiApp.caseManagement")
    .controller("CaseListController", CaseListController);

  /**
   * @ngdoc Injector
   * @name CaseListController
   * @private
   * @module immiApp.caseManagement
   * @description
   * Inject module that needs to be useful for Beneficiary Controller
   * @author Ideas2IT Technologies
   * @copyright
   */
  CaseListController.$inject = [
    "$scope",
    "$location",
    "$state",
    "$theme",
    "GridConstants",
    "GridService",
    "CaseService",
    "Session",
  ];

  /**
   * @ngdoc Controller
   * @name CaseListController
   * @module immiApp.caseManagement
   * @requires $log
   * @description
   *
   * BeneficiaryListController
   *
   */
  /*jslint nomen: true*/
  /*global angular*/

  function CaseListController($scope, $location, $state, $theme, GridConstants, GridService,  CaseService, Session) {
    var vm = this;

    vm.beneficiaries = [];
    vm.isLoading = true;
    vm.gridName = GridConstants.CASE_LIST;

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
      var qParam = $location.search();
      qParam.page = pageNo;
      $location.search(qParam);
      getCaseList();
    };

    var constructQueryParam = function(searchObj) {
      var qParam = $location.search(),
        queryParam = {};
      if(searchObj){
        qParam = searchObj;
      }
      //if (qParam.page) {
      //  queryParam.page = qParam.page;
      //}
      return qParam;
    };

    /**
     * @ngdoc event
     * @name event, searchObj
     * @description
     * Triggered from search state, to reload
     * data based on search crietia.
     *
     */
    $scope.$on("search", function(evt, searchObj) {
      getCaseList(searchObj);
    });

    /**
     * @ngdoc function
     * @name getCaseList
     * @description
     * Gets list of beneficiaries
     *
     */
    function getCaseList(searchObj) {
      vm.isLoading = true;
      var queryParam = constructQueryParam(searchObj);
      CaseService.getCaseList(function successCallback(response) {
        GridService.renderGridWithPagination({
          "gridId": GridConstants.CASE_LIST,
          "dataObj": response,
          "context": $scope,
          "onPaginate" : onPaginate
        }, function() {
          vm.isLoading = false;
          vm.access_type = Session.getAccessType();
        });
      }, function errorCallback() {
        GridService.renderGrid(GridConstants.CASE_LIST, [], function(){
            vm.isLoading = false;
        });
      });

    };

    /**
     * @ngdoc function
     * @name init
     * @description
     * Initiates Beneficiary List
     *
     */
    var init = function() {
      getCaseList();
    };
    init();

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

}());
