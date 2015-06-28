var assert = require('chai').assert;
var Promise = require('bluebird');

var pass = require('../src/modules/pass-through').pass;
var CONTENTS = require('../src/modules/pass-through').CONTENTS;

describe("pass()..through()", function() {
	var file = {contents: "Hello."};
	
	it("should work with synchronous functions", function(done) {
		var fileToUpper = pass(CONTENTS).through(function(s) { return s.toUpperCase(); });

		fileToUpper(file).then(function(result) {
			assert.equal(result.contents, "HELLO.");
		}).then(done).catch(done);
	});

	it("should work with promise-based functions", function(done) {
		var fileToUpper = pass(CONTENTS).through(promiseToUpper);

		fileToUpper(file).then(function(result) {
			assert.equal(result.contents, "HELLO.");
		}).then(done).catch(done);
	});

	it("should work with callback-based functions with .async()", function(done) {
		var fileToUpper = pass(CONTENTS).through(asyncToUpper).async();

		fileToUpper(file).then(function(result) {
			assert.equal(result.contents, "HELLO.");
		}).then(done).catch(done);
	});

	it("should be able to pass additional parameters", function(done) {
		var fileToUpper = pass('toUpperCase', CONTENTS).through(function(method, obj) {
			return obj[method]();
		});

		fileToUpper(file).then(function(result) {
			assert.equal(result.contents, "HELLO.");
		}).then(done).catch(done);
	});
});

function promiseToUpper(s) {
	return new Promise(function(resolve) {
		process.nextTick(function() {
			resolve(s.toUpperCase());
		});
	});
}

function asyncToUpper(s, callback) {
	process.nextTick(function() {
		callback(null, s.toUpperCase());
	});
}