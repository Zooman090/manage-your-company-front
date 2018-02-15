const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
// Constant with our paths
const paths = {
  DIST: path.resolve(__dirname, 'dist'),
  SRC: path.resolve(__dirname, 'src'), // source folder path -> ADDED IN THIS STEP
  JS: path.resolve(__dirname, 'src/js')
};

// Webpack configuration
module.exports = {
  entry: path.join(paths.SRC, 'index.js'),
  context: __dirname,
  output: {
    path: paths.DIST,
    filename: 'app.bundle.js'
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
        use: [{
          loader: 'style-loader' // creates style nodes from JS strings
        }, {
          loader: 'css-loader' // translates CSS into CommonJS
        }, {
          loader: 'sass-loader' // compiles Sass to CSS
        }
        ]
      }
    ]
  },
  resolve: {
    modules: ['node_modules'],
    extensions: ['.js', '.jsx', '.scss']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(paths.SRC, 'index.html')
    })
  ],
  devServer: {
    historyApiFallback: true
  }
};
