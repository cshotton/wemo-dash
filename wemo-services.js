/**
  wemo-services.js - background services for wemo-dash
  
*/

var express = require('express');
var router = express.Router();
var Wemo = require('wemo-client');
var wemo = new Wemo();

var devices = [];

//-------------------------------------------------------------------

function init () {
}


module.exports.init = init;

//-------------------------------------------------------------------

function start () {
	wemo.discover(function(deviceInfo) {
		var ix = deviceInfo.friendlyName;
		console.log('Wemo Device Found: %j', ix);

		devices.push (deviceInfo);
		
		// Get the client for the found device
		var client = wemo.client(deviceInfo);

		// Handle BinaryState events
		client.on('binaryState', function(value) {
			var dev = deviceInfo;
	
			console.log(dev.friendlyName + ': Binary State changed to: %s', value);
	  	});

		// Turn the switch on
		//  client.setBinaryState(1);
	});
}

module.exports.start = start;

//-------------------------------------------------------------------

function stop () {
}

module.exports.stop = stop;

//-------------------------------------------------------------------

function resetDeviceList () {
	devices = [];
}

module.exports.resetDeviceList = resetDeviceList;

//-------------------------------------------------------------------

function getDeviceList () {
console.log ('DEVICES: ' + JSON.stringify (devices));
	return devices;
}

module.exports.getDeviceList = getDeviceList;


//-------------------------------------------------------------------

function refreshDeviceList () {
console.log ('REFRESH DEVICES: ' + JSON.stringify (devices));
	resetDeviceList ();
	
	return devices;
}

module.exports.getDeviceList = getDeviceList;


