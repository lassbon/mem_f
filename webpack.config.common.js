const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

console.log('direct: ', __dirname)

module.exports = {
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[hash].app.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(ttf|woff|eot|bmp|woff2)$/i,
        loader: 'file-loader?name=/static/icons/[name].[ext]',
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loader: 'file-loader?name=/static/images/[name].[ext]',
      },
      // {
      //   test: /\.svg$/,
      //   loader: 'svg-inline-loader?removeTag=true',
      // },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: ['style-loader', 'css-loader'],
          use: 'postcss-loader',
        }),
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     'style-loader/url',
      //     'file-loader',
      //     'css-loader',
      //     {
      //       loader: 'postcss-loader',
      //     },
      //   ],
      // },
      {
        test: /\.(jsx?|tsx?)/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader',
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      hash: false,
      title: 'ACCI',
    }),
    new ExtractTextPlugin('styles.css'),
  ],
  resolve: {
    modules: ['components', 'src/scenes', 'src', 'node_modules'],
    extensions: ['.jsx', '.js', '.json', '.css', '*'],
  },
}
