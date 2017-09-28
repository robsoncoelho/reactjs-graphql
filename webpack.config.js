var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var GoogleFontsPlugin = require("google-fonts-webpack-plugin");

var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.js$/,
        include : APP_DIR,
        loaders: ['jsx-loader', 'babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        include : APP_DIR,
        loaders: ExtractTextPlugin.extract(['css-loader?modules&importLoaders=1&localIdentName=[local]','sass-loader']),
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('styles.css'),
    new GoogleFontsPlugin({
      fonts: [
        { family: 'Montserrat', variants: [ '400' ] }
      ]
    })
  ]
};

module.exports = config;