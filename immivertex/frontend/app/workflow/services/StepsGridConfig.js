(function() {
  "use strict";

  angular
    .module("immiApp.workflow")
    .service("StepsGridConfig", StepsGridConfig);

  /**
   * @ngdoc Injector
   * @name StepsGridConfig
   * @private
   * @module immiApp.workflow
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  StepsGridConfig.$inject = [
    "GridDynamics",
    "GridConstants",
    "$compile",
    "Session"
  ];

  /**
   * @ngdoc Service
   * @name StepsGridConfig
   * @module immiApp.workflow
   * @requires
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  function StepsGridConfig(GridDynamics, GridConstants, $compile, Session) {
    var _self = this,
      context = {},
      gridConfig = {
        searching: true,
        "order": [[ 0, "desc" ]],
        bPaginate: false,
        scrollY: -385,
        scrollX: "100%",
        autoWidth: true,
        zeroRecords: "Match Not Found",
        bLengthChange: false,
        language: {
          sEmptyTable: "No steps found",
          sInfo: "Showing ​_START_ to _END_ of _TOTAL_ Steps",
          sInfoEmpty: "Showing ​0 to 0 of 0 Steps"
        },
        "rowCallback": function(row, data, index) {
          row = $(row);
          var html = "<i ng-click=\"delete("+data.id+")\" class=\"fa fa-trash-o\">";
          row.find(".delete-icon").html(html);
          $compile(row)(context);
        }
      };

    gridConfig.aoColumns = [{
      "bSortable": true,
      "sWidth": "100px",
      "sTitle": "Id",
      "data": "id",
      "render": function(elm){
        var stepUrl = "";
        if(Session.getPartyType() == "system_administrator"){
           stepUrl = "<a href=\"#/steps/view/"+elm+"\">"+elm+"</a>";
        }else {
          var WorkflowMenu = _.filter(Session.getSideMenu(),function(data){
            return data.label == "Work Flow";
          });
          if(WorkflowMenu[0].children){
            for(var i=0;i<WorkflowMenu[0].children.length ;i++){
              if(WorkflowMenu[0].children[i].isModuleEdit !== undefined){
                Session.setAccessType(WorkflowMenu[0].children[i].isModuleEdit);
                stepUrl = WorkflowMenu[0].children[i].isModuleEdit ? "<a href=\"#/steps/view/"+elm+"\">"+elm+"</a>" : "<a href=\"#/steps/view/"+elm+"\">"+elm+"</a>";
              }else {
                stepUrl = "<a href=\"#/steps/view/"+elm+"\">"+elm+"</a>";
              }
            }
          }
        }
        return stepUrl;
      }
    }, {
      "bSortable": true,
      "sTitle": "Name",
      "data": "workflow_step_name"
    }, {
      "bSortable": true,
      "sTitle": "Description",
      "data": "description"
    },{
      "bSortable": true,
      "sTitle": "Execution Order",
      "data":"execution_order"
    }, {
      "bSortable": true,
      "sTitle": "Created By",
      "data": "createddet",
      "render": function(createddet){
        if(createddet) {
          return createddet.first_name + " " + createddet.last_name;
        } else {
          return "";
        }
      }
    }, {
      "bSortable": true,
      "sTitle": "Update By",
      "data": "updateddet",
      "render": function(updateddet){
        if(updateddet) {
          return updateddet.first_name + " " + updateddet.last_name;
        } else {
          return "";
        }
      }
    }, {
      "bSortable": false,
      "sTitle": "Delete",
      "data": "id",
      "render": function(id) {
        if(id) {
          return "<a class=\"delete-icon\"></i></a>"
        }
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
      return "Showing {{start}} to {{end}} of {{totalItems}} Steps";
    };

    GridDynamics.pushGridConfig(GridConstants.STEP_LIST, gridConfig);

    _self.setControllerContext = function(srcContext){
      context = srcContext;
    }
  }
})();
