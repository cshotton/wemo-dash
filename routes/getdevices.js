//--------- getdevices -------
var express = require('express');
var router = express.Router();
var ws = require ('./../wemo-services');

var logger = require ('../services/logger');

var MODULE_NAME = "getdevices";

router.get ('/', function (req, res) {
//	logger.log (MODULE_NAME, 0, ":");
	res.send (ws.getDeviceList());
});

module.exports = router;
