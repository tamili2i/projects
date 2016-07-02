(function() {
    "use strict";
    angular.module("immiApp.beneficiary")
        .controller("BeneficiaryCaseController", BeneficiaryCaseController);
    /**
     * @ngdoc Injector
     * @name BeneficiaryCaseController
     * @private
     * @module immiApp.beneficiary
     * @description
     * BeneficiaryCaseController
     * @author Ideas2IT Technologies
     * @copyright
     */
    BeneficiaryCaseController.$inject = ["BeneficiaryService", "Cases", "Session"];

     /**
     * @ngdoc Controller
     * @name BeneficiaryCaseController
     * @module immiApp.beneficiary
     * @requires
     * @description
     * BeneficiaryCaseController
     * @author Ideas2IT Technologies
     * @copyright
     */
    function BeneficiaryCaseController(BeneficiaryService, Cases, Session) {
        var vm = this;
        vm.caseList = Cases.data;
        vm.access_type = Session.getAccessType();

        var checkPremiumType = function(cases){
          _.each(cases, function(bcase, index){
            var premium_type = bcase.is_premium == 1 ? "Yes" : "No";
            return bcase.is_premium = premium_type;
          });
        };


        /**
        * @ngdoc function
        * @name init
        * @description
        * Initiates employment form
        *
        */
        var init = function(){
          checkPremiumType(Cases.data);
        };

        init();
    }
})();
