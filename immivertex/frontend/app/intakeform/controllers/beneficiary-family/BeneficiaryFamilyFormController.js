(function() {
    "use strict";

    angular
        .module("immiApp.intakeform")
        .controller("BeneficiaryFamilyFormController", BeneficiaryFamilyFormController);

    /**
     * @ngdoc Injector
     * @name BeneficiaryFamilyFormController
     * @private
     * @module immiApp.intakeform
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    BeneficiaryFamilyFormController.$inject = [
      "BeneficiaryFamily",
      "$theme",
      "$rootScope",
      "$location",
      "Session",
      "Title",
      "Gender",
      "MaritalStatus",
      "Citizen",
      "ImmigrationStatuses"
    ];

    /**
     * @ngdoc BeneficiaryFamilyFormController
     * @name BeneficiaryFamilyFormController
     * @module immiApp.intakeform
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function BeneficiaryFamilyFormController(BeneficiaryFamily, $theme, $rootScope, $location, Session, Title, Gender, MaritalStatus, Citizen, ImmigrationStatuses) {
        var vm = this;

        vm.tabs = [];
        vm.beneficiary = BeneficiaryFamily;
        vm.titles =  Title.data;
        vm.genders = Gender;
        vm.maritalStatus = MaritalStatus.data;
        vm.citizenship_countries = Citizen.data;
        vm.immigrationStatuses = ImmigrationStatuses;
        var url = $location.url();
        var viewUrl = url.split("/")[2];
        if(viewUrl == "view"){
          Session.setAccessType(false);
        }else {
          Session.setAccessType(true);
        }
        vm.access_type = Session.getAccessType();

        /**
         * @ngdoc function
         * @name getTabs
         * @param intakeform
         * @description
         * Get tab list based on intakeform
         * mode whether creation or edition
         *
         */
        var getTabs = function(beneficiary){
          return [{
              "state" : Session.getAccessType() ? "home.beneficiaryFamily.general" : "home.beneficiaryFamilyView.general",
              "name" : "General",
              "refName" : "general"
            }, {
              "state" : Session.getAccessType() ? "home.beneficiaryFamily.address" : "home.beneficiaryFamilyView.address",
              "name" : "Address",
              "refName" : "address"
            }, {
              "state" : Session.getAccessType() ? "home.beneficiaryFamily.documents" : "home.beneficiaryFamilyView.documents",
              "name" : "Document",
              "refName" : "document"
            }, {
              "state" : Session.getAccessType() ? "home.beneficiaryFamily.employment" : "home.beneficiaryFamilyView.employment",
              "name" : "Employment",
              "refName" : "employment"
            }, {
              "state" : Session.getAccessType() ? "home.beneficiaryFamily.background" : "home.beneficiaryFamilyView.background",
              "name" : "Background",
              "refName" : "background"
            }, {
              "state" : Session.getAccessType() ? "home.beneficiaryFamily.history" : "home.beneficiaryFamilyView.history",
              "name" : "History",
              "refName" : "history"
            }];
        };
        /**
         * @ngdoc function
         * @name getState
         * @description
         * returns current state name
         *
         */
         var getStateName = function() {
           if(vm.beneficiary.id) {
             return vm.beneficiary.id;
           } else {
             return "Create";
           }
         };

        /**
         * @ngdoc function
         * @name init
         * @description
         * Initiates IntakeForm
         *
         */
        var init = function(){
          vm.tabs = getTabs(BeneficiaryFamily);
          $theme.set("leftbarCollapsed", true);

          $rootScope.state = getStateName();
        };

        init();

    }
})();
