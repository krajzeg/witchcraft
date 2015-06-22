var path = require('path');
var glob = require('glob');
var Promise = require('bluebird');

var File = require('./file');
var Collection = require('./collection');
var Flow = require('./flow');

module.exports = {
	from: from
};


function from(rootDirectory) {	
	return {grab: grab};

	function grab(pattern) {
		return new Flow(function() {
			var globPattern = path.join(rootDirectory, pattern);
			var promisedFiles = doAGlob(globPattern)
				.then(function(absolutePaths) {
					return absolutePaths.map(function(absolutePath) {
						var relativePath = path.relative(rootDirectory, absolutePath);
						return File.read(rootDirectory, relativePath);
					});
				});

			return new Collection(promisedFiles);
		});
	}
}

function doAGlob(pattern) {
	return new Promise(function(resolve, reject) {
		glob(pattern, {}, function(err, files) {
			if (err) return reject(err);
			return resolve(files);
		});
	});
}
