var _ = require('lodash');
var Promise = require('bluebird');
var promisify = require('./util/promises').promisifyNodeStyle;

var fs = require('fs');
var path = require('path');
var glob = promisify(require('glob'));

// ======================================================================

module.exports = craft;

function craft(options) {
	// use defaults for the options that weren't provided
	options = applyDefaults(options);

	return discoverGlobals().then(function(ourGlobals) {
		// add our modules to the global object so they'll be easily accessible
		// to the craftfile
		_.extend(global, ourGlobals);

		// require the craftfile
		var craftfilePath = path.join(process.cwd(), 'craftfile.js');
		if (!fs.existsSync(craftfilePath))
			throw new Error("Cannot find craftfile at: " + craftfilePath);
		require(craftfilePath);

		// build the last recipe
		return build(recipe.last);
	});
}

function discoverGlobals() {
	var modulePattern = path.join(__dirname, "modules/*.js");
	return glob(modulePattern).then(function(moduleFiles) {
		return moduleFiles.map(function(moduleFile) {
			var moduleName = moduleFile.replace(".js", "");
			var module = require(moduleName);
			return module;
		});
	}).then(function(exportsObjects) {
		return exportsObjects.reduce(function(globals, exports) {
			return _.extend(globals, exports);
		}, {});
	});
}

function applyDefaults(options) {
	return _.defaults(options || {}, {

	});
}