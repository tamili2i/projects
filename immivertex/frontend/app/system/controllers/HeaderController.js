(function() {
    "use strict";

    angular
        .module("immiApp.system")
        .controller("HeaderController", HeaderController);

    /**
     * @ngdoc Injector
     * @name ControllerName
     * @private
     * @module immiApp.system
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    HeaderController.$inject = ["UserService", "Session", "NavigationService"];

    /**
     * @ngdoc Controller
     * @name HeaderController
     * @module immiApp.system
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function HeaderController(UserService, Session, NavigationService) {
        var vm = this;

        vm.user = {};

        /**
          * @ngdoc function
          * @name logout
          * @description
          * Logsout from the system and redirected to login page.
          *
          */
        vm.logout = function(evt){
          Session.clearSession();
          NavigationService.resetAccessMenu();
        };
        /**
          * @ngdoc function
          * @name init
          * @description
          * Initiates header
          *
          */
        function init(){
          vm.party_id = Session.getPartyId();
        }
        init();
    }
})();
