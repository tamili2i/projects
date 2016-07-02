(function() {
    'use strict';

    angular
        .module('immiApp.components')
        .directive('multiSelectRequired', multiSelectRequired);

    /**
     * @ngdoc Directive
     * @name multiSelectRequired
     * @module immiApp.components
     * @require
     * @restrict
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function multiSelectRequired() {
      var multiSelectRequired = {
          restrict: 'A',
          require: 'ngModel',
          link: linkFunc
      };

      return multiSelectRequired;

      function linkFunc(scope, el, attr, ctrl) {
        scope.$watch(attr.ngModel, function(newValue,oldValue){
          if (typeof newValue == "undefined") {
            ctrl.$setValidity('required', false);
            return false;
          } else {
            if(newValue.length>0 ){
              ctrl.$setValidity('required', true);
              return true;
            } else {
              ctrl.$setValidity('required', false);
              return false;
            }
          }
        })
      }
    }

})();
