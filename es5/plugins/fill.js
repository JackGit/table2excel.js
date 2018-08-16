'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _utils = require('../utils');

exports.default = {
  workcellCreated: function workcellCreated(_ref) {
    var workcell = _ref.workcell,
        cell = _ref.cell,
        cellStyle = _ref.cellStyle;

    var color = (0, _utils.argb)(cellStyle.backgroundColor);

    if (color === '00000000') {
      // background is transparent, equals none pattern fill
      workcell.style = Object.assign({}, workcell.style, {
        fill: {
          type: 'pattern',
          pattern: 'none'
        }
      });
    } else {
      workcell.style = Object.assign({}, workcell.style, {
        fill: {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: color }
        }
      });
    }
  }
};