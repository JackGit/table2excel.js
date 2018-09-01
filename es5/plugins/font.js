'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = require('../utils');

exports.default = {
  workcellCreated: function workcellCreated(_ref) {
    var workcell = _ref.workcell,
        cellStyle = _ref.cellStyle;

    var fontWeight = cellStyle.fontWeight;

    workcell.font = _extends({}, workcell.font || {}, {
      name: cellStyle.fontFamily,
      color: { argb: (0, _utils.argb)(cellStyle.color) },
      bold: fontWeight === 'bold' || +fontWeight > 600 ? true : false
    });
  }
};