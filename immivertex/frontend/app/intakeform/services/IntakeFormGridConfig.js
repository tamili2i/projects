(function() {
  "use strict";

  angular
    .module("immiApp.intakeform")
    .service("IntakeFormGridConfig", IntakeFormGridConfig);

  /**
   * @ngdoc Injector
   * @name IntakeFormGridConfig
   * @private
   * @module immiApp.beneficiary
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  IntakeFormGridConfig.$inject = [
    "GridDynamics",
    "GridConstants"
  ];

  /**
   * @ngdoc Service
   * @name IntakeFormGridConfig
   * @module immiApp.beneficiary
   * @requires
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  function IntakeFormGridConfig(GridDynamics, GridConstants) {
    var gridConfig = {
        searching: true,
        bPaginate: false,
        scrollY: -385,
        scrollX: "100%",
        autoWidth: true,
        zeroRecords: "Match Not Found",
        bLengthChange: false,
        language: {
          sEmptyTable: "No Beneficiaries found",
          sInfo: "Showing ​_START_ to _END_ of _TOTAL_ Intake Forms",
          sInfoEmpty: "Showing ​0 to 0 of 0 Intake Forms"
        }
      };

    gridConfig.aoColumns = [{
      "bSortable": true,
      "sWidth": "100px",
      "sTitle": "ID",
      "data": "id",
      "render": function(elm){
        return "<a href=\"#/intakeform/"+elm+"\">"+elm+"</a>";
      }
    }, {
      "bSortable": true,
      "sTitle": "Form name",
      "data": "name"
    }, {
      "bSortable": true,
      "sTitle": "Description",
      "data": "description"
    }, {
      "bSortable": true,
      "sTitle": "Created By",
      "data": "created_by.person.first_name"
    }, {
      "bSortable": true,
      "sTitle": "Update By",
      "data": "updated_by.person.first_name"
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

    GridDynamics.pushGridConfig(GridConstants.INTAKE_FORM_LIST, gridConfig);


  }
})();
