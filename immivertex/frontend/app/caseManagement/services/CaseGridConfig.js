(function() {
  "use strict";

  angular
    .module("immiApp.caseManagement")
    .service("CaseGridConfig", CaseGridConfig);

  /**
   * @ngdoc Injector
   * @name CaseGridConfig
   * @private
   * @module immiApp.caseManagement
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  CaseGridConfig.$inject = [
    "GridDynamics",
    "GridConstants",
    "$compile",
    "$rootScope",
    "Session"
  ];

  /**
   * @ngdoc Service
   * @name CaseGridConfig
   * @module immiApp.caseManagement
   * @requires
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  function CaseGridConfig(GridDynamics, GridConstants, $compile, $rootScope, Session) {
    var context = $rootScope.$new(),
       gridConfig = {
          searching: false,
          "order": [[ 0, "desc" ]],
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
      "sTitle": "ID",
      "data": "id",
      "render": function(elm){
        var programCaseUrl = "";
        if(Session.getPartyType() == "system_administrator"){
           programCaseUrl = "<a href=\"#/cases/"+elm+"\">"+elm+"</a>";
        }else {
          var programCaseMenu = _.filter(Session.getSideMenu(),function(data){
            return data.label == "Case Management";
          });
          if(programCaseMenu[0].children){
            for(var i=0;i<programCaseMenu[0].children.length ;i++){
              if(programCaseMenu[0].children[i].isModuleEdit !== undefined){
                Session.setAccessType(programCaseMenu[0].children[i].isModuleEdit);
                programCaseUrl = programCaseMenu[0].children[i].isModuleEdit ? "<a href=\"#/cases/"+elm+"\">"+elm+"</a>" : "<a href=\"#/cases/view/"+elm+"\">"+elm+"</a>";
              }else {
                programCaseUrl = "<a href=\"#/cases/"+elm+"\">"+elm+"</a>";
              }

            }
          }
        }
        return programCaseUrl;
      }
    }, {
      "bSortable": true,
      "sTitle": "Beneficiary Name",
      "data": "beneficiary_name"
    }, {
      "bSortable": true,
      "sTitle": "Case Type",
      "data": "case_name"
    }, {
      "bSortable": true,
      "sTitle": "Premium",
      "data": "is_premium",
      "render": function(is_premium){
        if(is_premium){
          return "Yes";
        } else {
          return "No";
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
      return "Showing {{start}} to {{end}} of {{totalItems}} Cases";
    };

    GridDynamics.pushGridConfig(GridConstants.CASE_LIST, gridConfig);


  }
})();
