(function() {
  "use strict";

  angular
    .module("immiApp.party")
    .controller("PartyRelationController", PartyRelationController);

  /**
   * @ngdoc Injector
   * @name PartyRelationController
   * @private
   * @module immiApp.party
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  PartyRelationController.$inject = ["PartyService", "Session", "$state"];

  /**
   * @ngdoc Controller
   * @name PartyRelationController
   * @module immiApp.party
   * @requires
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  function PartyRelationController(PartyService, Session, $state) {
    var vm = this;
    vm.partRelation = {};
    vm.relations = [];

    /**
     * @ngdoc function
     * @name save
     * @param evt
     * @description
     * Saves Party Relationship information
     *
     */
    vm.save = function(evt) {
      vm.partRelation.created_by = Session.getCreatedBy();
      PartyService.savePartyRelation(vm.partRelation, function callback(response){
        if(Session.getPartyType()=="corporation"){
          $state.go("home.corporation");
        }else if(Session.getPartyType()=="law_firm"){
          $state.go("home.lawfirm");
        }
      });
    };

    /**
     * @ngdoc function
     * @name getParties
     * @description
     * Gets list of parties by using filter key value
     *
     */
    vm.getParties = function(keyValue) {
      vm.parties = [];
      if(keyValue){
        var queryParam = constructQueryParam(keyValue);
        PartyService.getRelationParties(queryParam, function callback(data) {
          if(Object.keys(data).length > 15){
            for(var i=1; i<=15; i++){
              vm.parties.push(data[i])
            }
          }else {
            vm.parties = data;
          }
          if(vm.selected_party){
            vm.parties = _.reject(vm.parties, function(d){ return d.party_id === vm.selected_party.party_id; });
          }
        });

      }
    };

    /**
     * @ngdoc function
     * @name getRelations
     * @description
     * Gets list of all ralations
     *
     */
    vm.getRelations = function() {
      PartyService.getRelations(function callback(response) {
        vm.relations = response;
      });
    };


    var constructQueryParam = function(keyValue) {
      var queryParam = {};
      queryParam.name = keyValue;
      return queryParam;
    };

    /**
     * @ngdoc function
     * @name partyRelationCallback
     * @param {object} party
     * @param {string} type specifies which dropdown
     * @description
     * Set the party_id and relation_party_id to scope
     * When select the party_one and party_two from party dropdowns.
     *
     */
    vm.partyRelationCallback = function(party,type){
      vm.selected_party = party;
      if(type == "party_one"){
        vm.relations = [];
        vm.partRelation.type_id = "";
        vm.partRelation.party_id = party.party_id;
        if(party.type === "person"){
            vm.getRelations();
        } else{
          PartyService.getUserRoles(party.type, function callback(response) {
            vm.relations = response;
          });
        }
      } else if(type == "party_two"){
        vm.partRelation.relation_party_id = party.party_id;
      }
    };

    /**
     * @ngdoc function
     * @name init
     * @description
     * Initiates the relation list
     */
    var init = function() {
      vm.getRelations();
    };

    init();
  }

})();
