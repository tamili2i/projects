(function() {
    "use strict";

    angular
        .module("immiApp.usernote")
        .controller("UsernoteController", UsernoteController);

    /**
     * @ngdoc Injector
     * @name UsernoteController
     * @private
     * @module immiApp.usernote
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    UsernoteController.$inject = [
      "$scope",
      "UsernoteService",
      "$stateParams",
      "Session",
      "Utils"
    ];

    /**
     * @ngdoc UsernoteController
     * @name UsernoteController
     * @module immiApp.usernote
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function UsernoteController($scope, UsernoteService, $stateParams, Session, Utils) {
        var vm = this;
        vm.userNotes = {label : ""};
        vm.partyId = "";
        vm.user_note_list = [];
        var count = 1, weekday = ["Sun", "Mon", "Tue", "Wed",  "Thu", "Fri", "Sat"];
        vm.userName = Session.getName();
        vm.containerMaxHeight = Utils.getHeight() - $(".page-heading").height() - $("header").height() - $("footer").height();
        vm.access_type = Session.getAccessType();
        
        if($stateParams.id){
          vm.partyId = $stateParams.id;
        }else {
          vm.partyId = $scope.noteId;
        }

         /**
          * @ngdoc function
          * @name showButtons
          * @description
          * show create and cancel button while focus the textarea
          *
          */
        vm.showButtons = function(){
          if(vm.user_note_list.length > 0){
            $(".user_note_buttons").removeClass("hide");
          }
        };

        /**
         * @ngdoc function
         * @name showButtons
         * @description
         * cancel the user note creation and clear the value
         *
         */
        vm.cancel = function(){
          vm.userNotes.label = "";
          if(vm.user_note_list.length > 0){
            $(".user_note_buttons").addClass("hide");
          }
        };

        /**
         * @ngdoc function
         * @name showUserNote
         * @description
         * show create usernote if user note list is empty
         *
         */
        var showUserNote = function(){
          if(vm.user_note_list.length === 0){
            $(".popover_list_container").show();
            $(".popover_container").hide();
          }
        };

        /**
         * @ngdoc function
         * @name addComment
         * @description
         * add user note with id and current date and time
         *
         */
        vm.addComment = function(){
          showUserNote();
          vm.userNoteObj = {
            "party_id" : vm.partyId,
            "note" : vm.userNotes.label,
            "created_by" : Session.getCreatedBy()
          };
          UsernoteService.saveUserNote(vm.userNoteObj, function successCallback(response) {
            vm.userNotes.label = "";
            response.created_at = new Date(response.created_at);
            vm.user_note_list.unshift(response);
          });
        };

        /**
         * @ngdoc function
         * @name getUserNotes
         * @param {Number} count
         * @description
         * get list of User Notes
         *
         */
        vm.getUserNotes = function(count){
          var queryParam = vm.constructQueryParam(count);
          UsernoteService.getUserNotes(vm.partyId, queryParam, function successCallback(response) {
            vm.total_record = response.total;
            _.each(response.data, function(userNote){
               userNote.created_at = new Date(userNote.created_at);
               vm.user_note_list.push(userNote);
            });
          });
        };

        /**
         * @ngdoc function
         * @name hideUserNote
         * @description
         * hide usernote on html body click
         *
         */
        var hideUserNote = function(){
          $("html").on("click", function(e) {
            if (typeof $(e.target).data("original-title") == "undefined" &&
               !$(e.target).parents().is(".popover.in")) {
              $("[data-original-title]").popover("hide");
              $("#userNoteTextarea").val("");
            }
          });
        };

		/**
         * @ngdoc function
         * @name closeUserNote
         * @description
         * close usernote on close icon click
         *
         */
        vm.closeUserNote = function(){
          $("[data-original-title]").popover("hide");
          $("#userNoteTextarea").val("");
        };

        /**
         * @ngdoc function
         * @name constructQueryParam
		     * @param {Number} page
         * @description
         * construct query param with page number
         *
         */
        vm.constructQueryParam = function(page) {
          var queryParam = {};
          queryParam.page = page;
          return queryParam;
        };

        vm.showMoreUserNotes = function(){
          if(vm.total_record === vm.user_note_list.length){
            $(".show-more-link").hide();
          }else {
            vm.getUserNotes(++count);
          }
        };

        /**
         * @ngdoc function
         * @name init
         * @description
         * Initiates Beneficiary form
         *
         */
        var init = function(){
          vm.getUserNotes(count);
          hideUserNote();
        };

        init();

    }
})();
