(function() {
  "use strict";

  angular
    .module("immiApp.report")
    .service("BeneficiaryReportGridConfig", BeneficiaryReportGridConfig);

  /**
   * @ngdoc Injector
   * @name BeneficiaryReportGridConfig
   * @private
   * @module immiApp.report
   * @description
   * //GridConstants, GridDyanics For grid
   * MasterDataService for getting Country Name
   * @author Connvertex Technologies
   * @copyright
   */
  BeneficiaryReportGridConfig.$inject = [
    "GridDynamics",
    "GridConstants",
    "MasterDataService",
    "Session"
  ];

  /**
   * @ngdoc Service
   * @name BeneficiaryReportGridConfig
   * @module immiApp.report
   * @requires
   * @description
   * //Grid Config for grid columns and data
   * @author Connvertex Technologies
   * @copyright
   */
  function BeneficiaryReportGridConfig(GridDynamics, GridConstants, MasterDataService, Session) {
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
          sEmptyTable: "No Beneficiary found",
          sInfo: "Showing ​_START_ to _END_ of _TOTAL_ Beneficiary",
          sInfoEmpty: "Showing ​0 to 0 of 0 Beneficiary"
        }
      };

    gridConfig.aoColumns = [{
      "sWidth": "100px",
      "sTitle": "ID",
      "data": "party_id",
    }, {
      "bSortable": true,
      "sTitle": "Last Name",
      "data" : "last_name",
    },{
      "bSortable": true,
      "sTitle": "First Name",
      "data" : "first_name",
    }, {
      "bSortable": true,
      "sTitle": "Date of birth",
      "data": "date_of_birth"
    },{
      "bSortable": true,
      "sTitle": "Email",
      "data": "email.email"
    },{
      "bSortable": true,
      "sTitle": "Passport",
      "data": "passport.number"
      
    }, {
      "bSortable": true,
      "sTitle": "Address",
      "data": "address",
      "render": function(address){
        if(address.length){
          if(address.street){
            return address.street;
          }else{
             return "-NA-";
          }
          
        }else{
          return "-NA-";
        }
      }
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
     * Beneficiary list count and current
     * traversal in pagination
     *
     */
    gridConfig.sInfoTemplate = function(){
      return "Showing {{start}} to {{end}} of {{totalItems}} Party(s)";
    };

    GridDynamics.pushGridConfig(GridConstants.BENEFICIARY_REPORT_LIST, gridConfig);


  }
})();
