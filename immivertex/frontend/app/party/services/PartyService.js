(function() {
    "use strict";
    /*jslint nomen: true*/
    /*global angular, $, _*/

    /**
     * @ngdoc Service
     * @name PartyService
     * @module immiApp.party
     * @requires
     * @description
     * This service has functionality to interface with backend to send and fetch data.
     * @author Ideas2IT Technologies
     * @copyright
     */
    angular.module("immiApp.party")
        .service("PartyService", PartyService);

    /**
     * @ngdoc Injector
     * @name PartyService
     * @private
     * @module immiApp.party
     * @description
     * Inject module that needs to be useful for grid service
     * @author Ideas2IT Technologies
     * @copyright
     */
    PartyService.$inject = ["$state", "PartyDataService", "ToasterService", "PartyGridConfig", "Session"];

    function PartyService($state, PartyDataService, ToasterService, PartyGridConfig, Session) {
      var _self = this;

      /**
        * @ngdoc function
        * @name saveParty
        * @param {object} party
        * @param {function} successCallback
        * @param {function} errorCallback
        * @description
        * Create or Update Party
        *
        */
      _self.saveParty = function(party, successCallback, errorCallback) {
        if(!party.party_id){
          _self.createParty(party, successCallback, errorCallback);
        }else {
          _self.updateParty(party, successCallback, errorCallback);
        }
      };

      /**
       * @ngdoc function
       * @name createParty
       * @param {object} party
       * @param {function} successCallback
       * @param {function} errorCallback
       * @description
       * Save Party information
       *
       */
      _self.createParty = function(party, successCallback, errorCallback) {
        var partyQ = PartyDataService.saveParty(party);
        partyQ.then(function(response) {
          ToasterService.toastSuccess("Party info saved successfully", "Success");
          successCallback(response.data);
        }, function(response) {
          ToasterService.toastError("Something went wrong", "Error");
          errorCallback(response.data);
        });
      };


      /**
       * @ngdoc function
       * @name updateParty
       * @param {object} party
       * @param {function} successCallback
       * @param {function} errorCallback
       * @description
       * Update Party information
       *
       */
      _self.updateParty = function(party, successCallback, errorCallback) {
        var partyQ = PartyDataService.updateParty(party);
        partyQ.then(function(response) {
          ToasterService.toastSuccess("Party info updated successfully", "Success");
          successCallback(response.data);
        }, function(response) {
          ToasterService.toastError("Something went wrong", "Error");
          errorCallback(response.data);
        });
      };

      /**
       * @ngdoc function
       * @name savePartyRelation
       * @param {object} partyRelation
       * @description
       * Save Party relation
       *
       */
      _self.savePartyRelation = function(partyRelation, callback) {
        var party = PartyDataService.savePartyRelation(partyRelation);
        party.then(function(response) {
          ToasterService.toastSuccess("Party relation info saved successfully", "Success");
          callback(response.data);
        }, function() {
          ToasterService.toastError("Something went wrong", "Error");
        });
      };

      /**
       * @ngdoc function
       * @name getUserRoles
       * @param {String} roleType
       * @param {function} callback
       * @description
       * Get list of user roles.
       *
       */
      _self.getUserRoles = function(roleType, callback) {
        var userRoles =  PartyDataService.getUserRoles(roleType);
        userRoles.then(function(response) {
          callback(response.data);
        }, function() {
          ToasterService.toastError("Something went wrong", "Error");
        });
      };

      /**
       * @ngdoc function
       * @name getRelationParties
       * @param {object} queryParam includes the party key value
       * @param {function} callback
       * @description
       * Gets list of parties under party relation by using filter key value
       *
       */
      _self.getRelationParties = function(queryParam, callback) {
        var parties = PartyDataService.getRelationParties(queryParam);
        parties.then(function(response) {
          callback(response.data);
        }, function() {
          ToasterService.toastError("Something went wrong", "Error");
        });
      };

      /**
       * @ngdoc function
       * @name getParties
       * @param {Number} party_id - party_id of corporation or lawfirm
       * @description
       * Gets list of parties under corporation or lawfirm
       *
       */
      _self.getParties = function(queryParam, callback, errorCallback) {
        var parties = PartyDataService.getParties(Session.getPartyId(), queryParam);
        parties.then(function(response) {
          callback(response.data);
        }, function() {
          ToasterService.toastError("Something went wrong", "Error");
          errorCallback();
        });
      };

      /**
       * @ngdoc function
       * @name getRelations
       * @param {function} callback
       * @description
       * Get list of all relation for parties
       *
       */
      _self.getRelations = function(callback) {
        var relations = PartyDataService.getRelations();
        relations.then(function(response) {
          console.log("getRelations response ::",response);
          callback(response.data);
        }, function() {
          ToasterService.toastError("Something went wrong", "Error");
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
        return PartyDataService.getParty(partyId);
      };

    }


})();
