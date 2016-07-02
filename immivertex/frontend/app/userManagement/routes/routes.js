(function() {
    "use strict";

    /**
     * @ngdoc Config
     * @name config
     * @module immiApp.UserManagement
     * @description
     *
     *
     * @author Ideas2IT Technologies
     * @copyright
     */
    angular
        .module("immiApp.UserManagement")
        .config(config);

    config.$inject = [
        "$stateProvider",
        "$urlRouterProvider",
        "$locationProvider"
    ];

    function config($stateProvider, $urlRouterProvider, $locationProvider) {
      $stateProvider
      .state("home.roles", {
          url: "/roles",
          templateUrl: "app/userManagement/views/userroles.html",
          controller: "UserRoleListController",
          controllerAs: "roleCtrl",
          ncyBreadcrumb: {
            label: "Roles"
          }
      })
      .state("home.roles.form", {
          url: "/:id",
          templateUrl: "app/userManagement/views/create-user-role.html",
          controller: "CreateUserRoleController",
          controllerAs: "cRoleCtrl",
          ncyBreadcrumb: {
            label: "{{state}}"
          },
          resolve: {
            "UserRole" :["$q", "$stateParams", "UserManagementService", "$state", function($q, $stateParams, UserManagementService, $state){
              var defer = $q.defer();
              if (!_.isEmpty($stateParams.id)) {
                var userRole = UserManagementService.getUserRole($stateParams.id);
                userRole.then(function success(response) {
                  defer.resolve(response.data);
                }, function error(err) {
                  //if no user role found, then it should be 404
                  $state.go("landing.404");
                });
              } else {
                defer.resolve({});
              }
              return defer.promise;
            }]
          }
      })
      .state("home.access", {
          url: "/access",
          templateUrl: "app/userManagement/views/user-access.html",
          controller: "UserAccessController",
          controllerAs: "uAccCtrl",
          ncyBreadcrumb: {
            label: "User Access"
          },
          resolve: {
            "UserRoles": ["$q", "UserManagementService", "Session", function($q, UserManagementService, Session) {
              var defer = $q.defer();
              var queryParam = UserManagementService.constructQueryParam(Session.getPartyType());
              UserManagementService.getUserRoles(queryParam).then(function(response) {
                defer.resolve(response.data);
              });
              return defer.promise;
            }],
            "Modules": ["$q", "UserManagementService", function($q, UserManagementService) {
              var defer = $q.defer();
              UserManagementService.getModules().then(function(response) {
                defer.resolve(response.data);
              });
              return defer.promise;
            }]
          }
      });

    }

})();
