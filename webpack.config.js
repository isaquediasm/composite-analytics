const path = require('path');

module.exports = {
  entry: './src/composite.js',
  resolve: {
    alias: {
      composite: path.resolve(__dirname, 'src')
    }
  },
  output: {
    filename: 'composite.min.js',
    path: path.resolve(__dirname, 'dist')
  },
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9001
  }
};
