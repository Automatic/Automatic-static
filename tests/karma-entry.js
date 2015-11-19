/**
 * Karma entry test file to load all tests ahead of time.
 * This avoids creating a webpack bundle for each test.
 * medium.com/@scbarrus/how-to-get-test-coverage-on-react-with-karma-babel-and-webpack-c9273d805063
 */

const context = require.context('../src', true, /-test\.js$/);
context.keys().forEach(context);
