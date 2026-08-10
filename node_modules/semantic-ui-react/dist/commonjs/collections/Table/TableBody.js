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
var TableBody = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var children = props.children,
    className = props.className;
  var classes = (0, _clsx.default)(className);
  var rest = (0, _lib.getUnhandledProps)(TableBody, props);
  var ElementType = (0, _lib.getComponentType)(props, {
    defaultAs: 'tbody'
  });
  return /*#__PURE__*/React.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes,
    ref: ref
  }), children);
});
TableBody.handledProps = ["as", "children", "className"];
TableBody.displayName = 'TableBody';
TableBody.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _propTypes.default.elementType,
  /** Primary content. */
  children: _propTypes.default.node,
  /** Additional classes. */
  className: _propTypes.default.string
} : {};
var _default = exports.default = TableBody;