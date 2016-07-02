(function() {
    "use strict";

    /**
     * @ngdoc Config
     * @name SystemConfig
     * @module immiApp.system
     * @description
     *
     *
     * @author Ideas2IT Technologies
     * @copyright
     */
    angular
        .module("immiApp.system")
        .config(config);

    config.$inject = [
        "$stateProvider",
        "$urlRouterProvider",
        "$locationProvider"
    ];

    function config($stateProvider, $urlRouterProvider, $locationProvider) {

        $urlRouterProvider.otherwise("/login");

        /*$locationProvider.html5Mode({
            enabled: true,
            requireBase: false
        });*/

        $stateProvider
            .state("home", {
                url: "",
                abstract: true,
                /**
                * TODO Role based system.html should be defined according to the Role
                * Beneficiary, lawyer or corporate specialist, System Administrator
                */
                templateUrl: "app/system/views/system.html",
                ncyBreadcrumb: {
                  label: "Home",
                  force:true
                },
                resolve : {
                  "User" : ["Session", function(Session){
                    try{
                      return Session.isValidSession();
                    }catch(e){
                      console.error(e);
                    }
                  }]
                }
            })
            // .state("home.main", {
            //     url: "/!",
            //     templateUrl: "app/beneficiary/views/beneficiaries.html",
            //     controller: "BeneficiaryListController",
            //     controllerAs: "blistCtrl",
            //     reloadOnSearch: false
            // })
            .state("landing", {
                url: "",
                abstract:true,
                templateUrl:"app/system/views/landing-page.html"
            })
            .state("landing.login", {
                url: "/login",
                templateUrl: "app/system/views/partials/login.html",
                controller: "LoginController",
                controllerAs: "loginCtrl",
                resolve : {
                  "User" : ["Session", function(Session){
                    try{
                    return Session.isInValidSession();
                    }catch(e){
                      console.error(e)
                    }

                  }]
                }
            })
            .state("landing.register", {
                url: "/register",
                templateUrl: "app/system/views/partials/register.html",
                controller: "RegistrationController",
                controllerAs: "regCtrl",
                resolve : {
                  "User" : ["Session", function(Session){
                    try{
                    return Session.isInValidSession();
                    }catch(e){
                      console.error(e)
                    }

                  }]
                }
            })
            .state("landing.404", {
                url: "/404",
                templateUrl: "app/system/views/404.html"
            })
            .state("landing.401", {
                url: "/401",
                templateUrl: "app/system/views/401.html"
            })
            .state("landing.profile", {
                url: "/profile",
                templateUrl: "app/system/views/user-profile.html",
                controller: "UserProfileController",
                controllerAs: "profCtrl",
                ncyBreadcrumb: {
                  label: "Profile"
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
            .state("home.changePassword", {
                url: "/change-password",
                templateUrl: "app/system/views/partials/change-password.html",
                controller: "ChangePasswordController",
                controllerAs: "chPassCtrl",
                ncyBreadcrumb: {
                  label: "change-password"
                }
            })
            .state("landing.forgotPassword", {
                url: "/forgot-password",
                templateUrl: "app/system/views/partials/forgot-password.html",
                controller: "ForgotPasswordController",
                controllerAs: "frPassCtrl"
            })
            .state("home.resetPassword", {
                url: "/reset-password",
                templateUrl: "app/system/views/partials/reset-password.html",
                controller: "ResetPasswordController",
                controllerAs: "resetPassCtrl",
                ncyBreadcrumb:{
                  label: "Reset Password"
                }
            })
            .state("home.profile", {
                url: "/profiles",
                templateUrl: "app/system/views/user-profile.html",
                controller: "UserProfileController",
                controllerAs: "profCtrl",
                ncyBreadcrumb: {
                  label: "Profile"
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
            .state("home.editProfile", {
                url: "/edit-profile",
                templateUrl: "app/system/views/edit-profile.html",
                controller: "EditProfileController",
                controllerAs: "edProCtrl",
                ncyBreadcrumb: {
                  label: "Profile"
                },
                resolve:{
                  "Countries": ["$q", "MasterDataService", function($q, MasterDataService) {
                    var defer = $q.defer();
                    $q.when(MasterDataService.getCountries()).then(function(data) {
                      defer.resolve(data);
                    });
                    return defer.promise;
                  }],
                  "UserProfile": ["$q", "Session", "UserService","$stateParams", function($q, Session, UserService, $stateParams) {
                    var defer = $q.defer();
                    var party_id = Session.getPartyId();
                    // var UserProfile = UserService.getUserCompleteProfile(party_id);
                    // UserProfile.then(function(response) {
                    //   console.log(response.data);
                    //   defer.resolve(response.data[0]);
                    // });
                    defer.resolve({});
                    return defer.promise;
                  }]
                }
            });
    }

})();
