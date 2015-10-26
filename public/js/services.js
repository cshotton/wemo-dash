'use strict';

/* Services */

var wemoDashServices = angular.module('wemoDashServices', ['ngResource']);

/*
webDashServices.factory('Devices', ['$resource',
  function($resource){
    return $resource('/v1/getDevices', {}, {
      query: {method:'GET', params:{}, isArray:true}
    });
  }]);
*/
  
wemoDashServices.factory ('Devices', ['$resource', 
	function ($resource) {
		var fac = {};
		fac.query = function () {
			return $resource('/v1/getDevices', {}, {
      				query: {method:'GET', params:{}, isArray:true}
    				});
    		};
    	fac.refresh = function () {
			return $resource('/v1/refreshdevices', {}, {
      				get: {method:'GET'}
    				});
    		};
    	return fac;
    }
]);