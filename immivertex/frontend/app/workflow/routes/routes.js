(function() {
    "use strict";

    /**
     * @ngdoc Config
     * @name config
     * @module immiApp.workflow
     * @description
     *
     *
     * @author Ideas2IT Technologies
     * @copyright
     */
    angular
        .module("immiApp.workflow")
        .config(config);

    config.$inject = [
        "$stateProvider",
        "$urlRouterProvider",
        "$locationProvider"
    ];

    function config($stateProvider, $urlRouterProvider, $locationProvider) {
      $stateProvider
      .state("home.workflows", {
          url: "/workflows",
          templateUrl: "app/workflow/views/workflow-list.html",
          controller: "WorkflowListController",
          controllerAs: "wflCtrl",
          ncyBreadcrumb: {
            label: "Workflows"
          }
      })
      .state("home.workflows.form", {
          url: "/:id",
          templateUrl: "app/workflow/views/workflow-form.html",
          controller: "WorkflowFormController",
          controllerAs: "workFormCtrl",
          ncyBreadcrumb: {
            label: "Create"
          }
      })
      .state("home.workflows.view", {
          url: "/view/:id",
          templateUrl: "app/workflow/views/workflow-view.html",
          controller: "WorkflowViewController",
          controllerAs: "workViCtrl",
          ncyBreadcrumb: {
            label: "View"
          },
          resolve: {
            "Workflow": ["$q", "WorkflowService", "$stateParams", "$state", function($q, WorkflowService, $stateParams, $state) {
              var defer = $q.defer();
              if(!_.isEmpty($stateParams.id)) {
                WorkflowService.getWorkflow($stateParams.id).then(function(response) {
                  defer.resolve(response.data);
                }, function(response) {
                  defer.resolve({});
                });
              } else {
                $state.go("landing.404");
              }
              return defer.promise;
            }]
          }
      })
      .state("home.steps", {
          url: "/steps",
          templateUrl: "app/workflow/views/steps-list.html",
          controller: "StepsListController",
          controllerAs: "steplCtrl",
          ncyBreadcrumb: {
            label: "Steps"
          }
      })
      .state("home.steps.form", {
          url: "/:id",
          templateUrl: "app/workflow/views/steps-form.html",
          controller: "StepFormController",
          controllerAs: "stepfCtrl",
          ncyBreadcrumb: {
            label: "Create"
          }
      })
      .state("home.steps.view", {
          url: "/view/:id",
          templateUrl: "app/workflow/views/steps-view.html",
          controller: "StepViewController",
          controllerAs: "stepViCtrl",
          ncyBreadcrumb: {
            label: "View"
          },
          resolve: {
            "Step": ["$q", "$stateParams", "$state", "WorkflowService", function($q, $stateParams, $state, WorkflowService) {
              var defer = $q.defer();
              if(!_.isEmpty($stateParams)) {
                WorkflowService.getStep($stateParams.id).then(function(response) {
                  defer.resolve(response.data);
                }, function(response) {
                  $state.go("landing.404");
                })
              } else {
                $state.go("landing.404");
              }
              return defer.promise;
            }]
          }
      })
      .state("home.stepsAssociation", {
          url: "/step-association",
          templateUrl: "app/workflow/views/step-association.html",
          controller: "StepAssociationController",
          controllerAs: "stepAscCtrl",
          ncyBreadcrumb: {
            label: "Association"
          },
          resolve: {
            "AccessRoles": ["$q", "WorkflowService", function($q, WorkflowService) {
              var defer = $q.defer();
              WorkflowService.getUserRoles().then(function(response){
                defer.resolve(response.data);
              }, function(response) {
                defer.resolve({});
              });
              return defer.promise;
            }],
            "Workflows": ["$q", "WorkflowService", function($q, WorkflowService) {
              var defer = $q.defer();
              WorkflowService.getWorkflows().then(function(response){
                defer.resolve(response.data);
              }, function(response) {
                defer.resolve({});
              });
              return defer.promise;
            }]
          }
      });

    }

})();
