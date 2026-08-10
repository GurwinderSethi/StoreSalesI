import _extends from "@babel/runtime/helpers/esm/extends";
import cx from 'clsx';
import PropTypes from 'prop-types';
import * as React from 'react';
import { childrenUtils, customPropTypes, getComponentType, getUnhandledProps } from '../../lib';

/**
 * A feed can contain a user element.
 */
var FeedUser = /*#__PURE__*/React.forwardRef(function (props, ref) {
  var children = props.children,
    className = props.className,
    content = props.content;
  var classes = cx('user', className);
  var rest = getUnhandledProps(FeedUser, props);
  var ElementType = getComponentType(props, {
    defaultAs: 'a'
  });
  return /*#__PURE__*/React.createElement(ElementType, _extends({}, rest, {
    className: classes,
    ref: ref
  }), childrenUtils.isNil(children) ? content : children);
});
FeedUser.handledProps = ["as", "children", "className", "content"];
FeedUser.displayName = 'FeedUser';
FeedUser.propTypes = process.env.NODE_ENV !== "production" ? {
  /** An element type to render as (string or function). */
  as: PropTypes.elementType,
  /** Primary content. */
  children: PropTypes.node,
  /** Additional classes. */
  className: PropTypes.string,
  /** Shorthand for primary content. */
  content: customPropTypes.contentShorthand
} : {};
export default FeedUser;