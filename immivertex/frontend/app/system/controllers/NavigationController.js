(function(){
angular
    .module("immiApp.system")
    .controller("NavigationController", ["$scope", "$location", "$timeout", "Session", "NavigationService", function($scope, $location, $timeout, Session, NavigationService) {
        "use strict";
        var vm = this;
        $scope.menu = [];
        vm.getSideMenuByRole = function(){
          NavigationService.getSideMenuByRole(function callback(response) {
           $scope.menu =   _.sortBy(response, function(data) {
                return data.label;
            });
            Session.setSideMenu($scope.menu);
            if(Session.getPartyType()=="corporation"){
              var corporationFilterObj = _.where($scope.menu, {"label" : "Lawfirm"})[0];
              $scope.menu = _.without($scope.menu, _.findWhere($scope.menu, {"label" : "Lawfirm"}));
              $scope.menu.unshift(corporationFilterObj);
            }else if(Session.getPartyType()=="law_firm"){
              var lawfirmFilterObj = _.where($scope.menu, {"label" : "Corporation"})[0];
              $scope.menu = _.without($scope.menu, _.findWhere($scope.menu, {"label" : "Corporation"}));
              $scope.menu.unshift(lawfirmFilterObj);
            }else if(Session.getPartyType()=="system_administrator"){
              var sysAdminFilterObj = _.where($scope.menu, {"label" : "System Administration"})[0];
              $scope.menu = _.without($scope.menu, _.findWhere($scope.menu, {"label" : "System Administration"}));
              $scope.menu.unshift(sysAdminFilterObj);
            }
            setParent($scope.menu, null);
            setSideMenuColor();
          });
        };

        var setParent = function(children, parent) {
            angular.forEach(children, function(child) {
                child.parent = parent;
                if (child.children !== undefined) {
                    setParent(child.children, child);
                }
            });
        };

        $scope.findItemByUrl = function(children, url) {
            for (var i = 0, length = children.length; i < length; i++) {
                if (children[i].url && children[i].url.replace("#", "") === url) {
                    return children[i];
                }
                if (children[i].children !== undefined) {
                    var item = $scope.findItemByUrl(children[i].children, url);
                    if (item) {
                        return item;
                    }
                }
            }
        };

        $scope.openItems = []; $scope.selectedItems = []; $scope.selectedFromNavMenu = false;

        $scope.select = function(item) {
            // close open nodes
            if (item.open) {
                item.open = false;
                return;
            }
            for (var i = $scope.openItems.length - 1; i >= 0; i--) {
                $scope.openItems[i].open = false;
            }
            $scope.openItems = [];
            var parentRef = item;
            while (parentRef) {
                parentRef.open = true;
                $scope.openItems.push(parentRef);
                parentRef = parentRef.parent;
            }

            // handle leaf nodes
            if (!item.children || (item.children && item.children.length < 1)) {
                $scope.selectedFromNavMenu = true;
                for (var j = $scope.selectedItems.length - 1; j >= 0; j--) {
                    $scope.selectedItems[j].selected = false;
                }
                $scope.selectedItems = [];
                parentRef = item;
                while (parentRef) {
                    parentRef.selected = true;
                    $scope.selectedItems.push(parentRef);
                    parentRef = parentRef.parent;
                }
            }
        };

        $scope.highlightedItems = [];
        var highlight = function(item) {
            var parentRef = item;
            while (parentRef) {
                if (parentRef.selected) {
                    parentRef = null;
                    continue;
                }
                parentRef.selected = true;
                $scope.highlightedItems.push(parentRef);
                parentRef = parentRef.parent;
            }
        };

        var highlightItems = function(children, query) {
            angular.forEach(children, function(child) {
                if (child.label.toLowerCase().indexOf(query) > -1) {
                    highlight(child);
                }
                if (child.children !== undefined) {
                    highlightItems(child.children, query);
                }
            });
        };

        $scope.$on("$stateChangeSuccess", function() {
            setSideMenuColor();
            $scope.selectedFromNavMenu = false;
        });

        var setSideMenuColor = function(){
          if ($scope.selectedFromNavMenu === false) {
              var item = "";
              if($scope.menu){
                item = $scope.findItemByUrl($scope.menu, $location.path());
              }
              if (item) {
                  $timeout(function() {
                      $scope.select(item);
                  });
              }
          }
        }
        /**
         * @ngdoc function
         * @name init
         * @description
         * initiates user access rights
         *
         */
        function init() {
          vm.getSideMenuByRole();
        }

        init();
    }]);

})();
