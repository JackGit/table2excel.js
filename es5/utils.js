'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.argb = exports.mergeCells = exports.cellPosition = exports.columnIndex = exports.saveAsExcel = undefined;

var _constants = require('./constants');

var _fileSaver = require('file-saver');

var saveAsExcel = exports.saveAsExcel = function saveAsExcel(workbook) {
	var filename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'table';
	var ext = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'xlsx';

	var type = _constants.MIME_TYPES[ext];

	if (!type) {
		console.error(ext + ' file extension is not supported');
		return;
	}

	workbook.xlsx.writeBuffer().then(function (uint8) {
		(0, _fileSaver.saveAs)(new Blob([uint8.buffer], { type: type }), filename + '.' + ext);
	});
};

var letter = function letter(num) {
	var a = 'A'.charCodeAt(0);
	return String.fromCharCode(a + num - 1);
};

/**
 * 0 => A
 * 25 => Z
 * 26 => AA
 */
var columnIndex = exports.columnIndex = function columnIndex(num) {
	var result = void 0;
	num = num + 1;

	if (num <= 26) {
		result = letter(num);
	} else {
		var mod = num % 26;
		var quotient = Math.floor(num / 26);

		if (mod === 0) {
			result = letter(quotient - 1) + letter(26);
		} else {
			result = letter(quotient) + letter(mod);
		}
	}
	return result;
};

// x = 0, y = 0 => 'A1'
// x = 0, y = 1 => 'A2'
// x = 1, y = 0 => 'B1'
var cellPosition = exports.cellPosition = function cellPosition(x, y) {
	return '' + columnIndex(x) + (y + 1);
};

var mergeCells = exports.mergeCells = function mergeCells(sheet, x1, y1, x2, y2) {
	var fromCell = cellPosition(x1, y1);
	var toCell = cellPosition(x2, y2);
	sheet.mergeCells(fromCell, toCell);
	return sheet.getCell(fromCell);
};

/**
 * convert rgb(0,0,0) rgba(0,0,0,0) to argb: FF00FF00
 */
var argb = exports.argb = function argb(color) {
	var values = color.split('(')[1].split(')')[0].split(',').map(function (v, i) {
		return i === 3 ? v * 255 : v;
	});

	if (values.length === 3) {
		values.push(255);
	}

	values.unshift(values.pop());

	return values.map(function (v) {
		var s = parseInt(v).toString(16);
		return s.length === 1 ? '0' + s : s;
	}).join('').toUpperCase();
};