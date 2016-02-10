import gulp from 'gulp';
import nunjucks from 'gulp-nunjucks';
import htmlmin from 'gulp-htmlmin';
import data from 'gulp-data';
import sitemap from 'gulp-sitemap';
import plumber from 'gulp-plumber';
import gulpif from 'gulp-if';

import config from '../../config.js';

const TEMPLATES_GLOB = 'src/**/*.html';

const htmlminOptions = {
  removeComments: true,
  collapseWhitespace: true,
  removeScriptTypeAttributes: true,
  removeStyleLinkTypeAttributes: true
};

const templateData = {
  jsPaths: config.DEV_HOT_RELOAD ? [
    `${config.DEV_WEBPACK_BASE_URL}/vendors.js`,
    `${config.DEV_WEBPACK_BASE_URL}/main.js`
  ] : [
    '/vendors.js',
    '/main.js'
  ],
  cssPaths: config.DEV_HOT_RELOAD ? [] : ['/main.css']
};

function buildNunjuckTemplates() {
  return gulp.src(TEMPLATES_GLOB)
    .pipe(gulpif(config.DEV_HOT_RELOAD, plumber()))
    .pipe(data(() => templateData))
    .pipe(nunjucks.compile())
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
      siteUrl: config.SITE_URL
    }))
    .pipe(gulp.dest('dist'));
}

gulp.task('templates:build', gulp.series(buildNunjuckTemplates, buildSitemap));
gulp.task('templates:watch', watchNunjuckTemplates);
