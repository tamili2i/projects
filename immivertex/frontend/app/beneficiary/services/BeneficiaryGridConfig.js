(function() {
  "use strict";

  angular
    .module("immiApp.beneficiary")
    .service("BeneficiaryGridConfig", BeneficiaryGridConfig);

  /**
   * @ngdoc Injector
   * @name BeneficiaryGridConfig
   * @private
   * @module immiApp.beneficiary
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  BeneficiaryGridConfig.$inject = [
    "GridDynamics",
    "GridConstants",
    "MasterDataService",
    "$rootScope",
    "$compile",
    "Session"
  ];

  /**
   * @ngdoc Service
   * @name BeneficiaryGridConfig
   * @module immiApp.beneficiary
   * @requires
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  function BeneficiaryGridConfig(GridDynamics, GridConstants, MasterDataService, $rootScope, $compile, Session) {
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
            sEmptyTable: "No Beneficiaries found",
            sInfo: "Showing ​_START_ to _END_ of _TOTAL_ Beneficiaries",
            sInfoEmpty: "Showing ​0 to 0 of 0 Beneficiaries"
          },
          "rowCallback": function(row, data, index) {
            row = $(row);
            var html = "<span class='comment-icon'><img src='assets/img/comments.png' width='22px' height='26px' data-placement='left' user-note note-id='" + data.party_id + "'></span>";
            row.find(".beneficiary-id").html(html);
            $compile(row)(context);
          }
        };
    gridConfig.aoColumns = [{
      "sWidth": "100px",
      "sTitle": "ID",
      "data": "party_id",
      "render": function(elm){
        var beneficiaryUrl = "";
        if(Session.getPartyType() == "system_administrator"){
           beneficiaryUrl = "<a href=\"#/beneficiary/"+elm+"/\">"+elm+"</a>";
        }else {
          var beneficiaryMenu = _.filter(Session.getSideMenu(),function(data){
            return data.label == "Beneficiary";
          });
          if(beneficiaryMenu[0].children){
            for(var i=0;i<beneficiaryMenu[0].children.length ;i++){
              if(beneficiaryMenu[0].children[i].isModuleEdit !== undefined){
                Session.setAccessType(beneficiaryMenu[0].children[i].isModuleEdit);
                beneficiaryUrl = beneficiaryMenu[0].children[i].isModuleEdit ? "<a href=\"#/beneficiary/"+elm+"/\">"+elm+"</a>" : "<a href=\"#/beneficiary/view/"+elm+"/\">"+elm+"</a>";
              }else {
                beneficiaryUrl = "<a href=\"#/beneficiary/"+elm+"/\">"+elm+"</a>";
              }

            }
          }
        }
        return beneficiaryUrl;
      }
    }, {
      "bSortable": true,
      "sTitle": "First name",
      "data": "first_name"
    }, {
      "bSortable": true,
      "sTitle": "Last name",
      "data": "last_name"
    }, {
      "bSortable": true,
      "sTitle": "Date of birth",
      "data": "date_of_birth"
    }, {
      "bSortable": true,
      "sTitle": "Gender",
      "data": "gender",
      "render" : function(gender){
        var gender = _.where(MasterDataService.getPersonGender(), {"id" : gender });
        if(gender.length){
          return gender[0].name;
        }else{
          return "";
        }
      }
    }, {
      "bSortable": true,
      "sTitle": "Email",
      "data": "email.email"
    }, {
      "bSortable": true,
      "sTitle": "Passport No",
      "data": "passport",
      "render" : function(passport) {
        return passport.number;
      }
    }, {
      "bSortable": true,
      "sTitle": "Country of birth",
      "data": "nationality",
      "render": function(nationality){
        var nationality = _.where(MasterDataService.getCountries(), {"id" : nationality });
        if(nationality.length){
          return nationality[0].name;
        }else{
          return "";
        }
      }
    }, {
      "bSortable": true,
      "sTitle": "Issuing country",
      "data": "passport",
      "render": function(passport){
        var issuingCountry = _.where(MasterDataService.getCountries(), {"id" : passport.issuing_country_id });
        if(issuingCountry.length){
          return issuingCountry[0].name;
        }else{
          return "";
        }
      }
    }, {
      "bSortable": true,
      "sTitle": "Status",
      "data": "marital_status",
      "render": function(elm) {
        return "No Status";
      }
    }, {
      "bSortable": false,
      "sTitle": "User Note",
      "data": "party_id",
      "render": function(elm) {
        return "<div class='beneficiary-id text-center'></div>";
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
      return "Showing {{start}} to {{end}} of {{totalItems}} Beneficiaries";
    };

    GridDynamics.pushGridConfig(GridConstants.BENEFICIARY_LIST, gridConfig);


  }
})();
