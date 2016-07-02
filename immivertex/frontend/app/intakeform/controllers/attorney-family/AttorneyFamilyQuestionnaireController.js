(function() {
  "use strict";

  angular.module("immiApp.intakeform")
    .controller("AttorneyFamilyQuestionnaireController", AttorneyFamilyQuestionnaireController);

  /**
   * @ngdoc Injector
   * @name BeneficiaryService
   * @private
   * @module immiApp.intakeform
   * @description
   * Inject module that needs to be useful for AttorneyFamily Controller
   * @author Ideas2IT Technologies
   * @copyright
   */
  AttorneyFamilyQuestionnaireController.$inject = ["$scope",
    "$location",
    // 'BeneficiaryDataService',
    // 'BeneficiaryService',
    "PlacesFactory"
  ];

  /**
   * @ngdoc AttorneyFamilyQuestionnaireController
   * @name AttorneyFamilyQuestionnaireController
   * @module immiApp.intakeform
   * @requires $log
   * @description
   *
   * AttorneyFamilyQuestionnaireController
   *
   */
  /*jslint nomen: true*/
  /*global angular*/

  function AttorneyFamilyQuestionnaireController(
    $scope, $location, PlacesFactory) {
    var vm = this;

    vm.places = new PlacesFactory();
    vm.birthInfo = {};
    vm.places.locationFinder = "";
    vm.maritalStatus = [{
      name: "Single"
    }, {
      name: "Married"
    }, {
      name: "Divorced"
    }, {
      name: "Separated"
    }, {
      name: "Partner"
    }, {
      name: "Widowed"
    }];
    vm.citizen = [{
      name: "Indian"
    }, {
      name: "American"
    }, {
      name: "Chineese"
    }, {
      name: "Japaneese"
    }];

    /**
     * @ngdoc function
     * @name save
     * @param evt
     * @description
     * Saves Beneficiary's general information
     *
     */
    vm.save = function(evt) {

      evt.preventDefault();
      $location.path("/beneficiary/12334/");
      //$scope.$emit('beneficiaryInitialSave', {'id' : '12324'})
    };

    /**
     * @ngdoc function
     * @name locationCallback
     * @param {object}location
     * @description
     * Gets location based on user search
     *
     */
    vm.locationCallback = function(location) {
      vm.birthInfo.state = location.state;
      vm.birthInfo.city = location.city;
      /**
       * This block will be executed when user
       * searches for google location without choosing
       * the country.
       */
      if(_.isEmpty(vm.birthInfo.country)){
        vm.birthInfo.country = location.country;
        vm.places.getStates(location.country);
      }
    };

    /**
     * @ngdoc function
     * @name resetAddressModel
     * @description
     * Resets birthInfo when country changes
     *
     */
    vm.resetAddressModel = function() {
      vm.birthInfo.state = "";
      vm.birthInfo.city = "";
      vm.places.locationFinder = "";
    };

  }

}());
