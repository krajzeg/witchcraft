var from = require('./from-grab').from;

from("src").grab("*.js").and(logPaths).resolve().then(function() {
	console.log("Done.");
});

function logPaths(files) {
	files.map(function(file) {
		console.log(file.path);
	});
	return files;
}
