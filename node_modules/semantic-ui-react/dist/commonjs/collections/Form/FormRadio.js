"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var React = _interopRequireWildcard(require("react"));
var _lib = require("../../lib");
var _Radio = _interopRequireDefault(require("../../addons/Radio"));
var _FormField = _interopRequireDefault(require("./FormField"));
/**
 * Sugar for <Form.Field control={Radio} />.
 * @see Form
 * @see Radio
 */
var FormRadio = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$control = props.control,
    control = _props$control === void 0 ? _Radio.default : _props$control;
  var rest = (0, _lib.getUnhandledProps)(FormRadio, props);
  var ElementType = (0, _lib.getComponentType)(props, {
    defaultAs: _FormField.default
  });
  return /*#__PURE__*/React.createElement(ElementType, (0, _extends2.default)({}, rest, {
    control: control,
    ref: ref
  }));
});
FormRadio.handledProps = ["as", "control"];
FormRadio.displayName = 'FormRadio';
FormRadio.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _propTypes.default.elementType,
  /** A FormField control prop. */
  control: _FormField.default.propTypes.control
} : {};
var _default = exports.default = FormRadio;