'use strict';
let undefined;



const Config  = require('../Config');
const path    = require('path');
const webpack = require('webpack');



const webpackConfig = {
  cache: true,
  watch: true,
  keepalive: true,

  // externals: {},

  entry: {
    [Config.DEST_JS_NAME]: path.join(Config.JS_ROOT, 'main.js'),
  },

  output: {
    filename: '[name].js',
    path: path.join(Config.DEST_JS),
  },

  devtool: 'source-map',
  // devtool: 'cheap-source-map',
  // devtool: 'cheap-module-source-map',

  resolve: {
    root: [
      Config.JS_ROOT,
      path.join(Config.JS_ROOT, 'lib'),
      Config.ROOT,
      Config.CONFIG_DIR,
    ],
    extensions: ['', '.js']
  },

  module: {
    loaders: [
      {
        test   : /\.js$/,
        exclude: /node_modules/,
        loader : 'babel-loader',
        query  : {
          presets: [
            'es2015',
            'stage-0',
          ]
        },
      }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },

      output: {
        comments  : false,
        semicolons: true,
      },
    })
  ],
}

module.exports = webpackConfig;