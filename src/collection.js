var Promise = require('bluebird');

module.exports = Collection;

function Collection(items) {
	this.items = items;
}
