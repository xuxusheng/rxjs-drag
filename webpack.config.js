let webpack = require('webpack')
let HtmlWebpackPlugin = require('html-webpack-plugin')
let ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
let autoprefixer = require('autoprefixer')
let path = require('path')


module.exports = function () {
  let config = {}
  
  config.resolve = {
    modules: ['./node_modules'],
    extensions: ['.js', '.ts']
  }
  
  config.entry = {
    main: path.resolve(__dirname, './src/main.ts')
  }
  
  config.output = {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  }
  
  config.module = {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {loader: 'ts-loader'}
        ],
        exclude: [/node_modules/]
      }, {
        test: /\.scss$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: [
            {loader: 'style-loader', options: {sourceMap: true}}
          ],
          use: [
            {loader: 'css-loader', options: {sourceMap: true, modules: true}},
            {loader: 'postcss-loader'},
            {loader: 'sass-loader'}
          ]
        }),
        exclude: [/node_modules/]
      }, {
        test: /\.css$/,
        use: ExtractTextWebpackPlugin.extract({
          fallback: [
            {loader: 'style-loader', options: {sourceMap: true}}
          ],
          use: [
            {loader: 'css-loader'},
            {loader: 'postcss-loader'}
          ]
        }),
        exclude: [/node_modules/]
      }
    ]
  }
  
  config.plugins = []
  
  config.plugins.push(
      new ExtractTextWebpackPlugin({
        filename: '[name].[hash].css',
        disable: false
      }),
      new HtmlWebpackPlugin({
        filename: 'index.[hash].html',
        template: path.resolve(__dirname, './src', 'index.html'),
        inject: 'body'
      }),
      new webpack.LoaderOptionsPlugin({
        options: {
          postcss: [
              autoprefixer({
                browsers: ['last 10 version', '> 1%']
              })
          ]
        }
      })
  )
  
  return config
}()