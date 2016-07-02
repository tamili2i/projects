(function() {
    "use strict";

    angular
        .module("immiApp.PcAdministration")
        .controller("ProgramCaseFormController", ProgramCaseFormController);

    /**
     * @ngdoc Injector
     * @name ProgramCaseFormController
     * @private
     * @module immiApp.PcAdministration
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    ProgramCaseFormController.$inject = [
      "$rootScope",
      "ProgramCase",
      "$state",
      "FormTemplate",
      "DocumentChecklist",
      "IntakeForm",
      "ProgramCaseService",
      "Session"
    ];

    /**
     * @ngdoc Controller
     * @name ProgramCaseFormController
     * @module immiApp.PcAdministration
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function ProgramCaseFormController($rootScope,ProgramCase,$state, FormTemplate, DocumentChecklist, IntakeForm, ProgramCaseService, Session) {
        var vm = this;

        vm.intakeForms = IntakeForm;
        vm.formTemplates = FormTemplate;
        vm.checkLists = DocumentChecklist;

        if(ProgramCase.id) {
          ProgramCase = ProgramCaseService.convertToArray(ProgramCase);
        }

        vm.programCase = ProgramCase;

        /**
         * @ngdoc function
         * @name saveProgramCase
         * @description
         * Saves the Program Case Information
         *
         */
        vm.saveProgramCase = function(pcForm){
          var programCase = angular.copy(vm.programCase);
          programCase.code = programCase.name;
          programCase.updated_by = Session.getUpdatedBy();
          programCase = ProgramCaseService.convertToString(programCase);
          console.log(programCase);
          ProgramCaseService.createProgramCase(programCase, function(response) {
            if(response["name"]) {
              pcForm.name.$setValidity("availability", false);
            }
          });
        };

        /**
         * @ngdoc function
         * @name getStateName
         * @description
         * Returns current state name
         *
         */
        vm.setAvailability = function(element) {
          element.$setValidity("availability", true);
        };

        /**
         * @ngdoc function
         * @name getStateName
         * @description
         * Returns current state name
         *
         */
        var getStateName = function() {
          if(vm.programCase.id) {
            vm.title = "View";
            vm.edit = true;
            return vm.programCase.id;
          } else {
            vm.title = "Create";
            return vm.title;
          }
        };

        /**
         * @ngdoc function
         * @name init
         * @description
         * Initiates Program Case form
         *
         */
        var init = function(){
          $rootScope.state = getStateName();
        };

        init();
    }
})();
