"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _invoke2 = _interopRequireDefault(require("lodash/invoke"));
var _get2 = _interopRequireDefault(require("lodash/get"));
var _clsx = _interopRequireDefault(require("clsx"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var React = _interopRequireWildcard(require("react"));
var _lib = require("../../lib");
/**
 * A search item sub-component for Dropdown component.
 */
var DropdownSearchInput = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$autoComplete = props.autoComplete,
    autoComplete = _props$autoComplete === void 0 ? 'off' : _props$autoComplete,
    className = props.className,
    tabIndex = props.tabIndex,
    _props$type = props.type,
    type = _props$type === void 0 ? 'text' : _props$type,
    value = props.value;
  var handleChange = function handleChange(e) {
    var newValue = (0, _get2.default)(e, 'target.value');
    (0, _invoke2.default)(props, 'onChange', e, (0, _extends2.default)({}, props, {
      value: newValue
    }));
  };
  var classes = (0, _clsx.default)('search', className);
  var ElementType = (0, _lib.getComponentType)(props, {
    defaultAs: 'input'
  });
  var rest = (0, _lib.getUnhandledProps)(DropdownSearchInput, props);
  return /*#__PURE__*/React.createElement(ElementType, (0, _extends2.default)({
    "aria-autocomplete": "list"
  }, rest, {
    autoComplete: autoComplete,
    className: classes,
    onChange: handleChange,
    ref: ref,
    tabIndex: tabIndex,
    type: type,
    value: value
  }));
});
DropdownSearchInput.handledProps = ["as", "autoComplete", "className", "tabIndex", "type", "value"];
DropdownSearchInput.displayName = 'DropdownSearchInput';
DropdownSearchInput.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _propTypes.default.elementType,
  /** An input can have the auto complete. */
  autoComplete: _propTypes.default.string,
  /** Additional classes. */
  className: _propTypes.default.string,
  /** An input can receive focus. */
  tabIndex: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  /** The HTML input type. */
  type: _propTypes.default.string,
  /** Stored value. */
  value: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string])
} : {};
DropdownSearchInput.create = (0, _lib.createShorthandFactory)(DropdownSearchInput, function (type) {
  return {
    type: type
  };
});
var _default = exports.default = DropdownSearchInput;