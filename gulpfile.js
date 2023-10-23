const gulp = require('gulp');
const pug = require('gulp-pug');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');

// Compile Pug files to HTML, including components
gulp.task('pug', () => {
  return gulp.src(['src/**/*.pug', '!src/components/**/*.pug']) // Exclude components from direct compilation
    .pipe(pug())
    .pipe(gulp.dest('dist'));
});

// Compile SCSS files to CSS, minify, and save in dist folder
gulp.task('scss', () => {
  return gulp.src('src/scss/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(rename({ suffix: '.min' }))
    .pipe(gulp.dest('dist/css'));
});

// Copy js, fonts, and img folders from src to dist
gulp.task('copy-css', () => {
  return gulp.src('src/css/**/*')
    .pipe(gulp.dest('dist/css'));
});

// Copy js, fonts, and img folders from src to dist
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


// Watch for changes in Pug, SCSS, js, fonts, img, and component files
gulp.task('watch', () => {
  gulp.watch(['src/**/*.pug', '!src/components/**/*.pug'], gulp.series('pug')); // Exclude components from direct watch
  gulp.watch('src//scss*.scss', gulp.series('scss'));
  gulp.watch('src/css/**/*', gulp.series('copy-css'));
  gulp.watch('src/js/**/*', gulp.series('copy-js'));
  gulp.watch('src/fonts/**/*', gulp.series('copy-fonts'));
  gulp.watch('src/img/**/*', gulp.series('copy-img'));
  gulp.watch('src/components/**/*.pug', gulp.series('pug')); // Watch component files separately
});

// Default task: run 'pug', 'scss', 'copy-js', 'copy-fonts', 'copy-img', and then 'watch'
gulp.task('default', gulp.series('pug', 'scss', 'copy-css', 'copy-js', 'copy-fonts', 'copy-img', 'watch'));
