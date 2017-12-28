const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const libs = ['angular.min.js', 'angular-route.min.js', 'jquery.min.js',]

function listOfLibs(src){
  /*  @src:string recibe la ruta del tipo 'src/'' */
  return libs.map((lib) => path.resolve(__dirname, src+lib));
}

module.exports = {
  entry: {
    bundle: path.resolve(__dirname, 'src/js/app.js'),
    vendor: listOfLibs('src/vendors/')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'/*,
    publicPath: './dist'*/
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|dist|vendors)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          //['style-loader', 'css-loader']
          //fallback: 'style-loader',
          use: ["css-loader", "stylus-loader"]
        })
      },
      {
        test: /\styl$/,
        use: ExtractTextPlugin.extract({
          use: [
            "css-loader",
            {
              loader: 'stylus-loader',
              options: {
                use: [
                  require('nib')
                ],
                import: [
                  '~nib/lib/nib/index.styl'
                ]
              }
            }
          ]
        })
      },
      {
        test: /\.(jpg|png|gif|woff|eot|ttf|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 200000,
          }
        }
      },
      {
        test: /\.(mp4|avi)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1000000,
            name: 'videos/[name].[hash].[ext]'
          }
        }
      },
      {
        test: /\.json$/,
        use: 'json-loader'
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks: Infinity
    }),
    new ExtractTextPlugin("css/[name].css"),
    //  title, ngApp, ngCtrl son las variables que se se sustituyen en el index
    new HtmlWebpackPlugin({
      title: 'Nombre de App', //<title>
      template: 'src/index.html',
      ngApp: 'webpackStarter', //ng-app="montegoPrueba"
      ngCtrl: 'main' //ng-controller="main" Controller general en el index
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "src"),
    compress: true
  }
}
