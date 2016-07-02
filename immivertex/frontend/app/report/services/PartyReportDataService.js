(function() {
  "use strict";
  /*jslint nomen: true*/
  /*global angular, $, _*/


  function PartyReportDataService($q, $timeout, PartyReportGridConfig, HTTPFactory) {


    /**
     * @ngdoc Injector
     * @name PartyReportDataService
     * @private
     * @module immiApp.report
     * @description
     * A Service for API endpoints
     * @author Connvertex Technologies
     * @copyright
     */
    var _self = this;

    /**
     * @ngdoc function
     * @name getBeneficiaryReport
     * @param {Object} queryParam includes party_id, start_date, end_date
     * @description
     * Get list of Beneficiaries
     */
    _self.getPartyReport = function(queryParam) {
      return HTTPFactory.call({
        url: "/reports/report",
        method: "GET",
        params: queryParam
      });
    };

  

    return _self;

  }

  /**
   * @ngdoc Injector
   * @name PartyReportDataService
   * @private
   * @module immiApp.report
   * @description
   * Inject module that needs to be useful for grid service
   * @author Connvertex Technologies
   * @copyright
   */
  PartyReportDataService.$inject = ["$q", "$timeout", "PartyReportGridConfig", "HTTPFactory"];

  /**
   * @ngdoc Service
   * @name PartyReportDataService
   * @module immiApp.report
   * @requires
   * @description
   * This service has functionality to interface with backend to send and fetch data.
   * @author Connvertex Technologies
   * @copyright
   */
  angular.module("immiApp.report")
    .service("PartyReportDataService", PartyReportDataService);

})();
