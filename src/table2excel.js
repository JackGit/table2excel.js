import ExcelJS from 'exceljs/dist/es5/exceljs.browser'
import { mergeCells, saveAsExcel } from './utils'
import { WIDTH_RATIO } from './constants'
import plugins from './plugins'

const PLUGIN_FUNCS = ['workbookCreated', 'worksheetCreated', 'worksheetCompleted', 'workcellCreated']
const DEFAULT_WORKBOOK_OPTIONS = {
  views: [{
    x: 0, y: 0, width: 10000, height: 20000,
    firstSheet: 0, activeTab: 1, visibility: 'visible'
  }]
}
const DEFAULT_OPTIONS = {
  workbook: DEFAULT_WORKBOOK_OPTIONS,
  widthRatio: WIDTH_RATIO,
  plugins: [...Object.values(plugins)]
}

export default class Table2Excel {

  constructor (selector = 'table', options = {}) {
    this.tables = Array.from(
      typeof selector === 'string'
        ? document.querySelectorAll(selector)
        : selector
      )

    this.options = Object.assign({}, DEFAULT_OPTIONS, options)

    this.plugins = {}
    PLUGIN_FUNCS.forEach(funName => {
      this.plugins[funName] = this.options.plugins.filter(plugin => plugin[funName]).map(plugin => plugin[funName])
    })

    this.pluginContext = {}
  }

  _invokePlugin (func, context = {}) {
    this.pluginContext = Object.assign({}, this.pluginContext, context)
    this.plugins[func].forEach(handler => handler.call(this, this.pluginContext))
  }

  toExcel () {
    const { tables, options } = this
    const workbook = new ExcelJS.Workbook() // create workbook

    Object.assign(workbook, options)

    // workbookCreated plugins
    this._invokePlugin('workbookCreated', { workbook, tables })

    tables.forEach((table, index) => {
      const worksheet = workbook.addWorksheet(`Sheet ${index + 1}`)

      // worksheetCreated plugins
      this._invokePlugin('worksheetCreated', { worksheet, table })

      this.toSheet(table, worksheet)

      // worksheetCompleted plugins
      this._invokePlugin('worksheetCompleted', { worksheet, table })
    })

    return this.workbook = workbook
  }

  toSheet (table, worksheet) {
    // get total cols and rows
    const totalRows = table.rows.length
    let totalCols = 0

    if (table.rows.length > 0) {
      for (let i = 0; i < table.rows[0].cells.length; i++) {
        totalCols += table.rows[0].cells[i].colSpan
      }
    }

    const cells = []
    Array.from(table.rows).forEach(row => {
      Array.from(row.cells).forEach(cell => {
        cells.push({
          rowRange: {},
          colRange: {},
          el: cell
        })
      })
    })

    // create matrix
    const helperMatrix = []

    for (let r = 0; r < totalRows; r++) {
      const row = []
      for (let c = 0; c < totalCols; c++) {
        row.push({ cell: null })
      }
      helperMatrix.push(row)
    }


    // mark matrix
    let cursor = 0

    for (let r = 0; r < totalRows; r++) {
      for (let c = 0; c < totalCols; c++) {
        // skip if current matrix unit is already assigned
        if (helperMatrix[r][c].cell) {
          continue
        }

        // assign cell to current matrix unit
        const cell = cells[cursor++]
        const { rowSpan, colSpan } = cell.el

        cell.rowRange = { from: r, to: r }
        cell.colRange = { from: c, to: c }

        for (let y = r; y < r + rowSpan; y++) {
          for (let x = c; x < c + colSpan; x++) {
            helperMatrix[y][x].cell = cell
            cell.colRange.to = x
            cell.rowRange.to = y
          }
        }
      }
    }


    // read matrix to sheet
    cells.forEach(cell => {
      const { rowRange, colRange, el } = cell
      const { innerText } = el
      const workcell = mergeCells(worksheet, colRange.from, rowRange.from, colRange.to, rowRange.to)
      const cellStyle = getComputedStyle(el)

      workcell.value = innerText

      // workcellCreated
      this._invokePlugin('workcellCreated', { workcell, cell: el, rowRange, colRange, cellStyle })
    })
  }

  export (fileName, ext) {
    if (!this.workbook) {
      this.toExcel()
    }
    saveAsExcel(this.workbook, fileName, ext)
  }
}
