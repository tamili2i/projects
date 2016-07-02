(function() {
    "use strict";

    angular
        .module("immiApp.workflow")
        .controller("WorkflowViewController", WorkflowViewController);

    /**
     * @ngdoc Injector
     * @name WorkflowViewController
     * @private
     * @module immiApp.workflow
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    WorkflowViewController.$inject = [
      "Workflow"
    ];

    /**
     * @ngdoc Controller
     * @name WorkflowViewController
     * @module immiApp.workflow
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function WorkflowViewController(Workflow) {
        var vm = this;

        vm.workflow = Workflow;

        /**
         * @ngdoc function
         * @name loadFormContainer
         * @description
         * Initiate form container with animation
         *
         */
        var loadFormContainer = function() {
          $(".create-container").collapse("toggle");
         };

        /**
         * @ngdoc function
         * @name init
         * @description
         * Initiates steps view controller
         *
         */
        function init() {
          loadFormContainer();
        }

        init();

    }
})();
