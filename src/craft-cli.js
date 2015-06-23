#!/usr/bin/env node

var _ = require('lodash');
var Promise = require('bluebird');
var promisify = require('./util/promises').promisifyNodeStyle;

var fs = require('fs');
var path = require('path');
var glob = promisify(require('glob'));

function createThingfileGlobals() {
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

createThingfileGlobals().then(function(thingGlobals) {
	// add our modules to the global object so they'll be easily accessible
	// to the craftfile
	_.extend(global, thingGlobals);
	
	// require the craftfile
	var craftfilePath = path.join(process.cwd(), 'craftfile.js');
	if (!fs.existsSync(craftfilePath))
		throw new Error("Cannot find craftfile at: " + craftfilePath);
	require(craftfilePath);

	// run the last recipe
	build(recipe.last);
});
