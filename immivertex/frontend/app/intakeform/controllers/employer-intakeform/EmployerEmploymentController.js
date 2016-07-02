(function() {
    "use strict";

    angular
        .module("immiApp.intakeform")
        .controller("EmployerEmploymentController", EmployerEmploymentController);

    /**
     * @ngdoc Injector
     * @name EmployerEmploymentController
     * @private
     * @module immiApp.intakeform
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    EmployerEmploymentController.$inject = [
      "Utils",
      "PlacesFactory"
    ];

    /**
     * @ngdoc Controller
     * @name EmployerEmploymentController
     * @module immiApp.intakeform
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function EmployerEmploymentController(Utils, PlacesFactory) {
        var vm = this;

        vm.employer = {};
        /**
         * @ngdoc function
         * @name locationCallback
         * @param {object}location
         * @description
         * Gets location based on user search
         *
         */
        vm.locationCallback = function(location) {
            vm.places.getAppIDsForAddress(location.longName, vm.employer.address, function(address){
              vm.places.metaLocation = location.longName;
              console.log("States and cities fetched according to google places");
            });
        };

        /**
         * @ngdoc function
         * @name resetAddressModel
         * @description
         * Resets employer when country changes
         *
         */
        vm.resetAddressModel = function() {
          vm.employer.address.location.state_id = null;
          vm.employer.address.location.city_id = null;
          vm.places.locationFinder = null;
        };


        function init() {
          vm.employer.address = vm.employer.address ? vm.employer.address : Utils.getAddressModel();
          vm.places = Utils.createPlaceInstance(vm.employer.address, PlacesFactory);
        }
        init();
    }
})();
