import gulp from 'gulp';
import RevAll from 'gulp-rev-all';

import config from '../../config.js';

function buildFingerprint() {
  const revAll = new RevAll({
    prefix: config.SITE_BASE_PATH,
    dontGlobal: [
      'favicon.ico',
      'sitemap.xml',
      '.html',
      '.txt'
    ]
  });
  return gulp.src('dist/**')
    .pipe(revAll.revision())
    .pipe(gulp.dest('dist'));
}

gulp.task('fingerprint:build', buildFingerprint);
