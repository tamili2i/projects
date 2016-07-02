(function() {
    "use strict";

    angular
        .module("immiApp.workflow")
        .service("WorkflowDataService", WorkflowDataService);

    /**
     * @ngdoc Injector
     * @name WorkflowDataService
     * @private
     * @module immiApp.workflow
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    WorkflowDataService.$inject = [
      "$q",
      "$timeout",
      "HTTPFactory",
      "WorkflowGridConfig",
      "StepsGridConfig"
    ];

    /**
     * @ngdoc Service
     * @name WorkflowDataService
     * @module immiApp.workflow
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function WorkflowDataService($q, $timeout, HTTPFactory, WorkflowGridConfig, StepsGridConfig) {
      var _self = this;

      /**
       * @ngdoc function
       * @name getWorkflowList
       * @param {object} queryParam
       * @description
       * Gets list of available workflows
       */
      _self.getWorkflowList = function(queryParam, party_id){
        return HTTPFactory.call({
          url: "/workflow/workflow/getWorkflowByPartyId/"+party_id,
          method: "GET",
          params: queryParam
        });
      };

      /**
       * @ngdoc function
       * @name saveWorkflow
       * @param {object} workflow
       * @description
       * Saves new workflow
       */
      _self.saveWorkflow = function(workflow){
        return HTTPFactory.call({
          url: "/workflow/workflow",
          method: "POST",
          data: workflow
        });
       };

       /**
        * @ngdoc function
        * @name getStepsList
        * @param {object} queryParam
        * @description
        * Gets list of available workflows
        */
       _self.getStepsList = function(queryParam, party_id){
         return HTTPFactory.call({
           url: "/workflow/workflowStepsMaster/getWorkflowStepsMasterByPartyId/"+ party_id,
           method: "GET",
           params: queryParam
         });
       };

       /**
        * @ngdoc function
        * @name saveSteps
        * @param {object} step
        * @description
        * Creates new step
        */
       _self.saveSteps = function(step){
         return HTTPFactory.call({
           url: "/workflow/workflowStepsMaster",
           method: "POST",
           data: step
         });
       };

       /**
        * @ngdoc function
        * @name getUserRoles
        * @description
        * Gets list of user roles
        */
       _self.getUserRoles = function(queryParam){
         return HTTPFactory.call({
           url: "/user/access-roles/showAccessRoles",
           method: "GET",
           params: queryParam
         });
       };

       /**
        * @ngdoc function
        * @name createAssociation
        * @description
        * Creates mapping between steps and workflow
        */
       _self.createAssociation = function(association){
         return HTTPFactory.call({
           url: "/workflow/workflowAssociation",
           method: "POST",
           data: association
         });
       };

       /**
        * @ngdoc function
        * @name getWorkflows
        * @description
        * Gets list of workflows
        */
       _self.getWorkflows = function(queryParam){
         return HTTPFactory.call({
           url: "/workflow/workflowList",
           method: "GET",
           params: queryParam
         });
       };

       /**
        * @ngdoc function
        * @name getWorkflowSteps
        * @description
        * Gets list of workflow steps
        */
       _self.getWorkflowSteps = function(queryParam){
         return HTTPFactory.call({
           url: "/workflow/workflowStepsList",
           method: "GET",
           params:queryParam
         });
       };

       /**
        * @ngdoc function
        * @name getTasks
        * @description
        * Gets list of tasks
        */
       _self.getTasks = function(queryParam){
         return HTTPFactory.call({
           url: "/workflow/tasksList",
           method: "GET",
           params:queryParam
         });
       };

       /**
        * @ngdoc function
        * @name getWorkflow
        * @description
        * Gets workflow details
        */
       _self.getWorkflow = function(workflow_id) {
         return HTTPFactory.call({
           url: "/workflow/workflow/getWorkflowById/"+workflow_id,
           method: "GET"
         });
       };

       /**
        * @ngdoc function
        * @name getStep
        * @description
        * Gets step details
        */
       _self.getStep = function(step_id) {
         return HTTPFactory.call({
           url: "/workflow/workflowStepsMaster/getWorkflowStepsMasterById/"+step_id ,
           method: "GET"
         });
       };

       /**
        * @ngdoc function
        * @name deleteWorkflowSteps
        * @param {number} id
        * @description
        * Deletes workflow steps
        */
       _self.deleteWorkflowSteps = function(id) {
         return HTTPFactory.call({
           url: "/workflow/workflowSteps/deleteWorkflowStepsById/"+id ,
           method: "POST"
         });
       };
       /**
        * @ngdoc function
        * @name getNotifications
        * @description
        * Gets Notifications for logged in user
        */
       _self.getNotifications = function(party_id) {
         return HTTPFactory.call({
           url: "/workflow/getWorkflowTodolistByPartyId/"+party_id,
           method: "GET"
         })
       };
    }
})();
