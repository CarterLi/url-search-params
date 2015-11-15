require('../index.js');
var assert = require('assert');

var params = new global.URLSearchParams('keyName=keyValue');

assert.equal(params.has('keyName'), true);
assert.equal(params.get('keyName'), 'keyValue');

console.log('all tests passed');
