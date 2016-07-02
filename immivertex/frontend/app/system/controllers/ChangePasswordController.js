(function() {
    "use strict";

    angular
        .module("immiApp.system")
        .controller("ChangePasswordController", ChangePasswordController);

    /**
     * @ngdoc Injector
     * @name ChangePasswordController
     * @private
     * @module immiApp.system
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    ChangePasswordController.$inject = [
      "UserService",
      "Session",
      "$state"
    ];

    /**
     * @ngdoc Controller
     * @name ChangePasswordController
     * @module immiApp.system
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function ChangePasswordController(UserService, Session, $state) {
        var vm = this;

        vm.password = {};
        /**
         * @ngdoc function
         * @name checkPasswordMatch
         * @param changePassForm
         * @description
         * Checks new password and confirm password are same
         */
        vm.checkPasswordMatch = function(changePassForm){
          if(vm.password && vm.confirmPassword) {
            if(vm.password.new_password === vm.confirmPassword){
              changePassForm.confirmPassword.$setValidity("passnotmatch", true);
            } else {
              changePassForm.confirmPassword.$setValidity("passnotmatch", false);
            }
          }
        };

        /**
         * @ngdoc function
         * @name changePassword
         * @param changePassForm
         * @description
         * Changes password with new password
         */
        vm.changePassword = function(changePassForm) {
          UserService.changePassword(vm.password, function(response){
            console.log(response);
            if(response["password"]){
              changePassForm.oldPassword.$setValidity("wrongPass", false);
            }
          })
        };

        /**
         * @ngdoc function
         * @name setWrongPass
         * @param element
         * @description
         * Hides error message
         */
        vm.setWrongPass = function(element) {
          element.$setValidity("wrongPass", true);
        }

        /**
         * @ngdoc function
         * @name getDashboard
         * @description
         * Gets dashboard url
         *
         */
        vm.getDashboard = function() {
          if(Session.getPartyType() === "corporation") {
            $state.go("home.corporation");
          } else {
            $state.go("home.lawfirm");
          }
        };
    }
})();
