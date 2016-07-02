(function() {
    "use strict";

    angular
        .module("immiApp.corporation")
        .controller("CorporationController", CorporationController);

    /**
     * @ngdoc Injector
     * @name CorporationController
     * @private
     * @module ModuleName
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    CorporationController.$inject = ["LawfirmService", "CorporationService", "PartyService", "DashboardService", "Session"];

    /**
     * @ngdoc Controller
     * @name CorporationController
     * @module ModuleName
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function CorporationController(LawfirmService, CorporationService, PartyService, DashboardService, Session) {
        var vm = this;
        vm.boxItems = [];

        /**
          * @ngdoc function
          * @name getLawfirmList
          * @description
          * Get list of lawfirms under corporation
          *
          */
        vm.getLawfirmList = function(){
          var queryParam = constructQueryParam();
          LawfirmService.getLawfirmList(queryParam, function successCallback(response) {
            vm.lawfirm_list = response.data;
            vm.total_lawfirms = response.total;
            var lawfirm_box_items = {
              "name": "Law Firm",
              "list_title": "List of Law Firms",
              "count": vm.total_lawfirms,
              "create_url": "#/lawfirms/",
              "edit_url": "#/lawfirms",
              "list_url": "#/lawfirms",
              "box_color": "tiles-success",
              "list_color": "green-color",
              "itemList": vm.lawfirm_list,
              "not_found": "No lawfirms found"
            }
            vm.boxItems.push(lawfirm_box_items);
          }, function errorCallback() {
            console.log("Errrorrrrr :");
          });
        };

        /**
          * @ngdoc function
          * @name getBeneficiaryList
          * @description
          * Get list of beneficiaries under corporation
          *
          */
        vm.getBeneficiaryList = function(){
          var queryParam = constructQueryParam();
          CorporationService.getBeneficiaryList(queryParam, function successCallback(response) {
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
          * @param {Number} party_id - party_id of corporation
          * @description
          * Gets list of parties under corporation
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
          vm.getLawfirmList();
          vm.getBeneficiaryList();
          vm.getParties();
        };

        init();

    }
})();
