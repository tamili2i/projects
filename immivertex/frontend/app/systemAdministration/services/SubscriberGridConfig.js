(function() {
  "use strict";

  angular
    .module("immiApp.SystemAdministration")
    .service("SubscriberGridConfig", SubscriberGridConfig);

  /**
   * @ngdoc Injector
   * @name SubscriberGridConfig
   * @private
   * @module immiApp.SystemAdministration
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  SubscriberGridConfig.$inject = [
    "GridDynamics",
    "GridConstants",
    "$rootScope",
    "$compile"
  ];

  /**
   * @ngdoc Service
   * @name SubscriberGridConfig
   * @module immiApp.SystemAdministration
   * @requires
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  function SubscriberGridConfig(GridDynamics, GridConstants,$rootScope, $compile) {

    var _self = this,
      context = {},



    gridConfig = {
        searching: true,
        bPaginate: false,
        scrollY: -385,
        scrollX: "100%",
        autoWidth: true,
        zeroRecords: "Match Not Found",
        bLengthChange: false,
        language: {
          sEmptyTable: "No subscribers found",
          sInfo: "Showing ​_START_ to _END_ of _TOTAL_ Subscribers",
          sInfoEmpty: "Showing ​0 to 0 of 0 Subscribers"
        },
        "rowCallback": function(row, data, index) {
          row = $(row);
          var html = "<input ng-model=\"check["+data.id+"]\" ng-checked=\"arr.indexOf("+data.id+")>-1\" icheck ng-change=\"selectEntity("+data.id+")\" type=\"checkbox\">";
          var link ="<a href=\"#/subscribers/profile/"+data.id+"\">"+data.id+"</a>";
          row.find(".sub-checkbox").html(html);
          row.find(".sub-id").html(link);
          $compile(row)(context);
        },
        "headerCallback": function(thead, data) {
          thead = $(thead);
          var html = "<input ng-model=\"headerCheck\" ng-change=\"selectAllEntity(headerCheck)\" icheck type=\"checkbox\" >";
          thead.find(".sub-checkbox").html(html);
          $compile(thead)(context);
        }
      };

    gridConfig.aoColumns = [{
      'searchable':false,
      'orderable':false,
      "sTitle": "<div class='sub-checkbox'></div>",
      "render": function() {
        return "<div class='sub-checkbox'></div>";
      }
    },{
      "bSortable": true,
      "sWidth": "100px",
      "sTitle": "Party Id",
      "render": function(data){
        return "<div class='sub-id'></div>";
      }
    }, {
      "bSortable": true,
      "sTitle": "Legal Name of Subscriber",
      "data": "partydetail",
      "render": function(partydetail) {
        if(partydetail) {
          return  partydetail.legal_name_of_entity;
        } else {
          return "";
        }
      }
    }, {
      "bSortable": true,
      "sTitle": "Subdomain",
      "data": "partydetail",
      "render": function(partydetail) {
        if(partydetail) {
          return  partydetail.subdomain;
        } else {
          return "";
        }
      }
    },{
      "bSortable": true,
      "sTitle": "Type",
      "data": "typedet",
      "render": function(typedet) {
        if(typedet) {
          return typedet.name
        } else {
          return "";
        }
      }
    },{
        "bSortable": false,
        "sTitle": "Alerts",
        "data": "id",
        "render": function(elm){
          return "<a href=\"#/alerts/"+elm+"\"><i class=\"fa fa-envelope\"></i></a>";
        }
    }];

    /**
     * @ngdoc function
     * @name fnInitComplete
     * @param table
     * @description
     * Will be calledback by datatable
     * after its render completion
     */
    gridConfig.fnInitComplete = function(table) {
      var tableWrapper = $(table.nTableWrapper);
      tableWrapper.find("input[type=\"search\"]").closest(".row").remove();
      tableWrapper.find(".dataTables_scrollHeadInner").css({
        "width": "100%"
      }).find("table").css({
        "width": "100%"
      });
      tableWrapper.find(".dataTables_scrollBody").find("table").css({
        "width": "100%"
      });
    };

    GridDynamics.pushGridConfig(GridConstants.SUBSCRIBER_LIST, gridConfig);
    /**
     * @ngdoc function
     * @name sInfoTemplate
     * @description
     * Template used to show info about
     * beneficiary list count and current
     * traversal in pagination
     *
     */
    gridConfig.sInfoTemplate = function(){
      return "Showing {{start}} to {{end}} of {{totalItems}} Subscribers";
    };

    _self.setControllerContext = function(srcContext){
      context = srcContext;
    }

  }
})();
