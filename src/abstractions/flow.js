var Promise = require('bluebird');

module.exports = Flow;

function Flow(lazyValue) {
	// ensure laziness
	if (typeof lazyValue !== 'function')
		this.lazyValue = function() { return lazyValue; };
	else
		this.lazyValue = lazyValue;

	// initialize to unresolved
	this.resolved = false;
	this.resolvedValue = undefined;
};
Flow.prototype = {
	and: function() {
		var steps = [].slice.apply(arguments);
		return this.andApplySteps(steps);
	},

	andApplySteps: function(steps) {
		this.lazyValue = steps.reduce(appendStep, this.lazyValue);
		return this;
	},

	resolve: function() {
		var self = this;
		if (self.resolved)
			return Promise.resolve(self.resolvedValue);

		return Promise.resolve(self.lazyValue()).then(function(finalValue) {
			self.resolvedValue = finalValue;
			self.resolved = true;
			return finalValue;
		});
	}
}

function appendStep(lazyValue, step) {
	return function() {
		var evaluated = lazyValue();
		return deepResolve(evaluated).then(function(resolved) {
			return step(resolved);
		});
	}
}

function deepResolve(promise) {
	return Promise.resolve(promise).then(function(result) {
		if (result.items) {
			return Promise.all(result.items.map(deepResolve)).then(function(resolvedItems) {
				result.items = resolvedItems;
				return result;
			});
		} else {
			return result;
		}
	});
}
