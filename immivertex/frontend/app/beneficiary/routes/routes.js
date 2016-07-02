(function() {
  "use strict";

  /**
   * @ngdoc Config
   * @name SystemConfig
   * @module immiApp.beneficiary
   * @description
   *
   *
   * @author Ideas2IT Technologies
   * @copyright
   */
  angular
    .module("immiApp.beneficiary")
    .config(config);

  config.$inject = [
    "$stateProvider",
    "$urlRouterProvider",
    "$locationProvider",
    "$breadcrumbProvider"
  ];

  function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state("home.beneficiaries", {
        url: "/beneficiaries",
        templateUrl: "app/beneficiary/views/beneficiaries.html",
        controller: "BeneficiaryListController",
        controllerAs: "blistCtrl",
        reloadOnSearch: false,
        ncyBreadcrumb: {
          label: "Beneficiaries"
        },
        resolve: {
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
          }]
        }
      })
      .state("home.beneficiaries.search", {
        url: "/search",
        templateUrl: "app/beneficiary/views/partials/advanced-search.html",
        controller: "BeneficiarySearchController",
        controllerAs: "bSearchCtrl",
        ncyBreadcrumb: {
          label: "Search"
        },
        resolve: {
          "CaseTypes": ["$q", "BeneficiaryService", function($q, BeneficiaryService) {
            var defer = $q.defer();
            BeneficiaryService.getCaseList().then(function(response) {
              defer.resolve(response.data);
            });
            return defer.promise;
          }],
          "CaseStatus": ["$q", "BeneficiaryService", function($q, BeneficiaryService) {
            var defer = $q.defer();
            BeneficiaryService.getCaseStatusList().then(function(response) {
              defer.resolve(response.data.data);
            });
            return defer.promise;
          }],
          "BeneficiaryStatus": ["$q", "BeneficiaryService", function($q, BeneficiaryService) {
            var defer = $q.defer();
            BeneficiaryService.getBeneficiaryStatus().then(function(response) {
              defer.resolve(response.data.data);
            });
            return defer.promise;
          }]
        }
      })
      .state("home.beneficiary", {
        url: "/beneficiary/:id",
        abstract: true,
        templateUrl: "app/beneficiary/views/beneficiary-form.html",
        controller: "BeneficiaryFormController",
        controllerAs: "bfCtrl",
        ncyBreadcrumb: {
          label: "{{state}}",
          force: true,
          parent: function($rootScope){
            if($rootScope.state){
              if($rootScope.state == "Beneficiary") {
                return "";
              } else {
                return "home.beneficiaries";
              }
            }
          }
        },
        resolve: {
          "Beneficiary": ["$q", "$state", "$stateParams", "BeneficiaryService",
            function($q, $state, $stateParams, BeneficiaryService) {
            var defer = $q.defer();
            if (!_.isEmpty($stateParams.id)) {
              var queryParam = BeneficiaryService.constructQueryParam($stateParams.id),
                beneficiary = BeneficiaryService.getGeneralInfo(queryParam);

              beneficiary.then(function success(response) {
                defer.resolve(response.data);
              }, function error(err) {
                //if no beneficiary found, then it should be 404
                $state.go("landing.404");
              });
            } else {
              //if no beneficiary id was passed then it should be 404
              $state.go("landing.404");
            }
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
      .state("home.beneficiary.general", {
        url: "/",
        templateUrl: "app/beneficiary/views/partials/general.html",
        controller: "BeneficiaryGeneralController",
        controllerAs: "bGenCtrl",
        ncyBreadcrumb: {
          label: "General"

        },
        resolve: {
          "Beneficiary": ["$q", "$state", "$stateParams", "BeneficiaryService",
            function($q, $state, $stateParams, BeneficiaryService) {
            var defer = $q.defer();
            if (!_.isEmpty($stateParams.id)) {
              var queryParam = BeneficiaryService.constructQueryParam($stateParams.id),
                beneficiary = BeneficiaryService.getGeneralInfo(queryParam);

              beneficiary.then(function success(response) {
                defer.resolve(response.data);
              }, function error(err) {
                //if no beneficiary found, then it should be 404
                $state.go("landing.404");
              });
            } else {
              //if no beneficiary id was passed then it should be 404
              $state.go("landing.404");
            }
            return defer.promise;
          }]
        }
      })
      .state("home.beneficiary.address", {
        url: "/address",
        templateUrl: "app/beneficiary/views/partials/address.html",
        controller: "AddressController",
        controllerAs: "addrCtrl",
        ncyBreadcrumb: {
          label: "Address"
        },
        resolve: {
          "Addressess": ["$q", "$state", "$stateParams", "BeneficiaryService", function($q, $state, $stateParams, BeneficiaryService) {
            var defer = $q.defer();
            if (!_.isEmpty($stateParams.id)) {
              var queryParam = BeneficiaryService.constructQueryParam($stateParams.id);
              BeneficiaryService.getBeneficiaryAddress(queryParam).then(function success(response) {
                for(var i=0;i<response.data.length;i++){
                  if(response.data[i].is_completed){
                    response.data[i].is_completed = "true";
                  } else{
                    response.data[i].is_completed = "false";
                  }
                }
                defer.resolve(response.data);
              }, function error(err) {
                $state.go("landing.404");
              });
            } else{
              $state.go("landing.404");
            }
            return defer.promise;
          }]
        }
      })
      .state("home.beneficiary.documents", {
        url: "/documents",
        templateUrl: "app/beneficiary/views/partials/documents.html",
        controller: "DocumentController",
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
      .state("home.beneficiary.education", {
        url: "/education",
        templateUrl: "app/beneficiary/views/partials/education.html",
        controller: "EducationController",
        controllerAs: "eduCtrl",
        ncyBreadcrumb: {
          label: "Education"
        },
        resolve: {
          "Education": ["$q", "$state", "$stateParams", "BeneficiaryService", function($q, $state, $stateParams, BeneficiaryService) {
            var defer = $q.defer();
            if (!_.isEmpty($stateParams.id)) {
              var queryParam = BeneficiaryService.constructQueryParam($stateParams.id);
              BeneficiaryService.getBeneficiaryEducation(queryParam).then(function success(response) {
                for(var i=0;i<response.data.length;i++){
                  if(response.data[i].is_completed){
                    response.data[i].is_completed = "true";
                  } else{
                    response.data[i].is_completed = "false";
                  }
                }
                defer.resolve(response.data);
              }, function error(err) {
                $state.go("landing.404");
              });
            } else{
              $state.go("landing.404");
            }
            return defer.promise;
          }]
        }
      })
      .state("home.beneficiary.employment", {
        url: "/employment",
        templateUrl: "app/beneficiary/views/partials/employment.html",
        controller: "EmploymentController",
        controllerAs: "empCtrl",
        ncyBreadcrumb: {
          label: "Employment"
        },
        resolve: {
          "Employment": ["$q", "$state", "$stateParams", "BeneficiaryService", function($q, $state, $stateParams, BeneficiaryService) {
            var defer = $q.defer();
            if (!_.isEmpty($stateParams.id)) {
              var queryParam = BeneficiaryService.constructQueryParam($stateParams.id);
              BeneficiaryService.getBeneficiaryEmployment(queryParam).then(function success(response) {
                for(var i=0;i<response.data.length;i++){
                  if(response.data[i].is_completed){
                    response.data[i].is_completed = "true";
                  } else{
                    response.data[i].is_completed = "false";
                  }
                }
                defer.resolve(response.data);
              }, function error(err) {
                $state.go("landing.404");
              });
            } else{
              $state.go("landing.404");
            }
            return defer.promise;
          }]
        }
      })
      .state("home.beneficiary.history", {
        url: "/history",
        templateUrl: "app/beneficiary/views/partials/history.html",
        controller: "HistoryController",
        controllerAs: "hisCtrl",
        ncyBreadcrumb: {
          label: "History"
        },
        resolve: {
          "MarriageHistory": ["$q", "$state", "$stateParams", "BeneficiaryService", function($q, $state, $stateParams, BeneficiaryService) {
            var defer = $q.defer();
            if ($stateParams.id == "") {
              return {};
            } else {
              var partyId = {
                "party_id" : $stateParams.id
              }
              BeneficiaryService.getMarriageHistory(partyId).then(function success(response) {
                defer.resolve(response.data);
              }, function error(err) {
                $state.go("landing.404");
              });
            }
            return defer.promise;
          }],
          "TripsHistory": ["$q", "$state", "$stateParams", "BeneficiaryService", function($q, $state, $stateParams, BeneficiaryService) {
            var defer = $q.defer();
            if ($stateParams.id == "") {
              return {};
            } else {
              var partyId = {
                "party_id" : $stateParams.id
              }
              BeneficiaryService.getTripsHistory(partyId).then(function success(response) {
                defer.resolve(response.data);
              }, function error(err) {
                $state.go("landing.404");
              });
            }
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
      .state("home.beneficiary.background", {
        url: "/background",
        templateUrl: "app/beneficiary/views/partials/background.html",
        controller: "BackgroundController",
        controllerAs: "bgCtrl",
        ncyBreadcrumb: {
          label: "Background"
        },
        resolve: {
          "Background": ["$q", "$stateParams", "BeneficiaryService", function($q, $stateParams, BeneficiaryService) {
            var defer = $q.defer();
            var background = {};
            if(!_.isEmpty($stateParams.id)){
              background = {
                "module":"Beneficiary",
                "sub_module":"Background",
                "party_id": $stateParams.id
              };
              BeneficiaryService.getBackgroundQuestions(background).then(function success(response) {
                defer.resolve(response.data);
              }, function error(err) {
                $state.go("landing.404");
              });
            } else {
              $state.go("landing.404");
            }

            return defer.promise;
          }]
        }
      })
      .state("home.beneficiary.cases", {
        url: "/cases",
        templateUrl: "app/beneficiary/views/partials/cases.html",
        controller: "BeneficiaryCaseController",
        controllerAs: "bcCtrl",
        ncyBreadcrumb: {
          label: "Cases"
        },
        resolve: {
          "Cases": ["$q", "$stateParams", "BeneficiaryService", function($q, $stateParams, BeneficiaryService) {
            var defer = $q.defer();
            if(!_.isEmpty($stateParams.id)){
              var queryParam = BeneficiaryService.constructQueryParam("100");
              BeneficiaryService.getCases(queryParam).then(function success(response) {
                defer.resolve(response.data);
              }, function error(err) {
                $state.go("landing.404");
              });
            } else {
              $state.go("landing.404");
            }
            return defer.promise;
          }]
        }
      })
      .state("home.beneficiaryForm", {
        url: "/beneficiary/create",
        templateUrl: "app/beneficiary/views/create-beneficiary-form.html",
        controller: "BeneficiaryCreateController",
        controllerAs: "bCrtCtrl",
        ncyBreadcrumb: {
          label: "Create"
        },
        resolve : {
          "Countries": ["$q", "MasterDataService", function($q, MasterDataService) {
            var defer = $q.defer();
            $q.when(MasterDataService.getCountries()).then(function(data) {
              defer.resolve(data);
            });
            return defer.promise;
          }]
        }
      })

      .state("home.beneficiary.userNotes", {
          url: "/user-notes",
          templateUrl: "app/UserNotes/views/user-note-list.html",
          controller: "UsernoteController",
          controllerAs: "userNoteCtrl",
          ncyBreadcrumb: {
            label: "User Notes"
          }
      })
      .state("home.beneficiary.changeHistory", {
          url: "/change-history",
          templateUrl: "app/beneficiary/views/partials/change-history.html",
          controller: "ChangeHistoryController",
          controllerAs: "chHistCtrl",
          ncyBreadcrumb: {
            label: "Change History"
          }
      })

      .state("home.viewBeneficiary", {
        url: "/beneficiary/view/:id",
        abstract: true,
        templateUrl: "app/beneficiary/views/beneficiary-form.html",
        controller: "BeneficiaryFormController",
        controllerAs: "bfCtrl",
        ncyBreadcrumb: {
          label: "{{state}}",
          force: true,
          parent: function($rootScope){
            if($rootScope.state){
              if($rootScope.state == "Beneficiary") {
                return "";
              } else {
                return "home.beneficiaries";
              }
            }
          }
        },
        resolve: {
          "Beneficiary": ["$q", "$state", "$stateParams", "BeneficiaryService",
            function($q, $state, $stateParams, BeneficiaryService) {
            var defer = $q.defer();
            if (!_.isEmpty($stateParams.id)) {
              var queryParam = BeneficiaryService.constructQueryParam($stateParams.id),
                beneficiary = BeneficiaryService.getGeneralInfo(queryParam);

              beneficiary.then(function success(response) {
                defer.resolve(response.data);
              }, function error(err) {
                //if no beneficiary found, then it should be 404
                $state.go("landing.404");
              });
            } else {
              //if no beneficiary id was passed then it should be 404
              $state.go("landing.404");
            }
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
          }],
        }
      })
      .state("home.viewBeneficiary.general", {
        url: "/",
        templateUrl: "app/beneficiary/views/partials/partials-views/general-view.html",
        controller: "BeneficiaryGeneralController",
        controllerAs: "bGenCtrl",
        ncyBreadcrumb: {
          label: "General"

        },
        resolve: {
          "Beneficiary": ["$q", "$state", "$stateParams", "BeneficiaryService",
            function($q, $state, $stateParams, BeneficiaryService) {
            var defer = $q.defer();
            if (!_.isEmpty($stateParams.id)) {
              var queryParam = BeneficiaryService.constructQueryParam($stateParams.id),
                beneficiary = BeneficiaryService.getGeneralInfo(queryParam);

              beneficiary.then(function success(response) {
                defer.resolve(response.data);
              }, function error(err) {
                //if no beneficiary found, then it should be 404
                $state.go("landing.404");
              });
            } else {
              //if no beneficiary id was passed then it should be 404
              $state.go("landing.404");
            }
            return defer.promise;
          }]
        }
      })
      .state("home.viewBeneficiary.address", {
        url: "/address",
        templateUrl: "app/beneficiary/views/partials/partials-views/address-view.html",
        controller: "AddressController",
        controllerAs: "addrCtrl",
        ncyBreadcrumb: {
          label: "Address"
        },
        resolve: {
          "Addressess": ["$q", "$state", "$stateParams", "BeneficiaryService", function($q, $state, $stateParams, BeneficiaryService) {
            var defer = $q.defer();
            if (!_.isEmpty($stateParams.id)) {
              var queryParam = BeneficiaryService.constructQueryParam($stateParams.id);
              BeneficiaryService.getBeneficiaryAddress(queryParam).then(function success(response) {
                for(var i=0;i<response.data.length;i++){
                  if(response.data[i].is_completed){
                    response.data[i].is_completed = "true";
                  } else{
                    response.data[i].is_completed = "false";
                  }
                }
                defer.resolve(response.data);
              }, function error(err) {
                $state.go("landing.404");
              });
            } else{
              $state.go("landing.404");
            }
            return defer.promise;
          }]
        }
      })

      .state("home.viewBeneficiary.documents", {
        url: "/documents",
        templateUrl: "app/beneficiary/views/partials/partials-views/documents-view.html",
        controller: "DocumentController",
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
      .state("home.viewBeneficiary.education", {
        url: "/education",
        templateUrl: "app/beneficiary/views/partials/partials-views/education-view.html",
        controller: "EducationController",
        controllerAs: "eduCtrl",
        ncyBreadcrumb: {
          label: "Education"
        },
        resolve: {
          "Education": ["$q", "$state", "$stateParams", "BeneficiaryService", function($q, $state, $stateParams, BeneficiaryService) {
            var defer = $q.defer();
            if (!_.isEmpty($stateParams.id)) {
              var queryParam = BeneficiaryService.constructQueryParam($stateParams.id);
              BeneficiaryService.getBeneficiaryEducation(queryParam).then(function success(response) {
                for(var i=0;i<response.data.length;i++){
                  if(response.data[i].is_completed){
                    response.data[i].is_completed = "true";
                  } else{
                    response.data[i].is_completed = "false";
                  }
                }
                defer.resolve(response.data);
              }, function error(err) {
                $state.go("landing.404");
              });
            } else{
              $state.go("landing.404");
            }
            return defer.promise;
          }]
        }
      })
      .state("home.viewBeneficiary.employment", {
        url: "/employment",
        templateUrl: "app/beneficiary/views/partials/partials-views/employment-view.html",
        controller: "EmploymentController",
        controllerAs: "empCtrl",
        ncyBreadcrumb: {
          label: "Employment"
        },
        resolve: {
          "Employment": ["$q", "$state", "$stateParams", "BeneficiaryService", function($q, $state, $stateParams, BeneficiaryService) {
            var defer = $q.defer();
            if (!_.isEmpty($stateParams.id)) {
              var queryParam = BeneficiaryService.constructQueryParam($stateParams.id);
              BeneficiaryService.getBeneficiaryEmployment(queryParam).then(function success(response) {
                for(var i=0;i<response.data.length;i++){
                  if(response.data[i].is_completed){
                    response.data[i].is_completed = "true";
                  } else{
                    response.data[i].is_completed = "false";
                  }
                }
                defer.resolve(response.data);
              }, function error(err) {
                $state.go("landing.404");
              });
            } else{
              $state.go("landing.404");
            }
            return defer.promise;
          }]
        }
      })
      .state("home.viewBeneficiary.background", {
        url: "/background",
        templateUrl: "app/beneficiary/views/partials/partials-views/background-view.html",
        controller: "BackgroundController",
        controllerAs: "bgCtrl",
        ncyBreadcrumb: {
          label: "Background"
        },
        resolve: {
          "Background": ["$q", "$stateParams", "BeneficiaryService", function($q, $stateParams, BeneficiaryService) {
            var defer = $q.defer();
            var background = {};
            if(!_.isEmpty($stateParams.id)){
              background = {
                "module":"Beneficiary",
                "sub_module":"Background",
                "party_id": $stateParams.id
              };
              BeneficiaryService.getBackgroundQuestions(background).then(function success(response) {
                defer.resolve(response.data);
              }, function error(err) {
                $state.go("landing.404");
              });
            } else {
              $state.go("landing.404");
            }

            return defer.promise;
          }]
        }
      })

      .state("home.viewBeneficiary.history", {
        url: "/history",
        templateUrl: "app/beneficiary/views/partials/partials-views/history-view.html",
        controller: "HistoryController",
        controllerAs: "hisCtrl",
        ncyBreadcrumb: {
          label: "History"
        },
        resolve: {
          "MarriageHistory": ["$q", "$state", "$stateParams", "BeneficiaryService", function($q, $state, $stateParams, BeneficiaryService) {
            var defer = $q.defer();
            if ($stateParams.id == "") {
              return {};
            } else {
              var partyId = {
                "party_id" : $stateParams.id
              }
              BeneficiaryService.getMarriageHistory(partyId).then(function success(response) {
                defer.resolve(response.data);
              }, function error(err) {
                $state.go("landing.404");
              });
            }
            return defer.promise;
          }],
          "TripsHistory": ["$q", "$state", "$stateParams", "BeneficiaryService", function($q, $state, $stateParams, BeneficiaryService) {
            var defer = $q.defer();
            if ($stateParams.id == "") {
              return {};
            } else {
              var partyId = {
                "party_id" : $stateParams.id
              }
              BeneficiaryService.getTripsHistory(partyId).then(function success(response) {
                defer.resolve(response.data);
              }, function error(err) {
                $state.go("landing.404");
              });
            }
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

      .state("home.viewBeneficiary.cases", {
        url: "/cases",
        templateUrl: "app/beneficiary/views/partials/cases.html",
        controller: "BeneficiaryCaseController",
        controllerAs: "bcCtrl",
        ncyBreadcrumb: {
          label: "Cases"
        },
        resolve: {
          "Cases": ["$q", "$stateParams", "BeneficiaryService", function($q, $stateParams, BeneficiaryService) {
            var defer = $q.defer();
            if(!_.isEmpty($stateParams.id)){
              var queryParam = BeneficiaryService.constructQueryParam("100");
              BeneficiaryService.getCases(queryParam).then(function success(response) {
                defer.resolve(response.data);
              }, function error(err) {
                $state.go("landing.404");
              });
            } else {
              $state.go("landing.404");
            }
            return defer.promise;
          }]
        }
      })


      .state("home.viewBeneficiary.userNotes", {
          url: "/user-notes",
          templateUrl: "app/UserNotes/views/user-note-list.html",
          controller: "UsernoteController",
          controllerAs: "userNoteCtrl",
          ncyBreadcrumb: {
            label: "User Notes"
          }
      })
      .state("home.viewBeneficiary.changeHistory", {
          url: "/change-history",
          templateUrl: "app/beneficiary/views/partials/change-history.html",
          controller: "ChangeHistoryController",
          controllerAs: "chHistCtrl",
          ncyBreadcrumb: {
            label: "Change History"
          }
      });
  }

})();
