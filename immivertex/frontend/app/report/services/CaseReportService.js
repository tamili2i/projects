(function() {
  "use strict";
  /*jslint nomen: true*/
  /*global angular, $, _*/

  /**
   * @ngdoc Service
   * @name CaseReportService
   * @module immiApp.report
   * @requires
   * @description
   * This service has functionality to interface with backend to send and fetch data.
   * @author Connvertex Technologies
   * @copyright
   */
  angular.module("immiApp.report")
    .service("CaseReportService", CaseReportService);

  /**
   * @ngdoc Injector
   * @name CaseReportService
   * @private
   * @module immiApp.report
   * @description
   * Inject module that needs to be useful for grid service
   * @author Connvertex Technologies
   * @copyright
   */
  CaseReportService.$inject = ["$q", "$timeout", "$state", "CaseReportDataService",  "HTTPFactory", "ToasterService", "Session"];



  function CaseReportService($q, $timeout, $state, CaseReportDataService, HTTPFactory, ToasterService, Session) {
    var _self = this;

    /**
     * @ngdoc function
     * @name getCaseReport
     * @param successCallback
     * @param errorCallback
     * @description
     * Get list of Case
     *
     */
    _self.getCaseReport = function(queryParam, successCallback, errorCallback) {

      var casetList = CaseReportDataService.getCaseReport(queryParam);

      casetList.then(function(response) {
        successCallback(response.data);
      }, function() {
        ToasterService.toastError("In loading Case Report", "Error");
        errorCallback();
      });
    };


    return _self;

  }

})();
