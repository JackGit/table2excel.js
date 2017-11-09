```js
const table2Excel = new Table2Excel('table')
table2Excel.export(fileName, ext)
```

```js
const table2Excel = new Table2Excel('table', {
  plugins: [{
    workbookCreated ({ workbook, tables }) {},
    worksheetCreated ({ workbook, tables, worksheet, table }) {

    },
    worksheetCompleted ({ workbook, tables, worksheet, table }) {
      worksheet.getRow(1).hidden = true
    },
    workcellCreated ({ workbook, tables, worksheet, table, workcell, cell }) {
      workcell.value = { text: '', link: '' }
      workcell.style = {
        ...workcell.style,
        font: {},
        color: {}
      }
    }
  }]
})
```
