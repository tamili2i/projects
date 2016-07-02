(function() {
  "use strict";

  angular
    .module("immiApp.UserManagement")
    .service("UserRoleGridConfig", UserRoleGridConfig);

  /**
   * @ngdoc Injector
   * @name UserRoleGridConfig
   * @private
   * @module immiApp.UserManagement
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  UserRoleGridConfig.$inject = [
    "GridDynamics",
    "GridConstants"
  ];

  /**
   * @ngdoc Service
   * @name UserRoleGridConfig
   * @module immiApp.UserManagement
   * @requires
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  function UserRoleGridConfig(GridDynamics, GridConstants) {
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
          sEmptyTable: "No user role found",
          sInfo: "Showing ​_START_ to _END_ of _TOTAL_ User Roles",
          sInfoEmpty: "Showing ​0 to 0 of 0 User Roles"
        }
      };

    gridConfig.aoColumns = [{
      "bSortable": true,
      "sWidth": "100px",
      "sTitle": "ID",
      "data": "id"
    }, {
      "bSortable": true,
      "sTitle": "Name",
      "data": "name"
    }, {
      "bSortable": true,
      "sTitle": "Description",
      "data": "description",
      "render": function(description) {
        if(description) {
          return description;
        } else {
          return "";
        }
      }
    },{
      "bSortable": true,
      "sTitle": "Created By",
      "data": "created_by",
      "render": function(created_by) {
        return "Admin"
      }
    }, {
      "bSortable": true,
      "sTitle": "Update By",
      "data": "updated_by",
      "render": function(created_by) {
        return "Admin"
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
      return "Showing {{start}} to {{end}} of {{totalItems}} User Roles";
    };

    GridDynamics.pushGridConfig(GridConstants.USER_ROLE_LIST, gridConfig);


  }
})();
