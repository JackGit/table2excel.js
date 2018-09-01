/**
 * '-webkit-right' -> 'right'
 * 'right' -> 'right'
 *  etc...
 */
const getHorizontalAlign = (value = '') => {
  const aligns = ['right', 'left', 'center', 'justify']
  for (let i = 0; i < aligns.length; i++) {
    if (value.includes(aligns[i])) {
      return aligns[i]
    }
  }
}

/**
 * 'baseline' -> 'middle'
 * 'text-top' -> 'top'
 * 'text-bottom' -> 'bottom'
 * 'sub' -> 'top'
 * 'super' -> 'bottom'
 */
const getVerticalAlign = (value = '') => {
  const aligns = ['top', 'middle', 'bottom']
  for (let i = 0; i < aligns.length; i++) {
    if (value.includes(aligns[i])) {
      return aligns[i]
    }
  }

  const mapping = {
    'baseline': 'middle',
    'super': 'top',
    'sub': 'bottom'
  }
  return mapping[value]
}

export default {
  workcellCreated ({ workcell, cellStyle }) {
    const { verticalAlign, textAlign } = cellStyle
    workcell.alignment = {
      ...(workcell.alignment || {}),
      ...({
        vertical: getVerticalAlign(verticalAlign),
        horizontal: getHorizontalAlign(textAlign)
      })
    }
  }
}
