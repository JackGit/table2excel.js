import { argb } from '../utils'

export default {
  workcellCreated ({ workcell, cellStyle }) {
    const color = argb(cellStyle.backgroundColor)

    if (color === '00000000') {
      // background is transparent, equals none pattern fill
      workcell.fill = {
        ...(workcell.fill || {}),
        ...({
          type: 'pattern',
          pattern: 'none'
        })
      }
    } else {
      workcell.fill = {
        ...(workcell.fill || {}),
        ...({
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: color }
        })
      }
    }
  }
}
