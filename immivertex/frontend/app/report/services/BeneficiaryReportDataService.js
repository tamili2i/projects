(function() {
  "use strict";
  /*jslint nomen: true*/
  /*global angular, $, _*/


  function BeneficiaryReportDataService($q, $timeout, BeneficiaryReportGridConfig, HTTPFactory) {


    /**
     * @ngdoc Injector
     * @name BeneficiaryReportDataService
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
    _self.getBeneficiaryReport = function(queryParam) {
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
   * @name BeneficiaryReportDataService
   * @private
   * @module immiApp.report
   * @description
   * Inject module that needs to be useful for grid service
   * @author Connvertex Technologies
   * @copyright
   */
  BeneficiaryReportDataService.$inject = ["$q", "$timeout", "BeneficiaryReportGridConfig", "HTTPFactory"];

  /**
   * @ngdoc Service
   * @name BeneficiaryReportDataService
   * @module immiApp.report
   * @requires
   * @description
   * This service has functionality to interface with backend to send and fetch data.
   * @author Connvertex Technologies
   * @copyright
   */
  angular.module("immiApp.report")
    .service("BeneficiaryReportDataService", BeneficiaryReportDataService);

})();
