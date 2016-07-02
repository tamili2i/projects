(function() {
  "use strict";

  angular
    .module("immiApp.system")
    .factory("UserDataService", UserDataService);

  /**
   * @ngdoc Injector
   * @name MasterDataService
   * @private
   * @module immiApp.system
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  UserDataService.$inject = ["HTTPFactory"];

  /**
   * @ngdoc Service
   * @name UserDataService
   * @module immiApp.system
   * @requires
   * @description
   *   This service gives list of countries and states.
   * @author Ideas2IT Technologies
   * @copyright
   */
  function UserDataService(HTTPFactory) {
    return {
      "registerUser": function(user){
        return HTTPFactory.call({
          url: "/user/registration",
          method: "POST",
          data: user
        });
      },
      "saveCompleteProfile": function(user){
        return HTTPFactory.call({
          url: "/user/registration/completeprofile",
          method: "POST",
          data: user
        });
      },
      "getUserByPartyId" : function(queryParam){
        return HTTPFactory.call({
          url: "/user/registration/showUserDetails",
          method: "GET",
          params: queryParam
        });
      },
      "login": function(user){
        return HTTPFactory.call({
          url: "/user/user/login",
          method: "POST",
          data: user
        });
      },
      "checkEmailAvailability": function(queryParam) {
        return HTTPFactory.call({
          url:"/emails/emailAvailability",
          method: "GET",
          params:queryParam
        })
      },
      "checkSubdomainAvailability": function(queryParam) {
        return HTTPFactory.call({
          url:"/user/registration/subdomainAvailability",
          method: "GET",
          params:queryParam
        })
      },
      "getUserCompleteProfile": function(party_id) {
        return HTTPFactory.call({
          url:"/user/registration/showfullprofile/"+ party_id,
          method: "GET"
        })
      },
      "updateProfile": function(user){
        return HTTPFactory.call({
          url: "/user/registration/editfullprofile/"+user.id,
          method: "POST",
          data: user
        });
      },
      "getResetPasswordLink": function(queryParam){
        return HTTPFactory.call({
          url: "/user/registration/forgetpassword",
          method: "GET",
          params: queryParam
        });
      },
      "updatePassword": function(user){
        return HTTPFactory.call({
          url: "/user/registration/passwordupdate",
          method: "POST",
          data: user
        });
      },
      "changePassword": function(password) {
        return HTTPFactory.call({
          url: "/user/registration/changePassword",
          method: "POST",
          data: password
        })
      },
      "viewAllCommunication": function() {
        return HTTPFactory.call({
          url: "/systemadmin/communication",
          method: "GET"
        });
      }
    }
  }
})();
