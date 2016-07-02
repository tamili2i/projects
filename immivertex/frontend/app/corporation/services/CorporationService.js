(function() {
    "use strict";
    /*jslint nomen: true*/
    /*global angular, $, _*/

    /**
     * @ngdoc Service
     * @name CorporationService
     * @module immiApp.corporation
     * @requires
     * @description
     * This service has functionality to interface with backend to send and fetch data.
     * @author Ideas2IT Technologies
     * @copyright
     */
    angular.module("immiApp.corporation")
        .service("CorporationService", CorporationService);

    /**
     * @ngdoc Injector
     * @name CorporationService
     * @private
     * @module immiApp.corporation
     * @description
     * Inject module that needs to be useful for grid service
     * @author Ideas2IT Technologies
     * @copyright
     */
    CorporationService.$inject = ["$q","$timeout","CorporationDataService", "LawfirmDataService", "BeneficiaryDataService", "HTTPFactory", "ToasterService", "Session", "$state"];

    function CorporationService($q, $timeout, CorporationDataService, LawfirmDataService, BeneficiaryDataService, HTTPFactory, ToasterService, Session, $state) {
        var _self = this;

        /**
          * @ngdoc function
          * @name getCorporationList
          * @param successCallback
          * @param errorCallback
          * @description
          * Get list of corporations
          *
          */
        _self.getCorporationList = function(queryParam, successCallback, errorCallback){
          var corporationList =  CorporationDataService.getCorporationList(queryParam);
          corporationList.then(function (response) {
            successCallback(response.data);
          }, function(){
              ToasterService.toastError("In loading Corporations", "Error");
              errorCallback();
          });
        };

        /**
          * @ngdoc function
          * @name getBeneficiaryList
          * @param {Object} queryParam includes party_id of corporation
          * @param successCallback
          * @description
          * Get list of beneficiaries under corporation
          *
          */
        _self.getBeneficiaryList = function(queryParam, successCallback){
          var beneficiaryList =  BeneficiaryDataService.getCorpBeneficiaryList(queryParam);
          beneficiaryList.then(function (response) {
            successCallback(response.data);
          }, function(){
              ToasterService.toastError("Something went wrong", "Error");
          });
        };

        /**
          * @ngdoc function
          * @name getCorporation
          * @param {String} corporationId
          * @description
          * Get corporation info by id
          *
          */
        _self.getCorporation = function(corporationId){
          var defer = $q.defer();
          var corporation = CorporationDataService.getCorporation(corporationId);

          corporation.then(function(response) {
            defer.resolve(response.data[0]);
          }, function() {
            ToasterService.toastError("In loading lawfirm", "Error");
            defer.reject(response.data);
          });
          return defer.promise;
        };

        /**
          * @ngdoc function
          * @name saveCorporation
          * @param {object} corporation
          * @param {function} successCallback
          * @param {function} errorCallback
          * @description
          * Create or Update Corporation form under lawfirm
          *
          */
        _self.saveCorporation = function(corporation, successCallback, errorCallback) {
          if(!corporation.party_id){
            _self.createCorporation(corporation, successCallback, errorCallback);
          }else {
            _self.updateCorporation(corporation, successCallback, errorCallback);
          }
        };

        /**
          * @ngdoc function
          * @name createCorporation
          * @param {object} corporation
          * @param {function} successCallback
          * @param {function} errorCallback
          * @description
          * Create Corporation form
          *
          */
        _self.createCorporation = function(corporation, successCallback, errorCallback) {

          corporation.owned_by = Session.getPartyId();
          corporation.updated_by = Session.getUpdatedBy();

          var corporationQ = CorporationDataService.createCorporation(corporation);

          corporationQ.then(function(response){
            if(response.data.error) {
              successCallback(response.data);
            } else {
              _self.addCorporationToLawFirm(response.data.party.id,successCallback, errorCallback);
            }


          }, function(response){
             ToasterService.toastError("Something went wrong", "Error");
             errorCallback(response.data);
          });
        };


        /**
          * @ngdoc function
          * @name updateCorporation
          * @param {object} corporation
          * @param {function} successCallback
          * @param {function} errorCallback
          * @description
          * Update Corporation form
          *
          */
        _self.updateCorporation = function(corporation, successCallback, errorCallback) {
          corporation.owned_by = Session.getPartyId();
          corporation.address.location.id = corporation.address.location_id;

          var corporationQ = CorporationDataService.updateCorporation(corporation);
          corporationQ.then(function (response) {
            ToasterService.toastSuccess("Corporation saved successfully","Success");
            successCallback(response.data);
            $state.go("home.corporations");
          }, function(){
             ToasterService.toastError("Something went wrong", "Error");
             errorCallback();
          });
        };


        /**
          * @ngdoc function
          * @name addCorporationToLawFirm
          * @param  {Number} corporationId
          * @description
          * add Corporation relation to lawfirm
          *
          */
        _self.addCorporationToLawFirm = function(corporationId, successCallback, errorCallback) {
          var relation = {};
          relation.relation_party_id = corporationId;
          relation.party_id = Session.getPartyId();
          relation.updated_by = Session.getUpdatedBy();
          LawfirmDataService.addCorporationToLawfirm(relation).then(function() {
            ToasterService.toastSuccess("Corporation saved successfully","Success");
            $state.go("home.corporations");
          }, function error(){
            ToasterService.toastError("Something went wrong", "Error");
          });
        };
        return _self;
    }

})();
