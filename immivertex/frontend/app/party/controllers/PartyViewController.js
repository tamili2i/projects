(function() {
  "use strict";

  angular
    .module("immiApp.party")
    .controller("PartyViewController", PartyViewController);

  /**
   * @ngdoc Injector
   * @name PartyViewController
   * @private
   * @module immiApp.party
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  PartyViewController.$inject = [
    "Utils",
    "PlacesFactory",
    "PartyService",
    "Session",
    "Party"
  ];

  /**
   * @ngdoc Controller
   * @name PartyViewController
   * @module immiApp.party
   * @requires
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  function PartyViewController(Utils, PlacesFactory, PartyService, Session, Party) {
    var vm = this;
    /**
     * @ngdoc function
     * @name getUserRoles
     * @description
     * Gets list of all user roles
     *
     */
    vm.getUserRoles = function() {
      PartyService.getUserRoles(Session.getPartyType(), function callback(response) {
        Party.role_id = _.where(response,{"id":Party.role_id})[0].name;
        vm.party = Party;
        vm.party.address = vm.party.address ? vm.party.address : Utils.getAddressModel();
        vm.places = Utils.createPlaceInstance(vm.party.address, PlacesFactory);
      });
    };

    /**
     * @ngdoc function
     * @name init
     * @description
     * if party is saved more than once, then its appropriate
     * countries, states and cities should be loaded.
     */
    var init = function() {
      vm.getUserRoles();
    };

    init();

  }
})();
