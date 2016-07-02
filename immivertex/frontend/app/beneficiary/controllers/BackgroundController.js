(function() {
    "use strict";
    angular.module("immiApp.beneficiary")
        .controller("BackgroundController", BackgroundController);
    /**
     * @ngdoc Injector
     * @name BackgroundController
     * @private
     * @module immiApp.beneficiary
     * @description
     * BackgroundController
     * @author Ideas2IT Technologies
     * @copyright
     */
    BackgroundController.$inject = ["Background", "BeneficiaryService", "Beneficiary", "Session"];

     /**
     * @ngdoc Controller
     * @name BackgroundController
     * @module immiApp.beneficiary
     * @requires
     * @description
     * BackgroundController
     * @author Ideas2IT Technologies
     * @copyright
     */
    function BackgroundController(Background, BeneficiaryService, Beneficiary, Session) {
        var vm = this;
        vm.backgroundQns = {
          "party_id": Beneficiary.party_id,
          "updated_by": Session.getUpdatedBy(),
          "questionAnsInfo": Background
        }
        console.log("GET ::",vm.backgroundQns);

        /**
         * @ngdoc function
         * @name save
         * @param evt
         * @description
         * Saves Beneficiary's background information
         *
         */
        vm.save = function(evt) {
          evt.preventDefault();
          BeneficiaryService.saveBackground(vm.backgroundQns, function callback(response) {
            console.log("General info updated!!!!");
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
        };

        init();
    }
})();
