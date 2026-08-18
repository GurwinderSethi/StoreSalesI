"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var React = _interopRequireWildcard(require("react"));
var _Dropdown = _interopRequireDefault(require("../../modules/Dropdown"));
/**
 * A Select is sugar for <Dropdown selection />.
 * @see Dropdown
 * @see Form
 */
var Select = /*#__PURE__*/React.forwardRef(function (props, ref) {
  return /*#__PURE__*/React.createElement(_Dropdown.default, (0, _extends2.default)({}, props, {
    selection: true,
    ref: ref
  }));
});
Select.handledProps = ["options"];
Select.displayName = 'Select';
Select.propTypes = process.env.NODE_ENV !== "production" ? {
  /** Array of Dropdown.Item props e.g. `{ text: '', value: '' }` */
  options: _propTypes.default.arrayOf(_propTypes.default.shape(_Dropdown.default.Item.propTypes)).isRequired
} : {};
Select.Divider = _Dropdown.default.Divider;
Select.Header = _Dropdown.default.Header;
Select.Item = _Dropdown.default.Item;
Select.Menu = _Dropdown.default.Menu;
var _default = exports.default = Select;