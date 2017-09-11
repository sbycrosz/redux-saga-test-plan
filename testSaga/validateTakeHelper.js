'use strict';

exports.__esModule = true;
exports.default = validateTakeHelper;

var _lodash = require('lodash.isequal');

var _lodash2 = _interopRequireDefault(_lodash);

var _createErrorMessage = require('./createErrorMessage');

var _createErrorMessage2 = _interopRequireDefault(_createErrorMessage);

var _keys = require('../shared/keys');

var _getFunctionName = require('./getFunctionName');

var _getFunctionName2 = _interopRequireDefault(_getFunctionName);

var _serializeTakePattern = require('./serializeTakePattern');

var _serializeTakePattern2 = _interopRequireDefault(_serializeTakePattern);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateTakeHelper(effectName, actual, expected, stepNumber) {
  var expectedTake = expected.next().value;
  var actualTake = actual.next().value;

  // null/undefined checks are primarily for flow typechecking
  if (expectedTake == null) {
    return (0, _createErrorMessage2.default)('expected ' + effectName + ' did not take a pattern', stepNumber);
  }

  if (actualTake == null) {
    return (0, _createErrorMessage2.default)('actual ' + effectName + ' did not take a pattern', stepNumber);
  }

  var expectedTakePattern = expectedTake[_keys.TAKE].pattern;
  var actualTakePattern = actualTake[_keys.TAKE].pattern;

  if (!(0, _lodash2.default)(actualTakePattern, expectedTakePattern)) {
    return (0, _createErrorMessage2.default)('expected ' + effectName + ' to watch pattern ' + (0, _serializeTakePattern2.default)(expectedTakePattern), stepNumber, actualTakePattern, expectedTakePattern);
  }

  var expectedFork = expected.next().value;
  var actualFork = actual.next().value;

  if (expectedFork == null) {
    return (0, _createErrorMessage2.default)('expected ' + effectName + ' did not fork', stepNumber);
  }

  if (actualFork == null) {
    return (0, _createErrorMessage2.default)('actual ' + effectName + ' did not fork', stepNumber);
  }

  var _expectedFork$FORK = expectedFork[_keys.FORK],
      expectedForkFn = _expectedFork$FORK.fn,
      expectedForkArgs = _expectedFork$FORK.args;
  var _actualFork$FORK = actualFork[_keys.FORK],
      actualForkFn = _actualFork$FORK.fn,
      actualForkArgs = _actualFork$FORK.args;


  if (expectedForkFn !== actualForkFn) {
    var expectedForkFnName = (0, _getFunctionName2.default)(expectedForkFn);

    return (0, _createErrorMessage2.default)('expected ' + effectName + ' to fork ' + expectedForkFnName, stepNumber, actualForkFn, expectedForkFn);
  }

  if (!(0, _lodash2.default)(expectedForkArgs, actualForkArgs)) {
    return (0, _createErrorMessage2.default)('arguments to ' + effectName + ' do not match', stepNumber, actualForkArgs, expectedForkArgs);
  }

  return null;
}