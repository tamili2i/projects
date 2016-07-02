(function() {
    "use strict";

    angular
        .module("immiApp.caseManagement")
        .controller("CaseSearchController", CaseSearchController);

    /**
     * @ngdoc Injector
     * @name CaseSearchController
     * @private
     * @module immiApp.caseManagement
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    CaseSearchController.$inject = [
      "$scope",
      "$location",
      "CaseTypes"
    ];

    /**
     * @ngdoc Controller
     * @name CaseSearchController
     * @module immiApp.caseManagement
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function CaseSearchController($scope, $location, CaseTypes) {
        var vm = this;

        vm.q = {};
        vm.displayQ = {};
        vm.loadingFromQParam = false;
        vm.searchTagsCount = 0;
        vm.caseTypes = CaseTypes;
        vm.searchTagLabels = {
          "casetype" : "Case Type"
        };

        /**
         * @ngdoc function
         * @name loadSearchContainer
         * @description
         * Initiate search container with
         * search tags or search form field
         *
         */
        var loadSearchContainer = function(){
          vm.q = $location.search();
          vm.setSearchDisplay();
          vm.searchTagsCount = Object.keys(vm.displayQ).length;
          if(vm.searchTagsCount > 0){
            vm.loadingFromQParam = true;
          }
          $(".search-container").collapse("toggle");
        };

        /**
         * @ngdoc function
         * @name search
         * @description
         * Initiate search after form submit
         *
         */
        vm.search = function(){
          $location.search(vm.q);
          vm.searchTagsCount = Object.keys(vm.displayQ).length;
          if(vm.searchTagsCount > 0){
            vm.loadingFromQParam = true;
            $scope.$emit("search", vm.q);
          }else{
            vm.closeSearch();
            vm.loadingFromQParam = false;
          }
        };

        /**
         * @ngdoc function
         * @name removeSearchTags
         * @param key
         * @description
         * Removes the tag from search tags
         * based on given key
         *
         */
        vm.removeSearchTags = function(key){
          delete vm.displayQ[key];
          delete vm.q[key];
          vm.setSearchDisplay();
          vm.search();
        };

        /**
         * @ngdoc function
         * @name toggleSearchTags
         * @description
         * Toggles search tags and search form.
         *
         */
        vm.toggleSearchTags = function(){
          vm.loadingFromQParam = !vm.loadingFromQParam;
        };

        /**
         * @ngdoc function
         * @name reset
         * @description
         * Toggles search tags and search form.
         *
         */
        vm.reset = function(){
          vm.q = {};
          vm.displayQ = {};
        };


        vm.setSearchDisplay = function(){
          vm.displayQ = angular.copy(vm.q);
          if(vm.q.casetype) {
            vm.displayQ.casetype = _.where(vm.caseTypes,{"id":parseInt(vm.q.casetype)})[0].name;
          }
        }

        vm.closeSearch = function(){
          $scope.$emit("search", {});
        }

        function init(){
          loadSearchContainer();
        }
        init();
    }
})();
