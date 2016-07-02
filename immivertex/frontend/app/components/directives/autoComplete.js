(function() {
  "use strict";

  angular
    .module("immiApp.components")
    .directive("autoComplete", autoComplete);

  /**
   * @ngdoc Directive
   * @name autoComplete
   * @module immiApp.components
   * @restrict A
   * @description
   *
   * @author Ideas2IT Technologies
   * @copyright
   */
  function autoComplete(AutoCompleteUtils) {
    var autoComplete = {
      restrict: "A",
      scope:{
        "items": "=",
        "itemCallback" : "=",
        "itemsId" : "@",
        "watchFor": "="
      },
      template:"<li ng-click='setValue(item)' ng-repeat='item in items'>{{item.name}}</li><div ng-show='items.length === 0'>No Matches Found</div>",
      link: linkFunc
    };

    return autoComplete;

    function linkFunc(scope, el, attr) {
      $(el.prev()).on("click",function(event) {
        if($(el.prev()).val()){
          AutoCompleteUtils.showDropdown(attr, el);
        }
      });
      //handles keyboard functions
      $(el.prev()).on("keydown", function(event){
        AutoCompleteUtils.handleSelection(event, attr);
      });

      $(document).click(function(event){
        if(event.target == el.prev()[0]){
          return;
        }
        AutoCompleteUtils.hideDropdown(attr);
      });

      $(window).resize(function(){
        if($("#"+attr.id).css("display") == "block"){
          $("#"+attr.id).width(el.prev().width()+10);
        }
      });

      /**
       * @ngdoc function
       * @name setValue
       * @param {object} item
       * @description
       * Sets value to input field on choosing item
       *
       */
      scope.setValue = function(item){console.log("autoComplete::",item);
        scope.itemCallback(item,scope.itemsId);
        scope.watchFor = item.name;
        AutoCompleteUtils.open = false;
      };

      scope.$watch("watchFor",function(oldValue, newValue){
        if(oldValue && AutoCompleteUtils.open){
          AutoCompleteUtils.showDropdown(attr, el);
        } else {
          AutoCompleteUtils.hideDropdown(attr);
        }
      });

    }
  }

  /**
   * @ngdoc Injector
   * @name autoComplete
   * @module immiApp.components
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  autoComplete.$inject = ["AutoCompleteUtils"];

})();
