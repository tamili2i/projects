(function() {
  "use strict";

  angular
    .module("immiApp.UserManagement")
    .service("UserManagementService", UserManagementService);

  /**
   * @ngdoc Injector
   * @name UserManagementService
   * @private
   * @module immiApp.UserManagement
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  UserManagementService.$inject = [
    "UserManagementDataService",
    "ToasterService",
    "Session",
    "RoleBasedModuleComputeService",
    "$state"
  ];

  /**
   * @ngdoc Service
   * @name UserManagementService
   * @module immiApp.UserManagement
   * @requires
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  function UserManagementService(UserManagementDataService, ToasterService, Session, RBMComputeService, $state) {
    var _self = this;

    /**
     * @ngdoc function
     * @name constructAccessRightForSave
     * @param {Array} accessRightsByModule
     * @param {Number} roleId
     * @description
     * Server accepts the JSON structure in different
     * currently we have used different structure view.
     * So here just getting ready the request body to the server
     * @return {array} accessRights.
     */
    function constructAccessRightForSave(accessRightsByModule, roleId) {
      var accessRight = {},
        accessRights = [],
        temp = {};
      for (var i = 0; i < accessRightsByModule.length; i++) {
        temp = {};
        accessRight = accessRightsByModule[i];
        temp.id = accessRight.id ? accessRight.id : null;
        //temp.access_role_id = roleId
        temp.role_id = roleId;
        //temp.access_module_id = accessRight.modeuledet.id;
        temp.module_id = accessRight.modeuledet.id;
        temp.access_view = accessRight.access_view ? accessRight.access_view : 0;
        temp.access_edit = accessRight.access_edit ? accessRight.access_edit : 0;

        //When edit access granted, it also applicable for Create.
        temp.access_create = accessRight.access_edit ? accessRight.access_edit : 0;
        accessRights.push(temp);
      }
      return accessRights;
    }

    /**
     * @ngdoc function
     * @name constructAccesRightsForInitialSave
     * @param {Object} role
     * @param {Array} modules
     * @description
     * If no access rights were defined for given role, then default
     * modules allocated for given role will be constructed and that
     * will be used for displaying.
     * @return {array} accessRights.
     */
    function constructAccesRightsForInitialSave(role, modules) {
      var filteredModules = RBMComputeService.getModulesByRole(role, modules),
        modulesToBeDisplayed = [],
        temp = {};

      for (var i = 0; i < filteredModules.length; i++) {
        temp = {};
        temp.modeuledet = {};
        temp.modeuledet.id = filteredModules[i].id;
        temp.modeuledet.module_name = filteredModules[i].module_name;
        modulesToBeDisplayed.push(temp);
      }
      return modulesToBeDisplayed;
    }

    /**
     * @ngdoc function
     * @name getUserRolesList
     * @description
     * Gets list of UserRole
     *
     */
    _self.getUserRoleList = function(queryParam, successCallback) {
      var UserRole = UserManagementDataService.getUserRoleList(queryParam);
      UserRole.then(function(response) {
        console.log(response);
        successCallback(response.data);
      }, function(data) {
        console.log(data);
      });
    };

    /**
     * @ngdoc function
     * @name saveUserRole
     * @param {object} userRole
     * @param {function} successCallback
     * @description
     * Creates new user role
     *
     */
    _self.saveUserRole = function(userRole, successCallback) {
      var userRole = UserManagementDataService.saveUserRole(userRole);
      userRole.then(function(response) {
        ToasterService.toastSuccess("User Role created successfully", "Success");
        successCallback(response.data);
        $state.go("home.roles");
      }, function() {
        ToasterService.toastError("Something went wrong", "Error");
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
      return UserManagementDataService.getUserRole(roleId);
    };

    /**
     * @ngdoc function
     * @name getUserRoles
     * @param queryParam icludes logged in user role type
     * @description
     * Gets all user roles
     *
     */
    _self.getUserRoles = function(queryParam) {
      return UserManagementDataService.getUserRoles(queryParam);
    };

    /**
     * @ngdoc function
     * @name constructQueryParam
     * @param {String} roleType includes logged in user role
     * @description
     *
     *
     */
    _self.constructQueryParam = function(roleType) {
      var queryParam = {};
      queryParam.code = roleType;
      return queryParam;
    };

    /**
     * @ngdoc function
     * @name getModules
     * @description
     * Gets list of modules
     *
     */
    _self.getModules = function() {
      return UserManagementDataService.getModules();
    };

    /**
     * @ngdoc function
     * @name saveAccessRightsByRole
     * @param {Object} accessRightsByModule - access rights from view
     * @param {Object} role - role selected from view
     * @param {Function} successCallback
     * @param {Function} errorCallback
     * @description
     * Save access rights for selected role.
     * before saving, request body will be constructed.
     */
    _self.saveAccessRightsByRole = function(accessRightsByModule, role, successCallback, errorCallback) {

      var accessRights = constructAccessRightForSave(accessRightsByModule, role.id),

        toBeSaved = {
          "party_id": Session.getPartyId(),
          "updated_by": Session.getPartyId(),
          "created_by": Session.getPartyId(),
          "AccessModule": accessRights
        },

        accessRightsQ = UserManagementDataService.saveAccessRightsByRole(toBeSaved);

      accessRightsQ.then(function(response) {
        ToasterService.toastSuccess("Access rights saved successfully", "Success");
        successCallback(response.data);
      }, function(errResponse) {
        errorCallback();
      });
    };


    /**
     * @ngdoc function
     * @name getAccessRightsByRole
     * @param {Object} role
     * @param {Array} modules
     * @param {Function} successCallback
     * @param {Function} errorCallback
     * @description
     * Gets access rights with modules by role.
     * If Access Rights has not defined, then modules for
     * particular role will be computed and sent to callback
     *
     */
    _self.getAccessRightsByRole = function(role, modules, successCallback, errorCallback) {
      var accessRights = UserManagementDataService.getAccessRightsByRole(role.id, Session.getPartyId());

      accessRights.then(function(response) {
        if (response.data.length > 0){
          successCallback(response.data);
        } else {
          var modulesToBeDisplayed = constructAccesRightsForInitialSave(role, modules);
          successCallback(modulesToBeDisplayed);
        }
      }, function(errResponse) {
        errorCallback();
      })
    };
  }
})();
