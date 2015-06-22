var Promise = require('bluebird');

module.exports = {
	promisifyNodeStyle: function(fn) {
		return function() {
			var args = [].slice.apply(arguments);
			return new Promise(function(resolve, reject) {
				var callback = function(err, result) {
					if (err) return reject(err);
					return resolve(result);
				};
				fn.apply(null, args.concat([callback]));
			});		
		}
	}
};

