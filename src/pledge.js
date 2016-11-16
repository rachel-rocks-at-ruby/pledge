'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js deferral-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:
let $Promise = function() {
  this._state = 'pending';
  this._value = {};
}
let Deferral = function() {
  this.$promise = new $Promise;
}
let defer = function() {
  return new Deferral;
}
Deferral.prototype.resolve = function(data) {
  if (this.$promise._state === 'pending') {
    this.$promise._value = data;
    this.$promise._state = 'fulfilled';
  }
}
Deferral.prototype.reject = function(data) {
  if (this.$promise._state === 'pending') {
    this.$promise._value = data;
    this.$promise._state = 'rejected';
  }
}


/*-------------------------------------------------------
The spec was designed to work with Test'Em, so we don't
actually use module.exports. But here it is for reference:

module.exports = {
  defer: defer,
};

So in a Node-based project we could write things like this:

var pledge = require('pledge');
…
var myDeferral = pledge.defer();
var myPromise1 = myDeferral.$promise;
--------------------------------------------------------*/
