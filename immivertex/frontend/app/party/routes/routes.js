(function() {
    "use strict";

    /**
     * @ngdoc Config
     * @name config
     * @module immiApp.party
     * @description
     *
     *
     * @author Ideas2IT Technologies
     * @copyright
     */
    angular
        .module("immiApp.party")
        .config(config);

    config.$inject = [
        "$stateProvider",
        "$urlRouterProvider",
        "$locationProvider"
    ];

    function config($stateProvider, $urlRouterProvider, $locationProvider) {
      $stateProvider
      .state("home.party", {
          url: "/party",
          templateUrl: "app/party/views/dashboard.html",
          controller: "PartyController",
          controllerAs: "pCtrl",
          ncyBreadcrumb: {
            label: "Dashboard"
          }
      })
      .state("home.parties", {
          url: "/parties",
          templateUrl: "app/party/views/party-list.html",
          controller: "PartyListController",
          controllerAs: "plCtrl",
          ncyBreadcrumb: {
            label: "Parties"
          }
      })
      .state("home.partyForm", {
          url: "/party/:id",
          templateUrl: "app/party/views/party-form.html",
          controller: "PartyFormController",
          controllerAs: "pfCtrl",
          ncyBreadcrumb: {
            label: "Create Party",
            parent: "home.parties"
          },
          resolve: {
            "Countries": ["$q", "MasterDataService", function($q, MasterDataService) {
              var defer = $q.defer();
              $q.when(MasterDataService.getCountries()).then(function(data) {
                defer.resolve(data);
              });
              return defer.promise;
            }],
            "Party": ["$q", "$state", "$stateParams", "PartyService", "ToasterService", function($q, $state, $stateParams, PartyService, ToasterService) {
              var defer = $q.defer();
              if($stateParams.id == ""){
                defer.resolve({});
              } else {
                var party = PartyService.getParty($stateParams.id);
                party.then(function(response) {
                  defer.resolve(response.data[0]);
                }, function() {
                  ToasterService.toastError("In loading party", "Error");
                  $state.go("landing.404");
                });
              }
              return defer.promise;
            }]
          }
      })
      .state("home.partyView", {
          url: "/party/view/:id",
          templateUrl: "app/party/views/party-view.html",
          controller: "PartyViewController",
          controllerAs: "pViCtrl",
          ncyBreadcrumb: {
            label: "View Party",
            parent: "home.parties"
          },
          resolve: {
            "Countries": ["$q", "MasterDataService", function($q, MasterDataService) {
              var defer = $q.defer();
              $q.when(MasterDataService.getCountries()).then(function(data) {
                defer.resolve(data);
              });
              return defer.promise;
            }],
            "Party": ["$q", "$state", "$stateParams", "PartyService", "ToasterService", function($q, $state, $stateParams, PartyService, ToasterService) {
              var defer = $q.defer();
              if($stateParams.id == ""){
                defer.resolve({});
              } else {
                var party = PartyService.getParty($stateParams.id);
                party.then(function(response) {
                  defer.resolve(response.data[0]);
                }, function() {
                  ToasterService.toastError("In loading party", "Error");
                  $state.go("landing.404");
                });
              }
              return defer.promise;
            }]
          }
      })
      .state("home.partyRelationForm", {
          url: "/party-relation/:id",
          templateUrl: "app/party/views/party-relation-form.html",
          controller: "PartyRelationController",
          controllerAs: "prfCtrl",
          ncyBreadcrumb: {
            label: "Party Relationship"
          }
      });

    }

})();
