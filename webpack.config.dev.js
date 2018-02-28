const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

const merge = require('webpack-merge')
const common = require('./webpack.config.common.js')

module.exports = merge(common, {
  entry: ['@babel/polyfill', 'react-hot-loader/patch', './src/index.js'],
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    hot: true,
    port: 3000,
    open: false,
    openPage: '',
    stats: {
      modules: false,
      performance: true,
      timings: true,
      warnings: true,
    },
    historyApiFallback: true,
    publicPath: '/',
  },
  devtool: 'cheap-module-eval-source-map',
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
  ],
})
