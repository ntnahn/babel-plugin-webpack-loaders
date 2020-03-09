"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

// copypasted from rackt/reselect
var defaultEqualityCheck = function defaultEqualityCheck(a, b) {
  return a === b;
};

var _default = function _default(func) {
  var equalityCheck = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : defaultEqualityCheck;
  var lastArgs = null;
  var lastResult = null;
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    if (lastArgs !== null && lastArgs.length === args.length && args.every(function (value, index) {
      return equalityCheck(value, lastArgs[index]);
    })) {
      return lastResult;
    }

    lastArgs = args;
    lastResult = func.apply(void 0, args);
    return lastResult;
  };
};

exports["default"] = _default;