'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  workcellCreated: function workcellCreated(_ref) {
    var worksheet = _ref.worksheet,
        colRange = _ref.colRange,
        cell = _ref.cell,
        cellStyle = _ref.cellStyle;

    if (colRange.from === colRange.to && cellStyle.width !== 'auto') {
      worksheet.getColumn(colRange.from + 1).width = +cellStyle.width.split('px')[0] * this.options.widthRatio;
    }
  }
};