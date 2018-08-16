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

    var oldFont = workcell.style && workcell.style.font ? workcell.style.font : {};
    var fontWeight = cellStyle.fontWeight;

    workcell.style = Object.assign({}, workcell.style, Object.assign({}, oldFont, {
      name: cellStyle.fontFamily,
      color: { argb: (0, _utils.argb)(cellStyle.color) },
      bold: fontWeight === 'bold' || +fontWeight > 600 ? true : false
    }));
  }
};