"use strict";
"use client";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
exports.__esModule = true;
exports.default = usePortalElement;
var React = _interopRequireWildcard(require("react"));
var _reactIs = _interopRequireDefault(require("react-is"));
var _lib = require("../../lib");
/**
 * Assigns merged ref to an existing element is possible or wraps it with an additional "div".
 *
 * @param {React.ReactNode} node
 * @param {React.Ref} userRef
 */
function usePortalElement(node, userRef) {
  var ref = (0, _lib.useMergedRefs)(node.ref, userRef);
  if ( /*#__PURE__*/React.isValidElement(node)) {
    if (_reactIs.default.isForwardRef(node)) {
      return /*#__PURE__*/React.cloneElement(node, {
        ref: ref
      });
    }
    if (typeof node.type === 'string') {
      return /*#__PURE__*/React.cloneElement(node, {
        ref: ref
      });
    }
  }
  return /*#__PURE__*/React.createElement("div", {
    "data-suir-portal": "true",
    ref: ref
  }, node);
}
usePortalElement.handledProps = [];