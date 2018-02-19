const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const paths = {
  DIST: path.resolve(__dirname, '../dist'),
  SRC: path.resolve(__dirname, '../src'),
  JS: path.resolve(__dirname, '../src/js')
};

module.exports = merge(common, {
  plugins: [
    new ExtractTextPlugin('main.css'),
    new HtmlWebpackPlugin({
      template: path.join(paths.SRC, 'index.html')
    })
  ],
  devServer: {
    historyApiFallback: true
  }
});
