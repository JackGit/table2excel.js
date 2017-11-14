export default {
  workcellCreated ({ workcell, cell }) {
    const { verticalAlign, textAlign } = getComputedStyle(cell)
    workcell.style = {
      ...workcell.style,
      alignment: {
        vertical: verticalAlign,
        horizontal: textAlign
      }
    }
  }
}
