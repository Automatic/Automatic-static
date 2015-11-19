import { isEmpty } from 'lodash';
import gulp from 'gulp';
import ghPages from 'gulp-gh-pages';

import settings from '../../settings.js';

function deployGithub() {
  if (isEmpty(settings.DEPLOY_GITHUB_REMOTE_URL)) {
    throw new Error('Missing DEPLOY_GITHUB_REMOTE_URL when attempting to deploy to github pages');
  }

  return gulp.src('dist/**')
    .pipe(ghPages({
      remoteUrl: settings.DEPLOY_GITHUB_REMOTE_URL
    }));
}

function deploy() {
  let deployStream;
  switch (settings.DEPLOY_TARGET) {
  case 'github':
    deployStream = deployGithub();
    break;
  default:
    throw new Error('Invalid deploy target');
  }

  return deployStream;
}

gulp.task('deploy:target', deploy);
