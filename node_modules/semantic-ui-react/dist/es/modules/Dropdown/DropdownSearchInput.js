import _extends from "@babel/runtime/helpers/esm/extends";
import _invoke from "lodash-es/invoke";
import _get from "lodash-es/get";
import cx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import { createShorthandFactory, getComponentType, getUnhandledProps } from '../../lib';

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
    var newValue = _get(e, 'target.value');
    _invoke(props, 'onChange', e, _extends({}, props, {
      value: newValue
    }));
  };
  var classes = cx('search', className);
  var ElementType = getComponentType(props, {
    defaultAs: 'input'
  });
  var rest = getUnhandledProps(DropdownSearchInput, props);
  return /*#__PURE__*/React.createElement(ElementType, _extends({
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
  as: PropTypes.elementType,
  /** An input can have the auto complete. */
  autoComplete: PropTypes.string,
  /** Additional classes. */
  className: PropTypes.string,
  /** An input can receive focus. */
  tabIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** The HTML input type. */
  type: PropTypes.string,
  /** Stored value. */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string])
} : {};
DropdownSearchInput.create = createShorthandFactory(DropdownSearchInput, function (type) {
  return {
    type: type
  };
});
export default DropdownSearchInput;