module.exports = {
  entry: './src/table2excel.js',
  output: {
    filename: './dist/table2excel.js',
    library: 'Table2Excel',
    libraryTarget: 'umd'
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
  node: {fs: "empty"}
};
