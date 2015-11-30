'use strict';

/* Controllers */

var wemoDashControllers = angular.module('wemoDashControllers', []);

/*
wemoDashControllers.controller('DeviceListCtrl', ['$scope', 'Devices',
  function($scope, Devices) {
    $scope.devices = Devices.query();
    $scope.toggleValue = function (dev) {
    		var newval = dev.binaryState == "0" ? "1" : "0";
    		console.log ("Setting " + dev.sn + " from " + dev.binaryState + " to " + newval);
    		dev.binaryState = newval;
    	};
  }]);
*/

wemoDashControllers.controller('DeviceListCtrl2', ['$scope', '$http', '$interval',
  function($scope, $http, $interval) {
  	$scope.errFlag = false;
  	$scope.errMsg = "none.";
  	$scope.haveDevices = false;
    $scope.devices = [];
    loadDevices ();
    $interval (loadDevices, 3000);
    
    $scope.toggleValue = function (dev) {
    		var newval = dev.binaryState == "0" ? "1" : "0";
    		console.log ("Setting " + dev.sn + " from " + dev.binaryState + " to " + newval);
    		dev.binaryState = newval;
    		var args = { "sn": dev.sn, "val": newval};
    		$http.post ('/v1/setdevice', args).then (
    			function (ok) {
    				console.log ('setdevice OK: ' + JSON.stringify (ok));
    			},
    			function (err) {
   					console.log ('setdevice ERR: ' + JSON.stringify (err));
    			}
    		);
    	};

	$scope.copyToClipboard = function (dev) {
			var sn = dev.sn;
			var val = dev.binaryState;
			var hostport = location.hostname+(location.port ? ':'+location.port: '');
			window.prompt("Copy to clipboard:", "http://" + hostport + "/v1/qsetdevice?sn=" + sn + "&val=" + val);
		};
	
    function errmsg (msg, flag) {
    	$scope.errMsg = msg;
    	$scope.errFlag = flag;
//    	console.log (msg + ', ' + flag);
    }
    
    function loadDevices () {
    	$http.get ('/v1/getdevices').then (
    		function (data) {
	   			//console.log ("got devices: " + JSON.stringify (data));
	   			errmsg ("", false);
    			$scope.devices = data.data;
    			$scope.haveDevices = $scope.devices.length > 0;
    		},
    		function (err) {
    			errmsg ("Communications failure.", true);
    		});
    }
  }]);

wemoDashControllers.controller('HelpCtrl', ['$scope',
  function($scope) {
  }]);
  