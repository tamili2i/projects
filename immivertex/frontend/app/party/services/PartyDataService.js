(function() {
    "use strict";
    /*jslint nomen: true*/
    /*global angular, $, _*/

    /**
     * @ngdoc Service
     * @name PartyDataService
     * @module immiApp.party
     * @requires
     * @description
     * This service has functionality to interface with backend to send and fetch data.
     * @author Ideas2IT Technologies
     * @copyright
     */
    angular.module("immiApp.party")
        .service("PartyDataService", PartyDataService);

    /**
     * @ngdoc Injector
     * @name PartyDataService
     * @private
     * @module immiApp.party
     * @description
     * Inject module that needs to be useful for grid service
     * @author Ideas2IT Technologies
     * @copyright
     */
    PartyDataService.$inject = ["HTTPFactory"];


    function PartyDataService(HTTPFactory) {
      var _self = this;

      /**
       * @ngdoc function
       * @name getUserRoles
       * @param {String} roleType
       * @description
       * Get list of user roles by role type
       *
       */
      _self.getUserRoles = function(roleType) {
        return HTTPFactory.call({
          url: "/user/roles/showByModule/" + roleType,
          method: "GET"
        });
      };

      /**
       * @ngdoc function
       * @name saveParty
       * @param {object} party
       * @description
       * Save Party information
       *
       */
      _self.saveParty = function(party) {
        return HTTPFactory.call({
          url: "/user/user-roles/createRole",
          method: "POST",
          data: party
        });
      };

      /**
       * @ngdoc function
       * @name getRelationParties
       * @param {object} queryParam includes the party key value
       * @description
       * Gets list of parties under party relation by using filter key value
       *
       */
      _self.getRelationParties = function(queryParam) {
        return HTTPFactory.call({
          url: "/relations/showPartyByName",
          method: "GET",
          params: queryParam
        });
      };

      /**
       * @ngdoc function
       * @name getParties
       * @param {object} queryParam includes party_id of corporation or lawfirm
       * @description
       * Gets list of parties under corporation or lawfirm
       *
       */
      _self.getParties = function(party_id, queryParam) {
        return HTTPFactory.call({
          url: "/user/user-roles/" + party_id,
          method: "GET",
          params: queryParam
        });
      };

      /**
       * @ngdoc function
       * @name getRelations
       * @description
       * Get list of all relation for parties
       *
       */
      _self.getRelations = function() {
        return HTTPFactory.call({
          url: "/relation-types",
          method: "GET"
        });
      };

      /**
       * @ngdoc function
       * @name savePartyRelation
       * @param {object} partyRelation
       * @description
       * Save Party relation information
       *
       */
      _self.savePartyRelation = function(partyRelation) {
        return HTTPFactory.call({
          url: "/relations",
          method: "POST",
          data: partyRelation
        });
      };

      /**
       * @ngdoc function
       * @name getParty
       * @param {String} partyId includes party_id of party
       * @description
       * Get detailed info about party By partyId
       *
       */
      _self.getParty = function(partyId) {
        return HTTPFactory.call({
          url: "/user/user-roles/showbyid/" + partyId,
          method: "GET"
        });
      };

      /**
       * @ngdoc function
       * @name updateParty
       * @param {object} party
       * @description
       * Update Party information
       *
       */
      _self.updateParty = function(party) {
        return HTTPFactory.call({
          url: "/user/user-roles/updateRole",
          method: "POST",
          data: party
        });
      };
    }

})();
