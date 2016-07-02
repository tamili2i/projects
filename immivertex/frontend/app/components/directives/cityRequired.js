(function() {
    'use strict';

    angular
        .module('immiApp.components')
        .directive('cityRequired', cityRequired);

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
    function cityRequired($timeout) {
        var directive = {
            restrict: 'E',
            scope: {
              "city" : "="
            },
            link: linkFunc,
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
          el.hide();
          var target = $(el.siblings("input")[0]);


          function handler(){
          //  if(!scope.city){
              el.show(200);
              $timeout(function(){
                el.hide(500);
              }, 5000)
          //  }
          }

          target.focus(handler).click(handler);

          scope.$watch("city", function(){
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
    cityRequired.$inject = ["$timeout"];

})();
