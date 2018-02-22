const path = require('path')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

console.log('direct: ', __dirname)

module.exports = {
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[hash].app.js',
    publicPath: '/',
  },
  module: {
    rules: [
      // {
      //   test: /\.(jpe?g|png|gif|ttf|woff|eot|bmp|woff2)$/i,
      //   loader: require.resolve('url-loader'),
      //   options: {
      //     limit: 10000,
      //     name:
      //       process.env.NODE_ENV === 'development'
      //         ? path.resolve(__dirname,'[path]/[name].[ext]'
      //         : '/public/media/[name].[ext]',
      //   },
      // },
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
        use: [
          // 'url-loader',
          'style-loader',
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
        ],
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
      hash: true,
      title: 'ACCI',
    }),
  ],
  resolve: {
    modules: ['components', 'src/scenes', 'src', 'node_modules'],
    extensions: ['.jsx', '.js', '.json', '.css', '*'],
  },
}
