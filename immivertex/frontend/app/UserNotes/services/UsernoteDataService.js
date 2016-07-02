(function() {
    "use strict";
    /*jslint nomen: true*/
    /*global angular, $, _*/

    /**
     * @ngdoc Service
     * @name UsernoteDataService
     * @module immiApp.usernote
     * @requires
     * @description
     * This service has functionality to interface with backend to send and fetch data.
     * @author Ideas2IT Technologies
     * @copyright
     */
    angular.module("immiApp.usernote")
        .service("UsernoteDataService", UsernoteDataService);

    /**
     * @ngdoc Injector
     * @name UsernoteDataService
     * @private
     * @module immiApp.usernote
     * @description
     * Inject module that needs to be useful for grid service
     * @author Ideas2IT Technologies
     * @copyright
     */
    UsernoteDataService.$inject = ["$q", "$timeout", "HTTPFactory"];

    function UsernoteDataService($q, $timeout, HTTPFactory) {
      var _self = this;
        /**
          * @ngdoc function
          * @name saveUserNote
          * @param  {object} userNoteObj
          * @description
          * Create user note
          *
          */
        _self.saveUserNote = function(userNoteObj) {
          return HTTPFactory.call({
            url: "/user/user-notes",
            method: "POST",
            data: userNoteObj
          });
        };

        /**
          * @ngdoc function
          * @name getUserNotes
          * @param {string} partyId
          * @description
          * Get list of user notes by id
          *
          */
        _self.getUserNotes = function(partyId, queryParam) {
          return HTTPFactory.call({
             url: "/user/user-notes/" + partyId,
             method: "GET",
             params: queryParam
          });
        };

        return _self;
    }

})();
