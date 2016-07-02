(function() {
    "use strict";

    angular.module("immiApp.intakeform")
        .controller("IntakeListController", IntakeListController);

    /**
     * @ngdoc Injector
     * @name IntakeListController
     * @private
     * @module immiApp.intakeform
     * @description
     * Inject module that needs to be useful for Beneficiary Controller
     * @author Ideas2IT Technologies
     * @copyright
     */
    IntakeListController.$inject = [
        "$scope",
        "$location",
        "$state",
        "IntakeFormService",
        "GridConstants",
        "GridService"
    ];

    /**
     * @ngdoc IntakeListController
     * @name IntakeListController
     * @module immiApp.intakeform
     * @requires $log
     * @description
     *
     * IntakeListController
     *
     */
    /*jslint nomen: true*/
    /*global angular*/

    function IntakeListController($scope, $location, $state, IntakeFormService, GridConstants, GridService) {
        var vm = this;

        vm.intakeforms = [];
        vm.isLoading = true;
        vm.gridName = GridConstants.INTAKE_FORM_LIST;

        /**
         * @ngdoc function
         * @name intakeformList
         * @description
         * Gets list of intakeforms
         *
         */
        vm.getIntakeformList = function(){
          vm.isLoading = true;
          IntakeFormService.getIntakeformList(function successCallback(response){
             GridService.renderGrid(GridConstants.INTAKE_FORM_LIST, response.data, function(){
                 vm.isLoading = false;
             });
          },function errorCallback(){
              vm.isLoading = true;
          });
        };

        /**
         * @ngdoc event
         * @name $destroy
         * @description
         * Will destroy grid components which
         * associated with this controller.
         */
        $scope.$on("$destroy", function(){
          GridService.destroyGrid(vm.gridName);
        });

    }

}());
