"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _isNil2 = _interopRequireDefault(require("lodash/isNil"));
var _clsx = _interopRequireDefault(require("clsx"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var React = _interopRequireWildcard(require("react"));
var _lib = require("../../lib");
var _Icon = _interopRequireDefault(require("../../elements/Icon"));
/**
 * A divider sub-component for Breadcrumb component.
 */
var BreadcrumbDivider = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var children = props.children,
    className = props.className,
    content = props.content,
    icon = props.icon;
  var classes = (0, _clsx.default)('divider', className);
  var rest = (0, _lib.getUnhandledProps)(BreadcrumbDivider, props);
  var ElementType = (0, _lib.getComponentType)(props);
  if (!(0, _isNil2.default)(icon)) {
    return _Icon.default.create(icon, {
      defaultProps: (0, _extends2.default)({}, rest, {
        className: classes
      }),
      autoGenerateKey: false,
      ref: ref
    });
  }
  if (!(0, _isNil2.default)(content)) {
    return /*#__PURE__*/React.createElement(ElementType, (0, _extends2.default)({}, rest, {
      className: classes,
      ref: ref
    }), content);
  }
  return /*#__PURE__*/React.createElement(ElementType, (0, _extends2.default)({}, rest, {
    className: classes,
    ref: ref
  }), _lib.childrenUtils.isNil(children) ? '/' : children);
});
BreadcrumbDivider.handledProps = ["as", "children", "className", "content", "icon"];
BreadcrumbDivider.displayName = 'BreadcrumbDivider';
BreadcrumbDivider.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _propTypes.default.elementType,
  /** Primary content. */
  children: _propTypes.default.node,
  /** Additional classes. */
  className: _propTypes.default.string,
  /** Shorthand for primary content. */
  content: _lib.customPropTypes.contentShorthand,
  /** Render as an `Icon` component with `divider` class instead of a `div`. */
  icon: _lib.customPropTypes.itemShorthand
} : {};
BreadcrumbDivider.create = (0, _lib.createShorthandFactory)(BreadcrumbDivider, function (icon) {
  return {
    icon: icon
  };
});
var _default = exports.default = BreadcrumbDivider;