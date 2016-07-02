(function() {
  "use strict";

  angular
    .module("immiApp.corporation")
    .directive("validateFein", validateFein);

  /**
   * @ngdoc Directive
   * @name validateFein
   * @module Components
   * @restrict A
   * @description
   * This directive creates datepicker
   * @author Ideas2IT Technologies
   * @copyright
   */

  validateFein.$inject = ["$timeout"]


  function validateFein($timeout) {
    var directive = {
      restrict: "A",
      require: "ngModel",
      link: linkFunc
    };

    return directive;

    function linkFunc(scope, el, attrs, ctrl) {
      el.inputmask();

      el.on("blur", function(){
        validateField();
      })

      function validateField(value) {
        if(attrs.required){
          var isNotValid = (_.isEmpty(el.val()) || (el.val()).indexOf("_") > -1);
          ctrl.$setValidity('feinpattern', !isNotValid);
          return isNotValid ? undefined : value;
        }

      }

      ctrl.$parsers.unshift(validateField);
      ctrl.$formatters.unshift(validateField);
    }

  }
})();




(function() {
  "use strict";

  angular
    .module("immiApp.corporation")
    .directive("validateSsnFein", validateSsnFein);

  /**
   * @ngdoc Directive
   * @name validateSsnFein
   * @module Components
   * @restrict A
   * @description
   * This directive creates datepicker
   * @author Ideas2IT Technologies
   * @copyright
   */

  validateSsnFein.$inject = ["$timeout"]


  function validateSsnFein($timeout) {
    var directive = {
      restrict: "A",
      require: "ngModel",
      link: linkFunc
    };

    return directive;

    function linkFunc(scope, el, attrs, ssnCtrl) {


      function handleFein(feinCtrl, isValid) {
        if (feinCtrl.$name === "FederalEmpIdNumber") {
          //el.off("change").on("change", function(){
          feinCtrl.$setValidity('feinpattern', isValid);
          //})

        }
      }

      function handleValidation(value) {
        var form = scope[attrs.form],
          feinCtrl = form[attrs.otherField];

        var isValid = (!_.isEmpty(value) || !_.isEmpty(feinCtrl.$modelValue));

        ssnCtrl.$setValidity('ssnOrFein', isValid);
        feinCtrl.$setValidity('ssnOrFein', isValid); //set validity of the current el

        feinCtrl.$setValidity('feinpattern', isValid);

        return isValid ? value : undefined;
      };

      ssnCtrl.$parsers.unshift(handleValidation);
      ssnCtrl.$formatters.unshift(handleValidation);


    }
  }
})();



(function() {
  "use strict";

  angular
    .module("immiApp.corporation")
    .directive("validateFeinSsn", validateFeinSsn);

  /**
   * @ngdoc Directive
   * @name validateFeinSsn
   * @module Components
   * @restrict A
   * @description
   * This directive creates datepicker
   * @author Ideas2IT Technologies
   * @copyright
   */

  validateFeinSsn.$inject = ["$timeout"]


  function validateFeinSsn($timeout) {
    var directive = {
      restrict: "A",
      require: "ngModel",
      link: linkFunc
    };

    return directive;

    function linkFunc(scope, el, attrs, feinCtrl) {

      el.inputmask();

      function validateMasking(value) {
        var isValid = ((!_.isEmpty(el.val()) && !((el.val()).indexOf("_") > -1)))
        feinCtrl.$setValidity('feinpattern', isValid);
        return isValid ? value : undefined;
      }

      function handleValidation(value) {
        var form = scope[attrs.form],
          ssnCtrl = form[attrs.otherField];

        value = validateMasking(value)

        var isValid = (!_.isEmpty(value) || !_.isEmpty(ssnCtrl.$modelValue));

        feinCtrl.$setValidity('ssnOrFein', isValid);
        ssnCtrl.$setValidity('ssnOrFein', isValid); //set validity of the current element

        return isValid ? value : undefined;
      };

      feinCtrl.$parsers.unshift(handleValidation);
      feinCtrl.$formatters.unshift(handleValidation);


    }
  }
})();
