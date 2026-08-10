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
 * A menu can contain a sub menu.
 */
var MenuMenu = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var children = props.children,
    className = props.className,
    content = props.content,
    position = props.position;
  var classes = (0, _clsx.default)(position, 'menu', className);
  var rest = (0, _lib.getUnhandledProps)(MenuMenu, props);
  var ElementType = (0, _lib.getComponentType)(props);
  return /*#__PURE__*/React.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes,
    ref: ref
  }), _lib.childrenUtils.isNil(children) ? content : children);
});
MenuMenu.handledProps = ["as", "children", "className", "content", "position"];
MenuMenu.displayName = 'MenuMenu';
MenuMenu.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _propTypes.default.elementType,
  /** Primary content. */
  children: _propTypes.default.node,
  /** Additional classes. */
  className: _propTypes.default.string,
  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,
  /** A sub menu can take left or right position. */
  position: _propTypes.default.oneOf(['left', 'right'])
} : {};
var _default = exports.default = MenuMenu;