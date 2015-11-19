import gulp from 'gulp';
import nunjucks from 'gulp-nunjucks-render';
import htmlmin from 'gulp-htmlmin';
import data from 'gulp-data';
import sitemap from 'gulp-sitemap';
import plumber from 'gulp-plumber';
import gulpif from 'gulp-if';

import settings from '../../settings.js';

const TEMPLATES_GLOB = 'src/**/*.html';

const htmlminOptions = {
  removeComments: true,
  collapseWhitespace: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true
};

function buildNunjuckTemplates() {
  nunjucks.nunjucks.configure(['src/_templates/'], { watch: settings.DEV_HOT_RELOAD });
  return gulp.src(TEMPLATES_GLOB)
    .pipe(gulpif(settings.DEV_HOT_RELOAD, plumber()))
    .pipe(data(() => ({
      jsPaths: settings.DEV_HOT_RELOAD ? [
        `${settings.DEV_WEBPACK_BASE_URL}/vendors.js`,
        `${settings.DEV_WEBPACK_BASE_URL}/main.js`
      ] : [
        '/vendors.js',
        '/main.js'
      ],
      cssPaths: settings.DEV_HOT_RELOAD ? [] : ['/main.css']
    })))
    .pipe(nunjucks())
    .pipe(htmlmin(htmlminOptions))
    .pipe(gulp.dest('dist'));
}

function watchNunjuckTemplates() {
  return gulp.watch(TEMPLATES_GLOB, buildNunjuckTemplates);
}

const SITEMAP_GLOB = [
  'dist/**/*.html',
  '!dist/_templates/**/*.html'
];

function buildSitemap() {
  return gulp.src(SITEMAP_GLOB)
    .pipe(sitemap({
      siteUrl: settings.SITE_URL
    }))
    .pipe(gulp.dest('dist'));
}

gulp.task('templates:build', gulp.series(buildNunjuckTemplates, buildSitemap));
gulp.task('templates:watch', watchNunjuckTemplates);
