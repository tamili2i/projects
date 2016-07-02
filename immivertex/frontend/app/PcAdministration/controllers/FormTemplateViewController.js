(function() {
    "use strict";


    angular
        .module("immiApp.PcAdministration")
        .controller("FormTemplateViewController", FormTemplateViewController);

    /**
     * @ngdoc Injector
     * @name FormTemplateViewController
     * @private
     * @module immiApp.PcAdministration
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    FormTemplateViewController.$inject = [
      "FormTemplate"
    ];

    /**
     * @ngdoc Controller
     * @name FormTemplateViewController
     * @module immiApp.PcAdministration
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function FormTemplateViewController(FormTemplate) {
        var vm = this;

        vm.formTemplate = FormTemplate;

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
         * @name init
         * @description
         * Initiates Form Template
         *
         */
        var init = function(){
          loadingFormTemplate();
        };

        init();
    }
})();
