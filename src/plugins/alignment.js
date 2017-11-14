export default {
  workcellCreated ({ workcell, cell, cellStyle }) {
    const { verticalAlign, textAlign } = cellStyle
    workcell.style = {
      ...workcell.style,
      alignment: {
        vertical: verticalAlign,
        horizontal: textAlign
      }
    }
  }
}
