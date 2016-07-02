(function() {
    "use strict";

    angular
        .module("immiApp.PcAdministration")
        .controller("ProgramCaseViewController", ProgramCaseViewController);

    /**
     * @ngdoc Injector
     * @name ProgramCaseViewController
     * @private
     * @module immiApp.PcAdministration
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    ProgramCaseViewController.$inject = [
      "ProgramCase",
      "FormTemplate",
      "DocumentChecklist",
      "IntakeForm",
      "ProgramCaseService"
    ];

    /**
     * @ngdoc Controller
     * @name ProgramCaseViewController
     * @module immiApp.PcAdministration
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function ProgramCaseViewController(ProgramCase, FormTemplate, DocumentChecklist, IntakeForm, ProgramCaseService) {
        var vm = this;

        if(ProgramCase.id) {
          ProgramCase = ProgramCaseService.convertToArray(ProgramCase);
        }

        vm.programCase = ProgramCase;
        var mapFileName = function(files, FileList) {
          _.each(files, function(file, index){
            files[index] = _.where(FileList, {"id":file})[0].name;
          });
          return files;
        }
        /**
         * @ngdoc function
         * @name init
         * @description
         * Initiates Program Case form
         *
         */
        var init = function(){
          ProgramCase.form_template_id = mapFileName(ProgramCase.form_template_id, FormTemplate);
          ProgramCase.document_checklist_id = mapFileName(ProgramCase.document_checklist_id, DocumentChecklist);
          ProgramCase.intake_form_id = mapFileName(ProgramCase.intake_form_id, IntakeForm);
        };

        init();


    }
})();
