(function() {
    "use strict";
    /*jslint nomen: true*/
    /*global angular, $, _*/

    /**
     * @ngdoc Service
     * @name UsernoteService
     * @module immiApp.usernote
     * @requires
     * @description
     * This service has functionality to interface with backend to send and fetch data.
     * @author Ideas2IT Technologies
     * @copyright
     */
    angular.module("immiApp.usernote")
        .service("UsernoteService", UsernoteService);

    /**
     * @ngdoc Injector
     * @name UsernoteService
     * @private
     * @module immiApp.usernote
     * @description
     * Inject module that needs to be useful for grid service
     * @author Ideas2IT Technologies
     * @copyright
     */
    UsernoteService.$inject = ["UsernoteDataService", "ToasterService"];

    function UsernoteService(UsernoteDataService, ToasterService) {
        var _self = this;

        /**
          * @ngdoc function
          * @name saveUserNote
          * @param  {object} userNoteObj
          * @param successCallback
          * @description
          * Create comment for Beneficiary
          *
          */
        _self.saveUserNote = function(userNoteObj, successCallback) {
            var userNote =  UsernoteDataService.saveUserNote(userNoteObj);
            userNote.then(function (response) {
              successCallback(response.data);
            }, function(){
              ToasterService.toastError("Something went wrong","Error");
            });
        };

        /**
          * @ngdoc function
          * @name getUserNotes
          * @param {string} partyId
          * @param successCallback
          * @description
          * Get list of user notes by id
          *
          */
        _self.getUserNotes = function(partyId, queryParam, successCallback){
          var usernotes =  UsernoteDataService.getUserNotes(partyId, queryParam);
          usernotes.then(function (response) {
            successCallback(response.data);
          }, function(){
            ToasterService.toastError("Something went wrong","Error");
          });
        };

        return _self;

    }

})();
