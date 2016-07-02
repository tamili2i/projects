(function() {
    "use strict";

    angular.module("immiApp.UserManagement")
        .service("RoleBasedModuleComputeService", RoleBasedModuleComputeService);

    /**
     * @ngdoc Injector
     * @name RoleBasedModuleComputeService
     * @private
     * @module immiApp.UserManagement
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    RoleBasedModuleComputeService.$inject = [];

    /**
     * @ngdoc Service
     * @name RoleBasedModuleComputeService
     * @module immiApp.UserManagement
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function RoleBasedModuleComputeService(GridDynamics, GridConstants) {
        var _self = this,
            accessRightsByModuleMatrix = {
                "attorney": ["Beneficiary", "Case Management", "Intake Form"],

                "beneficiary": ["Beneficiary"],

                "corporation": ["Beneficiary", "Case Administration", "Case Management", "Intake Form", "Lawfirm", "Party", "Reports", "User Access Rights", "Work Flow"],

                "corporation_business_unit": ["Beneficiary", "Case Management", "Intake Form"],

                "corporation_law_firm": ["Beneficiary", "Case Management", "Intake Form", "Party", "User Access Rights", "Work Flow"],

                "hr_representative": ["Beneficiary", "Case Management", "Intake Form"],

                "immigration_specialist": ["Beneficiary", "Case Management", "Intake Form"],

                "law_firm": ["Beneficiary", "Case Administration", "Case Management", "Corporation", "Intake Form", "Party", "Reports", "User Access Rights", "Work Flow"],

                "law_firm_branch_office": ["Beneficiary", "Case Management", "Intake Form"],

                "law_firm_corporation": ["Beneficiary", "Case Management", "Intake Form", "Party", "User Access Rights", "Work Flow"],

                "paralegal": ["Beneficiary", "Case Management", "Intake Form"],

                "secretary": ["Beneficiary", "Case Management", "Intake Form"],

                "system_administrator": ["Beneficiary", "Case Administration", "Case Management", "Corporation", "Intake Form", "Lawfirm", "Party", "Reports", "User Access Rights", "User Role Creation", "Work Flow"]
            };

        /**
         * @ngdoc function
         * @name getModulesByRole
         * @param {Object} role
         * @param {Array} modules
         * @description
         * For given role, according to Role based module
         * matrix modules will be filtered and that will be returned.
         *
         */
        _self.getModulesByRole = function(role, modules) {
            var moduleNames = accessRightsByModuleMatrix[role.code],
                filteredModules = [];

            for (var i = 0; i < moduleNames.length; i++) {
                var module = _.findWhere(modules, {
                    "module_name": moduleNames[i]
                });
                if (module) filteredModules.push(module);
            }
            return filteredModules;
        }
    }
})();
