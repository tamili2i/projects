(function() {
    "use strict";

    angular
        .module("immiApp.corporation")
        .controller("CorporationFormController", CorporationFormController);

    /**
     * @ngdoc Injector
     * @name CorporationFormController
     * @private
     * @module immiApp.corporation
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    CorporationFormController.$inject = [
      "PlacesFactory",
      "Utils",
      "Corporation",
      "AddressTypes",
      "$rootScope",
      "CorporationService",
      "$state"
    ];

    /**
     * @ngdoc Controller
     * @name CorporationFormController
     * @module immiApp.corporation
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function CorporationFormController(PlacesFactory, Utils, Corporation, AddressTypes, $rootScope, CorporationService, $state) {
        var vm = this;

        vm.corporation = Corporation;

        /**
         * @ngdoc function
         * @name save
         * @param event
         * @description
         * Saves the corporation information
         *
         */
        vm.save = function(event, corporationForm){
          CorporationService.saveCorporation(vm.corporation, function successCallback(response){
            console.log("Corporation info save sucess!!!!");
            if(response["error"]) {
              corporationForm.FederalEmpIdNumber.$setValidity("availability", false);
            }
          },function errorCallback(response){
            console.log("Corporation info save failed!!!!");
            if(response["email.email"]) {
              corporationForm.email.$setValidity("availability", false);
            }
            if(response["federal_employer_id"]) {
              corporationForm.FederalEmpIdNumber.$setValidity("availability", false);
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
           vm.places.getAppIDsForAddress(location.longName, vm.corporation.address, function(address){
             vm.places.metaLocation = location.longName;
             console.log("States and cities fetched according to google places");
           });
        };

        /**
         * @ngdoc function
         * @name resetAddressModel
         * @description
         * Resets corporation when country changes
         *
         */
        vm.resetAddressModel = function() {
          vm.corporation.address.location.state_id = "";
          vm.corporation.address.location.city_id = "";
          vm.places.locationFinder = "";
        };

        /**
         * @ngdoc function
         * @name getState
         * @description
         * returns current state name
         *
         */
        var getStateName = function() {
          vm.corporation.address = vm.corporation.address ? vm.corporation.address : Utils.getAddressModel(AddressTypes, "Corporation", null);
          vm.places = Utils.createPlaceInstance(vm.corporation.address, PlacesFactory);
          if(vm.corporation.id) {
            //Fetch list of states and cities for selected country in edit mode.
            vm.title = "Edit";
            return vm.corporation.party_id;
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
         * Initiates Intake form
         *
         */
        var init = function(){
          $rootScope.state = getStateName();
        };

        init();
    }
})();
