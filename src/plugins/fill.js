import { argb } from '../utils'

export default {
  workcellCreated ({ workcell, cell }) {
    const style = getComputedStyle(cell)
    const color = argb(style.backgroundColor)

    if (color === '00000000') {
      // background is transparent, equals none pattern fill
      workcell.style = {
        ...workcell.style,
        fill: {
          type: 'pattern',
          pattern: 'none'
        }
      }
    } else {
      workcell.style = {
        ...workcell.style,
        fill: {
          type: 'pattern',
          pattern: 'solid',
          fgColor: { argb: color }
        }
      }
    }
  }
}
