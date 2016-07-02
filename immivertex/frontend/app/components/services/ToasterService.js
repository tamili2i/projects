(function() {
  "use strict";

  angular
    .module("immiApp.components")
    .service("ToasterService", ToasterService);


  /**
   * @ngdoc Injector
   * @name ToasterService
   * @private
   * @module immiApp.components
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
   ToasterService.$inject = [];


   function ToasterService() {
    var _self = this;
    var toastrOptions = {
                "closeButton": false,
                "debug": false,
                "newestOnTop": false,
                //"progressBar": true,
                "positionClass": "toast-top-right",
                "preventDuplicates": false,
                "onclick": null,
                "showDuration": "5000",
                "hideDuration": "1000",
                "timeOut": "5000",
                "extendedTimeOut": "1000",
                "showEasing": "swing",
                "hideEasing": "linear",
                "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
        };

   /**
    * @ngdoc function
    * @name ToasterService
    * @param title
    * @param msg
    * @description
    * toastSuccess method shows Success message alert
    */
    _self.toastSuccess = function (title,msg) {
      toastr.success(title,msg,toastrOptions);
    };

   /**
    * @ngdoc function
    * @name ToasterService
    * @param title
    * @param msg
    * @description
    * toastError method shows Error message alert
    */
    _self.toastError = function (title,msg) {
      toastr.error(title,msg,toastrOptions);
    };

    /**
    * @ngdoc function
    * @name ToasterService
    * @param title
    * @param msg
    * @description
    * toastInfo method shows Information message alert

    */
    _self.toastInfo = function(title,msg) {
      toastr.info(title,msg,toastrOptions);
    };

   /**
    * @ngdoc function
    * @name ToasterService
    * @param title
    * @param msg
    * @description
    * toastWarning method returns warning message alert
    */
    _self.toastWarning = function(title,msg) {
      toastr.warning(title,msg,toastrOptions);
    };

  }

})();
