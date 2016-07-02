(function() {
    "use strict";

    angular
        .module("immiApp.caseManagement")
        .controller('CreateCaseController', CreateCaseController);

    /**
     * @ngdoc Injector
     * @name CreateCaseController
     * @private
     * @module immiApp.caseManagement
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    CreateCaseController.$inject = [
      "$filter",
      "CaseTypes",
      "CaseService"
    ];

    /**
     * @ngdoc Controller
     * @name CreateCaseController
     * @module immiApp.caseManagement
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function CreateCaseController($filter, CaseTypes,CaseService) {
        var vm = this;
        vm.showAlert = false;
        vm.caseTypes = CaseTypes;
        vm.beneficiaryList =[{"party_id":435,"name":"Ganesh","type":"corporation"},{"party_id":441,"name":"Ganesh","type":"person"},{"party_id":453,"name":"Ganeshonly","type":"person"},{"party_id":459,"name":"Ganesh","type":"person"},{"party_id":470,"name":"Ganesh","type":"person"},{"party_id":472,"name":"Ganesh","type":"person"},{"party_id":474,"name":"Ganesh","type":"person"},{"party_id":573,"name":"ghjgh","type":"person"},{"party_id":586,"name":"ghfhf","type":"person"},{"party_id":643,"name":"gvhgfh","type":"person"},{"party_id":955,"name":"gggggggggggg","type":"person"},{"party_id":956,"name":"gggggggggggg","type":"person"},{"party_id":957,"name":"gdfgdfg","type":"person"},{"party_id":958,"name":"gdfgdfg","type":"person"},{"party_id":959,"name":"gdfgdfg","type":"person"}];

        /**
         * @ngdoc function
         * @name getBeneficiary
         * @description
         * Gets list of beneficiaries
         */
        vm.getBeneficiary = function(key) {
          vm.beneficiaries = $filter("filter")(vm.beneficiaryList, key);
          //vm.beneficiaries.length = 15;
          if(vm.beneficiaries.length<1){
            vm.showAlert = true;
          } else {
            vm.showAlert = false;
          }
        };

        /**
         * @ngdoc function
         * @name beneficiaryCallback
         * @description
         * Sets model value
         */
        vm.beneficiaryCallback = function(beneficiary){
          vm.beneficiary = beneficiary.name;

        };

        /**
         * @ngdoc function
         * @name loadFormContainer
         * @description
         * Initiate form container with animation
         *
         */
        var loadFormContainer = function() {
          $(".create-container").collapse("toggle");
        };

        /**
         * @ngdoc function
         * @name closeAlert
         * @description
         * Closes alert message
         *
         */
         vm.closeAlert = function(){
           vm.showAlert = false;
         };

         /**
          * @ngdoc function
          * @name setPageRedirection
          * @description
          * Sets from state is create case
          *
          */
         vm.setPageRedirection = function() {
           CaseService.setPageRedirection(true);
         };

         /**
          * @ngdoc function
          * @name init
          * @description
          * Initiates CreateCaseController
          *
          */
         function init() {
           loadFormContainer();
         };
         init();


    }
})();
