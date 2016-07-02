(function() {
    "use strict";

    angular
        .module("immiApp.workflow")
        .controller("WorkflowFormController", WorkflowFormController);

    /**
     * @ngdoc Injector
     * @name WorkflowFormController
     * @private
     * @module immiApp.workflow
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    WorkflowFormController.$inject = [
      "$scope",
      "WorkflowService",
      "$location",
      "Session"
    ];

    /**
     * @ngdoc Controller
     * @name WorkflowFormController
     * @module immiApp.workflow
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function WorkflowFormController($scope, WorkflowService, $location, Session) {
        var vm = this;

        vm.workflow = {};
        /**
         * @ngdoc function
         * @name loadFormContainer
         * @description
         * Initiate form container with animation
         *
         */
        var loadFormContainer = function() {
          $(".create-container").collapse("toggle");
         };

         /**
          * @ngdoc function
          * @name saveWorkflow
          * @description
          * Saves new workflow
          *
          */
         vm.saveWorkflow = function(workflowForm) {
           WorkflowService.saveWorkflow(vm.workflow, function callback(response){
             $scope.$emit('Update:workflowlist');
           });
         }

        /**
         * @ngdoc function
         * @name init
         * @description
         * Initiates workflow form controller
         *
         */
        function init() {
          loadFormContainer();
        }
        init();
    }
})();
