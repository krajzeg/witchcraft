var Promise = require('bluebird');
var path = require('path');
var promisify = require('../util/promises').promisifyNodeStyle;
var readFile = promisify(require('fs').readFile);

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
	return readFile(path.join(root, relativePath))
		.then(function(contents) {
			return new File(root, relativePath, contents.toString());
		});
}
