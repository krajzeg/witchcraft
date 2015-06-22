var from = require('./from-grab').from;

from("src").grab("*.js").resolve().then(function(c) {
	console.log(c.items.map(function(f) {
		return f.fullPath();
	}));
});
