"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
exports.__esModule = true;
exports.positionsMapping = exports.positions = exports.placementMapping = void 0;
var _invert2 = _interopRequireDefault(require("lodash/invert"));
var _keys2 = _interopRequireDefault(require("lodash/keys"));
var positionsMapping = exports.positionsMapping = {
  'top center': 'top',
  'top left': 'top-start',
  'top right': 'top-end',
  'bottom center': 'bottom',
  'bottom left': 'bottom-start',
  'bottom right': 'bottom-end',
  'right center': 'right',
  'left center': 'left'
};
var positions = exports.positions = (0, _keys2.default)(positionsMapping);
var placementMapping = exports.placementMapping = (0, _invert2.default)(positionsMapping);