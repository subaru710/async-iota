'use strict'

var ASYNC_METHODS = ["initiateTransfer",
                     "addSignature"
];

var SYNC_METHODS = [
  "getKey",
  "getDigest",
  "validateAddress"
];


function AsyncMultisig(multisig) {
  this._multisig = multisig;
}


AsyncMultisig.prototype = {
  get address() {
    return this._multisig.address;
  }
};

ASYNC_METHODS.forEach(defineAsync);
SYNC_METHODS.forEach(definePassthrough);

function definePassthrough(name) {
  AsyncMultisig.prototype[name] = function() {
    var multisig = this._multisig;
    return multisig[name].apply(multisig, arguments);
  };
}

function defineAsync(name) {
  AsyncMultisig.prototype[name] = function asyncMethod() {
    var multisig = this._multisig;
    var args = [];
    var length = arguments.length;
    var i = 0;
    for (i; i < length; i++)
      args.push(arguments[i]);

    return new Promise(function(resolve, reject) {
      args.push(makeCallback(resolve, reject));
      multisig[name].apply(multisig, args);
    });
  };
}

function makeCallback(resolve, reject) {
  return function(err, data) {
    if (err)
      reject(err);
    else resolve(data);
  };
}

module.exports = AsyncMultisig;