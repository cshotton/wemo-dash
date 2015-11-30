'use strict';

/* App Module */

var wemoDash = angular.module('wemo-dash', [
  'ngRoute',
  'wemoDashControllers',
  'wemoDashServices'
]);

wemoDash.config(['$routeProvider',
	function($routeProvider) {
		$routeProvider.
			when('/dash', {
				templateUrl: 'partials/dash.html',
				controller: 'DeviceListCtrl2'
			}).
      		when ('/help', {
      			templateUrl: 'partials/help.html',
      			controller: 'HelpCtrl'
      		}).
			otherwise({
				redirectTo: '/dash'
			});
	}]);