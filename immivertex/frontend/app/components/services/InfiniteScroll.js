(function() {
    'use strict';

    angular
        .module('immiApp.components')
        .factory('InfiniteScroll', InfiniteScroll);


    /**
     * @ngdoc Injector
     * @name InfiniteScroll
     * @private
     * @module immiApp.components
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    InfiniteScroll.$inject = [];

    /**
     * @ngdoc Factory
     * @name InfiniteScroll
     * @module immiApp.components
     * @requires
     * @description
     * //Description goes here
     * @author Ideas2IT Technologies
     * @copyright
     */
    function InfiniteScroll() {
        var InfiniteScroll = function(){
          this.busy = false;

          this.nextPage = function(){

          }

        };

        return InfiniteScroll;


    }
})();
