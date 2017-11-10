export default {
  workcellCreated ({ workcell, cell }) {
    const cellStyle = getComputedStyle(cell)
    const { color, backgroundColor } = cellStyle  // rgb(), rgba()
  }
}
