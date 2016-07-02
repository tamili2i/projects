(function() {
    "use strict";

    angular
        .module("immiApp.intakeform")
        .controller("AttorneyFamilyFormController", AttorneyFamilyFormController);

    /**
     * @ngdoc Injector
     * @name AttorneyFamilyFormController
     * @private
     * @module immiApp.intakeform
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    AttorneyFamilyFormController.$inject = [
      "$scope",
      "AttorneyFamily",
      "$theme",
      "$rootScope",
      "$location",
      "Session"
    ];

    /**
     * @ngdoc AttorneyFamilyFormController
     * @name AttorneyFamilyFormController
     * @module immiApp.intakeform
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function AttorneyFamilyFormController($scope, AttorneyFamily, $theme, $rootScope, $location, Session) {
        var vm = this;

        vm.tabs = [];
        vm.intakeform = AttorneyFamily;
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
         * @param intakeform
         * @description
         * Get tab list based on intakeform
         * mode whether creation or edition
         *
         */
        var getTabs = function(intakeform){
            return [{
                "state" : Session.getAccessType() ? "home.attorneyFamily.general" : "home.attorneyFamilyView.general",
                "name" : "General",
                "refName" : "general"
              },{
                "state" : Session.getAccessType() ? "home.attorneyFamily.questionnaire" : "home.attorneyFamilyView.questionnaire",
                "name" : "Questionnaire",
                "refName" : "questionnaire"
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
           if(vm.intakeform.id) {
             return vm.intakeform.id;
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
          vm.tabs = getTabs(AttorneyFamily);
          $theme.set("leftbarCollapsed", true);

          $rootScope.state = getStateName();
        };

        init();

    }
})();
