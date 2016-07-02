(function() {
  "use strict";

  angular
    .module("immiApp.party")
    .controller("PartyFormController", PartyFormController);

  /**
   * @ngdoc Injector
   * @name PartyFormController
   * @private
   * @module immiApp.party
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  PartyFormController.$inject = ["$scope", "Utils", "PlacesFactory", "PartyService", "Session", "$rootScope", "$state", "Party"];

  /**
   * @ngdoc Controller
   * @name PartyFormController
   * @module immiApp.party
   * @requires
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  function PartyFormController($scope, Utils, PlacesFactory, PartyService, Session, $rootScope, $state, Party) {
    var vm = this;
    vm.party = Party;

    /**
     * @ngdoc function
     * @name getUserRoles
     * @description
     * Gets list of all user roles
     *
     */
    vm.getUserRoles = function() {
      PartyService.getUserRoles(Session.getPartyType(), function callback(response) {
        vm.userRoles = response;
      });
    };

    /**
     * @ngdoc function
     * @name save
     * @param {object} evt
     * @description
     * Saves Party information.
     *
     */
    vm.save = function(evt, partyForm) {
      vm.party.owned_by = Session.getCreatedBy();
      vm.party.updated_by = Session.getUpdatedBy();
      PartyService.saveParty(vm.party, function successCallback(response){
        if(Session.getPartyType()=="corporation"){
          $state.go("home.corporation");
        }else if(Session.getPartyType()=="law_firm"){
          $state.go("home.lawfirm");
        }
      }, function errorCallback(response) {
        if(response["email.email"]) {
          partyForm.email.$setValidity("availability", false);
        }
      });
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
      vm.places.getAppIDsForAddress(location.longName, vm.party.address, function(address) {
        vm.places.metaLocation = location.longName;
      });
    };

    /**
     * @ngdoc function
     * @name resetAddressModel
     * @description
     * Resets party address when country changes
     *
     */
    vm.resetAddressModel = function() {
      vm.party.address.location.state_id = null;
      vm.party.address.location.city_id = null;
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
      vm.party.address = vm.party.address ? vm.party.address : Utils.getAddressModel();
      vm.places = Utils.createPlaceInstance(vm.party.address, PlacesFactory);
      if(vm.party.id) {
        vm.party.title = "Edit";
        return vm.party.party_id;
      } else {
        vm.party.title = "Create";
        return vm.party.title;
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
     * if party is saved more than once, then its appropriate
     * countries, states and cities should be loaded.
     */
    var init = function() {
      vm.getUserRoles();
      $rootScope.state = getStateName();
    };

    init();

  }
})();
