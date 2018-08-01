<h1 align="center">async-mqtt</h1>
<p align="center">Promise wrapper over iota.lib.js</p>

**IMPORTANT: Make sure you handle rejections from returned promises because they won't crash the process**

## API

The API is the same as [iota.lib.js](https://github.com/iotaledger/iota.lib.js#iotaapi), except some functions now return promises instead
 of taking callbacks.


## Example

```javascript
var IOTA = require("async-iota");

// Create IOTA instance with host and port as provider
var iota = new IOTA({
    'host': 'http://localhost',
    'port': 14265
});

// Create IOTA instance directly with provider
var iota = new IOTA({
    'provider': 'http://localhost:14265'
});

// now you can start using all of the functions in promise way
iota.api.getNodeInfo().then(function(result) {
    console.log(result);
}).catch(function(error) {
    console.error(error);
});

// now you can start using all of the functions in async/await way
async function doStuff() {
  try {
    const result = await
    iota.api.getNodeInfo();
    console.log(result);
  } catch (e) {
    console.error(e);
  }
}
doStuff();
    
// you can also get the version
console.log(iota.version);
```
