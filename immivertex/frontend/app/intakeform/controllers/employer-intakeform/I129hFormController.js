(function() {
    "use strict";

    angular
        .module("immiApp.intakeform")
        .controller("I129hFormController", I129hFormController);

    /**
     * @ngdoc Injector
     * @name I129hFormController
     * @private
     * @module immiApp.intakeform
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    I129hFormController.$inject = [];

    /**
     * @ngdoc Controller
     * @name I129hFormController
     * @module immiApp.intakeform
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function I129hFormController() {
        var vm = this;

        vm.classifications = ["H1B","H1B1","H1B2","H1B3","H2A","H2B","H3 Trainee","H3 Special Education"];
    }
})();
