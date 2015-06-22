var from = require('./from-grab').from;
var build = require('./build').build;
var each = require('./each').each;

var main = from("src").grab("*.js").and(
	each(logPath, logPath),
	each(logPath)
);

build(main);

function logPath(file) {
	console.log(file.path);
	return file;
}
