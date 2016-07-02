(function() {
  "use strict";

  angular
    .module("immiApp.report")
    .service("CaseReportGridConfig", CaseReportGridConfig);

  /**
   * @ngdoc Injector
   * @name CaseReportGridConfig
   * @private
   * @module immiApp.report
   * @description
   * //GridConstants, GridDyanics For grid
   * MasterDataService for getting Country Name
   * @author Connvertex Technologies
   * @copyright
   */
  CaseReportGridConfig.$inject = [
    "GridDynamics",
    "GridConstants",
    "MasterDataService",
    "Session"
  ];

  /**
   * @ngdoc Service
   * @name CaseReportGridConfig
   * @module immiApp.report
   * @requires
   * @description
   * //Grid Config for grid columns and data
   * @author Connvertex Technologies
   * @copyright
   */
  function CaseReportGridConfig(GridDynamics, GridConstants, MasterDataService, Session) {
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
          sEmptyTable: "No Cases found",
          sInfo: "Showing ​_START_ to _END_ of _TOTAL_ Cases",
          sInfoEmpty: "Showing ​0 to 0 of 0 Cases"
        }
      };

    gridConfig.aoColumns = [{
      "sWidth": "100px",
      "sTitle": "Case Number",
      "data": "id",
    }, {
      "bSortable": true,
      "sTitle": "Last Name",
      "data" : "partydet.last_name"
    },{
      "bSortable": true,
      "sTitle": "First Name",
      "data" : "partydet.first_name"
    },{
      "bSortable":true,
      "sTitle": "Date Created",
      "data" : "created_at"
    },{
      "bSortable": true,
      "sTitle": "Program Case Type",
      "data": "name"
      
    }
    ];

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
     * Party list count and current
     * traversal in pagination
     *
     */
    gridConfig.sInfoTemplate = function(){
      return "Showing {{start}} to {{end}} of {{totalItems}} Case(s)";
    };

    GridDynamics.pushGridConfig(GridConstants.CASE_REPORT_LIST, gridConfig);


  }
})();
