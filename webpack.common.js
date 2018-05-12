const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx', '.json']
  },
  module: {
    rules: [
      {
        test: /\.js[x]?$/,
        include: path.resolve(__dirname, "app"),
        loader: 'babel-loader',
      },
      { test: /\.(png|svg|jpg|gif)$/, loader: 'url-loader?limit=8192' },
      { test: /\.(woff|woff2|eot|ttf|otf)$/, loader: 'file-loader' },
      { test: /\.css$/, loader: 'style-loader!css-loader' }
    ]
  },
};