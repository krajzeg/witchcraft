var Promise = require('bluebird');
var Collection = require('./collection');
var Flow = require('./flow');

module.exports = {
	each: each
};

function each() {	
	var stepsForEachItem = [].slice.apply(arguments);

	// this function will apply all the steps independently to each
	// item in the collection, and return a promise for a new collection
	return function(collection) {
		// each item gets an independent flow through all the steps
		// mostly for parallelism, but it's also simple to implement
		// that way
		var itemPromises = collection.items.map(function(item) {
			var takeTheItem = new Flow(item);
			return takeTheItem.andApplySteps(stepsForEachItem).resolve();
		});

		// return a new collection
		return Promise.all(itemPromises).then(function(items) {
			return new Collection(items);
		});
	};
}
