(function() {
  "use strict";


  angular
    .module("immiApp.PcAdministration")
    .controller("DocumentCheckListFormController", DocumentCheckListFormController);

  /**
   * @ngdoc Injector
   * @name DocumentCheckListFormController
   * @private
   * @module immiApp.PcAdministration
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  DocumentCheckListFormController.$inject = [
    "$scope",
    "$location",
    "DocumentChecklist",
    "$timeout",
    "$rootScope",
    "ProgramCaseService",
    "Session"
  ];

  /**
   * @ngdoc Controller
   * @name DocumentCheckListFormController
   * @module immiApp.PcAdministration
   * @requires
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  function DocumentCheckListFormController($scope, $location, DocumentChecklist, $timeout, $rootScope, ProgramCaseService, Session) {
    var vm = this;

    vm.documentChecklist = DocumentChecklist;

    /**
     * @ngdoc function
     * @name init
     * @description
     * Initiates Document checklist form
     *
     */
    var init = function() {
      $rootScope.state = getStateName();
      loadFormContainer();
    };

    /**
     * @ngdoc function
     * @name getState
     * @description
     * returns current state name
     *
     */
    var getStateName = function() {
      if (vm.documentChecklist.id) {
        vm.edit = true;
        vm.title = "View";
        return vm.documentChecklist.id;
      } else {
        vm.title = "Create";
        return vm.title;
      }
    };

    /**
     * @ngdoc function
     * @name createDocumentChecklist
     * @param evt
     * @description
     * Create new Document Checklist
     *
     */
    vm.createDocumentChecklist = function(documentForm) {
      vm.documentChecklist.updated_by = Session.getUpdatedBy();
      console.log("Document Checklist info JSON: ",vm.documentChecklist);
      ProgramCaseService.createDocumentChecklist(vm.documentChecklist, function successCallback(response) {
         console.log("documentChecklist Saved");
         $scope.$emit('Update:DocumentChecklistList');
       }, function errorCallback(response){
         if(response["name"]){
           documentForm.name.$setValidity("availability", false);
         }
      });
    };

    /**
     * @ngdoc function
     * @name setAvailability
     * @param element
     * @description
     * Sets availability error message to true
     *
     */
    vm.setAvailability = function(element){
      element.$setValidity("availability", true);
    }
    /**
     * @ngdoc function
     * @name loadFormContainer
     * @description
     * Initiate form container with animation
     *
     */
    var loadFormContainer = function() {
      $(".create-container").collapse("toggle");
     };

    init();
  }
})();
