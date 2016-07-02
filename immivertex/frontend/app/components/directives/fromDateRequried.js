(function() {
    'use strict';

    angular
        .module('immiApp.components')
        .directive('fromDateRequried', fromDateRequried);

    /**
     * @ngdoc Directive
     * @name cityRequired
     * @module ModuleName
     * @require
     * @restrict
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function fromDateRequried($timeout) {
        var directive = {
            restrict: 'E',
            scope: {
              "fromDate" : "="
            },
            link: linkFunc,
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
          el.hide();
          var target = $(el.parent());


          function handler(){
          //  if(!scope.city){
              el.show(200);
              $timeout(function(){
                el.hide(500);
              }, 5000)
          //  }
          }

          target.focus(handler).click(handler);

          scope.$watch("fromDate", function(){
            if(el.is(":visible")){
              el.hide(500);
            }
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
    fromDateRequried.$inject = ["$timeout"];

})();
