(function() {
  "use strict";

  angular
    .module("immiApp.corporation")
    .controller("CorporationListController", CorporationListController);

  /**
   * @ngdoc Injector
   * @name CorporationListController
   * @private
   * @module ModuleName
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  CorporationListController.$inject = [
    "$scope",
    "$location",
    "$state",
    "CorporationService",
    "GridConstants",
    "GridService",
    "Session"
  ];

  /**
   * @ngdoc Controller
   * @name CorporationListController
   * @module ModuleName
   * @requires
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  function CorporationListController($scope, $location, $state, CorporationService, GridConstants, GridService, Session) {
    var vm = this;

    vm.corporationForms = [];
    vm.isLoading = true;
    vm.gridName = GridConstants.CORPORATION_LIST;

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
      vm.getCorporationList();
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
     * @name getCorporationList
     * @param {function} successCallback
     * @param {function} errorCallback
     * @description
     * Gets list of corporationForms
     *
     */
    vm.getCorporationList = function() {
      vm.isLoading = true;
      var queryParam = constructQueryParam();

      CorporationService.getCorporationList(queryParam, function successCallback(response) {
        GridService.renderGridWithPagination({
          "gridId": GridConstants.CORPORATION_LIST,
          "dataObj": response,
          "context": $scope,
          "onPaginate": onPaginate
        }, function() {
          vm.isLoading = false;
          vm.access_type = Session.getAccessType();
        });
      }, function errorCallback() {
        GridService.renderGrid(GridConstants.CORPORATION_LIST, [], function() {
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
