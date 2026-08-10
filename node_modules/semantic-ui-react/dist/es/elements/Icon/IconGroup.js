import _extends from "@babel/runtime/helpers/esm/extends";
import _without from "lodash-es/without";
import cx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import { childrenUtils, customPropTypes, getComponentType, getUnhandledProps, SUI } from '../../lib';

/**
 * Several icons can be used together as a group.
 */
var IconGroup = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var children = props.children,
    className = props.className,
    content = props.content,
    size = props.size;
  var classes = cx(size, 'icons', className);
  var rest = getUnhandledProps(IconGroup, props);
  var ElementType = getComponentType(props, {
    defaultAs: 'i'
  });
  return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
    className: classes,
    ref: ref
  }), childrenUtils.isNil(children) ? content : children);
});
IconGroup.handledProps = ["as", "children", "className", "content", "size"];
IconGroup.displayName = 'IconGroup';
IconGroup.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,
  /** Primary content. */
  children: PropTypes.node,
  /** Additional classes. */
  className: PropTypes.string,
  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand,
  /** Size of the icon group. */
  size: PropTypes.oneOf(_without(SUI.SIZES, 'medium'))
} : {};
export default IconGroup;