(function() {
    "use strict";

    angular
        .module("immiApp.system")
        .controller("SystemController", SystemController);

    /**
     * @ngdoc Injector
     * @name SystemController
     * @private
     * @module immiApp.system
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    SystemController.$inject = ["$rootScope","$scope"];

    /**
     * @ngdoc Controller
     * @name SystemController
     * @module immiApp.system
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function SystemController($rootScope, $scope) {
        var vm = this;

        $scope.$on("$stateChangeStart", function() {
            $scope.$emit("loading:show");
        });

        $scope.$on("$stateChangeSuccess", function() {
            $scope.$emit("loading:hide");
        });
    }
})();
