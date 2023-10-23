const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

gulp.task('pug', () => {
  return gulp.src('src/*.pug')
    .pipe(pug())
    .pipe(gulp.dest('dist'));
});

gulp.task('scss', () => {
  return gulp.src('src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('copy-css', () => {
  return gulp.src('src/css/**/*')
    .pipe(gulp.dest('dist/css'));
});

gulp.task('copy-js', () => {
  return gulp.src('src/js/**/*')
    .pipe(gulp.dest('dist/js'));
});

gulp.task('copy-fonts', () => {
  return gulp.src('src/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('copy-img', () => {
  return gulp.src('src/img/**/*')
    .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', () => {
  gulp.watch('src/*.pug', gulp.series('pug'));
  gulp.watch('src/scss/*.scss', gulp.series('scss'));
  gulp.watch('src/css/**/*', gulp.series('copy-css'));
  gulp.watch('src/js/**/*', gulp.series('copy-js'));
  gulp.watch('src/fonts/**/*', gulp.series('copy-fonts'));
  gulp.watch('src/img/**/*', gulp.series('copy-img'));
});

gulp.task('default', gulp.series('pug', 'scss', 'copy-css', 'copy-js', 'copy-fonts', 'copy-img', 'watch'));
