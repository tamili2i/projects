angular.module("immiApp.theme")
  .service("$theme", ["$rootScope", "EnquireService", "$document", function($rootScope, EnquireService, $document) {
    "use strict";
    this.settings = {
      fixedHeader: true,
      headerBarHidden: true,
      leftbarCollapsed: false,
      leftbarShown: false,
      rightbarCollapsed: false,
      fullscreen: false,
      layoutHorizontal: false,
      layoutHorizontalLargeIcons: false,
      layoutBoxed: false,
      showSmallSearchBar: false,
      topNavThemeClass: "navbar-midnightblue",
      sidebarThemeClass: "sidebar-default",
      showChatBox: false,
      pageTransitionStyle: "fadeIn",
      dropdownTransitionStyle: "flipInX"
    };

    var brandColors = {
      "default": "#ecf0f1",

      "inverse": "#95a5a6",
      "primary": "#3498db",
      "success": "#2ecc71",
      "warning": "#f1c40f",
      "danger": "#e74c3c",
      "info": "#1abcaf",

      "brown": "#c0392b",
      "indigo": "#9b59b6",
      "orange": "#e67e22",
      "midnightblue": "#34495e",
      "sky": "#82c4e6",
      "magenta": "#e73c68",
      "purple": "#e044ab",
      "green": "#16a085",
      "grape": "#7a869c",
      "toyo": "#556b8d",
      "alizarin": "#e74c3c"
    };

    this.getBrandColor = function(name) {
      if (brandColors[name]) {
        return brandColors[name];
      } else {
        return brandColors["default"];
      }
    };

    $document.ready(function() {
      EnquireService.register("screen and (max-width: 767px)", {
        match: function() {
          $rootScope.$broadcast("themeEvent:maxWidth767", true);
        },
        unmatch: function() {
          $rootScope.$broadcast("themeEvent:maxWidth767", false);
        }
      });
    });

    this.get = function(key) {
      return this.settings[key];
    };
    this.set = function(key, value) {
      this.settings[key] = value;
      $rootScope.$broadcast("themeEvent:changed", {
        key: key,
        value: this.settings[key]
      });
      $rootScope.$broadcast("themeEvent:changed:" + key, this.settings[key]);
    };
    this.values = function() {
      return this.settings;
    };
  }]);


angular.module("immiApp.theme")
  .factory("progressLoader", function() {
    "use strict";
    return {
      start: function() {
        angular.element.skylo("start");
      },
      set: function(position) {
        angular.element.skylo("set", position);
      },
      end: function() {
        angular.element.skylo("end");
      },
      get: function() {
        return angular.element.skylo("get");
      },
      inch: function(amount) {
        angular.element.skylo("show", function() {
          angular.element(document).skylo("inch", amount);
        });
      }
    };
  })
  .factory("EnquireService", ["$window", function($window) {
    "use strict";
    return $window.enquire;
  }])
  .factory("pinesNotifications", ["$window", function ($window) {
    "use strict";
    return {
      notify: function (args) {
        args.mouse_reset = false;
        var notification = new $window.PNotify(args);
        notification.notify = notification.update;
        return notification;
      }
    };
  }])
  .factory("$bootbox", ["$modal", "$window", function($modal, $window) {
    "use strict";
    // NOTE: this is a workaround to make BootboxJS somewhat compatible with
    // Angular UI Bootstrap in the absence of regular bootstrap.js
    if (angular.element.fn.modal === undefined) {
      angular.element.fn.modal = function(directive) {
        var that = this;
        if (directive === "hide") {
          if (this.data("bs.modal")) {
            this.data("bs.modal").close();
            angular.element(that).remove();
          }
          return;
        } else if (directive === "show") {
          return;
        }

        var modalInstance = $modal.open({
          template: angular.element(this).find(".modal-content").html()
        });
        this.data("bs.modal", modalInstance);
        setTimeout(function() {
          angular.element(".modal.ng-isolate-scope").remove();
          angular.element(that).css({
            opacity: 1,
            display: "block"
          }).addClass("in");
        }, 100);
      };
    }

    return $window.bootbox;
  }])
  .filter("safe_html", ["$sce", function($sce) {
    "use strict";
    return function(val) {
      return $sce.trustAsHtml(val);
    };
  }]);
