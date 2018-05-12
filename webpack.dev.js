const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  //context: path.resolve(__dirname, 'build'),
  entry: { 
    app: [path.resolve(__dirname, 'app/index.jsx'), "webpack-hot-middleware/client?reload=true"],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, 'server/build'),
    publicPath: '/',
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    //new webpack.optimize.OccurenceOrderPlugin(),
    // new CleanWebpackPlugin(['server/build']),
    // new HtmlWebpackPlugin({
    //   title: 'index',
    //   template: './template/index.html',
    // }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      }
    }),
  ],
});