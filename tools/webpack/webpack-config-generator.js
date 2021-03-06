import path from 'path';

import autoprefixer from 'autoprefixer';
import { optimize } from 'webpack';
import precss from 'precss';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

import config from '../../config.js';

function makeWebpackConfig() {
  const webpackConfig = {};

  const VENDOR_MODULES = [
    'jquery',
    'react'
  ];

  webpackConfig.context = path.resolve(__dirname, '../../src');
  webpackConfig.entry = {
    main: ['./main.js'],
    vendors: [...VENDOR_MODULES]
  };

  webpackConfig.output = {
    path: path.resolve(__dirname, '../../dist'),
    filename: '[name].js',
    publicPath: config.DEV_HOT_RELOAD ? `${config.DEV_WEBPACK_BASE_URL}/` : '/'
  };

  webpackConfig.module = {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: config.DEV_HOT_RELOAD ?
          'style!css!postcss' :
          ExtractTextPlugin.extract('style', 'css!postcss')
      },
      {
        test: /\.scss$/,
        loader: config.DEV_HOT_RELOAD ?
          'style!css!postcss!sass' :
          ExtractTextPlugin.extract('style', 'css!postcss!sass')
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test: /\.png$/,
        loader: 'url-loader?limit=10000&mimetype=image/png'
      },
      {
        test: /\.(jpg|jpeg)$/,
        loader: 'url-loader?limit=10000&mimetype=image/jpeg'
      },
      {
        test: /\.gif$/,
        loader: 'url-loader?limit=10000&mimetype=image/gif'
      },
      {
        test: /\.svg$/,
        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      }
    ]
  };

  webpackConfig.postcss = () => [autoprefixer, precss];

  webpackConfig.plugins = [
    new optimize.CommonsChunkPlugin('vendors', 'vendors.js'),
    ...(config.DEV_HOT_RELOAD ? [] : [
      new ExtractTextPlugin('[name].css'),
      new optimize.UglifyJsPlugin()
    ])
  ];

  webpackConfig.devServer = {
    port: config.DEV_WEBPACK_SERVER_PORT,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    stats: {
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: true,
      chunkModules: false
    }
  };

  webpackConfig.devtool = config.IS_PROD ? 'source-map' : 'cheap-module-eval-source-map';

  return webpackConfig;
}

module.exports = makeWebpackConfig;
