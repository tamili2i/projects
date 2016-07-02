(function() {
  "use strict";

  angular
    .module("immiApp.report")
    .service("PassportReportGridConfig", PassportReportGridConfig);

  /**
   * @ngdoc Injector
   * @name PassportReportGridConfig
   * @private
   * @module immiApp.report
   * @description
   * //GridConstants, GridDyanics For grid
   * MasterDataService for getting Country Name
   * @author Connvertex Technologies
   * @copyright
   */
  PassportReportGridConfig.$inject = [
    "GridDynamics",
    "GridConstants",
    "Session"
  ];

  /**
   * @ngdoc Service
   * @name PassportReportGridConfig
   * @module immiApp.report
   * @requires
   * @description
   * //Grid Config for grid columns and data
   * @author Connvertex Technologies
   * @copyright
   */
  function PassportReportGridConfig(GridDynamics, GridConstants, Session) {
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
          sEmptyTable: "No Passport Record found",
          sInfo: "Showing ​_START_ to _END_ of _TOTAL_ Passport",
          sInfoEmpty: "Showing ​0 to 0 of 0 Passport"
        }
      };

    gridConfig.aoColumns = [{
      "sWidth": "100px",
      "sTitle": "ID",
      "data": "party_id",
    }, {
      "bSortable": true,
      "sTitle": "Expiration Date",
      "data" : "expiry_date"
    }, {
      "bSortable": true,
      "sTitle": "Last Name",
      "data" : "person.last_name"
    },{
      "bSortable": true,
      "sTitle": "First Name",
      "data" : "person.first_name"
    },{
      "bSortable": true,
      "sTitle": "Email",
      "data": "email.email"
    },{
      "bSortable":true,
      "sTitle": "Passport Number",
      "data" : "number"
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
      return "Showing {{start}} to {{end}} of {{totalItems}} Passport(s)";
    };

    GridDynamics.pushGridConfig(GridConstants.PASSPORT_REPORT_LIST, gridConfig);


  }
})();
