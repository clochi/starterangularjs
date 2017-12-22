const path = require('path');
const webpack = require('webpack');
const libs = ['jquery.min.js', 'angular.min.js', 'angular-route.min.js']

function listOfLibs(src){
  /*  @src:string recibe la ruta del tipo 'src/'' */
  return libs.map((lib) => path.resolve(__dirname, src+lib));
}

module.exports = {
  entry: {
    bundle: path.resolve(__dirname, 'src/app.js'),
    vendor: listOfLibs('src/vendors/')
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
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
      }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.js',
      minChunks: Infinity
    })
  ]
}
