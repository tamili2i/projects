(function() {
    "use strict";

    angular
        .module("immiApp.workflow")
        .controller("StepAssociationController", StepAssociationController);

    /**
     * @ngdoc Injector
     * @name StepAssociationController
     * @private
     * @module immiApp.workflow
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    StepAssociationController.$inject = [
      "WorkflowService",
      "AccessRoles",
      "Workflows"
    ];

    /**
     * @ngdoc Controller
     * @name StepAssociationController
     * @module immiApp.workflow
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function StepAssociationController(WorkflowService, AccessRoles, Workflows) {
        var vm = this;

        vm.sourceRole = angular.copy(AccessRoles);
        //vm.destRole = angular.copy(AccessRoles);
        vm.workflows = Workflows;
        vm.association = {};

        /**
         * @ngdoc function
         * @name createAssociation
         * @description
         * Creates mapping between steps and workflow
         */
        vm.createAssociation = function(associationForm) {
          WorkflowService.createAssociation(vm.association, function callback(response){

          });
        };

        /**
         * @ngdoc function
         * @name getStepsAndTask
         * @description
         * Gets task and workflow steps after selecting workflow
         */
        vm.getStepsAndTask = function(workflow_id) {
          vm.getWorkflowSteps(workflow_id);
          vm.getWorkflowTasks(workflow_id);
        };

        /**
         * @ngdoc function
         * @name getWorkflowSteps
         * @description
         * Gets workflow steps based on workflow
         */
        vm.getWorkflowSteps = function(workflow_id) {
          WorkflowService.getWorkflowSteps({"workflow_id": workflow_id}, function(response){
            vm.workflowSteps = response;
          });
        };

        /**
         * @ngdoc function
         * @name getWorkflowTasks
         * @description
         * Gets task list based on workflow
         */
        vm.getWorkflowTasks = function(workflow_id) {
          WorkflowService.getTasks({"workflow_id": workflow_id}, function(response){
            vm.tasks = response;
          });
        };

        /**
         * @ngdoc function
         * @name filterRoles
         * @description
         * Filter roles for destination role based on source role
         */
        vm.filterRoles = function(role_id) {
          vm.destRole = angular.copy(AccessRoles);
          if(vm.association.destination_role_id && vm.association.destination_role_id == role_id) {
            vm.association.destination_role_id = "";
          }
          _.each(AccessRoles,function(accessRole, index) {
            if(accessRole.id == role_id) {
              vm.destRole.splice(index,1);
            }
          })
        };
    }
})();
