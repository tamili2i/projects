(function() {
  "use strict";

  angular
    .module("immiApp.system")
    .service("NavigationService", NavigationService);

  /**
   * @ngdoc Injector
   * @name NavigationService
   * @private
   * @module immiApp.system
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  NavigationService.$inject = ["Session", "$q", "RoleBasedModuleComputeService"];

  /**
   * @ngdoc Service
   * @name NavigationService
   * @module immiApp.system
   * @requires
   * @description
   * //Description goes here
   * @author Ideas2IT Technologies
   * @copyright
   */
  function NavigationService(Session, $q, RBMComputeService) {
    var _self = this;
    var menuModules = {};

    _self.resetAccessMenu = function() {
      menuModules = {
        "Lawfirm": {
          label: "Lawfirm",
          iconClasses: "glyphicon glyphicon-briefcase",
          children: [{
            label: "Dashboard",
            url: "#/corporation"
          }, {
            label: "Lawfirm",
            url: "#/lawfirms"
          }, {
            label: "Create Lawfirm",
            url: "#/lawfirms/",
            needsEditPersmission : true
          }]
        },

        "Corporation": {
          label: "Corporation",
          iconClasses: "glyphicon glyphicon-folder-open",
          children: [{
            label: "Dashboard",
            url: "#/lawfirm"
          }, {
            label: "Corporation",
            url: "#/corporations"
          }, {
            label: "Create Corporation",
            url: "#/corporations/",
            needsEditPersmission : true
          }]
        },

        "Beneficiary": {
          label: "Beneficiary",
          iconClasses: "glyphicon glyphicon-user",
          children: [{
            label: "Create Beneficiary",
            url: "#/beneficiary/create",
            needsEditPersmission : true
          }, {
            label: "Beneficiary List",
            url: "#/beneficiaries"
          }]
        },

        "Intake Form": {
          label: "Intake Form",
          iconClasses: "glyphicon glyphicon-briefcase",
          children: [{
              label: "Attorney Intake Form",
              url: "#/attorney"
            },{
              label: "Attorney Intake Form",
              url: "#/attorney/view",
              isIntakeView: true
            }, {
              label: "Employer Intake Form",
              url: "#/employer/employment"
            }, {
              label: "Employer Intake Form",
              url: "#/employer/view/employment",
              isIntakeView: true
            }, {
              label: "Dependent Derivative Form",
              url: "#/dependent"
            }, {
              label: "Dependent Derivative Form",
              url: "#/dependent/view",
              isIntakeView: true
            }, {
              label: "HR Form",
              url: "#/hr"
            }, {
              label: "HR Form",
              url: "#/hr/view",
              isIntakeView: true
            }, {
              label: "Petitioner Family Form",
              url: "#/petitioner/general"
            }, {
              label: "Petitioner Family Form",
              url: "#/petitioner/view/general",
              isIntakeView: true
            }, {
              label: "Interpreter Form",
              url: "#/interpreter"
            }, {
              label: "Interpreter Form",
              url: "#/interpreter/view",
              isIntakeView: true
            }, {
              label: "Attorney Intake Family",
              url: "#/attorney-family/general"
            }, {
              label: "Attorney Intake Family",
              url: "#/attorney-family/view/general",
              isIntakeView: true
            }, {
              label: "Beneficiary Intake Family",
              url: "#/beneficiary-family/general"
            }, {
              label: "Beneficiary Intake Family",
              url: "#/beneficiary-family/view/general",
              isIntakeView: true
            }, {
              label: "Derivative Beneficiary Family",
              url: "#/derivative-family"
            }, {
              label: "Derivative Beneficiary Family",
              url: "#/derivative-family/view",
              isIntakeView: true
            }
          ]
        },

        "Case Administration": {
          label: "Program Case",
          iconClasses: "glyphicon glyphicon-folder-open",
          children: [{
            label: "Programs",
            url: "#/programs"
          }, {
            label: "Create Program Case",
            url: "#/programs/",
            needsEditPersmission : true
          }, {
            label: "Form Templates",
            url: "#/formtemplate"
          }, {
            label: "Create Form Template",
            url: "#/formtemplate/",
            needsEditPersmission : true
          }, {
            label: "Document Checklist",
            url: "#/document-checklist"
          }, {
            label: "Create Document Checklist",
            url: "#/document-checklist/",
            needsEditPersmission : true
          }]
        },

        "Case Management" : {
          label: "Case Management",
          iconClasses: "glyphicon glyphicon-folder-open",
          children: [{
            label: "Cases",
            url: "#/cases"
          },{
            label: "Create Case",
            url: "#/cases/",
            needsEditPersmission : true
          }]
        },

        "User Role Creation": {
          label: "User Role Creation",
          iconClasses: "glyphicon glyphicon-user",
          children: [{
            label: "Roles",
            url: "#/roles"
          }, {
            label: "Create Role",
            url: "#/roles/",
            needsEditPersmission : true
          }]
        },

        "User Access Rights": {
          label: "User Access Rights",
          iconClasses: "fa fa-unlock-alt",
          url: "#/access"
        },

        "Reports" : {
          label: "Reports",
          iconClasses: "fa fa-unlock-alt",
          children: [{
            label: "Beneficiary",
            url: "#/reports/beneficiary",
            needsEditPersmission : true
          },{
            label: "Party",
            url: "#/reports/party",
            needsEditPersmission : true
          },{
            label: "Passport Expiration",
            url: "#/reports/passport",
            needsEditPersmission : true
          },{
            label: "Cases",
            url: "#/reports/case",
            needsEditPersmission : true
          }]
        },

        "Party": {
          label: "Party",
          iconClasses: "glyphicon glyphicon-folder-open",
          children: [{
            label: "Create Party",
            url: "#/party/",
            needsEditPersmission : true
          }, {
            label: "Party List",
            url: "#/parties"
          }, {
            label: "Party Relationships",
            url: "#/party-relation/"
          }]
        },

        "System Administration": {
          label: "System Administration",
          iconClasses: "glyphicon glyphicon-folder-open",
          children: [{
            label: "Subscribers",
            url: "#/subscribers"
          },{
            label: "Alerts",
            url: "#/alerts/"
          }]
        },

        "Work Flow" : {
          label: "Work Flow",
          iconClasses: "glyphicon glyphicon-folder-open",
          children: [{
            label: "Workflows",
            url: "#/workflows"
          },{
            label: "Create Workflow",
            url: "#/workflows/",
            needsEditPersmission : true
          },{
            label: "Steps",
            url: "#/steps"
          }, {
            label: "Create Step",
            url: "#/steps/",
            needsEditPersmission : true
          },{
            label: "Step Association",
            url: "#/step-association"
          }]
        }
      };
    };

    _self.resetAccessMenu();

    _self.getSideMenuByRole = function(callback){
      var menusToAccess = [];
      if(Session.getPartyType() == "system_administrator"){
        menuModules = _.filter(menuModules, function(menu){
          return menu.label == "System Administration";
        });
        callback(menuModules);
      }else{
        var promise = Session.getAccessMenu();
        promise.then(function(response) {
          if(response.data.length > 0){
            menusToAccess = response.data;
            callback(getRoleBasedConstructedSideMenu(menusToAccess));
          }else {
            var modulesPromise = Session.getAccessModules();
            modulesPromise.then(function(response){
              var role = {"code":Session.getPartyType()}
              menusToAccess = constructSideMenuForInitialSave(role, response.data);
              callback(getRoleBasedConstructedSideMenu(menusToAccess));
            });
          }
        }, function(error) {
          console.log("ERRRRRRRRRRRor::",error);
        });
      }
    };

    function getRoleBasedConstructedSideMenu(menusToAccess){
      var roleBasedMenus = [];
      if(Session.getRole() === "beneficiary"){
        roleBasedMenus = _self.getConstructedMenuForBeneficiary(menusToAccess);
      }else {
        roleBasedMenus = _self.getConstructedMenu(menusToAccess);
      }
      return roleBasedMenus;
    }

    /**
     * @ngdoc function
     * @name constructAccesRightsForInitialSave
     * @param {Object} role
     * @param {Array} modules
     * @description
     * If no access rights were defined for given role, then default
     * modules allocated for given role will be constructed and that
     * will be used for displaying.
     * @return {array} accessRights.
     */
    function constructSideMenuForInitialSave(role, modules) {
      var filteredModules = RBMComputeService.getModulesByRole(role, modules),
        modulesToBeDisplayed = [],
        temp = {};

      for (var i = 0; i < filteredModules.length; i++) {
        temp = {};
        temp.modeuledet = {};
        temp.modeuledet.id = filteredModules[i].id;
        temp.modeuledet.module_name = filteredModules[i].module_name;
        modulesToBeDisplayed.push(temp);
      }
      return modulesToBeDisplayed;
    }

    _self.getConstructedMenuForChild = function(menu){
      var childrenMenu = [];
      for(var i=0;i<menu.length;i++){
        if(!menu[i].needsEditPersmission){
          childrenMenu.push(menu[i]);
        }
      }
      return childrenMenu;
    };

    _self.getConstructedMenuForBeneficiary = function(menusToAccess){
      var menu = [];
      for(var i=0;i<menusToAccess.length;i++){
        var menuToAccess = menusToAccess[i],
          menuByName = menuModules[menuToAccess.modeuledet.module_name];
        if(menuByName){
          if(menuToAccess.modeuledet.module_name === "Beneficiary"){
            delete menuByName.children;
            menuByName.url = "#/beneficiary/"+Session.getPartyId()+"/";
          }
          menu.push(menuByName);
        }
      }
      return menu;
    };

    _self.getConstructedMenu = function(menusToAccess){
      var menu = [];
      for(var i=0;i<menusToAccess.length;i++){
        var sideMenuToAccess = menusToAccess[i],
          menuByName = menuModules[sideMenuToAccess.modeuledet.module_name];
        if(sideMenuToAccess.access_edit && sideMenuToAccess.access_view){
          if(menuByName){
            if(menuByName.children && Session.getPartyAccessCode() == "party"){
              menuByName.children = _self.getInitialConstructedMenuForPartyChild(menuByName.children);
            }else{
              if(menuByName.children){
                if(menuByName.label == "Intake Form"){
                  menuByName.children = _.filter(menuByName.children,function(data){
                    return !data.isIntakeView;
                  });
                }
                menuByName.children = _self.setBeneficiaryViewBoolean(menuByName.children, true);
              }
            }
            menu.push(menuByName);
          }
        }else if(sideMenuToAccess.access_view){
          if(menuByName){
            if(menuByName.children){
              if(menuByName.label == "Intake Form"){
                menuByName.children = _.filter(menuByName.children,function(data){
                  return data.isIntakeView;
                });
              }
              _self.setBeneficiaryViewBoolean(menuByName.children, false);
              menuByName.children = _self.getConstructedMenuForChild(menuByName.children);
            }
            menu.push(menuByName);
          }
        }else{
          if(menuByName){
            if(menuByName.label == "Intake Form"){
              menuByName.children = _.filter(menuByName.children,function(data){
                return !data.isIntakeView;
              });
            }
            if(menuByName.children && Session.getPartyAccessCode() == "party"){
              menuByName.children = _self.getInitialConstructedMenuForPartyChild(menuByName.children);
            }
            menu.push(menuByName);
          }
        }
      }
      return menu;
    };

    _self.getInitialConstructedMenuForPartyChild = function(menu){
      var childrenMenu = [];
      for(var i=0;i<menu.length;i++){
        if(!menu[i].needsEditPersmission){
           menu[i].isModuleEdit = true;
          childrenMenu.push(menu[i]);
        }else {
          delete menu[i];
        }
      }
      return childrenMenu;
    };

    _self.setBeneficiaryViewBoolean = function(menu, access){
      var childrenMenu = [];
      for(var i=0;i<menu.length;i++){
        if(access && !menu[i].needsEditPersmission){
           menu[i].isModuleEdit = true;
        }else if(!access && !menu[i].needsEditPersmission){
           menu[i].isModuleEdit = false;
        }
        childrenMenu.push(menu[i]);
      }
      return childrenMenu;
    };
  }
})();
