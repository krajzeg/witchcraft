var Promise = require('bluebird');
var path = require('path');
var fs = require('fs');

module.exports = File;

function File(root, path, contents) {
	this.root = root;
	this.path = path;
	this.contents = contents;
};

File.prototype = {
	fullPath: function() { return path.join(this.root, this.path); },
	toString: function() { return "File[" + this.fullPath() + "]"; }
}

File.read = function(root, relativePath) {
	return readFileContents(path.join(root, relativePath))
		.then(function(contents) {
			return new File(root, relativePath, contents);
		});
}


function readFileContents(path) {
	return new Promise(function(resolve, reject) {
		fs.readFile(path, function(err, f) {
			if (err) return reject(err);
			return resolve(f.toString());
		});
	});
}
