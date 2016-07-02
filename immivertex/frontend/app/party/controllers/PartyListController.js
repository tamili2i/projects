(function() {
    "use strict";

    angular
        .module("immiApp.party")
        .controller("PartyListController", PartyListController);

    /**
     * @ngdoc Injector
     * @name PartyListController
     * @private
     * @module immiApp.party
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    PartyListController.$inject = [
        "$scope",
        "$location",
        "$state",
        "PartyService",
        "GridConstants",
        "GridService",
        "Session"
        ];

    /**
     * @ngdoc Controller
     * @name PartyListController
     * @module immiApp.party
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function PartyListController($scope, $location, $state, PartyService, GridConstants, GridService, Session) {
        var vm = this;

        vm.partyForms = [];
        vm.isLoading = true;
        vm.gridName = GridConstants.PARTY_LIST;

        /**
         * @ngdoc function
         * @name onPaginate
         * @param {String} pageNo
         * @description
         * binded with pagination
         * and it will be invoked for every
         * page change action
         *
         */
        var onPaginate = function(pageNo) {
          $location.search({
            "page": pageNo
          });
          vm.getParties();
        };

        var constructQueryParam = function() {
          var qParam = $location.search(),
            queryParam = {};
          if (qParam.page) {
            queryParam.page = qParam.page;
          }
          return queryParam;
        };


        /**
         * @ngdoc function
         * @name getPartyList
         * @description
         * Gets list of partyForms
         *
         */
         vm.getParties = function(){
           vm.isLoading = true;
           var queryParam = constructQueryParam();
           PartyService.getParties(queryParam, function callback(response) {
             GridService.renderGridWithPagination({
               "gridId": GridConstants.PARTY_LIST,
               "dataObj": response,
               "context": $scope,
               "onPaginate": onPaginate
             }, function() {
               vm.isLoading = false;
               vm.access_type = Session.getAccessType();
             });
           }, function errorCallback() {
             GridService.renderGrid(GridConstants.PARTY_LIST, [], function() {
               vm.isLoading = false;
             });
           });
         };
         /**
         * @ngdoc event
         * @name $destroy
         * @description
         * Will destroy grid components which
         * associated with this controller.
         */
        $scope.$on("$destroy", function(){
          GridService.destroyGrid(vm.gridName);
        });


    }
})();
