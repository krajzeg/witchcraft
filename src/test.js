var from = require('./modules/from-grab').from;
var build = require('./modules/build').build;
var each = require('./modules/each').each;

var main = from("src").grab("*.js").and(
	each(logPath, logPath),
	each(logPath)
);

build(main);

function logPath(file) {
	console.log(file.path);
	return file;
}
