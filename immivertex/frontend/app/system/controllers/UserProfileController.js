(function() {
  "use strict";

  angular
    .module("immiApp.UserManagement")
    .controller("UserProfileController", UserProfileController);

  /**
   * @ngdoc Injector
   * @name UserProfileController
   * @private
   * @module immiApp.UserManagement
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  UserProfileController.$inject = [
    "UserService",
    "Utils",
    "PlacesFactory",
    "$state",
    "Session",
    "$window",
    "ToasterService"
  ];

  /**
   * @ngdoc Controller
   * @name UserProfileController
   * @module immiApp.UserManagement
   * @requires
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  function UserProfileController(UserService, Utils, PlacesFactory, $state, Session, $window, ToasterService) {
    var vm = this;
    //console.log(UserProfile);


    vm.user_profile = {};

    /**
     * @ngdoc function
     * @name completeProfile
     * @param evt
     * @description
     * Saves users profile information
     */
    vm.completeProfile = function(evt, profileForm) {
      evt.preventDefault();
      if (vm.user_profile.profile_type == "corporation") {
        vm.user_profile.corporation.social_security_number = 58555;
        vm.user_profile.lawfirm = {
          "federal_employer_id": 58555,
          "social_security_number": 58555
        };
      } else {
        vm.user_profile.corporation = {
          "federal_employer_id": 58555,
          "social_security_number": 58555
        }
        vm.user_profile.lawfirm.federal_employer_id = 58555;
      }

      if ($state.current.name == "landing.profile") {
        vm.user_profile.party_id = UserService.getRegisteredPartyId();
        vm.user_profile.updated_by = UserService.getRegisteredPartyId();
      } else {
        vm.user_profile.party_id = Session.getPartyId();
        vm.user_profile.updated_by = Session.getPartyId();
      }

      UserService.saveCompleteProfile(vm.user_profile, function successCallback(response) {
        if(response["error"]){
          if (vm.user_profile.profile_type == "corporation") {
            profileForm.feinNo.$setValidity("availability", false);
          } else {
            profileForm.ssnNo.$setValidity("availability", false);
          }
        } else {
          console.log("Complete Profile Success" + response);
          $window.location.href = "/";
        }
      });
    };

    /**
     * @ngdoc function
     * @name locationCallback
     * @param {object}location
     * @description
     * Gets location based on user search
     *
     */
    vm.locationCallback = function(location) {
      vm.places.getAppIDsForAddress(location.longName, vm.user_profile.address, function(address) {
        vm.places.metaLocation = location.longName;
        console.log("States and cities fetched according to google places");
      });
    };


    vm.setAvailability = function(element){
      element.$setValidity("availability", true);
    };
    /**
     * @ngdoc function
     * @name init
     * @description
     * Initiates user profile form
     */
    var init = function() {
      vm.user_profile.profile_type = "corporation";
      if ($state.current.name == "landing.profile") {
        vm.state = true;
        if (_.isEmpty(UserService.getLocalRegisteredUser())) {
          $state.go("landing.login");
          ToasterService.toastInfo("You have refreshed/tried to load profile. You are not allowed to access. You can login to edit your profile", "Info");
        }
      }
      vm.user_profile.address = Utils.getAddressModel();
      vm.places = Utils.createPlaceInstance(vm.user_profile.address, PlacesFactory);
    };
    init();
  }
})();
