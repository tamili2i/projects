(function() {
    "use strict";

    angular
        .module("immiApp.UserManagement")
        .controller("CreateUserRoleController", CreateUserRoleController);

    /**
     * @ngdoc Injector
     * @name CreateUserRoleController
     * @private
     * @module immiApp.UserManagement
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    CreateUserRoleController.$inject = [
      "$rootScope",
      "$state",
      "UserRole",
      "UserManagementService",
      "Session",
      "$scope"
    ];

    /**
     * @ngdoc Controller
     * @name CreateUserRoleController
     * @module immiApp.UserManagement
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function CreateUserRoleController($rootScope, $state, UserRole, UserManagementService, Session, $scope) {
        var vm = this;
        vm.userRole = UserRole;
        /**
         * @ngdoc function
         * @name getState
         * @description
         * returns current state name
         *
         */
        var getStateName = function() {
          if(vm.userRole.id) {
            vm.title = "Edit";
            return vm.userRole.id;
          } else {
            vm.title = "Create";
            return vm.title;
          }
        };

        /**
         * @ngdoc function
         * @name loadingRoleForm
         * @description
         * Initiate role form
         *
         */
        vm.loadingRoleForm = function() {
          $(".create-container").collapse("toggle");
         };

         /**
          * @ngdoc function
          * @name saveUserRole
          * @description
          * Saves  new user Role Information
          *
          */
        vm.saveUserRole = function(evt) {
          evt.preventDefault();
          vm.userRole.updated_by = Session.getUpdatedBy();
          vm.userRole.created_by = Session.getCreatedBy();
          console.log("User role JSON: ",vm.userRole);
          UserManagementService.saveUserRole(vm.userRole, function successCallback(response) {
            console.log("User Role Saved");
            $scope.$emit('Update:UserRoleList');
          });
        };

        /**
         * @ngdoc function
         * @name init
         * @description
         * Initiates Role form
         *
         */
        var init = function() {
          vm.loadingRoleForm();
          $rootScope.state = getStateName();
        };

        init();
    }
})();
