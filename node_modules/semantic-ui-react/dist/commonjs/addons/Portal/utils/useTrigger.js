"use strict";
"use client";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
exports.__esModule = true;
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _lib = require("../../../lib");
var _validateTrigger = _interopRequireDefault(require("./validateTrigger"));
/**
 * @param {React.ReactNode} trigger
 * @param {React.Ref} triggerRef
 */
function useTrigger(trigger, triggerRef) {
  var ref = (0, _lib.useMergedRefs)(trigger == null ? void 0 : trigger.ref, triggerRef);
  if (trigger) {
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      (0, _validateTrigger.default)(trigger);
    }
    return [ref, /*#__PURE__*/React.cloneElement(trigger, {
      ref: ref
    })];
  }
  return [ref, null];
}
var _default = exports.default = useTrigger;