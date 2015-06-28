var Promise = require('bluebird');
var _ = require('lodash');
var promisify = Promise.promisify;

var CONTENTS = {pass: 'contents'};
module.exports = {
	pass: pass,

	CONTENTS: CONTENTS
};

function pass() {
	var args = [].slice.apply(arguments);
	var mainFn = undefined;
	var passType = null;

	passFileThroughFunction.async = async;
	return {
		through: through
	};

	function through(fn) {
		mainFn = fn;
		return passFileThroughFunction;
	}

	function async() {
		if (mainFn)
			mainFn = promisify(mainFn);
		else
			throw new Error("Use .async() after providing the transform function with .through().");

		return passFileThroughFunction;
	}

	function passFileThroughFunction(file) {
		var realArgs = args.map(realizeArgument.bind(null, file));
		var result = mainFn.apply(null, realArgs);
		return Promise.resolve(result).then(function(result) {
			return modifyFile(file, result);
		});
	}

	function realizeArgument(file, arg) {
		if (arg == CONTENTS) {
			setPassType(CONTENTS);
			return file.contents;
		}
		return arg;
	}

	function setPassType(type) {
		if (passType)	
			throw new Error("pass() can accept only one file component as input.")
		passType = type;
	}

	function modifyFile(file, result) {
		if (passType == CONTENTS) {
			return _.extend(file, {contents: result});
		}
	}
}
