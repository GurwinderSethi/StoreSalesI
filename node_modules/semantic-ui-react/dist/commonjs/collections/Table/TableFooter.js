"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var React = _interopRequireWildcard(require("react"));
var _lib = require("../../lib");
var _TableHeader = _interopRequireDefault(require("./TableHeader"));
/**
 * A table can have a footer.
 */
var TableFooter = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    as = _props$as === void 0 ? 'tfoot' : _props$as;
  var rest = (0, _lib.getUnhandledProps)(TableFooter, props);
  return /*#__PURE__*/React.createElement(_TableHeader.default, (0, _extends2.default)({}, rest, {
    as: as,
    ref: ref
  }));
});
TableFooter.handledProps = ["as"];
TableFooter.displayName = 'TableFooter';
TableFooter.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: _propTypes.default.elementType
} : {};
var _default = exports.default = TableFooter;