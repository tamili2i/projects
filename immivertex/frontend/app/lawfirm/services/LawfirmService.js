(function() {
  "use strict";
  /*jslint nomen: true*/
  /*global angular, $, _*/

  /**
   * @ngdoc Service
   * @name LawfirmService
   * @module immiApp.lawfirm
   * @requires
   * @description
   * This service has functionality to interface with backend to send and fetch data.
   * @author Ideas2IT Technologies
   * @copyright
   */
  angular.module("immiApp.lawfirm")
    .service("LawfirmService", LawfirmService);

  /**
   * @ngdoc Injector
   * @name LawfirmService
   * @private
   * @module immiApp.lawfirm
   * @description
   * Inject module that needs to be useful for grid service
   * @author Ideas2IT Technologies
   * @copyright
   */
  LawfirmService.$inject = ["$q", "$timeout", "$state", "LawfirmDataService", "CorporationDataService", "BeneficiaryDataService", "HTTPFactory", "ToasterService", "Session"];



  function LawfirmService($q, $timeout, $state, LawfirmDataService, CorporationDataService, BeneficiaryDataService, HTTPFactory, ToasterService, Session) {
    var _self = this;

    /**
     * @ngdoc function
     * @name getLawfirmList
     * @param successCallback
     * @param errorCallback
     * @description
     * Get list of lawfirms
     *
     */
    _self.getLawfirmList = function(queryParam, successCallback, errorCallback) {

      var lawfirmList = LawfirmDataService.getLawfirmList(queryParam);

      lawfirmList.then(function(response) {
        successCallback(response.data);
      }, function() {
        ToasterService.toastError("In loading Lawfirms", "Error");
        errorCallback();
      });
    };

    /**
      * @ngdoc function
      * @name getBeneficiaryList
      * @param {Object} queryParam includes party_id of lawfirm
      * @param successCallback
      * @description
      * Get list of beneficiaries under lawfirm
      *
      */
    _self.getBeneficiaryList = function(queryParam, successCallback){
      var beneficiaryList =  BeneficiaryDataService.getLawfirmBeneficiaryList(queryParam);
      beneficiaryList.then(function (response) {
        successCallback(response.data);
      }, function(){
          ToasterService.toastError("Something went wrong", "Error");
      });
    };

    /**
     * @ngdoc function
     * @name getLawfirm
     * @param {String} lawfirmId
     * @param successCallback
     * @param errorCallback
     * @description
     * Get Lawfirm by id
     *
     */
    _self.getLawfirm = function(lawfirmId) {
      return LawfirmDataService.getLawfirm(lawfirmId);
    };

    /**
     * @ngdoc function
     * @name saveLawfirm
     * @param  {object} lawfirm
     * @param  {Array} addressTypes
     * @param successCallback
     * @param errorCallback
     * @description
     * Dispatch lawfirm to create or update
     *
     */
    _self.saveLawfirm = function(lawfirm, successCallback, errorCallback) {
      // lawfirm.address.location = {
      //   "country_id": 5,
      //   "state_id": 250,
      //   "city_id": 1697
      // };

      if (!lawfirm.party_id) {
        _self.createLawfirm(lawfirm, successCallback, errorCallback);
      } else {
        _self.updateLawfirm(lawfirm, successCallback, errorCallback);
      }
    };

    /**
     * @ngdoc function
     * @name createLawfirm
     * @param {Object} lawfirm
     * @param  {Array} addressTypes
     * @param successCallback
     * @param errorCallback
     * @description
     * Create new lawfirm
     *
     */
    _self.createLawfirm = function(lawfirm, successCallback, errorCallback) {

      //lawfirm.address.type_id = addressTypes[0].id;

      lawfirm.owned_by = Session.getPartyId();
      lawfirm.updated_by = Session.getUpdatedBy();

      var lawfirmQ = LawfirmDataService.createLawfirm(lawfirm);

      lawfirmQ.then(function(response) {
        _self.addLawFirmToCorporation(response.data.party.id, successCallback, errorCallback);

      }, function error(response){
        
        ToasterService.toastError("Something went wrong", "Error");
        errorCallback(response.data);
      });
    };

    /**
     * @ngdoc function
     * @name addLawFirmToCorporation
     * @param {Number} lawfirmId
     * @description
     * Creates relation with lawfirm under corporation
     */
    _self.addLawFirmToCorporation = function(lawFirmId, successCallback, errorCallback) {
      var relation = {};
      relation.relation_party_id = lawFirmId;
      relation.party_id = Session.getPartyId();
      relation.updated_by = Session.getUpdatedBy();

      CorporationDataService.addLawFirmToCorporation(relation).then(function(response) {
        ToasterService.toastSuccess("Lawfirm saved successfully", "Success");
        $state.go("home.lawfirms");
        successCallback(response.data);
      }, function error(){
        ToasterService.toastError("Something went wrong", "Error");
      });
    };

    /**
     * @ngdoc function
     * @name updateLawfirm
     * @param  {object} lawfirm
     * @param {function} successCallback
     * @param {function} errorCallback
     * @description
     * updates lawfirm
     *
     */
    _self.updateLawfirm = function(lawfirm, successCallback, errorCallback) {
      lawfirm.owned_by = Session.getPartyId();
      lawfirm.address.location.id = lawfirm.address.location_id;
      var lawfirmQ = LawfirmDataService.updateLawfirm(lawfirm);

      lawfirmQ.then(function(response) {
        ToasterService.toastSuccess("Lawfirm saved successfully", "Success");
        successCallback(response.data);
        $state.go("home.lawfirms");
      }, function error(){
        ToasterService.toastError("Something went wrong", "Error");
      });
    };

    return _self;

  }

})();
