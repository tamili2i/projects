(function() {
  "use strict";

  angular
    .module("immiApp.components")
    .directive("locationFinder", locationFinder);

  /**
   * @ngdoc Directive
   * @name locationFinder
   * @module immiApp.components
   * @restrict A
   * @description
   * Suggest users to choose location from
   * google API
   * scope argument contains following contents
      - locationCallback
        Callback to associated controller method.
        It is called back with address object from
        google API.

      - watchFor
        ngModel of an view, watch this model.Currently which is an
        country. It restricts user's location search for particular country

      - isInRepeat
        It's an optional parameter, but mandatory in ngRepeat.
        It holds the index value. If it is inside
        ngRepeat.

   * @author Ideas2IT Technologies
   * @copyright
   */
  function locationFinder() {
    var locationFinder = {
      restrict: "A",
      scope: {
        "locationCallback" : "=",
        "watchFor" : "=",
        "isInRepeat" : "="
      },
      link: linkFunc
    };

    return locationFinder;

    function linkFunc(scope, el, attr, ctrl) {
      el.keydown(function(evt){
        if(evt.keyCode === 13){
          evt.preventDefault();
        }
      });

      var autocomplete = new google.maps.places.Autocomplete(el[0]);
      var location = {
        "shortName" : {},
        "longName" : {}
      };
      /**
       * This adds listener to  autocomplete element and executes whenever
       * user searches for location
       */
      autocomplete.addListener("place_changed", function() {
        location = {
          "shortName" : {},
          "longName" : {}
        };
        var address = autocomplete.getPlace().address_components;
        if(!_.isEmpty(address)) {
          address.forEach(function(element,index,array){
            if(element.types[0] === "administrative_area_level_1") {
              location.shortName.state = element.short_name;
              location.longName.state = element.long_name;
            } else if(element.types[0] === "locality") {
              location.shortName.city = element.short_name;
              location.longName.city = element.long_name;
            } else if(element.types[0] === "country") {
              location.shortName.country = element.short_name;
              location.longName.country = element.long_name;
            } else if(element.types[0] === "postal_code") {
              location.shortName.zipCode = element.short_name;
              location.longName.zipCode = element.long_name;
            } else if(element.types[0] === "sublocality_level_2") {
              location.shortName.street = element.short_name;
              location.longName.street = element.long_name;
            }
          });
          location.shortName.stateCode = location.shortName.country + "-" + location.shortName.state;

          scope.$apply(function(){
            if(typeof scope.isInRepeat == "number"){
                scope.locationCallback(location, scope.isInRepeat);
              } else{
                scope.locationCallback(location);
              }
          });
        }
      });

      el.on("blur", function(){
        if(location.longName.city){
          el[0].value = location.longName.city;
        }else{
          el[0].value = null;
        }
      });

      /**
       *Watches for ngModel currently which is country
       */
      scope.$watch("watchFor",function(newValue,oldValue){
        var options = {};
        if(newValue){
          options.componentRestrictions = {"country":newValue};
          autocomplete.setOptions(options);
        }
      });
    }
  }

  /**
   * @ngdoc Injector
   * @name locationFinder
   * @module immiApp.components
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  locationFinder.$inject = [];

})();
