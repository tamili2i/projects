(function() {
    "use strict";

    angular
        .module("immiApp.intakeform")
        .controller("PetitionerEmploymentController", PetitionerEmploymentController);

    /**
     * @ngdoc Injector
     * @name PetitionerEmploymentController
     * @private
     * @module immiApp.intakeform
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    PetitionerEmploymentController.$inject = [
      "$scope",
      "Utils",
      "PlacesFactory"
    ];

    /**
     * @ngdoc Controller
     * @name PetitionerEmploymentController
     * @module immiApp.intakeform
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function PetitionerEmploymentController($scope, Utils, PlacesFactory) {
        var vm = this;

        vm.employments = [];
        vm.places = [];
        vm.employments = [];

        /**
         * @ngdoc function
         * @name employmentChangeDetector
         * @param {object} oldObj - state of object before change
         * @param {object} newObj - state of object after change
         * @description
         * In View, we have only one save button for multiple
         * employments. To avoid saving of all the employment whose
         * properties are still unchanged, we are watching each employment object.
         * The Employment will only be saved, if any of its property changed.
         *
         */
        function employmentChangeDetector(oldObj, newObj){
          if(!newObj.changeLog){
            oldObj.changeLog = 1;
          }else{
            oldObj.changeLog = ++newObj.changeLog;
          }
        }

        /**
         * @ngdoc function
         * @name init
         * @description
         * Initiates employment form.
         * if Employment is saved more than once, then its appropriate
         * countries, states and cities should be loaded. Also creating watch
         * for change detection.
         */
        var init = function() {
            vm.addEmployment();
        };

        /**
        * @ngdoc function
        * @name addEmployment
        * @description
        * Add more Employment Details
        */
        vm.addEmployment = function(employmentForms){
            if(employmentForms) {
              employmentForms.$submitted = false;
            }
            var employment = {};
            employment = {
              "employment_information":{
                "address": {
                  "party_id": null,
                  "location": {
                    "state_id": null,
                    "city_id": null,
                    "country_id": null
                  }
                }
              }
            };
              Utils.createWatch(employment, $scope, employmentChangeDetector);
            vm.employments.push(employment);
            vm.places[vm.employments.length-1] = Utils.createPlaceInstance(employment.employment_information.address, PlacesFactory);
        };

        /**
        * @ngdoc function
        * @name removeEmployment
        * @param {number} index
        * @description
        * Remove employment Details
        *
        */
        vm.removeEmployment = function(index, employmentId) {
          if(employmentId){
            BeneficiaryService.deleteEmployment(employmentId);
          }
          vm.employments.splice(index,1);
        };

        /**
         * @ngdoc function
         * @name locationCallback
         * @param {Object} location
         * @param {number} index this will be passed
         * only when location finder is inside ngRepeat
         * @description
         * Gets locations based on user search
         * Also load cities and states based on country and state
         * choosen from Google API
         */
        vm.locationCallback = function(location, index) {
          vm.places[index].getAppIDsForAddress(location.longName, vm.employments[index].employment_information.address, function(address){
            vm.places[index].metaLocation = location.longName;
            console.log("States and cities fetched according to google places");
          });
        };

        /**
         * @ngdoc function
         * @name resetAddressModel
         * @param {number} index
         * @description
         * Resets employments address when country changes
         *
         */
        vm.resetAddressModel = function(index) {
          vm.employments[index].employment_information.address.location.state_id = null;
          vm.employments[index].employment_information.address.location.city_id = null;
          vm.places[index].locationFinder = "";
        };

        vm.checkDate = function(employment) {
          if(employment.from_date > employment.to_date) {
            employment.to_date = "";
          }
        }
        init();
    }
})();
