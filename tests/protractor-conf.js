import config from '../config.js';

module.exports = {
  baseUrl: `http://${config.DEV_HOST}:${config.DEV_PORT}`,

  capabilities: {
    browserName: config.IS_TRAVIS ? 'firefox' : 'chrome'
  },

  framework: 'jasmine',

  specs: [
    'tests/**/*-spec.js'
  ],

  jasmineNodeOpts: {
    defaultTimeoutInterval: 30000
  },

  onPrepare: () => {
    browser.ignoreSynchronization = true;  // don't wait for angular.js to load
  }
};
