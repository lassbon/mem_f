const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const CompressionPlugin = require('compression-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const merge = require('webpack-merge')
const common = require('./webpack.config.common.js')

module.exports = merge(common, {
  entry: './src/index.js',
  plugins: [
    new CopyWebpackPlugin([{ from: 'src/static', to: 'static' }]),
    new CompressionPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.css$|\.html$/,
      threshold: 10240,
      minRatio: 0.8,
    }),
  ],
})
