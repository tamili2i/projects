(function() {
    "use strict";

    angular
        .module("immiApp.lawfirm")
        .controller("LawfirmFormController", LawfirmFormController);

    /**
     * @ngdoc Injector
     * @name LawfirmFormController
     * @private
     * @module immiApp.lawfirm
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    LawfirmFormController.$inject = [
      "PlacesFactory",
      "Utils",
      "LawFirm",
      "Title",
      "AddressTypes",
      "LawfirmService",
      "MasterDataService",
      "$rootScope",
      "$state",
      "$log"
    ];

    /**
     * @ngdoc Controller
     * @name LawfirmFormController
     * @module immiApp.lawfirm
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function LawfirmFormController(PlacesFactory, Utils, LawFirm, Title, AddressTypes, LawfirmService, MasterDataService, $rootScope, $state, $log) {
        var vm = this;

        vm.lawfirm = LawFirm;
        vm.titles = Title.data;

        /**
         * @ngdoc function
         * @name save
         * @param lawfirm_id
         * @param event
         * @description
         * Saves the Lawfirm information
         *
         */
        vm.save = function(event, lawFirmForm){
          LawfirmService.saveLawfirm(vm.lawfirm, function successCallback(data){
            $log.info("Lawfirm info save success!!!!");
          },function errorCallback(response){
            $log.error("Lawfirm info save failed!!!!");
            if(response["email.email"]){
              lawFirmForm.email.$setValidity("availability", false);
            }
            if(response["federal_employer_id"]){
              lawFirmForm.federalEmployerId.$setValidity("availability", false);
            }
            if(response["attorney.bar_id"]){
              lawFirmForm.barId.$setValidity("availability", false);
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
            vm.places.getAppIDsForAddress(location.longName, vm.lawfirm.address, function(address){
              vm.places.metaLocation = location.longName;
              console.log("States and cities fetched according to google places");
            });
        };

        /**
         * @ngdoc function
         * @name resetAddressModel
         * @description
         * Resets lawFirm when country changes
         *
         */
        vm.resetAddressModel = function() {
          vm.lawfirm.address.location.state_id = null;
          vm.lawfirm.address.location.city_id = null;
          vm.places.locationFinder = null;
        };

        /**
         * @ngdoc function
         * @name getState
         * @description
         * returns current state name
         *
         */
        var getStateName = function() {
          vm.lawfirm.address = vm.lawfirm.address ? vm.lawfirm.address : Utils.getAddressModel(AddressTypes, "Law Firm", null);
          vm.places = Utils.createPlaceInstance(vm.lawfirm.address, PlacesFactory);

          if(vm.lawfirm.id) {
            //Fetch list of states and cities for selected country in edit mode
            //vm.places.getStatesAndCities(vm.lawfirm.address.location.country_id, vm.lawfirm.address.location.state_id);
            vm.title = "Edit";
            return vm.lawfirm.party_id;
          } else {
            vm.title = "Create";
            return vm.title;
          }
        };

        /**
         * @ngdoc function
         * @name setAvailability
         * @param element
         * @description
         * Sets availability validation to true
         *
         */
        vm.setAvailability = function(element) {
          element.$setValidity("availability", true);
        }

        /**
         * @ngdoc function
         * @name init
         * @description
         * Initiates Law Firm form
         *
         */
        var init = function(){
          $rootScope.state = getStateName();
        };

        init();
    }
})();
