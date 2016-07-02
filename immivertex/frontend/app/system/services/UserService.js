(function() {
    "use strict";

    angular
        .module("immiApp.system")
        .service("UserService", UserService);

    /**
     * @ngdoc Injector
     * @name UserService
     * @private
     * @module immiApp.System
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    UserService.$inject = [
      "$q",
      "UserDataService",
      "ToasterService",
      "$window",
      "$rootScope",
      "$location",
      "$state",
      "$http"
    ];

    /**
     * @ngdoc Service
     * @name UserService
     * @module immiApp.System
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function UserService($q, UserDataService,ToasterService, $window, $rootScope, $location, $state, $http) {
      var _self = this,
        storage = $window.localStorage,
        registeredUser = {},
        user = {};

      /**
       * @ngdoc function
       * @name afterLoginAction
       * @description
       * After user login he should be redirected to his
       * default home page according to his role.
       *
       */
      function afterLoginAction(loggedInUser, callback){
        if(!_.isEmpty(loggedInUser)) {
          UserDataService.getUserByPartyId({"party_id":loggedInUser.party_id}).then(function(response){
            user = response.data[0];
            $rootScope.$broadcast("user:loggedin", user);
            if(loggedInUser.is_dynamic_pass) {
              $state.go("home.resetPassword");
            } else {
              getLandingState(user);
            }
          });
        }
      };

      /**
       * @ngdoc function
       * @name getUserAfterLogin
       * @description
       * After user successfully logged in, get his detail
       * from server and continue to his default home page
       *
       */
       _self.getUserAfterLogin = function(queryParam, callback){

         var userQ = UserDataService.getUserByPartyId(queryParam);

         userQ.then(function success(response){
           user = response.data[0];
           $rootScope.$broadcast("user:loggedin", user);
           getLandingState(response.data[0]);
         }, function error(errResp){
           //callback(errResp.data);
         });

       }

       /**
        * @ngdoc function
        * @name registerUser
        * @description
        * Saves new user Information
        */
      _self.registerUser = function(user, successCallback, errorCallback) {
        var user =  UserDataService.registerUser(user);
        user.then(function (response) {
          ToasterService.toastSuccess("User Registeration successfully","Success");
          successCallback(response.data);
          registeredUser = response.data;
          $state.go("landing.profile");
        }, function(response){
          if(response.data["person.subdomain"] || response.data["email.email"]){
            errorCallback(response.data);
          } else {
            ToasterService.toastError("Something went wrong","Error");
          }
          errorCallback(response.data);
        });
      };

      /**
       * @ngdoc function
       * @name registerUser
       * @description
       * Gets locally registered user.
       */
     _self.getLocalRegisteredUser = function(user, successCallback) {
        return registeredUser;
     };

      /**
       * @ngdoc function
       * @name getRegisteredPartyId
       * @description
       * Gives registered user id
       */
      _self.getRegisteredPartyId = function(){
        if(!_.isEmpty(registeredUser)){
          return registeredUser.user.party_id;
        }
      };

      /**
       * @ngdoc function
       * @name saveCompleteProfile
       * @description
       * Saves user's profile Information
       */
      _self.saveCompleteProfile = function(user_profile, successCallback) {

        var user =  UserDataService.saveCompleteProfile(user_profile);
        user.then(function (response) {
          if(response.data.error){
            successCallback(response.data);
          } else {
            if($state.current.name == "landing.profile"){
              ToasterService.toastSuccess("User Profile has been saved successfully","Success");
              ToasterService.toastInfo("Please Login with your credentials which was sent to your email","Info");
              $state.go("landing.login");
            } else {
              ToasterService.toastSuccess("User Profile has been saved successfully","Success");
              successCallback(response.data);
            }
          }
        }, function(){
           ToasterService.toastError("Something went wrong","Error");
        });
      };

      /**
       * @ngdoc function
       * @name login
       * @description
       * Logins the user with given credentials
       *
       */
      _self.login = function(user, callback){
        var userQ = UserDataService.login(user);

        userQ.then(function success(response){
          console.log(response);
      		if(response.data[0].api_token){
            storage.setItem('api_access_token', response.data[0].api_token);
      			$http.defaults.headers['apitoken'] = response.data[0].api_token;
      		}
          afterLoginAction(response.data[0], callback);
        }, function error(errResp){
          callback(errResp.data);
        });
      }

      /**
       * @ngdoc function
       * @name login
       * @description
       * Verify the current session with backend.
       * if not then it will be redirected to Login.
       *
       */
      _self.verifySession = function(queryParam){
        var userQ = UserDataService.getUserByPartyId(queryParam),
          defer = $q.defer();

        userQ.then(function success(response){
          $rootScope.$broadcast("user:loggedin", response.data[0]);
          user = response.data[0];
          defer.resolve({});
        }, function error(errResp){
          $location.path("/login")
        });

        return defer.promise;
      }

      /**
       * @ngdoc function
       * @name checkEmailAvailability
       * @description
       * Checks for availability of email
       *
       */
      _self.checkEmailAvailability = function(queryParam, callback){
        var checkemail = UserDataService.checkEmailAvailability(queryParam);
        checkemail.then(function(response){
          callback(response.data);
        },function(response){
          callback(response.data)
        });
      };

      /**
       * @ngdoc function
       * @name checkSubdomainAvailability
       * @description
       * Checks for availability of subdomains
       *
       */
      _self.checkSubdomainAvailability = function(queryParam, callback){
        var checksubdomain = UserDataService.checkSubdomainAvailability(queryParam);
        checksubdomain.then(function(response){
          callback(response.data);
        },function(response){
          callback(response.data);
        });
      }

      /**
       * @ngdoc function
       * @name getUserCompleteProfile
       * @description
       * Gets user details
       *
       */
      _self.getUserCompleteProfile = function(){
        return UserDataService.getUserCompleteProfile(user.id);
      }

      /**
       * @ngdoc function
       * @name constructQueryParam
       * @description
       *
       *
       */
      _self.constructQueryParam = function(party_id) {
        var queryParam = {};
        queryParam.party_id = party_id;
        return queryParam;
      };

      /**
       * @ngdoc function
       * @name updateProfile
       * @description
       * updates user's profile Information
       */
      _self.updateProfile = function(user_profile, callback) {
        var user =  UserDataService.updateProfile(user_profile);
        user.then(function (response) {
            getLandingState(user_profile);
            ToasterService.toastSuccess("User Profile has been saved successfully","Success");
            callback(response.data);
        }, function(){
           ToasterService.toastError("Something went wrong","Error");
        });
      };

      /**
       * @ngdoc function
       * @name getResetPasswordLink
       * @description
       * Send reset password link given mail id
       */
      _self.getResetPasswordLink = function(queryParam, callback){
        var forgotPassword = UserDataService.getResetPasswordLink(queryParam);
        forgotPassword.then(function(response){
          ToasterService.toastSuccess("Please Login with your credentials which was sent to your email","Success");
          $state.go("landing.login");
          callback(response.data);
        }, function(response){
          callback(response.data)
        })
      };

      /**
       * @ngdoc function
       * @name updatePassword
       * @description
       * Updates new password
       */
      _self.updatePassword = function(queryParam, callback) {
        console.log(user.id);
        queryParam.party_id = user.id;
        queryParam.updated_by = user.id;
        var newPassword = UserDataService.updatePassword(queryParam);
        newPassword.then(function(response){
          ToasterService.toastSuccess("Password has been changed successfully", "Success");
          callback(response);
          getLandingState(user);
        }, function(response) {
          ToasterService.toastError("Something went wrong", "Error");
          callback(response);
        })
      };

      /**
       * @ngdoc function
       * @name getLandingState
       * @description
       *
       */
      function getLandingState(user) {
        if(!_.isEmpty(user["corporation"])){
          $state.go('home.corporation');
        }else if(user['party_type'].accesscode == "corporation_law_firm" || user['party_type'].accesscode == "law_firm_corporation"){
          $state.go('home.beneficiaries');
        }else if(!_.isEmpty(user["law_firm"])){
          $state.go('home.lawfirm');
        }else if(!_.isEmpty(user["person"]) && user['party_type'].code == "beneficiary"){
          $location.path("/beneficiary/"+ user.id +"/");
        }else if(!_.isEmpty(user["party_det"]) && user['party_type'].accesscode == "party"){
          $state.go('home.beneficiaries');
        }else if(user['party_type'].accesscode == "system_administrator"){
          $state.go('home.subscribers');
        }else{
          if(_.isEmpty(user["corporation"]) || _.isEmpty(user["law_firm"]) || user['party_type'].code == "corporation" || user['party_type'].code == "lawfirm"){
            $state.go('home.profile');
          }
          // else{
          //   $state.go('home.resetPassword');
          // }
        }
      };

      /**
       * @ngdoc function
       * @name skipResetPassword
       * @description
       * Moves to next page without completing reset password
       */
      _self.skipResetPassword = function() {
        getLandingState(user);
      };

      /**
       * @ngdoc function
       * @name changePassword
       * @description
       * changes password
       */
      _self.changePassword = function(password, callback) {
        password.party_id = user.id;
        password.updated_by = user.id;
        var changePass = UserDataService.changePassword(password);
        changePass.then(function(response) {
          getLandingState(user);
          callback(response.data);
          ToasterService.toastSuccess("Password has been changed successfully", "Success");
        }, function(response) {
          ToasterService.toastError("In changing password", "Error");
          callback(response.data)
        });
      };

      /**
       * @ngdoc function
       * @name viewAllCommunication
       * @description
       * Gets latest notifications
       */
      _self.viewAllCommunication = function(callback) {
        var communications = UserDataService.viewAllCommunication();
        communications.then(function(response) {
          callback(response.data);
        });
      };

    }
})();
