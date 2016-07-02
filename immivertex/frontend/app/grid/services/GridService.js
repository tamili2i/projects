(function() {
  "use strict";
  /*jslint nomen: true*/
  /*global angular, $, _*/

  /**
   * @ngdoc Service
   * @name GridService
   * @module immiApp.grid
   * @requires
   * @description
   * This service has default grid configuration, custom configuration and
   * events to load Data Table.
   * @author Ideas2IT Technologies
   * @copyright
   */
  angular.module("immiApp.grid")
    .service("GridService", GridService);

  /**
   * @ngdoc Injector
   * @name GridService
   * @private
   * @module immiApp.grid
   * @description
   * Inject module that needs to be useful for grid service
   * @author Ideas2IT Technologies
   * @copyright
   */
  GridService.$inject = [
    "$rootScope",
    "$compile",
    "Utils",
    "GridDynamics"
  ];


  function GridService($rootScope, $compile, Utils, GridDynamics) {

    var _self = this,
      gridElm = {},
      searchForRegistry = {},
      grids = {};

    /*
     * DataTable Default Configuration
     * Added common attributes
     */
    var TABLE_CONFIG = {

    };

    /**
     * @name adjustTableWidth
     * @description
     *
     */
    _self.adjustTableWidth = function() {
      setTimeout(function() {
        $.fn.dataTable.tables({
          visible: true,
          api: true
        }).columns.adjust();
      }, 300);
    };



    /**
     * @name setGridElement
     * @description
     * sets the created dataTable object used for other services
     */
    _self.setGridElement = function(gridId, elm) {
      gridElm[gridId] = elm;
    };

    /**
     * @name getGridElement
     * @param gridId
     * @description
     * sets the created dataTable object used for other services
     * @return gridElement || null
     */
    _self.getGridElement = function(gridId) {
      if (gridId in gridElm) {
        return gridElm[gridId];
      } else {
        return null;
      }
    };

    /**
     * @name setGridProperties
     * @description
     * sets the created dataTable object used for other services
     */
    _self.setGridProperties = function(gridId, grid) {
      grids[gridId] = grid;
    };

    /**
     * @name getGridProperties
     * @description
     * gets the dataTable object used for other
     * services by given Id
     */
    _self.getGridProperties = function(gridId) {
      if (gridId in grids) {
        return grids[gridId];
      } else {
        return null;
      }
    };

    /**
     * @name getGridProperties
     * @description
     * gets the dataTable object used for other
     * services by given Id
     */
    _self.registerSearchForCallback = function(gridId, callback) {
      searchForRegistry[gridId] = callback;
    };


    _self.destroyGrid = function(gridId) {
      if (gridId in grids) {
        delete grids[gridId];
        delete gridElm[gridId];
        delete searchForRegistry[gridId];
      }
    };

    /**
     * @name computePagination
     * @param {Object} gridConfig
     * @param {Object} dataObj
     * @description
     * sets the created dataTable object used for other services
     */
    _self.computePaginationContext = function(context, dataObj, onPaginate) {
      context.totalItems = (dataObj.total);
      context.maxSize = 4;
      context.itemsPerPage = (parseInt(dataObj.per_page));
      context.currentPage = dataObj.current_page;
      context.start = dataObj.from;
      context.end = dataObj.to;
      context.paginate = onPaginate;
      return context;
    };

    /**
     * @name renderPagination
     * @param {Object} gridConfig
     * @param {Object} dataObj
     * @description
     * sets the created dataTable object used for other services
     */
    _self.renderPagination = function(grid, gridConfig, context) {
      var template = ["<div class=\"col-sm-5\">",
        "<div class=\"dataTables_info\" role=\"status\" aria-live=\"polite\">",
        "$$$$$",
        "</div>",
        "</div>",
        "<div class=\"col-sm-7\">",
        "<uib-pagination total-items=\"totalItems\"",
        "ng-model=\"currentPage\" max-size=\"maxSize\"",
        "items-per-page = \"itemsPerPage\"",
        "class=\"pagination-sm\" boundary-link-numbers=\"true\"",
        "ng-change=\"paginate(currentPage)\"",
        "rotate=\"false\"></uib-pagination>",
        "</div>"
      ].join("");
      template = template.replace("$$$$$", gridConfig.sInfoTemplate());
      console.log(template);
      //template = $compile(template)(_self.computePagination());
      template = $compile(template)(context);
      $(grid.DataTable().settings()[0].nTableWrapper).find(".dataTables_info").closest(".row").html(template);
    };

    /**
     * @ngdoc function
     * @name customInitCallback
     * @param grid
     * @description
     * Will be called once datatable is created
     * mainly to handle alignment after side menu collapse and expand.
     *
     */
    _self.customInitCallback = function(grid) {
      $rootScope.$on("themeEvent:changed:leftbarShown", function(isShown) {
        setTimeout(function() {
          grid.DataTable().columns.adjust();
        }, 300);

      });

      $rootScope.$on("themeEvent:changed:leftbarCollapsed", function(isShown) {
        setTimeout(function() {
          grid.DataTable().columns.adjust();
        }, 300);
      });
    };

    /**
     * @ngdoc Injector
     * @name reRenderGrid
     * @description
     * sets the created dataTable object used for other services
     */
    _self.renderNewGrid = function(gridId, data) {
      var element = _self.getGridElement(gridId);
      if (element && $.contains(document.documentElement, element[0])) {
        var config = GridDynamics.getGridConfig(gridId, data),
          grid = element.dataTable(config);

        grid.DataTable().columns.adjust();

        _self.customInitCallback(grid);

        var gridProp = {
          "dataTable": grid,
          "elm": element
        };
        _self.setGridProperties(gridId, gridProp);

        /************************************
        //  Custom search box for grid      //
        //  Actually which implements       //
        //  jQuery DataTable's search       //
        //  functionality                   //
        *************************************/
        if (gridId in searchForRegistry) {
          searchForRegistry[gridId]();
        }
      }
      return gridProp;
    };

    /**
     * @name reRenderGrid
     * @param {Object} grid
     * @param {Object} data
     * @param {function} callback
     * @description
     * sets the created dataTable object used for other services
     */
    _self.updateDataInGrid = function(grid, data) {
      grid.dataTable.fnClearTable();
      if(data.length > 0)
        grid.dataTable.fnAddData(data);
      grid.dataTable.DataTable().columns.adjust();
    };

    /**
     * @name renderGrid
     * @param {string} gridId
     * @param {Object} data
     * @param {function} callback
     * @description
     * sets the created dataTable object used for other services
     */
    _self.renderGrid = function(gridId, data, callback) {

      var grid = _self.getGridProperties(gridId);
      if (grid) {
        _self.updateDataInGrid(grid, data, callback);
      } else {
        _self.renderNewGrid(gridId, data, callback);
      }

      if(typeof callback == "function"){
        callback();
      }
    };

    /**
     * @name renderGridWithPagination
     * @param {Object} options
     * Option includes
     * {String} gridId
     * {Object} dataObj - data used for rendering pagination and grid list
     * {Object} context - Controller's scope
     * {function} onPaginate - Method binded to on paginate event
     * @param {function} callback
     * @example
           Copied from LawfirmListController.js

            GridService.renderGridWithPagination({
               "gridId": GridConstants.LAWFIRM_LIST,
               "dataObj": response,
               "context": $scope,
               "onPaginate" : onPaginate,
             }, function() {
               Goes after grid rendering
             })

     * @description
     * Renders table with pagination
     * Pagination Will be rendered only once for initial table render
     * and will be binded with the controller's context.
     */
    _self.renderGridWithPagination = function(options, callback) {

      var gridProp = _self.getGridProperties(options.gridId);

      if (gridProp) {
        _self.updateDataInGrid(gridProp, options.dataObj.data);
        _self.computePaginationContext(options.context, options.dataObj, options.onPaginate);
      } else {
        gridProp = _self.renderNewGrid(options.gridId, options.dataObj.data);

        if(options.dataObj.total > (parseInt(options.dataObj.per_page))){
          var gridConfig = GridDynamics.getGridConfig(options.gridId),
            context = _self.computePaginationContext(options.context, options.dataObj, options.onPaginate);

          _self.renderPagination(gridProp.dataTable, gridConfig, context);
        }
      }
      callback();
    };

    return _self;
  }

})();
