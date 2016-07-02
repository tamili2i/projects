(function() {
  "use strict";

  angular
    .module("immiApp.report")
    .service("PartyReportGridConfig", PartyReportGridConfig);

  /**
   * @ngdoc Injector
   * @name PartyReportGridConfig
   * @private
   * @module immiApp.report
   * @description
   * //GridConstants, GridDyanics For grid
   * MasterDataService for getting Country Name
   * @author Connvertex Technologies
   * @copyright
   */
  PartyReportGridConfig.$inject = [
    "GridDynamics",
    "GridConstants",
    "Session"
  ];

  /**
   * @ngdoc Service
   * @name PartyReportGridConfig
   * @module immiApp.report
   * @requires
   * @description
   * //Grid Config for grid columns and data
   * @author Connvertex Technologies
   * @copyright
   */
  function PartyReportGridConfig(GridDynamics, GridConstants, Session) {
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
          sEmptyTable: "No Parties found",
          sInfo: "Showing ​_START_ to _END_ of _TOTAL_ Party",
          sInfoEmpty: "Showing ​0 to 0 of 0 Party"
        }
      };

    gridConfig.aoColumns = [{
      "sWidth": "100px",
      "sTitle": "ID",
      "data": "party_id",
    }, {
      "bSortable": true,
      "sTitle": "Last Name",
      "data" : "person.last_name",
    },{
      "bSortable": true,
      "sTitle": "First Name",
      "data" : "person.first_name",
    },{
      "bSortable": true,
      "sTitle": "Email",
      "data": "email.email"
    },{
      "bSortable":true,
      "sTitle": "Designation",
      "data" : "person.designation"
    },{
      "bSortable": true,
      "sTitle": "Created At",
      "data": "created_at"
      
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
      return "Showing {{start}} to {{end}} of {{totalItems}} Party(s)";
    };

    GridDynamics.pushGridConfig(GridConstants.PARTY_REPORT_LIST, gridConfig);


  }
})();
