"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
exports.__esModule = true;
exports.default = validateTrigger;
var React = _interopRequireWildcard(require("react"));
var ReactIs = _interopRequireWildcard(require("react-is"));
/**
 * Asserts that a passed element can be used cloned a props will be applied properly.
 */
function validateTrigger(element) {
  React.Children.only(element);
  if (ReactIs.isFragment(element)) {
    throw new Error('An "React.Fragment" cannot be used as a `trigger`.');
  }
}