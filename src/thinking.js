

function File(root, path, contents) {
	this.root = root;
	this.path = path;
	if (content !== undefined) {
		this.contents = fs.readFileSync(this.fullPath()).toString();
	} else {
		this.contents = contents;
	}
}



t.from("src/posts")
 .grab("**/*.md")
 .then(each(extractYamlMetadata()))
 .then(each(extractFileMetadata()))
 .then(filter({published: true}))
 .then(each(generatePath()))
 .then(each(writeTo("build/")))


t.from("src/posts")
 .each(extractYamlMetadata())
 .each(extractFileMetadata())
 .all(filter({published: true}))
 .each(generatePath())
 .each(writeTo("build/"))

var allPosts = 
	t.from("src/posts")
		.each(
			extractYamlMetadata(),
			extractFileMetadata()
		)
		.all(
			filter({published: true}),
			generate(indexFile())
		)
		.each(
			generateURL(),
			writeTo("build/")
		);

from("src/posts").grab("**/*.md").and(
	each(
		extractYamlMetadata(),
		extractFileMetadata()
	),
	filter(function(file) { return !file.draft; }),
	each(
		generateURL()
	),
	generate(indexPages()),
	generate(tagPages()),
	each(
		renderMarkdown(),
		applyTemplates(),

	)

);

from("src/styles").grab("main.scss").and(
	withThisOneFile(		
		compileWithSASS(),
		renameTo("main.css")
		writeTo("build/public")
	),
);

combine(allPosts, generatedPages).and(
	each(writeTo("build/"))
)
