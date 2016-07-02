(function() {
    "use strict";

    angular
        .module("immiApp.SystemAdministration")
        .controller("SubscriberProfileController", SubscriberProfileController);

    /**
     * @ngdoc Injector
     * @name SubscriberProfileController
     * @private
     * @module immiApp.SystemAdministration
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    SubscriberProfileController.$inject = [
      "Subscriber",
      "SubscriberService",
      "$rootScope",
      "$stateParams",
      "PlacesFactory",
      "Utils"
    ];

    /**
     * @ngdoc Controller
     * @name SubscriberProfileController
     * @module immiApp.SystemAdministration
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function SubscriberProfileController(Subscriber, SubscriberService, $rootScope, $stateParams, PlacesFactory, Utils) {
        var vm = this;
        vm.subscriber = Subscriber;
        console.log(vm.subscriber);
        /**
         * @ngdoc function
         * @name updateSubscriber
         * @description
         * Updates subscriber details
         */
        vm.updateSubscriber = function(){
          var subscriber = angular.copy(vm.subscriber);
          subscriber.party_id = vm.subscriber.id;
          subscriber.profile_type = vm.subscriber.party_type.name;
          subscriber.phone = vm.subscriber.phone[0];
          SubscriberService.updateSubscriber(subscriber, function(response) {
            console.log(response);
          });
        };

        /**
         * @ngdoc function
         * @name locationCallback
         * @param {object}location
         * @description
         * Gets location based on user search
         *
         */
        vm.locationCallback = function(location) {
          vm.places.getAppIDsForAddress(location.longName, vm.subscriber.address, function(address){
            vm.places.metaLocation = location.longName;
            console.log("States and cities fetched according to google places");
          });
        };

        /**
         * @ngdoc function
         * @name resetAddressModel
         * @description
         * Resets birthInfo when country changes
         *
         */
        vm.resetAddressModel = function() {
          vm.subscriber.address.location.state_id = null;
          vm.subscriber.address.location.city_id = null;
          vm.places.locationFinder = null;
        };

        /**
         * @ngdoc function
         * @name init
         * @description
         * Initializes countries and states
         * If General info doesn't saved for a single time, then we need to set address
         * Object structure to that. For that we have used Utils, where we have maintaining
         * address structure for all the modules
         */
        var init = function(){
          if($stateParams.id) {
            $rootScope.state = $stateParams.id;
          }
          //vm.subscriber.address = vm.subscriber.address ? vm.subscriber.address : Utils.getAddressModel(AddressTypes, "Birth", Beneficiary.party_id);
          vm.places = Utils.createPlaceInstance(vm.subscriber.address, PlacesFactory);
        };
        init();
    }
})();
