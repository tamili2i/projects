(function() {
  "use strict";
  angular.module("immiApp.beneficiary")
    .controller("EducationController", EducationController);
  /**
   * @ngdoc Injector
   * @name EducationController
   * @private
   * @module immiApp.beneficiary
   * @description
   * HistoryController
   * @author Ideas2IT Technologies
   * @copyright
   */
  EducationController.$inject = ["$scope", "Utils", "BeneficiaryService", "PlacesFactory", "Beneficiary", "Education", "AddressTypes", "GraduationType", "Specializations"];

  /**
   * @ngdoc Controller
   * @name EducationController
   * @module immiApp.beneficiary
   * @requires
   * @description
   * HistoryController
   * @author Ideas2IT Technologies
   * @copyright
   */
  function EducationController($scope, Utils, BeneficiaryService, PlacesFactory, Beneficiary, Educations, AddressTypes, GraduationType, Specializations) {
    var vm = this;

    vm.educations = [];
    vm.places = [];
    vm.specializations = Specializations;

    /**
     * @ngdoc function
     * @name educationChangeDetector
     * @param {object} oldObj - state of object before change
     * @param {object} newObj - state of object after change
     * @description
     * In View, we have only one save button for multiple
     * educations. To avoid saving of all the education whose
     * properties are still unchanged, we are watching each education object.
     * The Education will only be saved, if any of its property changed.
     *
     */
    function educationChangeDetector(oldObj, newObj){
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
     * Initiates education form.
     * if Education is saved more than once, then its appropriate
     * countries, states and cities should be loaded. Also creating watch
     * for change detection.
     */
    var init = function() {
      if (!_.isEmpty(Educations)) {
        vm.educations = angular.copy(Educations);
        vm.places = Utils.createWatchesAndPlacesInstance(vm.educations, PlacesFactory, $scope, educationChangeDetector);
      } else {
        vm.addEducation();
      }
    };

    /**
     * @ngdoc function
     * @name addEducation
     * @description
     * Adds new education.
     * Education object is added with countries data,
     * address object
     *
     */
    vm.addEducation = function(educationForms) {
      if(educationForms) {
        educationForms.$submitted = false;
      }
      var education = {};
      education.address = Utils.getAddressModel(AddressTypes, "Education", Beneficiary.party_id);
      education.party_id = Beneficiary.party_id;
      education.type_id = GraduationType.id;
      Utils.createWatch(education, $scope, educationChangeDetector);
      vm.educations.push(education);
      vm.places[vm.educations.length-1] = Utils.createPlaceInstance(education.address, PlacesFactory);

    };

    /**
     * @ngdoc function
     * @name removeEducation
     * @param {number} index
     * @description
     * Removes education details
     */
    vm.removeEducation = function(index, educationId) {
      if(educationId){
        BeneficiaryService.deleteEducation(educationId);
      }
      vm.educations.splice(index, 1);
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
      vm.places[index].getAppIDsForAddress(location.longName, vm.educations[index].address, function(address){
        vm.places[index].metaLocation = location.longName;
        console.log("States and cities fetched according to google places");
      });
    };

    /**
     * @ngdoc function
     * @name resetAddressModel
     * @description
     * Resets educations address when country changes
     *
     */
    vm.resetAddressModel = function(index) {
      vm.educations[index].address.location.state_id = null;
      vm.educations[index].address.location.city_id = null;
      vm.places[index].locationFinder = "";
    };

    /**
     * @ngdoc function
     * @name save
     * @param {object} evt
     * @description
     * Saves Beneficiary's Education information.
     *
     */
    vm.save = function(evt) {
      evt.preventDefault();
      console.log("vm.general:", vm.educations);
      BeneficiaryService.saveBeneficiaryEducation(vm.educations, function(){
        //
      });
    };
    vm.checkDate = function(education) {
      if(education.from_date > education.to_date) {
        education.to_date = "";
      }
    }
    init();
  }
})();
