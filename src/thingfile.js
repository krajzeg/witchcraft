var main = from("src").grab("*.js").and(
	each(logPath, logPath),
	each(logPath)
);

build(main);

function logPath(file) {
	console.log(file.path);
	return file;
}
