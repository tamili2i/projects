(function() {
  "use strict";


  angular.module("immiApp.beneficiary")
    .controller("BeneficiaryListController", BeneficiaryListController);

  /**
   * @ngdoc Injector
   * @name BeneficiaryListController
   * @private
   * @module immiApp.beneficiary
   * @description
   * Inject module that needs to be useful for Beneficiary Controller
   * @author Ideas2IT Technologies
   * @copyright
   */
  BeneficiaryListController.$inject = [
    "$scope",
    "$location",
    "$state",
    "$theme",
    "GridConstants",
    "GridService",
    "BeneficiaryDataService",
    "BeneficiaryService",
    "Session"
  ];

  /**
   * @ngdoc BeneficiaryListController
   * @name BeneficiaryListController
   * @module immiApp.beneficiary
   * @requires $log
   * @description
   *
   * BeneficiaryListController
   *
   */
  /*jslint nomen: true*/
  /*global angular*/

  function BeneficiaryListController($scope, $location, $state, $theme, GridConstants, GridService, BeneficiaryDataService, BeneficiaryService, Session) {
    var vm = this;

    vm.beneficiaries = [];
    vm.isLoading = true;
    vm.gridName = GridConstants.BENEFICIARY_LIST;

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
      getBeneficiaryList();
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
      getBeneficiaryList(searchObj);
    });

    /**
     * @ngdoc function
     * @name getBeneficiaryList
     * @description
     * Gets list of beneficiaries
     *
     */
    function getBeneficiaryList(searchObj) {
      vm.isLoading = true;
      var queryParam = constructQueryParam(searchObj);
      BeneficiaryService.getBeneficiaryList(angular.copy(queryParam), function successCallback(response) {
        GridService.renderGridWithPagination({
          "gridId": GridConstants.BENEFICIARY_LIST,
          "dataObj": response,
          "context": $scope,
          "onPaginate" : onPaginate
        }, function() {
          vm.isLoading = false;
          vm.access_type = Session.getAccessType();
        });
      }, function errorCallback() {
        GridService.renderGrid(GridConstants.BENEFICIARY_LIST, [], function(){
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
      if ($theme.get("leftbarCollapsed")) {
        $theme.set("leftbarCollapsed", false);
      }
      getBeneficiaryList();
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
