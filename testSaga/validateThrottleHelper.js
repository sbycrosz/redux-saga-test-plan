'use strict';

exports.__esModule = true;
exports.fakeChannelCreator = undefined;
exports.default = validateThrottleHelper;

var _lodash = require('lodash.isequal');

var _lodash2 = _interopRequireDefault(_lodash);

var _createErrorMessage = require('./createErrorMessage');

var _createErrorMessage2 = _interopRequireDefault(_createErrorMessage);

var _serializeTakePattern = require('./serializeTakePattern');

var _serializeTakePattern2 = _interopRequireDefault(_serializeTakePattern);

var _getFunctionName = require('./getFunctionName');

var _getFunctionName2 = _interopRequireDefault(_getFunctionName);

var _keys = require('../shared/keys');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fakeChannelCreator = exports.fakeChannelCreator = function fakeChannelCreator() {
  return function () {};
};
function validateThrottleHelper(eventChannel, effectName, actual, expected, stepNumber) {
  var expectedActionChannel = expected.next().value;
  var actualActionChannel = actual.next().value;

  // null/undefined checks are primarily for flow typechecking
  if (expectedActionChannel == null) {
    return (0, _createErrorMessage2.default)('expected ' + effectName + ' did not request an action channel', stepNumber);
  }

  if (actualActionChannel == null) {
    return (0, _createErrorMessage2.default)('actual ' + effectName + ' did not request an action channel', stepNumber);
  }

  var expectedActionChannelPattern = expectedActionChannel[_keys.ACTION_CHANNEL].pattern;
  var actualActionChannelPattern = actualActionChannel[_keys.ACTION_CHANNEL].pattern;

  if (!(0, _lodash2.default)(actualActionChannelPattern, expectedActionChannelPattern)) {
    return (0, _createErrorMessage2.default)('expected ' + effectName + ' to watch pattern ' + ('' + (0, _serializeTakePattern2.default)(expectedActionChannelPattern)), stepNumber, actualActionChannelPattern, expectedActionChannelPattern);
  }

  // Consume the channel TAKE without checking it
  expected.next(eventChannel(fakeChannelCreator));
  actual.next(eventChannel(fakeChannelCreator));

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

  var expectedCall = expected.next().value;
  var actualCall = actual.next().value;

  if (expectedCall == null) {
    return (0, _createErrorMessage2.default)('expected ' + effectName + ' did not call delay', stepNumber);
  }

  if (actualCall == null) {
    return (0, _createErrorMessage2.default)('actual ' + effectName + ' did not call delay', stepNumber);
  }

  var _expectedCall$CALL$ar = expectedCall[_keys.CALL].args,
      expectedDelay = _expectedCall$CALL$ar[0];
  var _actualCall$CALL$args = actualCall[_keys.CALL].args,
      actualDelay = _actualCall$CALL$args[0];


  if (expectedDelay !== actualDelay) {
    return (0, _createErrorMessage2.default)('expected ' + effectName + ' to be delayed by ' + expectedDelay + ' ms', stepNumber, actualDelay, expectedDelay);
  }

  return null;
}