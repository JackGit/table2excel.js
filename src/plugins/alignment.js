export default {
  workcellCreated ({ workcell, cell, cellStyle }) {
    const { verticalAlign, textAlign } = cellStyle
    workcell.style = Object.assign({}, workcell.style, {
      alignment: {
        vertical: verticalAlign,
        horizontal: textAlign
      }
    })
  }
}
