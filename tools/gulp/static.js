import gulp from 'gulp';

const STATIC_GLOB = 'static/**';

function buildStatic() {
  return gulp.src(STATIC_GLOB)
    .pipe(gulp.dest('dist'));
}

function watchStatic() {
  return gulp.watch(STATIC_GLOB, buildStatic);
}

gulp.task('static:build', buildStatic);
gulp.task('static:watch', watchStatic);
