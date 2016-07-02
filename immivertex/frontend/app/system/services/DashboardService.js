(function() {
    "use strict";
    /*jslint nomen: true*/
    /*global angular, $, _*/

    /**
     * @ngdoc Service
     * @name DashboardService
     * @module immiApp.system
     * @requires
     * @description
     * This service has functionality to interface with backend to send and fetch data.
     * @author Ideas2IT Technologies
     * @copyright
     */
    angular.module("immiApp.system")
        .service("DashboardService", DashboardService);

    /**
     * @ngdoc Injector
     * @name DashboardService
     * @private
     * @module immiApp.system
     * @description
     * Inject module that needs to be useful for grid service
     * @author Ideas2IT Technologies
     * @copyright
     */
    DashboardService.$inject = ["DashboardDataService", "ToasterService", "Session"];

    function DashboardService(DashboardDataService, ToasterService, Session) {
        var _self = this;

        /**
          * @ngdoc function
          * @name getDashboardBoxOrder
          * @param  {Number} partyId includes party_id of corporation
          * @param {function} successCallback
          * @description
          * Gets the dashboard boxes order detail
          *
          */
        _self.getDashboardBoxOrder = function(partyId, successCallback) {
          var boxOrderQ = DashboardDataService.getDashboardBoxOrder(partyId);
          boxOrderQ.then(function (response) {
            var sortedBoxes = _.sortBy(response.data.data, function(data) {
                return data.box_id;
            });
            if(sortedBoxes.length > 0){
              var boxOrderId = [];
              var box_order_Ids = {};
              for(var i=0; i<sortedBoxes.length; i++){
                box_order_Ids = {
                  box_id: sortedBoxes[i].box_id,
                  order_id: sortedBoxes[i].order_id,
                  id: sortedBoxes[i].id
                }
                box_order_Ids.box_name = sortedBoxes[box_order_Ids.order_id-1].box_det.name;
                boxOrderId.push(box_order_Ids);
              }
              successCallback(boxOrderId);
            }else {
              var boxOrderQ = DashboardDataService.getDashboardBoxes();
              boxOrderQ.then(function (response) {
                successCallback(getDashboardBoxes(response));
              }, function(){
                 ToasterService.toastError("Something went wrong", "Error");
              });
            }

          }, function(){
             ToasterService.toastError("Something went wrong", "Error");
          });
        };

        /**
          * @ngdoc function
          * @name getDashboardBoxOrder
          * @param  {Array} dashboard includes list of dashboard boxes
          * @description
          * Save the dashboardBox in default order
          *
          */
        var getDashboardBoxes = function(dashboard) {
            var boxOrderId = [];
            boxOrderId = sortDashboardBox(dashboard.data);
           _.each(boxOrderId, function(data, index){
               var order_obj = {
                 "box_id" : data.box_id,
                 "order_id": data.order_id,
                 "party_id": Session.getPartyId(),
                 "updated_by": Session.getUpdatedBy(),
                 "id": null
               };
               var dashboardBoxQ = DashboardDataService.saveDashboardBoxOrder(order_obj);
               dashboardBoxQ.then(function (response) {
                 boxOrderId[index].id = response.data.id;
               });
           });
           return boxOrderId;
        };

        var sortDashboardBox = function(data){
          var box_order_Ids = {};
          var boxOrderId = [];
          var filteresModule = _.filter(data, function(dashboardBox){
            return dashboardBox.module === Session.getPartyType();
          });
          var sortedIds = _.sortBy(filteresModule, function(data){
            return data.id;
          });
          _.each(sortedIds, function(data,index){
            box_order_Ids = {
              box_id: data.id,
              order_id: data.order_id,
              box_name: data.name
            }
            boxOrderId.push(box_order_Ids);
          });
          return boxOrderId;
        };

        /**
          * @ngdoc function
          * @name syncOrder
          * @param {Array} orderids includes Dashboard box order_id
          * @param {Array} boxItems includes Dashboard box info
          * @description
          * While sort or drag and drop the dashboard boxes , Gets the Dashboard box order-ids in array
          * and save the dashboard boxes in that order.
          *
          */
        _self.syncOrder = function(orderids, boxItems){
          _.each(orderids, function(orderId, index){
            var orderId = parseInt(orderId.replace(/order-/, ''));
              var order_obj = {
                "box_id" : boxItems[index].box_id,
                "order_id": orderId,
                "party_id": Session.getPartyId(),
                "updated_by": Session.getUpdatedBy(),
                "id": boxItems[index].id
              };
              var boxOrderQ = DashboardDataService.saveDashboardBoxOrder(order_obj);
              boxOrderQ.then(function (response) {
                console.log("Dashboard Saved Successfully!!");
              }, function(){
                 ToasterService.toastError("Something went wrong", "Error");
              });
          });
        };

        return _self;
    }

})();
