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

    var color = (0, _utils.argb)(cellStyle.backgroundColor);

    if (color === '00000000') {
      // background is transparent, equals none pattern fill
      workcell.fill = _extends({}, workcell.fill || {}, {
        type: 'pattern',
        pattern: 'none'
      });
    } else {
      workcell.fill = _extends({}, workcell.fill || {}, {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: color }
      });
    }
  }
};