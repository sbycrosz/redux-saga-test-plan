'use strict';

exports.__esModule = true;
exports.default = validateEffects;

var _lodash = require('lodash.isequal');

var _lodash2 = _interopRequireDefault(_lodash);

var _createErrorMessage = require('./createErrorMessage');

var _createErrorMessage2 = _interopRequireDefault(_createErrorMessage);

var _validateHelperNamesMatch = require('./validateHelperNamesMatch');

var _validateHelperNamesMatch2 = _interopRequireDefault(_validateHelperNamesMatch);

var _validateTakeHelper = require('./validateTakeHelper');

var _validateTakeHelper2 = _interopRequireDefault(_validateTakeHelper);

var _validateThrottleHelper = require('./validateThrottleHelper');

var _validateThrottleHelper2 = _interopRequireDefault(_validateThrottleHelper);

var _isHelper = require('./isHelper');

var _isHelper2 = _interopRequireDefault(_isHelper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateEffects(eventChannel, effectName, effectKey, isHelperEffect, actual, expected, stepNumber) {
  var expectedIsHelper = (0, _isHelper2.default)(expected);
  var actualIsHelper = (0, _isHelper2.default)(actual);

  var finalEffectName = expectedIsHelper ? effectName + ' helper' : effectName;

  if (actual == null) {
    return (0, _createErrorMessage2.default)('expected ' + finalEffectName + ' effect, but the saga yielded nothing', stepNumber, actual, expected, effectKey);
  }

  if (!Array.isArray(actual) && actualIsHelper && !Array.isArray(expected) && expectedIsHelper) {
    var errorMessage = (0, _validateHelperNamesMatch2.default)(effectName, actual, stepNumber);

    if (errorMessage) {
      return errorMessage;
    }

    if (effectName === 'throttle') {
      return (0, _validateThrottleHelper2.default)(eventChannel, effectName, actual, expected, stepNumber);
    }

    return (0, _validateTakeHelper2.default)(effectName, actual, expected, stepNumber);
  }

  if (Array.isArray(actual) && !Array.isArray(expected)) {
    return (0, _createErrorMessage2.default)('expected ' + finalEffectName + ' effect, but the saga yielded parallel effects', stepNumber, actual, expected, effectKey);
  }

  if (!Array.isArray(actual) && Array.isArray(expected)) {
    return (0, _createErrorMessage2.default)('expected parallel effects, but the saga yielded a single effect', stepNumber, actual, expected, effectKey);
  }

  var bothEqual = (0, _lodash2.default)(actual, expected);

  var effectsDifferent = isHelperEffect && !bothEqual || !isHelperEffect && (!Array.isArray(actual) && !actual[effectKey] || !Array.isArray(expected) && !expected[effectKey]);

  if (effectsDifferent) {
    return (0, _createErrorMessage2.default)('expected ' + finalEffectName + ' effect, but the saga yielded a different effect', stepNumber, actual, expected);
  }

  if (!bothEqual) {
    return (0, _createErrorMessage2.default)(finalEffectName + ' effects do not match', stepNumber, actual, expected, effectKey);
  }

  return null;
}