(function() {
  "use strict";

  angular
    .module("immiApp.UserManagement")
    .controller("UserAccessController", UserAccessController);

  /**
   * @ngdoc Injector
   * @name UserAccessController
   * @private
   * @module immiApp.UserManagement
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  UserAccessController.$inject = [
    "UserManagementService",
    "UserRoles",
    "Modules"
  ];

  /**
   * @ngdoc Controller
   * @name UserAccessController
   * @module immiApp.UserManagement
   * @requires
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  function UserAccessController(UserManagementService, UserRoles, Modules) {
    var vm = this,
      modules = Modules;

    vm.roles = UserRoles;
    vm.role = {};

    vm.loadAccessRightsByRole = function(role){
      UserManagementService.getAccessRightsByRole(role, modules, function success(accessRights){
        vm.accessRights = accessRights;
      }, function error(){
        //TODO Error should be handled
        console.log("Handle Error");

      });
    }


    /**
     * @ngdoc function
     * @name save
     * @description
     * saves user access rights
     *
     */
    vm.save = function() {
      UserManagementService.saveAccessRightsByRole(vm.accessRights, vm.role, function success(){
        vm.accessRights = [];
        vm.role = [];
      }, function error(){
        //TODO Error should be handled
        console.log("Error while saving");
      })
    };

    /**
     * @ngdoc function
     * @name init
     * @description
     * initiates user access rights
     *
     */
    function init() {

    }

    init();
  }
})();
