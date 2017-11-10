export default {
  workcellCreated ({ workcell, cell }) {
    const child = cell.children[0]
    if (['INPUT', 'SELECT', 'TEXTAREA'].includes(child.tagName)) {
      workcell.value = child.value
    }
  }
}
