#!/usr/bin/env node

var craft = require('../craft');

return craft().then(function() {
	console.log("Done.");
});
