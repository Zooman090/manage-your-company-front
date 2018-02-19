const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const paths = {
  DIST: path.resolve(__dirname, '../dist'),
  SRC: path.resolve(__dirname, '../src'),
  JS: path.resolve(__dirname, '../src/js')
};

module.exports = {
  entry: path.join(paths.SRC, 'index.js'),
  context: __dirname,
  output: {
    path: paths.DIST,
    filename: 'app.bundle.js',
    publicPath: '/manage-your-company-front'
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader'
        ]
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.scss']
  }
};
