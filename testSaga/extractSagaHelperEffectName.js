'use strict';

exports.__esModule = true;
exports.default = extractSagaHelperEffectName;
function extractSagaHelperEffectName(name) {
  return name.replace(/^(\w+)\(.*$/, '$1');
}