export default {
  workcellCreated ({ worksheet, colRange, cell, cellStyle }) {
    if (colRange.from === colRange.to && cellStyle.width !== 'auto') {
      worksheet.getColumn(colRange.from + 1).width = (+cellStyle.width.split('px')[0]) * this.options.widthRatio
    }
  }
}
