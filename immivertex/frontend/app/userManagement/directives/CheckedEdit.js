(function() {
    'use strict';

    angular
        .module('immiApp.UserManagement')
        .directive('checkedEdit', checkedEdit);

    /**
     * @ngdoc Directive
     * @name checkedEdit
     * @module ModuleName
     * @require
     * @restrict
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function checkedEdit($timeout) {
        var directive = {
            restrict: 'A',
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {

          if(scope.accesRight.access_edit){
            var target = el.closest("tr").find("input[type=\"checkbox\"].view");
            target.iCheck("disable");
          }

          function ifCheckedHandler(evt){
            var target = el.closest("tr").find("input[type=\"checkbox\"].view");
            target.iCheck("check").iCheck("disable");
          }

          function ifUncheckedHandler(evt){
            var target = el.closest("tr").find("input[type=\"checkbox\"].view");
            target.iCheck("uncheck").iCheck("enable");
          }

          el.on("ifChecked", ifCheckedHandler);
          el.on("ifUnchecked", ifUncheckedHandler);
        }
    }

    /**
     * @ngdoc Injector
     * @name checkedEdit
     * @module ModuleName
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    checkedEdit.$inject = ["$timeout"];

})();
