/**
 * globals
 *  ExcelJS, saveAs
 */

const XLSX_MIME_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
const SIZE_RATIO = 6

const saveExcel = (workbook, filename) => {
  workbook.xlsx.writeBuffer().then(uint8 => {
    saveAs(
      new Blob([uint8.buffer], { type: XLSX_MIME_TYPE }),
      `${filename}.xlsx`
    )
  })
}

// x = 0, y = 0 => 'A1'
// x = 0, y = 1 => 'A2'
// x = 1, y = 0 => 'B1'
const cellPosition = (x, y) => {
  function numberToLetters(nNum) {
    var result;
    if (nNum <= 26) {
        result = letter(nNum);
    } else {
        var modulo = nNum % 26;
        var quotient = Math.floor(nNum / 26);
        if (modulo === 0) {
            result = letter(quotient - 1) + letter(26);
        } else {
            result = letter(quotient) + letter(modulo);
        }
    }

    return result;
  }

  function letter(nNum) {
      var a = "A".charCodeAt(0);
      return String.fromCharCode(a + nNum - 1);
  }

  return numberToLetters(x + 1) + (y + 1)
}

function mergeCells (sheet, x1, y1, x2, y2) {
  const fromCell = cellPosition(x1, y1)
  const toCell = cellPosition(x2, y2)
  console.log(`merge cells from ${fromCell} to ${toCell}`)
  // sheet.mergeCells([fromCell, toCell].join(':'))
  sheet.mergeCells(fromCell, toCell)
  return sheet.getCell(fromCell)
}

function showSpan (table) {
  table || (table = document.querySelector('table'))
  ;[...Array.from(table.querySelectorAll('td')), ...Array.from(table.querySelectorAll('th'))]
  .map(t => t.innerText = [t.colSpan, t.rowSpan].join(','))
}

function table2Excel (table) {
  const workbook = new ExcelJS.Workbook()
  workbook.views = [{
    x: 0, y: 0, width: 10000, height: 20000,
    firstSheet: 0, activeTab: 1, visibility: 'visible'
  }]

  const sheet = workbook.addWorksheet('My Sheet')

  // const table = document.querySelector('table')
  // 并不能通过第一行或者第一列来获取 col 或者 row 的总数，因为可能他们有 span
  const totalRows = table.rows.length // 包含 header
  const totalCols = Math.max(...Array.from(table.rows).map(row => row.cells.length))

  // 遍历所有 table cells，找出各自正确的 x, y 属性
  // cell = { x, y, value, el }
  // for single cell: x, y would be a number
  // for merged cell: x, y would be an array of length 2, which means [from, to]

  // showSpan()

  const cells = []
  Array.from(table.rows).forEach(row => {
    Array.from(row.cells).forEach(cell => {
      cells.push(cell)
    })
  })

  // create matrix
  const matrix = []
  for (let r = 0; r < totalRows; r++) {
    const row = []
    for (let c = 0; c < totalCols; c++) {
      row.push({
        row: r,
        col: c,
        cell: null
      })
    }
    matrix.push(row)
  }

  // mark matrix
  let cursor = 0
  for (let r = 0; r < totalRows; r++) {
    for (let c = 0; c < totalCols; c++) {
      // skip if current matrix unit is already assigned
      if (matrix[r][c].cell) {
        continue
      }

      // assign cell to current matrix unit
      const cell = cells[cursor++]
      const { rowSpan, colSpan } = cell

      cell.rowRange = { from: r, to: r }
      cell.colRange = { from: c, to: c }

      for (let y = r; y < r + rowSpan; y++) {
        for (let x = c; x < c + colSpan; x++) {
          matrix[y][x].cell = cell
          cell.colRange.to = x
          cell.rowRange.to = y
        }
      }

    }
  }

  // read matrix to sheet
  cells.forEach(cell => {
    const { rowRange, colRange, innerText } = cell
    const sheetCell = mergeCells(sheet, colRange.from, rowRange.from, colRange.to, rowRange.to)
    const style = {
      alignment: {}
    }

    if (colRange.from === colRange.to) {
      // set column width
      sheet.getColumn(colRange.from + 1).width = (+getComputedStyle(cell).width.split('px')[0]) / SIZE_RATIO
    } else {
      // set alignment
      style.alignment.horizontal = 'center'
    }

    if (rowRange.from === rowRange.to) {
      // set row width
      // sheet.getRow(rowRange.from + 1).height = (+getComputedStyle(cell).height.split('px')[0]) / SIZE_RATIO
    } else {
      // set alignment
      style.alignment.vertical = 'middle'
    }

    const fontWeight = getComputedStyle(cell).fontWeight
    if (fontWeight === 'bold' || +fontWeight > 600) {
      style.font = { bold: true }
    }

    sheetCell.value = innerText
    sheetCell.style = style
  })


  saveExcel(workbook, Date.now())
}

function test () {
  table2Excel(document.querySelector('table'))
}
