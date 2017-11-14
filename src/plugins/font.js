import { argb } from '../utils'

export default {
  workcellCreated ({ workcell, cell, cellStyle }) {
    const oldFont = (workcell.style && workcell.style.font) ? workcell.style.font : {}
    const fontWeight = cellStyle.fontWeight

    workcell.style = {
      ...workcell.style,
      font: {
        ...oldFont,
        color: { argb: argb(cellStyle.color) },
        bold: (fontWeight === 'bold' || +fontWeight > 600) ? true : false
      }
    }
  }
}
