(function() {
  "use strict";

  angular.module("immiApp.intakeform")
    .controller("BeneficiaryFamilyGeneralController", BeneficiaryFamilyGeneralController);

  /**
   * @ngdoc Injector
   * @name BeneficiaryService
   * @private
   * @module immiApp.beneficiary
   * @description
   * Inject module that needs to be useful for Beneficiary Controller
   * @author Ideas2IT Technologies
   * @copyright
   */
  BeneficiaryFamilyGeneralController.$inject = [
    "$location",
    "Utils",
    "BeneficiaryDataService",
    "BeneficiaryService",
    "PlacesFactory",
    "BeneficiaryFamily",
    "AddressTypes",
    "Title",
    "Gender",
    "MaritalStatus",
    "ImmigrationStatuses",
    "Citizen"
  ];

  /**
   * @ngdoc BeneficiaryFamilyGeneralController
   * @name BeneficiaryFamilyGeneralController
   * @module immiApp.intakeform
   * @requires $log
   * @description
   *
   * BeneficiaryFamilyGeneralController
   *
   */
  /*jslint nomen: true*/
  /*global angular*/

  function BeneficiaryFamilyGeneralController($location, Utils, BeneficiaryDataService,
  BeneficiaryService, PlacesFactory, BeneficiaryFamily, AddressTypes, Title, Gender, MaritalStatus, ImmigrationStatuses, Citizen) {
    var vm = this;

    vm.general = angular.copy(BeneficiaryFamily);

    /**
     * @ngdoc function
     * @name save
     * @param evt
     * @description
     * Saves IntakeForm's general information
     *
     */
    vm.save = function(evt) {
      evt.preventDefault();
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
      vm.places.getAppIDsForAddress(location.longName, vm.general.birth_address, function(address){
        vm.places.metaLocation = location.longName;
        console.log("States and cities fetched according to google places");
      });
    };

    /**
     * @ngdoc function
     * @name resetAddressModel
     * @description
     * Resets birthInfo when country changes
     *
     */
    vm.resetAddressModel = function() {
      vm.general.birth_address.location.state_id = null;
      vm.general.birth_address.location.city_id = null;
      vm.places.locationFinder = null;
    };

    /**
     * @ngdoc function
     * @name init
     * @description
     * Initializes countries and states
     * If General info doesn't saved for a single time, then we need to set address
     * Object structure to that. For that we have used Utils, where we have maintaining
     * address structure for all the modules
     */
    var init = function(){
      vm.general.birth_address = vm.general.birth_address ? vm.general.birth_address : Utils.getAddressModel(AddressTypes, "Birth", BeneficiaryFamily.id);
      vm.places = Utils.createPlaceInstance(vm.general.birth_address, PlacesFactory);
    };

    init();

  }

}());
