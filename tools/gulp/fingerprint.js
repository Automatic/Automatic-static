import gulp from 'gulp';
import RevAll from 'gulp-rev-all';

import config from '../../config.js';

function buildFingerprint() {
  const dontHash = [
    'favicon.ico',
    'sitemap.xml',
    '.html',
    '.txt'
  ];
  const revAll = new RevAll({
    prefix: config.SITE_BASE_PATH,
    dontRenameFile: dontHash,
    dontUpdateReference: dontHash
  });
  return gulp.src('dist/**')
    .pipe(revAll.revision())
    .pipe(gulp.dest('dist'));
}

gulp.task('fingerprint:build', buildFingerprint);
