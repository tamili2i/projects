(function() {
    "use strict";

    angular
        .module("immiApp.workflow")
        .controller("StepFormController", StepFormController);

    /**
     * @ngdoc Injector
     * @name StepFormController
     * @private
     * @module immiApp.workflow
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    StepFormController.$inject = [
      "WorkflowService",
      "$scope",
      "Session",
      "$location"
    ];

    /**
     * @ngdoc Controller
     * @name StepFormController
     * @module immiApp.workflow
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function StepFormController(WorkflowService, $scope, Session, $location) {
      var  vm = this;

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
         * @name saveSteps
         * @description
         * Saves new step
         *
         */
        vm.saveSteps = function(stepForm) {
          WorkflowService.saveSteps(vm.step,function callback(response){
            $scope.$emit("Update:steps");
          });
        };

        /**
         * @ngdoc function
         * @name init
         * @description
         * Initiates steps form controller
         *
         */
        function init() {
          loadFormContainer();
        }

        init();
    }
})();
