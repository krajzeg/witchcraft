var _ = require('lodash');
var Flow = require('../abstractions/flow');
var BuildError = require('../util/errors').BuildError;

module.exports = {
	recipe: recipe
};

function recipe(name) {
	return function() {
		// get the list of Flows that was passed inside
		var flows = [].slice.apply(arguments);
		flows = flows.map(resolveFlow);

		// if we have a list, combine all those flows into one
		var flow;
		if (flows.length == 1) {
			flow = flows[0];
		} else {
			flow = Flow.combine(flows);
		}

		// add some logging
		flow.and(function(result) {
			console.log("Brewed '" + name + "'.");
			return result;
		});

		// and keep it all for future reference
		recipe.all = recipe.all || {};
		recipe.all[name] = flow;			
		recipe.last = name;
	}
}

function resolveFlow(flowSpec) {
	if (flowSpec instanceof Flow) return flowSpec;
	if (typeof flowSpec == 'string') {
		var flow = recipe.all[flowSpec];
		if (!flow)
			throw new BuildError("Recipe '" + flowSpec + "' does not exist.");
		return flow;
	}
}
