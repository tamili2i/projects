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
        .module("immiApp.report")
        .config(config);

    config.$inject = [
        "$stateProvider",
        "$urlRouterProvider",
        "$locationProvider"
    ];

    function config($stateProvider, $urlRouterProvider, $locationProvider) {
      $stateProvider
      .state("home.beneficiaryReport", {
          url: "/reports/beneficiary",
          templateUrl: "app/report/views/beneficiary-list.html",
          controller: "BeneficiaryReportController",
          controllerAs: "brCtrl",
          ncyBreadcrumb: {
            label: "Beneficiary Report"
          },
          resolve: {
          "Countries": ["$q", "MasterDataService", function($q, MasterDataService) {
            var defer = $q.defer();
            $q.when(MasterDataService.getCountries()).then(function(data) {
              defer.resolve(data);
            });
            return defer.promise;
          }]
        }
      })
      .state("home.partyReport", {
        url: "/reports/party",
        templateUrl: "app/report/views/party-list.html",
        controller: "PartyReportController",
        controllerAs: "prCtrl",
        ncyBreadcrumb: {
          label: "Party Report"
        },
        resolve:{
          "Countries": ["$q", "MasterDataService", function($q, MasterDataService) {
            var defer = $q.defer();
            $q.when(MasterDataService.getCountries()).then(function(data) {
              defer.resolve(data);
            });
            return defer.promise;
          }]
        }
      })
      .state("home.passportReport", {
        url: "/reports/passport",
        templateUrl: "app/report/views/passport-list.html",
        controller: "PassportReportController",
        controllerAs: "psrCtrl",
        ncyBreadcrumb: {
          label: "Passport Report"
        },
        resolve:{
          "Countries": ["$q", "MasterDataService", function($q, MasterDataService) {
            var defer = $q.defer();
            $q.when(MasterDataService.getCountries()).then(function(data) {
              defer.resolve(data);
            });
            return defer.promise;
          }]
        }
      })
      .state("home.caseReport",{
        url: "/reports/case",
        templateUrl: "app/report/views/case-list.html",
        controller: "CaseReportController",
        controllerAs: "crCtrl",
        ncyBreadcrumb: {
          label: "Case Report"
        },
        resolve:{
          "CaseFormTypes": ["$q", "MasterDataService", function($q, MasterDataService){
            var defer = $q.defer();
            $q.when(MasterDataService.getCaseFormTypes()).then(function(response){
              var cases = response.data;
              defer.resolve(cases);
            });
            return defer.promise;
          }]
        }

      })
      ;

    }

})();
