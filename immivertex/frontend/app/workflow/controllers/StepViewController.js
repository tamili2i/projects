(function() {
    "use strict";

    angular
        .module("immiApp.workflow")
        .controller('StepViewController', StepViewController);

    /**
     * @ngdoc Injector
     * @name StepViewController
     * @private
     * @module immiApp.workflow
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    StepViewController.$inject = [
      "Step"
    ];

    /**
     * @ngdoc Controller
     * @name StepViewController
     * @module immiApp.workflow
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function StepViewController(Step) {
        var vm = this;

        vm.step = Step;

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

        function init() {
          loadFormContainer();
        }

        init();
    }
})();
