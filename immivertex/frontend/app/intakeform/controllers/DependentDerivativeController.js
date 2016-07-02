(function() {
    "use strict";

    angular
        .module("immiApp.intakeform")
        .controller("DependentDerivativeController", DependentDerivativeController);

    /**
     * @ngdoc Injector
     * @name DependentDerivativeController
     * @private
     * @module immiApp.intakeform
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    DependentDerivativeController.$inject = [
      "Utils",
      "PlacesFactory"
    ];

    /**
     * @ngdoc Controller
     * @name DependentDerivativeController
     * @module immiApp.intakeform
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function DependentDerivativeController(Utils, PlacesFactory) {
        var vm = this;

        vm.dependentDerivative = {};
        /**
         * @ngdoc function
         * @name locationCallback
         * @param {object}location
         * @description
         * Gets location based on user search
         *
         */
        vm.locationCallback = function(location) {
            vm.places.getAppIDsForAddress(location.longName, vm.dependentDerivative.address, function(address){
              vm.places.metaLocation = location.longName;
              console.log("States and cities fetched according to google places");
            });
        };

        /**
         * @ngdoc function
         * @name resetAddressModel
         * @description
         * Resets dependentDerivative when country changes
         *
         */
        vm.resetAddressModel = function() {
          vm.dependentDerivative.address.location.state_id = null;
          vm.dependentDerivative.address.location.city_id = null;
          vm.places.locationFinder = null;
        };


        function init() {
          vm.dependentDerivative.address = vm.dependentDerivative.address ? vm.dependentDerivative.address : Utils.getAddressModel();
          vm.places = Utils.createPlaceInstance(vm.dependentDerivative.address, PlacesFactory);
        }
        init();


    }
})();
