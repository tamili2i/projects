(function() {
    "use strict";

    angular
        .module("immiApp.SystemAdministration")
        .service("SubscriberService", SubscriberService);

    /**
     * @ngdoc Injector
     * @name SubscriberService
     * @private
     * @module immiApp.SystemAdministration
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    SubscriberService.$inject = [
      "SubscriberGridConfig",
      "SubscriberDataService",
      "Session",
      "ToasterService",
      "$state"
    ];

    /**
     * @ngdoc Service
     * @name SubscriberService
     * @module immiApp.SystemAdministration
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function SubscriberService(SubscriberGridConfig, SubscriberDataService, Session, ToasterService, $state) {
      var _self = this;

      /**
       * @ngdoc function
       * @name setControllerContext
       * @param srcContext
       * @description
       * Sets scope of controller in grid
       */
      _self.setControllerContext = function(srcContext){
        SubscriberGridConfig.setControllerContext(srcContext);
      }

      /**
       * @ngdoc function
       * @name getSubscriberList
       * @param {object} queryParam
       * @param {function} successCallback
       * @param {function} errorCallback
       * @description
       * Gets list of available subscribers
       */
      _self.getSubscriberList = function(queryParam, successCallback, errorCallback) {
        var subscribers = SubscriberDataService.getSubscriberList(queryParam);
        subscribers.then(function(response) {
          successCallback(response.data);
        }, function(response) {
          errorCallback(response);
        });
      };

      /**
       * @ngdoc function
       * @name getSubscriber
       * @param {number} party_id
       * @description
       * This method used to fetch subscriber details based on id
       */
       _self.getSubscriber = function(party_id){
         return SubscriberDataService.getSubscriber(party_id);
       };

       /**
        * @ngdoc function
        * @name convertToString
        * @param {array} array
        * @description
        * Converts array to string
        */
       _self.convertToString = function(array) {
         return array.toString();
       };

       /**
        * @ngdoc function
        * @name sendCommunication
        * @param {object} Communication
        * @param {function} callback
        * @description
        * Sends communication details to subscribers
        */
       _self.sendCommunication = function(communication, callback) {
         communication.created_by = Session.getPartyId();
         console.log(communication);
         var Communication = SubscriberDataService.sendCommunication(communication);
         Communication.then(function(response){
           ToasterService.toastSuccess("Alert sent successfully", "Success");
         }, function(response) {
           ToasterService.toastError("Sending alert failed", "Error");
         });
       };

       /**
        * @ngdoc function
        * @name getActionList
        * @description
        * Gets list of actions
        */
       _self.getActionList = function() {
         return SubscriberDataService.getActionList();
       };

       /**
        * @ngdoc function
        * @name updateSubscriber
        * @param {object} subscriber
        * @description
        * Updates subscriber information
        */
       _self.updateSubscriber = function(subscriber, callback) {
         console.log(subscriber);
         subscriber.updated_by = Session.getPartyId();
         subscriber.created_by = Session.getPartyId();
         var subscriber = SubscriberDataService.updateSubscriber(subscriber);
         subscriber.then(function(response) {
           callback(response.data);
           ToasterService.toastSuccess("Subscriber updated successfully", "Success");
           $state.go("home.subscribers")
         }, function(response) {
           //callback(response.data);
           ToasterService.toastError("Subscriber was not updated", "Error");
         });
       };

       /**
        * @ngdoc function
        * @name viewAllCommunication
        * @param {object} queryParam
        * @description
        * Gets all communication sent
        */
       _self.viewAllCommunication = function(queryParam,callback) {
         var communications = SubscriberDataService.viewAllCommunication(queryParam);
         communications.then(function(response) {
           callback(response.data);
         });
       };

       /**
        * @ngdoc function
        * @name getCommunicationByPartyId
        * @param {object} queryParam
        * @description
        * Gets all communication of particular party
        */
       _self.getCommunicationByPartyId = function(queryParam, callback) {
         var communications = SubscriberDataService.getCommunicationByPartyId(queryParam);
         communications.then(function(response) {
           callback(response.data);
         });
       };
      return _self;
    }
})();
