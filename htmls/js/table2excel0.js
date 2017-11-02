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
  return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.charAt(x) + (y + 1)
}

/* function getHeaders (tableElement) {
  return Array
    .from(tableElement.querySelectorAll('thead th'))
    .map(th => ({ text: th.innerText, el: th }))
} */
function getHeaders (tableElement) {
  return Array
    .from(tableElement.querySelectorAll('thead tr'))
    .map(tr => Array
      .from(tr.querySelectorAll('th'))
      .map(th => ({ text: th.innerText, el: th }))
    )
}

function getRows (tableElement) {
  return Array
    .from(tableElement.querySelectorAll('tbody tr'))
    .map((tr, i) => ({
      index: i,
      cells: getCells(tr)
    }))
}

function getCells (tableRowElement) {
  return Array
    .from(tableRowElement.querySelectorAll('td'))
    .map((td, i) => ({
      text: td.innerText,
      el: td
    }))
}

function mergeCells (sheet, x1, y1, x2, y2) {
  const fromCell = cellPosition(x1, y1)
  const toCell = cellPosition(x2, y2)
  console.log(`merge cells from ${fromCell} to ${toCell}`)
  sheet.mergeCells([fromCell, toCell].join(':'))
  return sheet.getCell(fromCell)
}


function table2Excel (table) {
  const workbook = new ExcelJS.Workbook()
  workbook.views = [
    {
      x: 0, y: 0, width: 10000, height: 20000,
      firstSheet: 0, activeTab: 1, visibility: 'visible'
    }
  ]

  const sheet = workbook.addWorksheet('My Sheet')


  // for headers
  const headers = getHeaders(table)

  /* sheet.columns = headers.map((h, i) => {
    return {
      header: h.text,
      key: `header-${i}`,
      width: (+getComputedStyle(h.el).width.split('px')[0]) / SIZE_RATIO,
      style: {
        font: { bold: true },
        alignment: { horizontal: 'center' }
      }
    }
  }) */

  // 可能会有多行的 header
  headers.forEach((header, i) => {
    if (i === 0) {
      sheet.columns = header.map((h, j) => {
        return {
          header: h.text,
          key: `header-${j}`,
          width: (+getComputedStyle(h.el).width.split('px')[0]) / SIZE_RATIO,
          style: {
            font: { bold: true },
            alignment: { horizontal: 'center' }
          }
        }
      })
    } else {
      header.map((h, j) => {
        const cell = sheet.getCell()
        cell.value = h.text
        cell.width
      })
    }
  })


  // for body
  const rows = getRows(table)

  // 并不能通过第一行或者第一列来获取 col 或者 row 的总数，因为可能他们有 span
  const totalRows = table.rows.length // 包含 header
  const totalCols = Math.max(...Array.from(table.rows).map(row => row.cells.length))



  rows.forEach((row, y) => {  // y direction
    row.cells.forEach((cell, x) => {  // x direction
      console.log(x, y)

      if (!cell) {
        console.log('skipped')
        return
      }

      const rowSpan = cell.el.rowSpan
      const colSpan = cell.el.colSpan
      console.log(`processing td`, cell.el)

      let c

      if (rowSpan > 1) {
        c = mergeCells(sheet, x, y + 1, x, y + rowSpan)
        c.value = cell.text
        c.style = {
          font: { bold: false },
          alignment: { vertical: 'middle' }
        }

        // add additional placeholder cells for the following (rowSpan - 1) rows
        for (let i = y + 1; i < y + rowSpan; i++) {
          rows[i].cells.splice(x, 0, null)  // insert a null cell at y index
        }
      } else if (colSpan > 1) {
        c = mergeCells(sheet, x, y + 1, x + colSpan, y)
        c.value = cell.text
        c.style = {
          font: { bold: false },
          alignment: { horizontal: 'center' }
        }

        // add additional placeholder cells for the following (rowSpan - 1) rows
        for (let i = y + 1; i < y + rowSpan; i++) {
          rows[i].cells.splice(x, 0, null)  // insert a null cell at y index
        }
      } else {
        c = sheet.getCell(cellPosition(x, y + 1))
        c.value = cell.text
        c.style = { font: { bold: false }}
      }
    })
  })

  saveExcel(workbook, Date.now())
  return

  sheet.addRow({id: 1, name: 'John Doe', dob: new Date(1970,1,1)});

  sheet.addRow([3, 'Sam', new Date()]);

  var rowValues = [];
  rowValues[1] = 4;
  rowValues[5] = 'Kyle';
  rowValues[9] = new Date();
  sheet.addRow(rowValues);

  sheet.getCell('A1').fill = {
      type: 'pattern',
      pattern:'solid',
      fgColor:{argb:'FFFF0000'}
  };



  sheet.mergeCells('B3:B4')
  sheet.getCell('B3').value = 'merge'
  sheet.getCell('B3').alignment = { vertical: 'middle', horizontal: 'center' }
}

function test () {
  table2Excel(document.querySelector('table'))
}
