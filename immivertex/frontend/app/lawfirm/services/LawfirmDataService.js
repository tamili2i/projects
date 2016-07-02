(function() {
  "use strict";
  /*jslint nomen: true*/
  /*global angular, $, _*/


  function LawfirmDataService($q, $timeout, LawfirmGridConfig, HTTPFactory) {

    var data_list = [{
      "id": 15401,
      "attorney_name": "Steve Jones",
      "lawfirm_name": "victor",
      "bar_id": 65156,
      "created_id": 16501,
      "updated_id": 12656
    }, {
      "id": 15402,
      "attorney_name": "John Smith",
      "lawfirm_name": "Arnold",
      "bar_id": 65745,
      "created_id": 12251,
      "updated_id": 12786
    }, {
      "id": 15403,
      "attorney_name": "Steve smith",
      "lawfirm_name": "Adam Voges",
      "bar_id": 65778,
      "created_id": 16701,
      "updated_id": 12956
    }];

    /**
     * @ngdoc Injector
     * @name getLawfirmList
     * @private
     * @module immiApp.lawfirm
     * @description
     * This method used to fetch the lawfirm list
     * @author Ideas2IT Technologies
     * @copyright
     */
    var _self = this;

    /**
     * @ngdoc function
     * @name getLawfirmList
     * @param {Object} queryParam includes party_id of corporation
     * @description
     * Get list of lawfirms
     */
    _self.getLawfirmList = function(queryParam) {
      return HTTPFactory.call({
        url: "/corporation/corporations/getLawFirmList",
        method: "GET",
        params: queryParam
      });
    };

    /**
     * @ngdoc function
     * @name createLawfirm
     * @param  {Object} lawfirm
     * @description
     * Create lawfirm form
     *
     */
    _self.createLawfirm = function(lawfirm) {
      return HTTPFactory.call({
        url: "/law-firm/law-firms",
        method: "POST",
        data: lawfirm
      });
    };

    /**
     * @ngdoc function
     * @name updateLawfirm
     * @param  {Object} lawfirm
     * @description
     * Create lawfirm form
     *
     */
    _self.updateLawfirm = function(lawfirm) {
      return HTTPFactory.call({
        url: "/law-firm/lawfirmsupdate",
        method: "POST",
        data: lawfirm
      });
    };

    /**
     * @ngdoc function
     * @name getLawfirm
     * @param partyId
     * @description
     * get single lawfirm by party Id
     *
     */
    _self.getLawfirm = function(partyId) {
      return HTTPFactory.call({
        url: "/law-firm/law-firms/" + partyId,
        method: "GET"
      });
    };

    /**
      * @ngdoc function
      * @name addCorporationToLawfirm
      * @param  {object} relation
      * @description
      * add Corporation relation to lawfirm
      *
      */
    _self.addCorporationToLawfirm = function(relation) {
      return HTTPFactory.call({
        url: "/law-firm/law-firms/addCorporationToLawFirm",
        method: "POST",
        data: relation
      });
    };

    return _self;

  }

  /**
   * @ngdoc Injector
   * @name LawfirmDataService
   * @private
   * @module immiApp.lawfirm
   * @description
   * Inject module that needs to be useful for grid service
   * @author Ideas2IT Technologies
   * @copyright
   */
  LawfirmDataService.$inject = ["$q", "$timeout", "LawfirmGridConfig", "HTTPFactory"];

  /**
   * @ngdoc Service
   * @name LawfirmDataService
   * @module immiApp.lawfirm
   * @requires
   * @description
   * This service has functionality to interface with backend to send and fetch data.
   * @author Ideas2IT Technologies
   * @copyright
   */
  angular.module("immiApp.lawfirm")
    .service("LawfirmDataService", LawfirmDataService);

})();
