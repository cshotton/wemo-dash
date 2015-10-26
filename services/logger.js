
var DEBUG_LEVEL = 0;

function log (mod, lvl, str) {
	if (lvl <= DEBUG_LEVEL) {
		console.log (mod + ": " + str);
	}
}

module.exports.log = log;
