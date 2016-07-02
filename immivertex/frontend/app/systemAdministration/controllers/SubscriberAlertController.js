(function() {
    "use strict";

    angular
        .module("immiApp.system")
        .controller("SubscriberAlertController", SubscriberAlertController);

    /**
     * @ngdoc Injector
     * @name SubscriberAlertController
     * @module immiApp.system
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    SubscriberAlertController.$inject = [
      "SubscriberService",
      "$stateParams",
      "InfiniteScroll",
      "$rootScope",
      "Actions",
      "$timeout"
    ];

    /**
     * @ngdoc Controller
     * @name SubscriberAlertController
     * @module immiApp.system
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function SubscriberAlertController(SubscriberService, $stateParams, InfiniteScroll, $rootScope, Actions, $timeout) {
      var vm = this;

      vm.alerts = [];
      vm.subscriberAlert = {};
      vm.isLoading = true;
      vm.scroll = new InfiniteScroll();
      vm.actions = Actions;
      vm.action_id = null;
      /**
       * @ngdoc function
       * @name init
       * @param {number} action_id
       * @description
       * Initializes the controller with
       * initial data
       *
       */
      function init(action_id) {
        if($stateParams.id) {
          $rootScope.state = " / "+$stateParams.id;
          vm.getCommunicationByPartyId(1, action_id);
        } else {
          vm.viewAllCommunication(1, action_id);
        }
      }

      /**
       * @ngdoc function
       * @name nextPage
       * @param {number} action_id
       * @description
       * will be called from infinite scroll
       * Given as callback for infinite scroll
       */
      vm.nextPage = function(action_id) {
        if (vm.scroll.busy)
          return;
        if (vm.subscriberAlert.current_page < vm.subscriberAlert.last_page) {
          vm.scroll.busy = true;
          if($stateParams.id) {
            if(vm.action_id){
              vm.getCommunicationByPartyId(vm.subscriberAlert.current_page + 1, vm.action_id);
            } else{
              vm.getCommunicationByPartyId(vm.subscriberAlert.current_page + 1);
            }
          } else {
            if(vm.action_id){
              vm.viewAllCommunication(vm.subscriberAlert.current_page + 1, vm.action_id);
            } else{
              vm.viewAllCommunication(vm.subscriberAlert.current_page + 1);
            }
          }
        }
      };

      /**
       * @ngdoc function
       * @name viewAllCommunication
       * @param {number} page
       * @param {number} type_id
       * @description
       * Gets all communication sent
       */
      vm.viewAllCommunication = function(page, type_id) {
        var queryParam = {
          "page":page
        };
        if(type_id) {
          queryParam.type_id = type_id;
        }
        SubscriberService.viewAllCommunication(queryParam, function success(alerts) {
          vm.subscriberAlert = alerts;
          _.each(alerts.data, function(communication) {
            communication.created_at = new Date(communication.created_at);
            vm.alerts.push(communication);
          });
          vm.isLoading = false;
          vm.scroll.busy = false;
        });
      };

      /**
       * @ngdoc function
       * @name getCommunicationByPartyId
       * @param {number} page
       * @param {number} type_id
       * @description
       * Gets all communication sent to particular party
       */
      vm.getCommunicationByPartyId = function(page,type_id){
        var queryParam = {
          "party_id": $stateParams.id,
          "page": page
        };
        if(type_id) {
          queryParam.type_id = type_id;
        }
        SubscriberService.getCommunicationByPartyId(queryParam, function(response){
          console.log(response);
          vm.subscriberAlert = response;
          _.each(response.data, function(communication) {
            communication.created_at = new Date(communication.created_at);
            vm.alerts.push(communication);
          });
          vm.scroll.busy = false;
          vm.isLoading = false;
        });
      };

      /**
       * @ngdoc function
       * @name getFilteredAlerts
       * @param {number} action_id
       * @description
       * Gets all alerts based on communication type id
       */
      vm.getFilteredAlerts = function(action_id) {
        vm.alerts = [];
        vm.subscriberAlert = {};
        vm.action_id = action_id;
        vm.isLoading = true;
        init(action_id);
        $timeout(function(){
          vm.nextPage(action_id);
        },400)
      };
      init();
    }
})();
