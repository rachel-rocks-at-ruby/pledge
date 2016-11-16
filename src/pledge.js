'use strict';
/*----------------------------------------------------------------
Promises Workshop: build the pledge.js deferral-style promise library
----------------------------------------------------------------*/
// YOUR CODE HERE:
let $Promise = function() {
  this._state = 'pending';
  this._value = {};
  this._handlerGroups = [];
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
  this.$promise.callHandlers();
}

Deferral.prototype.reject = function(data) {
  if (this.$promise._state === 'pending') {
    this.$promise._value = data;
    this.$promise._state = 'rejected';
  }
  this.$promise.callHandlers();
}

$Promise.prototype.then = function(successCb, errorCb) {
  let promiseCbs = {
    successCb: typeof successCb === 'function' ? successCb : 0,
    errorCb: typeof errorCb === 'function' ? errorCb : 0
  };
  this._handlerGroups.push(promiseCbs);
  if (this._state !== 'pending') this.callHandlers();
}


$Promise.prototype.catch = function (myFunc) {
  this.then(null, myFunc);
};

$Promise.prototype.callHandlers = function (){
  while (this._handlerGroups.length){
    if (this._state === 'rejected') {
      let cb = this._handlerGroups.shift();
      if (cb.errorCb) {cb.errorCb(this._value)};
    } else if (this._state === 'fulfilled') {
      let cb = this._handlerGroups.shift();
      if (cb.successCb) {cb.successCb(this._value)};
    }
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
