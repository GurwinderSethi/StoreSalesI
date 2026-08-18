"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var React = _interopRequireWildcard(require("react"));
var _lib = require("../../lib");
var _Select = _interopRequireDefault(require("../../addons/Select"));
var _Dropdown = _interopRequireDefault(require("../../modules/Dropdown"));
var _FormField = _interopRequireDefault(require("./FormField"));
/**
 * Sugar for <Form.Field control={Select} />.
 * @see Form
 * @see Select
 */
var FormSelect = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$control = props.control,
    control = _props$control === void 0 ? _Select.default : _props$control,
    options = props.options;
  var rest = (0, _lib.getUnhandledProps)(FormSelect, props);
  var ElementType = (0, _lib.getComponentType)(props, {
    defaultAs: _FormField.default
  });
  return /*#__PURE__*/React.createElement(ElementType, (0, _extends2.default)({}, rest, {
    control: control,
    options: options,
    ref: ref
  }));
});
FormSelect.handledProps = ["as", "control", "options"];
FormSelect.displayName = 'FormSelect';
FormSelect.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _propTypes.default.elementType,
  /** A FormField control prop. */
  control: _FormField.default.propTypes.control,
  /** Array of Dropdown.Item props e.g. `{ text: '', value: '' }` */
  options: _propTypes.default.arrayOf(_propTypes.default.shape(_Dropdown.default.Item.propTypes)).isRequired
} : {};
var _default = exports.default = FormSelect;