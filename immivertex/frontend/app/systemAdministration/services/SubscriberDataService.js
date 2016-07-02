(function() {
    "use strict";

    angular
        .module("immiApp.SystemAdministration")
        .service("SubscriberDataService", SubscriberDataService);

    /**
     * @ngdoc Injector
     * @name SubscriberDataService
     * @private
     * @module immiApp.SystemAdministration
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    SubscriberDataService.$inject = [
      "HTTPFactory"
    ];

    /**
     * @ngdoc Service
     * @name SubscriberDataService
     * @module immiApp.SystemAdministration
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function SubscriberDataService(HTTPFactory) {
      var _self = this;

      /**
       * @ngdoc function
       * @name getSubscriberList
       * @param {object} queryParam
       * @description
       * Gets list of subscribers
       */
      _self.getSubscriberList = function(queryParam) {
        return HTTPFactory.call({
          url: "/systemadmin/productSubscription",
          method: "GET",
          params: queryParam
        });
      };

      /**
       * @ngdoc function
       * @name getSubscriber
       * @param {number} id
       * @description
       * Gets information about particular subscriber
       */
      _self.getSubscriber = function(id) {
        return HTTPFactory.call({
          url:"/user/registration/showfullprofile/"+id,
          method: "GET",
        });
      };

      /**
       * @ngdoc function
       * @name sendCommunication
       * @param {object} communication
       * @description
       * Sends alert to subscriber related to system updates,
       * system downtime
       */
      _self.sendCommunication = function(communication) {
        return HTTPFactory.call({
          url: "/systemadmin/communication",
          method: "POST",
          data: communication
        });
      };

      /**
       * @ngdoc function
       * @name getActionList
       * @description
       * Gets list of actions
       */
      _self.getActionList = function() {
        return HTTPFactory.call({
          url: "/systemadmin/communicationtypes/showCommunicationTypesList",
          method: "GET"
        });
      };

      /**
       * @ngdoc function
       * @name updateSubscriber
       * @param {object} subscriber
       * @description
       * Updates subscriber information
       */
      _self.updateSubscriber = function(subscriber) {
        return HTTPFactory.call({
          url: "/user/registration/editfullprofile/"+subscriber.party_id,
          method: "POST",
          data: subscriber
        });
      };

      _self.viewAllCommunication = function(queryParam) {
        return HTTPFactory.call({
          url: "/systemadmin/communication",
          method: "GET",
          params: queryParam
        });
      };

      _self.getCommunicationByPartyId = function(queryParam) {
        return HTTPFactory.call({
          url: "/systemadmin/communication/getCommunicationByPartyId",
          method: "GET",
          params: queryParam
        });
      };
    }
})();
