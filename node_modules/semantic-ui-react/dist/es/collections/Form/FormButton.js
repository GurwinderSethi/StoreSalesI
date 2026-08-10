import _extends from "@babel/runtime/helpers/esm/extends";
import PropTypes from 'prop-types';
import * as React from 'react';
import { getComponentType, getUnhandledProps } from '../../lib';
import Button from '../../elements/Button';
import FormField from './FormField';

/**
 * Sugar for <Form.Field control={Button} />.
 * @see Button
 * @see Form
 */
var FormButton = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$control = props.control,
    control = _props$control === void 0 ? Button : _props$control;
  var rest = getUnhandledProps(FormButton, props);
  var ElementType = getComponentType(props, {
    defaultAs: FormField
  });
  return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
    control: control,
    ref: ref
  }));
});
FormButton.handledProps = ["as", "control"];
FormButton.displayName = 'FormButton';
FormButton.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,
  /** A FormField control prop. */
  control: FormField.propTypes.control
} : {};
export default FormButton;