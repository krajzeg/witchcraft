recipe("main")(

	from("src").grab("**/*.js").and(
		each(
			parseYAMLMetadata(),
			writeTo("build/files")
		)
	)

);
