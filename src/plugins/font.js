import { argb } from '../utils'

export default {
  workcellCreated ({ workcell, cellStyle }) {
    const fontWeight = cellStyle.fontWeight

    workcell.font = {
      ...(workcell.font || {}),
      ...({
        name: cellStyle.fontFamily,
        color: { argb: argb(cellStyle.color) },
        bold: (fontWeight === 'bold' || +fontWeight > 600) ? true : false
      })
    }
  }
}
