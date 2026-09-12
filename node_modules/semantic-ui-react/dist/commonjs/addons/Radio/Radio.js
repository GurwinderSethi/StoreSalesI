"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var React = _interopRequireWildcard(require("react"));
var _lib = require("../../lib");
var _Checkbox = _interopRequireDefault(require("../../modules/Checkbox"));
/**
 * A Radio is sugar for <Checkbox radio />.
 * Useful for exclusive groups of sliders or toggles.
 * @see Checkbox
 * @see Form
 */
var Radio = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var slider = props.slider,
    toggle = props.toggle,
    _props$type = props.type,
    type = _props$type === void 0 ? 'radio' : _props$type;
  var rest = (0, _lib.getUnhandledProps)(Radio, props);
  // radio, slider, toggle are exclusive
  // use an undefined radio if slider or toggle are present
  var radio = !(slider || toggle) || undefined;
  return /*#__PURE__*/React.createElement(_Checkbox.default, (0, _extends2.default)({}, rest, {
    type: type,
    radio: radio,
    slider: slider,
    toggle: toggle,
    ref: ref
  }));
});
Radio.handledProps = ["slider", "toggle", "type"];
Radio.displayName = 'Radio';
Radio.propTypes = process.env.NODE_ENV !== "production" ? {
  /** Format to emphasize the current selection state. */
  slider: _Checkbox.default.propTypes.slider,
  /** Format to show an on or off choice. */
  toggle: _Checkbox.default.propTypes.toggle,
  /** HTML input type, either checkbox or radio. */
  type: _Checkbox.default.propTypes.type
} : {};
var _default = exports.default = Radio;