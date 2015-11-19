import gulp from 'gulp';

const IMAGES_GLOB = 'src/**/*.@(png|jpeg|jpg|svg|gif)';

function buildImages() {
  return gulp.src(IMAGES_GLOB)
    .pipe(gulp.dest('dist'));
}

function watchImages() {
  return gulp.watch(IMAGES_GLOB, buildImages);
}

gulp.task('images:build', buildImages);
gulp.task('images:watch', watchImages);
