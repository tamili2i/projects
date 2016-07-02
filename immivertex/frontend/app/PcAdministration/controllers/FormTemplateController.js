(function() {
    "use strict";


    angular
        .module("immiApp.PcAdministration")
        .controller("FormTemplateController", FormTemplateController);

    /**
     * @ngdoc Injector
     * @name FormTemplateController
     * @private
     * @module immiApp.PcAdministration
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    FormTemplateController.$inject = [
      "$scope",
      "$location",
      "FormTemplate",
      "$timeout",
      "$rootScope",
      "ProgramCaseService",
      "Session"
    ];

    /**
     * @ngdoc Controller
     * @name FormTemplateController
     * @module immiApp.PcAdministration
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function FormTemplateController($scope, $location, FormTemplate, $timeout, $rootScope,ProgramCaseService, Session) {
        var vm = this;

        vm.formTemplate = FormTemplate;
        var validFormats = ['jpg','jpeg','png','pdf'];
        vm.valid = false;
        /**
         * @ngdoc function
         * @name loadingFormTemplate
         * @description
         * Initiate create form template container
         *
         */
        var loadingFormTemplate = function() {
          $(".create-container").collapse("toggle");
        };

        /**
          * @ngdoc function
          * @name uploadFiles
          * @param {object} file
          * @param errFile
          * @description
          * Uploads selected file
          */
        vm.uploadFiles = function(fileobj,errFile, element) {
          var ext = fileobj.name.substr(fileobj.name.lastIndexOf(".")+1);
          if(validFormats.indexOf(ext)>-1) {
            vm.file = fileobj;
          } else {
            vm.file = "";
            vm.valid = true;
          }
        };

        /**
         * @ngdoc function
         * @name removePdf
         * @description
         * removes selected file locally
         */
        vm.removePdf =function() {
          vm.file = "";
        };

        /**
         * @ngdoc function
         * @name getState
         * @description
         * returns current state name
         *
         */
        var getStateName = function() {
          if(vm.formTemplate.id) {
            vm.edit = true;
            vm.file={"name":vm.formTemplate.file_name};
            vm.title = "View";
            return vm.formTemplate.id;
          } else {
            vm.title = "Create";
            return vm.title;
          }
        };

        /**
         * @ngdoc function
         * @name saveFormTemplate
         * @description
         * Saves new form template
         *
         */
        vm.saveFormTemplate = function(formTemplateForm){
          vm.formTemplate.updated_by = Session.getUpdatedBy();
          vm.formTemplate.file_name = vm.file;
          console.log(vm.formTemplate);
          ProgramCaseService.saveFormTemplate(vm.formTemplate, function successCallback(response) {
             vm.file = response;
             $scope.$emit('Update:FormTemplateList');
          }, function errorCallback(response){
             if(response["name"]){
               formTemplateForm.name.$setValidity("availability", false);
             }
          });
        };

        vm.setAvailability = function(element) {
          element.$setValidity("availability", true);
        };

        /**
         * @ngdoc function
         * @name init
         * @description
         * Initiates Form Template
         *
         */
        var init = function(){
          $rootScope.state = getStateName();
          loadingFormTemplate();
        };

        init();
    }
})();
