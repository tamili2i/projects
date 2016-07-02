(function() {
  "use strict";
  /*jslint nomen: true*/
  /*global angular, $, _*/

  /**
   * @ngdoc Service
   * @name BeneficiaryReportService
   * @module immiApp.report
   * @requires
   * @description
   * This service has functionality to interface with backend to send and fetch data.
   * @author Connvertex Technologies
   * @copyright
   */
  angular.module("immiApp.report")
    .service("BeneficiaryReportService", BeneficiaryReportService);

  /**
   * @ngdoc Injector
   * @name BeneficiaryReportService
   * @private
   * @module immiApp.report
   * @description
   * Inject module that needs to be useful for grid service
   * @author Connvertex Technologies
   * @copyright
   */
  BeneficiaryReportService.$inject = ["$q", "$timeout", "$state", "BeneficiaryReportDataService",  "HTTPFactory", "ToasterService", "Session"];



  function BeneficiaryReportService($q, $timeout, $state, BeneficiaryReportDataService, HTTPFactory, ToasterService, Session) {
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
    _self.getBeneficiaryReport = function(queryParam, successCallback, errorCallback) {

      var beneficiaryList = BeneficiaryReportDataService.getBeneficiaryReport(queryParam);

      beneficiaryList.then(function(response) {
        successCallback(response.data);
      }, function() {
        ToasterService.toastError("In loading Beneficiary Report", "Error");
        errorCallback();
      });
    };


    return _self;

  }

})();
