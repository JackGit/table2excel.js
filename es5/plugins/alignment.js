"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  workcellCreated: function workcellCreated(_ref) {
    var workcell = _ref.workcell,
        cell = _ref.cell,
        cellStyle = _ref.cellStyle;
    var verticalAlign = cellStyle.verticalAlign,
        textAlign = cellStyle.textAlign;

    workcell.style = Object.assign({}, workcell.style, {
      alignment: {
        vertical: verticalAlign,
        horizontal: textAlign
      }
    });
  }
};