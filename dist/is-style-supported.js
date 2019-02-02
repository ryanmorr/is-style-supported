/*! @ryanmorr/is-style-supported v0.1.0 | https://github.com/ryanmorr/is-style-supported */
(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.isStlyeSupported = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isStyleSupported;

/*
 * Common varilables
 */
var el = document.createElement('div');
var prefixes = ['Webkit', 'Moz', 'O', 'ms'];
var camelRe = /-([a-z]|[0-9])/ig;
/*
 * Convert kebab-case to camel-case
 *
 * @param {String} prop
 * @return {String}
 */

function toCamelCase(prop) {
  return prop.replace(camelRe, function (all, char) {
    return (char + '').toUpperCase();
  });
}
/*
 * Check the native `CSS.supports`
 * method if it exists
 *
 * @param {String} prop
 * @param {String} value (optional)
 * @return {Boolean}
 */


function checkNativeSupport(prop, value) {
  if (CSS && CSS.supports) {
    return CSS.supports(prop, value);
  }

  return false;
}
/*
 * Determine support by applying the
 * property/value to the test element
 * and checking if the property exists
 * in the style object
 *
 * @param {String} prop
 * @param {String} camel
 * @param {String} value
 * @return {Boolean}
 */


function canSetProperty(prop, camel, value) {
  var support = camel in el.style;

  if (value === 'inherit') {
    return support;
  }

  el.style.cssText = prop + ':' + value;
  return support && el.style[camel] !== '';
}
/*
 * Detect support for CSS properties and
 * their assignable values
 *
 * @param {String} prop
 * @param {String} value (optional)
 * @return {Boolean}
 */


function isStyleSupported(prop, value) {
  value = arguments.length === 2 ? value : 'inherit';
  var support = checkNativeSupport(prop, value);

  if (support) {
    return true;
  }

  var camel = toCamelCase(prop);
  var capitalized = camel.charAt(0).toUpperCase() + camel.slice(1);
  support = canSetProperty(prop, camel, value);
  var length = prefixes.length;

  while (!support && length--) {
    var prefixed = '-' + prefixes[length].toLowerCase() + '-' + prop;
    support = checkNativeSupport(prefixed, value);

    if (!support) {
      camel = prefixes[length] + capitalized;
      support = canSetProperty(prefixed, camel, value);
    }
  }

  return support;
}

module.exports = exports.default;

},{}]},{},[1])(1)
});

