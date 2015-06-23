var path = require('path');
var promisify = require('../util/promises').promisifyNodeStyle;
var mkdirp = promisify(require('mkdirp'));
var writeFile = promisify(require('fs').writeFile);

module.exports = {
	writeTo: writeTo
};

// Creates a step that writes a file to a given directory.
function writeTo(directory) {
	return function(file) {
		var finalPath = path.join(directory, file.path);
		var finalDir = path.dirname(finalPath);

		// make sure the directory where we want to put the file exists
		return mkdirp(finalDir).then(function() {
			// write the file there
			return writeFile(finalPath, file.contents);
		}).then(function() {
			// and return it unchanged
			return file;
		});
	}
}
