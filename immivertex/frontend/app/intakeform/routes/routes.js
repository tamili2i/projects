(function() {
    "use strict";

    /**
     * @ngdoc Config
     * @name SystemConfig
     * @module immiApp.intakeform
     * @description
     *
     *
     * @author Ideas2IT Technologies
     * @copyright
     */
    angular
        .module("immiApp.intakeform")
        .config(config);

    config.$inject = [
        "$stateProvider",
        "$urlRouterProvider",
        "$locationProvider"
    ];

    function config($stateProvider, $urlRouterProvider, $locationProvider) {
      $stateProvider
              .state("home.attorney", {
                  url: "/attorney",
                  templateUrl: "app/intakeform/views/partials/attorney-intakeform.html",
                  controller: "AttorneyController",
                  controllerAs: "atrnyCtrl",
                  ncyBreadcrumb: {
                    label: "Attorney"
                  }
              })
              .state("home.attorneyView", {
                  url: "/attorney/view",
                  templateUrl: "app/intakeform/views/partials-views/attorney-intakeform-view.html",
                  controller: "AttorneyController",
                  controllerAs: "atrnyCtrl",
                  ncyBreadcrumb: {
                    label: "Attorney"
                  }
              })
              .state("home.dependent", {
                  url: "/dependent",
                  templateUrl: "app/intakeform/views/partials/dependent-derivativeform.html",
                  controller: "DependentDerivativeController",
                  controllerAs: "depnCtrl",
                  ncyBreadcrumb: {
                    label: "Dependent Derivative"
                  }
              })
              .state("home.dependentView", {
                  url: "/dependent/view",
                  templateUrl: "app/intakeform/views/partials-views/dependent-derivativeform-view.html",
                  controller: "DependentDerivativeController",
                  controllerAs: "depnCtrl",
                  ncyBreadcrumb: {
                    label: "Dependent Derivative"
                  }
              })
              .state("home.employer", {
                  url: "/employer",
                  templateUrl: "app/intakeform/views/employer-intakeForm.html",
                  controller: "EmployerIntakeformController",
                  controllerAs: "emplIntCtrl",
                  abstract: true,
                  ncyBreadcrumb: {
                    label: "Employer",
                    force:true
                  }
              })
              .state("home.employer.employment", {
                  url: "/employment",
                  templateUrl: "app/intakeform/views/partials/employer-intakefrom/employmentForm.html",
                  controller: "EmployerEmploymentController",
                  controllerAs: "emplErCtrl",
                  ncyBreadcrumb: {
                    label: "Employment"
                  }
              })
              .state("home.employer.i129h", {
                  url: "/i129h",
                  templateUrl: "app/intakeform/views/partials/employer-intakefrom/i129h-data.html",
                  controller: "I129hFormController",
                  controllerAs: "i129Ctrl",
                  ncyBreadcrumb: {
                    label: "I129h Data"
                  }
              })
              .state("home.employerView", {
                  url: "/employer/view",
                  templateUrl: "app/intakeform/views/employer-intakeForm.html",
                  controller: "EmployerEmploymentController",
                  controllerAs: "emplCtrl",
                  abstract: true,
                  ncyBreadcrumb: {
                    label: "Employer",
                    force:true
                  }
              })
              .state("home.employerView.employment", {
                  url: "/employment",
                  templateUrl: "app/intakeform/views/partials-views/employer-intakefrom/employmentForm-view.html",
                  controller: "EmployerEmploymentController",
                  controllerAs: "emplCtrl",
                  ncyBreadcrumb: {
                    label: "Employment"
                  }
              })
              .state("home.employerView.i129h", {
                  url: "/i129h",
                  templateUrl: "app/intakeform/views/partials-views/employer-intakefrom/i129h-data-view.html",
                  controller: "I129hFormController",
                  controllerAs: "i129Ctrl",
                  ncyBreadcrumb: {
                    label: "I129h Data"
                  }
              })
              .state("home.hr", {
                  url: "/hr",
                  templateUrl: "app/intakeform/views/partials/hr-intakeForm.html",
                  controller: "HrController",
                  controllerAs: "hrCtrl",
                  ncyBreadcrumb: {
                    label: "HR"
                  }
              })
              .state("home.hrView", {
                  url: "/hr/view",
                  templateUrl: "app/intakeform/views/partials-views/hr-intakeForm-view.html",
                  controller: "HrController",
                  controllerAs: "hrCtrl",
                  ncyBreadcrumb: {
                    label: "HR"
                  }
              })
              .state("home.petitioner", {
                  url: "/petitioner",
                  abstract: true,
                  templateUrl: "app/intakeform/views/petitioner-family-case.html",
                  controller: "PetitionerController",
                  controllerAs: "pCtrl",
                  ncyBreadcrumb: {
                    label: "Petitioner",
                    force: true
                  },
                  resolve: {
                    "Gender": ["$q", "MasterDataService", function($q, MasterDataService) {
                      var defer = $q.defer();
                      $q.when(MasterDataService.getPersonGender()).then(function(data) {
                        defer.resolve(data);
                      });
                      return defer.promise;
                    }],
                  "AddressTypes" : ["$q", "MasterDataService", function($q, MasterDataService) {
                    var defer = $q.defer();
                    $q.when(MasterDataService.getAddressTypes("beneficiary_address")).then(function(response){
                      defer.resolve(response.data);
                    });
                    return defer.promise;
                  }]
                },
              })
              .state("home.petitioner.general", {
                  url: "/general",
                  templateUrl: "app/intakeform/views/partials/petitioner-family/petitioner-general.html",
                  controller: "PetitionerGeneralController",
                  controllerAs: "pGenCtrl",
                  ncyBreadcrumb: {
                    label: "General"
                  }
              })
              .state("home.petitioner.address", {
                  url: "/address",
                  templateUrl: "app/intakeform/views/partials/petitioner-family/petitioner-address.html",
                  controller: "PetitionerAddressController",
                  controllerAs: "pAddrCtrl",
                  ncyBreadcrumb: {
                    label: "Address"
                  }
              })
              .state("home.petitioner.employment", {
                  url: "/employment",
                  templateUrl: "app/intakeform/views/partials/petitioner-family/petitioner-employment.html",
                  controller: "PetitionerEmploymentController",
                  controllerAs: "pEmpCtrl",
                  ncyBreadcrumb: {
                    label: "Employment"
                  }
              })
              .state("home.petitioner.history", {
                  url: "/history",
                  templateUrl: "app/intakeform/views/partials/petitioner-family/petitioner-history.html",
                  controller: "PetitionerHistoryController",
                  controllerAs: "pHisCtrl",
                  ncyBreadcrumb: {
                    label: "History"
                  }
              })
              .state("home.petitioner.question", {
                  url: "/question",
                  templateUrl: "app/intakeform/views/partials/petitioner-family/petitioner-question.html",
                  controller: "PetitionerQuestionController",
                  controllerAs: "pQusCtrl",
                  ncyBreadcrumb: {
                    label: "Questionnaire"
                  }
              })
              .state("home.petitioner.documents", {
                  url: "/documents",
                  templateUrl: "app/intakeform/views/partials/beneficiary-family/beneficiary-family-documents.html",
                  controller: "PetitionerDocumentController",
                  controllerAs: "docCtrl",
                  ncyBreadcrumb: {
                    label: "Documents"
                  }
              })
              .state("home.viewPetitioner", {
                  url: "/petitioner/view",
                  abstract: true,
                  templateUrl: "app/intakeform/views/petitioner-family-case.html",
                  controller: "PetitionerController",
                  controllerAs: "pCtrl",
                  ncyBreadcrumb: {
                    label: "Petitioner",
                    force: true
                  },
                  resolve: {
                    "Gender": ["$q", "MasterDataService", function($q, MasterDataService) {
                      var defer = $q.defer();
                      $q.when(MasterDataService.getPersonGender()).then(function(data) {
                        defer.resolve(data);
                      });
                      return defer.promise;
                    }],
                    "AddressTypes" : ["$q", "MasterDataService", function($q, MasterDataService) {
                      var defer = $q.defer();
                      $q.when(MasterDataService.getAddressTypes("beneficiary_address")).then(function(response){
                        defer.resolve(response.data);
                      });
                      return defer.promise;
                    }],
                  }
              })
              .state("home.viewPetitioner.general", {
                  url: "/general",
                  templateUrl: "app/intakeform/views/partials-views/petitioner-family/petitioner-general-view.html",
                  controller: "PetitionerGeneralController",
                  controllerAs: "pGenCtrl",
                  ncyBreadcrumb: {
                    label: "General"
                  }
              })
              .state("home.viewPetitioner.address", {
                  url: "/address",
                  templateUrl: "app/intakeform/views/partials-views/petitioner-family/petitioner-address-view.html",
                  controller: "PetitionerAddressController",
                  controllerAs: "pAddrCtrl",
                  ncyBreadcrumb: {
                    label: "Address"
                  }
              })
              .state("home.viewPetitioner.employment", {
                  url: "/employment",
                  templateUrl: "app/intakeform/views/partials-views/petitioner-family/petitioner-employment-view.html",
                  controller: "PetitionerEmploymentController",
                  controllerAs: "pEmpCtrl",
                  ncyBreadcrumb: {
                    label: "Employment"
                  }
              })
              .state("home.viewPetitioner.history", {
                  url: "/history",
                  templateUrl: "app/intakeform/views/partials-views/petitioner-family/petitioner-history-view.html",
                  controller: "PetitionerHistoryController",
                  controllerAs: "pHisCtrl",
                  ncyBreadcrumb: {
                    label: "History"
                  }
              })
              .state("home.viewPetitioner.question", {
                  url: "/question",
                  templateUrl: "app/intakeform/views/partials-views/petitioner-family/petitioner-question-view.html",
                  controller: "PetitionerQuestionController",
                  controllerAs: "pQusCtrl",
                  ncyBreadcrumb: {
                    label: "Questionnaire"
                  }
              })
              .state("home.viewPetitioner.documents", {
                  url: "/documents",
                  templateUrl: "app/intakeform/views/partials-views/petitioner-family/petitioner-family-documents-view.html",
                  controller: "PetitionerDocumentController",
                  controllerAs: "docCtrl",
                  ncyBreadcrumb: {
                    label: "Documents"
                  }
              })
              .state("home.interpreter", {
                  url: "/interpreter",
                  templateUrl: "app/intakeform/views/interpreter-statement-family.html",
                  controller: "InterpreterController",
                  controllerAs: "intrCtrl",
                  ncyBreadcrumb: {
                    label: "Interpreter"
                  }
              })
              .state("home.interpreterView", {
                  url: "/interpreter/view",
                  templateUrl: "app/intakeform/views/partials-views/interpreter-intakeform-view.html",
                  controller: "InterpreterController",
                  controllerAs: "intrCtrl",
                  ncyBreadcrumb: {
                    label: "Interpreter"
                  }
              })
              .state("home.attorneyFamily", {
                  url: "/attorney-family",
                  abstract: true,
                  templateUrl: "app/intakeform/views/partials/attorney-family/attorney-family-form.html",
                  controller: "AttorneyFamilyFormController",
                  controllerAs: "atfCtrl",
                  ncyBreadcrumb: {
                    label: "Attorney Family",
                    force: true
                  },
                  resolve: {
                    "AttorneyFamily" : function($q, $stateParams, MasterDataService){
                      var defer = $q.defer();
                      //TODO API call to get Attorney family general info
                      defer.resolve({});
                      return defer.promise;
                    }
                  }
              })
              .state("home.attorneyFamily.general", {
                  url: "/general",
                  templateUrl: "app/intakeform/views/partials/attorney-family/attorney-family-general.html",
                  controller: "AttorneyFamilyGeneralController",
                  controllerAs: "atfGenCtrl",
                  ncyBreadcrumb: {
                    label: "General"
                  }
              })
              .state("home.attorneyFamily.questionnaire", {
                  url: "/questionnaire",
                  templateUrl: "app/intakeform/views/partials/attorney-family/attorney-family-questionnaire.html",
                  controller: "AttorneyFamilyQuestionnaireController",
                  controllerAs: "atfQnCtrl",
                  ncyBreadcrumb: {
                    label: "Questionnaire"
                  }
              })

              .state("home.attorneyFamilyView", {
                  url: "/attorney-family/view",
                  abstract: true,
                  templateUrl: "app/intakeform/views/partials-views/attorney-family/attorney-family-form-view.html",
                  controller: "AttorneyFamilyFormController",
                  controllerAs: "atfCtrl",
                  ncyBreadcrumb: {
                    label: "Attorney Family",
                    force: true
                  },
                  resolve: {
                    "AttorneyFamily" : function($q, $stateParams, MasterDataService){
                      var defer = $q.defer();
                      //TODO Need to be redefined, Temporary Fix
                      defer.resolve({});
                      return defer.promise;
                    }
                  }
              })
              .state("home.attorneyFamilyView.general", {
                  url: "/general",
                  templateUrl: "app/intakeform/views/partials-views/attorney-family/attorney-family-general-view.html",
                  controller: "AttorneyFamilyGeneralController",
                  controllerAs: "atfGenCtrl",
                  ncyBreadcrumb: {
                    label: "General"
                  }
              })
              .state("home.attorneyFamilyView.questionnaire", {
                  url: "/questionnaire",
                  templateUrl: "app/intakeform/views/partials-views/attorney-family/attorney-family-questionnaire-view.html",
                  controller: "AttorneyFamilyQuestionnaireController",
                  controllerAs: "atfQnCtrl",
                  ncyBreadcrumb: {
                    label: "Questionnaire"
                  }
              })

              .state("home.beneficiaryFamily", {
                  url: "/beneficiary-family",
                  abstract: true,
                  templateUrl: "app/intakeform/views/partials/beneficiary-family/beneficiary-family-form.html",
                  controller: "BeneficiaryFamilyFormController",
                  controllerAs: "bffCtrl",
                  ncyBreadcrumb: {
                    label: "Beneficiary Family",
                    force: true
                  },
                  resolve: {
                    "BeneficiaryFamily": ["$q", "$state", "$stateParams",
                      function($q, $state, $stateParams) {
                      var defer = $q.defer();
                      //TODO Need to add get BeneficiaryFamily info API
                      defer.resolve({});
                      return defer.promise;
                    }],
                    "AddressTypes" : ["$q", "MasterDataService", function($q, MasterDataService) {
                      var defer = $q.defer();
                      $q.when(MasterDataService.getAddressTypes("beneficiary_address")).then(function(response){
                        defer.resolve(response.data);
                      });
                      return defer.promise;
                    }],
                    "Countries": ["$q", "MasterDataService", function($q, MasterDataService) {
                      var defer = $q.defer();
                      $q.when(MasterDataService.getCountries()).then(function(data) {
                        defer.resolve(data);
                      });
                      return defer.promise;
                    }],
                    "Title": ["$q", "MasterDataService", function($q, MasterDataService) {
                      var defer = $q.defer();
                      MasterDataService.getPersonTitles().then(function(data) {
                        defer.resolve(data);
                      });
                      return defer.promise;
                    }],
                    "Gender": ["$q", "MasterDataService", function($q, MasterDataService) {
                      var defer = $q.defer();
                      $q.when(MasterDataService.getPersonGender()).then(function(data) {
                        defer.resolve(data);
                      });
                      return defer.promise;
                    }],
                    "MaritalStatus": ["$q", "MasterDataService", function($q, MasterDataService) {
                      var defer = $q.defer();
                      MasterDataService.getMaritalStatusList().then(function(data) {
                        defer.resolve(data);
                      });
                      return defer.promise;
                    }],
                    "Citizen": ["$q", "MasterDataService", function($q, MasterDataService) {
                      var defer = $q.defer();
                      MasterDataService.getCitizenList().then(function(data) {
                        defer.resolve(data);
                      });
                      return defer.promise;
                    }],
                    "ImmigrationStatuses": ["$q", "MasterDataService", function($q, MasterDataService) {
                      var defer = $q.defer();
                      MasterDataService.getImmigrationStatuses().then(function(response) {
                        defer.resolve(response.data);
                      });
                      return defer.promise;
                    }],
                    "GraduationType": ["$q", "MasterDataService", function($q, MasterDataService) {
                      var defer = $q.defer();
                      $q.when(MasterDataService.getGraduationTypes()).then(function(response) {
                        defer.resolve(response.data);
                      });
                      return defer.promise;
                    }],
                    "Specializations": ["$q", "MasterDataService", function($q, MasterDataService) {
                      var defer = $q.defer();
                      $q.when(MasterDataService.getSpecializations()).then(function(response) {
                        defer.resolve(response.data);
                      });
                      return defer.promise;
                    }],
                    "EmploymentType": ["$q", "MasterDataService", function($q, MasterDataService) {
                      var defer = $q.defer();
                      $q.when(MasterDataService.getEmploymentTypes()).then(function(response) {
                        defer.resolve(response.data);
                      });
                      return defer.promise;
                    }]
                  }
              })
              .state("home.beneficiaryFamily.general", {
                  url: "/general",
                  templateUrl: "app/intakeform/views/partials/beneficiary-family/beneficiary-family-general.html",
                  controller: "BeneficiaryFamilyGeneralController",
                  controllerAs: "bfGenCtrl",
                  ncyBreadcrumb: {
                    label: "General"
                  },
                  resolve: {
                    "BeneficiaryFamily": ["$q", "$state", "$stateParams",
                      function($q, $state, $stateParams) {
                      var defer = $q.defer();
                      //TODO Need to add get BeneficiaryFamily info API
                      defer.resolve({});
                      return defer.promise;
                    }]
                  }
              })
              .state("home.beneficiaryFamily.address", {
                  url: "/address",
                  templateUrl: "app/intakeform/views/partials/beneficiary-family/beneficiary-family-address.html",
                  controller:"BeneficiaryFamilyAddressController",
                  controllerAs:"bfAddrCtrl",
                  ncyBreadcrumb: {
                    label: "Address"
                  },
                  resolve: {
                    "Addressess": ["$q", "$state", "$stateParams", function($q, $state, $stateParams, BeneficiaryService) {
                      var defer = $q.defer();
                      //TODO Need to add get BeneficiaryFamily Address info API
                      defer.resolve({});
                      return defer.promise;
                    }]
                  }
              })
              .state("home.beneficiaryFamily.documents", {
                  url: "/documents",
                  templateUrl: "app/intakeform/views/partials/beneficiary-family/beneficiary-family-documents.html",
                  controller: "BeneficiaryFamilyDocumentController",
                  controllerAs: "docCtrl",
                  ncyBreadcrumb: {
                    label: "Documents"
                  },
                  resolve: {
                    "DocumentSubTypes": ["$q", "MasterDataService", function($q, MasterDataService) {
                      var defer = $q.defer();
                      MasterDataService.getDocumentSubTypes("beneficiary").then(function(response) {
                        defer.resolve(response.data);
                      });
                      return defer.promise;
                    }]
                  }
              })
              .state("home.beneficiaryFamily.employment", {
                  url: "/employment",
                  templateUrl: "app/intakeform/views/partials/beneficiary-family/beneficiary-family-employment.html",
                  controller: "BeneficiaryFamilyEmploymentController",
                  controllerAs: "bfEmpCtrl",
                  ncyBreadcrumb: {
                    label: "Employment"
                  },
                  resolve: {
                    "Employment": ["$q", "$state", "$stateParams",
                      function($q, $state, $stateParams) {
                      var defer = $q.defer();
                      //TODO Need to add get BeneficiaryFamily employment info API
                      defer.resolve({});
                      return defer.promise;
                    }]
                  }
              })
              .state("home.beneficiaryFamily.history", {
                  url: "/history",
                  templateUrl: "app/intakeform/views/partials/beneficiary-family/beneficiary-family-history.html",
                  controller: "BeneficiaryFamilyHistoryController",
                  controllerAs: "bfHistCtrl",
                  ncyBreadcrumb: {
                    label: "History"
                  },
                  resolve: {
                    "MarriageHistory": ["$q", "$state", "$stateParams", function($q, $state, $stateParams, BeneficiaryService) {
                      var defer = $q.defer();
                      //TODO Need to add get BeneficiaryFamily MarriageHistory info API
                      defer.resolve({});
                      return defer.promise;
                    }],
                    "TripsHistory": ["$q", "$state", "$stateParams", function($q, $state, $stateParams, BeneficiaryService) {
                      var defer = $q.defer();
                      //TODO Need to add get BeneficiaryFamily TripsHistory info API
                      defer.resolve({});
                      return defer.promise;
                    }],
                    "Gender": ["$q", "MasterDataService", function($q, MasterDataService) {
                      var defer = $q.defer();
                      $q.when(MasterDataService.getPersonGender()).then(function(data) {
                        defer.resolve(data);
                      });
                      return defer.promise;
                    }],
                    "Countries": ["$q", "MasterDataService", function($q, MasterDataService) {
                      var defer = $q.defer();
                      $q.when(MasterDataService.getCountries()).then(function(data) {
                        defer.resolve(data);
                      });
                      return defer.promise;
                    }],
                    "TerminationTypes": ["$q", "MasterDataService", function($q, MasterDataService) {
                      var defer = $q.defer();
                      $q.when(MasterDataService.getMarriageTerminationTypes()).then(function(data) {
                        defer.resolve(data);
                      });
                      return defer.promise;
                    }]
                  }
              })
              .state("home.beneficiaryFamily.background", {
                  url: "/background",
                  templateUrl: "app/intakeform/views/partials/beneficiary-family/beneficiary-family-background.html",
                  ncyBreadcrumb: {
                    label: "Background"
                  },
                  resolve: {
                    "Background": ["$q", "$state", "$stateParams",
                      function($q, $state, $stateParams) {
                      var defer = $q.defer();
                      //TODO Need to add get BeneficiaryFamily Background info API
                      defer.resolve({});
                      return defer.promise;
                    }]
                  }
              })


              .state("home.beneficiaryFamilyView", {
                  url: "/beneficiary-family/view",
                  abstract: true,
                  templateUrl: "app/intakeform/views/partials-views/beneficiary-family/beneficiary-family-form-view.html",
                  controller: "BeneficiaryFamilyFormController",
                  controllerAs: "bffCtrl",
                  ncyBreadcrumb: {
                    label: "Beneficiary Family",
                    force: true
                  },
                  resolve: {
                    "BeneficiaryFamily": ["$q", "$state", "$stateParams",
                      function($q, $state, $stateParams) {
                      var defer = $q.defer();
                      //TODO Need to add get BeneficiaryFamily info API
                      defer.resolve({});
                      return defer.promise;
                    }],
                    "AddressTypes" : ["$q", "MasterDataService", function($q, MasterDataService) {
                      var defer = $q.defer();
                      $q.when(MasterDataService.getAddressTypes("beneficiary_address")).then(function(response){
                        defer.resolve(response.data);
                      });
                      return defer.promise;
                    }],
                    "Countries": ["$q", "MasterDataService", function($q, MasterDataService) {
                      var defer = $q.defer();
                      $q.when(MasterDataService.getCountries()).then(function(data) {
                        defer.resolve(data);
                      });
                      return defer.promise;
                    }],
                    "Title": ["$q", "MasterDataService", function($q, MasterDataService) {
                      var defer = $q.defer();
                      MasterDataService.getPersonTitles().then(function(data) {
                        defer.resolve(data);
                      });
                      return defer.promise;
                    }],
                    "Gender": ["$q", "MasterDataService", function($q, MasterDataService) {
                      var defer = $q.defer();
                      $q.when(MasterDataService.getPersonGender()).then(function(data) {
                        defer.resolve(data);
                      });
                      return defer.promise;
                    }],
                    "MaritalStatus": ["$q", "MasterDataService", function($q, MasterDataService) {
                      var defer = $q.defer();
                      MasterDataService.getMaritalStatusList().then(function(data) {
                        defer.resolve(data);
                      });
                      return defer.promise;
                    }],
                    "Citizen": ["$q", "MasterDataService", function($q, MasterDataService) {
                      var defer = $q.defer();
                      MasterDataService.getCitizenList().then(function(data) {
                        defer.resolve(data);
                      });
                      return defer.promise;
                    }],
                    "ImmigrationStatuses": ["$q", "MasterDataService", function($q, MasterDataService) {
                      var defer = $q.defer();
                      MasterDataService.getImmigrationStatuses().then(function(response) {
                        defer.resolve(response.data);
                      });
                      return defer.promise;
                    }],
                    "GraduationType": ["$q", "MasterDataService", function($q, MasterDataService) {
                      var defer = $q.defer();
                      $q.when(MasterDataService.getGraduationTypes()).then(function(response) {
                        defer.resolve(response.data);
                      });
                      return defer.promise;
                    }],
                    "Specializations": ["$q", "MasterDataService", function($q, MasterDataService) {
                      var defer = $q.defer();
                      $q.when(MasterDataService.getSpecializations()).then(function(response) {
                        defer.resolve(response.data);
                      });
                      return defer.promise;
                    }],
                    "EmploymentType": ["$q", "MasterDataService", function($q, MasterDataService) {
                      var defer = $q.defer();
                      $q.when(MasterDataService.getEmploymentTypes()).then(function(response) {
                        defer.resolve(response.data);
                      });
                      return defer.promise;
                    }]
                  }
              })
              .state("home.beneficiaryFamilyView.general", {
                  url: "/general",
                  templateUrl: "app/intakeform/views/partials-views/beneficiary-family/beneficiary-family-general-view.html",
                  controller: "BeneficiaryFamilyGeneralController",
                  controllerAs: "bfGenCtrl",
                  ncyBreadcrumb: {
                    label: "General"
                  },
                  resolve: {
                    "BeneficiaryFamily": ["$q", "$state", "$stateParams",
                      function($q, $state, $stateParams) {
                      var defer = $q.defer();
                      //TODO Need to add get BeneficiaryFamily info API
                      defer.resolve({});
                      return defer.promise;
                    }]
                  }
              })
              .state("home.beneficiaryFamilyView.address", {
                  url: "/address",
                  templateUrl: "app/intakeform/views/partials-views/beneficiary-family/beneficiary-family-address-view.html",
                  controller:"BeneficiaryFamilyAddressController",
                  controllerAs:"bfAddrCtrl",
                  ncyBreadcrumb: {
                    label: "Address"
                  },
                  resolve: {
                    "Addressess": ["$q", "$state", "$stateParams", function($q, $state, $stateParams, BeneficiaryService) {
                      var defer = $q.defer();
                      //TODO Need to add get BeneficiaryFamily Address info API
                      defer.resolve({});
                      return defer.promise;
                    }]
                  }
              })
              .state("home.beneficiaryFamilyView.employment", {
                  url: "/employment",
                  templateUrl: "app/intakeform/views/partials-views/beneficiary-family/beneficiary-family-employment-view.html",
                  controller: "BeneficiaryFamilyEmploymentController",
                  controllerAs: "bfEmpCtrl",
                  ncyBreadcrumb: {
                    label: "Employment"
                  },
                  resolve: {
                    "Employment": ["$q", "$state", "$stateParams",
                      function($q, $state, $stateParams) {
                      var defer = $q.defer();
                      //TODO Need to add get BeneficiaryFamily employment info API
                      defer.resolve({});
                      return defer.promise;
                    }]
                  }
              })
              .state("home.beneficiaryFamilyView.history", {
                  url: "/history",
                  templateUrl: "app/intakeform/views/partials-views/beneficiary-family/beneficiary-family-history-view.html",
                  controller: "BeneficiaryFamilyHistoryController",
                  controllerAs: "bfHistCtrl",
                  ncyBreadcrumb: {
                    label: "History"
                  },
                  resolve: {
                    "MarriageHistory": ["$q", "$state", "$stateParams", function($q, $state, $stateParams, BeneficiaryService) {
                      var defer = $q.defer();
                      //TODO Need to add get BeneficiaryFamily MarriageHistory info API
                      defer.resolve({});
                      return defer.promise;
                    }],
                    "TripsHistory": ["$q", "$state", "$stateParams", function($q, $state, $stateParams, BeneficiaryService) {
                      var defer = $q.defer();
                      //TODO Need to add get BeneficiaryFamily TripsHistory info API
                      defer.resolve({});
                      return defer.promise;
                    }],
                    "Gender": ["$q", "MasterDataService", function($q, MasterDataService) {
                      var defer = $q.defer();
                      $q.when(MasterDataService.getPersonGender()).then(function(data) {
                        defer.resolve(data);
                      });
                      return defer.promise;
                    }],
                    "Countries": ["$q", "MasterDataService", function($q, MasterDataService) {
                      var defer = $q.defer();
                      $q.when(MasterDataService.getCountries()).then(function(data) {
                        defer.resolve(data);
                      });
                      return defer.promise;
                    }],
                    "TerminationTypes": ["$q", "MasterDataService", function($q, MasterDataService) {
                      var defer = $q.defer();
                      $q.when(MasterDataService.getMarriageTerminationTypes()).then(function(data) {
                        defer.resolve(data);
                      });
                      return defer.promise;
                    }]
                  }
              })
              .state("home.beneficiaryFamilyView.background", {
                  url: "/background",
                  templateUrl: "app/intakeform/views/partials-views/beneficiary-family/beneficiary-family-background-view.html",
                  ncyBreadcrumb: {
                    label: "Background"
                  },
                  resolve: {
                    "Background": ["$q", "$state", "$stateParams",
                      function($q, $state, $stateParams) {
                      var defer = $q.defer();
                      //TODO Need to add get BeneficiaryFamily Background info API
                      defer.resolve({});
                      return defer.promise;
                    }]
                  }
              })
              .state("home.beneficiaryFamilyView.documents", {
                  url: "/documents",
                  templateUrl: "app/intakeform/views/partials-views/beneficiary-family/beneficiary-family-documents-view.html",
                  controller: "BeneficiaryFamilyDocumentController",
                  controllerAs: "docCtrl",
                  ncyBreadcrumb: {
                    label: "Documents"
                  },
                  resolve: {
                    "DocumentSubTypes": ["$q", "MasterDataService", function($q, MasterDataService) {
                      var defer = $q.defer();
                      MasterDataService.getDocumentSubTypes("beneficiary").then(function(response) {
                        defer.resolve(response.data);
                      });
                      return defer.promise;
                    }]
                  }
              })

              .state("home.derivativeFamily", {
                  url: "/derivative-family",
                  templateUrl: "app/intakeform/views/partials/derivative-beneficiary-family/derivative-family-form.html",
                  controller: "DerivativeFamilyFormController",
                  controllerAs: "dfCtrl",
                  ncyBreadcrumb: {
                    label: "Derivative Beneficiary Family"
                  },
                  resolve: {
                    "DerivativeFamily" : ["$q", "$stateParams", "MasterDataService",
                      function($q, $stateParams, MasterDataService) {
                      var defer = $q.defer();
                      defer.resolve({});
                      return defer.promise;
                    }],
                    "Title": ["$q", "MasterDataService", function($q, MasterDataService) {
                      var defer = $q.defer();
                      MasterDataService.getPersonTitles().then(function(data) {
                        defer.resolve(data);
                      });
                      return defer.promise;
                    }],
                    "Citizen": ["$q", "MasterDataService", function($q, MasterDataService) {
                      var defer = $q.defer();
                      MasterDataService.getCitizenList().then(function(data) {
                        defer.resolve(data);
                      });
                      return defer.promise;
                    }],
                    "Gender": ["$q", "MasterDataService", function($q, MasterDataService) {
                      var defer = $q.defer();
                      $q.when(MasterDataService.getPersonGender()).then(function(data) {
                        defer.resolve(data);
                      });
                      return defer.promise;
                    }],
                    "Relations": ["$q", "MasterDataService", function($q, MasterDataService) {
                      var defer = $q.defer();
                      $q.when(MasterDataService.getRelations()).then(function(data) {
                        defer.resolve(data);
                      });
                      return defer.promise;
                    }]
                  }
              })

              .state("home.derivativeFamilyView", {
                  url: "/derivative-family/view",
                  templateUrl: "app/intakeform/views/partials-views/derivative-beneficiary-family/derivative-family-form-view.html",
                  controller: "DerivativeFamilyFormController",
                  controllerAs: "dfCtrl",
                  ncyBreadcrumb: {
                    label: "Derivative Beneficiary Family"
                  },
                  resolve: {
                    "DerivativeFamily" : ["$q", "$stateParams", "MasterDataService",
                      function($q, $stateParams, MasterDataService) {
                      var defer = $q.defer();
                      defer.resolve({});
                      return defer.promise;
                    }],
                    "Title": ["$q", "MasterDataService", function($q, MasterDataService) {
                      var defer = $q.defer();
                      MasterDataService.getPersonTitles().then(function(data) {
                        defer.resolve(data);
                      });
                      return defer.promise;
                    }],
                    "Citizen": ["$q", "MasterDataService", function($q, MasterDataService) {
                      var defer = $q.defer();
                      MasterDataService.getCitizenList().then(function(data) {
                        defer.resolve(data);
                      });
                      return defer.promise;
                    }],
                    "Gender": ["$q", "MasterDataService", function($q, MasterDataService) {
                      var defer = $q.defer();
                      $q.when(MasterDataService.getPersonGender()).then(function(data) {
                        defer.resolve(data);
                      });
                      return defer.promise;
                    }],
                    "Relations": ["$q", "MasterDataService", function($q, MasterDataService) {
                      var defer = $q.defer();
                      $q.when(MasterDataService.getRelations()).then(function(data) {
                        defer.resolve(data);
                      });
                      return defer.promise;
                    }]
                  }
              });
    }

})();
