(function() {
    "use strict";

    angular.module("immiApp.workflow")
        .controller("StepsListController", StepsListController);

    /**
     * @ngdoc Injector
     * @name StepsListController
     * @private
     * @module immiApp.workflow
     * @description
     * Inject module that needs to be useful for StepsListController
     * @author Ideas2IT Technologies
     * @copyright
     */
    StepsListController.$inject = [
        "$scope",
        "$location",
        "$state",
        "WorkflowService",
        "GridConstants",
        "GridService",
        "Session"
    ];

    /**
     * @ngdoc Controller
     * @name StepsListController
     * @module immiApp.workflow
     * @requires $log
     * @description
     *
     * StepsListController
     *
     */
    /*jslint nomen: true*/
    /*global angular*/

    function StepsListController($scope, $location, $state, WorkflowService, GridConstants, GridService, Session) {
        var vm = this;

        vm.workflows = [];
        vm.isLoading = true;
        vm.gridName = GridConstants.STEP_LIST;

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
          vm.getStepsList();
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
         * @name getStepsList
         * @description
         * Gets list of steps
         *
         */
        vm.getStepsList = function(){
          vm.isLoading = true;
          var queryParam = constructQueryParam();
          WorkflowService.getStepsList(queryParam, function successCallback(response) {
            GridService.renderGridWithPagination({
              "gridId": GridConstants.STEP_LIST,
              "dataObj": response,
              "context": $scope,
              "onPaginate" : onPaginate
            }, function() {
              vm.isLoading = false;
              vm.access_type = Session.getAccessType();
            });
          }, function errorCallback() {
            GridService.renderGrid(GridConstants.STEP_LIST, [], function(){
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
         * @name Update:steps
         * @description
         * Updates step list when new step is created
         *
         */
        $scope.$on("Update:steps", function(){
          vm.getStepsList();
        });

        /**
         * @ngdoc function
         * @name delete
         * @description
         * Deletes workflow step
         *
         */
        $scope.delete = function(id) {
          WorkflowService.deleteWorkflowSteps(id, function(){
            vm.getStepsList();
          });
        };

        /**
         * @ngdoc function
         * @name init
         * @description
         * Initiates step list controller
         *
         */
        function init(){
          vm.getStepsList();
          WorkflowService.setControllerContext($scope);
        }
        init();
    }

}());
