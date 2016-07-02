(function() {
    "use strict";

    angular
        .module("immiApp.PcAdministration")
        .service("ProgramCaseService", ProgramCaseService);

    /**
     * @ngdoc Injector
     * @name ProgramCaseService
     * @private
     * @module immiApp.PcAdministration
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    ProgramCaseService.$inject = [
      "$timeout",
      "ProgramCaseDataService",
      "ToasterService",
      "$state"
    ];

    /**
     * @ngdoc Service
     * @name ProgramCaseService
     * @module immiApp.PcAdministration
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function ProgramCaseService($timeout, ProgramCaseDataService, ToasterService, $state) {
        var _self = this;

        /**
         * @ngdoc function
         * @name getProgramCaseList
         * @param {object} queryParam
         * @param {function} successCallback
         * @param {function} errorCallback
         * @description
         * Gets list of available program cases
         *
         */
        _self.getProgramCaseList = function(queryParam, successCallback, errorCallback) {
          var programCaseList = ProgramCaseDataService.getProgramCaseList(queryParam);
          programCaseList.then(function(response) {
            successCallback(response.data);
          }, function() {
            errorCallback();
          });
        };

        /**
         * @ngdoc function
         * @name getProgramCase
         * @param {string} name
         * @description
         * Gets particular program case
         * based on name passed
         *
         */
        _self.getProgramCase = function(name) {
          return ProgramCaseDataService.getProgramCase(name);
        };

        /**
         * @ngdoc function
         * @name createProgramCase
         * @param {object} programCase
         * @description
         * Create new program case
         *
         */
        _self.createProgramCase = function(programCase, callback) {
          var programCase =  ProgramCaseDataService.createProgramCase(programCase);
          programCase.then(function (response) {
            $state.go("home.programs");
            callback(response);
            ToasterService.toastSuccess("Program Case created successfully","Success");
          }, function(response){
             ToasterService.toastError("Something went wrong","Error");
             callback(response.data);
          });
        };

        /**
         * @ngdoc function
         * @name getDocumentCheckList
         * @param {object} queryParam
         * @param {function} successCallback
         * @param {function} errorCallback
         * @description
         * Gets list of available document checklist with pagination
         *
         */
        _self.getDocumentCheckList = function(queryParam, successCallback, errorCallback) {
          var programCaseList = ProgramCaseDataService.getDocumentCheckList(queryParam);
          programCaseList.then(function(response) {
            successCallback(response.data);
          }, function() {
            errorCallback();
          });
        };

        /**
         * @ngdoc function
         * @name getFormTemplateList
         * @param {object} queryParam
         * @param {function} successCallback
         * @param {function} errorCallback
         * @description
         * Gets list of available form templates with pagination
         *
         */
        _self.getFormTemplateList = function(queryParam, successCallback, errorCallback) {
          var programCaseList = ProgramCaseDataService.getFormTemplateList(queryParam);
          programCaseList.then(function(response) {
            successCallback(response.data);
          }, function() {
            errorCallback();
          });
        };

        /**
         * @ngdoc function
         * @name getFormTemplate
         * @param {string} name
         * @description
         * Gets particular form template based on name
         *
         */
        _self.getFormTemplate = function(name) {
          return ProgramCaseDataService.getFormTemplate(name);
        };

        /**
         * @ngdoc function
         * @name getDocumentChecklistInfo
         * @param {string} name
         * @description
         * Gets particular document checklist
         * template based on name
         *
         */
        _self.getDocumentChecklistInfo = function(name) {
          return ProgramCaseDataService.getDocumentChecklistInfo(name);
        };

        /**
         * @ngdoc function
         * @name getFormTemplateListQ
         * @description
         * Gets list of form templates
         *
         */
        _self.getFormTemplateListQ = function(){
          return ProgramCaseDataService.getFormTemplateListQ();
        };

        /**
         * @ngdoc function
         * @name getDocumentChecklistQ
         * @description
         * Gets list of document checklist
         *
         */
        _self.getDocumentChecklistQ = function(){
          return ProgramCaseDataService.getDocumentChecklistQ();
        };

        /**
         * @ngdoc function
         * @name getIntakeFormlistQ
         * @description
         * Gets list of intake forms
         *
         */
        _self.getIntakeFormlistQ = function(){
          return ProgramCaseDataService.getIntakeFormlistQ();
        };

        /**
         * @ngdoc function
         * @name createDocumentChecklist
         * @param {object} documentChecklist
         * @param {function} successCallback
         * @description
         * Creates new document checklist
         *
         */
        _self.createDocumentChecklist = function(documentChecklist, successCallback, errorCallback) {
          var documentChecklist =  ProgramCaseDataService.createDocumentChecklist(documentChecklist);
          documentChecklist.then(function (response) {
            ToasterService.toastSuccess("Document Checklist created successfully","Success");
            successCallback(response.data);
            $state.go("home.documentChecklist");
          }, function(response){
             errorCallback(response.data)
             ToasterService.toastError("Something went wrong","Error");
          });
        };

        /**
         * @ngdoc function
         * @name convertToString
         * @param {object} programCase
         * @description
         * Converts array to string
         *
         */
        _self.convertToString = function(programCase) {
          programCase.form_template_id = programCase.form_template_id.toString();
          programCase.document_checklist_id = programCase.document_checklist_id.toString();
          programCase.intake_form_id = programCase.intake_form_id.toString();
          return programCase;
        };

        /**
         * @ngdoc function
         * @name convertToArray
         * @param {object} ProgramCase
         * @description
         * Converts string to array of numbers
         *
         */
        _self.convertToArray = function(ProgramCase) {
          ProgramCase.form_template_id = ProgramCase.form_template_id.split(",").map(Number);
          ProgramCase.document_checklist_id = ProgramCase.document_checklist_id.split(",").map(Number);
          ProgramCase.intake_form_id = ProgramCase.intake_form_id.split(",").map(Number);
          return ProgramCase;
        };

        /**
         * @ngdoc function
         * @name saveFormTemplate
         * @param {object} formTemplate
         * @description
         * Creates new form template
         *
         */
        _self.saveFormTemplate = function(formTemplate, successCallback, errorCallback) {
          var docQ = ProgramCaseDataService.saveFormTemplate(formTemplate);
          docQ.progress(function(evt) {
            var percentUploaded = parseInt(100.0 * evt.loaded / evt.total);
            formTemplate.file_name.upPercentage = percentUploaded + "%";
          }).success(function(data) {
            ToasterService.toastSuccess("Form Template created successfully","Success");
            console.log("successfully added");
            $state.go("home.formtemplate");
            successCallback(data);
          }).error(function(response) {
            //ToasterService.toastError("Something went wrong","Error");
            errorCallback(response)
            console.log(response);
          });
        };
    }
})();
