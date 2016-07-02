(function() {
    'use strict';

    angular
        .module("immiApp.system")
        .controller("NotificationController", NotificationController);

    /**
     * @ngdoc Injector
     * @name NotificationController
     * @private
     * @module immiApp.system
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    NotificationController.$inject = ["UserService", "Session"];

    /**
     * @ngdoc Controller
     * @name NotificationController
     * @module immiApp.system
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function NotificationController(UserService, Session) {
        var vm = this;

        vm.alerts = [];
        vm.isSysAdminLogin = false;
        if(Session.getPartyType() == "system_administrator"){
          vm.isSysAdminLogin = true;
        }

        /**
         * @ngdoc function
         * @name getAllCommunication
         * @description
         * //Description goes here
         */
        vm.getAllCommunication = function(){
          vm.isLoading = true;
          vm.alerts = [];

          UserService.viewAllCommunication(function(response){
            _.each(response.data, function(communication) {
                communication.created_at = new Date(communication.created_at);
                vm.alerts.push(communication);
            });
            vm.isLoading = false;
          });
       };

     }
})();
