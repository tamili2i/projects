(function() {
  "use strict";

  angular
    .module("immiApp.lawfirm")
    .controller("LawfirmListController", LawfirmListController);

  /**
   * @ngdoc Injector
   * @name LawfirmListController
   * @private
   * @module ModuleName
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  LawfirmListController.$inject = [
    "$scope",
    "$location",
    "$state",
    "LawfirmService",
    "GridConstants",
    "GridService",
    "Session"
  ];

  /**
   * @ngdoc Controller
   * @name LawfirmListController
   * @module ModuleName
   * @requires
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  function LawfirmListController($scope, $location, $state, LawfirmService, GridConstants, GridService, Session) {
    var vm = this;

    vm.lawfirmForms = [];
    vm.isLoading = true;
    vm.gridName = GridConstants.LAWFIRM_LIST;

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
      vm.getLawfirmList();
    };

    var constructQueryParam = function() {
      var qParam = $location.search(),
        queryParam = {};

      if (qParam.page) {
        queryParam.page = qParam.page;
      }
      queryParam.party_id = Session.getPartyId();

      return queryParam;
    };

    /**
     * @ngdoc function
     * @name getLawfirmList
     * @param {function} successCallback
     * @param {function} errorCallback
     * @description
     * Gets list of lawfirmForms and initiates grid render
     *
     */
    vm.getLawfirmList = function() {
        vm.isLoading = true;
        var queryParam = constructQueryParam();
        LawfirmService.getLawfirmList(queryParam, function successCallback(response) {
          GridService.renderGridWithPagination({
            "gridId": GridConstants.LAWFIRM_LIST,
            "dataObj": response,
            "context": $scope,
            "onPaginate" : onPaginate
          }, function() {
            vm.isLoading = false;
            vm.access_type = Session.getAccessType();
          });
        }, function errorCallback() {
          GridService.renderGrid(GridConstants.LAWFIRM_LIST, [], function(){
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
