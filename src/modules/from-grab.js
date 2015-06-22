var path = require('path');
var Promise = require('bluebird');

var File = require('../abstractions/file');
var Collection = require('../abstractions/collection');
var Flow = require('../abstractions/flow');

var promisify = require('../util/promises').promisifyNodeStyle;
var glob = promisify(require('glob'));

module.exports = {
	from: from
};


function from(rootDirectory) {	
	return {grab: grab};

	function grab(pattern) {
		return new Flow(function() {
			var globPattern = path.join(rootDirectory, pattern);
			var promisedFiles = glob(globPattern)
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
