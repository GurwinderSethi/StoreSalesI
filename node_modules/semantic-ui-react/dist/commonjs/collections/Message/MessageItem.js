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
 * A message list can contain an item.
 */
var MessageItem = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var children = props.children,
    className = props.className,
    content = props.content;
  var classes = (0, _clsx.default)('content', className);
  var rest = (0, _lib.getUnhandledProps)(MessageItem, props);
  var ElementType = (0, _lib.getComponentType)(props, {
    defaultAs: 'li'
  });
  return /*#__PURE__*/React.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes,
    ref: ref
  }), _lib.childrenUtils.isNil(children) ? content : children);
});
MessageItem.handledProps = ["as", "children", "className", "content"];
MessageItem.displayName = 'MessageItem';
MessageItem.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _propTypes.default.elementType,
  /** Primary content. */
  children: _propTypes.default.node,
  /** Additional classes. */
  className: _propTypes.default.string,
  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand
} : {};
MessageItem.create = (0, _lib.createShorthandFactory)(MessageItem, function (content) {
  return {
    content: content
  };
});
var _default = exports.default = MessageItem;