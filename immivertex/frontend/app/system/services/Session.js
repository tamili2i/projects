(function() {
  "use strict";

  angular
    .module("immiApp.system")
    .factory("Session", Session);


  /**
   * @ngdoc Injector
   * @name SessionName
   * @private
   * @module immiApp.system
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  Session.$inject = ["$q", "$window", "$rootScope", "$state", "$location", "UserService", "ToasterService", "HTTPFactory", "$http"];

  /**
   * @ngdoc Factory
   * @name FactoryName
   * @module immiApp.system
   * @requires
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  function Session($q, $window, $rootScope, $state, $location, UserService, ToasterService, HTTPFactory, $http) {

    var party_id = 3,
      user = {},
      user_name = "Anonymous Name",
      storage = $window.localStorage,
      role_name = "corporation",
      accessMenu = [],
      fromCase = false,
      accessType = false;


    $rootScope.$on("user:loggedin", function(targetScope, loggedInUser) {
      storage.setItem("party", loggedInUser.id);
      user = loggedInUser;
    });

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
      var landing = ["landing.login","landing.profile", "landing.register"];
      if (landing.indexOf(toState.name) > -1) {
        if (getPartyFromStorage()) {
          event.preventDefault();
          if (!_.isEmpty(fromState)) {
            $state.go(fromState.name);
          } else {
            UserService.getUserAfterLogin({
              "party_id": getPartyFromStorage()
            });
          }
        }else if(("landing.profile").indexOf(toState.name) > -1){
          if(_.isEmpty(UserService.getLocalRegisteredUser())){
            event.preventDefault();
            $state.go("landing.login");
            ToasterService.toastInfo("You have refreshed/tried to load profile. You can login to edit your profile", "Info");
          }
        }
      }else if (toState.name.indexOf("home.") > -1) {
        if (!getPartyFromStorage()) {
          event.preventDefault();
          $state.go("landing.login");
        }
      }
    })

    return {
      "getPartyId": getPartyId,
      "getUpdatedBy": getUpdatedBy,
      "getCreatedBy": getPartyId,
      "getName": getName,
      "isValidSession": isValidSession,
      "isInValidSession": isInValidSession,
      "clearSession": clearSession,
      "getPartyType": getPartyType,
      "getAccessMenu" : getAccessMenu,
      "getRole" : getRole,
      "isActionGranted" : isActionGranted,
      "setPageRedirection": setPageRedirection,
      "getPageRedirection": getPageRedirection,
      "getAccessModules": getAccessModules,
      "getPartyDetail": getPartyDetail,
      "getPartyAccessCode": getPartyAccessCode,
      "setSideMenu": setSideMenu,
      "getSideMenu": getSideMenu,
      "setAccessType": setAccessType,
      "getAccessType": getAccessType
    };

    /**
     * @ngdoc function
     * @name getPartyId
     * @description
     * returns the current users ID
     *
     */
    function getPartyId() {
      return user.id;
    }

    /**
     * @ngdoc function
     * @name getUpdatedBy
     * @description
     * Returns the current user's ID
     *
     */
    function getUpdatedBy() {
      return user.id;
    }

    /**
     * @ngdoc function
     * @name getName
     * @description
     * Returns current user's name
     *
     */
    function getName() {
      // if(!_.isEmpty(user.corporation)){
      //   return user.corporation.name;
      // }else if(!_.isEmpty(user.law_firm)){
      //   return user.law_firm.name;
      // }
      if(!_.isEmpty(user.person) && !_.isEmpty(user.person.legal_name_of_entity)){
       return user.person.legal_name_of_entity;
      }else{
       return "Anonymous";
      }
    }

    /**
     * @ngdoc function
     * @name getPartyType
     * @description
     * Get type party who has
     * logged IN.
     *
     */
    function getPartyType() {
      if(!_.isEmpty(user)){
        return user.party_type.code;
      }
    }

    /**
     * @ngdoc function
     * @name getPartyType
     * @description
     * Get type party who has
     * logged IN.
     *
     */
    function getPartyAccessCode() {
      if(!_.isEmpty(user)){
        return user.party_type.accesscode;
      }
    }

    /**
     * @ngdoc function
     * @name getPartyDetail
     * @description
     * Get party detail who has
     * logged IN.
     *
     */
    function getPartyDetail() {
      if(!_.isEmpty(user)){
        return user.party_det;
      }
    }

    /**
     * @ngdoc function
     * @name getPartyFromStorage
     * @description
     * Returns the user id which is locally
     * stored in browser.
     *
     */
    function getPartyFromStorage() {
      return parseInt(storage.getItem("party"));
    }

    /**
     * @ngdoc function
     * @name isValidSession
     * @description
     * Checks for current user has valid session
     *
     */
    function isValidSession() {
      if (getPartyFromStorage() && !_.isEmpty(user)) {
        return user;
      } else if (getPartyFromStorage()) {
        return UserService.verifySession({
          "party_id": getPartyFromStorage()
        });
      } else {
        $location.path("/login");
        //$window.location.reload();
      }
    }

    /**
     * @ngdoc function
     * @name isInValidSession
     * @description
     * if user has valid session,
     * but still trying to moving to login
     * page. So he should not be allowed to
     * login page. Instead he should logged into
     * their default page.
     *
     */
    function isInValidSession() {
      if (getPartyFromStorage()) {
        UserService.getUserAfterLogin({
          "party_id": getPartyFromStorage()
        });
      }
    }

    function setSideMenu(menu){
      accessMenu = menu;
    }

    function getSideMenu(){
      return accessMenu;
    }

    function getAccessMenu(){
      console.log("Logged in User::",user);
      var party_id = "";
      if(getRole() === "corporation" || getPartyAccessCode() == "law_firm"){
        party_id = user.id;
      }else {
        party_id = user.owned_by;
      }
      return HTTPFactory.call({
            "url": "/user/access-roles/showModulesByCode/"+user.party_type.code+"/"+party_id,
            method: "GET"
          });
    }

    function getAccessModules(){
      return HTTPFactory.call({
        url: "/user/access-roles/showModulesList",
        method: "GET"
      });
    }

    function getRole(){
      //return "attorney";
      return user.party_type.code ? user.party_type.code : null;
      //return "beneficiary";
    }

    /**
     * @ngdoc function
     * @name isActionGranted
     * @param {String} moduleName
     * @description
     * Returns action is permitted or not
     * currently we don't have access rights for action level
     * So we just checking for create and edit
     *
     */
    function isActionGranted(moduleName){
      var module = _.filter(getAccessMenu(), function(item) {
        return item.modeuledet.module_name === moduleName;
      })[0];

      if(module){
        if(module.access_edit){
          return true;
        }else{
          return false;
        }
      }else{
        return false;
      }
    }

    /**
     * @ngdoc function
     * @name clearSession
     * @description
     * Clears the session and redirects to
     * login page.
     *
     */
    function clearSession() {
      storage.setItem("party", null);
      user = {};
      ToasterService.toastSuccess("Logged out successfully", "Success");
      $state.go("landing.login")
    }

    function setPageRedirection(value) {
      fromCase = value;
    }

    function getPageRedirection() {
      return fromCase;
    }

    function setAccessType(value) {
      accessType = value;
    }

    function getAccessType() {
      return accessType;
    }
  }
})();
