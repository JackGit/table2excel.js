export default {
  workcellCreated ({ workcell, cell }) {
    const child = cell.children[0]
    if (child.tagName === 'A') {
      workcell.value = { text: child.innerText, hyperlink: child.href }
    }
  }
}
