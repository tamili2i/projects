(function() {
  "use strict";

  angular
    .module("immiApp.system")
    .service("MasterDataService", MasterDataService);

  /**
   * @ngdoc Injector
   * @name MasterDataService
   * @private
   * @module immiApp.system
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  MasterDataService.$inject = ["$q", "$http", "$timeout", "HTTPFactory"];

  /**
   * @ngdoc Service
   * @name MasterDataService
   * @module immiApp.system
   * @requires
   * @description
   *   This service gives list of countries and states.
   * @author Ideas2IT Technologies
   * @copyright
   */
  function MasterDataService($q, $http, $timeout, HTTPFactory) {
    var countries = [],
      genders = [],
      _getCountries = function() {
        var deferred = $q.defer(),
          countriesQ = HTTPFactory.call({
            "url": "/address/countries"
          });

        countriesQ.then(function(response) {
          countries = response.data;
          deferred.resolve(countries);
        });
        return deferred.promise;
      },
      _getPersonGender = function() {
        var deferred = $q.defer(),
          gendersQ = HTTPFactory.call({
          method: "GET",
          url: "/person/genders"
        });

        gendersQ.then(function(response) {
          genders = response.data;
          deferred.resolve(genders);
        });
        return deferred.promise;
      };

    return {

      "getCountries": function(isFromRoute) {
        if (_.isEmpty(countries)) {
          return _getCountries();
        } else {
          return countries;
        }
      },

      "getStates": function(countryId) {
        return HTTPFactory.call({
          url: "/address/countries/" + countryId + "/states",
          method: "GET"
        });
      },

      "getCities": function(countryId, stateId) {
        return HTTPFactory.call({
          url: "/address/countries/" + countryId + "/states/" + stateId + "/cities",
          method: "GET"
        });
      },

      "getAppIDsForAddress": function(address) {
        return HTTPFactory.call({
          url: "/address/addresses/getGoogleApiDetails",
          method: "GET",
          params : address
        });
      },

      "getAddressFromIds": function(address) {
        return HTTPFactory.call({
          url: "/address/addresses/getGoogleApiNameDetails",
          method: "GET",
          params : address
        });
      },

      "getPersonTitles": function() {
        return HTTPFactory.call({
          method: "GET",
          url: "/person/person-titles"
        });
      },

      "getPersonGender": function() {
        if (_.isEmpty(genders)) {
          return _getPersonGender();
        } else {
          return genders;
        }
      },

      "getMaritalStatusList": function() {
        return HTTPFactory.call({
          method: "GET",
          url: "/person/marriage-statuses"
        });
      },

      "getCitizenList": function() {
        return HTTPFactory.call({
          method: "GET",
          url: "/address/countries"
        });
      },
      "getAddressTypes": function(moduleName) {
        return HTTPFactory.call({
          url: "/address/address-types/getListByModuleName",
          method: "GET",
          params: {
            "moduleName": moduleName
          }
        });
      },
      "getDocumentSubTypes" : function(code){
        return HTTPFactory.call({
          url: "/casetypes/casetypesdocumentchecklist",
          method: "GET",
          params: {
            "code": code
          }
        });
      },
      "getImmigrationStatuses" : function(){
        return HTTPFactory.call({
          url: "/person/immigration-statuses",
          method: "GET"
        });
      },
      "getGraduationTypes" : function(){
        return HTTPFactory.call({
          url: "/person/education-types/graduate",
          method: "GET"
        });
      },
      "getSpecializations" : function(){
        return HTTPFactory.call({
          url: "/specializations",
          method: "GET"
        });
      },
      "getEmploymentTypes" : function(){
        return HTTPFactory.call({
          url: "/person/employment-types",
          method: "GET"
        });
      },
      "getMarriageTerminationTypes" : function(){
        return HTTPFactory.call({
          url: "/person/marriage-termination-types",
          method: "GET"
        });
      },
      "getCaseFormTypes" : function(){
        return HTTPFactory.call({
          url: "/casetypes/casetypesformtemplates/getFormTypes",
          method: "GET"
        });
      },
      "getRelations" : function(){
        return HTTPFactory.call({
          url: "/relation-types",
          method: "GET"
        });
      },
      "getCaseStatus" : function(data){
        return HTTPFactory.call({
          url: "/workflow/workflowcasestatus/getworkflowcasestatus",
          method: "POST",
          data: data
        });
      },
      "updateCaseStatus" : function(data){
        return HTTPFactory.call({
          url: "/workflow/workflowcasestatus/createworkflowcasestatus",
          method: "POST",
          data: data
        })
      }

    };

  }
})();
