(function() {
  "use strict";

  angular
    .module("immiApp.PcAdministration")
    .service("FormTemplateGridConfig", FormTemplateGridConfig);

  /**
   * @ngdoc Injector
   * @name FormTemplateGridConfig
   * @private
   * @module immiApp.PcAdministration
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  FormTemplateGridConfig.$inject = [
    "GridDynamics",
    "GridConstants"
  ];

  /**
   * @ngdoc Service
   * @name FormTemplateGridConfig
   * @module immiApp.PcAdministration
   * @requires
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  function FormTemplateGridConfig(GridDynamics, GridConstants) {
    var gridConfig = {
        searching: true,
        bPaginate: false,
        scrollY: -385,
        scrollX: "100%",
        autoWidth: true,
        zeroRecords: "Match Not Found",
        bLengthChange: false,
        language: {
          sEmptyTable: "No form templates found",
          sInfo: "Showing ​_START_ to _END_ of _TOTAL_ Form Templates",
          sInfoEmpty: "Showing ​0 to 0 of 0 Form Templates"
        }
      };

    gridConfig.aoColumns = [{
      "bSortable": true,
      "sWidth": "100px",
      "sTitle": "Form name",
      "data": "name",
      "render": function(elm){
        return "<a href=\"#/formtemplate/view/"+elm+"\">"+elm+"</a>";
      }
    }, {
      "bSortable": true,
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
      return "Showing {{start}} to {{end}} of {{totalItems}} Form Templates";
    };

    GridDynamics.pushGridConfig(GridConstants.FORM_TEMPLATE_LIST, gridConfig);


  }
})();
