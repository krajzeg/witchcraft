var _ = require('lodash');

module.exports = {
	recipe: recipe
};

function recipe(name) {
	return function(flow) {
		recipe.all = recipe.all || {};
		recipe.all[name] = flow;
		
		recipe.last = name;
	}
}
