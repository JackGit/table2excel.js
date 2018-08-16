'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _font = require('./font');

var _font2 = _interopRequireDefault(_font);

var _fill = require('./fill');

var _fill2 = _interopRequireDefault(_fill);

var _form = require('./form');

var _form2 = _interopRequireDefault(_form);

var _alignment = require('./alignment');

var _alignment2 = _interopRequireDefault(_alignment);

var _hyperlink = require('./hyperlink');

var _hyperlink2 = _interopRequireDefault(_hyperlink);

var _autoWidth = require('./autoWidth');

var _autoWidth2 = _interopRequireDefault(_autoWidth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  fontPlugin: _font2.default,
  fillPlugin: _fill2.default,
  formPlugin: _form2.default,
  alignmentPlugin: _alignment2.default,
  hyperlinkPlugin: _hyperlink2.default,
  autoWidthPlugin: _autoWidth2.default
};