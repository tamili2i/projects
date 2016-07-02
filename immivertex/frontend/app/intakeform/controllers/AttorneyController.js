(function() {
    "use strict";

    angular
        .module("immiApp.intakeform")
        .controller("AttorneyController", AttorneyController);

    /**
     * @ngdoc Injector
     * @name AttorneyController
     * @private
     * @module immiApp.intakeform
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    AttorneyController.$inject = [
      "Utils",
      "PlacesFactory"
    ];

    /**
     * @ngdoc Controller
     * @name AttorneyController
     * @module immiApp.intakeform
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function AttorneyController(Utils, PlacesFactory) {
        var vm = this;

        vm.attorney = {};
        /**
         * @ngdoc function
         * @name locationCallback
         * @param {object}location
         * @description
         * Gets location based on user search
         *
         */
        vm.locationCallback = function(location) {
            vm.places.getAppIDsForAddress(location.longName, vm.attorney.address, function(address){
              vm.places.metaLocation = location.longName;
              console.log("States and cities fetched according to google places");
            });
        };

        /**
         * @ngdoc function
         * @name resetAddressModel
         * @description
         * Resets attorney when country changes
         *
         */
        vm.resetAddressModel = function() {
          vm.attorney.address.location.state_id = null;
          vm.attorney.address.location.city_id = null;
          vm.places.locationFinder = null;
        };


        function init() {
          vm.attorney.address = vm.attorney.address ? vm.attorney.address : Utils.getAddressModel();
          vm.places = Utils.createPlaceInstance(vm.attorney.address, PlacesFactory);
        }
        init();
    }
})();
