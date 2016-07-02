(function(){
	"use strict";
	/*global angular*/
	/**
	 * @ngapp
	 * @name immiApp
	 * @description
	 * Immigration system starts here
	 * @requires ui.bootstrap, ui.router,
	 * ngFileUpload
	 * @author Ideas2it Technologies
	 *
	 */

	angular.module("immiApp",[
		"ui.bootstrap",
		"ui.router",
		"ui.select",
		"ngSanitize",
		"ngAnimate",
		"ngFileUpload",
		"ngMessages",
		"ngCookies",
		"ngPatternRestrict",
		"ncy-angular-breadcrumb",
		"uib.bootstrap",
		"autoheight",
		"infinite-scroll",
		"immiApp.theme",
		"immiApp.grid",
		"immiApp.system",
		"immiApp.beneficiary",
		"immiApp.components",
		"immiApp.intakeform",
		"immiApp.corporation",
		"immiApp.lawfirm",
		"immiApp.party",
		"immiApp.PcAdministration",
		"immiApp.UserManagement",
		"immiApp.usernote",
		"immiApp.SystemAdministration",
		"immiApp.caseManagement",
		"immiApp.workflow",
		"immiApp.report"
	])

	.factory('apiInterceptor', apiInterceptor)
	.config(function($httpProvider) {
	  $httpProvider.interceptors.push('apiInterceptor');
	})

	apiInterceptor.$inject = ["$window", "$q", "$location"];

	function apiInterceptor($window, $q, $location) {
		var storage = $window.localStorage;
	  return {
	    request: function(config) {
				config.headers = config.headers || {};
				if (storage.getItem('api_access_token')) {
						config.headers['apitoken'] = storage.getItem('api_access_token');
				}
	      return config;
	    },
	    responseError: function(response) {
				if (response.status === 401) {
						storage.setItem("party", null);
						$location.path('/401');
				}
				return $q.reject(response);
	    }
	  };
	}

})();
