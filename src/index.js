import table2Excel from './table2excel'
import { saveAsExcel } from './utils'

export {
  table2Excel,
  saveAsExcel
}

export default (table, filename, ext) => saveAsExcel(table2Excel(table), filename, ext)
