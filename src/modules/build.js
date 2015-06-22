var Promise = require('bluebird');

module.exports = {
	build: build
};

function build() {
	var flows = [].slice.apply(arguments);
	return Promise.all(flows.map(function(flow) {
		return flow.resolve();
	})).then(function() {
		console.log("Done building.");
	});
}
