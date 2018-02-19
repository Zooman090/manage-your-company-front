const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const paths = {
  DIST: path.resolve(__dirname, '../dist'),
  SRC: path.resolve(__dirname, '../src'),
  JS: path.resolve(__dirname, '../src/js')
};

module.exports = merge(common, {
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.SRC, 'index.html')
    }),
    new ExtractTextPlugin('main.css'),
    new UglifyJSPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
});
