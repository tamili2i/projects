(function() {
  "use strict";

  angular
    .module("immiApp.corporation")
    .service("CorporationGridConfig", CorporationGridConfig);

  /**
   * @ngdoc Injector
   * @name CorporationGridConfig
   * @private
   * @module immiApp.corporation
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  CorporationGridConfig.$inject = [
    "GridDynamics",
    "GridConstants",
	"Session"
  ];

  /**
   * @ngdoc Service
   * @name CorporationGridConfig
   * @module immiApp.corporation
   * @requires
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  function CorporationGridConfig(GridDynamics, GridConstants, Session) {
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
          sEmptyTable: "No Corporation found",
          sInfo: "Showing ​_START_ to _END_ of _TOTAL_ Corporations",
          sInfoEmpty: "Showing ​0 to 0 of 0 Corporations"
        }
      };

    gridConfig.aoColumns = [{
      "sWidth": "100px",
      "sTitle": "ID",
      "data": "party_id",
      "render": function(elm){
        var corporationUrl = "";
        if(Session.getPartyType() == "system_administrator"){
           corporationUrl = "<a href=\"#/corporations/"+elm+"\">"+elm+"</a>";
        }else {
          var corporationMenu = _.filter(Session.getSideMenu(),function(data){
            return data.label == "Corporation";
          });
          if(corporationMenu[0].children){
            for(var i=0;i<corporationMenu[0].children.length ;i++){
              if(corporationMenu[0].children[i].isModuleEdit !== undefined){
                Session.setAccessType(corporationMenu[0].children[i].isModuleEdit);
                corporationUrl = corporationMenu[0].children[i].isModuleEdit ? "<a href=\"#/corporations/"+elm+"\">"+elm+"</a>" : "<a href=\"#/corporations/view/"+elm+"\">"+elm+"</a>";
              }else {
                corporationUrl = "<a href=\"#/corporations/"+elm+"\">"+elm+"</a>";
              }
            }
          }
        }
        return corporationUrl;
      }
    }, {
      "bSortable": true,
      "sTitle": "Corporation name",
      "data": "name"
    }, {
      "bSortable": true,
      "sTitle": "Federal Employer Id Number",
      "data": "federal_employer_id"
    },{
      "bSortable": true,
      "sTitle": "Social Security Number",
      "data": "social_security_number"
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
     * corporation list count and current
     * traversal in pagination
     *
     */
    gridConfig.sInfoTemplate = function(){
      return "Showing {{start}} to {{end}} of {{totalItems}} Corporation(s)";
    };

    GridDynamics.pushGridConfig(GridConstants.CORPORATION_LIST, gridConfig);


  }
})();
