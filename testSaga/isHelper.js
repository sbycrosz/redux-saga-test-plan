'use strict';

exports.__esModule = true;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = isHelper;

var _keys = require('../shared/keys');

function isHelper(generator) {
  return (typeof generator === 'undefined' ? 'undefined' : _typeof(generator)) === 'object' && generator != null && _keys.HELPER in generator;
}