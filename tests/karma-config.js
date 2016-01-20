import path from 'path';

import settings from '../settings.js';

module.exports = function createKarmaConfig(config) {
  config.set({
    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: path.resolve(__dirname, '..'),

    // frameworks to use https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: ['./tests/karma-entry.js'],

    // list of files to exclude
    exclude: [],

    // preprocess matching files before serving them to the browser https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      './tests/karma-entry.js': ['webpack', 'sourcemap']
    },

    webpack: {
      module: {
        loaders: [
          {
            test: /\.(js|jsx)$/,
            loader: 'babel',
            exclude: /node_modules/
          },
          {
            test: /\.css$/,
            loader: 'style!css!postcss'
          },
          {
            test: /\.scss$/,
            loader: 'style!css!postcss!sass'
          }
        ]
      },
      devtool: 'inline-source-map'
    },

    junitReporter: {
      outputFile: 'test-results.xml',
      suite: '',
      useBrowserName: false
    },

    webpackMiddleware: {
      noInfo: true
    },

    // test results reporter to use
    reporters: ['mocha', 'junit'],

    // web server port
    port: 9876,

    // enable / disable colors in the output (reporters and logs)
    colors: true,

    // level of logging
    logLevel: config.LOG_INFO,

    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // start these browsers https://npmjs.org/browse/keyword/karma-launcher
    browsers: settings.IS_TRAVIS ? ['Firefox'] : ['Chrome'],

    // run once or watch continuously
    singleRun: true,

    // concurrency level how many browser should be started simultaneously
    concurrency: Infinity
  });
};
