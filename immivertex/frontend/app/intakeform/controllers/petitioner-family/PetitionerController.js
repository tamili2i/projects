(function() {
    "use strict";

    angular
        .module("immiApp.intakeform")
        .controller("PetitionerController", PetitionerController);

    /**
     * @ngdoc Injector
     * @name PetitionerController
     * @private
     * @module immiApp.intakeform
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    PetitionerController.$inject = ["Session", "$location"];

    /**
     * @ngdoc Controller
     * @name PetitionerController
     * @module immiApp.intakeform
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function PetitionerController(Session, $location) {
        var vm = this;
        var url = $location.url();
        var viewUrl = url.split("/")[2];
        if(viewUrl == "view"){
          Session.setAccessType(false);
        }else {
          Session.setAccessType(true);
        }

        /**
         * @ngdoc function
         * @name getTabs
         * @description
         * Get tab list based on Employer Employment
         * mode whether creation or View
         *
         */
        var getTabs = function(){
            return [{
                "state" : Session.getAccessType() ? "home.petitioner.general" : "home.viewPetitioner.general",
                "name" : "General Info",
                "refName" : "general"
              }, {
                "state" : Session.getAccessType() ? "home.petitioner.address" : "home.viewPetitioner.address",
                "name" : "Address",
                "refName" : "address"
              }, {
                "state" : Session.getAccessType() ? "home.petitioner.employment" : "home.viewPetitioner.employment",
                "name" : "Employment",
                "refName" : "employment"
              }, {
                "state" : Session.getAccessType() ? "home.petitioner.history" : "home.viewPetitioner.history",
                "name" : "History Info",
                "refName" : "history"
              }, {
                "state" : Session.getAccessType() ? "home.petitioner.question" : "home.viewPetitioner.question",
                "name" : "Questionnaire",
                "refName" : "questionnaire"
              }, {
                "state" : Session.getAccessType() ? "home.petitioner.documents" : "home.viewPetitioner.documents",
                "name" : "Documents",
                "refName" : "documents"
              }];
        };

        /**
         * @ngdoc function
         * @name init
         * @description
         * Initiates Employment intake form
         *
         */
        var init = function(){
          vm.tabs = getTabs();
        };

        init();
    }
})();
