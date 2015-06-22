var Promise = require('bluebird');
var promisify = require('./util/promises').promisifyNodeStyle;

var glob = promisify(require('glob'));
