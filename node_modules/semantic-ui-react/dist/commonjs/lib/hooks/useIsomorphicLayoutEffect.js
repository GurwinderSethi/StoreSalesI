"use strict";
"use client";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard").default;
exports.__esModule = true;
exports.default = void 0;
var React = _interopRequireWildcard(require("react"));
var _isBrowser = _interopRequireDefault(require("../isBrowser"));
// useLayoutEffect() produces a warning with SSR rendering
// https://medium.com/@alexandereardon/uselayouteffect-and-ssr-192986cdcf7a
var useIsomorphicLayoutEffect = (0, _isBrowser.default)() && process.env.NODE_ENV !== 'test' ? React.useLayoutEffect : React.useEffect;
var _default = exports.default = useIsomorphicLayoutEffect;