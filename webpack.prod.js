const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  entry: {
    app: path.resolve(__dirname, 'app/index.jsx'),
    //将一些第三方的js单独打包在vendors.js 
    vendors: ['react']
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, 'server/build'),
    publicPath: "/",
  },
  devtool: 'cheap-module-source-map',
  plugins: [
    //把入口文件vendors数组指定的第三方包打包成verdors.js
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
    //new CleanWebpackPlugin(['./server/build']),
    new HtmlWebpackPlugin({
      title: 'index',
      template: './template/index.html',
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin(),
  ]
})