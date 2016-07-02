(function() {
    "use strict";

    /**
     * @ngdoc Config
     * @name SystemConfig
     * @module immiApp.PcAdministration
     * @description
     *
     *
     * @author Ideas2IT Technologies
     * @copyright
     */
    angular
        .module("immiApp.PcAdministration")
        .config(config);

    config.$inject = [
        "$stateProvider",
        "$urlRouterProvider",
        "$locationProvider"
    ];

    function config($stateProvider, $urlRouterProvider, $locationProvider) {
      $stateProvider
              .state("home.programs", {
                  url: "/programs",
                  templateUrl: "app/PcAdministration/views/program-case-list.html",
                  controller: "ProgramCaseListController",
                  controllerAs: "pcCtrl",
                  ncyBreadcrumb: {
                    label: "Programs"
                  }
              })
              .state("home.programsForm", {
                  url: "/programs/:id",
                  templateUrl: "app/PcAdministration/views/create-program-case.html",
                  controller: "ProgramCaseFormController",
                  controllerAs: "createPcCtrl",
                  ncyBreadcrumb: {
                    label: "{{state}}",
                    parent:"home.programs"
                  },
                  resolve: {
                    "ProgramCase": ["$q", "$stateParams", "ProgramCaseService", "$state", function($q, $stateParams, ProgramCaseService, $state){
                      var defer = $q.defer();
                      if (!_.isEmpty($stateParams.id)) {
                        var programCase = ProgramCaseService.getProgramCase($stateParams.id);
                        programCase.then(function success(response) {
                          defer.resolve(response.data);
                        }, function error(err) {
                          //if no program case found, then it should be 404
                          $state.go("landing.404");
                        });
                      } else {
                        defer.resolve({});
                      }
                      return defer.promise;
                    }],
                    "FormTemplate": ["$q", "ProgramCaseService", function($q, ProgramCaseService) {
                      var defer = $q.defer();
                      $q.when(ProgramCaseService.getFormTemplateListQ()).then(function(response) {
                        defer.resolve(response.data);
                      });
                      return defer.promise;
                    }],
                    "DocumentChecklist": ["$q", "ProgramCaseService", function($q, ProgramCaseService) {
                      var defer = $q.defer();
                      $q.when(ProgramCaseService.getDocumentChecklistQ()).then(function(response) {
                        defer.resolve(response.data);
                      });
                      return defer.promise;
                    }],
                    "IntakeForm": ["$q", "ProgramCaseService", function($q, ProgramCaseService) {
                      var defer = $q.defer();
                      $q.when(ProgramCaseService.getIntakeFormlistQ()).then(function(response) {
                        defer.resolve(response.data);
                      });
                      return defer.promise;
                    }]
                  }
              })
              .state("home.programsView", {
                  url: "/programs/view/:id",
                  templateUrl: "app/PcAdministration/views/view-program-case.html",
                  controller: "ProgramCaseViewController",
                  controllerAs: "prmCsViCtrl",
                  ncyBreadcrumb: {
                    label: "View",
                    parent:"home.programs"
                  },
                  resolve: {
                    "ProgramCase": ["$q", "$stateParams", "ProgramCaseService", "$state", function($q, $stateParams, ProgramCaseService, $state){
                      var defer = $q.defer();
                      if (!_.isEmpty($stateParams.id)) {
                        var programCase = ProgramCaseService.getProgramCase($stateParams.id);
                        programCase.then(function success(response) {
                          defer.resolve(response.data);
                        }, function error(err) {
                          //if no program case found, then it should be 404
                          $state.go("landing.404");
                        });
                      } else {
                        defer.resolve({});
                      }
                      return defer.promise;
                    }],
                    "FormTemplate": ["$q", "ProgramCaseService", function($q, ProgramCaseService) {
                      var defer = $q.defer();
                      $q.when(ProgramCaseService.getFormTemplateListQ()).then(function(response) {
                        defer.resolve(response.data);
                      });
                      return defer.promise;
                    }],
                    "DocumentChecklist": ["$q", "ProgramCaseService", function($q, ProgramCaseService) {
                      var defer = $q.defer();
                      $q.when(ProgramCaseService.getDocumentChecklistQ()).then(function(response) {
                        defer.resolve(response.data);
                      });
                      return defer.promise;
                    }],
                    "IntakeForm": ["$q", "ProgramCaseService", function($q, ProgramCaseService) {
                      var defer = $q.defer();
                      $q.when(ProgramCaseService.getIntakeFormlistQ()).then(function(response) {
                        defer.resolve(response.data);
                      });
                      return defer.promise;
                    }]
                  }
              })
              .state("home.formtemplate", {
                  url: "/formtemplate",
                  templateUrl: "app/PcAdministration/views/form-template-list.html",
                  controller: "FormTemplateListController",
                  controllerAs: "formTemplateListCtrl",
                  ncyBreadcrumb: {
                    label: "Form Template"
                  }
              })
              .state("home.formtemplate.form", {
                  url: "/:id",
                  templateUrl: "app/PcAdministration/views/create-form-template.html",
                  controller: "FormTemplateController",
                  controllerAs: "formTemplateCtrl",
                  ncyBreadcrumb: {
                    label: "{{state}}"
                  },
                  resolve: {
                    "FormTemplate" :["$q", "$state", "$stateParams", "ProgramCaseService", function($q, $state, $stateParams, ProgramCaseService){
                      var defer = $q.defer();
                      if (!_.isEmpty($stateParams.id)) {
                        var formTemplate = ProgramCaseService.getFormTemplate($stateParams.id);
                        formTemplate.then(function success(response) {
                          defer.resolve(response.data);
                        }, function error(err) {
                          //if no form templates found, then it should be 404
                          $state.go("landing.404");
                        });
                      } else {
                        defer.resolve({});
                      }
                      return defer.promise;
                    }]
                  }
              })
              .state("home.formtemplate.view", {
                   url: "/view/:id",
                   templateUrl: "app/PcAdministration/views/view-form-template.html",
                   controller: "FormTemplateViewController",
                   controllerAs: "fTempViCtrl",
                   ncyBreadcrumb: {
                     label: "View"
                   },
                   resolve: {
                     "FormTemplate" :["$q", "$state", "$stateParams", "ProgramCaseService", function($q, $state, $stateParams, ProgramCaseService){
                       var defer = $q.defer();
                       if(!_.isEmpty($stateParams.id)) {
                         var formTemplate = ProgramCaseService.getFormTemplate($stateParams.id);
                         formTemplate.then(function success(response) {
                           defer.resolve(response.data);
                         }, function error(err) {
                           //if no form templates found, then it should be 404
                           $state.go("landing.404");
                         });
                       } else {
                         $state.go("landing.404");
                       }
                       return defer.promise;
                     }]
                   }

               })
              .state("home.documentChecklist", {
                  url: "/document-checklist",
                  templateUrl: "app/PcAdministration/views/document-checklist.html",
                  controller: "DocumentCheckListController",
                  controllerAs: "docChecklistCtrl",
                  ncyBreadcrumb: {
                    label: "Document Checklist"
                  }
              })
              .state("home.documentChecklist.form", {
                  url: "/:id",
                  templateUrl: "app/PcAdministration/views/partials/document-checklist-form.html",
                  controller: "DocumentCheckListFormController",
                  controllerAs: "docChecklistFormCtrl",
                  ncyBreadcrumb: {
                    label: "{{state}}"
                  },
                  resolve: {
                    "DocumentChecklist":["$q", "$state", "$stateParams", "ProgramCaseService", function($q, $state, $stateParams, ProgramCaseService){
                      var defer = $q.defer();
                      if (!_.isEmpty($stateParams.id)) {
                        var documentChecklist = ProgramCaseService.getDocumentChecklistInfo($stateParams.id);
                        documentChecklist.then(function success(response) {
                          defer.resolve(response.data);
                        }, function error(err) {
                          //if no document checklist found, then it should be 404
                          $state.go("landing.404");
                        });
                      } else {
                        defer.resolve({});
                      }
                      return defer.promise;
                    }]
                  }
              })
              .state("home.documentChecklist.view", {
                  url: "/view/:id",
                  templateUrl: "app/PcAdministration/views/partials/document-checklist-view.html",
                  controller: "DocumentCheckListViewController",
                  controllerAs: "docChecklistViewCtrl",
                  ncyBreadcrumb: {
                    label: "View"
                  },
                  resolve: {
                    "DocumentChecklist":["$q", "$state", "$stateParams", "ProgramCaseService", function($q, $state, $stateParams, ProgramCaseService){
                      var defer = $q.defer();
                      if (!_.isEmpty($stateParams.id)) {
                        var documentChecklist = ProgramCaseService.getDocumentChecklistInfo($stateParams.id);
                        documentChecklist.then(function success(response) {
                          defer.resolve(response.data);
                        }, function error(err) {
                          //if no document checklist found, then it should be 404
                          $state.go("landing.404");
                        });
                      } else {
                        defer.resolve({});
                      }
                      return defer.promise;
                    }]
                  }
              });

    }

})();
