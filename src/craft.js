var _ = require('lodash');
var Promise = require('bluebird');
var promisify = require('./util/promises').promisifyNodeStyle;
var BuildError = require('./util/errors').BuildError;
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
			throw new BuildError("Cannot find craftfile at: " + craftfilePath);
		require(craftfilePath);

		// find the right recipe
		var recipeName = options.recipeName || recipe.last;
		var chosenRecipe = recipe.all[recipeName];
		if (!chosenRecipe)
			throw new BuildError("No recipe called '" + recipeName + "' found in the craftfile.");

		// build it!
		return build(chosenRecipe);
	});
}

function applyDefaults(options) {
	return _.defaults(options || {}, {		
		craftFile: path.join(process.cwd(), 'craftfile.js')
	});
}

function gatherModules() {
	// simple built-in modules that simply live in the modules subdir
	var localModulePattern = path.join(__dirname, "modules/*.js");
	// separate npm modules that are shipped with the base witchcraft build
	var vendoredPluginsPattern = path.join(__dirname, "../node_modules/witch-*");
	// npm modules that are installed in the current directory
	var cwdPluginsPattern = path.join(process.cwd(), "node_modules/witch-*");

	var patterns = [localModulePattern, vendoredPluginsPattern, cwdPluginsPattern];
	var globPromises = patterns.map(function(pattern) {
		return glob(pattern); // this function prevents glob() from getting more than 1 parameter
	});
	return Promise.all(globPromises).then(function(globResults) {
		return [].concat.apply([], globResults);
	});
}

function discoverGlobals() {	
	return gatherModules().then(function(moduleFiles) {
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
