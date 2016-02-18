import assert from 'assert';

import { isNumber } from 'lodash';
import gulp from 'gulp';
import awsPublish from 'gulp-awspublish';

import config from '../../config.js';

function deployAwsGlobs(artifactsGlob, cacheLength) {
  assert(isNumber(cacheLength));
  try {
    assert(config.AWS_BUCKET);
    assert(config.AWS_ACCESS_KEY);
    assert(config.AWS_SECRET_KEY);
    assert(config.AWS_REGION);
  } catch (err) {
    console.error('Missing AWS deploy environmental variables');
    process.exit(1);
  }
  const publisherConf = {
    params: {
      Bucket: config.AWS_BUCKET
    },
    accessKeyId: config.AWS_ACCESS_KEY,
    secretAccessKey: config.AWS_SECRET_KEY,
    region: config.AWS_REGION
  };

  const publisher = awsPublish.create(publisherConf);
  const headers = {
    'Cache-Control': `max-age=${cacheLength} no-transform, public`
  };
  return gulp.src(artifactsGlob)
    .pipe(publisher.publish(headers, { force: true }))
    .pipe(awsPublish.reporter({}));
}

const shortTermCachePatterns = [
  '*.html',
  'favicon.ico',
  'apple-touch-icon.png',
  'apple-touch-icon-precomposed.png',
  'robots.txt',
  'sitemap.xml'
];

gulp.task('deploy:aws:long', () => {
  const oneYear = 31536000;
  const longTermCacheGlob = `dist/**/!(${shortTermCachePatterns.join('|')})`;
  return deployAwsGlobs(longTermCacheGlob, oneYear);
});

gulp.task('deploy:aws:short', () => {
  const fiveMin = 300;
  const shortTermCacheGlob = `dist/**/+(${shortTermCachePatterns.join('|')})`;
  return deployAwsGlobs(shortTermCacheGlob, fiveMin);
});

gulp.task('deploy:target', gulp.series('deploy:aws:long', 'deploy:aws:short'));
