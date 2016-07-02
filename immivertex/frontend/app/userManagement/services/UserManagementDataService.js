(function() {
    "use strict";

    angular
        .module("immiApp.UserManagement")
        .service("UserManagementDataService", UserManagementDataService);

    /**
     * @ngdoc Injector
     * @name UserManagementDataService
     * @private
     * @module immiApp.UserManagement
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    UserManagementDataService.$inject = [
      "$q",
      "$timeout",
      "UserRoleGridConfig", "HTTPFactory"
    ];

    /**
     * @ngdoc Service
     * @name UserManagementDataService
     * @module immiApp.UserManagement
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function UserManagementDataService($q, $timeout, UserRoleGridConfig, HTTPFactory) {

      var _self = this;

      /**
       * @ngdoc function
       * @name getUserRoleList
       * @param {object} queryParam
       * @description
       * Gets list of available user role with pagination
       *
       */
      _self.getUserRoleList = function(queryParam) {
        return HTTPFactory.call({
          url: "/user/access-roles",
          method: "GET",
          params: queryParam
        });
      };


      /**
       * @ngdoc function
       * @name saveUserRole
       * @param {object} userRole
       * @description
       * Creates new user role
       *
       */
      _self.saveUserRole = function(userRole) {
        return HTTPFactory.call({
          method: "POST",
          data: userRole,
          url: "/user/access-roles"
        });
      };

      /**
       * @ngdoc function
       * @name getUserRole
       * @param {number} roleId
       * @description
       * Gets particular user role
       *
       */
      _self.getUserRole = function(roleId) {
        return HTTPFactory.call({
          method: "GET",
          url: "/user/access-roles/showAccessRoleData/" + roleId
        });
      };

      /**
       * @ngdoc function
       * @name getUserRoles
       * @param queryParam icludes logged in user role type
       * @description
       * Gets all user role
       *
       */
      _self.getUserRoles = function(queryParam) {
        return HTTPFactory.call({
          method: "GET",
          url: "/user/access-roles/showAccessRoles",
          params: queryParam
        });
      };

      /**
       * @ngdoc function
       * @name getUserRoles
       * @description
       * Gets all user role
       *
       */
      _self.getAccessRightsByRole = function(roleId, partyId) {
        return HTTPFactory.call({
          method: "GET",
          url: "/user/access-roles/showModules/"+roleId+"/"+partyId
        });
      };

      /**
       * @ngdoc function
       * @name getUserRoles
       * @description
       * Gets all user role
       *
       */
      _self.saveAccessRightsByRole = function(rBody) {
        return HTTPFactory.call({
          method: "POST",
          url: "/user/access-roles/createAccessModules",
          data: rBody
        });
      };

      /**
       * @ngdoc function
       * @name getModules
       * @description
       * Gets list of modules
       *
       */
      _self.getModules = function() {
        return HTTPFactory.call({
          method: "GET",
          url: "/user/access-roles/showModulesList"
        });
      };

      return _self;

    }
})();
