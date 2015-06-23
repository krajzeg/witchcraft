var util = require('util');

module.exports = {
	BuildError: BuildError
}

function BuildError(message) {
	Error.call(this);
	this.message = message;
}
util.inherits(BuildError, Error);
