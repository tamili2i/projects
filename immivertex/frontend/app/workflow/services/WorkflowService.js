(function() {
    "use strict";

    angular
        .module("immiApp.workflow")
        .service("WorkflowService", WorkflowService);

    /**
     * @ngdoc Injector
     * @name WorkflowService
     * @private
     * @module immiApp.workflow
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    WorkflowService.$inject = [
      "WorkflowDataService",
      "ToasterService",
      "Session",
      "$state",
      "StepsGridConfig"
    ];

    /**
     * @ngdoc Service
     * @name WorkflowService
     * @module immiApp.workflow
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function WorkflowService(WorkflowDataService, ToasterService, Session, $state, StepsGridConfig) {
        var _self = this;

        /**
         * @ngdoc function
         * @name getWorkflowList
         * @param {object} queryParam
         * @param {function} successCallback
         * @param {function} errorCallback
         * @description
         * Gets list of available workflows
         */
        _self.getWorkflowList = function(queryParam, successCallback, errorCallback) {
          var party_id = Session.getPartyId();
          var workflows = WorkflowDataService.getWorkflowList(queryParam, party_id);
          workflows.then(function(response) {
            successCallback(response.data);
          }, function(response) {
            errorCallback();
          });
        };

        /**
         * @ngdoc function
         * @name saveWorkflow
         * @param {object} workflow
         * @param {function} callback
         * @description
         * Saves new Workflow
         */
        _self.saveWorkflow = function(workflow, callback) {
          workflow.party_id = Session.getPartyId();
          workflow.created_by = Session.getPartyId();
          workflow.updated_by = Session.getPartyId();
          var workflow = WorkflowDataService.saveWorkflow(workflow);
          workflow.then(function(response) {
            callback(response.data);
            $state.go("home.workflows");
            ToasterService.toastSuccess("Workflow created successfully", "Success");
          }, function(response) {
            ToasterService.toastError("Something went wrong", "Error");
          });
        };

        /**
         * @ngdoc function
         * @name setControllerContext
         * @param srcContext
         * @description
         * Sets scope of controller in grid
         */
        _self.setControllerContext = function(srcContext){
          StepsGridConfig.setControllerContext(srcContext);
        };

        /**
         * @ngdoc function
         * @name deleteWorkflowSteps
         * @param {number} id
         * @description
         * Deletes workflow steps
         */
        _self.deleteWorkflowSteps = function(id, callback) {
          var deleteStep = WorkflowDataService.deleteWorkflowSteps(id);
          deleteStep.then(function(response) {
            ToasterService.toastSuccess("Workflow deleted successfully", "Success");
            callback();
          }, function(response) {
            ToasterService.toastError("Workflow deletion failed", "Error");
          });
        };

        /**
         * @ngdoc function
         * @name getStepsList
         * @param {object} workflow
         * @param {function} successCallback
         * @param {function} errorCallback
         * @description
         * Gets list of steps
         */
        _self.getStepsList = function(queryParam, successCallback, errorCallback) {
          var party_id = Session.getPartyId();
          var steps = WorkflowDataService.getStepsList(queryParam, party_id);
          steps.then(function(response) {
            successCallback(response.data);
          }, function(response) {
            errorCallback();
          });
        };

        /**
         * @ngdoc function
         * @name saveSteps
         * @param {object} workflow
         * @param {function} callback
         * @description
         * Saves new Workflow
         */
        _self.saveSteps = function(step, callback) {
          step.party_id = Session.getPartyId();
          step.created_by = Session.getPartyId();
          step.updated_by = Session.getPartyId();
          var step = WorkflowDataService.saveSteps(step);
          step.then(function(response) {
            callback(response.data);
            $state.go("home.steps");
            ToasterService.toastSuccess("Step created successfully", "Success");
          }, function(response) {
            ToasterService.toastError("Something went wrong", "Error");
          });
        };

        /**
         * @ngdoc function
         * @name getUserRoles
         * @description
         * Gets all user roles
         */
        _self.getUserRoles = function() {
          return WorkflowDataService.getUserRoles({"code": Session.getPartyType()});
        };

        /**
         * @ngdoc function
         * @name createAssociation
         * @description
         * Creates mapping between steps and workflow
         */
        _self.createAssociation = function(association, callback) {
          association.party_id = Session.getPartyId();
          association.created_by = Session.getPartyId();
          association.updated_by = Session.getPartyId();
          var association = WorkflowDataService.createAssociation(association);
          association.then(function(response) {
            ToasterService.toastSuccess("Association created successfully", "Success");
            callback(response);
            $state.go("home.steps");
          }, function(response) {
            ToasterService.toastError("Something went wrong", "Error");
          });
        };

        /**
         * @ngdoc function
         * @name getWorkflows
         * @description
         * Gets all workflows
         */
        _self.getWorkflows = function() {
          var queryParam = {"party_id": Session.getPartyId()};
          return WorkflowDataService.getWorkflows(queryParam);
        };

        /**
         * @ngdoc function
         * @name getWorkflowSteps
         * @description
         * Gets all workflow steps
         */
        _self.getWorkflowSteps = function(queryParam, callback) {
          queryParam.party_id = Session.getPartyId();
          var steps = WorkflowDataService.getWorkflowSteps(queryParam);
          steps.then(function(response) {
            callback(response.data);
          }, function(response) {
            ToasterService.toastError("In getting steps", "Error");
          });
        };

        /**
         * @ngdoc function
         * @name getTasks
         * @description
         * Gets all tasks
         */
        _self.getTasks = function(queryParam, callback) {
          var tasks = WorkflowDataService.getTasks(queryParam);
          tasks.then(function(response) {
            callback(response.data)
          }, function(response) {
            ToasterService.toastError("In getting tasks", "Error")
          })
        };

        /**
         * @ngdoc function
         * @name getTasks
         * @description
         * Gets workflow details
         */
        _self.getWorkflow = function(workflow_id) {
          return WorkflowDataService.getWorkflow(workflow_id);
        };

        /**
         * @ngdoc function
         * @name getTasks
         * @description
         * Gets step details
         */
        _self.getStep = function(step_id) {
          return WorkflowDataService.getStep(step_id);
        };

        /**
         * @ngdoc function
         * @name getNotifications
         * @description
         * Gets Notifications for logged in user
         */
        _self.getNotifications = function(callback) {
          var party_id = Session.getPartyId();
          var notifications = WorkflowDataService.getNotifications(party_id);
          notifications.then(function(response) {
            callback(response.data);
          }, function(response) {
            ToasterService.toastError("In Fetching Notifications", "Error");
          })
        };
   }
})();
