module.exports = {
  entry: './src/index.js',
  output: {
    filename: './dist/table2excel.core.js',
    library: 'Table2Excel',
    libraryTarget: 'umd',
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
    'exceljs/dist/es5/exceljs.browser': 'ExcelJS'
  },
  node: {
    fs: 'empty'
  }
};
