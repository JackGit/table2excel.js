import ExcelJS from 'exceljs/dist/es5/exceljs.browser'
import { mergeCells } from './utils'
import { WIDTH_RATIO } from './constants'

const defaultWorkbookOptions = {
  views: [{
    x: 0, y: 0, width: 10000, height: 20000,
    firstSheet: 0, activeTab: 1, visibility: 'visible'
  }]
}
/**
 * options = {
 *   workbook: {},
 *   autoCellWidth: true
 *   autoCellAlignment: true
 *   rowBlackList: [],
 *   colBlackList: [],
 *   rowWhiteList: [],
 *   colWhiteList: [],
 *   plugins: []
 * }
 */
function table2Excel (tables, options = {}) {

  tables = Array.from(
    typeof tables === 'string'
      ? document.querySelectorAll(tables)
      : tables
    )

  const workbook = new ExcelJS.Workbook() // create workbook
  workbook.views = [{
    x: 0, y: 0, width: 10000, height: 20000,
    firstSheet: 0, activeTab: 1, visibility: 'visible'
  }]

  // workbookCreated plugins
  ;(options.plugins || [])
    .map(plugin => plugin.workbookCreated)
    .filter(plugin => plugin)
    .forEach(plugin => plugin.call(null, { workbook, tableEls: tables }))

  tables.forEach((table, index) => {
    const sheet = workbook.addWorksheet(`Sheet ${index + 1}`) // create worksheet

    // worksheetCreated plugins
    ;(options.plugins || [])
      .map(plugin => plugin.worksheetCreated)
      .filter(plugin => plugin)
      .forEach(plugin => plugin.call(null, {
        workbook,
        worksheet: sheet,
        sheetIndex: index,
        tableEls: tables,
        tableEl: table
      }))

    table2Sheet(table, sheet, { workbook, options, sheetIndex: index, tableEls: tables })

    // worksheetConverted
    ;(options.plugins || [])
      .map(plugin => plugin.worksheetConverted)
      .filter(plugin => plugin)
      .forEach(plugin => plugin.call(null, {
        workbook,
        worksheet: sheet,
        sheetIndex: index,
        tableEls: tables,
        tableEl: table
      }))
  })

  return workbook
}

function table2Sheet (table, sheet, { workbook, options, sheetIndex, tableEls }) {
  // get total cols and rows
  const totalRows = table.rows.length
  const totalCols = Math.max(...Array.from(table.rows).map(row => row.cells.length))

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
    const sheetCell = mergeCells(sheet, colRange.from, rowRange.from, colRange.to, rowRange.to) // cell created
    const cellStyle = getComputedStyle(el)

    if (colRange.from === colRange.to) {
      // set column width
      sheet.getColumn(colRange.from + 1).width = (+cellStyle.width.split('px')[0]) * WIDTH_RATIO
    }

    sheetCell.value = innerText
    sheetCell.style = {
      alignment: {
        vertical: cellStyle.verticalAlign,
        horizontal: cellStyle.textAlign
      }
    }

    ;(options.plugins || [])
      .map(plugin => plugin.cellCreated)
      .filter(plugin => plugin)
      .forEach(plugin => plugin.call(null, {
        workbook,
        worksheet: sheet,
        sheetIndex,
        tableEls,
        tableEl: table,
        cell: sheetCell,
        cellEl: el
      }))
  })
}

export default table2Excel
