(function() {
    "use strict";

    angular
        .module("immiApp.beneficiary")
        .controller("BeneficiaryFormController", BeneficiaryFormController);

    /**
     * @ngdoc Injector
     * @name BeneficiaryFormController
     * @private
     * @module immiApp.beneficiary
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    BeneficiaryFormController.$inject = [
      "$scope",
      "$location",
      "BeneficiaryDataService",
      "BeneficiaryService",
      "Beneficiary",
      "Title",
      "Gender",
      "MaritalStatus",
      "Citizen",
      "ImmigrationStatuses",
      "$theme",
      "$rootScope",
      "Session"
    ];

    /**
     * @ngdoc BeneficiaryFormController
     * @name BeneficiaryFormController
     * @module immiApp.beneficiary
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function BeneficiaryFormController($scope, $location, BeneficiaryDataService, BeneficiaryService, Beneficiary, Title, Gender, MaritalStatus, Citizen, ImmigrationStatuses, $theme, $rootScope, Session) {
        var vm = this;

        vm.tabs = [];
        vm.beneficiary = Beneficiary;
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
         * @param beneficiary
         * @description
         * Get tab list based on beneficiary
         * mode whether creation or edition
         *
         */
        var getTabs = function(beneficiary){

          if(!beneficiary.id)
            return [{
              "state" : Session.getAccessType() ? "home.beneficiary.general" : "home.viewBeneficiary.general",
              "name" : "General",
              "refName" : "general"
            }];
          else
            return [{
                "state" : Session.getAccessType() ? "home.beneficiary.general" : "home.viewBeneficiary.general",
                "name" : "General",
                "refName" : "general"
              }, {
                "state" : Session.getAccessType() ? "home.beneficiary.address" : "home.viewBeneficiary.address",
                "name" : "Address",
                "refName" : "address"
              }, {
                "state" : Session.getAccessType() ? "home.beneficiary.documents" : "home.viewBeneficiary.documents",
                "name" : "Document",
                "refName" : "document"
              }, {
                "state" : Session.getAccessType() ? "home.beneficiary.education" : "home.viewBeneficiary.education",
                "name" : "Education",
                "refName" : "education"
              }, {
                "state" : Session.getAccessType() ? "home.beneficiary.employment" : "home.viewBeneficiary.employment",
                "name" : "Employment",
                "refName" : "employment"
              }, {
                "state" : Session.getAccessType() ? "home.beneficiary.history" : "home.viewBeneficiary.history",
                "name" : "History",
                "refName" : "history"
              }, {
                "state" : Session.getAccessType() ? "home.beneficiary.background" : "home.viewBeneficiary.background",
                "name" : "Background",
                "refName" : "background"
              }, {
                "state" : Session.getAccessType() ? "home.beneficiary.cases" : "home.viewBeneficiary.cases",
                "name" : "Cases",
                "refName" : "cases"
              }, {
                "state" : Session.getAccessType() ? "home.beneficiary.userNotes" : "home.viewBeneficiary.userNotes",
                "name" : "User Notes",
                "refName" : "userNotes"
              }, {
                "state" : Session.getAccessType() ? "home.beneficiary.changeHistory" : "home.viewBeneficiary.changeHistory",
                "name" : "Change History",
                "refName" : "changeHistory"
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
          if(Session.getPartyType() === "beneficiary") {
            return "Beneficiary";
          } else {
            return vm.beneficiary.party_id;
          }
        };

        /**
         * @ngdoc function
         * @name init
         * @description
         * Initiates Beneficiary form
         *
         */
        var init = function(){
          vm.tabs = getTabs(Beneficiary);
          $theme.set("leftbarCollapsed", true);

          $rootScope.state = getStateName();
        };

        init();

    }
})();
