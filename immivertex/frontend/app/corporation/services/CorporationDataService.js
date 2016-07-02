(function() {
    "use strict";
    /*jslint nomen: true*/
    /*global angular, $, _*/


    function CorporationDataService($q, $timeout, CorporationGridConfig, HTTPFactory) {
        var _self = this;

        /**
          * @ngdoc function
          * @name getCorporationList
          * @description
          * Get list of corporations
          *
          */
        _self.getCorporationList = function(queryParam){
          return HTTPFactory.call({
            url: "/law-firm/law-firms/getCorporationList",
            method: "GET",
            params: queryParam
          });
        };

        /**
          * @ngdoc function
          * @name getCorporation
          * @param  {String} partyId
          * @description
          * Get corporation info by Id
          *
          */
        _self.getCorporation = function(partyId){
          return HTTPFactory.call({
            url: "/corporation/corporations/" + partyId,
            method: "GET"
          });
        };

        /**
          * @ngdoc function
          * @name createCorporation
          * @param  {object} corporation
          * @description
          * Create Corporation form
          *
          */
        _self.createCorporation = function(corporation) {
          return HTTPFactory.call({
            method: "POST",
            url: "/corporation/corporations/storeCorporationForLawFirm",
            data: corporation
          });
        };

        /**
          * @ngdoc function
          * @name updateCorporation
          * @param  {object} corporation
          * @description
          * Update Corporation form
          *
          */
        _self.updateCorporation = function(corporation) {
          return HTTPFactory.call({
            method: "POST",
            url: "/corporation/corporationupdate",
            data: corporation
          });
        };

        /**
          * @ngdoc function
          * @name addLawFirmToCorporation
          * @param {Object} relation
          * @description
          *
          */
        _self.addLawFirmToCorporation = function(relation) {
          return HTTPFactory.call({
            url: "/corporation/corporations/addLawFirmToCorporation",
            method: "POST",
            data: relation
          });
        };

        return _self;

    }


    /**
     * @ngdoc Injector
     * @name CorporationDataService
     * @private
     * @module immiApp.corporation
     * @description
     * Inject module that needs to be useful for grid service
     * @author Ideas2IT Technologies
     * @copyright
     */
    CorporationDataService.$inject = ["$q","$timeout", "CorporationGridConfig","HTTPFactory"];

    /**
     * @ngdoc Service
     * @name CorporationDataService
     * @module immiApp.corporation
     * @requires
     * @description
     * This service has functionality to interface with backend to send and fetch data.
     * @author Ideas2IT Technologies
     * @copyright
     */
    angular.module("immiApp.corporation")
        .service("CorporationDataService", CorporationDataService);

})();
