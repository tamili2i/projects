(function() {
  "use strict";
  /*jslint nomen: true*/
  /*global angular, $, _*/

  /**
   * @ngdoc Service
   * @name PassportReportService
   * @module immiApp.report
   * @requires
   * @description
   * This service has functionality to interface with backend to send and fetch data.
   * @author Connvertex Technologies
   * @copyright
   */
  angular.module("immiApp.report")
    .service("PassportReportService", PassportReportService);

  /**
   * @ngdoc Injector
   * @name PassportReportService
   * @private
   * @module immiApp.report
   * @description
   * Inject module that needs to be useful for grid service
   * @author Connvertex Technologies
   * @copyright
   */
  PassportReportService.$inject = ["$q", "$timeout", "$state", "PassportReportDataService",  "HTTPFactory", "ToasterService", "Session"];



  function PassportReportService($q, $timeout, $state, PassportReportDataService, HTTPFactory, ToasterService, Session) {
    var _self = this;

    /**
     * @ngdoc function
     * @name getPassportReport
     * @param successCallback
     * @param errorCallback
     * @description
     * Get list of Passport Expiration
     *
     */
    _self.getPassportReport = function(queryParam, successCallback, errorCallback) {

      var passportList = PassportReportDataService.getPassportReport(queryParam);

      passportList.then(function(response) {
        successCallback(response.data);
      }, function() {
        ToasterService.toastError("In loading Passport Report", "Error");
        errorCallback();
      });
    };


    return _self;

  }

})();
