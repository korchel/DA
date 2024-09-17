/* eslint-disable @typescript-eslint/no-require-imports */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.config.common.js');

module.exports = merge(common, {
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html'),
      minify: true,
    })
  ],
  optimization: {
    minimize: true,
    usedExports: true,
  },
  devtool: 'source-map',
});