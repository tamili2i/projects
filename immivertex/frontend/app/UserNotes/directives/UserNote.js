(function() {
  "use strict";

  angular
    .module("immiApp.usernote")
    .directive("userNote", userNote);

  /**
   * @ngdoc Injector
   * @name userNote
   * @module immiApp.usernote
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  userNote.$inject = ["$templateRequest", "$compile"];

  /**
   * @ngdoc Directive
   * @name userNote
   * @module immiApp.usernote
   * @require
   * @restrict
   * @description
   * Creates and display the Popover to create user note
   * @author Ideas2IT Technologies
   * @copyright
   */
  function userNote($templateRequest, $compile) {
    var userNote = {
      restrict: "A",
      scope: {
         noteId: "="
      },
      controller: "UsernoteController",
      controllerAs: "userNoteCtrl",
      //bindToController: true,
      link: linkFunc
    };

    return userNote;

    function linkFunc(scope, elem, attr, ctrl) {
      $templateRequest("app/UserNotes/views/user-note.html").then(function(html){
        var compileContent = $compile(html)(scope);
        var options = {
            content: compileContent,
            container: "body",
            viewport : "#wrapper",
            trigger : "click",
            html: true
        };
        $(elem).popover(options);
        $(elem).click(function(e) {
            $(".popover").each(function(){
              if($(elem).attr("aria-describedby") != $(this).attr("id")){
                $("#"+ $(this).attr("id")).remove();
              }
            });
        });
      });
    }
  }
})();
