module.exports = {
  entry: './src/index.js',
  output: {
    filename: './dist/table2excel.common.js',
    library: 'Table2Excel',
    libraryTarget: 'commonjs2',
    libraryExport: 'default'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          'babel-loader',
        ],
        exclude: /node_modules/
      }
    ]
  },
  externals: {
    'exceljs/dist/es5/exceljs.browser': {
      commonjs: 'exceljs/dist/es5/exceljs.browser',
      commonjs2: 'exceljs/dist/es5/exceljs.browser',
      root: 'ExcelJS'
    }
  },
  node: {
    fs: 'empty'
  }
};
