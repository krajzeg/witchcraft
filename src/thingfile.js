recipe("main")(

	from("src").grab("*.js").and(
		each(logPath, logPath),
		each(logPath)
	)

);

function logPath(file) {
	console.log(file.path);
	return file;
}
