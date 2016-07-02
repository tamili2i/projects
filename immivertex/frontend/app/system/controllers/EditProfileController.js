(function() {
    "use strict";

    angular
        .module("immiApp.system")
        .controller("EditProfileController", EditProfileController);

    /**
     * @ngdoc Injector
     * @name EditProfileController
     * @private
     * @module immiApp.system
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    EditProfileController.$inject = [
      "Countries",
      "Utils",
      "PlacesFactory",
      "UserService",
      "$state"
    ];

    /**
     * @ngdoc Controller
     * @name EditProfileController
     * @module immiApp.system
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function EditProfileController(Countries, Utils, PlacesFactory, UserService, $state) {
        var vm = this;
        vm.user_profile = {};

        /**
         * @ngdoc function
         * @name updateProfile
         * @description
         * Get user details
         */
        vm.getUserProfile = function() {
          var UserProfile = UserService.getUserCompleteProfile();
          UserProfile.then(function(response) {
            console.log(response.data);
            vm.user_profile = response.data[0];
            vm.places = Utils.createPlaceInstance(vm.user_profile.address, PlacesFactory);
          });
        };
        /**
         * @ngdoc function
         * @name updateProfile
         * @description
         * Updates user information
         */
        vm.updateProfile = function(evt) {
          var user_profile = angular.copy(vm.user_profile);
          user_profile.phone = vm.user_profile.phone[0];
          user_profile.profile_type = vm.user_profile.party_type.code;
          user_profile.party_id = vm.user_profile.id;
          console.log(user_profile);
          UserService.updateProfile(user_profile, function callback(response){
            console.log("User update success");
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
          vm.places.getAppIDsForAddress(location.longName, vm.user_profile.address, function(address){
            vm.places.metaLocation = location.longName;
            console.log("States and cities fetched according to google places");
          });
        };

        /**
         * @ngdoc function
         * @name resetAddressModel
         * @description
         * Resets address when city changes
         *
         */
        vm.resetAddressModel = function() {
          vm.user_profile.address.location.state_id = null;
          vm.user_profile.address.location.city_id = null;
          vm.places.locationFinder = null;
        };

        /**
         * @ngdoc function
         * @name getDashboard
         * @description
         * Gets dashboard url
         *
         */
        vm.getDashboard = function() {
          if(vm.user_profile.party_type.code === "corporation") {
            $state.go("home.corporation");
          } else {
            $state.go("home.lawfirm");
          }
        };
        
        /**
         * @ngdoc function
         * @name init
         * @description
         * Initializes edit profile controller
         *
         */
        var init = function(){
          vm.getUserProfile();
        };

        init();
    }
})();
