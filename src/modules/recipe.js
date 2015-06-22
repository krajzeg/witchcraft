var _ = require('lodash');

module.exports = {
	recipe: recipe
};

function recipe(name) {
	return function(flow) {
		recipe.all = _.extend(recipe.all || {}, {name: flow});
		recipe.last = flow;
	}
}
