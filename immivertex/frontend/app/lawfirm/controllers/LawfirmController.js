(function() {
    "use strict";

    angular
        .module("immiApp.lawfirm")
        .controller("LawfirmController", LawfirmController);

    /**
     * @ngdoc Injector
     * @name LawfirmController
     * @private
     * @module immiApp.lawfirm
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    LawfirmController.$inject = ["CorporationService", "LawfirmService", "PartyService", "DashboardService", "Session"];

    /**
     * @ngdoc Controller
     * @name LawfirmController
     * @module immiApp.lawfirm
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function LawfirmController(CorporationService, LawfirmService, PartyService, DashboardService, Session) {
        var vm = this;
        vm.boxItems = [];

        /**
          * @ngdoc function
          * @name getCorporationList
          * @description
          * Get list of corporations under lawfirm
          *
          */
        vm.getCorporationList = function(){
          var queryParam = constructQueryParam();
          CorporationService.getCorporationList(queryParam, function successCallback(response) {
            vm.corporation_list = response.data;
            vm.total_corporations = response.total;
            var corporation_box_items = {
              "name": "Corporation",
              "list_title": "List of Corporations",
              "count": vm.total_corporations,
              "create_url": "#/corporations/",
              "edit_url": "#/corporations",
              "list_url": "#/corporations",
              "box_color": "tiles-success",
              "list_color": "green-color",
              "itemList": vm.corporation_list,
              "not_found": "No corporations found"
            }
            vm.boxItems.push(corporation_box_items);
          }, function errorCallback() {
            console.log("Errrorrrrr :");
          });
        };


      /**
        * @ngdoc function
        * @name getBeneficiaryList
        * @description
        * Get list of beneficiaries under lawfirm
        *
        */
        vm.getBeneficiaryList = function(){
          var queryParam = constructQueryParam();
          LawfirmService.getBeneficiaryList(queryParam, function successCallback(response) {
           vm.beneficiary_list = response.data;
           vm.total_beneficiaries = response.total;
           var beneficiary_box_items = {
             "name": "Beneficiary",
             "list_title": "List of Beneficiaries",
             "count": vm.total_beneficiaries,
             "create_url": "#/beneficiary/create",
             "edit_url": "#/beneficiary",
             "list_url": "#/beneficiaries",
             "box_color": "tiles-midnightblue",
             "list_color": "red-color",
             "itemList": vm.beneficiary_list,
             "not_found": "No beneficiaries found"
           }
           vm.boxItems.push(beneficiary_box_items);
          });
        };

        /**
          * @ngdoc function
          * @name getParties
          * @param {Number} party_id - party_id of lawfirm
          * @description
          * Gets list of parties under lawfirm
          *
          */
        vm.getParties = function(){
          PartyService.getParties({}, function callback(response) {
            vm.party_list = response.data;
            vm.total_parties = response.total;
            var party_box_items = {
              "name": "Party",
              "list_title": "List of Parties",
              "count": vm.total_parties,
              "create_url": "#/party/",
              "edit_url": "/#/party",
              "list_url": "#/parties",
              "box_color": "tiles-indigo",
              "list_color": "green-color",
              "itemList": vm.party_list,
              "not_found": "No parties found"
            }
            vm.boxItems.push(party_box_items);
          }, function errorCallback() {
            console.log("In loading Lawfirm");
          });
        };

        var constructQueryParam = function() {
          var queryParam = {};
          queryParam.party_id = Session.getPartyId();
          return queryParam;
        };

        /**
          * @ngdoc function
          * @name getDashboardBoxOrder
          * @description
          * Gets the dashboard boxes order detail.If the response is empty then get all list of dashboard boxes
          * by using module name.And save the dashboard box initial order on page load.
          *
          */
        vm.getDashboardBoxOrder = function(){
          vm.boxOrderId = [];
          DashboardService.getDashboardBoxOrder(Session.getPartyId(), function successCallback(response) {
            vm.boxOrderId = response;
          });
        };

        /**
         * @ngdoc function
         * @name init
         * @description
         * Initiates Intake form
         *
         */
        var init = function(){
          vm.getDashboardBoxOrder();
          vm.getCorporationList();
          vm.getBeneficiaryList();
          vm.getParties();
        };

        init();
    }
})();
