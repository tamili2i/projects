(function() {
  "use strict";
  /*jslint nomen: true*/
  /*global angular, $, _*/


  function PassportReportDataService($q, $timeout, PassportReportGridConfig, HTTPFactory) {


    /**
     * @ngdoc Injector
     * @name PassportReportDataService
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
     * @name getPassportReport
     * @param {Object} queryParam includes party_id, start_date, end_date
     * @description
     * Get list of Passport Expiration
     */
    _self.getPassportReport = function(queryParam) {
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
   * @name PassportReportDataService
   * @private
   * @module immiApp.report
   * @description
   * Inject module that needs to be useful for grid service
   * @author Connvertex Technologies
   * @copyright
   */
  PassportReportDataService.$inject = ["$q", "$timeout", "PassportReportGridConfig", "HTTPFactory"];

  /**
   * @ngdoc Service
   * @name PassportReportDataService
   * @module immiApp.report
   * @requires
   * @description
   * This service has functionality to interface with backend to send and fetch data.
   * @author Connvertex Technologies
   * @copyright
   */
  angular.module("immiApp.report")
    .service("PassportReportDataService", PassportReportDataService);

})();
