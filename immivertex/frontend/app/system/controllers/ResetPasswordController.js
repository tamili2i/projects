(function() {
    "use strict";

    angular
        .module("immiApp.system")
        .controller('ResetPasswordController', ResetPasswordController);

    /**
     * @ngdoc Injector
     * @name ResetPasswordController
     * @private
     * @module immiApp.system
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    ResetPasswordController.$inject = [
      "UserService"
    ];

    /**
     * @ngdoc Controller
     * @name ResetPasswordController
     * @module immiApp.system
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function ResetPasswordController(UserService) {
      var vm = this;

      /**
       * @ngdoc function
       * @name checkPasswordMatch
       * @description
       * Checks new password and confirm password are same
       */
      vm.checkPasswordMatch = function(resetPassword){
        if(vm.user.password === vm.confirmPassword){
          resetPassword.confirmPassword.$setValidity("passnotmatch", true);
        } else {
          resetPassword.confirmPassword.$setValidity("passnotmatch", false);
        }
      };

      /**
       * @ngdoc function
       * @name updatePassword
       * @description
       * Changes password of user
       */
      vm.updatePassword = function() {
        UserService.updatePassword(vm.user, function callback(response) {
          console.log(response);
        })
      };

      /**
       * @ngdoc function
       * @name skipResetPassword
       * @description
       * Moves to next screen
       */
      vm.skipResetPassword = function() {
        UserService.skipResetPassword(function(){
          console.log("skip");
        });
      };
    }
})();
