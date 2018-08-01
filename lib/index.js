"use strict";
var IOTA = require("iota.lib.js");

var api = require("./api");
var multisig = require('./multisig');

function AsyncIOTA(settings) {
  this._iota = new IOTA(settings);
  this.setSettings(settings);
}

/**
 *   Reset the libraries settings and internal objects
 *
 *   @method setSettings
 *   @param {Object} settings
 **/
AsyncIOTA.prototype.setSettings = function(settings) {
  this._iota.setSettings(settings);
  this.version = this._iota.version;
  this.host = this._iota.host;
  this.port = this._iota.port;
  this.provider = this._iota.provider;
  this.sandbox = this._iota.sandbox;
  this.token = this._iota.token;

  this._makeRequest = this._iota._makeRequest;
  this.api = new api(this._iota.api);
  // this.mam
  // this.flash
  this.utils = this._iota.utils;
  this.valid = this._iota.valid;
  this.multisig = new multisig(this._iota.multisig);
};


/**
 *   Change the Node the user connects to
 *
 *   @method changeNode
 *   @param {Object} settings
 **/
AsyncIOTA.prototype.changeNode = function(settings) {
  this.setSettings(settings);
};

module.exports = AsyncIOTA;
