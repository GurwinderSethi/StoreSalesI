import _extends from "@babel/runtime/helpers/esm/extends";
import PropTypes from 'prop-types';
import * as React from 'react';
import { getUnhandledProps } from '../../lib';
import TableHeader from './TableHeader';

/**
 * A table can have a footer.
 */
var TableFooter = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var _props$as = props.as,
    as = _props$as === void 0 ? 'tfoot' : _props$as;
  var rest = getUnhandledProps(TableFooter, props);
  return /*#__PURE__*/React.createElement(TableHeader, _extends({}, rest, {
    as: as,
    ref: ref
  }));
});
TableFooter.handledProps = ["as"];
TableFooter.displayName = 'TableFooter';
TableFooter.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType
} : {};
export default TableFooter;