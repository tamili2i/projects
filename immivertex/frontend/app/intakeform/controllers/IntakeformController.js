(function() {
    "use strict";


    angular
        .module("immiApp.intakeform")
        .controller("IntakeformController", IntakeformController);

    /**
     * @ngdoc Injector
     * @name IntakeformController
     * @private
     * @module immiApp.intakeform
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    IntakeformController.$inject = ["$scope", "$location", "IntakeForm","Upload","$timeout","$rootScope"];

    /**
     * @ngdoc Controller
     * @name IntakeformController
     * @module immiApp.intakeform
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function IntakeformController($scope, $location, IntakeForm, Upload, $timeout, $rootScope) {
        var vm = this;

        vm.intakeForm = IntakeForm;

        vm.programCases = [
           { name: "H1B " },
           { name: "B1/B2"},
           { name: "L1"}
        ];

        /**
         * @ngdoc function
         * @name loadSearchContainer
         * @description
         * Initiate search container with
         * search tags or search form field
         *
         */
        vm.loadingIntakeform = function() {
          $(".create-container").collapse("toggle");
         };

         vm.f = [{}];
        vm.uploadFiles = function(file, errFiles) {
          vm.f = file;
          console.log(vm.f);
          vm.errFile = errFiles && errFiles[0];
            if (file) {
              file.upload = Upload.upload({
                url: "https://angular-file-upload-cors-srv.appspot.com/upload",
                data: {file: file}
               });

            file.upload.then(function (response) {
                $timeout(function () {
                    file.result = response.data;
                });
            }, function (response) {
                if (response.status > 0)
                    $scope.errorMsg = response.status + ": " + response.data;
            }, function (evt) {
                file.progress = Math.min(100, parseInt(100.0 *
                                         evt.loaded / evt.total));
            });
            }
        };
        vm.removePdf =function(data) {
          vm.f = "";
        };

        /**
         * @ngdoc function
         * @name getState
         * @description
         * returns current state name
         *
         */
        var getStateName = function() {
          if(vm.intakeForm.id) {
            vm.intakeForm.title = "Edit";
            return vm.intakeForm.id;
          } else {
            vm.intakeForm.title = "Create";
            return vm.intakeForm.title;
          }
        };

        /**
         * @ngdoc function
         * @name init
         * @description
         * Initiates Intake form
         *
         */
        var init = function(){
          $rootScope.state = getStateName();
        };

        init();
    }
})();
