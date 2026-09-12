"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = void 0;
var _propTypes = _interopRequireDefault(require("prop-types"));
var React = _interopRequireWildcard(require("react"));
function SearchCategoryLayout(props) {
  var categoryContent = props.categoryContent,
    resultsContent = props.resultsContent;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("div", {
    className: "name"
  }, categoryContent), /*#__PURE__*/React.createElement("div", {
    className: "results"
  }, resultsContent));
}
SearchCategoryLayout.handledProps = ["categoryContent", "resultsContent"];
SearchCategoryLayout.propTypes = process.env.NODE_ENV !== "production" ? {
  /** The rendered category content */
  categoryContent: _propTypes.default.element.isRequired,
  /** The rendered results content */
  resultsContent: _propTypes.default.element.isRequired
} : {};
var _default = exports.default = SearchCategoryLayout;