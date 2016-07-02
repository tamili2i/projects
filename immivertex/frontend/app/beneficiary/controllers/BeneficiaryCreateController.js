(function() {
    "use strict";

    angular
        .module("immiApp.beneficiary")
        .controller("BeneficiaryCreateController", BeneficiaryCreateController);

    /**
     * @ngdoc Injector
     * @name BeneficiaryCreateController
     * @private
     * @module immiApp.beneficiary
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    BeneficiaryCreateController.$inject = ["BeneficiaryService","$state", "Session", "Countries" ];

    /**
     * @ngdoc Controller
     * @name BeneficiaryCreateController
     * @module immiApp.beneficiary
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function BeneficiaryCreateController(BeneficiaryService, $state, Session, Countries) {
        var vm = this;

        vm.beneficiary = {};
        vm.countries = Countries;
        vm.availableBeneficiary = [];
        /**
         * @ngdoc function
         * @name save
         * @param evt
         * @description
         * Saves Beneficiary's information
         *
         */
        vm.save = function(evt, beneficiaryForm) {
          evt.preventDefault();
          vm.beneficiary.owned_by = Session.getUpdatedBy();
          vm.beneficiary.updated_by = Session.getUpdatedBy();
          vm.beneficiary.module = "corporation";
          BeneficiaryService.saveBeneficiary(vm.beneficiary, function callback(response) {
             //console.log("Beneficiary Saved"+response);
            vm.availableBeneficiary = [];
             if(response["email.email"]){
               vm.getAvailableBeneficiaryByEmail(vm.beneficiary.email.email);
               beneficiaryForm.email.$setValidity("availability", false);
             }
             if(response["passport.number"]){
               vm.getAvailableBeneficiaryByPassport(vm.beneficiary.passport.number);
               beneficiaryForm.passportNo.$setValidity("availability", false);
             }
           });
        };

        /**
         * @ngdoc function
         * @name setAvailability
         * @param element
         * @description
         * Sets availability validation to true
         *
         */
        vm.setAvailability = function(element) {
          element.$setValidity("availability", true);
        }

        /**
         * @ngdoc function
         * @name getAvailableBeneficiaryByEmail
         * @param {{string}} email
         * @description
         * Get available beneficiary by email
         *
         */
        vm.getAvailableBeneficiaryByEmail = function(email) {
          BeneficiaryService.getAvailableBeneficiary(email,function(response){
            if(!_.where(vm.availableBeneficiary,{"party_id":response.party_id})[0]){
              vm.availableBeneficiary.push(response);
            }
          });
        }

        /**
         * @ngdoc function
         * @name getAvailableBeneficiaryByPassport
         * @param {{string}} passportNo
         * @description
         * Get available beneficiary
         *
         */
        vm.getAvailableBeneficiaryByPassport = function(passportNo) {
          BeneficiaryService.getAvailableBeneficiaryByPassport(passportNo,function(response){
            if(!_.where(vm.availableBeneficiary,{"party_id":response.party_id})[0]){
              vm.availableBeneficiary.push(response);
            }
          });
        }

        /**
          * @ngdoc function
          * @name getNextPage
          * @description
          * Decides next page is create case or
          * beneficiary list page
          */
        vm.getNextPage = function() {
          BeneficiaryService.getNextPage();
        };

    }
})();
