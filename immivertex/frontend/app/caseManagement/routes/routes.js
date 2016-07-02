(function() {
  "use strict";

  /**
   * @ngdoc Config
   * @name config
   * @module immiApp.lawfirm
   * @description
   *
   *
   * @author Ideas2IT Technologies
   * @copyright
   */
  angular
    .module("immiApp.caseManagement")
    .config(config);

  config.$inject = [
    "$stateProvider",
    "$urlRouterProvider",
    "$locationProvider"
  ];

  function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state("home.cases", {
        url: "/cases",
        templateUrl: "app/caseManagement/views/case-list.html",
        controller: "CaseListController",
        controllerAs: "caselCtrl",
        ncyBreadcrumb: {
          label: "Cases"
        },
        resolve: {
          "CaseTypes": ["$q", "CaseService", function($q, CaseService) {
            var defer = $q.defer();
            CaseService.getProgramCaseList().then(function(response) {
              defer.resolve(response.data);
            });
            return defer.promise;
          }]
        }
      })
      .state("home.cases.search", {
        url: "/cases/search",
        templateUrl: "app/caseManagement/views/partials/case-search.html",
        controller: "CaseSearchController",
        controllerAs: "caseSrCtrl",
        ncyBreadcrumb : {
          label: "Search"
        }
      })
      .state("home.cases.createCase", {
        url: "/:id",
        templateUrl: "app/caseManagement/views/create-case-form.html",
        controller: "CreateCaseController",
        controllerAs: "caseCrCtrl",
        ncyBreadcrumb: {
          label: "Create",
        }
      });

  }

})();
