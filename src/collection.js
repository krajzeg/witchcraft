var Promise = require('bluebird');

module.exports = Collection;

function Collection(items) {
	this.items = items;
}

Collection.prototype = {
	resolve: function() {
		var self = this;

		return resolveItems(self.items).then(function(resolved) {
			self.items = resolved;
			return self;
		});
	},

	and: function() {	
		var self = this;	
		
		var steps = [].slice.apply(arguments);
		self.items = steps.reduce(function(items, stepFn) {
			return resolveItems(items).then(stepFn);
		}, self.items);

		return self;
	}
}

function resolveItems(items) {
	return Promise.resolve(items).then(function(items) {
		return Promise.all(items);
	});
}
