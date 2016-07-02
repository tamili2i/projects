(function() {
  "use strict";

  angular.module("immiApp.PcAdministration")
    .controller("DocumentCheckListController", DocumentCheckListController);

  /**
   * @ngdoc Injector
   * @name DocumentCheckListController
   * @private
   * @module immiApp.PcAdministration
   * @description
   * Inject module that needs to be useful for Beneficiary Controller
   * @author Ideas2IT Technologies
   * @copyright
   */
  DocumentCheckListController.$inject = [
    "$scope",
    "$location",
    "$state",
    "ProgramCaseService",
    "GridConstants",
    "GridService"
  ];

  /**
   * @ngdoc Controller
   * @name DocumentCheckListController
   * @module immiApp.PcAdministration
   * @requires $log
   * @description
   *
   * DocumentCheckListController
   *
   */
  /*jslint nomen: true*/
  /*global angular*/

  function DocumentCheckListController($scope, $location, $state, ProgramCaseService, GridConstants, GridService) {
    var vm = this;

    vm.documentChecklist = [];
    vm.isLoading = true;
    vm.gridName = GridConstants.DOCUMENT_CHECKLIST_LIST;

    /**
     * @ngdoc function
     * @name init
     * @description
     * Initializes the controller
     * with grid data
     *
     */
    function init(){
      vm.getDocumentCheckList();
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
      vm.getDocumentCheckList();
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
     * @name getDocumentCheckList
     * @description
     * Gets list of intakeforms
     *
     */
    vm.getDocumentCheckList = function(){
      vm.isLoading = true;
      var queryParam = constructQueryParam();
      ProgramCaseService.getDocumentCheckList(queryParam, function successCallback(response) {
        GridService.renderGridWithPagination({
          "gridId": GridConstants.DOCUMENT_CHECKLIST_LIST,
          "dataObj": response,
          "context": $scope,
          "onPaginate" : onPaginate
        }, function() {
          vm.isLoading = false;
        });
      }, function errorCallback() {
        GridService.renderGrid(GridConstants.DOCUMENT_CHECKLIST_LIST, [], function(){
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

    /**
     * @ngdoc event
     * @name Update:DocumentChecklist
     * @description
     * Gets updated document checklist list
     */
    $scope.$on("Update:DocumentChecklistList",function(){
      vm.getDocumentCheckList();
    });

    init();
  }

}());
