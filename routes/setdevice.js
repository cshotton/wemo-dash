//--------- setdevice -------
var express = require('express');
var router = express.Router();
var ws = require ('./../wemo-services');

var logger = require ('../services/logger');

var MODULE_NAME = "setdevice";

router.post ('/', function (req, res, next) {
	logger.log (MODULE_NAME, 0, ":");
	ws.setDevice (req.body);
	res.send ('{"err":"0"}');
});

module.exports = router;
