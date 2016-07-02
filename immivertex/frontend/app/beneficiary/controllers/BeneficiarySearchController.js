(function() {
    "use strict";

    angular
        .module("immiApp.beneficiary")
        .controller("BeneficiarySearchController", BeneficiarySearchController);

    /**
     * @ngdoc Injector
     * @name BeneficiarySearchController
     * @private
     * @module immiApp.beneficiary
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    BeneficiarySearchController.$inject = [
      "$scope",
      "$location",
      "CaseTypes",
      "CaseStatus",
      "BeneficiaryStatus",
      "Gender"
    ];

    /**
     * @ngdoc Controller
     * @name BeneficiarySearchController
     * @module immiApp.beneficiary
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function BeneficiarySearchController($scope, $location, CaseTypes, CaseStatus, BeneficiaryStatus,Gender) {
        var vm = this;

        vm.q = {};
        vm.displayQ = {};
        vm.loadingFromQParam = false;
        vm.searchTagsCount = 0;
        vm.genders = Gender;
        vm.caseTypes = CaseTypes;
        vm.beneficiaryStatus = BeneficiaryStatus;
        vm.caseStatus = CaseStatus;
        vm.searchTagLabels = {
          "first_name" : "First Name",
          "last_name" : "Last Name",
          "gender" : "Gender",
          "date_of_birth" : "Date of Birth",
          "casetype" : "Case Type",
          "casestatus" : "Case Status",
          "beneficiarystatus" : "Beneficiary Status"
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
          if(vm.displayQ.date_of_birth=="") {
            delete vm.displayQ["date_of_birth"];
            delete vm.q["date_of_birth"];
          }
          if(vm.q.gender) {
            vm.displayQ.gender = _.where(vm.genders,{"id":parseInt(vm.q.gender)})[0].name;
          }
          if(vm.q.casetype) {
            vm.displayQ.casetype = _.where(vm.caseTypes,{"id":parseInt(vm.q.casetype)})[0].name;
          }
          if(vm.q.casestatus) {
            vm.displayQ.casestatus = _.where(vm.caseStatus,{"id":parseInt(vm.q.casestatus)})[0].name;
          }
          if(vm.displayQ.beneficiarystatus) {
            vm.displayQ.beneficiarystatus = _.where(vm.beneficiaryStatus,{"id":parseInt(vm.q.beneficiarystatus)})[0].name;
          }
          if(vm.displayQ.page){
            delete vm.displayQ["page"];
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
