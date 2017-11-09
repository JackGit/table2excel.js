row / col white / black list

cell background color

plugin

需要定义阶段，然后 plugin 能够控制进入哪一个阶段
不同的阶段暴露出来的 信息不同

比如：parse row 阶段，parse col 阶段，parse cell 阶段

！！！抽取出核心的阶段 ！！！
workbookCreated ({ workbook }) {}
worksheetCreated ({ workbook, worksheet, tableEl, sheetIndex }) {}
cellCreated ({ workbook, worksheet, tableEl, sheetIndex, cell, cellEl })

provide standalone full functional script build, and also the simplest core build

```js
table2Excel('table', {
  plugins: []
})

```

如何解析复杂的 cell，比如内部有 input 框的
如何解析复杂的 cell，比如将内部有 select 的转成 excel 中的 select
