(function() {
    "use strict";

    angular
        .module("immiApp.lawfirm")
        .controller("LawfirmViewController", LawfirmViewController);

    /**
     * @ngdoc Injector
     * @name LawfirmViewController
     * @private
     * @module immiApp.lawfirm
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    LawfirmViewController.$inject = [
      "PlacesFactory",
      "Utils",
      "LawFirm",
      "Title"
    ];

    /**
     * @ngdoc Controller
     * @name LawfirmViewController
     * @module immiApp.lawfirm
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function LawfirmViewController(PlacesFactory, Utils, LawFirm, Title) {
        var vm = this;

        /**
         * @ngdoc function
         * @name init
         * @description
         * Initiates Law Firm form
         *
         */
        var init = function(){
          LawFirm.attorney.person.title = _.where(Title.data,{"id":LawFirm.attorney.person.title})[0].name;
          vm.lawfirm = LawFirm;
          vm.lawfirm.address = vm.lawfirm.address ? vm.lawfirm.address : Utils.getAddressModel(AddressTypes, "Law Firm", null);
          vm.places = Utils.createPlaceInstance(vm.lawfirm.address, PlacesFactory);
        };

        init();
    }
})();
