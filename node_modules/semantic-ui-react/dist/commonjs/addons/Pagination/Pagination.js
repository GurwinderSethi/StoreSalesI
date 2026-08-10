"use strict";
"use client";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.default = void 0;
var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));
var _map2 = _interopRequireDefault(require("lodash/map"));
var _isNil2 = _interopRequireDefault(require("lodash/isNil"));
var _invoke2 = _interopRequireDefault(require("lodash/invoke"));
var _propTypes = _interopRequireDefault(require("prop-types"));
var React = _interopRequireWildcard(require("react"));
var _lib = require("../../lib");
var _Menu = _interopRequireDefault(require("../../collections/Menu"));
var _PaginationItem = _interopRequireDefault(require("./PaginationItem"));
/**
 * A component to render a pagination.
 */
var Pagination = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$ariaLabel = props['aria-label'],
    ariaLabel = _props$ariaLabel === void 0 ? 'Pagination Navigation' : _props$ariaLabel,
    _props$boundaryRange = props.boundaryRange,
    boundaryRange = _props$boundaryRange === void 0 ? 1 : _props$boundaryRange,
    disabled = props.disabled,
    _props$ellipsisItem = props.ellipsisItem,
    ellipsisItem = _props$ellipsisItem === void 0 ? '...' : _props$ellipsisItem,
    _props$firstItem = props.firstItem,
    firstItem = _props$firstItem === void 0 ? {
      'aria-label': 'First item',
      content: '«'
    } : _props$firstItem,
    _props$lastItem = props.lastItem,
    lastItem = _props$lastItem === void 0 ? {
      'aria-label': 'Last item',
      content: '»'
    } : _props$lastItem,
    _props$nextItem = props.nextItem,
    nextItem = _props$nextItem === void 0 ? {
      'aria-label': 'Next item',
      content: '⟩'
    } : _props$nextItem,
    _props$pageItem = props.pageItem,
    pageItem = _props$pageItem === void 0 ? {} : _props$pageItem,
    _props$prevItem = props.prevItem,
    prevItem = _props$prevItem === void 0 ? {
      'aria-label': 'Previous item',
      content: '⟨'
    } : _props$prevItem,
    _props$siblingRange = props.siblingRange,
    siblingRange = _props$siblingRange === void 0 ? 1 : _props$siblingRange,
    totalPages = props.totalPages;
  var _useAutoControlledVal = (0, _lib.useAutoControlledValue)({
      state: props.activePage,
      defaultState: props.defaultActivePage,
      initialState: 1
    }),
    activePage = _useAutoControlledVal[0],
    setActivePage = _useAutoControlledVal[1];
  var handleItemClick = function handleItemClick(e, _ref) {
    var nextActivePage = _ref.value;
    var prevActivePage = activePage;

    // Heads up! We need the cast to the "number" type there, as `activePage` can be a string
    if (+prevActivePage === +nextActivePage) {
      return;
    }
    setActivePage(nextActivePage);
    (0, _invoke2.default)(props, 'onPageChange', e, (0, _extends2.default)({}, props, {
      activePage: nextActivePage
    }));
  };
  var handleItemOverrides = function handleItemOverrides(active, type, value) {
    return function (predefinedProps) {
      return {
        active: active,
        type: type,
        key: type + "-" + value,
        onClick: function onClick(e, itemProps) {
          (0, _invoke2.default)(predefinedProps, 'onClick', e, itemProps);
          if (itemProps.type !== 'ellipsisItem') {
            handleItemClick(e, itemProps);
          }
        }
      };
    };
  };
  var items = (0, _lib.createPaginationItems)({
    activePage: activePage,
    boundaryRange: boundaryRange,
    hideEllipsis: (0, _isNil2.default)(ellipsisItem),
    siblingRange: siblingRange,
    totalPages: totalPages
  });
  var rest = (0, _lib.getUnhandledProps)(Pagination, props);
  var paginationItemTypes = {
    firstItem: firstItem,
    lastItem: lastItem,
    ellipsisItem: ellipsisItem,
    nextItem: nextItem,
    pageItem: pageItem,
    prevItem: prevItem
  };
  return /*#__PURE__*/React.createElement(_Menu.default, (0, _extends2.default)({}, rest, {
    "aria-label": ariaLabel,
    pagination: true,
    role: "navigation",
    ref: ref
  }), (0, _map2.default)(items, function (_ref2) {
    var active = _ref2.active,
      type = _ref2.type,
      value = _ref2.value;
    return _PaginationItem.default.create(paginationItemTypes[type], {
      defaultProps: {
        content: value,
        disabled: disabled,
        value: value
      },
      overrideProps: handleItemOverrides(active, type, value)
    });
  }));
});
Pagination.handledProps = ["activePage", "aria-label", "boundaryRange", "defaultActivePage", "disabled", "ellipsisItem", "firstItem", "lastItem", "nextItem", "onPageChange", "pageItem", "prevItem", "siblingRange", "totalPages"];
Pagination.displayName = 'Pagination';
Pagination.propTypes = process.env.NODE_ENV !== "production" ? {
  /** A pagination item can have an aria label. */
  'aria-label': _propTypes.default.string,
  /** Initial activePage value. */
  defaultActivePage: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  /** Index of the currently active page. */
  activePage: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  /** Number of always visible pages at the beginning and end. */
  boundaryRange: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  /** A pagination can be disabled. */
  disabled: _propTypes.default.bool,
  /** A shorthand for PaginationItem. */
  ellipsisItem: _lib.customPropTypes.itemShorthand,
  /** A shorthand for PaginationItem. */
  firstItem: _lib.customPropTypes.itemShorthand,
  /** A shorthand for PaginationItem. */
  lastItem: _lib.customPropTypes.itemShorthand,
  /** A shorthand for PaginationItem. */
  nextItem: _lib.customPropTypes.itemShorthand,
  /** A shorthand for PaginationItem. */
  pageItem: _lib.customPropTypes.itemShorthand,
  /** A shorthand for PaginationItem. */
  prevItem: _lib.customPropTypes.itemShorthand,
  /**
   * Called on change of an active page.
   *
   * @param {SyntheticEvent} event - React's original SyntheticEvent.
   * @param {object} data - All props.
   */
  onPageChange: _propTypes.default.func,
  /** Number of always visible pages before and after the current one. */
  siblingRange: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]),
  /** Total number of pages. */
  totalPages: _propTypes.default.oneOfType([_propTypes.default.number, _propTypes.default.string]).isRequired
} : {};
Pagination.Item = _PaginationItem.default;
var _default = exports.default = Pagination;