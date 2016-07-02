(function() {
    'use strict';

    angular
        .module('immiApp.components')
        .directive('customTooltip', customTooltip);

    /**
     * @ngdoc Directive
     * @name customTooltip
     * @module ModuleName
     * @require
     * @restrict
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function customTooltip() {
        var directive = {
            restrict: 'A',
            link: linkFunc,
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
          var title = attr.customTooltip;
          el.tooltip({
            "placement" : "top",
            "title" : title,
            "container" : "body"
          })
        }
    }

    /**
     * @ngdoc Injector
     * @name DirectiveName
     * @module ModuleName
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    customTooltip.$inject = [];

})();
