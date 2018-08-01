var IOTA = require('../lib/index');

// Create IOTA instance with host and port as provider
var iota = new IOTA({
  'host': 'http://localhost',
  'port': 14265
});

// now you can start using all of the functions in promise way
iota.api.getNodeInfo().then(function(result) {
  console.log(result);
}).catch(function(error) {
  console.error(error);
});

// you can also get the version
console.log(iota.version);