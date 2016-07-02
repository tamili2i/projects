(function() {
    "use strict";
    /*jslint nomen: true*/
    /*global angular, $, _*/

    /**
     * @ngdoc Service
     * @name DashboardDataService
     * @module immiApp.system
     * @requires
     * @description
     * This service has functionality to interface with backend to send and fetch data.
     * @author Ideas2IT Technologies
     * @copyright
     */
    angular.module("immiApp.system")
        .service("DashboardDataService", DashboardDataService);


    /**
     * @ngdoc Injector
     * @name DashboardDataService
     * @private
     * @module immiApp.system
     * @description
     * Inject module that needs to be useful for grid service
     * @author Ideas2IT Technologies
     * @copyright
     */
    DashboardDataService.$inject = ["HTTPFactory"];


    function DashboardDataService(HTTPFactory) {
        var _self = this;

        /**
          * @ngdoc function
          * @name saveDashboardBoxOrder
          * @param  {object} boxOrder includes box_id and order_id
          * @description
          * save the dashboard box order info while drag and drop the dashboard boxes
          *
          */
        _self.saveDashboardBoxOrder = function(boxOrder) {
          return HTTPFactory.call({
            url: "/person/dashboardboxes",
            method: "POST",
            data: boxOrder
          });
        };

        /**
          * @ngdoc function
          * @name getDashboardBoxOrder
          * @param  {Number} partyId includes party_id of corporation
          * @description
          * Gets the dashboard boxes order detail
          *
          */
        _self.getDashboardBoxOrder = function(partyId) {
          return HTTPFactory.call({
            url: "/person/dashboardboxes/" + partyId,
            method: "GET"
          });
        };

        /**
          * @ngdoc function
          * @name getDashboardBoxes
          * @description
          * Gets all dashboard boxes
          *
          */
        _self.getDashboardBoxes = function() {
          return HTTPFactory.call({
            url: "/person/dashboardboxes",
            method: "GET"
          });
        };

        return _self;

    }

})();
