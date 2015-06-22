var from = require('./from-grab').from;
var build = require('./build').build;

var main = from("src").grab("*.js").and(
	logPaths,
	logPaths
);

build(main);

function logPaths(files) {
	console.log("All the paths:");
	files.map(function(file) {
		console.log("\t" + file.path);
	});
	return files;
}
