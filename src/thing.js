var _ = require('lodash');
var Promise = require('bluebird');
var promisify = require('./util/promises').promisifyNodeStyle;

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
	// to the Thingfile
	_.extend(global, thingGlobals);
	
	// require the thingfile
	require('./thingfile');
});
