#!/usr/bin/env node

var craft = require('../craft');
var args = require('yargs').argv;

return craft(parseOptions(args)).then(function() {
	console.log("Done.");
});

function parseOptions(args) {
	return {
		recipeName: (args._.length > 0) ? args._[0] : undefined
	};
}
