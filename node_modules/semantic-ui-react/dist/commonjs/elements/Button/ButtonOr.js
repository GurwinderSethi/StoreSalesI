"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _clsx = _interopRequireDefault(require("clsx"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var React = _interopRequireWildcard(require("react"));
var _lib = require("../../lib");
/**
 * Button groups can contain conditionals.
 */
var ButtonOr = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var className = props.className,
    text = props.text;
  var classes = (0, _clsx.default)('or', className);
  var rest = (0, _lib.getUnhandledProps)(ButtonOr, props);
  var ElementType = (0, _lib.getComponentType)(props);
  return /*#__PURE__*/React.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes,
    "data-text": text,
    ref: ref
  }));
});
ButtonOr.handledProps = ["as", "className", "text"];
ButtonOr.displayName = 'ButtonOr';
ButtonOr.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _propTypes.default.elementType,
  /** Additional classes. */
  className: _propTypes.default.string,
  /** Or buttons can have their text localized, or adjusted by using the text prop. */
  text: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
} : {};
var _default = exports.default = ButtonOr;