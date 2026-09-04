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
var _FeedLike = _interopRequireDefault(require("./FeedLike"));
/**
 * A feed can contain a meta.
 */
var FeedMeta = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var children = props.children,
    className = props.className,
    content = props.content,
    like = props.like;
  var classes = (0, _clsx.default)('meta', className);
  var rest = (0, _lib.getUnhandledProps)(FeedMeta, props);
  var ElementType = (0, _lib.getComponentType)(props);
  if (!_lib.childrenUtils.isNil(children)) {
    return /*#__PURE__*/React.createElement(ElementType, (0, _extends2.default)({}, rest, {
      className: classes,
      ref: ref
    }), children);
  }
  return /*#__PURE__*/React.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes,
    ref: ref
  }), (0, _lib.createShorthand)(_FeedLike.default, function (val) {
    return {
      content: val
    };
  }, like, {
    autoGenerateKey: false
  }), content);
});
FeedMeta.handledProps = ["as", "children", "className", "content", "like"];
FeedMeta.displayName = 'FeedMeta';
FeedMeta.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _propTypes.default.elementType,
  /** Primary content. */
  children: _propTypes.default.node,
  /** Additional classes. */
  className: _propTypes.default.string,
  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,
  /** Shorthand for FeedLike. */
  like: _lib.customPropTypes.itemShorthand
} : {};
var _default = exports.default = FeedMeta;