//--------- qsetdevice -------
var express = require('express');
var router = express.Router();
var ws = require ('./../wemo-services');

var logger = require ('../services/logger');

var MODULE_NAME = "qsetdevice";

router.get ('/', function (req, res) {
	logger.log (MODULE_NAME, 0, ":");
	ws.qSetDevice (req.query);
	res.send ('OK');
});

module.exports = router;
