(function() {
  "use strict";

  angular
    .module("immiApp.lawfirm")
    .service("LawfirmGridConfig", LawfirmGridConfig);

  /**
   * @ngdoc Injector
   * @name LawfirmGridConfig
   * @private
   * @module immiApp.lawfirm
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  LawfirmGridConfig.$inject = [
    "GridDynamics",
    "GridConstants",
    "Session"
  ];

  /**
   * @ngdoc Service
   * @name LawfirmGridConfig
   * @module immiApp.lawfirm
   * @requires
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  function LawfirmGridConfig(GridDynamics, GridConstants, Session) {
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
          sEmptyTable: "No Law firm found",
          sInfo: "Showing ​_START_ to _END_ of _TOTAL_ Law firms",
          sInfoEmpty: "Showing ​0 to 0 of 0 Law firms"
        }
      };

    gridConfig.aoColumns = [{
      "sWidth": "100px",
      "sTitle": "ID",
      "data": "party_id",
      "render": function(elm){
        var lawfirmUrl = "";
        if(Session.getPartyType() == "system_administrator"){
           lawfirmUrl = "<a href=\"#/lawfirms/"+elm+"\">"+elm+"</a>";
        }else {
          var lawfirmMenu = _.filter(Session.getSideMenu(),function(data){
            return data.label == "Lawfirm";
          });
          if(lawfirmMenu[0].children){
            for(var i=0;i<lawfirmMenu[0].children.length ;i++){
              if(lawfirmMenu[0].children[i].isModuleEdit !== undefined){
                Session.setAccessType(lawfirmMenu[0].children[i].isModuleEdit);
                lawfirmUrl = lawfirmMenu[0].children[i].isModuleEdit ? "<a href=\"#/lawfirms/"+elm+"\">"+elm+"</a>" : "<a href=\"#/lawfirms/view/"+elm+"\">"+elm+"</a>";
              }else {
                lawfirmUrl = "<a href=\"#/lawfirms/"+elm+"\">"+elm+"</a>";
              }
            }
          }
        }
        return lawfirmUrl;
      }
    }, {
      "bSortable": true,
      "sTitle": "Attorney name",
      "data": "attorney",
      "render": function(attorney) {
        if(attorney.person) {
          return attorney.person.first_name+" "+attorney.person.last_name;
        } else {
          return "";
        }
      }
    }, {
      "bSortable": true,
      "sTitle": "Lawfirm name",
      "data": "name"
    },{
      "bSortable": true,
      "sTitle": "Bar/Id Number",
      "data": "federal_employer_id"
    },{
      "bSortable": true,
      "sTitle": "Created By",
      "data": "update_per",
      "render": function(update_per) {
        if(update_per) {
          return update_per.first_name + " "+ update_per.last_name;
        } else {
          return "";
        }
      }
    }, {
      "bSortable": true,
      "sTitle": "Updated By",
      "data": "updated_by",
      "data": "update_per",
      "render": function(update_per) {
        if(update_per) {
          return update_per.first_name + " "+ update_per.last_name;
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
     * lawfirm list count and current
     * traversal in pagination
     *
     */
    gridConfig.sInfoTemplate = function(){
      return "Showing {{start}} to {{end}} of {{totalItems}} Lawfirm(s)";
    };

    GridDynamics.pushGridConfig(GridConstants.LAWFIRM_LIST, gridConfig);


  }
})();
