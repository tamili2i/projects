(function() {
    "use strict";

    angular
        .module("immiApp.components")
        .service("AutoCompleteUtils", AutoCompleteUtils);

    /**
     * @ngdoc Injector
     * @name AutoCompleteUtils
     * @private
     * @module immiApp.components
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    AutoCompleteUtils.$inject = ["$timeout"];

    /**
     * @ngdoc Service
     * @name AutoCompleteUtils
     * @module immiApp.components
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function AutoCompleteUtils($timeout) {
        var _self = this;

        var scrolled = 0;
        _self.open = true;

      /**
       * @ngdoc function
       * @name showDropdown
       * @description
       * Shows suggestion list
       *
       */
      _self.showDropdown = function(attr, el) {
        scrolled = 0;
        attr.$set("style", "display:block");
        $("#"+attr.id).width(el.prev().width()+10);
        $timeout(function () {
          addSelectedClass($("#"+attr.id+" li:first"));
        }, 10);
        $("#"+ attr.id).animate({
            scrollTop:  scrolled
        },0);
      };

      /**
       * @ngdoc function
       * @name hideDropdown
       * @description
       * Hides suggestion list
       *
       */
      _self.hideDropdown = function(attr) {
        attr.$set("style", "display:none");
        _self.open = true;
        removeSelectedClass($("#"+attr.id+" .selected"));
      };

      /**
       * @ngdoc function
       * @name addSelectedClass
       * @param {string} selector
       * @description
       * Adds selected class to element
       *
       */
      function addSelectedClass(selector) {
        $(selector).addClass("selected");
      };

      /**
       * @ngdoc function
       * @name removeSelectedClass
       * @param {string} selector
       * @description
       * Removes selected class from element
       *
       */
       function removeSelectedClass(selector) {
        selector.removeClass("selected");
      };

      /**
       * @ngdoc function
       * @name handleSelection
       * @param {object} event
       * @description
       * Handles keyboard functions in suggestion list
       *
       */
      _self.handleSelection = function(event, attr){
        if($("#"+attr.id+" li").hasClass("selected")){

          var selected = $("#"+attr.id+" .selected");
          if(event.keyCode == 40){//downarrow key
            removeSelectedClass(selected);
            if(selected.next("li").length == 0){
              addSelectedClass("#"+attr.id+" li:first");
            } else {
              addSelectedClass(selected.next("li"));
            }
            scrollDown(attr);

          } else if(event.keyCode == 38){//uparrow key
            removeSelectedClass(selected);
            if(selected.prev("li").length == 0){
              addSelectedClass("#"+attr.id+" li:last");
            } else {
              addSelectedClass(selected.prev("li"));
            }
            scrollUp(attr);
          }
        } else {
          addSelectedClass("#"+attr.id+" li:first");
        }
        handlehotKeys(event, $("#"+attr.id+" .selected"),attr);
      };

      /**
       * @ngdoc function
       * @name handlehotKeys
       * @param {object} event
       * @param {string} selected
       * @description
       * Handles keyboard for enter, backspace, escape and delete
       *
       */
      function handlehotKeys(event, selected, attr) {
        if(event.keyCode == 13) {//enter key
          selected.click();
          event.preventDefault();
          _self.hideDropdown(attr);
        } else if(event.keyCode == 27 || event.keyCode == 9) {//Escape
          _self.hideDropdown(attr);
        } else if(event.keyCode == 8) {
          removeSelectedClass($("#" + attr.id +" li"));
        }
      };
      /**
       * @ngdoc function
       * @name scrollUp
       * @description
       * Scrolls upward on pressing uparrow
       *
       */
      function scrollUp(attr) {
        scrolled = scrolled - 31;
        if(scrolled < 0) {
          scrolled = ($("#"+attr.id).children("li").size()-1)*31;
        }
        $("#"+ attr.id).animate({
            scrollTop:  scrolled
        },0);
      };

      /**
       * @ngdoc function
       * @name scrollDown
       * @description
       * Scrolls downward on pressing downarrow
       *
       */
      function scrollDown(attr) {
        scrolled = scrolled + 31;
        if(scrolled >= (($("#"+attr.id).children("li").size())*31)) {
          scrolled = 0;
        }
        $("#"+ attr.id).animate({
            scrollTop:  scrolled
        },0);
      }
    }
})();
