'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _exceljs = require('exceljs/dist/es5/exceljs.browser');

var _exceljs2 = _interopRequireDefault(_exceljs);

var _utils = require('./utils');

var _constants = require('./constants');

var _plugins = require('./plugins');

var _plugins2 = _interopRequireDefault(_plugins);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var PLUGIN_FUNCS = ['workbookCreated', 'worksheetCreated', 'worksheetCompleted', 'workcellCreated'];
var DEFAULT_WORKBOOK_OPTIONS = {
  views: [{
    x: 0, y: 0, width: 10000, height: 20000,
    firstSheet: 0, activeTab: 1, visibility: 'visible'
  }]
};
var DEFAULT_OPTIONS = {
  workbook: DEFAULT_WORKBOOK_OPTIONS,
  widthRatio: _constants.WIDTH_RATIO,
  plugins: [].concat(_toConsumableArray(Object.values(_plugins2.default)))
};

var Table2Excel = function () {
  function Table2Excel() {
    var _this = this;

    var selector = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'table';
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, Table2Excel);

    this.tables = Array.from(typeof selector === 'string' ? document.querySelectorAll(selector) : selector);

    this.options = Object.assign({}, DEFAULT_OPTIONS, options);

    this.plugins = {};
    PLUGIN_FUNCS.forEach(function (funName) {
      _this.plugins[funName] = _this.options.plugins.filter(function (plugin) {
        return plugin[funName];
      }).map(function (plugin) {
        return plugin[funName];
      });
    });

    this.pluginContext = {};
  }

  _createClass(Table2Excel, [{
    key: '_invokePlugin',
    value: function _invokePlugin(func) {
      var _this2 = this;

      var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      this.pluginContext = Object.assign({}, this.pluginContext, context);
      this.plugins[func].forEach(function (handler) {
        return handler.call(_this2, _this2.pluginContext);
      });
    }
  }, {
    key: 'toExcel',
    value: function toExcel() {
      var _this3 = this;

      var tables = this.tables,
          options = this.options;

      var workbook = new _exceljs2.default.Workbook(); // create workbook

      Object.assign(workbook, options);

      // workbookCreated plugins
      this._invokePlugin('workbookCreated', { workbook: workbook, tables: tables });

      tables.forEach(function (table, index) {
        var worksheet = workbook.addWorksheet('Sheet ' + (index + 1));

        // worksheetCreated plugins
        _this3._invokePlugin('worksheetCreated', { worksheet: worksheet, table: table });

        _this3.toSheet(table, worksheet);

        // worksheetCompleted plugins
        _this3._invokePlugin('worksheetCompleted', { worksheet: worksheet, table: table });
      });

      return this.workbook = workbook;
    }
  }, {
    key: 'toSheet',
    value: function toSheet(table, worksheet) {
      var _this4 = this;

      // get total cols and rows
      var totalRows = table.rows.length;
      var totalCols = 0;

      if (table.rows.length > 0) {
        for (var i = 0; i < table.rows[0].cells.length; i++) {
          totalCols += table.rows[0].cells[i].colSpan;
        }
      }

      var cells = [];
      Array.from(table.rows).forEach(function (row) {
        Array.from(row.cells).forEach(function (cell) {
          cells.push({
            rowRange: {},
            colRange: {},
            el: cell
          });
        });
      });

      // create matrix
      var helperMatrix = [];

      for (var r = 0; r < totalRows; r++) {
        var row = [];
        for (var c = 0; c < totalCols; c++) {
          row.push({ cell: null });
        }
        helperMatrix.push(row);
      }

      // mark matrix
      var cursor = 0;

      for (var _r = 0; _r < totalRows; _r++) {
        for (var _c = 0; _c < totalCols; _c++) {
          // skip if current matrix unit is already assigned
          if (helperMatrix[_r][_c].cell) {
            continue;
          }

          // assign cell to current matrix unit
          var cell = cells[cursor++];
          var _cell$el = cell.el,
              rowSpan = _cell$el.rowSpan,
              colSpan = _cell$el.colSpan;


          cell.rowRange = { from: _r, to: _r };
          cell.colRange = { from: _c, to: _c };

          for (var y = _r; y < _r + rowSpan; y++) {
            for (var x = _c; x < _c + colSpan; x++) {
              helperMatrix[y][x].cell = cell;
              cell.colRange.to = x;
              cell.rowRange.to = y;
            }
          }
        }
      }

      // read matrix to sheet
      cells.forEach(function (cell) {
        var rowRange = cell.rowRange,
            colRange = cell.colRange,
            el = cell.el;
        var innerText = el.innerText;

        var workcell = (0, _utils.mergeCells)(worksheet, colRange.from, rowRange.from, colRange.to, rowRange.to);
        var cellStyle = getComputedStyle(el);

        workcell.value = innerText;

        // workcellCreated
        _this4._invokePlugin('workcellCreated', { workcell: workcell, cell: el, rowRange: rowRange, colRange: colRange, cellStyle: cellStyle });
      });
    }
  }, {
    key: 'export',
    value: function _export(fileName, ext) {
      if (!this.workbook) {
        this.toExcel();
      }
      (0, _utils.saveAsExcel)(this.workbook, fileName, ext);
    }
  }]);

  return Table2Excel;
}();

exports.default = Table2Excel;