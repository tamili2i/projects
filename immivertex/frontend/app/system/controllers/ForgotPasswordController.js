(function() {
    "use strict";

    angular
        .module("immiApp.system")
        .controller("ForgotPasswordController", ForgotPasswordController);

    /**
     * @ngdoc Injector
     * @name ForgotPasswordController
     * @private
     * @module immiApp.system
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    ForgotPasswordController.$inject = [
      "UserService"
    ];

    /**
     * @ngdoc Controller
     * @name ForgotPasswordController
     * @module immiApp.system
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function ForgotPasswordController(UserService) {
      var vm = this;

      /**
       * @ngdoc function
       * @name getResetPasswordLink
       * @description
       * Send new login credentials to user
       */
      vm.getResetPasswordLink = function(forgotPassword){
        UserService.getResetPasswordLink(vm.user, function callback(response){
          console.log(response);
          if(response["email"]){
            forgotPassword.email.$setValidity("availability", false);
          }
        });
      }

      /**
       * @ngdoc function
       * @name setAvailability
       * @description
       * Sets availability error message to true
       */
      vm.setAvailability = function(element) {
        element.$setValidity("availability", true);
      }
    }
})();
