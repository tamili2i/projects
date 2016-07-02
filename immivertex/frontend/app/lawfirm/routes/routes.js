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
        .module("immiApp.lawfirm")
        .config(config);

    config.$inject = [
        "$stateProvider",
        "$urlRouterProvider",
        "$locationProvider"
    ];

    function config($stateProvider, $urlRouterProvider, $locationProvider) {
      $stateProvider
      .state("home.lawfirm", {
          url: "/lawfirm",
          templateUrl: "app/lawfirm/views/dashboard.html",
          controller: "LawfirmController",
          controllerAs: "lCtrl",
          ncyBreadcrumb: {
            label: "Dashboard"
          }
      })
      .state("home.lawfirms", {
          url: "/lawfirms",
          templateUrl: "app/lawfirm/views/lawfirm-list.html",
          controller: "LawfirmListController",
          controllerAs: "lflCtrl",
          ncyBreadcrumb: {
            label: "Law Firms"
          }
      })
      .state("home.lawfirmForm", {
          url: "/lawfirms/:id",
          templateUrl: "app/lawfirm/views/lawfirm-form.html",
          controller: "LawfirmFormController",
          controllerAs: "lfCtrl",
          ncyBreadcrumb: {
            label: "{{state}}",
            parent: "home.lawfirms"
          },
          resolve: {
            "LawFirm" : ["$q", "$state", "$stateParams", "LawfirmService", function($q, $state, $stateParams, LawfirmService){
              var defer = $q.defer();

              if($stateParams.id == ""){
                defer.resolve({});
              } else {
                var lawfirm = LawfirmService.getLawfirm($stateParams.id);
                lawfirm.then(function(response) {
                  defer.resolve(response.data);
                }, function() {
                  ToasterService.toastError("In loading lawfirm", "Error");
                  $state.go("landing.404");
                });
              }
              return defer.promise;
            }],
            "AddressTypes": ["$q", "MasterDataService", function($q, MasterDataService) {
              var defer = $q.defer();
              MasterDataService.getAddressTypes("lawfirm_address").then(function(response) {
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
            }],
            "Title" : ["$q", "MasterDataService", function($q, MasterDataService){
              var defer = $q.defer();
              MasterDataService.getPersonTitles().then(function(data){
                  defer.resolve(data);
                });
              return defer.promise;
            }]
          }
      })
      .state("home.lawfirmView", {
          url: "/lawfirms/view/:id",
          templateUrl: "app/lawfirm/views/lawfirm-view.html",
          controller: "LawfirmViewController",
          controllerAs: "lawViCtrl",
          ncyBreadcrumb: {
            label: "View",
            parent: "home.lawfirms"
          },
          resolve: {
            "LawFirm" : ["$q", "$state", "$stateParams", "LawfirmService", function($q, $state, $stateParams, LawfirmService){
              var defer = $q.defer();
              if($stateParams.id == ""){
                defer.resolve({});
              } else {
                var lawfirm = LawfirmService.getLawfirm($stateParams.id);
                lawfirm.then(function(response) {
                  defer.resolve(response.data);
                }, function() {
                  ToasterService.toastError("In loading lawfirm", "Error");
                  $state.go("landing.404");
                });
              }
              return defer.promise;
            }],
            "AddressTypes": ["$q", "MasterDataService", function($q, MasterDataService) {
              var defer = $q.defer();
              MasterDataService.getAddressTypes("lawfirm_address").then(function(response) {
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
            }],
            "Title" : ["$q", "MasterDataService", function($q, MasterDataService){
              var defer = $q.defer();
              MasterDataService.getPersonTitles().then(function(data){
                  defer.resolve(data);
                });
              return defer.promise;
            }]
          }
      });

    }

})();
