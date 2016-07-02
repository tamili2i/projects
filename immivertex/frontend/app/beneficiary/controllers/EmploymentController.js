(function() {
    "use strict";
    angular.module("immiApp.beneficiary")
        .controller("EmploymentController", EmploymentController);
    /**
     * @ngdoc Injector
     * @name EmploymentController
     * @private
     * @module immiApp.beneficiary
     * @description
     * HistoryController
     * @author Ideas2IT Technologies
     * @copyright
     */
    EmploymentController.$inject = ["$scope", "Utils", "BeneficiaryService", "PlacesFactory","EmploymentType", "Beneficiary", "Employment"];

     /**
     * @ngdoc Controller
     * @name EmploymentController
     * @module immiApp.beneficiary
     * @requires
     * @description
     * HistoryController
     * @author Ideas2IT Technologies
     * @copyright
     */
    function EmploymentController($scope, Utils, BeneficiaryService, PlacesFactory, EmploymentType, Beneficiary, Employment) {
        var vm = this;

        vm.employments = [];
        vm.places = [];
        vm.employmentTypeName = "";
        vm.employmentTypes = EmploymentType;
        console.log("GET Employment info :",Employment);

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
          if (!_.isEmpty(Employment)) {
            vm.employments = angular.copy(Employment);
            var obj = {};
            for (var i = 0; i < vm.employments.length; i++) {
              obj = vm.employments[i];
              vm.employmentTypeName = _.where(EmploymentType, {id: obj.type_id})[0];
              Utils.createWatch(obj, $scope, employmentChangeDetector);
              vm.places[i] = Utils.createPlaceInstance(obj.employment_information.address, PlacesFactory);
            }
            //vm.places = Utils.createWatchesAndPlacesInstance(vm.employments, PlacesFactory, $scope, employmentChangeDetector);
          } else {
            vm.addEmployment();
          }
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
                  "party_id": Beneficiary.party_id,
                  "location": {
                    "state_id": null,
                    "city_id": null,
                    "country_id": null
                  }
                }
              }
            };
            employment.party_id = Beneficiary.party_id;
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

        /**
         * @ngdoc function
         * @name save
         * @param {object} evt
         * @description
         * Saves Beneficiary's Employment information.
         *
         */
        vm.save = function(evt) {
          console.log("POST Employment Given Info::", vm.employments);
          BeneficiaryService.saveBeneficiaryEmployment(vm.employments, function(){
            //
          });
        };

        /**
         * @ngdoc function
         * @name changeValue
         * @param {number} index
         * @description
         * Checks current radio button and set to date
         * as today's date
         */
        vm.changeValue = function(index) {
          _.each(vm.employments, function(employment, i) {
            if(i != index){
              employment.is_current = false;
            } else {
              var date = new Date();
              employment.to_date = date.toISOString().substring(0, 10);
            }
            console.log(employment.is_current);
          });
        }

        vm.checkDate = function(employment) {
          if(employment.from_date > employment.to_date) {
            employment.to_date = "";
          }
        }
        init();
    }
})();
