(function() {
  "use strict";


  angular
    .module("immiApp.PcAdministration")
    .controller("DocumentCheckListViewController", DocumentCheckListViewController);

  /**
   * @ngdoc Injector
   * @name DocumentCheckListViewController
   * @private
   * @module immiApp.PcAdministration
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  DocumentCheckListViewController.$inject = [
    "DocumentChecklist"
  ];

  /**
   * @ngdoc Controller
   * @name DocumentCheckListViewController
   * @module immiApp.PcAdministration
   * @requires
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  function DocumentCheckListViewController(DocumentChecklist) {
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
      loadFormContainer();
    };

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
