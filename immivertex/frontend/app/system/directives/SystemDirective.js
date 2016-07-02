(function() {
    "use strict";

    /**
     * @ngdoc Directive
     * @name WindowDimension
     * @module immiApp.system
     * @requires
     * @restrict A
     * @description
     * This Directive will registers the window height into the .
     * @author Ideas2IT Technologies
     * @copyright
     */
    angular
        .module("immiApp.system")
        .directive("windowDimension", windowDimension);

    windowDimension.$inject = [
        "$window",
        "Utils"
    ];

    /* @ngInject */
    function windowDimension($window, Utils) {
        var directive = {
            restrict: "A",
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
          var _window =  $($window);
          Utils.setWindowDimension({
            height: _window.height(),
            width: _window.width()
          });
        }
    }
})();
