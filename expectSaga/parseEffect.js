'use strict';

exports.__esModule = true;
exports.default = parseEffect;

var _reduxSaga = require('redux-saga');

var _keys = require('../shared/keys');

/* eslint-disable no-cond-assign */
var asEffect = _reduxSaga.utils.asEffect,
    is = _reduxSaga.utils.is;
function parseEffect(effect) {
  var parsedEffect = void 0;

  switch (true) {
    case is.promise(effect):
      return { type: _keys.PROMISE, promise: effect };

    case is.notUndef(parsedEffect = asEffect.take(effect)):
      return {
        type: _keys.TAKE,
        effect: parsedEffect,
        providerKey: 'take'
      };

    case is.notUndef(parsedEffect = asEffect.put(effect)):
      return {
        type: _keys.PUT,
        effect: parsedEffect,
        providerKey: 'put'
      };

    case is.notUndef(parsedEffect = asEffect.race(effect)):
      return {
        type: _keys.RACE,
        effect: parsedEffect,
        providerKey: 'race'
      };

    case is.notUndef(parsedEffect = asEffect.call(effect)):
      return {
        type: _keys.CALL,
        effect: parsedEffect,
        providerKey: 'call'
      };

    case is.notUndef(parsedEffect = asEffect.cancel(effect)):
      return {
        type: _keys.CANCEL,
        effect: parsedEffect,
        providerKey: 'cancel'
      };

    case is.notUndef(parsedEffect = asEffect.cancelled(effect)):
      return {
        type: _keys.CANCELLED,
        effect: parsedEffect,
        providerKey: 'cancelled'
      };

    case is.notUndef(parsedEffect = asEffect.cps(effect)):
      return {
        type: _keys.CPS,
        effect: parsedEffect,
        providerKey: 'cps'
      };

    case is.notUndef(parsedEffect = asEffect.flush(effect)):
      return {
        type: _keys.FLUSH,
        effect: parsedEffect,
        providerKey: 'flush'
      };

    case is.notUndef(parsedEffect = asEffect.fork(effect)):
      return {
        type: _keys.FORK,
        effect: parsedEffect,
        providerKey: parsedEffect.detached ? 'spawn' : 'fork'
      };

    case is.notUndef(parsedEffect = asEffect.join(effect)):
      return {
        type: _keys.JOIN,
        effect: parsedEffect,
        providerKey: 'join'
      };

    case is.notUndef(parsedEffect = asEffect.select(effect)):
      return {
        type: _keys.SELECT,
        effect: parsedEffect,
        providerKey: 'select'
      };

    case is.notUndef(parsedEffect = asEffect.actionChannel(effect)):
      return {
        type: _keys.ACTION_CHANNEL,
        effect: parsedEffect,
        providerKey: 'actionChannel'
      };

    case is.notUndef(parsedEffect = asEffect.all(effect)):
      return { type: _keys.ALL, effects: parsedEffect };

    case Array.isArray(effect):
      return { type: _keys.ALL, effects: effect };

    default:
      return { type: _keys.NONE };
  }
}