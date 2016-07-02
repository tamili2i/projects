(function() {
  "use strict";

  angular
    .module("immiApp.workflow")
    .service("WorkflowGridConfig", WorkflowGridConfig);

  /**
   * @ngdoc Injector
   * @name WorkflowGridConfig
   * @private
   * @module immiApp.workflow
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  WorkflowGridConfig.$inject = [
    "GridDynamics",
    "GridConstants",
    "Session",
    "$compile"
  ];

  /**
   * @ngdoc Service
   * @name WorkflowGridConfig
   * @module immiApp.workflow
   * @requires
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  function WorkflowGridConfig(GridDynamics, GridConstants, Session, $compile) {
    var gridConfig = {
        searching: true,
        "order": [[ 0, "desc" ]],
        bPaginate: false,
        scrollY: -385,
        scrollX: "100%",
        autoWidth: true,
        zeroRecords: "Match Not Found",
        bLengthChange: false,
        language: {
          sEmptyTable: "No workflows found",
          sInfo: "Showing ​_START_ to _END_ of _TOTAL_ workflows",
          sInfoEmpty: "Showing ​0 to 0 of 0 Workflows"
        }
      };

    gridConfig.aoColumns = [{
      "bSortable": true,
      "sWidth": "100px",
      "sTitle": "Id",
      "data": "id",
      "render": function(elm){
        var workflowUrl = "";
        if(Session.getPartyType() == "system_administrator"){
           workflowUrl = "<a href=\"#/workflows/"+elm+"\">"+elm+"</a>";
        }else {
          var WorkflowMenu = _.filter(Session.getSideMenu(),function(data){
            return data.label == "Work Flow";
          });
          if(WorkflowMenu[0].children){
            for(var i=0;i<WorkflowMenu[0].children.length ;i++){
              if(WorkflowMenu[0].children[i].isModuleEdit !== undefined){
                Session.setAccessType(WorkflowMenu[0].children[i].isModuleEdit);
                workflowUrl = WorkflowMenu[0].children[i].isModuleEdit ? "<a href=\"#/workflows/view/"+elm+"\">"+elm+"</a>" : "<a href=\"#/workflows/view/"+elm+"\">"+elm+"</a>";
              }else {
                workflowUrl = "<a href=\"#/workflows/view/"+elm+"\">"+elm+"</a>";
              }
            }
          }
        }
        return "<a href=\"#/workflows/view/"+elm+"\">"+elm+"</a>";
      }
    }, {
      "bSortable": true,
      "sTitle": "Name",
      "data": "workflow_name"
    }, {
      "bSortable": true,
      "sTitle": "Description",
      "data": "description"
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
      return "Showing {{start}} to {{end}} of {{totalItems}} Workflows";
    };

    GridDynamics.pushGridConfig(GridConstants.WORKFLOW_LIST, gridConfig);

  }
})();
