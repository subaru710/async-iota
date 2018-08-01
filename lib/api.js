'use strict'

var ASYNC_METHODS = ["sendCommand",
                     "attachToTangle",
                     "findTransactions",
                     "getBalances",
                     "getInclusionStates",
                     "getNodeInfo",
                     "getNeighbors",
                     "addNeighbors",
                     "removeNeighbors",
                     "getTips",
                     "getTransactionsToApprove",
                     "getTrytes",
                     "interruptAttachingToTangle",
                     "broadcastTransactions",
                     "storeTransactions",
                     "getTransactionsObjects",
                     "findTransactionObjects",
                     "getLatestInclusion",
                     "storeAndBroadcast",
                     "sendTrytes",
                     "sendTransfer",
                     "promoteTransaction",
                     "replayBundle",
                     "broadcastBundle",
                     "getNewAddress",
                     "getInputs",
                     "prepareTransfers",
                     "traverseBundle",
                     "getBundle",
                     "_bundlesFromAddresses",
                     "getTransfers",
                     "getAccountData",
                     "isReattachable",
                     "wereAddressesSpentFrom"
];

var SYNC_METHODS = [
  "_newAddress",
  "isPromotable"
];


function AsyncApi(api) {
  this._api = api;
}

ASYNC_METHODS.forEach(defineAsync);
SYNC_METHODS.forEach(definePassthrough);

function definePassthrough(name) {
  AsyncApi.prototype[name] = function() {
    var api = this._api;
    return api[name].apply(api, arguments);
  };
}

function defineAsync(name) {
  AsyncApi.prototype[name] = function asyncMethod() {
    var api = this._api;
    var args = [];
    var length = arguments.length;
    var i = 0;
    for (i; i < length; i++)
      args.push(arguments[i]);

    return new Promise(function(resolve, reject) {
      args.push(makeCallback(resolve, reject));
      api[name].apply(api, args);
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

module.exports = AsyncApi;