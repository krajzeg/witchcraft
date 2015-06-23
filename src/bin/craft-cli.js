#!/usr/bin/env node

var BuildError = require('../util/errors').BuildError;
var craft = require('../craft');

var args = require('yargs').argv;

return craft(parseOptions(args)).then(function() {
	console.log("Done.");
}).catch(function(err) {
	if (err instanceof BuildError) {	
		console.error(err.message);
	} else {
		console.error(err.stack || err);
	}
	process.exit(1);
});

function parseOptions(args) {
	return {
		recipeName: (args._.length > 0) ? args._[0] : undefined
	};
}
