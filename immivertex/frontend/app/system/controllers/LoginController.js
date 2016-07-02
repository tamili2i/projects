(function() {
    'use strict';

    angular
        .module('immiApp.system')
        .controller('LoginController', LoginController);

    /**
     * @ngdoc Injector
     * @name LoginController
     * @private
     * @module immiApp.system
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    LoginController.$inject = ["$scope", "Session", "UserService", "$state"];

    /**
     * @ngdoc Controller
     * @name LoginController
     * @module immiApp.system
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function LoginController($scope, Session, UserService, $state) {
        var vm = this;

        vm.user = {};

        /**
         * @ngdoc function
         * @name login
         * @param {object} evt - event object
         * @param {object} loginForm - login form
         * @description
         * Log into the System
         * If user credentials were wrong then it shows
         * error to User
         */
        vm.login = function(evt, loginForm){
          evt.preventDefault();
          $scope.$emit("loading:show");

          UserService.login(vm.user, function(err){
            if(err){
              loginForm.password.$setValidity("notmatch", false);
              loginForm.email.$setValidity("notmatch", false);
            }
            $scope.$emit("loading:hide");
          });
        };

        /**
         * @ngdoc function
         * @name setFieldValidity
         * @param loginForm
         * @description
         * Already we have shown some Error messages to User
         * So, if user start changing those values we should
         * hide those error messages
         */
        vm.setFieldValidity = function(loginForm){
          loginForm.password.$setValidity("notmatch", true);
          loginForm.email.$setValidity("notmatch", true);
        }


    }
})();
