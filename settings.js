import path from 'path';

import { some, defaults } from 'lodash';
import dotenv from 'dotenv';

dotenv.load({
  silent: true,
  path: path.resolve(__dirname, '.env')
});

const {
  ENVIRONMENT,
  NODE_ENV,
  CI,
  TRAVIS,
  DEV_HOST,
  DEV_PORT,
  DEV_WEBPACK_SERVER_PORT,
  DEV_HOT_RELOAD,
  DEPLOY_TARGET,
  DEPLOY_GITHUB_REMOTE_URL,
  SITE_URL,
  SITE_BASE_PATH
} = defaults({}, process.env, {
  ENVIRONMENT: 'local',
  DEV_HOST: 'localhost',
  DEV_PORT: '5000',
  DEV_WEBPACK_SERVER_PORT: '8081',
  DEPLOY_TARGET: 'github',
  SITE_URL: '/',
  SITE_BASE_PATH: '/'
});

const IS_PROD = some([
  NODE_ENV === 'production',
  ENVIRONMENT === 'stage',
  ENVIRONMENT === 'staging',
  ENVIRONMENT === 'prod',
  ENVIRONMENT === 'production',
  CI === 'true'
]);

const IS_TRAVIS = TRAVIS === 'true';

const IS_LOCAL = !IS_PROD;
process.env.NODE_ENV = IS_PROD ? 'production' : 'development';

const ENVIRONMENT_NAME = IS_PROD ? 'production' : 'development';

const DEV_WEBPACK_BASE_URL = `http://${DEV_HOST}:${DEV_WEBPACK_SERVER_PORT}`;

export default {
  ENVIRONMENT,
  ENVIRONMENT_NAME,
  IS_PROD,
  IS_LOCAL,
  IS_TRAVIS,
  DEV_HOST,
  DEV_PORT,
  DEV_WEBPACK_SERVER_PORT,
  DEV_WEBPACK_BASE_URL,
  DEV_HOT_RELOAD,
  DEPLOY_TARGET,
  DEPLOY_GITHUB_REMOTE_URL,
  SITE_URL,
  SITE_BASE_PATH
};
