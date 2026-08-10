import _extends from "@babel/runtime/helpers/esm/extends";
import PropTypes from 'prop-types';
import * as React from 'react';
import { getComponentType, getUnhandledProps } from '../../lib';
import Select from '../../addons/Select';
import Dropdown from '../../modules/Dropdown';
import FormField from './FormField';

/**
 * Sugar for <Form.Field control={Select} />.
 * @see Form
 * @see Select
 */
var FormSelect = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$control = props.control,
    control = _props$control === void 0 ? Select : _props$control,
    options = props.options;
  var rest = getUnhandledProps(FormSelect, props);
  var ElementType = getComponentType(props, {
    defaultAs: FormField
  });
  return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
    control: control,
    options: options,
    ref: ref
  }));
});
FormSelect.handledProps = ["as", "control", "options"];
FormSelect.displayName = 'FormSelect';
FormSelect.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,
  /** A FormField control prop. */
  control: FormField.propTypes.control,
  /** Array of Dropdown.Item props e.g. `{ text: '', value: '' }` */
  options: PropTypes.arrayOf(PropTypes.shape(Dropdown.Item.propTypes)).isRequired
} : {};
export default FormSelect;