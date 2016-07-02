(function() {
  "use strict";

  angular
    .module("immiApp.components")
    .factory("PlacesFactory", PlacesFactory);


  /**
   * @ngdoc Injector
   * @name PlacesFactory
   * @private
   * @module immiApp.components
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  PlacesFactory.$inject = ["MasterDataService", "Utils"];

  /**
   * @ngdoc Factory
   * @name PlacesFactory
   * @module immiApp.components
   * @requires
   * @description
   * Places method returns a function to create new
   * instance where places service needed.
   *
   * @example
       <example module="copyExample">
       <file name="index.html">
       <div ng-controller="ExampleController as exCtrl">
       <form novalidate class="simple-form">

       Location finder:
       <input type="text"
         ng-model="exCtrl.places.locationFinder"
         location-finder
         location-callback="exCtrl.locationCallback"
         class="form-control"/>

       Country :
       <ui-select
       ng-model="exCtrl.address.location.country_id"
       ng-change="exCtrl.places.getStates($select.selected.id);"
       theme="select2" name="countryName" class="form-control" required>
         <ui-select-match>{{$select.selected.name}}</ui-select-match>
         <ui-select-choices repeat="country.id as country in exCtrl.places.countries | filter: $select.search">
           <div ng-bind-html="country.name | highlight: $select.search"></div>
         </ui-select-choices>
       </ui-select>

       State :
       <ui-select ng-model="exCtrl.address.location.state_id"
       ng-change="exCtrl.places.getCities(exCtrl.address.location.country_id, $select.selected.id, exCtrl.address);" theme="select2" class="form-control">
         <ui-select-match>{{$select.selected.name}}</ui-select-match>
         <ui-select-choices repeat="state.id as state in exCtrl.places.states | filter: $select.search">
           <div ng-bind-html="state.name | highlight: $select.search"></div>
         </ui-select-choices>
       </ui-select>

       City:
       <ui-select ng-model="exCtrl.address.location.city_id" theme="select2" name="City" class="form-control" required>
         <ui-select-match>{{$select.selected.name}}</ui-select-match>
         <ui-select-choices repeat="city.id as city in exCtrl.places.cities | filter: $select.search">
           <div ng-bind-html="city.name | highlight: $select.search"></div>
         </ui-select-choices>
       </ui-select>
       </form>

       </div>

       <script>
        angular.module('copyExample', [])
          .controller('ExampleController', ['$scope', 'PlacesFactory', function($scope, PlacesFactory) {
            var vm = this;

            vm.address = {};

            vm.places = new PlacesFactory();

            vm.locationCallback = function(location) {
              //Logic goes here
            }

          }]);
       </script>
       </file>
       </example>
   * @author Ideas2IT Technologies
   * @copyright
   */
  function PlacesFactory(MasterDataService, Utils) {

    var countriesLocal = [];

    var PlacesFactory = function() {
      var _self = this;

      _self.countries = [];
      _self.states = [];
      _self.cities = [];

      _self.metaLocation = {};


      /**
       * @ngdoc function
       * @name getPlacesInfo
       * @param {Object} addressIds to get address names
       * @description
       * Gets location names from given location Ids
       */
      _self.getPlacesInfo = function(addressIds) {
        var Address = MasterDataService.getAddressFromIds(addressIds);

        Address.then(function(response) {
          _self.metaLocation = response.data;
        }, function(errResponse) {
          console.error(errReponse);
        });
      };

      /**
       * @ngdoc function
       * @name getStates
       * @param {String} countryId to get states
       * @description
       * Gets list of states based on country code
       */
      _self.getStates = function(countryId) {
        var States = MasterDataService.getStates(countryId);

        States.then(function(response) {
          _self.states = response.data;
        });
      };

      /**
       * @ngdoc function
       * @name getCities
       * @param {String} countryId to get cities
       * @param {String} stateId to get cities
       * @param {object}  vmAddress to reset city.
       * vmAddress will be passed only from view.
       * @description
       * Gets list of cities based on country code and state code
       *
       * Also we need to reset the city_id, to avoid displaying of previously
       * selected city which belongs to another state. This functionality will
       * be executed only when this method called from view
       *
       */
      _self.getCities = function(countryId, stateId, vmAddress) {
        var Cities = MasterDataService.getCities(countryId, stateId);

        Cities.then(function(response) {
          if (!_.isEmpty(vmAddress))
            vmAddress.location.city_id = null;

          _self.cities = response.data;
        });
      };

      /**
       * @ngdoc function
       * @name getStatesAndCities
       * @param {String} countryId to get states
       * @param {String} stateId to get cities
       * @description
       * Gets list of states and cities
       * based on country and state code
       *
       */
      _self.getStatesAndCities = function(countryId, stateId) {
        if(countryId){
          _self.getStates(countryId);
        }
        if(countryId && stateId){
          _self.getCities(countryId, stateId);
        }
      };

      /**
       * @ngdoc function
       * @name getStatesAndCities
       * @param {String} countryId to get states
       * @param {object} stateId to get cities
       * @param {function} callback to controller
       * @description
       * We cannot directly use address given by google places.
       * So, if gets ID for country, state and city for
       * address given by Google maps API. This API will
       * return ID if given address is found else it will be
       * saved and then return ID
       */
      _self.getAppIDsForAddress = function(address, vmAddress, addressIDCallback) {
        Utils.getAppIDsForAddress(address).then(function(addressIds) {
          vmAddress.location.state_id = addressIds.state_id;
          vmAddress.location.city_id = addressIds.city_id;
          vmAddress.location.country_id = addressIds.country_id;
          //_self.getStatesAndCities(vmAddress.location.country_id, vmAddress.location.state_id);
          addressIDCallback(addressIds);
        });
      };

      //Get countries in during object instantiation
      _self.countries = MasterDataService.getCountries() || [];

    };

    //TODO
    //PlacesFactory.prototype.countries = MasterDataService.getCountries();

    return PlacesFactory;

  }
})();
