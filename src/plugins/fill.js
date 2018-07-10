import { argb } from '../utils'

export default {
  workcellCreated ({ workcell, cell, cellStyle }) {
    const color = argb(cellStyle.backgroundColor)

    if (color === '00000000') {
      // background is transparent, equals none pattern fill
      workcell.style = Object.assign({}, workcell.style, {
        fill: {
          type: 'pattern',
          pattern: 'none'
        }
      })
    } else {
      workcell.style = Object.assign({}, workcell.style, {
        fill: {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: color }
        }
      })
    }
  }
}
