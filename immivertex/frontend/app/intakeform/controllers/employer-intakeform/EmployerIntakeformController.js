(function() {
    "use strict";

    angular
        .module("immiApp.intakeform")
        .controller("EmployerIntakeformController", EmployerIntakeformController);

    /**
     * @ngdoc Injector
     * @name EmployerIntakeformController
     * @private
     * @module immiApp.intakeform
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    EmployerIntakeformController.$inject = ["Session", "$location"];

    /**
     * @ngdoc Controller
     * @name EmployerIntakeformController
     * @module immiApp.intakeform
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function EmployerIntakeformController(Session, $location) {
        var vm = this;
        vm.tabs = [];
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
                "state" : Session.getAccessType() ? "home.employer.employment" : "home.employerView.employment",
                "name" : "Employment",
                "refName" : "employment"
              }, {
                "state" : Session.getAccessType() ? "home.employer.i129h" : "home.employerView.i129h",
                "name" : "I129H Data",
                "refName" : "i129"
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
