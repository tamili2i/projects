(function() {
    "use strict";

    angular
        .module("immiApp.intakeform")
        .controller("HrController", HrController);

    /**
     * @ngdoc Injector
     * @name HrController
     * @private
     * @module immiApp.intakeform
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    HrController.$inject = [
      "Utils",
      "PlacesFactory"
    ];

    /**
     * @ngdoc Controller
     * @name HrController
     * @module immiApp.intakeform
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function HrController(Utils, PlacesFactory) {
        var vm = this;

        vm.hr = {};
        /**
         * @ngdoc function
         * @name locationCallback
         * @param {object}location
         * @description
         * Gets location based on user search
         *
         */
        vm.locationCallback = function(location) {
            vm.places.getAppIDsForAddress(location.longName, vm.hr.address, function(address){
              vm.places.metaLocation = location.longName;
              console.log("States and cities fetched according to google places");
            });
        };

        /**
         * @ngdoc function
         * @name resetAddressModel
         * @description
         * Resets hr when country changes
         *
         */
        vm.resetAddressModel = function() {
          vm.hr.address.location.state_id = null;
          vm.hr.address.location.city_id = null;
          vm.places.locationFinder = null;
        };


        function init() {
          vm.hr.address = vm.hr.address ? vm.hr.address : Utils.getAddressModel();
          vm.places = Utils.createPlaceInstance(vm.hr.address, PlacesFactory);
        }
        init();


    }
})();
