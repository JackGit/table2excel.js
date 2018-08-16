'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _table2excel = require('./table2excel');

var _table2excel2 = _interopRequireDefault(_table2excel);

var _plugins = require('./plugins');

var _plugins2 = _interopRequireDefault(_plugins);

var _utils = require('./utils');

var utils = _interopRequireWildcard(_utils);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_table2excel2.default.plugins = _plugins2.default;
_table2excel2.default.utils = utils;

exports.default = _table2excel2.default;