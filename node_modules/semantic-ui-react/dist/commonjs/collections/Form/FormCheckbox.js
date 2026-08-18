"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var React = _interopRequireWildcard(require("react"));
var _lib = require("../../lib");
var _Checkbox = _interopRequireDefault(require("../../modules/Checkbox"));
var _FormField = _interopRequireDefault(require("./FormField"));
/**
 * Sugar for <Form.Field control={Checkbox} />.
 * @see Checkbox
 * @see Form
 */
var FormCheckbox = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$control = props.control,
    control = _props$control === void 0 ? _Checkbox.default : _props$control;
  var rest = (0, _lib.getUnhandledProps)(FormCheckbox, props);
  var ElementType = (0, _lib.getComponentType)(props, {
    defaultAs: _FormField.default
  });
  return /*#__PURE__*/React.createElement(ElementType, (0, _extends2.default)({}, rest, {
    control: control,
    ref: ref
  }));
});
FormCheckbox.handledProps = ["as", "control"];
FormCheckbox.displayName = 'FormCheckbox';
FormCheckbox.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _propTypes.default.elementType,
  /** A FormField control prop. */
  control: _FormField.default.propTypes.control
} : {};
var _default = exports.default = FormCheckbox;