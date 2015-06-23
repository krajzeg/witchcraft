recipe("main")(

	from("src").grab("**/*.js").and(
		each(writeTo("build/files"))
	)

);
