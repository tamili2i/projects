(function() {
  "use strict";

  angular
    .module("immiApp.party")
    .service("PartyGridConfig", PartyGridConfig);

  /**
   * @ngdoc Injector
   * @name PartyGridConfig
   * @private
   * @module immiApp.party
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  PartyGridConfig.$inject = [
    "GridDynamics",
    "GridConstants",
    "Session"
  ];

  /**
   * @ngdoc Service
   * @name PartyGridConfig
   * @module immiApp.party
   * @requires
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  function PartyGridConfig(GridDynamics, GridConstants, Session) {
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
          sEmptyTable: "No Party found",
          sInfo: "Showing ​_START_ to _END_ of _TOTAL_ Parties",
          sInfoEmpty: "Showing ​0 to 0 of 0 Parties"
        }
      };

    gridConfig.aoColumns = [{
      "bSortable": true,
      "sWidth": "100px",
      "sTitle": "ID",
      "data": "id",
      "render": function(elm){
        var partyUrl = "";
        if(Session.getPartyType() == "system_administrator"){
           partyUrl = "<a href=\"#/party/"+elm+"\">"+elm+"</a>";
        }else {
          var partyMenu = _.filter(Session.getSideMenu(),function(data){
            return data.label == "Party";
          });
          if(partyMenu[0].children){
            for(var i=0;i<partyMenu[0].children.length ;i++){
              if(partyMenu[0].children[i].isModuleEdit !== undefined){
                Session.setAccessType(partyMenu[0].children[i].isModuleEdit);
                partyUrl = partyMenu[0].children[i].isModuleEdit ? "<a href=\"#/party/"+elm+"\">"+elm+"</a>" : "<a href=\"#/party/view/"+elm+"\">"+elm+"</a>";
              }else {
                partyUrl = "<a href=\"#/party/"+elm+"\">"+elm+"</a>";
              }

            }
          }
        }
        return partyUrl;
      }
    },{
      "bSortable": true,
      "sTitle": "First name",
      "data": "person.first_name"
    }, {
      "bSortable": true,
      "sTitle": "Last name",
      "data": "person.last_name"
    },{
      "bSortable": true,
      "sTitle": "Email",
      "data": "email.email"
    },{
      "bSortable": true,
      "sTitle": "Position",
      "data": "roles.name"
    },{
      "bSortable": true,
      "sTitle": "Created By",
      "data": "createdbydet",
      "render": function(createdbydet) {
        if(createdbydet) {
          return createdbydet.first_name +" "+ createdbydet.last_name;
        } else {
          return "";
        }
      }
    },{
      "bSortable": true,
      "sTitle": "Update By",
      "data": "updatedbydet",
      "render": function(updatedbydet) {
        if(updatedbydet) {
          return updatedbydet.first_name+" "+ updatedbydet.last_name;
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
      return "Showing {{start}} to {{end}} of {{totalItems}} parties";
    };

    GridDynamics.pushGridConfig(GridConstants.PARTY_LIST, gridConfig);


  }
})();
