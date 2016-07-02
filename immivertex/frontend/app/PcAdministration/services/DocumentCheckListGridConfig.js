(function() {
  "use strict";

  angular
    .module("immiApp.PcAdministration")
    .service("DocumentCheckListGridConfig", DocumentCheckListGridConfig);

  /**
   * @ngdoc Injector
   * @name DocumentCheckListGridConfig
   * @private
   * @module immiApp.PcAdministration
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  DocumentCheckListGridConfig.$inject = [
    "GridDynamics",
    "GridConstants"
  ];

  /**
   * @ngdoc Service
   * @name DocumentCheckListGridConfig
   * @module immiApp.PcAdministration
   * @requires
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  function DocumentCheckListGridConfig(GridDynamics, GridConstants) {
    var gridConfig = {
        searching: true,
        bPaginate: false,
        scrollY: -385,
        scrollX: "100%",
        autoWidth: true,
        zeroRecords: "Match Not Found",
        bLengthChange: false,
        language: {
          sEmptyTable: "No Program Cases found",
          sInfo: "Showing ​_START_ to _END_ of _TOTAL_ Document Checklists",
          sInfoEmpty: "Showing ​0 to 0 of 0 Document Checklists"
        }
      };

    gridConfig.aoColumns = [{
      "bSortable": true,
      "sWidth": "100px",
      "sTitle": "Name",
      "data": "name",
      "render": function(elm){
        return "<a href=\"#/document-checklist/view/"+elm+"\">"+elm+"</a>";
      }
    }, {
      "bSortable": false,
      "sTitle": "Description",
      "data": "description"
    }, {
      "bSortable": true,
      "sTitle": "Created By",
      "data": "createdbydet",
      "render": function(createdbydet){
        if(createdbydet) {
          return createdbydet.first_name + " " + createdbydet.last_name;
        } else {
          return "";
        }
      }
    }, {
      "bSortable": true,
      "sTitle": "Update By",
      "data": "updatedbydet",
      "render": function(updatedbydet){
        if(updatedbydet) {
          return updatedbydet.first_name + " " + updatedbydet.last_name;
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
      return "Showing {{start}} to {{end}} of {{totalItems}} Document Checklists";
    };

    GridDynamics.pushGridConfig(GridConstants.DOCUMENT_CHECKLIST_LIST, gridConfig);


  }
})();
