'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  workcellCreated: function workcellCreated(_ref) {
    var workcell = _ref.workcell,
        cell = _ref.cell;

    var child = cell.children[0];
    if (child && ['INPUT', 'SELECT', 'TEXTAREA'].includes(child.tagName)) {
      workcell.value = child.value;
    }
  }
};