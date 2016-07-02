(function() {
    "use strict";

    angular
        .module("immiApp.intakeform")
        .controller("DerivativeFamilyFormController", DerivativeFamilyFormController);

    /**
     * @ngdoc Injector
     * @name DerivativeFamilyFormController
     * @private
     * @module immiApp.intakeform
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    DerivativeFamilyFormController.$inject = [
      "$scope",
      "DerivativeFamily",
      "$theme",
      "$rootScope",
      "PlacesFactory",
      "Title",
      "Citizen",
      "Gender",
      "Utils",
      "Session",
      "Relations"
    ];

    /**
     * @ngdoc DerivativeFamilyFormController
     * @name DerivativeFamilyFormController
     * @module immiApp.intakeform
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function DerivativeFamilyFormController($scope, DerivativeFamily, $theme, $rootScope, PlacesFactory, Title, Citizen, Gender, Utils, Session, Relations) {
        var vm = this;

        vm.derivativeFamily = DerivativeFamily;
        vm.citizenship_countries = Citizen.data;
        vm.titles = Title.data;
        vm.genders = Gender;
        vm.relations = Relations.data;

        /**
         * @ngdoc function
         * @name locationCallback
         * @param {object}location
         * @description
         * Gets location based on user search
         *
         */
        vm.locationCallback = function(location) {
          vm.places.getAppIDsForAddress(location.longName, vm.derivativeFamily.birth_address, function(address){
            vm.places.metaLocation = location.longName;
            console.log("States and cities fetched according to google places");
          });
        };

        /**
         * @ngdoc function
         * @name resetAddressModel
         * @description
         * Resets birthInfo when country changes
         *
         */
        vm.resetAddressModel = function() {
          vm.derivativeFamily.birth_address.location.state_id = null;
          vm.derivativeFamily.birth_address.location.city_id = null;
          vm.places.locationFinder = null;
        };

         /**
          * @ngdoc function
          * @name save
          * @param evt
          * @description
          * Saves IntakeForm's general information
          *
          */
         vm.save = function(evt) {
           evt.preventDefault();
         };

          /**
           * @ngdoc function
           * @name getStateName
           * @description
           * returns current state name
           *
           */
          var getStateName = function() {
            vm.derivativeFamily.birth_address = vm.derivativeFamily.birth_address ? vm.derivativeFamily.birth_address : Utils.getAddressModel();
            vm.places = Utils.createPlaceInstance(vm.derivativeFamily.birth_address, PlacesFactory);

            if(vm.derivativeFamily.id) {
              vm.title = "Edit";
              return vm.derivativeFamily.party_id;
            } else {
              vm.title = "Create";
              return vm.title;
            }
          };

        /**
         * @ngdoc function
         * @name init
         * @description
         * Initiates IntakeForm
         *
         */
        var init = function(){
          $theme.set("leftbarCollapsed", true);
          $rootScope.state = getStateName();
        };

        init();

    }
})();
