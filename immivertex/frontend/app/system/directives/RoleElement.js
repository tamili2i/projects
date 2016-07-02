(function() {
    "use strict";

    /**
     * @ngdoc Directive
     * @name WindowDimension
     * @module immiApp.system
     * @requires
     * @restrict A
     * @description
     * This Directive will removes the element based on the access rights
     * mapped with role of user.
     * @example

       <a role-element action-of-module="Beneficiary" ui-sref="home.beneficiaryForm" class="btn btn-primary m-r-10">
           <i class="icon fa fa-plus"></i> Create
       </a>

       The directive should have attribute action-of-module, whose value should be valid name of
       our application module.
     * @author Ideas2IT Technologies
     * @copyright
     */
    angular
        .module("immiApp.system")
        .directive("roleElement", roleElement);

    roleElement.$inject = [
        "Session"
    ];

    /* @ngInject */
    function roleElement(Session) {
        var directive = {
            restrict: "A",
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
          var moduleName = attr.actionOfModule;

          if(moduleName){
            var accessGrant = Session.isActionGranted(moduleName);
            if(!accessGrant){
              el.remove();
            }
          }
        }
    }
})();
