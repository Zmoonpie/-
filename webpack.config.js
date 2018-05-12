const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/*
    "start": "cross-env NODE_ENV=development node ./server/server.js",
    "build": "cross-env NODE_ENV=production  node ./server/server.js"

    "start": "cross-env NODE_ENV=development  webpack-dev-server",
    "build": "cross-env NODE_ENV=production  webpack",

    "start": "webpack-dev-server --open --config webpack.dev.js",
    "build": "webpack --config webpack.prod.js"

    //---打包-发布环境
    1.webpack --config webpack.prod.js
    2.cross-env NODE_ENV=production  node ./server/server.js
*/
module.exports = {
  entry: {
    app: [path.resolve(__dirname, 'app/index.jsx'),"webpack-hot-middleware/client?reload=true"],
  },
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, 'build'),
    publicPath: "/",
  },
  devtool: 'cheap-module-eval-source-map',
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
  plugins: [
    new CleanWebpackPlugin(['build']),
    new HtmlWebpackPlugin({
      title: 'index',
      template: './template/index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
};