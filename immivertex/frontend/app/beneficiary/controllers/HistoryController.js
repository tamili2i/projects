(function() {
    "use strict";
    angular.module("immiApp.beneficiary")
        .controller("HistoryController", HistoryController);
    /**
     * @ngdoc Injector
     * @name HistoryController
     * @private
     * @module immiApp.beneficiary
     * @description
     * HistoryController
     * @author Ideas2IT Technologies
     * @copyright
     */
    HistoryController.$inject = ["$scope", "PlacesFactory", "Utils", "Beneficiary", "Gender", "Countries", "TerminationTypes", "MarriageHistory", "TripsHistory", "BeneficiaryService"];

     /**
     * @ngdoc Controller
     * @name HistoryController
     * @module immiApp.beneficiary
     * @requires
     * @description
     * HistoryController
     * @author Ideas2IT Technologies
     * @copyright
     */
    function HistoryController($scope, PlacesFactory, Utils, Beneficiary, Gender, Countries, TerminationTypes, MarriageHistory, TripsHistory, BeneficiaryService) {
        var vm = this;

        vm.marriagePlaces = [];
        vm.terminationPlaces = [];
        vm.marriageHistories = [];
        vm.trips = [];

        vm.genders = Gender;
        vm.countries = Countries;
        vm.terminationTypes = TerminationTypes.data;
        vm.tripTypes = [{"id":1,"name":"Business"},{"id":2,"name":"Personal"}];

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
          marriageHist.party_id = Beneficiary.party_id;

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
          * @name addTravel
          * @param historyForms
          * @description
          * Adds more trips history fields
          *
          */
        vm.addTravel = function(historyForms) {
          if(historyForms) {
            historyForms.$submitted = false;
          }
          var tripInfo = {};
          tripInfo.party_id = Beneficiary.party_id;
          Utils.createWatch(tripInfo, $scope, historyChangeDetector);
          vm.trips.push(tripInfo);
        };

        /**
          * @ngdoc function
          * @name removeTravel
          * @param {number} index
          * @description
          * Removes trip history fields
          *
          */
        vm.removeTravel = function(index, tripHistoryId) {
          if(tripHistoryId){
            BeneficiaryService.deleteTripHistory(tripHistoryId);
          }
          if(index == 0){
            vm.abroadTripCheck = false;
          }else {
            vm.trips.splice(index,1);
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

        /**
         * @ngdoc function
         * @name save
         * @param {object} evt
         * @description
         * Saves Beneficiary's Address information.
         *
         */
        vm.save = function(evt) {
          evt.preventDefault();
          var margReConstructedObj = [];
          margReConstructedObj = angular.copy(vm.marriageHistories);
          if(!_.isEmpty(vm.marriageHistories) || !_.isEmpty(vm.trips)){
            for(var i=0; i<vm.marriageHistories.length; i++){
              margReConstructedObj[i].marriage.marriage_location = vm.marriageHistories[i].marriage.marriage_location.location;
              margReConstructedObj[i].marriage.termination_location = vm.marriageHistories[i].marriage.termination_location.location;
            }
            var historyFormObj = [
              {
                "type":"marriage",
                "body": margReConstructedObj
              },{
                "type":"trips",
                "body": vm.trips
              }]
            BeneficiaryService.saveHistory(historyFormObj, function callback(response){
              console.log("Marriage History Saved Successfully!");
            });
          }
        };

        var checkEmptyAddress = function(marriageHistory, tripsHistory){
          if(!_.isEmpty(marriageHistory)){
            vm.marriageCheck = true;
          }else {
            vm.addMarriage(historyForms);
          }

          if(!_.isEmpty(tripsHistory)){
            vm.abroadTripCheck = true;
          }else {
            vm.addTravel(historyForms);
          }
        };

        var getAddressAndPlaces = function(marriageHistory, tripsHistory){
          var marriageHistoryArr = [];
          var terminationHistoryArr = [];
          vm.marriageHistories = angular.copy(marriageHistory);
          vm.trips = angular.copy(tripsHistory);
          if(!_.isEmpty(vm.marriageHistories)){
            for (var i = 0; i < vm.marriageHistories.length; i++) {
              vm.marriageHistories[i].person.gender_name = _.where(Gender, {id: vm.marriageHistories[i].person.gender})[0];
              vm.marriageHistories[i].marriage.termination_type = _.where(TerminationTypes.data, {id: vm.marriageHistories[i].marriage.type_of_termination})[0];

              vm.marriageHistories[i] = convertMarriageLocationToLocation(vm.marriageHistories[i]);
            }
            vm.marriagePlaces = Utils.createWatchesAndPlacesInstanceForHistory(vm.marriageHistories, PlacesFactory, $scope, historyChangeDetector, "marriage");
            vm.terminationPlaces = Utils.createWatchesAndPlacesInstanceForHistory(vm.marriageHistories, PlacesFactory, $scope, historyChangeDetector, "trips");
          }
          if(!_.isEmpty(vm.trips)){
            for (var i = 0; i < vm.trips.length; i++) {
              vm.trips[i].visited_country = _.where(Countries, {id: vm.trips[i].country_id})[0];
              Utils.createWatch(vm.trips[i], $scope, historyChangeDetector);
            }
          }

        };

        var convertMarriageLocationToLocation = function(marriageHistory){
          var mrgHistObject = angular.copy(marriageHistory);
          if(mrgHistObject.marriage){
            marriageHistory.marriage.marriage_location.location = mrgHistObject.marriage.marriage_location;
            if(marriageHistory.marriage.termination_location){
              marriageHistory.marriage.termination_location.location = mrgHistObject.marriage.termination_location;
            }else {
              marriageHistory.marriage.termination_location = Utils.getAddressModel();
            }
          }
          return marriageHistory;
        };

        /**
        * @ngdoc function
        * @name init
        * @description
        * Initiates history form
        *
        */
        var init = function(){
          if (!_.isEmpty(MarriageHistory) || !_.isEmpty(TripsHistory)) {
            getAddressAndPlaces(MarriageHistory, TripsHistory);
            checkEmptyAddress(MarriageHistory, TripsHistory);
          }else {
            vm.addMarriage(historyForms);
            vm.addTravel(historyForms);
          }
        };

        init();
    }
})();
