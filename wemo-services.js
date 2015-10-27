/**
  wemo-services.js - background services for wemo-dash
  
*/
var DISCOVERY_DELAY = 10000; //ms

var express = require('express');
var router = express.Router();
var Wemo = require('wemo-client');
var wemo = new Wemo();

var devices = [];
var clients = [];
var status = [];

//-------------------------------------------------------------------

function init () {
}


module.exports.init = init;

//-------------------------------------------------------------------

function getDeviceIndex (sn) {
	var i;
	for (i=0; i<devices.length; i++) {
		if (devices[i].serialNumber == sn) {
			return i;
		}
	}
	return -1;
}

//-------------------------------------------------------------------

function addNewDevice (deviceInfo) {
	console.log('New Wemo Device Found: %j', deviceInfo.friendlyName);

	var client = wemo.client (deviceInfo);
	clients.push (client);
	devices.push (deviceInfo);
	var newstat = {
			'name'	: deviceInfo.friendlyName,
			'sn'	: deviceInfo.serialNumber,
			'host'	: deviceInfo.host,
			'port'	: deviceInfo.port,
			'binaryState' : deviceInfo.binaryState
		};
	status.push (newstat);

	// Handle BinaryState events
	client.on('binaryState', function(value) {
		var device = deviceInfo;
		var ix = getDeviceIndex (device.serialNumber);
		if (ix >=0) {
			var val = status[ix].binaryState;
			if (val != value) {
				console.log(device.friendlyName + ': Binary State changed to: %s', value);
				status[ix].binaryState = value;
			}
		}
	});		

}

//-------------------------------------------------------------------

function doDiscover () {
//	console.log ("discovering...");
	wemo.discover(function(deviceInfo) {
		var sn = deviceInfo.serialNumber;
		if (getDeviceIndex (sn) < 0) {
			addNewDevice (deviceInfo);
		}
	});
}

//-------------------------------------------------------------------

function start () {
	doDiscover ();
	setInterval (doDiscover, DISCOVERY_DELAY);
}

module.exports.start = start;

//-------------------------------------------------------------------

function stop () {
}

module.exports.stop = stop;

//-------------------------------------------------------------------

function resetDeviceList () {
	devices = [];
	clients = [];
	status = [];
}

module.exports.resetDeviceList = resetDeviceList;

//-------------------------------------------------------------------

function getDeviceList () {
//console.log ('DEVICES: ' + JSON.stringify (status));
	return status;
}

module.exports.getDeviceList = getDeviceList;


//-------------------------------------------------------------------

function refreshDeviceList () {
	resetDeviceList ();
	start();
	
console.log ('REFRESH DEVICES: ' + JSON.stringify (status));
	
	return {};
}

module.exports.refreshDeviceList = refreshDeviceList;

//-------------------------------------------------------------------

function setDevice (req) {
	console.log ('SETDEVICE: ' + JSON.stringify (req));
	var ix = getDeviceIndex (req.sn);
	if (ix >= 0) {
		console.log ("setting " + ix);
		clients[ix].setBinaryState(req.val);
	}
	else {
		console.log ("device not found");
	}
//	return status;
}

module.exports.setDevice = setDevice;

//-------------------------------------------------------------------

function qSetDevice (req) {
	console.log ('QSETDEVICE: ' + JSON.stringify (req));
	var ix = getDeviceIndex (req.sn);
	if (ix >= 0) {
		console.log ("setting " + ix);
		clients[ix].setBinaryState(req.val);
	}
	else {
		console.log ("device not found");
	}
//	return status;
}

module.exports.qSetDevice = qSetDevice;



