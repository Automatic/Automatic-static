import assert from 'assert';

import { isNumber } from 'lodash';
import gulp from 'gulp';
import ghPages from 'gulp-gh-pages';
import awsPublish from 'gulp-awspublish';

import config from '../../config.js';

function deployGithub() {
  try {
    assert(config.DEPLOY_GITHUB_REMOTE_URL);
  } catch (err) {
    console.error('Missing github deploy environmental variables');
    process.exit(1);
  }

  return gulp.src('dist/**')
    .pipe(ghPages({
      remoteUrl: config.DEPLOY_GITHUB_REMOTE_URL
    }));
}

function deployAwsGlobs(artifactsGlob, cacheLength) {
  assert(isNumber(cacheLength));
  try {
    assert(config.DEPLOY_AWS_BUCKET_NAME);
    assert(config.DEPLOY_AWS_ACCESS_KEY);
    assert(config.DEPLOY_AWS_SECRET_KEY);
    assert(config.DEPLOY_AWS_REGION);
  } catch (err) {
    console.error('Missing AWS deploy environmental variables');
    process.exit(1);
  }
  const publisherConf = {
    params: {
      Bucket: config.DEPLOY_AWS_BUCKET_NAME
    },
    accessKeyId: config.DEPLOY_AWS_ACCESS_KEY,
    secretAccessKey: config.DEPLOY_AWS_SECRET_KEY,
    region: config.DEPLOY_AWS_REGION
  };

  const publisher = awsPublish.create(publisherConf);
  const headers = {
    'Cache-Control': `max-age=${cacheLength} no-transform, public`
  };
  return gulp.src(artifactsGlob)
    .pipe(publisher.publish(headers, { force: true }))
    .pipe(awsPublish.reporter({}));
}

function deployAws() {
  const longTermCachePatterns = [
    '*.html',
    'favicon.ico',
    'apple-touch-icon.png',
    'apple-touch-icon-precomposed.png',
    'robots.txt',
    'sitemap.xml'
  ];

  const oneYear = 31536000;
  const longTermCacheGlob = `dist/**/+(${longTermCachePatterns.join('|')})`;
  const longTermDeployStream = deployAwsGlobs(longTermCacheGlob, oneYear);

  const fiveMin = 300;
  const shortTermCacheGlob = `dist/**/!(${longTermCachePatterns.join('|')}`;
  const shortTermDeploySteam = deployAwsGlobs(shortTermCacheGlob, fiveMin);

  return gulp.parallel(longTermDeployStream, shortTermDeploySteam);
}

function deploy() {
  let deployStream;
  switch (config.DEPLOY_TARGET) {
    case 'github':
      deployStream = deployGithub();
      break;
    case 'aws':
      deployStream = deployAws();
      break;
    default:
      throw new Error('Invalid deploy target');
  }

  return deployStream;
}

gulp.task('deploy:target', deploy);
