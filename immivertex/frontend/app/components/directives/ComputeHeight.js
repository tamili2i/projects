(function() {
    'use strict';

    angular
        .module('immiApp.components')
        .directive('computeHeight', computeHeight);

    /**
     * @ngdoc Directive
     * @name computeHeight
     * @module immiApp.components
     * @require
     * @restrict
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function computeHeight(Utils) {
        var directive = {
            restrict: 'A',
            link: linkFunc,
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
          var pHeight = -(attr.paramHeight ? parseInt(attr.paramHeight) : 0)
          el.css({
            "max-height" : Utils.getHeight((pHeight))+"px",
            "overflow-y" : "scroll"
        });
        }
    }

    /**
     * @ngdoc Injector
     * @name computeHeight
     * @module immiApp.components
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    computeHeight.$inject = ['Utils'];

})();
