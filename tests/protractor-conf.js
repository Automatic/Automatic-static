import settings from '../settings.js';

module.exports = {
  baseUrl: `http://${settings.DEV_HOST}:${settings.DEV_PORT}`,

  capabilities: {
    browserName: settings.IS_TRAVIS ? 'firefox' : 'chrome'
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
