'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * '-webkit-right' -> 'right'
 * 'right' -> 'right'
 *  etc...
 */
var getHorizontalAlign = function getHorizontalAlign() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var aligns = ['right', 'left', 'center', 'justify'];
  for (var i = 0; i < aligns.length; i++) {
    if (value.includes(aligns[i])) {
      return aligns[i];
    }
  }
};

/**
 * 'baseline' -> 'middle'
 * 'text-top' -> 'top'
 * 'text-bottom' -> 'bottom'
 * 'sub' -> 'top'
 * 'super' -> 'bottom'
 */
var getVerticalAlign = function getVerticalAlign() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';

  var aligns = ['top', 'middle', 'bottom'];
  for (var i = 0; i < aligns.length; i++) {
    if (value.includes(aligns[i])) {
      return aligns[i];
    }
  }

  var mapping = {
    'baseline': 'middle',
    'super': 'top',
    'sub': 'bottom'
  };
  return mapping[value];
};

exports.default = {
  workcellCreated: function workcellCreated(_ref) {
    var workcell = _ref.workcell,
        cellStyle = _ref.cellStyle;
    var verticalAlign = cellStyle.verticalAlign,
        textAlign = cellStyle.textAlign;

    workcell.alignment = _extends({}, workcell.alignment || {}, {
      vertical: getVerticalAlign(verticalAlign),
      horizontal: getHorizontalAlign(textAlign)
    });
  }
};