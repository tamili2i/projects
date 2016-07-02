(function() {
  "use strict";

  angular
    .module("immiApp.system")
    .directive("dashboardbox", dashboardbox);

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

  dashboardbox.$inject = ["$timeout"];


  function dashboardbox($timeout) {
    return {
      restrict: "A",
      scope: {
         boxIds: "=",
         boxItems: "="
      },
      template:
      '<div class="dashboard-container dh-sort-component" id="order-{{boxOrderIds[$index].order_id}}" data-boxItems="{{boxOrderIds}}" ng-repeat="boxListItem in dashboardBoxes" dashboard-sort>'+
      '<div class="row">'+
        '<div class="info-tiles {{boxListItem.box_color}}">'+
          '<div class="tiles-heading">'+
            '<a href="{{boxListItem.create_url}}">'+
              '<span>'+
              '<i class="fa fa-plus plus-icon"></i>'+
            '</span>'+
              '<span class="text-center dashboard-title">{{boxListItem.name}}</span>'+
            '</a>'+
          '</div>'+
          '<div class="tiles-body">'+
            '<div class="text-center dashboard-body-count">{{boxListItem.count}}</div>'+
          '</div>'+
        '</div>'+
      '</div>'+
      '<div class="row">'+
      '<panel panel-class="panel-default no-padding" heading="{{boxListItem.list_title}}">'+
        '<div class="table-responsive">'+
          '<table class="table">'+
            '<tbody class="selects">'+
             '<tr ng-repeat="item in boxListItem.itemList | limitTo : 3">'+
                '<td class="col-xs-1">'+
                  '<i class="fa fa-circle list-icon {{boxListItem.list_color}}"></i>'+
                '</td>'+
                  '<td class="col-xs-7 list-content" ng-if="!item.first_name"><a class="list-title" title="{{item.name || item.person.first_name}}" href="{{boxListItem.edit_url}}/{{ boxListItem.name == \'Party\' ? item.id : item.party_id}}"> {{item.name || item.person.first_name  | limitTo : 30}} {{item.name.length || item.person.first_name.length > 30 ? "..." : " "}}</a></td>'+
                  '<td class="col-xs-7 list-content" ng-if="item.first_name"><a class="list-title" title="{{item.first_name}}" href="{{boxListItem.edit_url}}/{{item.party_id}}/"> {{item.first_name | limitTo : 30}} {{item.first_name.length > 30 ? "..." : " "}}</a></td>'+
              '</tr>'+
              '<tr ng-if="boxListItem.itemList.length === 0">'+
                '<td class="text-center list-content">{{boxListItem.not_found}}</td>'+
              '</tr>'+
            '</tbody>'+
          '</table>'+
          '<div class="text-center dashboard-list" ng-if="boxListItem.itemList.length > 3">'+
            '<a href="{{boxListItem.list_url}}">View More</a>'+
          '</div>'+
        '</div>'+
      '</panel></div></div>'+
      '<div class="panel-loading" ng-show="isLoading">'+
      '<div class="panel-loader-dots"></div>'+
      '</div>',
      link: {
        pre : function(scope, el, attr){
          scope.isLoading = true;
          $timeout(function () {
            scope.$watchGroup(['boxIds', 'boxItems'], function(value) {
                scope.isLoading = true;
                if(value[0].length > 0 && value[1].length > 0){
                    scope.isLoading = false;
                    scope.boxOrderIds = value[0];
                    scope.boxListItems = value[1];
                    scope.dashboardBoxes = [];
                    for(var i=0; i<scope.boxOrderIds.length; i++){
                      var boxInfo = _.filter(scope.boxListItems, function(item){
                        return item.name === scope.boxOrderIds[i].box_name;
                      });
                      scope.dashboardBoxes.push(boxInfo[0]);
                   }
                }
            });
        }, 2000);
        }
      }
    }
  }
})();

(function() {
  "use strict";

  angular
    .module("immiApp.system")
    .directive("dashboardSort", dashboardSort);

  /**
   * @ngdoc Injector
   * @name dashboardSort
   * @module immiApp.system
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  dashboardSort.$inject = ["DashboardService"];

  /**
   * @ngdoc Directive
   * @name dashboardSort
   * @module immiApp.components
   * @require
   * @restrict
   * @description
   * Creates sortable components inside the corporation
   * and lawfirm dashboards
   * @author Ideas2IT Technologies
   * @copyright
   */
  function dashboardSort(DashboardService) {
    var dashboardSort = {
      restrict: "A",
      link: {
        post: linkFunc
      }
    };

    return dashboardSort;

    function linkFunc(scope, el, attr, ctrl) {
      var handler = "<i class=\"fa fa-arrows dh-sort-handler\"></i>";
      el.each(function(index, component){
        $(component).prepend(handler);
      });

      el.parent('.dh-sort-container').sortable({
        delay: 100,
        distance: 10,
        handle: ".dh-sort-handler",
        items: ".dh-sort-component:not(.fixed)",
        stop: function(event, ui){
           scope.$apply(function () {
             var orderids = el.parent('.dh-sort-container').sortable('toArray', { attribute: 'id' });
             var boxItems = el.parent('.dh-sort-container').sortable('toArray', { attribute: 'data-boxItems' });
             DashboardService.syncOrder(orderids, JSON.parse(boxItems[0]));
           });
       }
      });
    }
  }

})();
