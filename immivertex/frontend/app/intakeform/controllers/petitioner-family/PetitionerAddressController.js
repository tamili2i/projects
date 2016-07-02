(function() {
    "use strict";

    angular
        .module("immiApp.intakeform")
        .controller("PetitionerAddressController", PetitionerAddressController);

    /**
     * @ngdoc Injector
     * @name PetitionerAddressController
     * @private
     * @module immiApp.intakeform
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    PetitionerAddressController.$inject = [
      "$scope",
      "PlacesFactory",
      "Utils",
      "AddressTypes"
    ];

    /**
     * @ngdoc Controller
     * @name PetitionerAddressController
     * @module immiApp.intakeform
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function PetitionerAddressController($scope, PlacesFactory, Utils, AddressTypes) {
        var vm = this;

        vm.mailingAddresses = [];
        vm.usAddresses = [];
        vm.abroadAddresses = [];
        vm.usEmbassyAddress = [];
        vm.mailingPlaces = [];
        vm.usPlaces = [];
        vm.abroadPlaces = [];
        vm.usEmbassyPlaces = [];

        /**
         * @ngdoc function
         * @name addressChangeDetector
         * @param {object} oldObj - state of object before change
         * @param {object} newObj - state of object after change
         * @description
         * In View, we have only one save button for multiple
         * Addresses. To avoid saving of all the address whose
         * properties are still unchanged, we are watching each address object.
         * The Address will only be saved, if any of its property changed.
         *
         */
        function addressChangeDetector(oldObj, newObj){
          if(!newObj.changeLog){
            oldObj.changeLog = 1;
          }else{
            oldObj.changeLog = ++newObj.changeLog;
          }
        }

        /**
          * @ngdoc function
          * @name add
          * @param  addressForms
          * @description
          * Add more mailing address fields
          *
          */
        vm.addMailing = function (addressForms) {
          if(addressForms) {
            addressForms.$submitted = false;
          }
          var mailing = {};
          mailing = Utils.getAddressModel(AddressTypes, "Mailing",1204);
          Utils.createWatch(mailing, $scope, addressChangeDetector);
          vm.mailingAddresses.push(mailing);
          vm.mailingPlaces[vm.mailingAddresses.length-1] = Utils.createPlaceInstance(mailing, PlacesFactory);
        };

        /**
          * @ngdoc function
          * @name removeAddress
          * @param {number} index
          * @description
          * Removes mailing address fields
          *
          */
        vm.removeMailing = function(index) {
          vm.mailingAddresses.splice(index,1);
        };

        /**
          * @ngdoc function
          * @name addResidence
          * @param addressForms
          * @description
          * Adds more residence address fields
          *
          */
        vm.addUsAddress = function(addressForms) {
          $('.default-address-checkbox').prop("disabled",true);
          if(addressForms) {
            addressForms.$submitted = false;
          }
          var usAddr = {};
          usAddr = Utils.getAddressModel(AddressTypes, "Residence", 1204);
          Utils.createWatch(usAddr, $scope, addressChangeDetector);
          vm.usAddresses.push(usAddr);
          vm.usPlaces[vm.usAddresses.length-1] = Utils.createPlaceInstance(usAddr, PlacesFactory);
        };

        /**
          * @ngdoc function
          * @name removeAbroad
          * @param {number} index
          * @description
          * Removes Residence address fields
          *
          */
        vm.removeUsAddress = function(index, addressId) {
          if(addressId){
            BeneficiaryService.deleteAddress(addressId);
          }
          if(index == 0){
            vm.usAddressCheck = false;
            if(vm.mailingAddresses[0].is_primary){
              vm.mailingAddresses[0].is_primary = false;
            }
            vm.usAddresses[0] = "";
            vm.usPlaces[0] = [];
          }else {
            vm.usAddresses.splice(index,1);
            if(index == 1){
              $('.default-address-checkbox').prop("disabled",false);
            }
          }
        };

        /**
          * @ngdoc function
          * @name addAbroad
          * @param addressForms
          * @description
          * Adds more Abroad address fields
          *
          */
        vm.addAbroad = function(addressForms) {
          if(addressForms) {
            addressForms.$submitted = false;
          }
          var abroadAddr = {};
          abroadAddr = Utils.getAddressModel(AddressTypes, "Foreign", 1204);
          Utils.createWatch(abroadAddr, $scope, addressChangeDetector);
          vm.abroadAddresses.push(abroadAddr);
          vm.abroadPlaces[vm.abroadAddresses.length-1] = Utils.createPlaceInstance(abroadAddr, PlacesFactory);
        };

        /**
          * @ngdoc function
          * @name removeAbroad
          * @param {number}index
          * @description
          * Removes Abroad address fields
          *
          */
        vm.removeAbroad = function(index, addressId) {
          if(addressId){
            BeneficiaryService.deleteAddress(addressId);
          }
          if(index == 0){
            vm.abroadAddressCheck = false;
          }else {
            vm.abroadAddresses.splice(index,1);
          }
        };

        /**
         * @ngdoc function
         * @name locationCallback
         * @param {Object} location
         * @param {number} index this will be passed
         * only when location finder is inside ngRepeat
         * @description
         * Gets locations based on user search
         * Also load cities and states based on country and state
         * choosen from Google API
         */
        vm.locationCallback = function(location, index) {
          vm.mailingPlaces[index].getAppIDsForAddress(location.longName, vm.mailingAddresses[index], function(address){
            vm.mailingPlaces[index].metaLocation = location.longName;
            console.log("States and cities fetched according to google places");
            if(vm.mailingAddresses[index].is_primary){
              vm.usPlaces[index].metaLocation = location.longName;
            }
          });
        };

        /**
         * @ngdoc function
         * @name locationCallbackUs
         * @param {Object} location
         * @param {number} index this will be passed
         * only when location finder is inside ngRepeat
         * @description
         * Gets location based on user search in US address
         *
         */
        vm.locationCallbackUs = function(location, index) {
          vm.usPlaces[index].getAppIDsForAddress(location.longName, vm.usAddresses[index], function(address){
            vm.usPlaces[index].metaLocation = location.longName;
            console.log("States and cities fetched according to google places");
          });
        };

        /**
         * @ngdoc function
         * @name locationCallbackAbroad
         * @param {Object} location
         * @param {number} index this will be passed
         * only when location finder is inside ngRepeat
         * @description
         * Gets location based on user search in foreign address
         *
         */
        vm.locationCallbackAbroad = function(location, index) {
          vm.abroadPlaces[index].getAppIDsForAddress(location.longName, vm.abroadAddresses[index], function(address){
            vm.abroadPlaces[index].metaLocation = location.longName;
            console.log("States and cities fetched according to google places");
          });
        };

        /**
         * @ngdoc function
         * @name showResidenceAsMailing
         * @param {boolean} isChecked
         * @description
         * Update US Residence Address same as mailing Address when checkbox enabled.
         *
         */
        vm.showResidenceAsMailing = function(isChecked){
            if(isChecked){
              var mailingAdress = angular.copy(vm.mailingAddresses[0]);
              if(mailingAdress.is_primary == true){
                mailingAdress.type_id = _.where(AddressTypes, {"name" : "Residence"})[0].id;
                vm.usAddresses[0] = mailingAdress;
                vm.usPlaces = Utils.createWatchesAndPlacesInstanceForAddress(vm.usAddresses, PlacesFactory, $scope, addressChangeDetector);
              }
            } else {
              vm.usAddresses[0] = {};
              vm.usAddresses[0].location = {};
              vm.usPlaces = Utils.createWatchesAndPlacesInstanceForAddress(vm.usAddresses, PlacesFactory, $scope, addressChangeDetector);
            }
        };

        /**
          * @ngdoc function
          * @name init
          * @description
          * Initiates Address form
          *
          */
        var init = function(){
            vm.addMailing();
            vm.addUsAddress();
            vm.addAbroad();
        };

        init();
    }
})();
