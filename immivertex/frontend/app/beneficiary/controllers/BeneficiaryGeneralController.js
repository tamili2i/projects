(function() {
  "use strict";

  angular.module("immiApp.beneficiary")
    .controller("BeneficiaryGeneralController", BeneficiaryGeneralController);

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
  BeneficiaryGeneralController.$inject = ["$scope",
    "$location",
    "Utils",
    "BeneficiaryDataService",
    "BeneficiaryService",
    "PlacesFactory",
    "Beneficiary",
    "AddressTypes",
    "Title",
    "Gender",
    "MaritalStatus",
    "ImmigrationStatuses",
    "Citizen"
  ];

  /**
   * @ngdoc BeneficiaryGeneralController
   * @name BeneficiaryGeneralController
   * @module immiApp.beneficiary
   * @requires $log
   * @description
   *
   * BeneficiaryGeneralController
   *
   */
  /*jslint nomen: true*/
  /*global angular*/

  function BeneficiaryGeneralController(
    $scope, $location, Utils, BeneficiaryDataService,
    BeneficiaryService, PlacesFactory, Beneficiary, AddressTypes, Title, Gender, MaritalStatus, ImmigrationStatuses, Citizen) {

    var vm = this;
    vm.general = angular.copy(Beneficiary);
    vm.vTitle = _.where(Title.data, {id: vm.general.title})[0];
    vm.vGender = _.where(Gender, {id: vm.general.gender})[0];
    vm.vMaritalStatus = _.where(MaritalStatus.data, {id: vm.general.marital_status})[0];

    if(vm.general.immigration){
      vm.vImmigrationStatuses =  _.where(ImmigrationStatuses, {id: vm.general.immigration.non_immigrant_status})[0];
    }
    vm.vCountry = _.where(Citizen.data, {id: vm.general.nationality})[0];


    /**
     * @ngdoc function
     * @name save
     * @param evt
     * @description
     * Saves Beneficiary's general information
     *
     */
    vm.save = function(evt) {
      evt.preventDefault();

      BeneficiaryService.saveGeneralInfo(vm.general, function callback(response) {
        console.log("General info updated!!!!");
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
      vm.general.birth_address = vm.general.birth_address ? vm.general.birth_address : Utils.getAddressModel(AddressTypes, "Birth", Beneficiary.party_id);
      vm.places = Utils.createPlaceInstance(vm.general.birth_address, PlacesFactory);
    };
    init();

  }

}());
