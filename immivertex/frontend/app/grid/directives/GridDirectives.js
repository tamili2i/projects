(function() {
  "use strict";

  angular
    .module("immiApp.grid")
    .directive("datatableGrid", datatableGrid);

  /**
   * @ngdoc Directive
   * @name datatableGrid
   * @module immiApp.grid
   * @require $parse, GridService
   * @restrict A
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  function datatableGrid($parse, GridService) {
    var datatableGrid = {
      restrict: "A",
      link: linkFunc
    };

    return datatableGrid;

    function linkFunc(scope, el, attr, ctrl) {
      GridService.setGridElement($parse(attr.tableId)(scope), el);
    }
  }

  /**
   * @ngdoc Injector
   * @name datatableGrid
   * @module immiApp.grid
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  datatableGrid.$inject = ["$parse", "GridService"];
})();





(function() {
  "use strict";

  angular
    .module("immiApp.grid")
    .directive("searchFor", directive);

  directive.$inject = [
    "$parse",
    "GridService"
  ];

  /* @ngInject */
  function directive($parse, GridService) {
    var directive = {
      restrict: "A",
      link: linkFunc
    };

    return directive;

    function linkFunc(scope, el, attr, ctrl) {

      var integrateSearchForGrid = function(){

        var table = GridService.getGridProperties($parse(attr.tableId)(scope));
        el.keyup(function() {
          if (table) {
            table.dataTable.fnFilter($(this).val());
          } else {
            table = GridService.getGridProperties(attr.searchFor);
            table.dataTable.fnFilter($(this).val());
          }
        });
      };

      GridService.registerSearchForCallback($parse(attr.tableId)(scope), integrateSearchForGrid);
    }
  }
})();
