(function() {
    "use strict";

    angular
        .module("immiApp.SystemAdministration")
        .controller("SubscriberListController", SubscriberListController);

    /**
     * @ngdoc Injector
     * @name SubscriberListController
     * @private
     * @module immiApp.UserManagement
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    SubscriberListController.$inject = [
        "$scope",
        "$location",
        "SubscriberService",
        "GridConstants",
        "GridService",
        "Actions"
        ];

    /**
     * @ngdoc Controller
     * @name SubscriberListController
     * @module immiApp.SystemAdministration
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function SubscriberListController($scope, $location, SubscriberService, GridConstants, GridService, Actions) {
        var vm = this;

        vm.isLoading = true;
        vm.gridName = GridConstants.SUBSCRIBER_LIST;

        vm.actions = Actions;
        $scope.arr = [];
        $scope.check = [];
        var subscribers = [];

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
          vm.getSubscriberList();
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
         * @ngdoc function
         * @name getSubscriberList
         * @description
         * Gets list of subscribers in system
         *
         */
        vm.getSubscriberList = function(){
          vm.isLoading = true;
          var queryParam = constructQueryParam();
          SubscriberService.getSubscriberList(queryParam, function successCallback(response) {
            subscribers = response.data;
            GridService.renderGridWithPagination({
              "gridId": GridConstants.SUBSCRIBER_LIST,
              "dataObj": response,
              "context": $scope,
              "onPaginate" : onPaginate
            }, function() {
              vm.isLoading = false;
              checkForSelectAllMarked();
            });
          }, function errorCallback() {
            GridService.renderGrid(GridConstants.SUBSCRIBER_LIST, [], function(){
                vm.isLoading = false;
            });
          });
        };
        /**
         * @ngdoc event
         * @name $destroy
         * @description
         * Will destroy grid components which
         * associated with this controller.
         */
         $scope.$on("$destroy", function(){
           GridService.destroyGrid(vm.gridName);
         });

         /**
          * @ngdoc function
          * @name checkForSelectAllMarked
          * @description
          * Checks select all checkbox
          */
         function checkForSelectAllMarked(){
           var count = 0;
           for(var i=0;i<subscribers.length;i++){
             if($scope.arr.indexOf(subscribers[i].id) > -1){
               count++;
             }
           }
           if(subscribers.length && subscribers.length === count){
             $scope.headerCheck = true;
           } else{
             $scope.headerCheck = false;
           }
         }

         /**
          * @ngdoc function
          * @name selectEntity
          * @description
          * This method perform push and pop actions
          * when checkbox is clicked
          */
         $scope.selectEntity = function(id){
           if(id && $scope.arr.indexOf(id) < 0){
             $scope.arr.push(id);
           }else if(id && $scope.arr.indexOf(id) > -1){
             var index = $scope.arr.indexOf(id);
             $scope.arr.splice(index, 1);
           }
           checkForSelectAllMarked();
           console.log($scope.arr);
         };

         /**
          * @ngdoc function
          * @name checkForSelectAllMarked
          * @description
          * Checks select all checkbox
          */
         $scope.selectAllEntity = function(isSelectAll){
           if(isSelectAll){
             var id = null;
             for(var i=0;i<subscribers.length;i++){
               $scope.check[subscribers[i].id]=true;
               id = subscribers[i].id;
               if(id && $scope.arr.indexOf(id) < 0){
                 $scope.arr.push(id);
               }
             }
           } else{
             var id = null;
             for(var i=0;i<subscribers.length;i++){
               id = subscribers[i].id;
               $scope.check[subscribers[i].id]=false;
               $scope.arr.splice($scope.arr.indexOf(id),1);
             }
             //$scope.arr.length = 0;
           }
           console.log($scope.arr);
         };

         /**
          * @ngdoc function
          * @name sendCommunication
          * @description
          * Sends communication to subscribers
          */
         vm.sendCommunication = function(id) {
           var communication = {};
           communication.type_id = id;
           communication.party_id = SubscriberService.convertToString($scope.arr);
           SubscriberService.sendCommunication(communication, function(response) {

           });
         };

        /**
         * @ngdoc function
         * @name init
         * @description
         * initiates user role list
         */
        function init(){
          SubscriberService.setControllerContext($scope);
          vm.getSubscriberList();
        }
        init();


    }
})();
