var Promise = require('bluebird');

module.exports = Collection;

function Collection(items) {
	this.items = items;
}

Collection.prototype = {
	resolve: function resolve() {
		var self = this;

		return Promise.resolve(self.items).then(function(items) {
			return Promise.all(items);
		}).then(function(items) {
			self.items = items;
			return self;
		});
	}
}
