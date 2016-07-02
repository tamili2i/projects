(function() {
    "use strict";

    angular
        .module("immiApp.intakeform")
        .controller("PetitionerGeneralController", PetitionerGeneralController);

    /**
     * @ngdoc Injector
     * @name PetitionerGeneralController
     * @private
     * @module immiApp.intakeform
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    PetitionerGeneralController.$inject = [
      "Utils",
      "PlacesFactory",
      "Gender"
    ];

    /**
     * @ngdoc Controller
     * @name PetitionerGeneralController
     * @module immiApp.intakeform
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function PetitionerGeneralController(Utils, PlacesFactory, Gender) {
        var vm = this;

        vm.general = {};
        vm.genders = Gender;
        /**
         * @ngdoc function
         * @name locationCallback
         * @param {object}location
         * @description
         * Gets location based on user search
         *
         */
        vm.locationCallback = function(location) {
          vm.places.getAppIDsForAddress(location.longName, vm.general.address, function(address){
            vm.places.metaLocation = location.longName;
            console.log("States and cities fetched according to google places");
          });
        };

        /**
         * @ngdoc function
         * @name resetAddressModel
         * @description
         * Resets petitioner general when country changes
         *
         */
        vm.resetAddressModel = function() {
          vm.general.address.location.state_id = null;
          vm.general.address.location.city_id = null;
          vm.places.locationFinder = null;
        };


        function init() {
          vm.general.address = vm.general.address ? vm.general.address : Utils.getAddressModel();
          vm.places = Utils.createPlaceInstance(vm.general.address, PlacesFactory);
        }
        init();

    }
})();
