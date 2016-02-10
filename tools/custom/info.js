import chalk from 'chalk';

import config from '../../config.js';

console.log(`Running process in ${chalk.bold.green(config.ENVIRONMENT_NAME)} environment`);
