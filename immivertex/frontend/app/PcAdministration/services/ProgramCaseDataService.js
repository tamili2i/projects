(function() {
    "use strict";

    angular
        .module("immiApp.PcAdministration")
        .service("ProgramCaseDataService", ProgramCaseDataService);

    /**
     * @ngdoc Injector
     * @name ProgramCaseDataService
     * @private
     * @module immiApp.PcAdministration
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    ProgramCaseDataService.$inject = [
      "$q",
      "$timeout",
      "ProgramCaseGridConfig",
      "FormTemplateGridConfig",
      "DocumentCheckListGridConfig",
      "HTTPFactory",
      "Upload"
      ];

    /**
     * @ngdoc Service
     * @name ProgramCaseDataService
     * @module immiApp.PcAdministration
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function ProgramCaseDataService($q, $timeout ,ProgramCaseGridConfig, FormTemplateGridConfig, DocumentCheckListGridConfig, HTTPFactory, Upload) {
      var _self = this;

      /**
       * @ngdoc function
       * @name getProgramCaseList
       * @description
       * returns list of program cases
       *
       */
      _self.getProgramCaseList = function(queryParam){
        return HTTPFactory.call({
          url: "/casetypes/casetypes",
          method: "GET",
          params: queryParam
        });
      };

      /**
       * @ngdoc function
       * @name getProgramCase
       * @param {string} name
       * @description
       * returns details of particular program cases
       *
       */
      _self.getProgramCase = function(name){
        return HTTPFactory.call({
          method: "GET",
          url: "/casetypes/casetypes/"+name
        });
      };

      /**
       * @ngdoc function
       * @name createProgramCase
       * @param {object} programCase
       * @description
       * creates new program case
       *
       */
      _self.createProgramCase = function(programCase) {
        return HTTPFactory.call({
          method: "POST",
          data: programCase,
          url: "/casetypes/casetypes"
        });
      };

      /**
       * @ngdoc function
       * @name getFormTemplateListQ
       * @description
       * returns list of Form Templates
       *
       */
      _self.getFormTemplateListQ = function(){
        return HTTPFactory.call({
          method: "GET",
          url: "/casetypes/casetypesformtemplates"
        });
      };

      /**
       * @ngdoc function
       * @name getFormTemplateList
       * @description
       * returns list of form templates with pagination
       *
       */
      _self.getFormTemplateList = function(queryParam){
        return HTTPFactory.call({
          method: "GET",
          params: queryParam,
          url: "/casetypes/casetypesformtemplates/viewAll"
        });
      };

      /**
       * @ngdoc function
       * @name getFormTemplate
       * @param {string} name
       * @description
       * returns details  of particlar form template
       *
       */
      _self.getFormTemplate = function(name) {
        return HTTPFactory.call({
          method: "GET",
          url: "/casetypes/casetypesformtemplates/"+name
        });
      };

      /**
       * @ngdoc function
       * @name getDocumentCheckList
       * @param {object} queryParam
       * @description
       * returns list of document checklist with pagination
       *
       */
      _self.getDocumentCheckList = function(queryParam){
        return HTTPFactory.call({
          method: "GET",
          params: queryParam,
          url: "/casetypes/casetypesdocumentchecklist/viewAll"
        });
      };

      /**
       * @ngdoc function
       * @name getDocumentChecklistQ
       * @description
       * returns list of document checklist
       *
       */
      _self.getDocumentChecklistQ = function(){
        return HTTPFactory.call({
          method: "GET",
          url: "/casetypes/casetypesdocumentchecklist"
        });
      };

      /**
       * @ngdoc function
       * @name getDocumentChecklistInfo
       * @param {string} name
       * @description
       * returns details of particular of document checklist
       *
       */
      _self.getDocumentChecklistInfo = function(name) {
        return HTTPFactory.call({
          method: "GET",
          url: "/casetypes/casetypesdocumentchecklist/"+name
        });
      };

      /**
       * @ngdoc function
       * @name getIntakeFormlistQ
       * @description
       * returns list of intakes forms in the system
       *
       */
      _self.getIntakeFormlistQ = function(){
        return HTTPFactory.call({
          method: "GET",
          url: "/intake-form/formslist"
        });
      };

      /**
       * @ngdoc function
       * @name createDocumentChecklist
       * @param {documentChecklist} documentChecklist
       * @description
       * Creates new document checklist
       *
       */
      _self.createDocumentChecklist = function(documentChecklist) {
        return HTTPFactory.call({
          method: "POST",
          data: documentChecklist,
          url: "/casetypes/casetypesdocumentchecklist"
        });
      };

      /**
       * @ngdoc function
       * @name saveFormTemplate
       * @param {object} formTemplate
       * @description
       * Saves new form template
       *
       */
      _self.saveFormTemplate = function(formTemplate) {
        return Upload.upload({
          "url": HTTPFactory.getHostURL() + "/casetypes/casetypesformtemplates",
          "fields": formTemplate,
          "file": formTemplate.file_name
        });
      };

      return _self;
    }
})();
