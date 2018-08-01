var IOTA = require('../lib/index');

// Create IOTA instance directly with provider
var iota = new IOTA({
  'provider': 'http://localhost:14265'
});

// now you can start using all of the functions in async/await way
async function doStuff() {
  try {
    const result = await iota.api.getNodeInfo();
    console.log(result);
  } catch (e) {
    console.error(e);
  }
}

doStuff();
// you can also get the version
console.log(iota.version);