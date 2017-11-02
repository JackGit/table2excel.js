module.exports = {
  entry: './src/index.js',
  output: {
    filename: './dist/table2excel.js',
    library: 'Table2Excel',
    libraryTarget: 'umd'
  },
  node: {fs: "empty"}
};
