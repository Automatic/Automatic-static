import { runWatch } from './process.js';

process.env.DEV_HOT_RELOAD = JSON.stringify(true);

runWatch();
