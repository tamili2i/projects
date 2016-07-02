(function() {
    "use strict";

    angular.module("immiApp.workflow")
        .controller("WorkflowListController", WorkflowListController);

    /**
     * @ngdoc Injector
     * @name WorkflowListController
     * @private
     * @module immiApp.workflow
     * @description
     * Inject module that needs to be useful for workflowlist Controller
     * @author Ideas2IT Technologies
     * @copyright
     */
    WorkflowListController.$inject = [
        "$scope",
        "$location",
        "$state",
        "WorkflowService",
        "GridConstants",
        "GridService",
        "Session",
        "Utils",
        "$timeout"
    ];

    /**
     * @ngdoc Controller
     * @name WorkflowListController
     * @module immiApp.workflow
     * @requires $log
     * @description
     *
     * WorkflowListController
     *
     */
    /*jslint nomen: true*/
    /*global angular*/

    function WorkflowListController($scope, $location, $state, WorkflowService, GridConstants, GridService, Session, Utils, $timeout) {
        var vm = this;

        vm.workflows = [];
        vm.isLoading = true;
        vm.isLoadingNotification = true;
        vm.gridName = GridConstants.WORKFLOW_LIST;

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
          vm.getWorkflowList();
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
         * @name getWorkflowList
         * @description
         * Gets list of workflows
         *
         */
        vm.getWorkflowList = function(callback){
          vm.isLoading = true;
          var queryParam = constructQueryParam();
          WorkflowService.getWorkflowList(queryParam, function successCallback(response) {
            GridService.renderGridWithPagination({
              "gridId": GridConstants.WORKFLOW_LIST,
              "dataObj": response,
              "context": $scope,
              "onPaginate" : onPaginate
            }, function() {
              vm.isLoading = false;
              vm.access_type = Session.getAccessType();
            });
          }, function errorCallback() {
            GridService.renderGrid(GridConstants.WORKFLOW_LIST, [], function(){
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
         * @name Update:workflowlist
         * @description
         * Updates workflow list when new workflow is created
         *
         */
        $scope.$on("Update:workflowlist", function(){
          vm.getWorkflowList();
        });

        /**
         * @ngdoc function
         * @name delete
         * @description
         * Deletes workflow
         *
         */
        $scope.delete = function(id) {
          WorkflowService.deleteWorkflow(id);
        };

        /**
         * @ngdoc function
         * @name getNotifications
         * @description
         * Gets Notifications for logged in user
         */
        vm.getNotifications = function() {
          WorkflowService.getNotifications(function callback(notifications) {
            console.log(notifications);
            if(notifications){
              _.each(notifications, function(notification, index) {
                notifications[index].date = Utils.timeSince(notification.WorkflowTodolist.updated_at);
              })
            }
            vm.notifications = notifications;
            vm.isLoadingNotification = false;
            $(".workflow-notification").css("height",$("#workflow-grid .panel-body").height());
          });
        };

        $(window).resize(function(){
          $(".workflow-notification").css("height",$("#workflow-grid .panel-body").height());
        });
        $(window).click(function(event) {
          if(event.target.id == "leftmenu-trigger"){
            $timeout(function(){
              $(".workflow-notification").css("height",$("#workflow-grid .panel-body").height());
            }, 1000);
          }
        })
        /**
         * @ngdoc function
         * @name init
         * @description
         * Initiates Workflow list controller
         *
         */
        function init(){
          vm.getWorkflowList();
          vm.getNotifications();
        }
        init();
    }

}());
