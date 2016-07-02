(function() {
    "use strict";

    angular
        .module("immiApp.components")
        .directive("customDatepicker", CustomDatepicker);

    /**
     * @ngdoc Directive
     * @name CustomDatepicker
     * @module Components
     * @restrict A
     * @description
     * This directive creates datepicker
     * @author Ideas2IT Technologies
     * @copyright
     */
    function CustomDatepicker() {
        var directive = {
            restrict: "A",
            link: linkFunc
        };

        return directive;

        function linkFunc(scope, el, attr, ctrl) {
          var date = scope.$eval(attr.ngModel),
           options = { autoclose: true};
         if(date)
           el[0].value = date;

          if(attr.endDate) {
            options.endDate = attr.endDate;
          }
          if(attr.format) {
            options.format = attr.format;
          }

          scope.$watch(attr.startDate, function(newValue, oldValue) {
            if(newValue) {
              var days = dateDiffInDays(new Date(), new Date(newValue));
              options.startDate = days+"d";
              el.datepicker('remove');
              el.datepicker(options);
            }
          }, true);
          el.datepicker(options);

          /**
           * @ngdoc function
           * @name dateDiffInDays
           * @param {object} today, {object} selectedDate
           * @description
           * Calculates number of days between two dates
           *
           */
          function dateDiffInDays(today, selectedDate) {
            var oneDay = 1000 * 60 * 60 * 24;
            var utc1 = Date.UTC(today.getFullYear(), today.getMonth(), today.getDate());
            var utc2 = Date.UTC(selectedDate.getFullYear(), selectedDate.getMonth(), selectedDate.getDate());
            return Math.floor((utc2 - utc1) / oneDay);
          }
        }
    }
})();
