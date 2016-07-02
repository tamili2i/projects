(function() {
    "use strict";

    angular
        .module("immiApp.UserManagement")
        .controller("UserRoleListController", UserRoleListController);

    /**
     * @ngdoc Injector
     * @name UserRoleListController
     * @private
     * @module immiApp.UserManagement
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    UserRoleListController.$inject = [
        "$scope",
        "$location",
        "$state",
        "UserManagementService",
        "GridConstants",
        "GridService"
        ];

    /**
     * @ngdoc Controller
     * @name UserRoleListController
     * @module immiApp.UserManagement
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function UserRoleListController($scope, $location, $state, UserManagementService, GridConstants, GridService) {
        var vm = this;

        vm.isLoading = true;
        vm.gridName = GridConstants.USER_ROLE_LIST;

        /**
         * @ngdoc function
         * @name onPaginate
         * @param {String} pageNo
         * @description
         * binded with pagination
         * and it will be invoked for every
         * page change action
         *
         */
        var onPaginate = function(pageNo) {
          $location.search({
            "page": pageNo
          });
          vm.getUserRoleList();
        };

        var constructQueryParam = function() {
          var qParam = $location.search(),
            queryParam = {};

          if (qParam.page) {
            queryParam.page = qParam.page;
          }
          // queryParam.party_id = 3;

          return queryParam;
        };

        /**
         * @ngdoc event
         * @name event, searchObj
         * @description
         * Triggered from search state, to reload
         * data based on search crietia.
         *
         */
        $scope.$on("search", function(evt, searchObj) {
          vm.getUserRoleList();
        });

        /**
         * @ngdoc function
         * @name getUserRoleList
         * @description
         * Gets list of user roles
         *
         */
        vm.getUserRoleList = function() {
          vm.isLoading = true;
          var queryParam = constructQueryParam();
          UserManagementService.getUserRoleList(queryParam, function successCallback(response) {
            GridService.renderGridWithPagination({
              "gridId": GridConstants.USER_ROLE_LIST,
              "dataObj": response,
              "context": $scope,
              "onPaginate" : onPaginate
            }, function() {
              vm.isLoading = false;
            });
          }, function errorCallback() {
            GridService.renderGrid(GridConstants.USER_ROLE_LIST, [], function(){
                vm.isLoading = false;
            });
          });

        };

        /**
         * @ngdoc function
         * @name init
         * @description
         * Initiates user role list
         *
         */
        var init = function() {
          vm.getUserRoleList();
        };
        init();

        /**
         * @ngdoc event
         * @name $destroy
         * @description
         * Will destroy grid components which
         * associated with this controller.
         */
        $scope.$on("$destroy", function() {
          GridService.destroyGrid(vm.gridName);
        });

        /**
         * @ngdoc event
         * @name Update:UserRoleList
         * @description
         * Gets updated role list
         */
        $scope.$on("Update:UserRoleList",function(){
          vm.getUserRoleList();
        });
    }
})();
