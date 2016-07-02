(function() {
    "use strict";

    angular.module("immiApp.PcAdministration")
        .controller("FormTemplateListController", FormTemplateListController);

    /**
     * @ngdoc Injector
     * @name FormTemplateListController
     * @private
     * @module immiApp.PcAdministration
     * @description
     * Inject module that needs to be useful for Beneficiary Controller
     * @author Ideas2IT Technologies
     * @copyright
     */
    FormTemplateListController.$inject = [
        "$scope",
        "$location",
        "$state",
        "ProgramCaseService",
        "GridConstants",
        "GridService"
    ];

    /**
     * @ngdoc Controller
     * @name FormTemplateListController
     * @module immiApp.PcAdministration
     * @requires $log
     * @description
     *
     * FormTemplateListController
     *
     */
    /*jslint nomen: true*/
    /*global angular*/

    function FormTemplateListController($scope, $location, $state, ProgramCaseService, GridConstants, GridService) {
      var vm = this;

      vm.formtemplates = [];
      vm.isLoading = true;
      vm.gridName = GridConstants.FORM_TEMPLATE_LIST;

      /**
       * @ngdoc function
       * @name init
       * @description
       * Initializes the controller
       * with grid data
       *
       */
      function init(){
        vm.getFormTemplateList();
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
        vm.getFormTemplateList();
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
       * @name getFormTemplateList
       * @description
       * Gets list of intakeforms
       *
       */
      vm.getFormTemplateList = function(){
        vm.isLoading = true;
        var queryParam = constructQueryParam();
        ProgramCaseService.getFormTemplateList(queryParam, function successCallback(response) {
          GridService.renderGridWithPagination({
            "gridId": GridConstants.FORM_TEMPLATE_LIST,
            "dataObj": response,
            "context": $scope,
            "onPaginate" : onPaginate
          }, function() {
            vm.isLoading = false;
          });
        }, function errorCallback() {
          GridService.renderGrid(GridConstants.FORM_TEMPLATE_LIST, [], function(){
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
       * @name Update:FormTemplateList
       * @description
       * Gets list of updated Formtemplates
       */
      $scope.$on("Update:FormTemplateList", function(){
        vm.getFormTemplateList();
      });

      init();

    }

}());
