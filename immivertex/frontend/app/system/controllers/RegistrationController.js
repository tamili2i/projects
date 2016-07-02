(function() {
    "use strict";

    angular
        .module("immiApp.system")
        .controller("RegistrationController", RegistrationController);

    /**
     * @ngdoc Injector
     * @name ControllerName
     * @private
     * @module immiApp.system
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    RegistrationController.$inject = [
      "UserService",
      "Session",
      "$timeout"
    ];

    /**
     * @ngdoc Controller
     * @name RegistrationController
     * @module immiApp.system
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function RegistrationController(UserService, Session,$timeout) {
        var vm = this;

        vm.user = {};

        /**
          * @ngdoc function
          * @name registerUser
          * @description
          * registers user to system
          *
          */
        vm.registerUser = function(registerForm, evt){
          evt.preventDefault();
          vm.user.updated_by = 1;
          console.log("Register: ",vm.user);
          UserService.registerUser(vm.user, function successCallback(response) {
             console.log("Registration successfull");
             console.log(response);
           }, function errorCallback(response){
             if(response["email.email"]){
               registerForm.email.$setValidity("availability", false);
             }
             if(response["person.subdomain"]){
               registerForm.subdomain.$setValidity("availability", false);
             }
           });
        };

        /**
          * @ngdoc function
          * @name checkEmailAvailability
          * @description
          * Checks for availability of email
          *
          */
        vm.checkEmailAvailability = function(registerForm, evt){
          //evt.preventDefault();
          function checkEmailAvailability(){

          if(registerForm.email.$valid){
            vm.validEmail = true;
            var queryParam = {"emailid":vm.user.email.email};
            UserService.checkEmailAvailability(queryParam, function callback(data) {
              if(!data.error){
                registerForm.email.$setValidity("availability", false);
              }
              vm.validEmail = false;
            });
          }
        }
          $timeout(checkEmailAvailability, 20);

        };

        /**
          * @ngdoc function
          * @name checkSubdomainAvailability
          * @description
          * Checks for availability of subdomains
          *
          */
        vm.checkSubdomainAvailability = function(registerForm, evt){
          evt.preventDefault();
          if(registerForm.subdomain.$valid){
            vm.validSubdomain = true;
            var queryParam = {"subdomain":vm.user.person.subdomain};
            UserService.checkSubdomainAvailability(queryParam, function callback(data) {
              if(!data.error){
                registerForm.subdomain.$setValidity("availability", false);
              }
              vm.validSubdomain = false;
            });
          }
        };
        /**
          * @ngdoc function
          * @name setAvailability
          * @description
          * Hides availability error message
          *
          */
        vm.setAvailability = function(el) {
          el.$setValidity("availability", true);
        }
    }
})();
