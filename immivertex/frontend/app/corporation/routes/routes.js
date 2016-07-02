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
    .module("immiApp.corporation")
    .config(config);

  config.$inject = [
    "$stateProvider",
    "$urlRouterProvider",
    "$locationProvider"
  ];

  function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state("home.corporation", {
        url: "/corporation",
        templateUrl: "app/corporation/views/dashboard.html",
        controller: "CorporationController",
        controllerAs: "cCtrl",
        ncyBreadcrumb: {
          label: "Dashboard"
        }
      })
      .state("home.corporations", {
        url: "/corporations",
        templateUrl: "app/corporation/views/corporations-list.html",
        controller: "CorporationListController",
        controllerAs: "clCtrl",
        ncyBreadcrumb: {
          label: "Corporations"
        }
      })
      .state("home.corporationForm", {
        url: "/corporations/:id",
        templateUrl: "app/corporation/views/corporation-form.html",
        controller: "CorporationFormController",
        controllerAs: "cfCtrl",
        ncyBreadcrumb: {
          label: "{{state}}",
          parent: "home.corporations"
        },
        resolve: {
          "Corporation": ["$q", "$stateParams", "CorporationService", function($q, $stateParams, CorporationService) {
            if ($stateParams.id == "") {
              return {};
            } else {
              return CorporationService.getCorporation($stateParams.id);
            }
          }],
          "AddressTypes": ["$q", "MasterDataService", function($q, MasterDataService) {
            var defer = $q.defer();
            MasterDataService.getAddressTypes("corporation_address").then(function(response) {
              defer.resolve(response.data);
            });
            return defer.promise;
          }],
          "Countries": ["$q", "MasterDataService", function($q, MasterDataService) {
            var defer = $q.defer();
            $q.when(MasterDataService.getCountries()).then(function() {
              defer.resolve({});
            });
            return defer.promise;
          }]
        }
      })
      .state("home.corporationView", {
        url: "/corporations/view/:id",
        templateUrl: "app/corporation/views/corporation-view.html",
        controller: "CorporationViewController",
        controllerAs: "crViCtrl",
        ncyBreadcrumb: {
          label: "View",
          parent: "home.corporations"
        },
        resolve: {
          "Corporation": ["$q", "$stateParams", "CorporationService", function($q, $stateParams, CorporationService) {
            if ($stateParams.id == "") {
              return {};
            } else {
              return CorporationService.getCorporation($stateParams.id);
            }
          }],
          "AddressTypes": ["$q", "MasterDataService", function($q, MasterDataService) {
            var defer = $q.defer();
            MasterDataService.getAddressTypes("corporation_address").then(function(response) {
              defer.resolve(response.data);
            });
            return defer.promise;
          }],
          "Countries": ["$q", "MasterDataService", function($q, MasterDataService) {
            var defer = $q.defer();
            $q.when(MasterDataService.getCountries()).then(function() {
              defer.resolve({});
            });
            return defer.promise;
          }]
        }
      });

  }

})();
