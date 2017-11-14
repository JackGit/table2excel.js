import { argb } from '../utils'

export default {
  workcellCreated ({ workcell, cell }) {
    const oldFont = (workcell.style && workcell.style.font) ? workcell.style.font : {}
    const style = getComputedStyle(cell)
    const fontWeight = style.fontWeight

    workcell.style = {
      ...workcell.style,
      font: {
        ...oldFont,
        color: { argb: argb(style.color) },
        bold: (fontWeight === 'bold' || +fontWeight > 600) ? true : false
      }
    }
  }
}
