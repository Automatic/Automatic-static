import { IS_LOCAL } from './config.js';

require('./main.scss');

if (IS_LOCAL && module.hot) {
  module.hot.accept();
}
