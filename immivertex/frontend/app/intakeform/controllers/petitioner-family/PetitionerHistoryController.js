(function() {
    "use strict";

    angular
        .module("immiApp.intakeform")
        .controller("PetitionerHistoryController", PetitionerHistoryController);

    /**
     * @ngdoc Injector
     * @name PetitionerHistoryController
     * @private
     * @module immiApp.intakeform
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    PetitionerHistoryController.$inject = [
      "Utils",
      "PlacesFactory",
      "$scope"
    ];

    /**
     * @ngdoc Controller
     * @name PetitionerHistoryController
     * @module immiApp.intakeform
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function PetitionerHistoryController(Utils, PlacesFactory, $scope) {
        var vm = this;

        vm.marriagePlaces = [];
        vm.terminationPlaces = [];
        vm.marriageHistories = [];
        vm.parents = {
          "father": {
            "birth_location": Utils.getAddressModel(),
            "residence_location":  Utils.getAddressModel()
          },
          "mother": {
            "birth_location": Utils.getAddressModel(),
            "residence_location":  Utils.getAddressModel()
          }
        };

        /**
         * @ngdoc function
         * @name historyChangeDetector
         * @param {object} oldObj - state of object before change
         * @param {object} newObj - state of object after change
         * @description
         * In View, we have only one save button for multiple
         * history. To avoid saving of all the history info whose
         * properties are still unchanged, we are watching each history object.
         * The History will only be saved, if any of its property changed.
         *
         */
        function historyChangeDetector(oldObj, newObj){
          if(!newObj.changeLog){
            oldObj.changeLog = 1;
          }else{
            oldObj.changeLog = ++newObj.changeLog;
          }
        }

        /**
          * @ngdoc function
          * @name addMarriage
          * @param  historyForms
          * @description
          * Add more marriage info fields
          *
          */
        vm.addMarriage = function (historyForms) {
          if(historyForms) {
            historyForms.$submitted = false;
          }
          var marriageHist = {
            "marriage" : {
              "marriage_location" : {},
              "termination_location": {}
            }
          };
          marriageHist.marriage.marriage_location = Utils.getAddressModel();
          marriageHist.marriage.termination_location = Utils.getAddressModel();
          Utils.createWatch(marriageHist, $scope, historyChangeDetector);
          vm.marriageHistories.push(marriageHist);
          vm.marriagePlaces[vm.marriageHistories.length-1] = Utils.createPlaceInstance(marriageHist.marriage.marriage_location, PlacesFactory);
          vm.terminationPlaces[vm.marriageHistories.length-1] = Utils.createPlaceInstance(marriageHist.marriage.termination_location, PlacesFactory);
        };

        /**
          * @ngdoc function
          * @name removeMarriage
          * @param {number} index
          * @description
          * Removes marriage history fields
          *
          */
        vm.removeMarriage = function(index, marriageHistoryId) {
          if(marriageHistoryId){
            BeneficiaryService.deleteMarriageHistory(marriageHistoryId);
          }
          if(index == 0){
            vm.marriageCheck = false;
          }else {
            vm.marriageHistories.splice(index,1);
          }
        };

        /**
         * @ngdoc function
         * @name locationCallbackMarriage
         * @param {Object} location
         * @param {number} index this will be passed
         * only when location finder is inside ngRepeat
         * @description
         * Gets locations based on user search
         * Also load cities and states based on country and state
         * choosen from Google API
         */
        vm.locationCallbackMarriage = function(location, index) {
          vm.marriagePlaces[index].getAppIDsForAddress(location.longName, vm.marriageHistories[index].marriage.marriage_location, function(address){
            vm.marriagePlaces[index].metaLocation = location.longName;
            console.log("States and cities fetched according to google places");
          });
        };

        /**
         * @ngdoc function
         * @name locationCallbackTermination
         * @param {Object} location
         * @param {number} index this will be passed
         * only when location finder is inside ngRepeat
         * @description
         * Gets locations based on user search
         * Also load cities and states based on country and state
         * choosen from Google API
         */
        vm.locationCallbackTermination = function(location, index) {
          vm.terminationPlaces[index].getAppIDsForAddress(location.longName, vm.marriageHistories[index].marriage.termination_location, function(address){
            vm.terminationPlaces[index].metaLocation = location.longName;
            console.log("States and cities fetched according to google places");
          });
        };


        vm.locationCallbackFatherBirth = function(location, index) {
          vm.fatherBirthPlaces.getAppIDsForAddress(location.longName, vm.parents.father.birth_location, function(address){
            vm.fatherBirthPlaces.metaLocation = location.longName;
            console.log("States and cities fetched according to google places");
          });
        };
        vm.locationCallbackFatherResidance = function(location, index) {
          vm.fatherResidancePlaces.getAppIDsForAddress(location.longName, vm.parents.father.residence_location, function(address){
            vm.fatherResidancePlaces.metaLocation = location.longName;
            console.log("States and cities fetched according to google places");
          });
        };

        vm.locationCallbackMotherBirth = function(location, index) {
          vm.motherBirthPlaces.getAppIDsForAddress(location.longName, vm.parents.father.birth_location, function(address){
            vm.motherBirthPlaces.metaLocation = location.longName;
            console.log("States and cities fetched according to google places");
          });
        };
        vm.locationCallbackMotherResidance = function(location, index) {
          vm.motherResidancePlaces.getAppIDsForAddress(location.longName, vm.parents.father.residence_location, function(address){
            vm.motherResidancePlaces.metaLocation = location.longName;
            console.log("States and cities fetched according to google places");
          });
        };

        vm.checkDate = function(marriageHistory) {
          if(marriageHistory.from_date > marriageHistory.to_date) {
            marriageHistory.to_date = "";
          }
        }
        /**
        * @ngdoc function
        * @name init
        * @description
        * Initiates history form
        *
        */
        var init = function(){
          vm.addMarriage();
          vm.fatherBirthPlaces = Utils.createPlaceInstance(vm.parents.father.birth_location, PlacesFactory);
          vm.fatherResidancePlaces = Utils.createPlaceInstance(vm.parents.father.residence_location, PlacesFactory);
          vm.motherBirthPlaces = Utils.createPlaceInstance(vm.parents.mother.birth_location, PlacesFactory);
          vm.motherResidancePlaces = Utils.createPlaceInstance(vm.parents.mother.residence_location, PlacesFactory);
        };

        init();

    }
})();
