'use strict';

exports.__esModule = true;
exports.default = validateHelperNamesMatch;

var _createErrorMessage = require('./createErrorMessage');

var _createErrorMessage2 = _interopRequireDefault(_createErrorMessage);

var _extractSagaHelperEffectName = require('./extractSagaHelperEffectName');

var _extractSagaHelperEffectName2 = _interopRequireDefault(_extractSagaHelperEffectName);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function validateHelperNamesMatch(effectName, actual, stepNumber) {
  // Delegated helpers won't have a name property
  if (typeof actual.name === 'string') {
    var actualEffectName = (0, _extractSagaHelperEffectName2.default)(actual.name);

    if (actualEffectName !== effectName) {
      return (0, _createErrorMessage2.default)('expected a ' + effectName + ' helper effect, but the saga used a ' + (actualEffectName + ' helper effect'), stepNumber, actualEffectName, effectName);
    }
  }

  return null;
}