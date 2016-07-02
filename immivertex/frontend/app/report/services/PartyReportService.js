(function() {
  "use strict";
  /*jslint nomen: true*/
  /*global angular, $, _*/

  /**
   * @ngdoc Service
   * @name PartyReportService
   * @module immiApp.report
   * @requires
   * @description
   * This service has functionality to interface with backend to send and fetch data.
   * @author Connvertex Technologies
   * @copyright
   */
  angular.module("immiApp.report")
    .service("PartyReportService", PartyReportService);

  /**
   * @ngdoc Injector
   * @name PartyReportService
   * @private
   * @module immiApp.report
   * @description
   * Inject module that needs to be useful for grid service
   * @author Connvertex Technologies
   * @copyright
   */
  PartyReportService.$inject = ["$q", "$timeout", "$state", "PartyReportDataService",  "HTTPFactory", "ToasterService", "Session"];



  function PartyReportService($q, $timeout, $state, PartyReportDataService, HTTPFactory, ToasterService, Session) {
    var _self = this;

    /**
     * @ngdoc function
     * @name getBeneficiaryReport
     * @param successCallback
     * @param errorCallback
     * @description
     * Get list of Beneficiaries
     *
     */
    _self.getPartyReport = function(queryParam, successCallback, errorCallback) {

      var partyList = PartyReportDataService.getPartyReport(queryParam);

      partyList.then(function(response) {
        successCallback(response.data);
      }, function() {
        ToasterService.toastError("In loading Party Report", "Error");
        errorCallback();
      });
    };


    return _self;

  }

})();
