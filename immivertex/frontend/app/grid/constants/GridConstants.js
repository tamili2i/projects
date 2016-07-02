(function() {
    "use strict";

     /**
     * @ngdoc constant
     * @name GridConstants
     * @module immiApp.grid
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */

    angular
        .module("immiApp.grid")
        .constant("GridConstants",  {
          "BENEFICIARY_LIST" : "beneficiary-list",
          "INTAKE_FORM_LIST" : "intake-form-list",
          "CORPORATION_LIST" : "corporation-list",
          "LAWFIRM_LIST"     : "lawfirm-list",
          "PARTY_LIST"     : "party-list",
          "PROGRAM_CASE_LIST":"program-case-list",
          "FORM_TEMPLATE_LIST":"form-template-list",
          "DOCUMENT_CHECKLIST_LIST" : "document-checklist-list",
          "USER_ROLE_LIST": "user-role-list",
          "SUBSCRIBER_LIST": "subscriber-list",
          "CASE_LIST": "case-list",
          "WORKFLOW_LIST": "workflow-list",
          "STEP_LIST": "step-list"
        });

})();
