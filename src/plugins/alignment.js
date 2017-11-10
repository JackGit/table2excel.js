export default {
  workcellCreated ({ workcell, cell }) {
    const cellStyle = getComputedStyle(cell)
    workcell.style = {
      ...workcell.style,
      alignment: {
        vertical: cellStyle.verticalAlign,
        horizontal: cellStyle.textAlign
      }
    }
  }
}
