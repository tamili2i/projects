(function() {
    "use strict";

    angular
        .module("immiApp.corporation")
        .controller("CorporationViewController", CorporationViewController);

    /**
     * @ngdoc Injector
     * @name CorporationViewController
     * @private
     * @module immiApp.corporation
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    CorporationViewController.$inject = [
      "PlacesFactory",
      "Utils",
      "Corporation",
      "AddressTypes"
    ];

    /**
     * @ngdoc Controller
     * @name CorporationViewController
     * @module immiApp.corporation
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function CorporationViewController(PlacesFactory, Utils, Corporation, AddressTypes) {
        var vm = this;

        vm.corporation = Corporation;

        /**
         * @ngdoc function
         * @name init
         * @description
         * Initiates Intake form
         *
         */
        var init = function(){
          vm.corporation.address = vm.corporation.address ? vm.corporation.address : Utils.getAddressModel(AddressTypes, "Corporation", null);
          vm.places = Utils.createPlaceInstance(vm.corporation.address, PlacesFactory);
        };

        init();
    }
})();
