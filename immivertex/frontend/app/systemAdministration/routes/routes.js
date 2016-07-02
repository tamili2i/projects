(function() {
    "use strict";

    /**
     * @ngdoc Config
     * @name SystemConfig
     * @module immiApp.SysytemAdministration
     * @description
     *
     *
     * @author Ideas2IT Technologies
     * @copyright
     */
    angular
        .module("immiApp.SystemAdministration")
        .config(config);

    config.$inject = [
        "$stateProvider",
        "$urlRouterProvider",
        "$locationProvider"
    ];

    function config($stateProvider, $urlRouterProvider, $locationProvider) {
      $stateProvider
              .state("home.subscribers", {
                  url: "/subscribers",
                  templateUrl: "app/systemAdministration/views/subscriber-list.html",
                  controller: "SubscriberListController",
                  controllerAs: "subsCtrl",
                  ncyBreadcrumb: {
                    label: "Subscribers"
                  },
                  resolve: {
                    "Actions":["$q", "SubscriberService", function($q, SubscriberService) {
                      var defer = $q.defer();
                      var actions = SubscriberService.getActionList();
                      actions.then(function(response) {
                        defer.resolve(response.data);
                      }, function(response){
                        defer.resolve([]);
                      });
                      return defer.promise;
                    }]
                  }
              })
              .state("home.subscriberForm",{
                url: "/subscribers/profile/:id",
                templateUrl: "app/systemAdministration/views/subscriber-profile.html",
                controller: "SubscriberProfileController",
                controllerAs: "subProCtrl",
                ncyBreadcrumb: {
                  label: "{{state}}",
                  parent: "home.subscribers"
                },
                resolve: {
                  "Subscriber": ["$q", "$stateParams", "$state", "SubscriberService", function($q, $stateParams, $state, SubscriberService) {
                    var defer = $q.defer();
                    if (!_.isEmpty($stateParams.id)) {
                      var subscriber = SubscriberService.getSubscriber($stateParams.id);
                      subscriber.then(function success(response) {
                        defer.resolve(response.data[0]);
                      }, function error(err) {
                        //if no program case found, then it should be 404
                        //$state.go("landing.404");
                      });
                    } else {
                      defer.resolve({});
                    }
                    return defer.promise;
                  }]
                }
              })
              .state("home.alerts",{
                url: "/alerts/:id",
                templateUrl: "app/systemAdministration/views/view-alert.html",
                controller: "SubscriberAlertController",
                controllerAs: "altCtrl",
                ncyBreadcrumb: {
                  label: "Alert{{state}}",
                  parent: "home.subscribers"
                },
                resolve: {
                  "Actions":["$q", "SubscriberService", function($q, SubscriberService) {
                    var defer = $q.defer();
                    var actions = SubscriberService.getActionList();
                    actions.then(function(response) {
                      defer.resolve(response.data);
                    }, function(response){
                      defer.resolve([]);
                    });
                    return defer.promise;
                  }]
                }
              });

    }

})();
