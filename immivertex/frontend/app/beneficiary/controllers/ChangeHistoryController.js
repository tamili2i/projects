(function() {
  'use strict';

  angular
    .module('immiApp.beneficiary')
    .controller('ChangeHistoryController', ChangeHistoryController);

  /**
   * @ngdoc Injector
   * @name ChangeHistoryController
   * @private
   * @module immiApp.beneficiary
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  ChangeHistoryController.$inject = ['$scope', "Utils", "InfiniteScroll", "BeneficiaryService", "Beneficiary"];

  /**
   * @ngdoc Controller
   * @name ChangeHistoryController
   * @module immiApp.beneficiary
   * @requires
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  function ChangeHistoryController($scope, Utils, InfiniteScroll, BeneficiaryService, Beneficiary) {
    var vm = this;

    vm.histories = [];
    vm.changeHistory = {};

    vm.scroll = new InfiniteScroll();

    /**
     * @ngdoc function
     * @name init
     * @description
     * Initializes the controller with
     * initial data
     *
     */
    function init() {
      vm.getChangeHistory(1);
    }

    /**
     * @ngdoc function
     * @name nextPage
     * @description
     * will be called from infinite scroll
     * Given as callback for infinite scroll
     */
    vm.nextPage = function() {
      if (vm.scroll.busy)
        return;
      if (vm.changeHistory.current_page < vm.changeHistory.last_page) {
        vm.scroll.busy = true;
        vm.getChangeHistory(vm.changeHistory.current_page + 1);
      }
    }

    /**
     * @ngdoc function
     * @name getChangeHistory
     * @description
     * Fetches change history from server
     */
    vm.getChangeHistory = function(page) {
      BeneficiaryService.getChangeHistory(Beneficiary.party_id, page, function success(histories) {
        vm.changeHistory = histories;
        if (!_.isEmpty(histories.data)) {
          vm.histories = vm.histories.concat(histories.data);
        }
        vm.scroll.busy = false;
        console.log("Change histories fetched");
      });
    }

    /**
     * @ngdoc function
     * @name getParsedDate
     * @param {String} date
     * @description
     * which converts date string to ISO String.
     *
     */
    vm.getParsedDate = function(date) {
      return new Date(date);
    }

    init();
  }
})();
